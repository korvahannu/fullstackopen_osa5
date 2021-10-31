import React, {useState} from 'react'
import blogServices from '../services/blogs.js';

const info = ({blog, toggleMoreInfo, setBlogLiked, liked, deleteBlog}) => {

    const buttonStyle = {
        height:'32px',
        fontSize:'0.8em',
        padding:'0',
        backgroundColor:'#F0F3F6',
        backgroundImage:'none',
        color:'#203F5E',
        margin:'0px'
    };

    const likeButtonStyle = {
        backgroundImage:'none',
        backgroundColor:'#F0F3F6',
        width:'8px',
        height:'24px',
        margin:'0px',
        padding:'0px'
    };

    const deleteButtonStyle = {
        margin:'0px',
        padding:'0px',
        backgroundImage:'none',
        backgroundColor:'F0F3F6',
        color:'red',
        width:'5px',
        fontSize:'0.9em',
        marginBottom:'16px'
    };

    const likeBlog = async () => {
        await blogServices.likeBlog(blog);
        await setBlogLiked();
    };

    const drawLikeButton = () => (
        <button style={likeButtonStyle} onClick={likeBlog}>👍</button>
    );

    const drawLikedText = () => (
        <div style={{color:'green'}}><br />Blog liked :)</div>
    );

    return(
        <div style={{marginTop:'16px'}}>
             <b>Url:</b> {blog.url}<br />
            <b>Likes:</b> {blog.likes}<br />
            <b>User:</b> {blog.user.name}
            
            {
                liked === false
                ? drawLikeButton()
                : drawLikedText()
            }

            
            <br />
            <button style={deleteButtonStyle} onClick={deleteBlog}>delete blog?</button> <br />
            <button type="text" style={buttonStyle} onClick={toggleMoreInfo}>Hide</button>
        </div>
    );
};

const ListBlog = ({blog, updateBlog}) => {

    const [moreInfo, setMoreInfo] = useState(false);
    const [liked, setLiked] = useState(false);

    const toggleMoreInfo = () => {
        setMoreInfo(!moreInfo);
    };

    const setBlogLiked = async () => {
        setLiked(true);
        await updateBlog();
    };

    const divStyle = {
        marginBottom:'16px',
        borderBottom:'1px solid #203F5E',
        borderRadius:'8px'
    };

    const buttonStyle = {
        height:'32px',
        fontSize:'0.8em',
        padding:'0',
        backgroundColor:'#F0F3F6',
        backgroundImage:'none',
        color:'#203F5E',
        margin:'0px'
    };

    const drawMoreInfoButton = () => (
        <button type="text" style={buttonStyle} onClick={toggleMoreInfo}>View</button>
    );

    const deleteBlog = async () => {

        if(window.confirm(`Do you want to remove ${blog.title} by ${blog.author}`))
        {
            await blogServices.deleteBlog(blog);
            await updateBlog();
        }
    };

    return(
        <div style={divStyle}>
          <b>{blog.title}</b> by <i>{blog.author}</i> <br/>

          {
              moreInfo === true
              ? info({blog, toggleMoreInfo, setBlogLiked, liked, deleteBlog})
              : drawMoreInfoButton()
          }
        </div>
    )};

export default ListBlog