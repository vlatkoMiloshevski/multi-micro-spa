import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureModule } from './feature/feature.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: 'nested',
        // loadChildren: './feature/feature.module#FeatureModule'
        loadChildren: () => FeatureModule
    }
];
@NgModule({
    imports: [
        RouterModule,
		RouterModule.forRoot(routes, {
			useHash: true
        })
    ],
    exports: [RouterModule]
})
export class MainRoutingModule { }