import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelcardComponent } from './modelcard.component';

describe('ModelcardComponent', () => {
  let component: ModelcardComponent;
  let fixture: ComponentFixture<ModelcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelcardComponent]
    });
    fixture = TestBed.createComponent(ModelcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
