let express = require("express");
let app = express();
let routeIndex = require("./routes/app");
let port = 3000;

app.use(express.static("./public"));
app.use("/", routeIndex);

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server listening on" + "http://localhost:" + port);
  console.log(
    "****************************************************************"
  );
});
