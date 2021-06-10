import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment"
import { useDispatch } from "react-redux"
import { setSelectedPost, deletePost, likePost } from "../../../actions/posts"

const Post = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setSelectedPost(post._id));
    }

    const handleDelete = () => {
        dispatch(deletePost(post._id))
    }
    const handleLike = () => {
        dispatch(likePost(post._id))
    }

    return (
        <Card className={classes.card} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} ></CardMedia>
            <div className={classes.overlay} >
                <Typography variant="h6" >{post.creator}</Typography>
                <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2} >
                <Button style={{ color: "white" }} size="small" onClick={() => handleEdit()} >
                    <MoreHorizIcon fontSize="default" ></MoreHorizIcon>
                </Button>
            </div>
            <div className={classes.details} >
                <Typography variant="body2" color="textSecondary" >{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom >{post.title}</Typography>
            <CardContent>
                <Typography color="textSecondary" variant="body2" component="p" >{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions} >
                <Button size="small" color="primary" onClick={() => handleLike()} >
                    <ThumbUpAltIcon fontSize="small" ></ThumbUpAltIcon>
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => handleDelete()} >
                    <DeleteIcon fontSize="small" ></DeleteIcon>
                    &nbsp;Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post
