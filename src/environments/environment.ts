// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_MUSIC_FINDER:{
    BASE_URL: "https://api.spotify.com/v1/",
    CLIENT_ID:"05191478809144e087396785ac211504",
    CLIENT_SECRET:"836e9fba2e5d4d7a876593ca5caa6a1a",
    CALL_BACK_URL:"http://localhost:4200/music-finder",
    ACTIONS : { 
        SEARCH_ARTIST: "search?type=artist&market=US&limit=10&offset=5&q=",
        GET_TRACKS:"tracks?ids="
      },
      AUTORIZE_BASE_URL: "https://accounts.spotify.com/",
      AUTORIZE_ACTIONS : { 
      AUTORIZE:"authorize",
      TOKEN:"api/token",
      }
  
    },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
