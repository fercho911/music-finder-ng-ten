import { Component, OnInit } from '@angular/core';
import {MusicFinderService} from '../../service/music-finder.service'


@Component({
  selector: 'app-music-finder',
  templateUrl: './music-finder.component.html',
  styleUrls: ['./music-finder.component.css']
})
export class MusicFinderComponent implements OnInit {
   
  showWelcomeMessage :boolean = true;
  
  
  constructor(private musicService: MusicFinderService){ 

      if(this.musicService.isThereAuthCode()){
        this.showWelcomeMessage = false;
        console.log("here constructor");
      }

  }

  authorize(): void {
     this.musicService.autorize();
  }
  

  ngOnInit(): void {

    


  }

}
