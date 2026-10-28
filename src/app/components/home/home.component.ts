import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';
import { FreeFilm, FreeFilmsService } from 'src/app/service/free-films.service';
import { delay } from 'rxjs/internal/operators/delay';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  nowPlaying: any;
  tvShows: any;
  freeFilms: FreeFilm[] = [];
  responsiveOptions;
  loader = true;

  constructor(
    private movies: MoviesService,
    private tv: TvService,
    private free: FreeFilmsService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  ngOnInit() {
    this.trendingMovies(1);
    this.tvShow(1);
    this.freeToWatch();
  }

  freeToWatch() {
    this.free.getAll().subscribe(films => {
      this.freeFilms = films;
    });
  }

  trendingMovies(page: number) {
    this.movies.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
      this.nowPlaying = res.results;
      this.loader = false;
    });
  }

  tvShow(page: number) {
    this.tv.getTvOnTheAir(page).pipe(delay(2000)).subscribe((res: any) => {
      this.tvShows = res.results;
      this.loader = false;
    });
  }
}
