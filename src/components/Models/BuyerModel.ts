import { IBuyer, TPayment } from "../../types";
import { EventEmitter } from "../base/Events";

export class Buyer {
  private _payment: TPayment | null = null;
  private _address: string = "";
  private _phone: string = "";
  private _email: string = "";
  private _events: EventEmitter;

  constructor(events: EventEmitter) {
    this._events = events;
  }

  setField<K extends keyof IBuyer>(field: K, value: IBuyer[K]): void {
    switch(field) {
      case 'payment':
        this._payment = value as TPayment;
        break;
      case 'address':
        this._address = value as string;
        break;
      case 'phone':
        this._phone = value as string;
        break;
      case 'email':
        this._email = value as string;
        break;
    }
    this._events.emit('buyer:changed', this.getData());
  }

  getData(): IBuyer {
    return {
     payment: this._payment, 
     address: this._address,
     phone: this._phone,
     email: this._email
    }
  }

  clear():void {
    this._payment = null;
    this._address = '';
    this._phone = '';
    this._email = '';
    this._events.emit('buyer:cleared')
  }

  validate(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};
    if(this._payment === null) errors.payment = 'Не выбран способ оплаты';
    if(!this._address.trim()) errors.address = 'Укажите адрес';
    if(!this._phone.trim()) errors.phone = 'Укажите телефон';
    if(!this._email.trim()) errors.email = 'Укажите email';

    return errors;
  }
}
