import React from 'react'
import { shallow, mount } from 'enzyme'
import Menu from '../Menu'
import axios from 'axios'

describe('<Menu />', () => {
  it('should fetch items of the menu from back-end using axios', () => {
    const axiosSpy = jest.spyOn(axios, 'get')
    shallow(<Menu />)
    expect(axiosSpy).toBeCalled()
  });
})
