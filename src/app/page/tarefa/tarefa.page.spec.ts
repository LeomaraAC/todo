import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TarefaPage} from './tarefa.page';
import {TarefaService} from '../../core/service/tarefa.service';
import {CategoriaService} from '../../core/service/categoria.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Categoria} from '../../model/categoria.model';
import {EMPTY, of} from 'rxjs';

import {Tarefa} from '../../model/tarefa.model';
import {NotificationService} from '../../core/service/notification.service';

const TAREFA_EXCLUIDA_SUCESSO = 'Tarefa excluida com sucesso';
const COR_TOAST_SUCESSO = 'success';

describe('TarefaPage', () => {
  let component: TarefaPage;
  let fixture: ComponentFixture<TarefaPage>;
  let router: Router;
  /** Mock */
  let tarefaServiceSpy: jasmine.SpyObj<TarefaService>;
  let categoriaServiceSpy: jasmine.SpyObj<CategoriaService>;
  let ntServiceSpy: jasmine.SpyObj<NotificationService>;

  /** Dados fake */
  let tarefasFake: Tarefa[];
  let categoriaFake: Categoria[];

  beforeEach(async(() => {
    const tarefaSpy = jasmine.createSpyObj('tarefaService', ['excluir', 'atualizar']);
    const categoriaSpy = jasmine.createSpyObj('categoriaService', ['buscarTodasCategoriasTarefas']);
    const ntSpy = jasmine.createSpyObj('NotificationService', ['alertConfirm', 'toast']);

    TestBed.configureTestingModule({
      declarations: [TarefaPage],
      imports: [IonicModule.forRoot(),
        RouterTestingModule.withRoutes(
            [{path: 'tabs/tarefa', component: TarefaPage}]
        )],
      providers: [
        {provide: TarefaService, useValue: tarefaSpy},
        {provide: CategoriaService, useValue: categoriaSpy},
        {provide: NotificationService, useValue: ntSpy}
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    tarefaServiceSpy = TestBed.inject(TarefaService) as jasmine.SpyObj<TarefaService>;
    categoriaServiceSpy = TestBed.inject(CategoriaService) as jasmine.SpyObj<CategoriaService>;
    ntServiceSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;

    fixture = TestBed.createComponent(TarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const fake = dadosFake();
    tarefasFake = fake.tarefas;
    categoriaFake = fake.categorias;

    categoriaServiceSpy.buscarTodasCategoriasTarefas.and.returnValue(of(categoriaFake));
    router.navigate(['/']);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve buscar os dados da categoria quando o componente é criado', () => {
    expect(component.categorias).toBe(categoriaFake);
    expect(component.subs.length).toBe(2);
    expect(categoriaServiceSpy.buscarTodasCategoriasTarefas.calls.count()).toBe(1);
  });

  it('Deve exibir um alert ao clicar no botão de excluir', () => {
    fixture.detectChanges();
    const tarefa = tarefasFake[0];
    const btnExcluir: HTMLElement = fixture.nativeElement.querySelector(`#excluir_${tarefa.id}`);
    btnExcluir.click();
    expect(ntServiceSpy.alertConfirm).toHaveBeenCalled();
  });

  it('Deve remover o item ao confirmar o alert', fakeAsync(() => {
    const tarefa = tarefasFake[0];
    ntServiceSpy.alertConfirm.and.returnValue(Promise.resolve());
    tarefaServiceSpy.excluir.and.returnValue(of(tarefa.id));

    component.excluir(tarefa);
    const alert = ntServiceSpy.alertConfirm.calls.first().args[0];
    alert.acaoBtnConfirmar();
    tick();

    expect(tarefaServiceSpy.excluir).toHaveBeenCalledWith(tarefa);
    expect(categoriaServiceSpy.buscarTodasCategoriasTarefas).toHaveBeenCalled();
    expect(categoriaServiceSpy.buscarTodasCategoriasTarefas.calls.count()).toEqual(2);
  }));

  it('Deve exibir um toast ao excluir um item com sucesso', fakeAsync(() => {
    const tarefa = tarefasFake[0];
    ntServiceSpy.alertConfirm.and.returnValue(Promise.resolve());
    ntServiceSpy.toast.and.returnValue(Promise.resolve());
    tarefaServiceSpy.excluir.and.returnValue(of(tarefa.id));

    component.excluir(tarefa);
    const alert = ntServiceSpy.alertConfirm.calls.first().args[0];
    alert.acaoBtnConfirmar();

    expect(ntServiceSpy.toast).toHaveBeenCalledWith(TAREFA_EXCLUIDA_SUCESSO, COR_TOAST_SUCESSO);
  }));

  // todo - Deve exibir mensagem ao falhar a exclusão
  // todo - Deve exibir loading ao excluir

});

/**
 * Retorna os dados fake da amostragem
 */
function dadosFake(): {tarefas: Tarefa[], categorias: Categoria[]} {
  const tarefas: Tarefa[] = [{
    categoriaId: 1,
    descricao: 'Tarefa 1',
    concluido: false,
    id: 1
  }];
  const categorias: Categoria[] = [{
    id: 1,
    titulo: 'Teste 1',
    tarefas
  }];

  return {tarefas, categorias};
}
