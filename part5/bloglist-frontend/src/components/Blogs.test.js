/* eslint-disable */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import CreateBlogs from './CreateBlogs';

describe('Blog list tests', () => {
  let component;
  let mockHandlerLikes;
  let mockHandler2;
  beforeEach(() => {
    const blog = {
      title: 'test',
      author: 'test2',
      likes: 11,
      url: 'll@a.com'
    }
    mockHandlerLikes = jest.fn()
    mockHandler2 = jest.fn()

    component = render(
      <Blog
        blog={blog}
        updateLikes={mockHandlerLikes}
        deleteBlog={mockHandler2}
      />
    )
  
  })

  test('Test if initially the blog is displaying the blog\'s title and author', () => {
    expect(component.container).toHaveTextContent('test test2')
  })

  test('show blogs url and number of likes when button to show is clicked', () => {
    const button = component.getByText('show');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent('Likes: 11likeurl: ll@a.com')

  })

  test('if like button is clicked twice, event handler is called twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandlerLikes.mock.calls).toHaveLength(2);

  })

  test('check the creation of new blog form, if form calls event handlers which it received as props with the correct details.', () => {
    const createBlog = jest.fn();

    const component = render(
      <CreateBlogs createBlog={createBlog} />
    )

    const inputTitle = component.container.querySelector('#title-inp');
    const inputAuthor = component.container.querySelector('#author-inp');
    const inputUrl = component.container.querySelector('#url-inp');
    const form = component.container.querySelector('#form-blog');

    fireEvent.change(inputTitle, {
      target: {value: 'Testing Title'}
    })

    fireEvent.change(inputAuthor, {
      target: {value: 'Testing Author'}
    })

    fireEvent.change(inputUrl, {
      target: {value: 'Testing url'}
    })

    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('Testing Title');
    expect(createBlog.mock.calls[0][0].author).toBe('Testing Author');
    expect(createBlog.mock.calls[0][0].url).toBe('Testing url');
  })
})