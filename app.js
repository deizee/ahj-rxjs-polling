const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const Router = require('koa-router');
const router = new Router();
const faker = require('faker');
const idGenerator = require('node-unique-id-generator');

const app = new Koa();

app.use(cors());
app.use(koaBody({urlencoded: true}));

let messages = [];

const fakeData = () => {
    return {
        id: idGenerator.generateGUID(),
        from: faker.internet.email(),
        subject: faker.lorem.words(),
        body: faker.lorem.text() ,
        received: Date.now(),
    }
}

setInterval(() => messages.push(fakeData()), 5000);

router.get('/messages/unread', ctx => {
    ctx.response.body = {
        status: "ok",
        timestamp: Date.now(),
        messages: messages,
      };
});

router.get('/messages/clear', ctx => {
    messages = [];
    ctx.response.body = messages;
});

app.use(router.routes());

module.exports = app;
