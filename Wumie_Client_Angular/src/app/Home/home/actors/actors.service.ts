import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CrudService} from "../../../crud.service";
import {URL} from "../../../urlinterface/UrlInterface";
import {HttpHeaders} from "@angular/common/http";
import {Actor} from "../../../entities/actor";

@Injectable()
export class ActorsService {

  constructor(private crudService: CrudService) {
  }

  getAllActors(): Observable<any> {
    let url = URL + "/actors";
    return this.crudService.getObject(url);
  }

  saveActor(actor: Actor): Observable<any> {
    let url = URL + "/actors";
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Accept', 'application/json');
    return this.crudService.saveObject(url, actor, headers);
  }

  updateActor(actor: Actor): Observable<any> {
    let url = URL + "/actors/" + actor.id;
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Accept', 'application/json');
    return this.crudService.putObject(url, actor, headers);
  }

  deleteActor(actorId: number): Observable<any> {
    let url = URL + "/actors/" + actorId;
    return this.crudService.deleteObject(url);
  }

  getActorDetailsMovies(actorId: number): Observable<any> {
    let url = URL + `/actors/${actorId}/movies`;
    return this.crudService.getObject(url);
  }


}
