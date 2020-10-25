# example-deno-crud-api [Work In Progress 🛠]
An example CRUD (Create, Read, Update, Delete) API built using [MongoDB](https://deno.land/x/mongo@v0.13.0) &amp; [oak](https://deno.land/x/oak@v6.3.1) on [Deno](https://deno.land)

Includes API Server utilities:

* [oak](https://deno.land/x/oak@v6.3.1)
  * A middleware framework for Deno's http server, including a router middleware.
* [deno_mongo](https://deno.land/x/mongo@v0.13.0)
  * deno_mongo is a MongoDB database driver developed for deno, based on rust's official mongodb library package.
* [dotenv](https://deno.land/x/dotenv@v0.5.0)
  * Dotenv handling for deno.


## Run

```bash
cd src/
deno run main.ts
```
