import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFilesComponent } from './add-files/add-files.component';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'add',
        component: AddFilesComponent,
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
