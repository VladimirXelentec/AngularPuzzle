import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PuzzleElementComponent } from './puzzle_element/puzzle_element.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2DragDropModule } from 'ng2-drag-drop';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CommonModule, Ng2DragDropModule.forRoot(), ModalModule.forRoot()],
	exports: [RouterModule]
})

export class HomeRoutingModule { }

export const routedComponents = [
	HomeComponent,
	PuzzleElementComponent

];