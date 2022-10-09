import { body } from 'express-validator';

 export const registerValidation = [
    body('fullName', 'Неверное имя').isLength({ min: 5 }),
    body('email', 'Неверная почта').isEmail(),
    body('password', 'Неверный пароль').isLength({ min: 3 }),
    body('avatarUrl', 'Неверный аватар').optional().isURL()
];

export const loginValidation = [
    body('email', 'Неверная почта').isEmail(),
    body('password', 'Неверный пароль').isLength({ min: 3 }),
];

export const postCreateValidation = [
    body('title', 'Неверный тайтл').isLength({ min: 1 }).isString(),
    body('text', 'Неверный текст').isLength({ min: 1 }).isString(),
    body('tags', 'Неверный тег').optional().isString(),
    body('imageUrl', 'Неверный адрес картинки').optional().isString(),
    
];