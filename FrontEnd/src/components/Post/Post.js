import React, { useContext } from 'react';
import { LikedPosts } from '../../store/LikedPosts';

import './Post.css';

const Post = (props) => {

    const { likedPosts, setLikedPosts } = useContext(LikedPosts);

    return (
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
           
            </div>
                                     {
                likedPosts.includes(props.id)
                    ?

                  /* 1 On the “/http://localhost:3000/posts” page, fix the Active button. When
                you click on Active, it will turn into NotActive, then it will not go back to Active if
                you click on it again.*/
                <button onClick={() => {
                        let array=[...likedPosts];
                            array = array.filter(function(Inside) {
                             return Inside !== props.id
                             })
                        //console.log(props);
                        console.log(likedPosts); setLikedPosts([likedPosts,...array]);}}>
                        NotActive </button>
                    /* 1 On the “/http://localhost:3000/posts” page, fix the Active button. When
              you click on Active, it will turn into NotActive, then it will not go back to Active if
              you click on it again.*/
                    :
                    <button onClick={() => { console.log(likedPosts); setLikedPosts([...likedPosts, props.id]) }}>
                        Active </button>}
        </article>
    );
}

export default Post;