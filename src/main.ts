// Third-Party Modules
import 'https://deno.land/x/dotenv/load.ts';
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { MongoClient } from 'https://deno.land/x/mongo@v0.12.1/mod.ts';
import * as yup from 'https://cdn.skypack.dev/yup';


const client = new MongoClient();
client.connectWithUri(`mongodb://${Deno.env.get('MONGO_DB_URI')}`);

interface Crud {
  key: string;
  value: string;
}

interface DBCrudSchema {
  _id:  { $oid: string };
  key: string;
  value: string;
}

const crudExampleSchema = yup.object().shape({
  key: yup.string().trim().required(),
  value: yup.string().trim().required(),
});

const db = client.database("crud-example");
const crudExample = db.collection<DBCrudSchema>("crud-example");

const router = new Router();

router.get('/', async context => {
  try { 
    const items = await crudExample.find({});
    context.response.body = { 
      items: items 
    };
  } catch (error) {
    console.error(error);
    context.response.body = { 
      message: 'An error occured'
    };
  }
});

router.get('/:id', async context => {
  try {
    const item = await crudExample.findOne({
      _id: context.params.id
    });
    context.response.body = { 
      items: [
        item
      ] 
    }
  } catch (error) {
    console.error(error);
    context.response.body = { 
      message: 'An error occured'
    };
  }
 
  
});

router.post('/', async context => {
  try {
    crudExampleSchema.validate(context.body)
    const inserted = await crudExample.insertOne(context.body)
    context.response.body = inserted;
  } catch (error) {
    console.error(error);
    context.response.body = { 
      message: 'An error occured'
    };
  }
});

router.put('/:id', async context => {
  try {
    crudExampleSchema.validate(context.body)
    const item = await crudExample.findOne({
      _id: context.params.id,
    });

    if (!item) {
      console.error('Item not found');
      context.response.body = {
        message: 'Item not found'
      }
    }

    const inserted = await crudExample.updateOne({
      _id: context.params.id
    }, context.body);

    context.response.body = inserted;
  } catch (error) {
    console.error(error);
    context.response.body = { 
      message: 'An error occured'
    };
  }
});

router.delete('/:id', async context => {
  try {
    await crudExample.deleteOne({
      _id: context.params.id
    })
    context.response.body = {
      message: 'Success'
    }
  } catch (error) {
    console.error(error);
    context.response.body = { 
      message: 'An error occured'
    };
  }
});


const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
console.log('Listening on port 3000');