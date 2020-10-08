import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tarefa',
        loadChildren: () => import('../page/tarefa/tarefa.module').then( m => m.TarefaPageModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('../page/categoria/categoria.module').then( m => m.CategoriaPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tarefa',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tarefa',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
