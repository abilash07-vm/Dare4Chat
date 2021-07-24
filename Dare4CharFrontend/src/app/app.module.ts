import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFilesComponent } from './add-files/add-files.component';
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

@NgModule({
    declarations: [AppComponent, AddFilesComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
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
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
