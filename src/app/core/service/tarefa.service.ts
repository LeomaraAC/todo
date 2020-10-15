import { Injectable } from '@angular/core';
import {Tarefa} from '../../model/tarefa.model';
import {api} from '../utils/global.constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  /**
   * Atualiza os dados de uma tarefa
   */
  atualizar(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${api}/tarefas/${tarefa.id}`, tarefa);
  }
}
