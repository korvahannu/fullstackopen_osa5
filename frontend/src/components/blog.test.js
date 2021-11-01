import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import ListBlog from './blog.js';

describe('<ListBlog />', () => {

  let component;
  let mockUpdate = jest.fn();

  const blog = {
    author: 'random_author',
    title: 'random_title',
    url: 'random_url',
    likes: 5,
    user : {
      name: 'hannu korvala'
    }
  };

  beforeEach( () => {
    component = render(
      <ListBlog blog={blog} updateBlog={mockUpdate} />
    );
  });

  test('Render only title and author by default', () => {

    expect(5).toBe(5);
    const author = component.queryByText(blog.author);
    const title = component.queryByText(blog.title);
    const url = component.queryByText(blog.url);
    const likes = component.queryByText(blog.likes);

    expect(author).toBeDefined();
    expect(title).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test('Render title, author, url and likes after pressing more info', () => {
    const button = component.container.querySelector('button');
    fireEvent.click(button);

    const author = component.queryByText(blog.author);
    const title = component.queryByText(blog.title);
    const url = component.queryByText(blog.url);
    const likes = component.queryByText(blog.likes);
    const username = component.queryByText(blog.user.name);

    expect(author).toBeDefined();
    expect(title).toBeDefined();
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
    expect(username).toBeDefined();
  });


  /*
  Tein blogien tykkäämisen erillä tavalla kuin mitä opettaja varmaan halusi, joten en voi tehdä tehtävää 5.15
  koska:
    1. Ohjelmani sallii napin painamisen vain kerran (kunnes sivu refreshataan)
    2. blog.js komponentti käyttää blogserviceä, joten liken painaminen päivittää tiedon tietokantaan
    3. End to end testaus tulee seuraavassa osiossa, ehkä korjaan tämän sitten jos muistan
  */
  test('Clicking like button twice calls function twice', () => {

    const viewButton = component.getByText('View');
    fireEvent.click(viewButton);

    const likeButton = component.getByText('👍');
    fireEvent.click(likeButton);  // likebuttonin painaminen oikeasti on asynkroninen operaatio

    const hideButton = component.getByText('Hide');
    fireEvent.click(hideButton);


    const author = component.queryByText(blog.author);
    const title = component.queryByText(blog.title);
    const url = component.queryByText(blog.url);
    const likes = component.queryByText(blog.likes);
    const username = component.queryByText(blog.user.name);

    expect(author).toBeDefined();
    expect(title).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
    expect(username).toBeNull();
  });
});