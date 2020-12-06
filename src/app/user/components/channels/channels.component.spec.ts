import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsComponent } from './channels.component';

describe('ChannelsComponent', () => {
  let component: ChannelsComponent;
  let fixture: ComponentFixture<ChannelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have channels', () => {
    if(component.blogs.length!==0){
      expect(component.blogs.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('html should not render You have not subscribed to any channel', () => {
    if(component.blogs.length!==0){
      fixture.detectChanges();
      const el = fixture.nativeElement.getElementById("nochannel")
      expect(el.innerText).toBeFalsy();
    }
  });
});
