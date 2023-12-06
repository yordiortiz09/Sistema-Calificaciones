import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariablesService } from './global-variables.service';
import { Calificacion } from '../interfaces/calificacion.interface';
import { CalificacionProfesorAlumno } from '../interfaces/CalificacionProfesorAlumno.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  constructor(private http: HttpClient, private globalVariable: GlobalVariablesService) { }

  obtenerCalificaciones(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/calificaciones');
  }

  obtenerCalificacion(id: number) {
    return this.http.get(this.globalVariable.API_URL2 + '/calificacion/' + id);
  }

  insertarCalificaciones(calificacion: CalificacionProfesorAlumno) {
    return this.http.post(this.globalVariable.API_URL2 + '/calificaciones', calificacion);
  }
}
