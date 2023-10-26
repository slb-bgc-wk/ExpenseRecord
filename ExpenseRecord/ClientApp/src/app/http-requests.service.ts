import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Item, ItemPost } from './expense-list/expense-list.component';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  private baseUrl: string;

  constructor(private http: HttpClient,  @Inject('BASE_URL') baseUrl: string) { 
    this.baseUrl = baseUrl;
  }

  getAll() {
    var url = this.baseUrl + 'api/v1/ExpenseItems';
    return this.http.get<Item[]>(url);
  }

  create(item: ItemPost) {
    var url = this.baseUrl + 'api/v1/ExpenseItems';
    return this.http.post(url, item);
  }

  delete(id : string) {
    var url = this.baseUrl + 'api/v1/ExpenseItems/' + id;
    return this.http.delete(url);
  }
}
