import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {AuthGuard} from "../../AuthentificationGuard/auth.guard";
import {MoviesComponent} from "./movies/movies.component";
import {ActorsComponent} from "./actors/actors.component";

const homeRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'movies',
        component: MoviesComponent
      },
      {
        path: 'actors',
        component: ActorsComponent
      }
    ]
  }
];

export const HomeRoutes = RouterModule.forChild(homeRoutes);

