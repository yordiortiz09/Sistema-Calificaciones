import { Component, Inject } from '@angular/core';
import { Grupo } from '../../interfaces/grupo.interface';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrupoService } from '../../services/grupo.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maestro',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './maestro.component.html',
})
export class MaestroComponent {
  grupos: Grupo[] = [];
  id = Number(localStorage.getItem('id'));
  constructor(private grupoService: GrupoService, private router: Router) { }

  ngOnInit(): void {
    this.grupoService.obtenerGrupo(this.id).subscribe((response: any) => {
      this.grupos = response.data;
    },
      error => {
        console.log(error);
      });
  }

  irAMateria(id: number): void {
    this.router.navigate(['/materia', id]);
  }


}
