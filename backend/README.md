# API FINANCEIRA

## Inciar Projeto

     npm install && npm run dev

ou

     npm install && npm run build && npm start

## Estrutura: MVC

### controllers

* **categoryController:** controlador responsável pela rota *category*, com suas respectivas rotas de CRUD;

* **servicesController:** controlador responsável pela rota *services*, com sua respectivas rotas de CRUD;

* **validateFieldsController:** controlador responsávle pela validação de dados, onde há a presença de duas classes, uma para validar *services*, outra, para *category*, tendo como método príncipal da respectivas classes o *init*;

### models

* **categoryModel:** model responsável pelo CRUD da rota category, com um atributo *name (String)*, *description (String)*;

* **servicesModel:** model responsável pelo CRUD da rota services, com um abributo *name (String)*, *description (String)*, *price (Number)*, *category (String)*, *creatAt (Date)*;

### routes

* **categoryRoute:** responsável pela rota *category*, chamando seus respectivos controllers para o CRUD;

* **servicesRoute:** responsável pela rota *services*, chamando seus respectivos controllers para o CRUD;

### db.ts

* Usado para realizar a conexão com o banco de dados mongodb

### server.ts

* Arquivo main da aplicação

## Modos de uso

### GET

#### /services

* Envia como resposta um json com todos os serviços cadastrados;

#### /services/:id

* Envia como resposta um json com o serviço correspondente ao id

#### /category

* Envia como resposta um json com todas as categórias cadastradas;

#### /category/:id

* Envia como resposta um json com a categória correspondente ao id

### POST

#### /services/add

* Usado para adicionar um serviço, para isso, envie um json com os campos *name*, *description*, *price*, *category*;

* O campo *name* precisa ter de 3 a 20 caracteres;

* O campo *description* precisa ter de 3 a 100 caracteres;

* O campo *price* precisa ser um valor maior ou igual a 0;

* O campo *category* precisa corresponder ao nome de uma categória cadastrada no sistema (*/category/add*);

#### /category/add

* Usado para adicionar uma categória, para isso, envie um json com os campos *name*, *description*;

* O campo *name* precisa ter de 3 a 20 caracteres;

* O campo *description* precisa ter de 3 a 100 caracteres;

### DELETE

#### /services/delete

* Usado para deletar um serviço, para isso, envie um json com o campo *id*;

* O *id* correpondente ao serviço que deseja deletar;

#### /category/delete

* Usado para deletar uma categória, para isso, evie um json com o campo *id*;

* O *id* correspondente a categória que deseja deletar;

### PUT

#### /services/update

* Usado para atualizar os dados de um serviço, para isso, envie um json com os campos *id*, *name*, *description*, *price*, *category*;

* *id* do serviço que deseja atualizar

* O campo *name* precisa ter de 3 a 20 caracteres;

* O campo *description* precisa ter de 3 a 100 caracteres;

* O campo *price* precisa ser um valor maior ou igual a 0;

* O campo *category* precisa corresponder ao nome de uma categória cadastrada no sistema (*/category/add*);

#### /category/update

* Usado para atualizar os dados de uma categória, para isso, envie um json com os campos *id*, *name*, *description*;

* *id* do serviço que deseja atualizar

* O campo *name* precisa ter de 3 a 20 caracteres;

* O campo *description* precisa ter de 3 a 100 caracteres;
  
## Criado por: Rafael Vizú
