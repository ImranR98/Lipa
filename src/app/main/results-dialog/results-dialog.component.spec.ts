import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResultsDialogComponent } from './results-dialog.component';

describe('ResultsDialogComponent', () => {
  let component: ResultsDialogComponent;
  let fixture: ComponentFixture<ResultsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
