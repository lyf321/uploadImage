let express = require("express");
let multipart = require("connect-multiparty");
let path = require("path");
let fs = require("fs");

let app = express();

app.use(express.static('./public'));

app.post("/upload", multipart(), function (req, res) {
    //get filename
    var filename = req.files.files.originalFilename || path.basename(req.files.files.ws.path);
    //copy file to a public directory
    var targetPath = path.dirname(__filename) + '/public/upload/' + filename;
    //copy file
    fs.createReadStream(req.files.files.ws.path).pipe(fs.createWriteStream(targetPath));
    //return file url
    res.json({code: 200, filepath: './upload/' + filename});
});

app.listen(3000);