/**
 * Created by sergey on 07.08.17.
 */
import React, { Component } from 'react'
// import { Link } from 'react-router'

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        {/* добавили вывод потомков */}
        {this.props.children}
      </div>
    )
  }
}