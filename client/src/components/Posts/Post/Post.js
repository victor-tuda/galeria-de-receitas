import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
//import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAltIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import { FaEllipsisH } from "react-icons/fa";
import moment from 'moment'

import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    return(
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button
                    style={{color: 'white'}}
                    size="big"
                    onClick={() => setCurrentId(post._id)}>
                    <FaEllipsisH fontSize='big'/>
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
                <Typography className={classes.title} variant="h5" gutterButton>{post.title}</Typography>
            <CardContent>
                <Typography variant="h5" gutterButton>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {}}>
                    Like
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => {}}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>

            </CardActions>

        </Card>
    )
}

export default Post;