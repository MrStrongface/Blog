import React from "react";

import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from 'react-router-dom';
import axios from './axios';


export const FullPost = () => {

  const {id} = useParams();
  console.log(id);

  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() =>{
        axios.get( `/posts/${id}`)
        .then(res => {setData(res.data); setLoading(false)})
        .catch((err) =>{console.warn(err); alert('Ошибка при получении статьи!')});
  },[]);

  if(isLoading){
    return <Post isLoading={isLoading}/>
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
        {data.text}
        </p>
      </Post>
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
    </>
  );
};
