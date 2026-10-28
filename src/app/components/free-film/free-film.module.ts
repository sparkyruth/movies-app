import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreeFilmRoutingModule } from './free-film-routing.module';
import { FreeFilmComponent } from './free-film.component';

@NgModule({
  declarations: [FreeFilmComponent],
  imports: [CommonModule, FreeFilmRoutingModule]
})
export class FreeFilmModule { }
