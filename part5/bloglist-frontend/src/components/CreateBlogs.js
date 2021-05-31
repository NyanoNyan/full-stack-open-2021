import React, { useState } from 'react'
import login from '../services/login';

const CreateBlogs = ( {createBlog} ) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (event) => {
        event.preventDefault();

        const newObj = {
          title: title,
          author: author,
          url: url 
        };
        const msgSetup = [`a new blog ${title} by ${author} added`, false];

        createBlog(newObj, msgSetup);
        setTitle('');
        setAuthor('');
        setUrl('');
    
    };

    return (
        <div>
            <h2>create new</h2>

            <form onSubmit={addBlog}>
                <div>
                    <label>title:</label>
                    <input 
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <label>author:</label>
                    <input 
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <label>url:</label>
                    <input 
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>

                <button type="submit">create</button>
            </form>
            
        </div>
    );
};

export default CreateBlogs;