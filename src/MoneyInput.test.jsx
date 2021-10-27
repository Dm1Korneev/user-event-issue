import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {MoneyInput} from './MoneyInput'

test('en locale', () => {
  const onChange = jest.fn()

  render(<MoneyInput locale="en-GB" currency="GBP" onChange={onChange} />)

  userEvent.type(screen.getByPlaceholderText('£0.00'), '100000')

  expect(onChange).toHaveBeenCalledTimes(6)
  expect(onChange).toHaveBeenLastCalledWith(100000)
  expect(screen.getByDisplayValue('£100,000.00')).toBeInTheDocument()

  userEvent.type(screen.getByDisplayValue('£100,000.00'), '.0')

  // to be same as previous one
  expect(onChange).toHaveBeenCalledTimes(6)
  expect(onChange).toHaveBeenLastCalledWith(100000)

  expect(screen.getByDisplayValue('£100,000.00')).toBeInTheDocument()

  userEvent.type(screen.getByDisplayValue('£100,000.00'), '5')

  expect(onChange).toHaveBeenCalledTimes(7)
  expect(onChange).toHaveBeenLastCalledWith(100000.05)

  expect(screen.getByDisplayValue('£100,000.05')).toBeInTheDocument()

  userEvent.type(screen.getByDisplayValue('£100,000.05'), 'foo bar baz')

  // to be same as previous one
  expect(onChange).toHaveBeenCalledTimes(7)
  expect(onChange).toHaveBeenLastCalledWith(100000.05)

  expect(screen.getByDisplayValue('£100,000.05')).toBeInTheDocument()
})

test('pl locale', () => {
  const onChange = jest.fn()

  render(<MoneyInput locale="pl-PL" currency="GBP" onChange={onChange} />)

  userEvent.type(screen.getByPlaceholderText('0,00 GBP'), '10000')

  expect(onChange).toHaveBeenCalledTimes(5)
  expect(onChange).toHaveBeenLastCalledWith(10000)
  expect(screen.getByDisplayValue('10 000,00 GBP')).toBeInTheDocument()

  userEvent.type(screen.getByDisplayValue('10 000,00 GBP'), '0')

  expect(onChange).toHaveBeenCalledTimes(6)
  expect(onChange).toHaveBeenLastCalledWith(100000)
  expect(screen.getByDisplayValue('100 000,00 GBP')).toBeInTheDocument()

  userEvent.type(screen.getByDisplayValue('100 000,00 GBP'), ',0')

  // to be same as previous one
  expect(onChange).toHaveBeenCalledTimes(6)
  expect(onChange).toHaveBeenLastCalledWith(100000)
  expect(screen.getByDisplayValue('100 000,00 GBP')).toBeInTheDocument()

  userEvent.type(screen.getByDisplayValue('100 000,00 GBP'), '5')

  expect(onChange.mock.calls.length).toBe(7)
  expect(onChange).toHaveBeenLastCalledWith(100000.05)
  expect(screen.getByDisplayValue('100 000,05 GBP')).toBeInTheDocument()

  userEvent.type(screen.getByDisplayValue('100 000,05 GBP'), 'foo bar baz')

  // to be same as previous one
  expect(onChange.mock.calls.length).toBe(7)
  expect(onChange).toHaveBeenLastCalledWith(100000.05)
  expect(screen.getByDisplayValue('100 000,05 GBP')).toBeInTheDocument()
})
