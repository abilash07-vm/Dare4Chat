import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFilesComponent } from './add-files/add-files.component';
import { LoginLogoutComponent } from './login-logout/login-logout.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModelComponent } from './profile-model/profile-model.component'
import { SearchComponent } from './search/search.component';
import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire';

// Materail
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule} from '@angular/material/slide-toggle'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTabsModule } from '@angular/material/tabs'
import { MatBadgeModule } from '@angular/material/badge'

// Loading
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from './shared/shared.module';
import { PullToRefreshModule } from '@piumaz/pull-to-refresh';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { ProListComponent } from './pro-list/pro-list.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import { ProfileByIdComponent } from './profile-by-id/profile-by-id.component';

@NgModule({
    declarations: [
        AppComponent,
        AddFilesComponent, 
        LoginLogoutComponent, 
        ProfileComponent,
        ProfileModelComponent,
        SearchComponent,
        NotificationListComponent,
        ProListComponent,
        FriendRequestComponent,
        ProfileByIdComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        // Routing
        AppRoutingModule,
        
        ReactiveFormsModule,
        FormsModule,
        SharedModule,

        // Initialize Firebase
        AngularFireModule.initializeApp(environment.firebaseConfig),

        // Material
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatStepperModule,
        MatChipsModule,
        MatCardModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatTabsModule,
        MatBadgeModule,
    

        // Loading Spinner
        NgxSpinnerModule,

        // Pull to Refresh
        PullToRefreshModule,

       

    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
