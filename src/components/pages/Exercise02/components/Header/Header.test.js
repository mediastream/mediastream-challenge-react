import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Header from '.';

const handleOnGenderChange = jest.fn();
const handleOnOrderClick = jest.fn();

const genres = ['Drama', 'Comedia'];

describe('Header component', () => {
  beforeEach(() => {
    render(
      <Header
        selectedGenre=""
        order="desc"
        genres={genres}
        onGenderChange={handleOnGenderChange}
        onOrderClick={handleOnOrderClick}
      />
    );
  });

  it('Should render component', function () {
    expect(screen.getByText(/Movie Library/i)).toBeTruthy();
  });

  it('Should select default genres', function () {
    expect(screen.getByText(/Show all/i)).toBeTruthy();
  });

  it('Should display order by desc', function () {
    expect(screen.getByText(/Year Descending/i)).toBeTruthy();
  });

  it('Should called genre event', function () {
    fireEvent.change(screen.getByTestId('genre-list'), {
      target: { value: 'Comedia' },
    });

    expect(handleOnGenderChange.mock.calls.length).toBe(1);
  });

  it('Should called order event', function () {
    fireEvent.click(screen.getByText(/Year Descending/i));

    expect(handleOnOrderClick.mock.calls.length).toBe(1);
  });
});
