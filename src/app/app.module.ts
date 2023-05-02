import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {CriteriaFormComponent} from './components/criteria-form/criteria-form.component';
import {MessageModule} from "primeng/message";
import {ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {AlternativesFormComponent} from './components/alternatives-form/alternatives-form.component';
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {FileUploadModule} from "primeng/fileupload";
import {MessageService} from "primeng/api";
import { RankingDisplayComponent } from './components/ranking-display/ranking-display.component';

@NgModule({
  declarations: [
    AppComponent,
    CriteriaFormComponent,
    AlternativesFormComponent,
    RankingDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    AppRoutingModule,
    MessageModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    MessagesModule,
    ToastModule,
    HttpClientModule,
    FileUploadModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
