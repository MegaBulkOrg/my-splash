import compression from "compression";
import express from "express";
import helmet from "helmet";
import ReactDOM from "react-dom/server";
import { App } from "../App";
import { mainTemplate } from "./mainTemplate";

const SITE =
  process.env.SITE === "undefined" || process.env.SITE === undefined
    ? "localhost"
    : process.env.SITE;
const PORT =
  process.env.PORT === "undefined" || process.env.PORT === undefined
    ? 3000
    : process.env.PORT;

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
}

app.use("/static", express.static("./app/client"));

app.get("*", (_req, res) => {
  res.send(mainTemplate(ReactDOM.renderToString(App())));
});

app.listen(PORT, () =>
  console.log(`Сервер запустился на http://${SITE}:${PORT}`)
);
