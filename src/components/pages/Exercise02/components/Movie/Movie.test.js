import React from 'react';
import { render, screen } from '@testing-library/react';

import Movie from '.';

const movie = {
  id: 1,
  title: 'Beetlejuice',
  year: '1988',
  runtime: '92',
  genres: ['Comedy', 'Fantasy'],
  director: 'Tim Burton',
  actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
  plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
  posterUrl:
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
};

describe('Movie component', () => {
  beforeEach(() => {
    render(<Movie movie={movie} />);
  });

  it('Should render component', function () {
    expect(screen.getByText(/Beetlejuice/i)).toBeTruthy();
  });

  it('Should render image in background', function () {
    expect(screen.getByTestId('movie-image')).toBeTruthy();
  });
});
