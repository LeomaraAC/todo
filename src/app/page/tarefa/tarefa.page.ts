import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriaService} from '../../core/service/categoria.service';
import {Categoria} from '../../model/categoria.model';
import {Tarefa} from '../../model/tarefa.model';
import {Subscription} from 'rxjs';
import {TarefaService} from '../../core/service/tarefa.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Alert} from '../../core/models/alert.model';
import {NotificationService} from '../../core/service/notification.service';

@Component({
    selector: 'app-tarefa',
    templateUrl: './tarefa.page.html',
    styleUrls: ['./tarefa.page.scss'],
})
export class TarefaPage implements OnInit, OnDestroy {
    categorias: Categoria[] = [];
    subs: Subscription[] = [];

    constructor(private categoriaService: CategoriaService,
                private tarefaService: TarefaService,
                private router: Router,
                private ntService: NotificationService) {
    }

    ngOnInit() {
        this.subs.push(
            this.router.events
                .pipe(filter(event => event instanceof NavigationEnd))
                .subscribe((rota: NavigationEnd) => {
                    if (rota.url === '/tabs/tarefa' || rota.url === '/') {
                        this.buscarCategoriasTarefas();
                    }
                })
        );
    }

    ngOnDestroy() {
        this.subs.forEach(item => item.unsubscribe());

    }

    /**
     * Remove uma tarefa
     * @param tarefa
     */
    async excluir(tarefa: Tarefa) {
        const alert = new Alert();
        alert.titulo = 'Excluir!';
        alert.mensagem = 'Deseja excluir esta tarefa?';
        alert.txtBtnConfirmar = 'Excluir';
        alert.acaoBtnConfirmar = () => this.confirmouExcluir(tarefa);

        await this.ntService.alertConfirm(alert);
    }

    private confirmouExcluir(tarefa) {
        this.subs.push(
            this.tarefaService.excluir(tarefa).subscribe(async () => {
                await this.ntService.toast('Tarefa excluida com sucesso', 'success');
                this.buscarCategoriasTarefas();
            }, error => {
                console.log(error);
            })
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
}
