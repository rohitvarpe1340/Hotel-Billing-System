import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavebillComponent } from './savebill.component';

describe('SavebillComponent', () => {
  let component: SavebillComponent;
  let fixture: ComponentFixture<SavebillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavebillComponent]
    });
    fixture = TestBed.createComponent(SavebillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
