import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import './FullPostUser.css';
import { APIConfig } from '../../store/API-Config';


const FullPostUser = (props) => {

    const APIs = useContext(APIConfig);
    const userAPI = APIs.userAPI;


    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }

    const [postCall, setPostCall] = useState({});
    const [renderedId, setRenderedId] = useState(null); 
    const [show, setVisibility] = useState(false);  
    const newPostForm = useRef();

    useEffect(() => {
        setRenderedId(props.match.params.id);
    }, []);

    useEffect(() => {
        if (renderedId !== props.match.params.id) {
            axios(userAPI + props.match.params.id, { headers })
                .then(response => {
                    setPostCall(response.data);
                    setRenderedId(props.match.params.id);
                    console.log('This wont get called again ');
                })
        }
         return () =>{
             console.log('post was calling DataBase')
         };
    }, [props]); 


    const deletePost = () => {
        axios.delete(userAPI + props.match.params.id, { headers })
            .then(response => {
                props.history.push('/');
                console.log(response);
            });
    };

    const editPost = () => {
        const form = newPostForm.current
        const data = { id:props.match.params.id,
            title: form['title'].value};

        console.log(data);
        axios.put(userAPI, data)
            .then(data => {
                console.log('Success:', data);
                history.go(0);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    let post = <p style={{ justifyContent: 'space-around' }}> Please select a Post!</p>;
    console.log(props.match.params.id)
    if (props.match.params.id != null) {
        post = (
            <div className="FullPostuser">
                <div><br/></div><h1> User : {postCall.title}</h1><div><br/></div>


                <div className="flex">

                    <div className="edit">
                        <button onClick={() => setVisibility(!show)}> Edit User</button>

         
                    </div>

                    <div className="delete">
                        <button onClick={deletePost} >Delete Post</button>
                    </div>


                </div>
                <br/>  <div>
                    {show &&
                    <div className="NewPost ">
                        <form ref={newPostForm}>
                            <h1>Edit User</h1>

                            <label>Title</label>
                            <textarea  rows="2" label={'title'} name={'title'} placeholder={postCall.title} />


                        </form>
                        <button onClick={editPost} >Edit post </button>

                    </div>

                    }
                </div><br/><br/><br/>
                
            </div>
        );
    }


    return post;
}

export default FullPostUser;