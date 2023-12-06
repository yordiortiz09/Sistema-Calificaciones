import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariablesService } from './global-variables.service';
import { Observable } from 'rxjs';
import { Materia } from '../interfaces/materia.interface';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http: HttpClient, private globalVariable: GlobalVariablesService) { }

  obtenerMaterias() {
    return this.http.get(this.globalVariable.API_URL2 + '/materia');


  }

  obtenerMateria(id: number): Observable<Materia> {
    return this.http.get<Materia>(this.globalVariable.API_URL2 + '/materia/' + id);
  }
}
