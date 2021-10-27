import React from 'react'
import ReactDOM from 'react-dom'
import {MoneyInput} from './MoneyInput'

ReactDOM.render(
  <>
    <MoneyInput locale="en-GB" currency="GBP" onChange={(next) => console.log(next) }/>
    <MoneyInput locale="pl-PL" currency="GBP" onChange={(next) => console.log(next) }/>
  </>,
  document.getElementById('root'),
)
