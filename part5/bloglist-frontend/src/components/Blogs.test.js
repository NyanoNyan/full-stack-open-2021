/* eslint-disable */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('Blog list tests', () => {
  test('Test if initially the blog is displaying the blog\'s title and author', () => {
    const blog = {
      title: 'test',
      author: 'test2',
      likes: 11,
      url: 'll@a.com'
    }

    const mockHandler = jest.fn();
    const mockHandler2 = jest.fn();

    const component = render(
        <Blog 
            blog={blog}
            updateLikes={mockHandler}
            deleteBlog={mockHandler2}
        />
    )

    expect(component.container).toHaveTextContent('test test2')

  })
})