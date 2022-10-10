import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditurlComponent } from './editurl.component';

describe('EditurlComponent', () => {
  let component: EditurlComponent;
  let fixture: ComponentFixture<EditurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
