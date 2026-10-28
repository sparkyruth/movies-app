import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface FreeFilm {
  id: string;
  title: string;
  year: string;
  runtime: number | null;
  overview: string;
  poster: string;
  video: string;
  source: string;
}

/**
 * Public domain films hosted by the Internet Archive. The list is a vetted
 * snapshot in assets rather than a live query: archive.org's licence field is
 * declared by uploaders, so the titles here were filtered to works published
 * before 1931, whose US copyright has expired by statute.
 */
@Injectable({ providedIn: 'root' })
export class FreeFilmsService {
  private films$: Observable<FreeFilm[]> | null = null;

  constructor(private http: HttpClient) { }

  getAll(): Observable<FreeFilm[]> {
    if (!this.films$) {
      this.films$ = this.http
        .get<FreeFilm[]>('assets/data/free-films.json')
        .pipe(shareReplay(1));
    }
    return this.films$;
  }

  getById(id: string): Observable<FreeFilm | undefined> {
    return this.getAll().pipe(map(films => films.find(film => film.id === id)));
  }
}
