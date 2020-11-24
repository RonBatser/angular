import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent} from './index/index.component';
import {GameComponent} from './game/game.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'game/:id', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
