import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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

  game: Object;


  netGulls: Array<{ x: number, y: number, v: string }> = [];
  fireWalls: Array<{ x: number, y: number, v: string }> = [];
  position: { x: number, y: number, v: string };
  mcAfeeL: { x: number, y: number, v: string };
  gameState: number;
  difficulty: number;

  board: Array<{ x: number, y: number, v: string }> = [];

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.gameId = params['id'];
    });

    this.getGame();
   
  }

  createBoard(){
    this.board = [];
   for (let i = 0; i < this.game["boardWidth"]; i++) {
     for (let j = 0; j < this.game["boardHeight"]; j++) {
      
      this.board.push({x: i , y: j, v: "e"});
     }
     
   }

    console.log(this.board);
   this.netGulls= this.game["netgullLocations"];
   this.fireWalls = this.game["firewallLocations"];
   this.position = this.game["playerLocation"];
   this.mcAfeeL = this.game["mcafeeLocation"];
   this.gameState = this.game["gameState"];
   this.difficulty = this.game["difficulty"];
    this.addNetGulls(this.board);
    this.addFirewalls(this.board);
   this.addPlayer(this.board);
   this.addMcAfee(this.board);
   
   console.log(this.game["firewallLocations"]);
   console.log(this.fireWalls);
  }


  addNetGulls(board){
    this.netGulls.forEach(netGull => {
     this.board.forEach(tile =>{
       if(tile.x == netGull.x && tile.y == netGull.y){
         tile.v = "n";
       }
     } )
    });

  }

  addFirewalls(board){
    this.fireWalls.forEach(firewall => {
     this.board.forEach(tile =>{
       if(tile.x == firewall.x && tile.y == firewall.y){
         tile.v = "f";
       }
     } )
    });

  }

 addPlayer(board){
   this.board.forEach(tile => {
    if(tile.x == this.position.x && tile.y == this.position.y){
      tile.v = "p";
    }
   })
 }

 addMcAfee(board){
  this.board.forEach(tile => {
    if(tile.x == this.mcAfeeL.x && tile.y == this.mcAfeeL.y){
      tile.v = "m";
    }
   })
 }

  

  




  getGame() {
    this._http.getGameState(this.gameId).subscribe(data => {
      console.log(data);
      this.game = data;
      this.createBoard();
    })
  }


  goUp() {
    this._http.move(4, this.gameId).subscribe(data => {
      this.game = data;
      this.createBoard();

    })
  }

  goLeft() {
    this._http.move(3, this.gameId).subscribe(data => {
      this.game = data;
      this.createBoard();

    })
  }

  goRight() {
    this._http.move(1, this.gameId).subscribe(data => {
      this.game = data;
      this.createBoard();

    })
  }

  goDown() {
    this._http.move(2, this.gameId).subscribe(data => {
      this.game = data;
      this.createBoard();
    })
  }



}
