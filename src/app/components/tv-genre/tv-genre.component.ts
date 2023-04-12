import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';


@Component({
  selector: 'app-tv-genre',
  templateUrl: './tv-genre.component.html',
  styleUrls: ['./tv-genre.component.scss']
})
export class TvGenreComponent implements OnInit {

  _tv: any;
  title: any;
  public id: any;

  constructor(
    private tvService: TvService,
    private router: ActivatedRoute

  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.id= params.get('id');
      this.title = params.get('name');
      this.getTvByGenre(this.id);
     
    });
    // this.router.params.subscribe((params: Params) => {
    //   this.id = params['id'];
    //   this.title = params['name'];
    //   this.getTvByGenre(this.id);
    // });
  }

  getTvByGenre(id:any) {
    this.tvService.getTVShowByGenre(id).subscribe((res: any) => {
        this._tv = res.results;
    });
  }

}
