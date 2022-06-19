import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Paginate from '.';

const handleOnPageChange = jest.fn();

describe('Paginate component', () => {
  beforeEach(() => {
    render(<Paginate total={300} page={1} onPageChange={handleOnPageChange} />);
  });

  it('Should render pages', function () {
    expect(screen.getAllByTestId('paginate-page')).toHaveLength(300/50);
  });

  it('Should called page change event', function () {
    fireEvent.click(screen.getByText('2'));

    expect(handleOnPageChange.mock.calls.length).toBe(1);
  });
});
