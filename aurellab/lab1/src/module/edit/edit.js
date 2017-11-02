import { inject, NewInstance } from 'aurelia-framework';
import { MovieData } from '../../module/movie-data/movieData';
import { Router } from 'aurelia-router';
import { MovieModel } from '../../module/movie-data/movie-model';
import { ValidationController } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../../bootstrap-form-renderer';
@inject(MovieData, Router, NewInstance.of(ValidationController))
export class Edit {
  isNew = false;

  constructor(movieData, router, validationController) {
    //movieData hamon modelview ke doroskardim va inject kardim
    this.data = movieData;
    this.router = router;
    this.validationController = validationController;
    this.validationController.addRenderer(new BootstrapFormRenderer());
    //this.controller = validationControllerFactory.createForCurrentScope();
    //this.controller.validateTrigger = validateTrigger.blur;
  }

  async activate(param) {
    //in param inja dadei ke ma midim harchi esmesh mitone
    //bashe va ba on params ke to html be name params bara route fargh dare on hatman
    //bayad params bashe chon parametrike lazeme va ma hamishe id midim
    //***in pain jayii ke ma data az server migirim ,mibini movieJson miyad
    //vaghti validation inja bedim yani etelati ke miyad az server ok bashe
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
  get  isValid() {
    return  this.validationController.errors.length  ===  0;
  }

  async saveEdit() {
    //skapa new
    //send the movie to the server when the validation is ok
    //try this first if it does not work retunr err
    //await > do this validation ke promise namide mishe bad boro badi va age klara nakard debug bede
    let validationResult = await this.validationController.validate();
    if (validationResult.valid) {
      try {
        if (this.isNew) {
          await this.data.save(this.movie.getEntity());
        } else {
          await this.data.update(this.movie.getEntity(), this.movie.id);
        }
        this.router.navigateToRoute('list');
      } catch (err) {
        alert('fel vid sparning');
      }
    } else {
      alert('validation error');
    }
  }
}
