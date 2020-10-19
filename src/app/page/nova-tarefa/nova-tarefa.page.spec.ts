import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovaTarefaPage } from './nova-tarefa.page';

describe('NovaTarefaPage', () => {
  let component: NovaTarefaPage;
  let fixture: ComponentFixture<NovaTarefaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaTarefaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovaTarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
