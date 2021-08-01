import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFilesComponent } from './add-files/add-files.component';
import { LoginLogoutComponent } from './login-logout/login-logout.component';
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
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatTabsModule} from '@angular/material/tabs'

// Loading
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    declarations: [AppComponent, AddFilesComponent, LoginLogoutComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,

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

        // Loading Spinner
        NgxSpinnerModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
