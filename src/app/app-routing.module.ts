import { AddTeamComponent } from './components/add-team/add-team.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from './components/matches/matches.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { TeaminfoComponent } from './components/teaminfo/teaminfo.component';
import { WeatherComponent } from './weather/weather.component';


const routes: Routes = [
  // http://localhost:4200
  { path: "", component: HomeComponent },
  // http://localhost:4200/connexion
  { path: "connexion", component: LoginComponent },
  // http://localhost:4200/subscription
  { path: "subscription", component: SignupComponent },
  // http://localhost:4200/matches
  { path: "matches", component: MatchesComponent },
  // http://localhost:4200/addMatch
  { path: "addMatch", component: AddMatchComponent },
  { path: "editMatch/:id", component: AddMatchComponent },
  // http://localhost:4200/addPlayer
  { path: "addPlayer", component: AddPlayerComponent },
  { path: "editPlayer/:id", component: AddPlayerComponent },
  // http://localhost:4200/addTeam
  { path: "addTeam", component: AddTeamComponent },
  { path: "editTeam/:id", component: AddTeamComponent },
  { path: "teaminfo/:id", component: TeaminfoComponent },
  // http://localhost:4200/admin
  { path: "admin", component: AdminComponent },
  // http://localhost:4200/match-info
  // :id  => ID est un parametre
  { path: "matchInfo/:x", component: MatchInfoComponent },
  { path: "weather", component: WeatherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
