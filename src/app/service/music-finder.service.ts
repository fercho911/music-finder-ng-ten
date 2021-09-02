import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  action_get_token = environment.URL_MUSIC_FINDER.AUTORIZE_ACTIONS.TOKEN;
  action_refresh_token = environment.URL_MUSIC_FINDER.AUTORIZE_ACTIONS.TOKEN;
  client_secret = environment.URL_MUSIC_FINDER.CLIENT_SECRET;
  base_url = environment.URL_MUSIC_FINDER.BASE_URL;
  search_artist = environment.URL_MUSIC_FINDER.ACTIONS.SEARCH_ARTIST;
  get_tracks = environment.URL_MUSIC_FINDER.ACTIONS.GET_TRACKS;

  constructor(    @Inject(DOCUMENT) private document: Document,
  private http: HttpClient

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
      this.getTokenPromise(code);
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

  
  getToken(code) {
    let url = this.authorize_base_url + this.action_get_token;

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri',   this.call_back_url  );

    return this.http.post(url, body, {
      headers: new HttpHeaders({
        Authorization:
          'Basic ' + btoa(this.client_id + ':' + this.client_secret),
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }

  getTokenPromise(code: String) {
    this.getToken(code).subscribe(
      (response: any) => {
        console.log(response)
        
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.access_token);
        
        let expires = Date.now() + response.expires_in * 1000;
        localStorage.setItem('expires_in', expires.toString());
      },
      (error: any) => {
        localStorage.setItem('access_token', '');
        localStorage.setItem('refresh_token', '');
      }
    );
  }


  refreshToken() {
    let code = localStorage.getItem('refresh_token');

    let url = this.authorize_base_url + this.action_get_token;
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('code', code);

    return this.http.post(url, body, {
      headers: new HttpHeaders({
        Authorization:
          'Basic ' + btoa(this.client_id + ':' + this.client_secret),
          'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }


  refreshTokenPromise() {
    this.refreshToken().subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        let expires = Date.now() + response.expires_in * 1000;
        localStorage.setItem('expires_in', expires.toString());
      },
      (error: any) => {
        localStorage.setItem('access_token', '');
        localStorage.setItem('refresh_token', '');
      }
    );
  }
  
  tokenIsActive(): boolean {
    let expires_in = parseInt(localStorage.getItem('expires_in'));
    let now = Date.now();

    if (expires_in > now) {
      return true;
    } else {
      return false;
    }
  }

  
  getArtistListByname(name: String) {
    let token = localStorage.getItem('access_token');
    console.log(token);
    let url = this.base_url + this.search_artist + name;
    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
  }

  getTrackListByartist(id: String) {
    let token = localStorage.getItem('access_token');
    console.log(token);
    let url = this.base_url + this.get_tracks + id;
    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
  }


}
