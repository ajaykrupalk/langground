import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelsComponent } from './components/models/models.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SecretsComponent } from './components/secrets/secrets.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { SettingsComponent } from './components/settings/settings.component';
import { MessageboxComponent } from './components/messagebox/messagebox.component';
import { ModelcardComponent } from './components/modelcard/modelcard.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ChatLayoutComponent } from './components/chat-layout/chat-layout.component';
import { ChatResponseComponent } from './components/chat-response/chat-response.component';
import { UserResponseComponent } from './components/user-response/user-response.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ModelsComponent,
    SecretsComponent,
    SettingsComponent,
    MessageboxComponent,
    ModelcardComponent,
    HeaderComponent,
    ChatLayoutComponent,
    ChatResponseComponent,
    UserResponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzSelectModule,
    NzDropDownModule,
    NzSliderModule,
    NzToolTipModule,
    NzInputModule,
    NzIconModule,
    NzInputNumberModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
