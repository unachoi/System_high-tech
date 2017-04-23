var express = require('express')
 var app = express()
 fs = require('fs');
 mysql = require('mysql');
 var connection = mysql.createConnection({
     host: 'localhost',
     user: 'sensors',
     password: 'password',
     database: 'Temperature'
 })
 connection.connect();
 
 app.get('/graph', function (req, res) {
     console.log('got app.get(graph)');
     var html = fs.readFile('./graph1.html', function (err, html) {
     html = " "+ html
     console.log('read file');


     var qstr = 'select * from sensors';
     connection.query(qstr, function(err, rows, cols) {
     if (err) throw err;
     var data = "";
     var comma = "";
     data = "data.addRows(["
     for (var i=0; i< rows.length; i++) {
 r = rows[i];
 data += comma + "[new Date("+ r.time.getYear() +"," +r.time.getMonth() +","+ r.time.getDa$
 comma = ",";
     }
     data+="]);";
     var header = "data.addColumn('date', 'Date/Time');"
     header += "data.addColumn('number', 'Temp');"
     
     html = html.replace("<%HEADER%>", header);
     html = html.replace("<%DATA%>", data);
     res.writeHeader(200, {"Content-Type": "text/html"});
     res.write(html);
     res.end();


     });
   });
 })

  app.listen(2000, function () {
   console.log('Example app listening on port 2000!')
 })
