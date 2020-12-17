import {Component, OnDestroy, OnInit} from '@angular/core';
import {Categoria} from '../../model/categoria.model';
import {Subscription} from 'rxjs';
import {CategoriaService} from '../../core/service/categoria.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Tarefa} from '../../model/tarefa.model';
import {TarefaService} from '../../core/service/tarefa.service';
import {NotificationService} from '../../core/service/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nova-tarefa',
  templateUrl: './nova-tarefa.page.html',
  styleUrls: ['./nova-tarefa.page.scss'],
})
export class NovaTarefaPage implements OnInit, OnDestroy {

  categorias: Categoria[] = [];
  subs: Subscription[] = [];
  form: FormGroup;

  constructor(private categoriaService: CategoriaService,
              private tarefaService: TarefaService,
              private notificatioService: NotificationService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.subs.push(
        this.categoriaService
            .buscarTodasCategorias()
            .subscribe(categorias => this.categorias = categorias)
    );
    this.form = this.fb.group({
      descricao: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      categoriaId: [null, Validators.required]
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  salvar() {
    const tarefa: Tarefa = {
      concluido: false,
      descricao: this.form.value.descricao,
      categoriaId: this.form.value.categoriaId
    };

    this.subs.push(
        this.tarefaService.salvar(tarefa).subscribe(dados => {
          this.notificatioService.toast('Tarefa salva com sucesso', 'success');
          this.close();
        }, error => {
          this.notificatioService.toast('ocorreu um erro ao salvar a tarefa', 'danger');
        })
    );
  }

  async close() {
    await this.router.navigate(['/tabs/tarefa']);
  }
}
