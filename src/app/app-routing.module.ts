import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SongListComponent } from './song-list/song-list.component';
import {UserModule} from "./user/user.module";
import {PageComponent} from "./page/page.component";

export const routes: Routes = [

    {path:'user',loadChildren: () => import('./user/user.module').then(module => module.UserModule)},
    {path:'',children:[
            { path: 'list/:term', component: SongListComponent },
            { path: 'list', component: SongListComponent },
            { path: 'album/:id', component: SongListComponent },
            { path: 'singer/:name', component: SongListComponent },
            { path: '', component: LandingComponent }
        ],component:PageComponent},

    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes),
        UserModule
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
