 import  express  from "express";
 import mongoose from "mongoose";
 import bodyParser  from 'body-parser';
 import cors from 'cors';
 import fs from 'fs';
 import multer from 'multer';
 import {regValid,logValid} from './vallidation/authorisation.js'
 import checkAuthorisation from './untils/checkAuthorisation.js'
 import {regist, login, my} from './controlers/usercontroler.js'
 import {infdatch} from './controlers/dathickcontroler.js'

 mongoose //подключение базы данных
 .connect('mongodb+srv://vballiev:nazar2002@cluster0.9kgz2hf.mongodb.net/blog', { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('База работает'))
 .catch((err) => console.log('База не работает', err));

 const app = express(); //создание експресс приложения
 
 const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
      }
      cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

 app.use(express.json()); //позволяет читать json из запросов
 app.use(cors());
 app.use('/uploads', express.static('uploads'));
 app.post('/authorisation/login',logValid,login);

 app.get('/', (req, res) => {  //отправления главного req (запроса с фронтенда) res(что мы передаем)
    res.send('Hello world');
 });

 app.post('/authorisation/regist', regValid,regist);

app.get('/authorisation/my', checkAuthorisation,my);

app.post('/update_parking_space', infdatch);
app.get('/update_parking_space', infdatch);

const SensorSchema = new mongoose.Schema({
  value: Number,
  timestamp: { type: Date, default: Date.now }
});

const Sensor = mongoose.model('Sensors', SensorSchema);

// Розбір запитів POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Маршрут для запису даних датчика 
app.post('/api/sensor-data', (req, res) => {
  const value = req.body.value;

  // Збереження даних в базу даних
  const sensorData = new Sensor({ value });
  sensorData.save()
    .then(() => {
      console.log('Дані успішно збережено');
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Помилка збереження даних:', err);
      res.sendStatus(500);
    });
});

app.get('/sensor-data', async (req, res) => {
    // const data = JSON.stringify(await Sensor);

    console.log("before rewuest");
    const data = await Sensor.find({});
    console.log("after rewuest");




    res.send(data);

})

app.listen(4444,(err) => { //запуск веб сервера 4444(порт)
    if (err) {
        return console.log(err);
    }
    console.log('Сервер запущено')
});