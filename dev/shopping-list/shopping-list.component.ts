/**
 * Created by Iulian on 23/06/16.
 */
import {Component} from 'angular2/core';
import {ShoppingListNewItemComponent} from "./shopping-list-new-item.component";
import {ListItem} from "../list-item";
import {ShoppingListItemComponent} from "./shopping-list-item.component";
import {ShoppingListService} from "./shopping-list.service";
import {FilterPipe} from "../filter.pipe";

@Component({
  selector: 'shopping-list',
  template: `
    <section>
      <!--<shopping-list-new-item (itemAdded)="onItemAdded($event)"></shopping-list-new-item>-->
      <shopping-list-new-item></shopping-list-new-item>
    </section>
    <section>
      <h3>My List</h3>
      Filter:
      <input type="text" #filter (keyup)="0">
      <div class="list">
        <ul>
          <li *ngFor="#listItem of listItems | myFilter:filter.value" (click)="onSelect(listItem)">{{listItem.name}} 
          ({{listItem.amount
          }})</li>
        </ul>
      </div>
    </section>
    <section *ngIf="selectedItem != null">
        <!--<shopping-list-item [item]="selectedItem" (removed)="onRemove($event)"></shopping-list-item>-->
        <shopping-list-item [item]="selectedItem" (removed)="onRemove()"></shopping-list-item>
    </section>
  `,
    directives: [ShoppingListNewItemComponent, ShoppingListItemComponent],
    providers: [ShoppingListService],
    pipes: [FilterPipe]
})

export class ShoppingList{
  //listItems = new Array<ListItem>();
  listItems: Array<ListItem>;
  selectedItem : ListItem;

  constructor(private _shoppingListService: ShoppingListService){}

/*
  onItemAdded(item: ListItem){
    this.listItems.push({name: item.name, amount: item.amount});
  }
*/

  onSelect(item:ListItem){
    this.selectedItem = item;
  }

  onRemove(){
    this.selectedItem = null;
  }

  ngOnInit():any {
    this.listItems = this._shoppingListService.getItems();
  }

/*  onRemove(item:ListItem){
    this.listItems.splice(this.listItems.indexOf(item),1);
    this.selectedItem = null;
  }*/
}
