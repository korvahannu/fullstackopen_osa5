import React from 'react'

const ListBlog = ({blog}) => (
    <table className="ListBlogTable">
        <tbody>
        <tr>
            <th>{blog.title}</th>
            <th>{blog.author}</th>
        </tr>
        </tbody>
    </table>
);

export default ListBlog;