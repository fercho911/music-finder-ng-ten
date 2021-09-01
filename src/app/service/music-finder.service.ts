import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MusicFinderService {
  
  authorize_base_url = environment.URL_MUSIC_FINDER.AUTORIZE_BASE_URL;
  action_autorize = environment.URL_MUSIC_FINDER.AUTORIZE_ACTIONS.AUTORIZE;
  client_id = environment.URL_MUSIC_FINDER.CLIENT_ID;
  call_back_url = environment.URL_MUSIC_FINDER.CALL_BACK_URL;

  constructor(    @Inject(DOCUMENT) private document: Document
  ) { }

  autorize() {

    alert("here")
    //validate if  is there an auth code storaged
    let code = localStorage.getItem('code');
    if (code == null || code == '' || code == undefined) {
      //validate if is there an auth code in the url
      if (this.getCode() == null) {
        alert(
          'You are about to be redirect to spotify login page, please log in and grant us access to continue '
        );
        let url = this.authorize_base_url + this.action_autorize;
        let query =
          '?' +
          'client_id=' +
          this.client_id +
          '&response_type=code&redirect_uri=' +
          this.call_back_url +
          '&show_dialog=true';
        this.document.location.href = url + query;
        this.getCode();
      }
    }
  }


  getCode() {
    let code = null;
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    if (urlParams.has('code')) {
      code = urlParams.get('code');
      localStorage.setItem('code', code);
    } else if (urlParams.has('error')) {
      alert(
        'validation failed for the following reason :' +
          urlParams.get('error') +
          ' ' +
          urlParams.get('status')
      );
    }

    return code;
  }

  isThereAuthCode(){
    let code = localStorage.getItem('code');
    if (code == null || code == '' || code == undefined){
      if (this.getCode() == null) {
          return false;
      }
    }
    return true;
  }

  




}
