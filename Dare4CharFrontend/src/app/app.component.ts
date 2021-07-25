import { Component } from '@angular/core';
import { AuthService } from 'src/Services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Dare4CharFrontend';
    constructor(private authServices: AuthService) {
        this.authServices.setUserId('admin-123');
    }
}
