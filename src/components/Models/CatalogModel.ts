import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";


export class Catalog {
  private _items: IProduct[] = [];
  private _selectedItem: IProduct | null = null;
  private _events: EventEmitter;

  constructor(events: EventEmitter) {
    this._events = events;
  }

  // Сохранить массив товаров
  setItems(items: IProduct[]): void {
    this._items = items;
    this._events.emit('catalog:changed', this._items);
  }

  
  // Получить все товары
  getItems(): IProduct[] {
    return this._items;
  }
  
  // Найти товар по id
  getItem(id: string): IProduct | undefined{
    return this._items.find(item => item.id === id);
  }

  //сохранение товара для подробного отображения
  setSelectedItem(item: IProduct) : void {
    this._selectedItem = item;
    this._events.emit('catalog:selected', this._selectedItem);
  }

  //получение выбранного товара для подробного отображения
  getSelectedItem(): IProduct | null {
    return this._selectedItem;
  }
}

