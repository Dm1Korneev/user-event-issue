import React, {useMemo, useState} from 'react'
import {useRifm} from 'rifm'

export const MoneyInput = ({currency, locale, ...inputProps}) => {
  const [value, setValue] = useState(
    typeof inputProps.value === 'number' ? inputProps.value : null,
  )

  const {accept, reverseFormatNumber, format} = useMemo(() => {
    const group = new Intl.NumberFormat(locale).format(11111).replace(/1/g, '')

    const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '')

    const formatter = new Intl.NumberFormat(
      locale,
      currency
        ? {
            style: 'currency',
            currency,
          }
        : {minimumFractionDigits: 2},
    )

    return {
      accept: new RegExp(`[\\d${decimal}]`, 'g'),
      reverseFormatNumber: (inputValue) => {
        let reversedValue = inputValue
        if (group) {
          reversedValue = reversedValue.replace(
            new RegExp(`\\${group}`, 'g'),
            '',
          )
        }
        if (decimal) {
          reversedValue = reversedValue.replace(
            new RegExp(`\\${decimal}`, 'g'),
            '.',
          )
        }
        reversedValue = reversedValue.replace(/(?<=\..*)\./g, '')
        reversedValue = reversedValue.replace(/[^\d.]/g, '')

        const numberValue = Number(reversedValue) || null
        return Number.isNaN(numberValue) ? null : numberValue
      },
      format: (inputValue) =>
        inputValue != null ? formatter.format(inputValue) : '',
    }
  }, [locale, currency])

  const rifm = useRifm({
    accept,
    value: format(value),
    format: (next) => format(reverseFormatNumber(next)),
    onChange: (next) => {
      const nextNumber = reverseFormatNumber(next)
      setValue(nextNumber)
      if (inputProps.onChange) {
        inputProps.onChange(nextNumber)
      }
    },
  })

  return <input placeholder={format(0)} {...inputProps} {...rifm} />
}
