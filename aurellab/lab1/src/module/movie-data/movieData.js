import { HttpClient } from 'aurelia-http-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class MovieData {
  baseUrl = 'http://localhost:3000/api/movies';
  constructor(httpClient) {
    this.http = httpClient;
  }
  // use method getAll
  //can also to save() ,create()
  async getAll() {
    try {
      let result = await this.http.get(this.baseUrl);
      console.log('result', result);
      return result.content;
    } catch (error) {
      console.log('YOU GOT AN ERROR', error);
    }
  }
  async getById(id) {
    let movies = await this.getAll();
    let movie = movies.find(m => m.id == id);
    return movie;
  }
  async save(movie) {
    let response = await this.http.post(this.baseUrl, movie);
    console.log("SAVEREST: ", response);
  }
  async update(movie, id) {
    let response = await this.http.put(this.baseUrl, movie);
    console.log("RES:", response);

  }
}
