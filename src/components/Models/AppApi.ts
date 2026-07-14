import { IApi } from "../../types";
import { IProductResponse, IOrderData, IOrderResult } from "../../types";

export class AppApi {
  private _api: IApi;

  // принимаем объект реализующий интерфейс IApi
  constructor(api: IApi) {
    this._api = api;
  }
  
  //получение списка товаров
  getProduct(): Promise<IProductResponse> {
    return this._api.get('/product/') as Promise<IProductResponse>;
  }

  //отправка заказа
  postOrder(order: IOrderData): Promise<IOrderResult> {
    return this._api.post('/order/', order) as Promise<IOrderResult>;
  }
}

