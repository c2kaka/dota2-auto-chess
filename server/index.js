const express = require("express");

const app = express();

app.set('privateKey', 'aeyraaui1214jadfh81910');

app.use(express.json());
app.use(require("cors")());

app.use("/uploads", express.static(__dirname + "/uploads"));

require("./plugins/db")(app);
require("./routes/admin")(app);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
