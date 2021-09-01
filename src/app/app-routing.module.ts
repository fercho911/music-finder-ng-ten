import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicFinderComponent } from './components/music-finder/music-finder.component';

const routes: Routes = [
  { path: '',component: MusicFinderComponent},
  { path: 'music-finder', component: MusicFinderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
