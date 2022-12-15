import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { APIConfig } from '../../store/API-Config';

import './NewPost.css';

const NewPost = (props) => {

    const APIs = useContext(APIConfig);
    const postAPI = APIs.postAPI;

    const newPostForm = useRef();

    const titleVal = useRef();


    const PostDataHandler = () => {

        const form = newPostForm.current
        const data = { title: form['title'].value, content: form['content'].value, author: form['author'].value };
        console.log(data);
        axios.post(postAPI, data)
            .then(data => {
                console.log('Success:', data);
                props.history.push('/posts'); // push will add it to the page stack, replace will just replace the component  // props.history.replace('/posts'); 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
            <div className="NewPost">
                <form ref={newPostForm}>
                <br /><br /><h1>Add a Reporting</h1>
                <br /><br />
                <label>Title</label>
                <input type="text" label={'title'} name={'title'} />

                <label>Content</label>
                <textarea  rows="4" label={'content'} name={'content'} />

                <label>Author</label>
                <select label={'author'} name={'author'} >
                    <option value="Ayoub">Ayoub</option>
                    <option value="Lachhab">Desta</option>
                </select>
            </form>
            <div><br/></div>
            <button onClick={PostDataHandler}>Add Reporting </button>
            
        </div>


    );
}
// if i didnt use a form, you will get a Chrome sendrequest error: TypeError: Converting circular structure to JSON
export default NewPost;