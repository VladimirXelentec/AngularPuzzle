import { Component, OnInit, Output, Input } from '@angular/core';
import { PuzzleElement } from '../home/home.component';


@Component({
  selector: 'puzzle-element',
  templateUrl: 'puzzle_element.component.html',
  styleUrls: ['puzzle_element.component.scss']
})

export class PuzzleElementComponent implements OnInit  {
  @Input() image_url:string;
  @Input('element')  data: PuzzleElement;
  height: number;
  width:number;
  image_x: number;
  image_y: number;
  
  constructor() {
   }

 ngOnInit() {
        this.height=this.data.dimensions.height;
        this.width=this.data.dimensions.width; 
        this.image_y = (-1) * (this.data.id.y - 1) * this.height;
        this.image_x = (-1) * (this.data.id.x - 1) * this.width;
    }


}
