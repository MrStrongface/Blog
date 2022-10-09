import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../Redux/slices/Auth';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from '../../pages/axios';


export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = React.useRef(null);
  const navigate = useNavigate();

  const [ isLoading, setLoading] = React.useState(false)
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const handleChangeFile = async (event) => {
    try{
          const formData = new FormData();
          const file = event.target.files[0];
          formData.append('image', file);
          const { data } = await axios.post('upload', formData);
          console.log(data);
          setImageUrl(data.url);
    }catch(err){
           console.warn(err);
           alert('Error download image')
    }
  };

  const onClickRemoveImage = () => {
       setImageUrl('');
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Your text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const onSubmit = async () =>{
    try{
            setLoading(true);
            const fields = {
                 text,
                 title,
                 imageUrl,
                 tags
            }
            const { data } = await axios.post('/posts', fields);
            const id = data._id;
            navigate(`/posts/${id}`);
    }catch(err){
            console.warn(err);
            alert('Не удалось создать статью!');
    }
  }

  if(!window.localStorage.getItem('token') && !isAuth){
    return <Navigate to="/"/>
    };

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" onClick={()=>inputFileRef.current.click()} size="large">
        Download pic
      </Button>
      <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden />
      {imageUrl && (
       <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
       </>
        
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title"
        value = {title}
        onChange = {e => setTitle(e.target.value) }
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard"
      value = {tags}
      onChange = {e => setTags(e.target.value) } 
      placeholder="Tags" 
      fullWidth />
      
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" onClick ={onSubmit} variant="contained">
          Add
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
