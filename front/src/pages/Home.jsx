import React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';


import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts } from '../Redux/slices/post';
import { fetchTags } from '../Redux/slices/post';



export const Home = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector(state => state.posts);

  const isPostsloading = posts.status === 'loading';
  const isTagsloading = tags.status === 'loading';
  
    React.useEffect(()=>{
      dispatch(fetchPosts());
      dispatch(fetchTags());
  
  }, []);
 

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsloading ?[...Array(5)] : posts.items).map((obj, index) => isPostsloading ? (<Post key = {index} isLoading ={true} /> ):(
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.vievsCount}
              commentsCount={3}
              tags={obj.tags}
              
              isEditable = {userData?._id === obj.user._id}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsloading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'User Namevich',
                  avatarUrl: ''
                },
                text: 'Very nice job ',
              },
              {
                user: {
                  fullName: 'User Ivanov',
                  avatarUrl: ''
                },
                text: 'Test comment',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
