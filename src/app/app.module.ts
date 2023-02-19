import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CupEventComponent } from './components/cup-event/cup-event.component';
import { ResultComponent } from './components/result/result.component';
import { NewsComponent } from './components/news/news.component';
import { StatsComponent } from './components/stats/stats.component';
import { BlogComponent } from './components/blog/blog.component';
import { NewsInfoComponent } from './components/news-info/news-info.component';
import { ArticleComponent } from './components/article/article.component';
import { MatchesComponent } from './components/matches/matches.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { MatchesTableComponent } from './components/matches-table/matches-table.component';
import { TeamsTableComponent } from './components/teams-table/teams-table.component';
import { PlayersTableComponent } from './components/players-table/players-table.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { TeaminfoComponent } from './components/teaminfo/teaminfo.component';
import { PlayerinfoComponent } from './components/playerinfo/playerinfo.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { AsterixPipe } from './pipes/asterix.pipe';
import { MyFilterPipe } from './pipes/my-filter.pipe';
import { HttpClientModule } from "@angular/common/http";
import { JwPaginationModule } from 'jw-angular-pagination';
import { WeatherComponent } from './weather/weather.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CupEventComponent,
    ResultComponent,
    NewsComponent,
    StatsComponent,
    BlogComponent,
    NewsInfoComponent,
    ArticleComponent,
    MatchesComponent,
    AddMatchComponent,
    AddPlayerComponent,
    AddTeamComponent,
    AdminComponent,
    MatchesTableComponent,
    TeamsTableComponent,
    PlayersTableComponent,
    MatchInfoComponent,
    TeaminfoComponent,
    PlayerinfoComponent,
    ReversePipe,
    AsterixPipe,
    MyFilterPipe,
    WeatherComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
