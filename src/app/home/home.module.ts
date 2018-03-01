import { HomeService } from './service/home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule, routedComponents } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { Ng2DragDropModule } from 'ng2-drag-drop';


@NgModule({
    imports: [HomeRoutingModule, FormsModule, CommonModule, Ng2DragDropModule.forRoot()],
    declarations: [routedComponents],
    providers: [HomeService]
})

export class HomeModule { }
