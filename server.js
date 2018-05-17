const next = require("next");
const polka = require("polka");
const http = require("https");
const { join } = require("path");
const static = require("serve-static");

const { BEMBA_SITEMAP_SERVICE, NODE_ENV } = process.env;
const dir = join(__dirname, "static");
const dev = NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const render = name => (req, res) =>
  app.render(req, res, name, { ...req.query, ...req.params });

app.prepare().then(() =>
  polka()
    .use(static(dir))
    .get("/", render("/"))
    .get("/search", render("/search"))
    .get("/library", render("/library"))
    .get("/settings", render("/settings"))
    .get("/:filter/:name", render("/stations"))
    .get("/sitemap.xml", (req, res) => {
      https.get(BEMBA_SITEMAP_SERVICE, get => get.pipe(res)).end();
    })
    .get("*", (req, res) => handle(req, res))
    .listen(PORT)
    .then(() => console.log(`> Server ready`))
);
