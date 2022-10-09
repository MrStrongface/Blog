import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js'
import bcrypt from 'bcrypt';


export const register = async (req, res) =>{
    try{
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
    
        const doc = new UserModel({
          fullName: req.body.fullName,
          email: req.body.email,
          passwordHash: hash,
          avatarUrl: req.body.avatarUrl
        });
  
            const user = await doc.save();
  
            const token = jwt.sign(
            {
              _id: user._id
            },
             'secret123'
            );
  
            const { passwordHash, ...userData } = user._doc
  
             res.json({...userData, token});
      }
      catch (err){
      console.log(err)
        res.status(500).json({
          massage: 'Не удалось зарегестрироваться'
        })
    }
};

export const login = async (req, res) =>{
    try{
        const user = await UserModel.findOne({email: req.body.email});
        if(!user){
          return res.status(404).json({
            message: ' Not found!'
          });
        }
  
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if(!isValidPass){
          return res.status(404).json({
            message: 'Not found!'
          });
        }
  
        const token = jwt.sign(
          {
            _id: user._id
          },
           'secret123'
          );
          const { passwordHash, ...userData } = user._doc
  
             res.json({...userData, token});
  
  }catch(err){
        console.log(err)
        res.status(500).json({
          message: 'Не удалось авторизоваться!'
       });
  }
};

export const aboutMe = async (req, res) =>{
    try{
        const user = await UserModel.findById(req.userId);
           if(!user){
             return res.status(404).json({
               message: 'Not found user id!'
             });
           }
           
           const { passwordHash, ...userData } = user._doc
 
            res.json(userData);
 
 }catch(err){
        return res.status(500).json({
          message: 'Нет доступа к user'
   });
 }
};