import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreeFilmComponent } from './free-film.component';

const routes: Routes = [{ path: '', component: FreeFilmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreeFilmRoutingModule { }
