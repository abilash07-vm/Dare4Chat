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



@NgModule({
  declarations: [
    UserListComponent,
    PostModelComponent,
    SearchFilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,

    // Material
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule
    // MatSnackBarModule,
  ],
  exports: [
    UserListComponent,
    PostModelComponent,
    SearchFilterPipe,

  ]
})
export class SharedModule { }
