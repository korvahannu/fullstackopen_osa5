import './App.css';
import React, { useState, useEffect } from 'react';

import ListBlog from './components/blog.js'
import blogServices from './services/blogs.js';

import loginServices from './services/login.js';

const Notification = (props) => {

  if(props.text === '')
    return null;

  return (<div id="notification">{props.text}</div>);
};

const Warning = (props) => {

  if(props.text === '')
    return null;

  return (<div id="warning">{props.text}</div>);
};

function App() {

  const [blogs, setBlogs] = useState([]);

  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [user, setUser] = useState(null);

  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formUrl, setFormUrl] = useState('');

  const [notification, setNotification] = useState('');
  const [warning, setWarning] = useState('');

  useEffect( () => {

    const loggedInBlogUser = window.localStorage.getItem('loggedInBlogUser');

    if(loggedInBlogUser)
    {
      const user = JSON.parse(loggedInBlogUser);
      setUser(user);
      blogServices.setToken(user.token);
    }

    updateBlog();

  }, []);

  const updateBlog = () => {

    blogServices
    .getAll()
    .then( allBlogs => setBlogs(allBlogs));

  }

  const notify = (message) => {

    setNotification(message);

    setTimeout(() => {
      setNotification('')
      }, 5000);

  }

  const warn = (message) => {

    setWarning(message);

    setTimeout(() => {
      setWarning('')
      }, 5000);

  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try
    {
      const credentials = {
        username: formUsername,
        password: formPassword
      }

      const user = await loginServices.login(credentials);

      setUser(user);
      setFormPassword('');
      setFormUsername('');
      blogServices.setToken(user.token);
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user));
    }
    catch
    {
      warn('Invalid username or password');
    }
  };

  const handleLogout = async (event) => {

    setUser(null);
    setFormPassword('');
    setFormUsername('');
    window.localStorage.removeItem('loggedInBlogUser')

    notify('Logged out successfully');

  }

  const drawLoginPrompt = () => {
    return(
      <div id="loginPrompt">
        <h2>Please login to view posts:</h2>
        <form onSubmit={handleLogin}>
          <div>
            username <input type="text" name="Username" value={formUsername} onChange={({ target }) => setFormUsername(target.value)}/>
          </div>
          <div>
            password <input type="password" name="Password" value={formPassword} onChange={({ target }) => setFormPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const drawBlogList = () => {
    return(
        <div key='drawBlogList'>

          <h3>List of current blogs</h3>

          <table id="ListBlogTableHead">
          <tbody><tr><th>Title</th><th>Author</th></tr></tbody>
          </table>

          {blogs.map
          (
            blog =>
            <ListBlog key={blog.id} blog={blog} />
          )}
        </div>
      )
  }

  const drawLogoutForm = () => (
    <div key='drawLogoutForm'>
      Logged in as {user.username}
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try
    {
      const newBlog =
      {
        author:formAuthor,
        title:formTitle,
        url:formUrl
      };

      await blogServices.create(newBlog);

      setFormAuthor('');
      setFormTitle('');
      setFormUrl('');

      updateBlog();
      notify(`A new blog ${newBlog.title} by ${newBlog.author} has been added.`);
    }
    catch (error)
    {
      warn('Please input valid information only');
      console.log(error);
    }
  }; 

  const drawCreateNew = () => (
    <div id="create_new_blog" key='drawCreateNew'>
      <h2>Create new </h2>

      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input type="text" name="Title" value={formTitle} onChange={({target}) => setFormTitle(target.value)} />
        </div>
        <div>
          author
          <input type="text" name="Author" value={formAuthor} onChange={({target}) => setFormAuthor(target.value)} />
        </div>
        <div>
          url
          <input type="text" name="Url" value={formUrl} onChange={({target}) => setFormUrl(target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );

  return (
    <div id="wrapper">
      <h1>Blogs by Hannu Korvala</h1>

      <Notification text={notification} />
      <Warning text={warning} />

      {

        user === null
        ? drawLoginPrompt()
        : [drawCreateNew(), drawBlogList(), drawLogoutForm()]
      }

    </div>
  );
}

export default App;
