import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { APP_TEXT } from '../../../shared/constants/text'
import { PartNumberInput } from './PartNumberInput'

describe('PartNumberInput', () => {
  it('passes entered value to the change handler', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <PartNumberInput
        value=""
        onChange={onChange}
        onClear={vi.fn()}
      />,
    )

    await user.type(screen.getByLabelText(APP_TEXT.SEARCH.LABEL), '0')

    expect(onChange).toHaveBeenCalledWith('0')
  })

  it('shows a minimum length hint and clears the value', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()

    render(
      <PartNumberInput
        value="0"
        onChange={vi.fn()}
        onClear={onClear}
      />,
    )

    expect(screen.getByText(/Введите минимум/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', {
      name: APP_TEXT.SEARCH.CLEAR_ARIA,
    }))

    expect(onClear).toHaveBeenCalledOnce()
  })
})
