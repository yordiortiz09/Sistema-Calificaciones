import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { HttpClient } from '@angular/common/http';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient, private globalVariable: GlobalVariablesService) { }

  obtenerGrupos(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.globalVariable.API_URL2 + '/grupo');
  }

  obtenerGrupo(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.globalVariable.API_URL2 + '/grupo/' + id);
  }

}
