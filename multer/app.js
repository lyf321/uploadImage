let express = require("express");
let multer = require("multer");
let bodyParser = require("body-parser");
let path = require("path");
let fs = require("fs");

let app = express();


app.use(express.static('./public'));

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 文件初始路径
        let filePath = path.join(__dirname, 'public/upload');
        if (!fs.existsSync(filePath)) {
            fs.mkdir(filePath, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    cb(null, filePath)
                }
            })
        } else {
            cb(null, filePath)
        }
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        // UUID 处理
        function guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        cb(null, file.fieldname + guid() + Date.now() + ext)
    }
});


var upload = multer({storage: storage});

app.post("/upload", upload.single('files'), function (req, res) {
    console.log(path.basename(req.file.path));

    res.json({code: 200, filePath: 'http://' + req.headers.host + '/upload/' + path.basename(req.file.path)});

});

app.listen(3000);