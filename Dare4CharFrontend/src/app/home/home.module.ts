import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { StatusComponent } from './status/status.component';
import { ChatComponent } from './chat/chat.component';
import { MainComponent } from './main/main.component';
import { HomeRoutingModule } from './homes-routing.module';
import { CommentsComponent } from './comments/comments.component';
import { StatusModelComponent } from './status-model/status-model.component';

// Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatMenuModule } from '@angular/material/menu'
import { MessagePageComponent } from './message-page/message-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    declarations: [
        PostComponent,
        StatusComponent,
        ChatComponent,
        MainComponent,
        CommentsComponent,
        StatusModelComponent,
        MessagePageComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        SharedModule,

        //Material
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatProgressBarModule,
        MatMenuModule
    ],
})
export class HomeModule {}
