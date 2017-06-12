let express = require("express");
let multiparty = require("multiparty");
let path = require("path");
let fs = require("fs");
let bodyParser = require("body-parser");

let app = express();

app.use(express.static('./public'));

app.post("/upload", function (req, res) {

    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/upload/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        console.log(filesTmp)

        if (err) {
            console.log('parse error: ' + err);
        } else {
            var inputFile = files.files[0];
            var uploadedPath = inputFile.path;
            console.log(uploadedPath);
            var dstPath = './public/upload/' + inputFile.originalFilename;
            console.log(dstPath);
            var paths = "http://localhost:3000/upload/" + inputFile.originalFilename;
            console.log(paths);
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    res.json({code: 200, filePath: './upload/' + inputFile.originalFilename});
                }
            });
        }
    });
});

app.listen(3000);