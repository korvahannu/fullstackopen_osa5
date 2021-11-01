import React, { useState } from 'react';

const CreateNewBlog = ({ create }) => {

  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formUrl, setFormUrl] = useState('');

  const newBlog = (event) => {
    event.preventDefault();

    create({ title: formTitle, author:formAuthor, url:formUrl });

    setFormTitle('');
    setFormAuthor('');
    setFormUrl('');
  };

  return(
    <div id="create_new_blog">
      <h2>Create new </h2>
      <form onSubmit={newBlog}>
        <div>
                title
          <input id="createBlogTitle" type="text" name="Title" value={formTitle} onChange={({ target }) => setFormTitle(target.value)} />
        </div>
        <div>
                author
          <input id="createBlogAuthor" type="text" name="Author" value={formAuthor} onChange={({ target }) => setFormAuthor(target.value)} />
        </div>
        <div>
                url
          <input id="createBlogUrl" type="text" name="Url" value={formUrl} onChange={({ target }) => setFormUrl(target.value)} />
        </div>
        <button type="submit" id="button-submitNewBlog">Create</button>
      </form>
    </div>
  );

};

export default CreateNewBlog;