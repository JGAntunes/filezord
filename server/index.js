var Hapi = require('hapi');
var fs   = require('fs');

var server = new Hapi.Server('localhost', 8768, { cors: true });

server.route({
 		method: 'POST',
   	path: '/upload',
   	config: {
    	payload:{
        maxBytes: 209715200,
        output:'stream',
        parse: true
      }
    },
    handler: function (request, reply) {
    	console.log("Upload started");
      request.payload.file.pipe(fs.createWriteStream('files/test.pdf'));

      reply({success: "Upload done"});
    }
});

server.start(function () {
	console.log("FileZORD operational!!!");
});