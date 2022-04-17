import express from "express";
import "express-async-errors";
import cors from "cors";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware.js";

import router from "./routers/index.js";

const app = express();
app.use(express.json());

app.use(router);
app.use(errorHandlingMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
