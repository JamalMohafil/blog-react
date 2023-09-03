import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './PostCard.module.css'
import {User,Clock} from 'react-feather'
    const getDate = (postTime)=>{
        const date = new Date(postTime)
        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
    }

const PostCard = ({ post }) => {
  return (
    <Link to={"/blog/" + post.slug} className={styles.card_link}>
        
      <Card className={styles.postcard}>
        <div className={styles.postcard_img}>
        <Card.Img variant="top"  src={post.image} />
        <div className={`${styles.postcard_img_info} pos`}>
          <div className="subCard">
        <small> <User/>بواسطة : {post.user}</small>
                <small><Clock/>{getDate(post.createdAt)} </small>
                </div>
        </div>
        </div>
        <Card.Body>
          <Card.Title style={{fontSize:'15px'}}>{post.title}</Card.Title>
          <Card.Text className={styles.card_p}>
           {post.excert}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PostCard;
