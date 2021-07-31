import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { StatusComponent } from './status/status.component';
import { ChatComponent } from './chat/chat.component';
import { MainComponent } from './main/main.component';
import { HomeRoutingModule } from './homes-routing.module';
import { PostModelComponent } from './post-model/post-model.component';

// Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
    declarations: [
        PostComponent,
        StatusComponent,
        ChatComponent,
        MainComponent,
        PostModelComponent,
        CommentsComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        //Material
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule
    ],
})
export class HomeModule {}
