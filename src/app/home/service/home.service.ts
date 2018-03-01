import { AppConfig } from './../../app.config';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {
    userName: string;
    constructor(appConfig: AppConfig) {
       
    }
}