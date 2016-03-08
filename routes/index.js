module.exports = function Routes(app,server){
  var io = require('socket.io').listen(server)
  app.get('/', function(req,res){
    res.render('index')
  })
  io.sockets.on('connection', function(socket){
  })
}
