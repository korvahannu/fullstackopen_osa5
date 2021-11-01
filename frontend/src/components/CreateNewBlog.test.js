import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateNewBlog from './CreateNewBlog.js';

describe('<CreateNewBlog />', () => {

  test('Does create new blog call "create"-function with proper parameters?', () => {

    const mockCreate = jest.fn();

    const component = render (
      <CreateNewBlog create={mockCreate} />
    );

    const dummyBlog = {
      title: 'test_title',
      author: 'test_author',
      url: 'test_url'
    };

    const author = component.container.querySelector('#createBlogAuthor');
    const title = component.container.querySelector('#createBlogTitle');
    const url = component.container.querySelector('#createBlogUrl');

    fireEvent.change(author,
      { target : { value : dummyBlog.author } }
    );
    fireEvent.change(title,
      { target : { value : dummyBlog.title } }
    );
    fireEvent.change(url,
      { target : { value : dummyBlog.url } }
    );

    const form = component.container.querySelector('form');

    fireEvent.submit(form);

    expect(mockCreate.mock.calls).toHaveLength(1);
    expect(mockCreate.mock.calls[0][0].title).toBe(dummyBlog.title);
    expect(mockCreate.mock.calls[0][0].author).toBe(dummyBlog.author);
    expect(mockCreate.mock.calls[0][0].url).toBe(dummyBlog.url);
  });

});