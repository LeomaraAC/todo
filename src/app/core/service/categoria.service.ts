import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categoria} from '../../model/categoria.model';
import {api} from '../utils/global.constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {
  }

  /**
   * Retorna uma lista contendo todas as categorias e as suas tarefas
   */
  buscarTodasCategoriasTarefas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${api}/categorias?_embed=tarefas`);
  }

  /**
   * Retorna todas as categorias
   */
  buscarTodasCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${api}/categorias`);
  }
}
