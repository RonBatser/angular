import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute, private _http: HttpService) { }
  private gameId: String;
  
  game : Object;
  

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.gameId = params['id'];
    });

    this.getGame();
  }


 getGame(){
    this._http.getGameState(this.gameId).subscribe(data => {
      console.log(data);
      this.game = data;
    })
  }

  
  goUp(){
    this._http.move(1,this.gameId).subscribe(data => {
      console.log(data);
     
    })
  }

  goLeft(){
    this._http.move(4,this.gameId).subscribe(data => {
      console.log(data);
     
    })
  }

  goRight(){
    this._http.move(2,this.gameId).subscribe(data => {
      console.log(data);
     
    })
  }

  goDown(){
    this._http.move(3,this.gameId).subscribe(data => {
      console.log(data);
     
    })
  }


    
}
