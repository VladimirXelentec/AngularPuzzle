import { HomeService } from './../service/home.service';
import { Component, OnInit ,AfterViewInit, ViewChild, ElementRef, TemplateRef, ViewContainerRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Observable} from 'rxjs/Rx';
import {Subscription} from "rxjs";
import axios from "axios";

export interface PuzzlePlace{
  id:{
    x:number,
    y:number
  };
  element?: PuzzleElement;
}

export interface PuzzlePlaceRow{
  rows: number;
  places?: PuzzlePlace[];
}


export interface PuzzleElement {
 id:{
    x:number,
    y:number
  };
  position:{
    top: number;
    left: number;
  };
  dimensions:{
    width: number;
    height: number;
  }
}

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
   @ViewChild('endGame') endGame: TemplateRef<any>;

    user_name: string;
    greyzone: any;
    modalRef: BsModalRef;
    puzzle_picture: string;
    game_zone: PuzzlePlaceRow[];
    puzzles: PuzzleElement[];
    seconds=0;
    subscription: Subscription;
    timer: any;
    winners: any[];
    settings: {
    height:number;
    width:number;
    cols:number;
    rows:number;
    };
    cols_arr : number[];
    rows_arr : number[];
    puzzle_height: number;
    puzzle_width: number;
    status: number; //0 - pre-start, 1- game, 2- win/statistics


    constructor(private elementRef:ElementRef, homeService: HomeService,   private _modalService: BsModalService) {
    this.settings = {
    height:400,
         width:400,
      cols:4,
      rows:4
    };
    this.cols_arr = Array(this.settings.cols).fill(0).map((x,i)=>i+1);
    this.rows_arr = Array(this.settings.rows).fill(0).map((x,i)=>i+1);
    this.puzzle_picture = "/assets/img/kotel.jpg";
    this.puzzle_height = this.settings.height / this.settings.rows;
    this.puzzle_width = this.settings.width / this.settings.cols;
  
    }


    ngOnInit() {
       this.timer = Observable.timer(0,1000);
    this.setDefault();
             $(() => {
        });
    }
  

onPuzzleDrop(e: any, place: PuzzlePlace) {
       if(e.dragData.id.x === place.id.x && e.dragData.id.y === place.id.y )
       {
       place.element = e.dragData;
       this.removePuzzle(e.dragData);
       this.checkResult();
       }
        
    }

setDefault(){
    this.game_zone=[];
    this.puzzles=[];
    this.game_zone=[];
    this.seconds = 0;
    this.makePuzzles();
    this.status = 0;
}

checkResult(){
  if(this.puzzles.length<1){
  this.status = 2;
  this.game_zone=[];
  this.subscription.unsubscribe();
  }
}

startGame(){
   this.status = 1;
   this.subscription = this.timer.subscribe(t=>this.seconds = t);
}

save(){

 this.status = 3;

 axios.post(`http://localhost:3000/scores`, {
    user_name: this.user_name,
    seconds: this.seconds.toString()
  }).then(() =>{
  return axios.get(`http://localhost:3000/scores?_sort=seconds&_order=asc&_limit=10`);
  })
  .then((request) =>{
    console.log(request);
    this.winners =  request.data;
     this.openModal(this.endGame) ;
  });

}

makePuzzles(){
  for(let y = 1; y<= this.settings.rows; y++ ){
   
    let puzzle_raw = {rows:y, places:[]}  as PuzzlePlaceRow;
       
      for(let x = 1; x<= this.settings.cols; x++ ){
       puzzle_raw.places.push({id:{x,y}});

        this.puzzles.push(
        {id:{x,y},
         position:{ 
         top: Math.floor(Math.random() * ((this.settings.height - this.puzzle_height) - 1 + 1)) + 1 ,
         left: Math.floor(Math.random() * ((this.settings.width - this.puzzle_width)  - 1 + 1)) + 1 
         },
         dimensions:
         {height:this.puzzle_height,
         width: this.puzzle_width}
        });
      }
    this.game_zone.push(puzzle_raw);
    }

   
  }

removePuzzle(puzzle: PuzzleElement ){
   let index = this.puzzles.indexOf(puzzle, 0);
   if (index > -1) {
   this.puzzles.splice(index, 1);
    }
 }

   openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }
}