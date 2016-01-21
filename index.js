var express = require("express");
var app = express();
var port = 3707;

/*app.get("/", function(req, res){
    res.send("It works!");
});*/

var io = require('socket.io').listen(app.listen(port));
app.use(express.static(__dirname + '/public'));
console.log("Listening on port " + port);
app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
    socket.on('disconnect', function () {
    io.emit('message', { message: 'user disconnected' });
  });
});
