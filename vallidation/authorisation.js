import { body } from 'express-validator';

export const regValid = [ //проверка на правилность ввидения данних
    body('email', 'не вірно введений имейл').isEmail(),
    body('password', 'не вірно введений пароль').isLength({ min: 3 }),
    body('nickname', 'не вірно введний никнейм').isLength({ min: 5 }),
]

export const logValid = [ //проверка на правилность ввидения данних
    body('email', 'не вірно введений имейл').isEmail(),
    body('password', 'не вірно введений пароль').isLength({ min: 5 }),
]