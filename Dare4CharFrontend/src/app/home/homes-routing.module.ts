import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './comments/comments.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
    { path: 'comments/:postid' ,component:CommentsComponent},
    { path: '', component: MainComponent },  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
