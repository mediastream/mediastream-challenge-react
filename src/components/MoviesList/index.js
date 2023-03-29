import * as React from 'react';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

export default function MoviesList({ movies }) {
    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={0}>
                    {movies.map((movie) => (
                        <Grid key={movie.title} item
                            style={{ backgroundSize: "cover", }}
                            sx={
                                {
                                    cursor: "pointer",
                                    borderRadius: '10px',
                                    m: 2,
                                    width: 375,
                                    height: 570,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    background: `linear-gradient(to bottom, rgba(0,0,0,0), transparent, rgba(154, 219, 2, 0.5), rgba(154, 219, 2, 0.9)), url('${movie.posterUrl}'), url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png')`
                                }}>
                            <ul style={{ padding: "20px" }}>
                                <li><Typography variant='h6' sx={{ fontWeight: 'bold' }}>{movie.title}</Typography></li>
                                <li><Typography variant='subtitle1'>{movie.genres.join(', ')}</Typography></li>
                                <li><Typography variant='subtitle1'>{movie.year}</Typography></li>
                            </ul>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}