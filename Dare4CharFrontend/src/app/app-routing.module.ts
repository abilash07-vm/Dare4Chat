import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFilesComponent } from './add-files/add-files.component';
import { AuthGuard } from './auth.guard';
import { LoginLogoutComponent } from './login-logout/login-logout.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'add',
        canActivate: [AuthGuard],
        component: AddFilesComponent,
    },
    
    {
        path: 'auth',
        component: LoginLogoutComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
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
