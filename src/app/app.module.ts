import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { WorldComponent } from './world/world.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { PokemonsService } from './services/pokemons.service';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },  
  { path: 'auth/signin', component: SigninComponent },
  { path: 'world', canActivate: [AuthGuardService], component: WorldComponent },
  { path: 'pokedex', canActivate: [AuthGuardService], component: PokedexComponent },
  { path: 'pokemon/:id', canActivate: [AuthGuardService], component: PokemonComponent },
  { path: '', redirectTo: 'world', pathMatch: 'full' },
  { path: '**', redirectTo: 'world'}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    WorldComponent,
    PokedexComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    PokemonsService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
