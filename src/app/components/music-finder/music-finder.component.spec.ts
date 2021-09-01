import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicFinderComponent } from './music-finder.component';

describe('MusicFinderComponent', () => {
  let component: MusicFinderComponent;
  let fixture: ComponentFixture<MusicFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
