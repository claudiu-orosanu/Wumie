import {Component, OnInit} from '@angular/core';
import {MoviesService} from "./movies.service";
import {Router} from "@angular/router";
import {DropdownValue} from "../../../entities/dropdownValue";
import {Genre, Movie} from "../../../entities/movie";
import {SharedService} from "../../../sharedService/shared.service";

declare var $: any;

enum MovieFilterValues {
  ALL_MOVIES        = 1,
  WATCHED_MOVIES    = 2
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: []
})
export class MoviesComponent implements OnInit {

  userIsAdmin = false;

  allMovies: Movie[] = [];
  filteredMovies: Movie[] = [];

  moviesPerPage = 3;
  rows = [];
  currentPage = 0;

  filterValues: DropdownValue[] = [new DropdownValue(1, 'All movies'), new DropdownValue(2, 'Watched movies')];
  selectedFilter = this.filterValues[0];
  searchTerm = '';

  genreValues: DropdownValue[] = [new DropdownValue(-1, 'All genres'), new DropdownValue(Genre.Action, 'Action'), new DropdownValue(Genre.Adventure, 'Adventure'),
    new DropdownValue(Genre.Comedy, 'Comedy'), new DropdownValue(Genre.Drama, 'Drama'), new DropdownValue(Genre.Horror, 'Horror'),
    new DropdownValue(Genre['Science Fiction'], 'Science Fiction'), new DropdownValue(Genre.Historical, 'Historical'),
    new DropdownValue(Genre.Musical, 'Musical'), new DropdownValue(Genre.Western, 'Western')];
  selectedGenreFilter = this.genreValues[0];

  releaseDateSorting = 0;
  boxOfficeSorting = 0;
  actorCountSorting = 0;


  movieFormObject: Movie = new Movie();
  editMovieFormObject: Movie = new Movie();
  showModalCreateMovie = false;
  showModalEditMovie = false;
  showModalDeleteMovieConfirmation = false;
  movieToBeDeletedId: number;
  viewMovieFormObject: Movie = new Movie();
  showModalViewMovie = false;

  showModalAddActors = false;
  addActorsSelectedMovie: Movie;
  addActorsFormObject: any = [];

  genres: string[] = [Genre[0],Genre[1],Genre[2],Genre[3],Genre[4],Genre[5],Genre[6],Genre[7],Genre[8]];

  movieDetails: any = {};

  constructor(private moviesService: MoviesService,
              public sharedService: SharedService,
              public router: Router) {
  }

  ngOnInit() {

    this.getAllMovies();
    this.userIsAdmin = this.sharedService.userRole === 'Admin';
  }

  getAllMovies() {
    this.moviesService.getAllMovies()
      .subscribe(
        response => {
          this.allMovies = response;

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

  setFilter(selectedValue) {
    this.selectedFilter = selectedValue;

    this.applySearchAndFilter();
  }

  setGenreFilter(selectedValue) {
    this.selectedGenreFilter = selectedValue;

    this.applySearchAndFilter();
  }

  searchMovie(term: string) {

    if (term !== '' && !term.trim()) {
      // if not search term, return empty hero array.
      return;
    }

    this.searchTerm = term;

    this.applySearchAndFilter();
  }

  applySearchAndFilter() {

    // todo move filtering / searching / pagination to backend

    // apply filtering
    switch (this.selectedFilter.id) {
      case MovieFilterValues.ALL_MOVIES :
        this.filteredMovies = this.allMovies;
        break;
      case MovieFilterValues.WATCHED_MOVIES :
        this.filteredMovies = this.allMovies.filter(item => item.watched);
        break;
    }

    switch (this.selectedGenreFilter.id) {
      case -1 :
        this.filteredMovies = this.filteredMovies;
        break;
      case Genre.Action :
        this.filteredMovies = this.filteredMovies.filter(item => item.genre === Genre.Action);
        break;
      case Genre.Adventure :
        this.filteredMovies = this.filteredMovies.filter(item => item.genre === Genre.Adventure);
        break;
      case Genre.Comedy :
        this.filteredMovies = this.filteredMovies.filter(item => item.genre === Genre.Comedy);
        break;
      case Genre.Drama :
        this.filteredMovies = this.filteredMovies.filter(item => item.genre === Genre.Drama);
        break;
      case Genre.Horror :
        this.filteredMovies = this.filteredMovies.filter(item => item.genre === Genre.Horror);
        break;
      case Genre['Science Fiction'] :
        this.filteredMovies = this.filteredMovies.filter(item => item.genre === Genre['Science Fiction']);
        break;
      case Genre.Historical :
        this.filteredMovies = this.filteredMovies.filter(item => item.genre === Genre.Historical);
        break;
      case Genre.Musical :
        this.filteredMovies = this.filteredMovies.filter(item => item.genre === Genre.Musical);
        break;
      case Genre.Western :
        this.filteredMovies = this.filteredMovies.filter(item => item.genre === Genre.Western);
        break;
    }

    // apply searching
    this.filteredMovies = this.filteredMovies.filter(movie => {
      let lowerCaseTitle = movie.title.toLowerCase();
      return lowerCaseTitle.includes(this.searchTerm.toLowerCase());
    });

    // set current page to 0
    this.currentPage = 0;
  }

  sortReleaseDate() {
    if(this.releaseDateSorting === 0){
      this.filteredMovies = this.filteredMovies.slice(0).sort((a,b) => {
        return Math.round(new Date(b.releaseDate).getTime() / 1000) - Math.round(new Date(a.releaseDate).getTime() / 1000);
      });
      this.releaseDateSorting = 1;
    }
    else {
      this.filteredMovies = this.filteredMovies.slice(0).sort((a,b) => {
        return Math.round(new Date(a.releaseDate).getTime() / 1000) - Math.round(new Date(b.releaseDate).getTime() / 1000);
      });
      this.releaseDateSorting = 0;
    }
  }

  sortBoxOffice() {
    if(this.boxOfficeSorting === 0){
      this.filteredMovies = this.filteredMovies.slice(0).sort((a,b) => b.boxOffice - a.boxOffice);
      this.boxOfficeSorting = 1;
    }
    else {
      this.filteredMovies = this.filteredMovies.slice(0).sort((a,b) => a.boxOffice - b.boxOffice);
      this.boxOfficeSorting = 0;
    }
  }

  sortActorsCount() {
    if(this.actorCountSorting === 0){
      this.filteredMovies = this.filteredMovies.slice(0).sort((a,b) => b.actorsCount - a.actorsCount);
      this.actorCountSorting = 1;
    }
    else {
      this.filteredMovies = this.filteredMovies.slice(0).sort((a,b) => a.actorsCount - b.actorsCount);
      this.actorCountSorting = 0;
    }
  }

  translateMovieGenre(genre: number): string{
    return Genre[genre];
  }


  // Functions for modal windows
  initCreateMovieForm() {
    this.showModalCreateMovie = true;
  }

  initEditMovieForm(movie: Movie) {
    this.editMovieFormObject = movie;
    this.showModalEditMovie = true;
  }
  createMovie(value) {

    this.moviesService.saveMovie(this.movieFormObject).subscribe(
      response => {
        this.allMovies.push(response);
        this.applySearchAndFilter();
        this.showModalCreateMovie = false;
        $("#create-movie-modal").modal("hide");

        // reset create movie form object
        this.movieFormObject.title = '';
        this.movieFormObject.plot = '';
        this.movieFormObject.runtime = 0;
        this.movieFormObject.genre = Genre.Action;
        this.movieFormObject.releaseDate = new Date();
        this.movieFormObject.boxOffice = 0;
      },
      error => {
        console.log(error);
      }
    );
  }

  editMovie(value) {

    this.moviesService.updateMovie(this.editMovieFormObject).subscribe(
      response => {
        this.editMovieFormObject = response;
        this.applySearchAndFilter();
        this.showModalEditMovie = false;
        $("#edit-movie-modal").modal("hide");
      },
      error => {
        console.log(error);
      }
    );
  }

  showModalDeleteMovie(movieId: number) {
    this.showModalDeleteMovieConfirmation = true;
    this.movieToBeDeletedId = movieId;
  }

  deleteMovie() {
    this.moviesService.deleteMovie(this.movieToBeDeletedId).subscribe(
      response => {

        this.allMovies = this.allMovies.filter(movie => movie.id !== this.movieToBeDeletedId);
        this.applySearchAndFilter();

        this.showModalDeleteMovieConfirmation = false;
        $("#delete-movie-confirmation").modal("hide");
      },
      error => {
        console.log(error);
      }
    );
  }

  initViewMovieForm(movie: Movie) {
    this.showModalViewMovie = true;
    this.viewMovieFormObject = movie;

    this.moviesService.getMovieDetailsActors(movie.id).subscribe(
      response => {
        this.movieDetails.actors = response;
      },
      err => console.error(err)
    );
  }

  initAddActorsForm(movie: Movie) {
    this.addActorsFormObject = [];
    this.showModalAddActors = true;
    this.addActorsSelectedMovie = movie;

    this.moviesService.getAllActors().subscribe(
      allActors => {

        this.moviesService.getMovieDetailsActors(movie.id).subscribe(
          actors => {

            for(let actor of allActors){
              if(!actors.filter(ac => ac.id === actor.id).length){
                this.addActorsFormObject.push(actor);
              }
            }
          }
        );
      }
    );
  }

  addActorsToMovie(){
    let selectedActorsIds = [];

    for (let actor of this.addActorsFormObject){
      if(actor.selected) {
        selectedActorsIds.push(actor.id);
      }
    }

    if(!selectedActorsIds.length) {
      return;
    }

    this.moviesService.addActorsToMovie(this.addActorsSelectedMovie.id, selectedActorsIds).subscribe(
      response => {
        this.addActorsSelectedMovie.actorsCount += response;
        this.showModalAddActors = false;
        $("#add-actors-movie-modal").modal("hide");
      },
      err => console.error(err)
    );
  }

  addMovieToWatchlist(){
    let movieId = this.viewMovieFormObject.id;

    if(this.viewMovieFormObject.watched){
      this.moviesService.removeMovieFromWatchlist(movieId).subscribe(
        response => {
          this.viewMovieFormObject.watched = false;
          this.showModalViewMovie = false;
          $("#view-movie-modal").modal("hide");
        },
        err => console.error(err)
      );
    }
    else {
      this.moviesService.addMovieToWatchlist(movieId).subscribe(
        response => {
          this.viewMovieFormObject.watched = true;
          this.showModalViewMovie = false;
          $("#view-movie-modal").modal("hide");
        },
        err => console.error(err)
      );
    }

  }

}
