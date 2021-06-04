/* eslint-disable */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog list tests', () => {
  let component;

  beforeEach(() => {
    const blog = {
      title: 'test',
      author: 'test2',
      likes: 11,
      url: 'll@a.com'
    }
    const mockHandler = jest.fn()
    const mockHandler2 = jest.fn()

    component = render(
      <Blog
        blog={blog}
        updateLikes={mockHandler}
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
})