var express = require('express');
var app = express();
var PORT = 8080;

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo"
});

con.connect(function (err) {
  if (err) throw err;
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/add', (req, res) => {
  const val = req.body.val;

  var sql = `INSERT INTO tasks (id, value) VALUES ('', '${val}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  res.redirect("/");
});

app.get('/remove', (req, res) => {
  con.query("SELECT * FROM tasks", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
  // res.redirect("/");
});

app.get('/getData/inProgress', (req, res) => {
  con.query("SELECT * FROM tasks WHERE finished=0", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

app.get('/getData/finished', (req, res) => {
  con.query("SELECT * FROM tasks WHERE finished=1", function (err, result, fields) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

app.post('/finish', (req, res) => {
  const id = req.body.id;
  console.log(id);
  con.query(`UPDATE tasks SET finished = '1' WHERE id = '${id}';`);
});

app.post('/delete', (req, res) => {
  const val = req.body;
  console.log(val);

  res.redirect("/");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
}); 