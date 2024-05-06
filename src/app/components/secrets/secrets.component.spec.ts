import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretsComponent } from './secrets.component';

describe('SecretsComponent', () => {
  let component: SecretsComponent;
  let fixture: ComponentFixture<SecretsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecretsComponent]
    });
    fixture = TestBed.createComponent(SecretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
