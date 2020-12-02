import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TarefaPage} from './tarefa.page';
import {TarefaService} from '../../core/service/tarefa.service';
import {CategoriaService} from '../../core/service/categoria.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Categoria} from '../../model/categoria.model';
import {of} from 'rxjs';

describe('TarefaPage', () => {
  let component: TarefaPage;
  let fixture: ComponentFixture<TarefaPage>;
  let router: Router;
  let tarefaSpy;
  let categoriaSpy;
  const categoriaFake: Categoria[] = [{
    id: 1,
    titulo: 'Teste 1',
    tarefas: [{
      categoriaId: 1,
      descricao: 'Tarefa 1',
      concluido: false,
      id: 1
    }]
  }];

  beforeEach(async(() => {
    tarefaSpy = jasmine.createSpyObj('tarefaService', ['excluir', 'atualizar']);
    categoriaSpy = jasmine.createSpyObj('categoriaService', ['buscarTodasCategoriasTarefas']);

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
});
