import { TestBed } from '@angular/core/testing';

import { CategoriaService } from './categoria.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {api} from '../utils/global.constants';
import {Categoria} from '../../model/categoria.model';

describe('CategoriaService', () => {
  let service: CategoriaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriaService]
    });
    service = TestBed.inject(CategoriaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar todas as categorias e tarefas', () => {
    const url = `${api}/categorias?_embed=tarefas`;
    const dados: Categoria[] = [
      {
        id: 1,
        titulo: 'fake 1',
        tarefas: []
      },
      {
        id: 2,
        titulo: 'Fake 2',
        tarefas: [{id: 3, descricao: 'Tarefa fake', categoriaId: 2, concluido: false}]
      }
    ];
    service.buscarTodasCategoriasTarefas().subscribe(categorias => {
      expect(categorias.length).toBe(dados.length);
      expect(categorias).toEqual(dados);
    }, () => fail('Esperado uma lista de categorias ao invés de um erro!'));

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(dados);
  });
});
