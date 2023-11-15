import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Card game';
  current_page = "title";
  cards_folded = false;

  constructor() {}

  myHand: string[] = [];
  myValues: string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "valet", "dame", "roi", "as"];
  myRandomValuesOrder = this.myValues.sort((a, b) => 0.5 - Math.random());

  mySymbols: string[] = ["trefle", "coeur", "carreau", "pique"];
  myRandomSymbolsOrder = this.mySymbols.sort((a, b) => 0.5 - Math.random());

  drawMyHand(): void {
    this.current_page = "unsorted_hand";

    this.myHand = [];
    for(var i=0; i < 10; i++) {
      let getNewCard: boolean = false;
      while(!getNewCard) {
        const symbol: string = this.mySymbols[Math.floor(Math.random() * 3)];
        const value: string = this.myValues[Math.floor(Math.random() * 12)];
        const card: string = '/assets/img/' + value + '_' + symbol + '.png';
        if(!this.myHand.includes(card)) {
          this.myHand.push(card)
          getNewCard = true;
        };
      }
    }
  }

  sortMyHand(): void {
    this.cards_folded = true;

    addEventListener("animationend", (ev) => {
      if (ev.animationName.includes("card-1-2")) {

        if(this.myRandomSymbolsOrder.length && this.myRandomValuesOrder.length) {
          let sortArray: string[] = []
          this.myRandomSymbolsOrder.forEach(symbol => {
            this.myRandomValuesOrder.forEach(value => {
              if(this.myHand.includes('/assets/img/' + value + '_' + symbol + '.png')) {
                sortArray.push('/assets/img/' + value + '_' + symbol + '.png')
              }
            })
          })
          this.myHand = sortArray;
        }

        this.current_page = "sorted_hand";
        this.cards_folded = false;
      }
    });
  }
}
