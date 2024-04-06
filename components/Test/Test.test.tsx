import { render } from '@testing-library/react'

import { Test } from '.'

test('renders Test component', () => {
  render(<Test data={undefined} />)
})
