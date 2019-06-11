import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CrudService} from "../../../crud.service";
import {URL} from "../../../urlinterface/UrlInterface";
import {HttpHeaders} from "@angular/common/http";
import {Movie} from "../../../entities/movie";

@Injectable()
export class MoviesService {

  constructor(private crudService: CrudService) {
  }

  getAllMovies(): Observable<any> {
    let url = URL + "/movies";
    return this.crudService.getObject(url);
  }

  saveMovie(movie: Movie): Observable<any> {
    let url = URL + "/movies";
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Accept', 'application/json');
    return this.crudService.saveObject(url, movie, headers);
  }

  updateMovie(movie: Movie): Observable<any> {
    let url = URL + "/movies/" + movie.id;
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Accept', 'application/json');
    return this.crudService.putObject(url, movie, headers);
  }

  deleteMovie(movieId: number): Observable<any> {
    let url = URL + "/movies/" + movieId;
    return this.crudService.deleteObject(url);
  }

  getMovieDetailsActors(movieId: number): Observable<any> {
    let url = URL + `/movies/${movieId}/actors`;
    return this.crudService.getObject(url);
  }

  getAllActors(): Observable<any> {
    let url = URL + "/actors";
    return this.crudService.getObject(url);
  }

  addActorsToMovie(movieId: number, actorIds: number[]): Observable<any> {
    let url = URL + `/movies/${movieId}/actors`;
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    let obj = {
      actorIds: actorIds
    };
    return this.crudService.saveObject(url, obj, headers);
  }

  addMovieToWatchlist(movieId: number): Observable<any> {
    let url = URL + `/movies/${movieId}/watch`;
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.crudService.saveObject(url, {}, headers);
  }

  removeMovieFromWatchlist(movieId: number): Observable<any> {
    let url = URL + `/movies/${movieId}/watch`;
    return this.crudService.deleteObject(url);
  }


}
