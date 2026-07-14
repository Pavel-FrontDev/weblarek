export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash';

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;   
}

export interface IBuyer {
  payment: TPayment | null; // 'cash' | 'card' 
  address: string;
  phone: string;
  email: string;   
}

export interface IProductResponse {
  total: number;
  items: IProduct[];
}

export interface IOrderData extends IBuyer {
  items: string[];
  total: number;
}

export interface IOrderResult extends IBuyer {
  id: string;
  total: number;
}