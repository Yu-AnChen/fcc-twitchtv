import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchtvComponent } from './twitchtv.component';

describe('TwitchtvComponent', () => {
  let component: TwitchtvComponent;
  let fixture: ComponentFixture<TwitchtvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchtvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
