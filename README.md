# special-waddle


Клонируйте ваш репозиторий на локальную машину:

git clone https://github.com/HandsomeBiba/special-waddle.git
cd special-waddle
Создайте README.md файл в корне репозитория: Сохраните следующее содержимое в файле README.md:

# MyAwesomeProject

## Описание
Это проект сгенерирован с помощью Amplication. Он включает два сервиса: MoviesService и UserRolesService. MoviesService управляет фильмами, а UserRolesService управляет пользователями и их ролями.

## Установка
Для выполнения установки необходимо скачать репозиторий и установить все необходимые зависимости:
```sh
git clone https://github.com/HandsomeBiba/special-waddle
cd special-waddle
npm install
Запуск

Для запуска приложения выполните команду:

npm start
Сервисы

MoviesService

Описание: Сервис для управления фильмами.

Сущности
Film
Поля:
id: Integer
title: String
director: String
releaseDate: DateTime
UserRolesService

Описание: Сервис для управления пользователями и их ролями.

Сущности
Role
Поля:
id: Integer
name: String
User
Описание: Автоматически созданная сущность для управления пользователями в сервисе.
Поля:
id: Integer
username: String
password: String
roles: [Role]
API Документация

API документация доступна по адресу: http://localhost:5000/api-docs

Примеры использования API

Для взаимодействия с API через терминал используйте команды curl:

Получить все фильмы
curl -X GET "http://localhost:5000/films"
Добавить новый фильм
curl -X POST "http://localhost:5000/films" -H "Content-Type: application/json" -d '{"title": "Inception", "director": "Christopher Nolan", "releaseDate": "2010-07-16"}'
Получить всех пользователей
curl -X GET "http://localhost:5000/users"
Добавить нового пользователя
curl -X POST "http://localhost:5000/users" -H "Content-Type: application/json" -d '{"username": "john_doe", "password": "123456", "roles": [{"id": 1, "name": "Admin"}]}'
Внутренняя документация

Swagger Документация

Для генерации документации с помощью Swagger:

Установите необходимые зависимости:

npm install swagger-jsdoc swagger-ui-express --save
Создайте файл swagger.js:

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'MyAwesomeProject API',
      description: 'API Information',
      contact: {
        name: 'Developer',
      },
      servers: ['http://localhost:5000'],
    },
  },
  apis: ['index.js', './routes/*.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
Интегрируйте Swagger в ваше приложение:

const app = require('./swagger');
app.listen(5000, () => console.log(`Server is running on port 5000`));
JSDoc Документация

Для генерации внутренней документации с помощью JSDoc:

Установите JSDoc:

npm install -g jsdoc
Создайте файл jsdoc.json:

{
  "tags": {
    "allowUnknownTags": true
  },
  "source": {
    "include": ["src"],
    "includePattern": ".js$",
    "excludePattern": "(node_modules/|docs)"
  },
  "opts": {
    "destination": "./docs",
    "recurse": true
  }
}
Сгенерируйте документацию:

jsdoc -c jsdoc.json
Это создаст папку docs с HTML файлами документации.

Заключение

Это README предоставляет подробное описание вашего приложения, его компонентов и шагов для запуска и использования. Следуя этим инструкциям, любой пользователь сможет выполнить установку и запуск вашего проекта.

Добавьте и закоммитьте файл:

git add README.md
git commit -m "Add detailed README file"
git push origin main
