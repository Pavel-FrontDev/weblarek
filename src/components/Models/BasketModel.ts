import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";


export class Basket {
  private _items: IProduct[] = [];
  private _events: EventEmitter;

  constructor(events: EventEmitter) {
    this._events = events;
  }

  getItems(): IProduct[] {
    return this._items;
  }

  addItem(product: IProduct): void {
    if(!this.contains(product.id)) {
      this._items.push(product);
      this._events.emit('backet:changed', this._items);
    }
  }

  removeItem(productId: string): void {
    this._items = this._items.filter(item => item.id !== productId);
    this._events.emit('backet:changed', this._items)
  }

  clear(): void {
    this._items = [];
    this._events.emit('backet:changed', this._items)
  }

  getTotal(): number {
    return this._items.reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  getCount(): number {
    return this._items.length;
  }

  contains(id: string): boolean {
    return this._items.some(item => item.id === id);
  }

}