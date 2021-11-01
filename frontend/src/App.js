import './App.css';
import React, { useState, useEffect, useRef } from 'react';

import ListBlog from './components/blog.js';
import blogServices from './services/blogs.js';
import loginServices from './services/login.js';
import Notification from './components/notifications.js';
import { Warning } from './components/notifications.js';
import CreateNewBlog from './components/CreateNewBlog.js';
import Toggable from './components/Toggable';


function App() {

  const [blogs, setBlogs] = useState([]);

  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState('');
  const [warning, setWarning] = useState('');

  const createNewBlogRef = useRef();

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
      .then(allBlogs => {
        allBlogs.sort(
          (a, b) => {return b.likes - a.likes;}
        );
        setBlogs(allBlogs);
      });
  };

  const notify = (message) => {

    setNotification(message);

    setTimeout(() => {
      setNotification('');
    }, 5000);

  };

  const warn = (message) => {

    setWarning(message);

    setTimeout(() => {
      setWarning('');
    }, 5000);

  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try
    {
      const credentials = {
        username: formUsername,
        password: formPassword
      };

      const user = await loginServices.login(credentials);

      setUser(user);
      setFormPassword('');
      setFormUsername('');
      blogServices.setToken(user.token);
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user));
    }
    catch (error)
    {
      warn('Invalid username or password');
    }
  };

  const handleLogout = async () => {

    setUser(null);
    setFormPassword('');
    setFormUsername('');
    window.localStorage.removeItem('loggedInBlogUser');

    notify('Logged out successfully');

  };

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

        {blogs.map(
          blog =>
            <ListBlog key={blog.id} blog={blog} updateBlog={updateBlog}/>
        )}
      </div>
    );
  };

  const drawLogoutForm = () => (
    <div key='drawLogoutForm'>
      Logged in as {user.username}
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );

  const handleCreateBlog = async (newBlog) => {
    try
    {

      await blogServices.create(newBlog);
      await updateBlog();

      createNewBlogRef.current.toggleVisible();

      notify(`A new blog ${newBlog.title} by ${newBlog.author} has been added.`);
    }
    catch (error)
    {
      warn('Please input valid information only');
      console.log(error);
    }
  };

  const drawCreateNew = () => (
    <Toggable labelShow='Add a new blog' labelHide='Cancel' key='toggableNewBlog' ref={createNewBlogRef}>
      <CreateNewBlog create={handleCreateBlog} key="createnewblog" />
    </Toggable>
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
