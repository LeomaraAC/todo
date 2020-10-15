import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../../core/service/categoria.service';
import {Categoria} from '../../model/categoria.model';
import {Tarefa} from '../../model/tarefa.model';
import {Subscription} from 'rxjs';
import {TarefaService} from '../../core/service/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.page.html',
  styleUrls: ['./tarefa.page.scss'],
})
export class TarefaPage implements OnInit {
  categorias: Categoria[] = [];
  subs: Subscription[] = [];

  constructor(private categoriaService: CategoriaService,
              private tarefaService: TarefaService) { }

  ngOnInit() {
    this.buscarCategoriasTarefas();
  }

  /**
   * Remove uma tarefa
   * @param tarefa
   */
  excluir(tarefa: Tarefa) {
    console.log(tarefa);
  }

  /**
   * Busca a lista com as categorias e as tarefas
   * @private
   */
  private buscarCategoriasTarefas() {
    this.subs.push(
        this.categoriaService
            .buscarTodasCategoriasTarefas()
            .subscribe(categorias => this.categorias = categorias)
    );
  }

  concluirTarefa(tarefa: Tarefa) {
    tarefa.concluido = !tarefa.concluido;
    this.subs.push(
        this.tarefaService.atualizar(tarefa).subscribe(data => {
          console.log('data', data);
        }, err => {
          console.log(err);
        })
    );
  }

}
