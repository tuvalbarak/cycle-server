import http from "http";
import app from "./app";

import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(app).listen(port, () => {
  console.log(`App listening on port ${port}`);
});
