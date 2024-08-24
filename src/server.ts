import { app } from "./app";

const port = 8080;

app.listen(port, "0.0.0.0", () => {
  console.log("Http server runing");
});
