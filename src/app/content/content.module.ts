import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import { ContentRoutingModule } from './content-routing.module';
import { NewsComponent } from './components/news/news.component';
import { CoreModule } from '../core/core.module';
import { NewsDataComponent } from './components/news-data/news-data.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    NewsComponent,
    NewsDataComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class ContentModule { }
