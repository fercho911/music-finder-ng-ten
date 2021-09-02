import { Component, OnInit } from '@angular/core';
import {MusicFinderService} from '../../service/music-finder.service'
import { Artist} from '../../entities/artist'

@Component({
  selector: 'app-music-finder',
  templateUrl: './music-finder.component.html',
  styleUrls: ['./music-finder.component.css']
})
export class MusicFinderComponent  {
   
  showWelcomeMessage :boolean = true;
  artist: Artist[] = [];
  trackList: any[]=[];

  constructor(private musicService: MusicFinderService){ 

      if(this.musicService.isThereAuthCode()){
        this.showWelcomeMessage = false;
        console.log("here constructor");
      }

  }

  authorize(): void {
     this.musicService.autorize();
  }
  
  findArtistByname(e) {
    let name = e.target.value;
    if (name.length >= 3) {
      if (this.musicService.tokenIsActive()) {
        this.musicService.getArtistListByname(name).subscribe(
          (response: any) => {
            this.artist = response.artists.items;
            console.log(this.artist);
          },
          (error: any) => {
            if (error.message == 'The access token expired') {
              this.musicService.refreshTokenPromise();
            }
          }
        );
      }else{
        console.log("refresing token")
        this.musicService.refreshTokenPromise();
      }
    }
  }

  searchArtist(e) {
    let name = e.target.value;
    console.log(name);
     let art = this.artist.filter((x) => x.name === name)[0];
    console.log("id" +art.id);
    this.getTrackListByartist("7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B");
  }


  getTrackListByartist(id : String) {
      if (this.musicService.tokenIsActive()) {
        this.musicService.getTrackListByartist(id).subscribe(
          (response: any) => {
            //this.trackList = response.trackList.items;
            console.log(response);
          },
          (error: any) => {
            if (error.message == 'The access token expired') {
              this.musicService.refreshTokenPromise();
            }
          }
        );
      }else{
        console.log("refresing token")
        this.musicService.refreshTokenPromise();
      }
    
  }


}
