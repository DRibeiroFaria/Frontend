import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortneningComponent } from './shortnening.component';

describe('ShortneningComponent', () => {
  let component: ShortneningComponent;
  let fixture: ComponentFixture<ShortneningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortneningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortneningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
