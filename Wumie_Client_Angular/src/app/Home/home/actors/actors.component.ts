import {Component, OnInit} from '@angular/core';
import {ActorsService} from "./actors.service";
import {Router} from "@angular/router";
import {SharedService} from "../../../sharedService/shared.service";
import {Actor} from "../../../entities/actor";
import {Genre} from "../../../entities/movie";

declare var $: any;

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: []
})
export class ActorsComponent implements OnInit {

  userIsAdmin = false;

  allActors: Actor[] = [];
  filteredActors: Actor[] = [];

  actorsPerPage = 8;
  rows = [];
  currentPage = 0;

  searchTerm = '';

  birthDateSorting = 0;
  movieCountSorting = 0;


  createActorFormObject: Actor = new Actor();
  editActorFormObject: Actor = new Actor();
  showModalCreateActor = false;
  showModalEditActor = false;
  showModalDeleteActorConfirmation = false;
  actorToBeDeletedId: number;
  viewActorFormObject: Actor = new Actor();
  showModalViewActor = false;

  actorDetails: any = {};

  constructor(private actorsService: ActorsService,
              private sharedService: SharedService,
              public router: Router) {
  }

  ngOnInit() {

    this.userIsAdmin = this.sharedService.userRole == 'Admin';
    this.getAllActors();
  }

  getAllActors() {
    this.actorsService.getAllActors()
      .subscribe(
        response => {
          this.allActors = response;

          this.applySearchAndFilter();
        },
        error => {
          console.log(error);
        }
      );
  }

  changePage(event) {
    this.currentPage = event.page;
  }

  searchActor(term: string) {

    if (term !== '' && !term.trim()) {
      // if not search term, return empty hero array.
      return;
    }

    this.searchTerm = term;

    this.applySearchAndFilter();
  }

  applySearchAndFilter() {

    // apply searching
    this.filteredActors = this.allActors.filter(actor => {
      let lowerCaseName = (actor.firstName + ' ' + actor.lastName).toLowerCase();
      return lowerCaseName.includes(this.searchTerm.toLowerCase());
    });

    // set current page to 0
    this.currentPage = 0;
  }

  sortBirthDate() {
    if(this.birthDateSorting === 0){
      this.filteredActors = this.filteredActors.slice(0).sort((a, b) => {
        return Math.round(new Date(b.birthDate).getTime() / 1000) - Math.round(new Date(a.birthDate).getTime() / 1000);
      });
      this.birthDateSorting = 1;
    }
    else {
      this.filteredActors = this.filteredActors.slice(0).sort((a, b) => {
        return Math.round(new Date(a.birthDate).getTime() / 1000) - Math.round(new Date(b.birthDate).getTime() / 1000);
      });
      this.birthDateSorting = 0;
    }
  }

  sortByMovieCount() {
    if(this.movieCountSorting === 0){
      this.filteredActors = this.filteredActors.slice(0).sort((a, b) => b.moviesCount-a.moviesCount);
      this.movieCountSorting = 1;
    }
    else {
      this.filteredActors = this.filteredActors.slice(0).sort((a, b) => a.moviesCount-b.moviesCount);
      this.movieCountSorting = 0;
    }
  }




  // Functions for modal windows
  initCreateActorForm() {
    this.showModalCreateActor = true;
  }

  initEditActorForm(actor: Actor) {
    this.editActorFormObject = actor;
    this.showModalEditActor = true;
  }

  initViewActorForm(actor: Actor) {
    this.showModalViewActor = true;
    this.viewActorFormObject = actor;

    this.actorsService.getActorDetailsMovies(actor.id).subscribe(
      response => {
        this.actorDetails.movies = response;
      },
      err => console.error(err)
    );
  }

  createActor(value) {

    this.actorsService.saveActor(this.createActorFormObject).subscribe(
      response => {
        this.allActors.push(response);
        this.applySearchAndFilter();
        this.showModalCreateActor = false;
        $("#create-actor-modal").modal("hide");

        // reset create actor form object
        this.createActorFormObject.firstName = '';
        this.createActorFormObject.lastName = '';
        this.createActorFormObject.birthDate = new Date();
      },
      error => {
        console.log(error);
      }
    );
  }

  editActor(value) {

    this.actorsService.updateActor(this.editActorFormObject).subscribe(
      response => {
        this.editActorFormObject = response;
        this.applySearchAndFilter();
        this.showModalEditActor = false;
        $("#edit-actor-modal").modal("hide");
      },
      error => {
        console.log(error);
      }
    );
  }

  showModalDeleteActor(actorId: number) {
    this.showModalDeleteActorConfirmation = true;
    this.actorToBeDeletedId = actorId;
  }

  deleteActor() {
    this.actorsService.deleteActor(this.actorToBeDeletedId).subscribe(
      response => {

        this.allActors = this.allActors.filter(movie => movie.id !== this.actorToBeDeletedId);
        this.applySearchAndFilter();

        this.showModalDeleteActorConfirmation = false;
        $("#delete-actor-confirmation").modal("hide");
      },
      error => {
        console.log(error);
      }
    );
  }

  translateMovieGenre(genre: number): string{
    return Genre[genre];
  }

}
