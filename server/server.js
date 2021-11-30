const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const {v4: uuid} = require('uuid');
const mime = require('mime-types');
const app = express();
const PORT = 5000;

app.use('/uploads',express.static('./uploads'));
app.use(morgan('combined'));

const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, './uploads'),
    //filename: (req, file, callback) => callback(null, uuid())
    filename: (req, file, callback) => callback(null, `${uuid()}.${mime.extension(file.mimetype)}`)
});

const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
    //callback(new Error('업로드 할 때 오류가 났습니다.'), true);

    // if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    //     callback(null, true);
    // }
    // else{
    //     callback(new Error("파일 타입이 png가 아닙니다."), false);
    // }

    if(['image/png', 'image/jpg'].includes(file.mimetype)){
        callback(null, true);
    }else{
        callback(new Error('파일 타입이 png나 jpg 가 아닙니다.'));
    }
},
    limits: {
        //fileSize: 1024 * 1024 * 5//5MB
        
    }


});

//upload.single('image') 
//전송 시 보내지는 key 값과 같아야 한다. 
app.post('/upload', /*미들웨어*/ upload.single('imageTest'),(req, res) => {

    console.log(req.file);
    res.json(req.file);
    // {
    //     "fieldname": "imageTest",
    //     "originalname": "NbQ1600646996987-640-360.jpg",
    //     "encoding": "7bit",
    //     "mimetype": "image/jpeg",
    //     "destination": "uploads",
    //     "filename": "4b061e370ad55b3e15a22c5eb692e9a5",
    //     "path": "uploads\\4b061e370ad55b3e15a22c5eb692e9a5",
    //     "size": 208167
    // }

});



app.listen(PORT, ()=> {
    console.log(`PORT : ${PORT}`);
});