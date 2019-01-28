import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { ErrorService } from "../services/error-handler.service";
import { ApiService } from "../services/api-service";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { CoversComponent } from "./cover.component";
import { coversReducer } from "../state/cover.reducer";
import { MaterialModule } from "../shared/material.module";

const moviesRoutes: Routes = [];

@NgModule({
    declarations: [
        CoversComponent
    ],
    imports: [
        MaterialModule,
        HttpClientModule,
        HttpModule,
        BrowserModule,
        FormsModule,
        RouterModule.forChild(moviesRoutes),
        StoreModule.forFeature('covers', coversReducer)
    ],
    providers: [
        ErrorService,
        ApiService
    ]
})
export class CoversModule { }
