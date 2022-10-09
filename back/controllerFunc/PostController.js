import PostModel from '../models/post.js';


export const create = async (req, res) =>{
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(','),
            imageUrl: req.body.imageUrl,
            user: req.userId,
          });
           
          const post = await doc.save();

          res.json(post);
    }catch(err){
        console.log(err)
        res.status(500).json({
          massage: 'Post was not create!'
        })
    }
};

export const getLastTags = async(req, res) =>{
    try{
        const posts = await PostModel.find().limit(5).exec();
        const tags = posts.map(obj => obj.tags).flat().slice(0,5);

        res.json(tags)
   }catch(err){
       console.log(err);
       res.status(500).json({
           message: 'Not found posts!'
       })
   
   }
}

export const getAll = async (req, res) =>{
    try{
         const posts = await PostModel.find().populate('user').exec();

         res.json(posts)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Not found posts!'
        })
    
    }
}

export const getOne =  (req, res) =>{
    try{
        const postId = req.params.id;
         PostModel.findOneAndUpdate({_id:postId},{$inc:{vievsCount: 1}},{returnDocument:'after'},
         (err, doc)=>{
               if(err){
                console.log(err);
                return res.status(404).json({
                    message: 'Не удалось вернуть статью'
                })
             };
               if(!doc){
                return res.status(404).json({
                    message: 'Не удалось найти статью'
                });
             }
               res.json(doc)
         }).populate('user');
   }catch(err){
       console.log(err);
       res.status(500).json({
           message: 'Not found posts!'
       })
   
   }
}

export const remove = (req, res) =>{
    try{
        const postId = req.params.id;
        PostModel.findOneAndDelete({_id:postId},
            (err, doc)=>{
                if(err){
                    console.log(err);
                return res.status(404).json({
                    message: 'Не удалось вернуть статью'
                })
                }
                if(!doc){
                    return res.status(404).json({
                        message: 'Post not found!'
                    });
                 }
                 res.json({
                    success: true
                 });
            })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Not remove!'
        })
    }
}

export const update = async (req, res) =>{
   try{
        const postId = req.params.id;
        await PostModel.updateOne({
            id: postId
           },{
               title: req.body.title,
               text: req.body.text,
               tags: req.body.tags,
               imageUrl: req.body.imageUrl,
               user: req.userId,
           });

           res.json({
            success: true
           });
   }catch(err){
    console.log(err);
    res.status(500).json({
        message: 'Not Update!'
    });
   }
}
