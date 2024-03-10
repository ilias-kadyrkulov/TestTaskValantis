# Тестовое задание от Valantis

## Страница, которая отображает список товаров.

## Выполнены требования:
* для каждого товара `отображается` его `id`, `название`, `цена` и `бренд`.
* выводить по `50 товаров` на страницу с возможностью `постраничного перехода` в обе стороны.
* возможность `фильтровать` выдачу используя API по `названию`, `цене` и `бренду`.
* `дубли` по `id` сортированы `Map` коллекцией; `при ошибке` от API выводится `идентификатор ошибки` в консоль и отправляется повторно запрос с последующим успешным логированием.

## Выполнено на стэке:
* React/TS
* Tanstack (React) Query/axios
* Tailwind CSS

## Деплой
* [Vercel](https://test-task-valantis-kappa.vercel.app/)

## Инициализация веб-приложения
**1**. 
```js
npm i
```
или
```js
yarn
```

**2**.
```js
npm run dev
```
или
```js
yarn dev
```