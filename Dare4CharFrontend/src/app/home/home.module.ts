import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { StatusComponent } from './status/status.component';
import { ChatComponent } from './chat/chat.component';
import { MainComponent } from './main/main.component';
import { HomeRoutingModule } from './homes-routing.module';

// Material
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [
        PostComponent,
        StatusComponent,
        ChatComponent,
        MainComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        //Material
        MatTabsModule,
    ],
})
export class HomeModule {}
