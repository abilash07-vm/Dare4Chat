import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFilesComponent } from './add-files/add-files.component';
import { AuthGuard } from './auth.guard';
import { LoginLogoutComponent } from './login-logout/login-logout.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component'
import { PendingChangesGuard } from '../Services/pending-changes-guard.guard';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { PostModelComponent } from './shared/post-model/post-model.component';
import { ProListComponent } from './pro-list/pro-list.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { ProfileModelComponent } from './profile-model/profile-model.component';

const routes: Routes = [
    {
        path: 'home',
        canActivate: [AuthGuard],
        canDeactivate: [PendingChangesGuard],
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'add',
        canActivate: [AuthGuard],
        component: AddFilesComponent,
        canDeactivate: [PendingChangesGuard]
    },
    
    {
        path: 'auth',
        component: LoginLogoutComponent
    },
    {
        path: 'profileid/:userid',
        canActivate: [AuthGuard],
        canDeactivate: [PendingChangesGuard],
        component: ProfileModelComponent
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        canDeactivate: [PendingChangesGuard],
        component: ProfileComponent
    },{
        path: 'search',
        canActivate: [AuthGuard],
        canDeactivate: [PendingChangesGuard],
        component: SearchComponent
    },
    {
        path: 'notifications',
        canActivate: [AuthGuard],
        canDeactivate: [PendingChangesGuard],
        component: NotificationListComponent
    },
    {
        path: 'post/:postid',
        canActivate: [AuthGuard],
        component: PostModelComponent
    },{
        path:'pro',
        canActivate: [AuthGuard],
        component: ProListComponent
    },{
        path: 'req',
        canActivate: [AuthGuard],
        component: FriendRequestComponent
    },
    // { 
    //     path: '**',
    //     redirectTo: '/home', 
    //     pathMatch: 'full' 
    // }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
