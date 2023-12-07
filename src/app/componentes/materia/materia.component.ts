import { Component } from '@angular/core';
import { Materia } from '../../interfaces/materia.interface';
import { Grupo } from '../../interfaces/grupo.interface';
import { MateriaService } from '../../services/materia.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Calificacion } from '../../interfaces/calificacion.interface';
import { CalificacionesService } from '../../services/calificaciones.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './materia.component.html',
  styleUrl: './materia.component.css'
})
export class MateriaComponent {
  materias: Materia[] = [];
  calificaciones: Calificacion[] = [];
  id = Number(localStorage.getItem('id'));
  rolId = Number(localStorage.getItem('rol_id'));


  constructor(private materiaService: MateriaService, private caliService: CalificacionesService, private fb: FormBuilder, private http: HttpClient,
  ) { }

  formu = this.fb.group({
    calificacion_1: [
      '',
      [Validators.required],
    ],
    calificacion_2: [
      '',
      [Validators.required],
    ],
    calificacion_3: [
      '',
      [Validators.required],
    ],
  });

  get calificacion_1() {
    return this.formu.get('calificacion_1');
  }

  get calificacion_2() {
    return this.formu.get('calificacion_2');
  }

  get calificacion_3() {
    return this.formu.get('calificacion_3');
  }

  ngOnInit(): void {
    this.materiaService.obtenerMaterias().subscribe((response: any) => {
      this.materias = response.data;
      console.log(this.materias);
      console.log(response);
    },
      error => {
        console.log(error);
      });

    this.caliService.obtenerCalificaciones().subscribe(
      (response: any) => {
        this.calificaciones = response.data;
        console.log(this.calificaciones);

        if (this.calificaciones.length > 0) {
          const calificacionExistente = this.calificaciones[0];
          this.formu.patchValue({
            calificacion_1: calificacionExistente.calificacion_1.toString(),
            calificacion_2: calificacionExistente.calificacion_2?.toString(),
            calificacion_3: calificacionExistente.calificacion_3?.toString(),
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
    if (this.rolId === 2) {
      this.formu.disable();
    }


  }
  insertarCalificaciones() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();

    body.set('calificacion_1', this.formu.value.calificacion_1!);
    body.set('calificacion_2', this.formu.value.calificacion_2!);
    body.set('calificacion_3', this.formu.value.calificacion_3!);
    body.set('fk_materia', this.id.toString());
    body.set('fk_alumno', '1');
    body.set('fk_profesor', '1');

    this.http.post('http://127.0.0.1:8000/api/calificacion', body.toString(), { headers }).subscribe(
      (response) => {
        console.log(response);
        this.caliService.obtenerCalificaciones().subscribe((calificacionesResponse: any) => {
          this.calificaciones = calificacionesResponse.data;

        });
      },

      (error) => {
        console.log(error);
      }
    );






  }




}
