import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { PostModelComponent } from './post-model/post-model.component';
import { SearchFilterPipe } from './search-filter.pipe';


// Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedialogComponent } from './sharedialog/sharedialog.component';

@NgModule({
  declarations: [
    UserListComponent,
    PostModelComponent,
    SearchFilterPipe,
    SharedialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    // Material
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatBadgeModule,
    MatDialogModule,
    MatCheckboxModule,

    //Spinner
    NgxSpinnerModule
  ],
  exports: [
    UserListComponent,
    PostModelComponent,
    SharedialogComponent,

    SearchFilterPipe,
    
    MatBadgeModule,
    MatDialogModule,
    MatCheckboxModule,
    
    NgxSpinnerModule,
  ]
})
export class SharedModule { }
