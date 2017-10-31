import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
// import { MovieModel } from '../../module/movie-data/movie-model';
import { MovieData } from '../../module/movie-data/movieData';


@inject(MovieData, Router)
export class Details {

  //deghat kon be bozorgi kochikie horof
  constructor(movieData, router) {
    this.data = movieData;
    this.router = router;
  }

  async activate(params) {
    
    console.log("PARAMETERS", params);
    this.movie = await this.data.getById(params.id);
  }
  navigateBackToStart() {
    this.router.navigateToRoute('list');
    //inja kafie ke router list o benevisi bedon inke be id niyaz dashte bashe chon to in 
    //model activate parameteri nagerefte /ke daron id hast vali vaghti detailo mikham
    // az router detail estefade koni bayad id begi chon params gerefte shode va id hast daresh
  }
}
