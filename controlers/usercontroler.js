import  jwt from "jsonwebtoken";
 import bcrypt from "bcrypt";
 import { validationResult } from 'express-validator';
 
 import userModel from '../models/user.js'

export const login = async (req, res) =>{
    try {
        const user = await userModel.findOne({ email: req.body.email});
        if(!user) {
            return res.status(404). json({
                message: 'немає такого користувача'
            })
        }

        const ValidPass = await userModel.findOne({ password: req.body.password});
        if(!ValidPass) {
            return res.status(404).json({
                message: 'немає такого пароля'
            })
        }
        
        const token = jwt.sign({
            _id: user._id,
        },
        'nazar1',
        {
            expiresIn: '60d', //сколько дней будет хранится токен
        },
        );
        
        res.json({
            ...user._doc,
            token,
        });

    } catch  (err) {
        console.log(err);
        res.status(500).json({
            message: 'не вийшло авторизуватися',
        });
    }
        
    };

export const regist = async (req, res) => {
    try {
        const err = validationResult(req); //если в результати валидации были ошибки то мы их возвращаем
    if (!err.isEmpty()) {
        return res.status(400).json(err.array());
    }
    
    const password = req.body.password;//витягуємо отриманний пароль
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);//тут буду зберигатися зашифрований пароль
    
    const documet = new userModel({ //внесення данних до базі данних
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
    });

    const user = await documet.save();
    res.json(user);


    // const token = jwt.sign({
    //     _id: user._id,
    // },
    // 'nazar1',
    // {
    //     expiresIn: '60d', //сколько дней будет хранится токен
    // },
    // );



    res.json({
        ...user._doc,
        token,
    });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не вдалося зарееструватися, спробуйте ще раз',
        });
    }

 };

 export const my = async (req,res) =>{
    try {
        const user = await userModel.findById(req.userId);
        if(!user){
            return res.status(402).json({
                message: 'Користувача не знайдено',
            });
        }
        res.json(user._doc);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Немає прав',
        });
    }
   };