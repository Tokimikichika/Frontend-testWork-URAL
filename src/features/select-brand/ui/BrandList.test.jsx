import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { BrandList } from './BrandList'

describe('BrandList', () => {
  it('renders brands and selects the clicked brand', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(
      <BrandList
        brands={['ASAM', 'FEBI']}
        selectedBrand="FEBI"
        onSelect={onSelect}
      />,
    )

    expect(screen.getByRole('button', { name: 'FEBI' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    await user.click(screen.getByRole('button', { name: 'ASAM' }))
    expect(onSelect).toHaveBeenCalledWith('ASAM')
  })
})
