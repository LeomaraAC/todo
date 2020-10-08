import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../../core/service/categoria.service';
import {Categoria} from '../../model/categoria.model';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.page.html',
  styleUrls: ['./tarefa.page.scss'],
})
export class TarefaPage implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService
        .buscarTodasCategoriasTarefas()
        .subscribe(categorias => this.categorias = categorias);
  }

}
