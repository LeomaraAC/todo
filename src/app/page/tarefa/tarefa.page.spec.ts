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

describe('TarefaPage', () => {
  let component: TarefaPage;
  let fixture: ComponentFixture<TarefaPage>;
  let router: Router;
  /** Mock */
  let tarefaServiceSpy: jasmine.SpyObj<TarefaService>;
  let categoriaServiceSpy: jasmine.SpyObj<CategoriaService>;

  /** Dados fake */
  let tarefasFake;
  let categoriaFake;

  beforeEach(async(() => {
    const tarefaSpy = jasmine.createSpyObj('tarefaService', ['excluir', 'atualizar']);
    const categoriaSpy = jasmine.createSpyObj('categoriaService', ['buscarTodasCategoriasTarefas']);

    TestBed.configureTestingModule({
      declarations: [TarefaPage],
      imports: [IonicModule.forRoot(),
        RouterTestingModule.withRoutes(
            [{path: 'tabs/tarefa', component: TarefaPage}]
        )],
      providers: [
        {provide: TarefaService, useValue: tarefaSpy},
        {provide: CategoriaService, useValue: categoriaSpy}
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    tarefaServiceSpy = TestBed.inject(TarefaService) as jasmine.SpyObj<TarefaService>;
    categoriaServiceSpy = TestBed.inject(CategoriaService) as jasmine.SpyObj<CategoriaService>;

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

  // it('Deve exibir um alert ao clicar no botão de excluir', () => {
  //   fixture.detectChanges();
  //   const tarefa = tarefasFake[0];
  //   const btnExcluir: HTMLElement = fixture.nativeElement.querySelector(`#excluir_${tarefa.id}`);
  //   btnExcluir.click();
  //   expect(alertSpy.create).toHaveBeenCalled();
  // });
  //
  // it('Não deve possuir ação no botão de cancelar', fakeAsync(() => {
  //   alertSpy.create.and.returnValue(notificationReturn);
  //
  //   component.excluir(tarefasFake[0]);
  //   tick(); // Tempo necessário para chamar o método present do alert
  //   const {buttons} = alertSpy.create.calls.first().args[0];
  //   const cancelButton = buttons[0];
  //
  //   expect(_.has(cancelButton, 'handler')).toBeFalse();
  //   expect(tarefaSpy.excluir).not.toHaveBeenCalled();
  // }));
  //
  // xit('Deve remover o item ao confirmar o alert', fakeAsync(() => {
  //   alertSpy.create.and.returnValue(notificationReturn);
  //   tarefaSpy.excluir.and.returnValue(EMPTY);
  //   const tarefa = tarefasFake[0];
  //
  //   component.excluir(tarefa);
  //   tick(); // Tempo necessário para chamar o método present do alert
  //   const {buttons} = alertSpy.create.calls.first().args[0];
  //   const confirmButton = buttons[1];
  //   confirmButton.handler();
  //
  //   expect(tarefaSpy.excluir).toHaveBeenCalledWith(tarefa);
  //   expect(categoriaSpy.buscarTodasCategoriasTarefas).toHaveBeenCalled();
  // }));

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
