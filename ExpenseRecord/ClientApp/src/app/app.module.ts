import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import {GreetingComponent} from "./greeting/greeting.component";
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseItemComponent } from './expense-item/expense-item.component';

@NgModule({
    declarations: [
        AppComponent,
        CounterComponent,
        GreetingComponent,
        ExpenseListComponent,
        ExpenseItemComponent
    ],
  imports: [
    RouterModule.forRoot([
      {path: '', component: ExpenseListComponent},
      {path: 'item', component: ExpenseItemComponent}
    ]),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
