import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatResponseComponent } from './chat-response.component';

describe('ChatResponseComponent', () => {
  let component: ChatResponseComponent;
  let fixture: ComponentFixture<ChatResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatResponseComponent]
    });
    fixture = TestBed.createComponent(ChatResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
