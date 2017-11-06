//import { HttpClient } from 'aurelia-http-client';
import { MovieData } from '../../module/movie-data/movieData';
import { inject } from 'aurelia-framework';
import { MovieModel } from '../../module/movie-data/movie-model';
import '../../styles/styles.scss';
import './list.scss';
import { Router } from 'aurelia-router';

//currentDate model ke dari inja nemikhad biyari chon dar app view as compose estefade kardi ke mix mikoni 2 ta modelo

// import movies from './movies.json';
@inject(MovieData, Router)
export class List {


  constructor(movieData, router) {
    //this.http = new HttpClient(); bejaye new in inject kardim dar movieData
    this.movieData = movieData;
    this.router = router;
  }
  async activate() {
    this.movies = [];
    let temporaryMovies = await this.movieData.getAll();
    for (let movie of temporaryMovies) {
      let movieModel = new MovieModel(movie);
      this.movies.push(movieModel);
    }
  }

  // for (let movie of moviesJSON) {}
  changeMe() {
    let info = this.movies[0].info;
    console.log('INFO FROM FIRST MOVIE', info);
  }
  toggleMovieInfo() {
    //let movie = this.movies.find(x => x.id == id);
    movie.toggleInfo();
    //  this.movies.push(this.movies[0].info);
    //this.message = 'movie added agin';
  }
  navigateToDetails(id) {
    this.router.navigateToRoute('details', { id: id });

    //id:movie.id hamon chizie ke bala
    // route-href="route:details; params.bind:{id:movie.id}"
  }
  navigateToCreate() {
    this.router.navigateToRoute('edit');
  }
  deleteMovie(movie) {
     this.movies= this.movies.filter(function(element) {
      return element.id !== movie.id;
    });
  }
}
