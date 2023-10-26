import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpRequestsService } from '../http-requests.service';

export interface Item {
  id : string,
  discription : string,
  createdTime: string,
  count : number,
  type: string
}

export interface ItemPost {
  Discription : string,
  Count : number,
  Type: string
}

@Component({
  selector: 'expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit, OnDestroy {

  item_list : Item[] = [];
  subscription : Subscription | undefined;

  constructor(private http : HttpRequestsService) { }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  desUpSort = false;
  timeUpSort = false;
  TypeUpSort = false;
  newitem_disc = "";
  newitem_type = "";
  newitem_count = 0;


  filter_items_list : Item[] = [];

  ngOnInit(): void {
    this.reloadItemList();
  }

  reloadItemList() {
    this.subscription = this.http.getAll().subscribe( res => {
      this.item_list = this.filter_items_list = res;
      this.timeSortAgainstTime();
      console.log("Reload Sucessfully")
    }
    );
  }

  filter(query : string) {
    if (!query) {
      this.filter_items_list = this.item_list;
      return;
    }
    this.filter_items_list = this.item_list.filter(item => 
      item?.discription.toLowerCase().includes(query.toLowerCase()) 
    )
    console.log(query);
  }

  onTypeSort() {
    if (this.TypeUpSort) {
      this.typeSortByAlphabet();
    } else {

      this.typeSortAgainstAlphabet();
    }
    this.TypeUpSort = !this.TypeUpSort;
  }

  typeSortByAlphabet () {
    this.filter_items_list = this.filter_items_list.sort((n1,n2) => {
      if(n1.type > n2.type) {
        return 1;
      }
      if (n1.type < n2.type) {
        return -1;
      }
      return 0;
    });
  }

  typeSortAgainstAlphabet() {
    this.filter_items_list = this.filter_items_list.sort((n1,n2) => {
      if(n1.type > n2.type) {
        return -1;
      }
      if (n1.type < n2.type) {
        return 1;
      }
      return 0;
    });
  }


  onTimeSort() {
    if (this.timeUpSort) {
      this.timeSortAgainstTime();
    } else {

      this.timeSortByTime();
    }
    this.timeUpSort = !this.timeUpSort;
  }

  timeSortByTime() {
    this.filter_items_list = this.filter_items_list.sort((n1,n2) => {
      if(n1.createdTime > n2.createdTime) {
        return 1;
      }
      if (n1.createdTime < n2.createdTime) {
        return -1;
      }
      return 0;
    });
  }

  timeSortAgainstTime() {
    this.filter_items_list = this.filter_items_list.sort((n1,n2) => {
      if(n1.createdTime > n2.createdTime) {
        return -1;
      }
      if (n1.createdTime < n2.createdTime) {
        return 1;
      }
      return 0;
    });
  }


  onDiscSort() {
    if (this.desUpSort) {
      this.descSortByAlphabet();
    } else {
      this.desSortAgainstAlphabet();
    }

    this.desUpSort = !this.desUpSort;
  }

  descSortByAlphabet () {
    this.filter_items_list = this.filter_items_list.sort((n1,n2) => {
      if(n1.discription > n2.discription) {
        return 1;
      }
      if (n1.discription < n2.discription) {
        return -1;
      }
      return 0;
    });
  }

  desSortAgainstAlphabet() {
    this.filter_items_list = this.filter_items_list.sort((n1,n2) => {
      if(n1.discription > n2.discription) {
        return -1;
      }
      if (n1.discription < n2.discription) {
        return 1;
      }
      return 0;
    });
  }

  onCreate(){
    var newItem : ItemPost = {
      Discription : this.newitem_disc,
      Type: this.newitem_type,
      Count: this.newitem_count
    } 
    this.subscription = this.http.create(newItem).subscribe(res => {
      console.log(res);
      this.reloadItemList();
      this.newitem_count = 0;
      this.newitem_type = "";
      this.newitem_disc = "" });
  }

  onDelete(id : string) {
    var confirmRes = confirm("Are you sure to DELETE this item?");
    if (confirmRes) {
      this.subscription = this.http.delete(id).subscribe(res => {
        console.log("delete successfully!")
        this.reloadItemList();
      })
    }
    // this.subscription = this.http.
  }

  onReload() {
    this.reloadItemList();
  }

  

}
