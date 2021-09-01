import { Component, OnInit } from '@angular/core';
import {MusicFinderService} from '../../service/music-finder.service'


@Component({
  selector: 'app-music-finder',
  templateUrl: './music-finder.component.html',
  styleUrls: ['./music-finder.component.css']
})
export class MusicFinderComponent implements OnInit {

  showWelcomeMessage :boolean = false;


  constructor(private musicService: MusicFinderService) {

  }

  authorize(): void {
     this.musicService.autorize();
  }
  

  ngOnInit(): void {

    


  }

}
