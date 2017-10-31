import { inject } from "aurelia-framework";
import { MovieData } from '../../module/movie-data/movieData';
import { Router } from 'aurelia-router';
import { MovieModel } from '../../module/movie-data/movie-model';

@inject(MovieData, Router)
export class Edit {
  isNew = false;
  constructor(movieData, router) {
    //movieData hamon modelview ke doroskardim va inject kardim
    this.data = movieData;
    this.router = router;
  }
  async activate(param) {
    //in param inja dadei ke ma midim harchi esmesh mitone
    //bashe va ba on params ke to html be name params bara route fargh dare on hatman
    //bayad params bashe chon parametrike lazeme va ma hamishe id midim 
    if (!param || !param.id) {
      this.isNew = true;
      this.movie = new MovieModel();
    } else {
      let movieJSON = await this.data.getById(param.id);
      this.movie = new MovieModel(movieJSON);
    }
  }
  get header() {
    return this.isNew ? 'Creating: ' : 'Editing: ';
  }

  async saveEdit() {
    if (this.isNew) {
      //skapa new
      await this.data.save(this.movie.getEntity());
    } else {
      //updatera
      await this.data.update(this.movie.getEntity(), this.movie.id);
    }

    this.router.navigateToRoute('list');

  }
}
