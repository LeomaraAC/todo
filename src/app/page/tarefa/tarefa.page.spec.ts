import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AlertController, IonicModule} from '@ionic/angular';

import {TarefaPage} from './tarefa.page';
import {TarefaService} from '../../core/service/tarefa.service';
import {CategoriaService} from '../../core/service/categoria.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Categoria} from '../../model/categoria.model';
import {EMPTY, of} from 'rxjs';

import * as _ from 'lodash';
import {alertReturn} from '../../core/tests/mocks';

describe('TarefaPage', () => {
  let component: TarefaPage;
  let fixture: ComponentFixture<TarefaPage>;
  let router: Router;
  let tarefaSpy;
  let categoriaSpy;
  let alertSpy;
  const tarefasFake = [{
    categoriaId: 1,
    descricao: 'Tarefa 1',
    concluido: false,
    id: 1
  }];
  const categoriaFake: Categoria[] = [{
    id: 1,
    titulo: 'Teste 1',
    tarefas: tarefasFake
  }];

  beforeEach(async(() => {
    tarefaSpy = jasmine.createSpyObj('tarefaService', ['excluir', 'atualizar']);
    categoriaSpy = jasmine.createSpyObj('categoriaService', ['buscarTodasCategoriasTarefas']);
    alertSpy = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      declarations: [TarefaPage],
      imports: [IonicModule.forRoot(),
        RouterTestingModule.withRoutes(
            [{path: 'tabs/tarefa', component: TarefaPage}]
        )],
      providers: [
        {provide: TarefaService, useValue: tarefaSpy},
        {provide: CategoriaService, useValue: categoriaSpy},
        {provide: AlertController, useValue: alertSpy}
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    categoriaSpy.buscarTodasCategoriasTarefas.and.returnValue(of(categoriaFake));
    router.navigate(['/']);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve buscar os dados da categoria quando o componente é criado', () => {
    expect(component.categorias).toBe(categoriaFake);
    expect(component.subs.length).toBe(2);
    expect(categoriaSpy.buscarTodasCategoriasTarefas.calls.count()).toBe(1);
  });

  it('Deve exibir um alert ao clicar no botão de excluir', () => {
    fixture.detectChanges();
    const tarefa = tarefasFake[0];
    const btnExcluir: HTMLElement = fixture.nativeElement.querySelector(`#excluir_${tarefa.id}`);
    btnExcluir.click();
    expect(alertSpy.create).toHaveBeenCalled();
  });

  it('Não deve possuir ação no botão de cancelar', fakeAsync(() => {
    alertSpy.create.and.returnValue(alertReturn);

    component.excluir(tarefasFake[0]);
    tick(); // Tempo necessário para chamar o método present do alert
    const {buttons} = alertSpy.create.calls.first().args[0];
    const cancelButton = buttons[0];

    expect(_.has(cancelButton, 'handler')).toBeFalse();
    expect(tarefaSpy.excluir).not.toHaveBeenCalled();
  }));

  it('Deve remover o item ao confirmar o alert', fakeAsync(() => {
    alertSpy.create.and.returnValue(alertReturn);
    tarefaSpy.excluir.and.returnValue(EMPTY);
    const tarefa = tarefasFake[0];

    component.excluir(tarefa);
    tick(); // Tempo necessário para chamar o método present do alert
    const {buttons} = alertSpy.create.calls.first().args[0];
    const confirmButton = buttons[1];
    confirmButton.handler();

    expect(tarefaSpy.excluir).toHaveBeenCalledWith(tarefa);
    expect(categoriaSpy.buscarTodasCategoriasTarefas).toHaveBeenCalled();
  }));

});
