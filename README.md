<h1 align="center">
    <img alt="Rocketseat GoStack" src="https://camo.githubusercontent.com/d25397e9df01fe7882dcc1cbc96bdf052ffd7d0c/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f676f6c64656e2d77696e642f626f6f7463616d702d676f737461636b2f6865616465722d6465736166696f732e706e67" width="100%" />
</h1>

## Rocketseat

# :rocket: Desafio 09: Database relations

> TUDO ESTÁ BEM!!!!!.  <img src="https://user-images.githubusercontent.com/20192309/80777643-4202cd80-8b3c-11ea-8f32-5348bda4486b.jpg" width="10%" />

## Sobre o desafio

Nesse desafio, você vai criar uma nova aplicação para aprender novas coisas e treinar o que aprendeu até agora no Node.js junto ao TypeScript, incluindo o uso de banco de dados com o TypeORM, e relacionamentos ManyToMany!

A imagem mostra como as rotas funcionam e os dados que ela retorna.

![desafio09](https://user-images.githubusercontent.com/20192309/83372153-e9249000-a39a-11ea-8f05-341d6ec57c0b.gif)

## Versão

<a href="https://nodejs.org/pt/"> NodeJS 12.16.2 </a> <br/>
<a href="https://www.notion.so/Instalando-Docker-6290d9994b0b4555a153576a1d97bee2"> Docker 19.03.6 </a> <br/>
<a href="https://hub.docker.com/_/postgres"> Banco de dados Postgres </a> <br />
<a href="https://typeorm.io/#/">TypeORM </a>

## Instalação dos pacotes

````sh
yarn
````

## Iniciar uma API

````sh
yarn dev:server
````

## Usando a API

Criar um novo Cliente na aplicação método POST, chame a URL http://localhost:3333/customers/ no <a href="https://www.postman.com/downloads/">Postman</a>, no <a href="https://insomnia.rest/download/>Insomnia</a> ou na sua aplicação e informe o corpo da requisição:

Corpo da requisição:

Aqui nessa requisição você deve passar o nome e e-mail do cliente

JSON

````sh
{
  "name": "Rocketseat",
  "email": "oi@rocketseat.com.br"
}
````

Ele retorna os dados do cliente cadastrado:

JSON

````sh
{
    "name": "Rocketseat",
    "email": "oi@rocketseat.com.br",
    "id": "b2eb5934-45ee-4ab7-856f-a1e39cc5e82c",
    "created_at": "2020-06-01T06:06:23.419Z",
    "updated_at": "2020-06-01T06:06:23.419Z"
}
````

Cadastrando novos produtos com o método POST, chame a URL http://localhost:3333/products/

Corpo da requisição, para criar um novo produto

````sh
{
  "name": "Curso de NodeJS",
  "price": "100",
  "quantity": 100
}
````

Ele retorna os dados do produto cadastrado:

JSON

````sh
{
    "name": "Curso de NodeJS",
    "price": 100,
    "quantity": 100,
    "id": "54fe5d82-eafd-42ce-adf6-da2380683426",
    "created_at": "2020-06-01T06:16:04.831Z",
    "updated_at": "2020-06-01T06:16:04.831Z"
}
````

Fazer um pedido com o cliente e o produto cadastrado com o método POST, chame um URL http://localhost:3333/orders/

Para fazer um novo pedido: 

````sh
{
  "customer_id": "b2eb5934-45ee-4ab7-856f-a1e39cc5e82c",
  "products": [
    {
      "id": "54fe5d82-eafd-42ce-adf6-da2380683426",
      "quantity": 3
    }
  ]
}
````

Ele retornará o código:

JSON

````sh
{
    "customer_id": "b2eb5934-45ee-4ab7-856f-a1e39cc5e82c",
    "customer": {
        "id": "b2eb5934-45ee-4ab7-856f-a1e39cc5e82c",
        "name": "Rocketseat",
        "email": "oi1@rocketseat.com.br",
        "created_at": "2020-06-01T06:06:23.419Z",
        "updated_at": "2020-06-01T06:06:23.419Z"
    },
    "order_products": [
        {
            "product_id": "54fe5d82-eafd-42ce-adf6-da2380683426",
            "price": "100",
            "quantity": 3,
            "order_id": "e59b1b08-562e-44b7-8fb2-8a825ae73cdd",
            "id": "9949a330-2a7f-408a-955d-43000b98f9fc",
            "created_at": "2020-06-01T06:19:54.918Z",
            "updated_at": "2020-06-01T06:19:54.918Z"
        }
    ],
    "id": "e59b1b08-562e-44b7-8fb2-8a825ae73cdd",
    "created_at": "2020-06-01T06:19:54.918Z",
    "updated_at": "2020-06-01T06:19:54.918Z"
}
````

Para consultar a compra que foi feita de acordo com o código do order com o método GET, chame um URL http://localhost:3333/orders/e59b1b08-562e-44b7-8fb2-8a825ae73cdd

````sh
{
    "id": "e59b1b08-562e-44b7-8fb2-8a825ae73cdd",
    "customer_id": "b2eb5934-45ee-4ab7-856f-a1e39cc5e82c",
    "created_at": "2020-06-01T06:19:54.918Z",
    "updated_at": "2020-06-01T06:19:54.918Z",
    "customer": {
        "id": "b2eb5934-45ee-4ab7-856f-a1e39cc5e82c",
        "name": "Rocketseat",
        "email": "oi1@rocketseat.com.br",
        "created_at": "2020-06-01T06:06:23.419Z",
        "updated_at": "2020-06-01T06:06:23.419Z"
    },
    "order_products": [
        {
            "id": "9949a330-2a7f-408a-955d-43000b98f9fc",
            "order_id": "e59b1b08-562e-44b7-8fb2-8a825ae73cdd",
            "product_id": "54fe5d82-eafd-42ce-adf6-da2380683426",
            "price": "100.00",
            "quantity": "3",
            "created_at": "2020-06-01T06:19:54.918Z",
            "updated_at": "2020-06-01T06:19:54.918Z"
        }
    ]
}
````

Feito com ♥ by Kayza :wave:
