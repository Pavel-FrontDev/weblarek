import "./scss/styles.scss";
import { EventEmitter } from "./components/base/Events";
import { Catalog } from "./components/Models/CatalogModel";
import { Basket } from "./components/Models/BasketModel";
import { Buyer } from "./components/Models/BuyerModel";
import { apiProducts } from "./utils/data";
import { Api } from "./components/base/Api";
import { AppApi } from "./components/base/appApi";
import { API_URL } from "./utils/constants";
import { IApi } from "./types";
//нужен для конструкторов

const events = new EventEmitter();

//проверка Каталога

const catalog = new Catalog(events);
catalog.setItems(apiProducts.items);
console.log("Все товары каталога:", catalog.getItems());
console.log('Товар с id="1":', catalog.getItem("1"));

//проверка корзины

const basket = new Basket(events);

//добавляем первый товар

const firstProduct = catalog.getItems()[0];
basket.addItem(firstProduct);
console.log("Корзина после добавления:", basket.getItems());
console.log("Общая стоимость:", basket.getTotal());
console.log("Количество товаров:", basket.getCount());

//добавляем второй товар

const secondProduct = catalog.getItems()[1];
if (secondProduct) basket.addItem(secondProduct);
console.log("Корзина после добавления второго товара:", basket.getItems());

//удаляем первый товар

basket.removeItem(firstProduct.id);
console.log("корзина после удаления:", basket.getItems());

//проверка наличия товара

console.log('Есть ли товар с id="2" в корзине', basket.contains("2"));

//проверка покупателя

const buyer = new Buyer(events);
buyer.setField('email', 'test@mail.ru');
buyer.setField('phone', '+7 999 999 99 99');
buyer.setField('address', 'ул. Пушкина, д. 1');
buyer.setField('payment', 'card');

console.log('Данные покупателя', buyer.getData());
console.log('Валидация (проверка на ошибки)', buyer.validate());

//проверка валидации при пустых полях
buyer.clear();
buyer.setField('email', '');
console.log('Валидация после очистки', buyer.validate());


//коммуникационый слой

//создаем экземпляр Api для связи с сервером
const api: IApi = new Api(API_URL); 

//создаем коммуникационный слой
const appApi = new AppApi(api);

//запрос на сервер для получения товаров

appApi.getProduct()
  .then((response) => {
    catalog.setItems(response.item);
    console.log('товары с сервера', catalog.getItems());
    console.log(`загружено ${catalog.getItems().length} товаров`)
  })
  .catch((error) => {
    console.error('ошибка загрузки товаров', error);
  })

