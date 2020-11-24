import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  constructor(private _http: HttpService) {}
  
  difficulty: number;
  gameId: string;

  ngOnInit(): void {
  }

  changeToEasy(){
    this.difficulty = 0;
  }

  changeToNormal(){
    this.difficulty = 1;
  }

  changeToHard(){
    this.difficulty = 2;
  }

  createGame(){
    this._http.createGame(this.difficulty).subscribe(data => {
      console.log(data);
      this.gameId = data;
    })
  }



  helloWorldFunc(){
  
  }

}
