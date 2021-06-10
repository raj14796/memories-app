import React, { useState,useEffect } from 'react'
import useStyles from './styles'
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from "react-redux";

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { createPosts,updatePost } from '../../actions/posts';

const Form = () => {

    const [postData, setPostData] = useState({
        creator: "", title: "", message: "", tags: "", selectedFile: ""
    })

    const dispatch = useDispatch();
    const selectedPostId = useSelector((state)=>state.selectedPostId);
    const selectedPost = useSelector((state)=> selectedPostId?(state.posts.find((p)=>p._id===selectedPostId)):null );

    useEffect(()=>{
        if(selectedPostId)
            setPostData(selectedPost);
    },[selectedPost])

    const classes = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!selectedPostId)
            dispatch(createPosts(postData));
        else
            dispatch(updatePost(selectedPostId,postData));
        clear();
    }
    const handleTextfield = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value })
    }
    const clear = () => {
        setPostData({ ...postData, creator: "", title: "", message: "", tags: "", selectedFile: "" })
    }
    return (
        <Paper className={classes.paper} >
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={(e) => handleSubmit(e)} >
                <Typography variant="h6" >{selectedPostId?"Editing" : "Creating"} a Memory</Typography>
                <TextField name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => handleTextfield(e)}
                />
                <TextField name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => handleTextfield(e)}
                />
                <TextField name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => handleTextfield(e)}
                />
                <TextField name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => handleTextfield(e)}
                />
                <div className={classes.fileInput} >
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button fullWidth className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" >Submit</Button>
                <Button fullWidth variant="contained" color="secondary" size="small" onClick={() => clear()} >Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
