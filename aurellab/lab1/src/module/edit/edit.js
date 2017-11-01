import { inject, NewInstance } from 'aurelia-framework';
import { MovieData } from '../../module/movie-data/movieData';
import { Router } from 'aurelia-router';
import { MovieModel } from '../../module/movie-data/movie-model';
import {ValidationRules} from "aurelia-validation";
import {ValidationController, validateTrigger, ValidationError} from "aurelia-validation";

@inject(MovieData, Router, NewInstance.of(ValidationController))
export class Edit {
  isNew = false;
  constructor(movieData, router, validationController) {
    //movieData hamon modelview ke doroskardim va inject kardim
    this.data = movieData;
    this.router = router;
    this.validationController = validationController;
    //this.controller = validationControllerFactory.createForCurrentScope();
    //this.controller.validateTrigger = validateTrigger.blur;
    ValidationRules
    .ensure(m => m.title)
       // .isNotEmty()
       .minLength(3)
       .maxLength(100)
   // .ensure('movie.releaseYear')
    //    .isNumber()
      //  .isBetween(1900, 2100)
      .on(this);
  }

  async activate(param) {
    this.validationController.validate()
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
      //send the movie to the server when the validation is ok
      await this.validationController.validate().then(() => 
      { this.data.save(this.movie.getEntity());
      });
      } else {
      //updatera
      await this.validationController.validate().then(() => 
      {this.data.update(this.movie.getEntity(), this.movie.id);
      });
    }
    //this.router.navigateToRoute('list');
  }
