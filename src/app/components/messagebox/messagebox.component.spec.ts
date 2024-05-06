import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageboxComponent } from './messagebox.component';

describe('MessageboxComponent', () => {
  let component: MessageboxComponent;
  let fixture: ComponentFixture<MessageboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageboxComponent]
    });
    fixture = TestBed.createComponent(MessageboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
