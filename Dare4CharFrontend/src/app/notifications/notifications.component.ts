import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/Services/api.service';
import { ComponentCanDeactivate } from 'src/Services/pending-changes-guard.guard';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit,ComponentCanDeactivate {

  constructor(private api:ApiService) { }
  @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
      // insert logic to check if there are pending changes here;
      // returning true will navigate without confirmation
      // returning false will show a confirm dialog before navigating away
      return true;
    }

  ngOnInit(): void {
  }

}
