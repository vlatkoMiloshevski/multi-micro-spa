import { NgModule } from "@angular/core";
import { MoviesComponent } from "./movie.component";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { ErrorService } from "../services/error-handler.service";
import { ApiService } from "../services/api-service";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { moviesReducer } from "../state/movie.reducer";
import { MaterialModule } from "../shared/material.module";
import { MovieEffects } from '../state/movie.effects';
import { EffectsModule } from "@ngrx/effects";


const moviesRoutes: Routes = [];

@NgModule({
    declarations: [
        MoviesComponent
    ],
    imports: [
        MaterialModule,
        HttpClientModule,
        HttpModule,
        BrowserModule,
        FormsModule,
        RouterModule.forChild(moviesRoutes),
        StoreModule.forFeature('movies', moviesReducer),
        EffectsModule.forFeature([MovieEffects])
    ],
    providers: [
        ErrorService,
        ApiService
    ]
})
export class MoviesModule { } 
