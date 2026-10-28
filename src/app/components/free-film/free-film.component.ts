import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreeFilm, FreeFilmsService } from 'src/app/service/free-films.service';

@Component({
  selector: 'app-free-film',
  templateUrl: './free-film.component.html',
  styleUrls: ['./free-film.component.scss']
})
export class FreeFilmComponent implements OnInit {
  film: FreeFilm | null = null;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private freeFilms: FreeFilmsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || '';
      this.freeFilms.getById(id).subscribe(film => {
        this.film = film || null;
        this.notFound = !film;
      });
    });
  }
}
