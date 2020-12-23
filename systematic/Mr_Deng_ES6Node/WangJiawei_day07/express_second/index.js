let express = require("express");
let app = express();
let routerIndex = require("./routers/index");
let port = 3000;

app.use(express.static("./public"));
app.use("/", routerIndex);

app.listen(port, () => {
  console.log(`index listening on port http://localhost:${port}`);
  console.log('################################');
});