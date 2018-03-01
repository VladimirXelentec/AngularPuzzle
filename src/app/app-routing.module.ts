import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
	{ path: '', loadChildren: './home/home.module#HomeModule?sync=true' },
	{ path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes),CommonModule],
	exports: [RouterModule]
})

export class AppRoutingModule { }
