import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {CriteriaFormComponent} from './components/criteria-form/criteria-form.component';
import {MessageModule} from "primeng/message";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {AlternativesFormComponent} from './components/alternatives-form/alternatives-form.component';
import {HttpClientModule} from "@angular/common/http";
import {FileUploadModule} from "primeng/fileupload";
import {MessageService} from "primeng/api";
import {RankingDisplayComponent} from './components/ranking-display/ranking-display.component';
import {ImageModule} from "primeng/image";
import {GalleriaModule} from "primeng/galleria";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { ParametersFormComponent } from './components/parameters-form/parameters-form.component';
import {CheckboxModule} from "primeng/checkbox";
import {TableModule} from "primeng/table";

@NgModule({
  declarations: [
    AppComponent,
    CriteriaFormComponent,
    AlternativesFormComponent,
    RankingDisplayComponent,
    ParametersFormComponent
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
    FileUploadModule,
    ImageModule,
    GalleriaModule,
    ProgressSpinnerModule,
    CheckboxModule,
    FormsModule,
    TableModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
