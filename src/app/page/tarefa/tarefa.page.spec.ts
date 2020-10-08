import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarefaPage } from './tarefa.page';

describe('TarefaPage', () => {
  let component: TarefaPage;
  let fixture: ComponentFixture<TarefaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
