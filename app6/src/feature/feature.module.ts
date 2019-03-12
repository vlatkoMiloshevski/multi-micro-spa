import { NgModule } from '@angular/core';
import { FeatureComponent } from './feature.component';
import { FeatureRoutingModule } from './feature.routing.module';

@NgModule({
    imports: [
        FeatureRoutingModule
    ],
    declarations: [
        FeatureComponent
    ]
})
export class FeatureModule { }