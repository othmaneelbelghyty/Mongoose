app.get("/contacts", authorizeMiddleware, function (req, res) {
  var conn = require("./db.js");
  conn.connectToDatabase;
  db.Contact.find();
});
