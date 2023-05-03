const restify = require("restify");
const xss = require("xss-clean");

const app = restify.createServer();

app.use(restify.bodyParser());
app.use(xss());
app.listen(8080);

const clean = require("xss-clean/lib/xss").clean;
const cleaned = clean("<script>>/script>");
