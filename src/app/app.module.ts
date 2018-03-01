import { AppConfig } from './app.config';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlertModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

/* App Root */
import { AppComponent } from './app.component';



/* Routing Module */
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
	imports: [

	AlertModule.forRoot(),
		BrowserModule,
		AppRoutingModule,
		FormsModule
	],
	declarations: [AppComponent],
	providers: [{ provide: AppConfig, useValue: process.env.APP_CONFIG }, { provide: APP_BASE_HREF, useValue: '/' }],
	bootstrap: [AppComponent]
})
export class AppModule { }
