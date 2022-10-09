import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { registerValidation , loginValidation, postCreateValidation } from './validations/validations.js';
import checkAuth from './utils/checkAuth.js';
import validationErrors from './validations/validationErrors.js';
import * as UserController from './controllerFunc/UserController.js';
import * as PostController from './controllerFunc/PostController.js';
import cors from 'cors';




const port = 4444
const app = express() ;
app.use(express.json());


const storage = multer.diskStorage({
    destination: (__, _, callBack) =>{
      callBack(null, 'Uploads');
    },
    filename: (___, file, callBack)=>{
      callBack(null, file.originalname);
    }
});
const upload = multer({storage});
app.use('/uploads', express.static('Uploads'));
app.use(cors());



mongoose.connect( `mongodb://127.0.0.1:27017/Blog_DB`)
.then(() =>{console.log('=== db connect! ===')})
.catch((err) =>{console.log('db Error ---!!!---.......', err)});


app.listen(port, (err)=>{
  if(err){
    console.log(err)
  }
  else{ console.log(`===Server run on port ${port}===`)}
});

app.get('/',  (req, res) =>{
   res.send('hello port 4444')
});
app.get('/auth/me', checkAuth, UserController.aboutMe);
app.post('/auth/login', loginValidation, validationErrors, UserController.login);
app.post('/auth/register', registerValidation, validationErrors, UserController.register );

app.post('/upload', checkAuth, upload.single('image'), (req, res) =>{
      res.json({
          url: `/Uploads/${req.file.originalname}`
      })
});

app.get('/tags',  PostController.getLastTags );

app.get('/posts' , PostController.getAll);
app.get('/posts/tags' , PostController.getLastTags);
app.get('/posts/:id' , PostController.getOne);
app.post('/posts' , checkAuth , postCreateValidation, validationErrors, PostController.create);
app.delete('/posts/:id' ,checkAuth, PostController.remove);
app.patch('/posts/:id' , checkAuth, postCreateValidation, validationErrors, PostController.update);