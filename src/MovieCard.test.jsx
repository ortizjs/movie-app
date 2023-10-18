import {render, screen, logRoles } from '@testing-library/react';
import MovieCard from './MovieCard';

describe('MovieCard', () => {
    test('renders correctly', () => {
        const movie = {
            "Title": "Spiderman",
            "Year": "2010",
            "imdbID": "tt1785572",
            "Type": "movie",
            "Poster": "N/A"
        }
        render(<MovieCard movie={movie}/>)
        
        const movieCardElement = screen.getByTestId('movie-card-div');
        expect(movieCardElement).toBeInTheDocument();


        
    })
    test('renders image and movie title', () => {
        const movie = {
            "Title": "Spiderman",
            "Year": "2010",
            "imdbID": "tt1785572",
            "Type": "movie",
            "Poster": "N/A"
        }
        render(<MovieCard movie={movie}/>)
        // screen.debug()
        // const view = render(<MovieCard movie={movie}/>)
        // logRoles(view.container)
        const movieCardImageElement = screen.getByRole('img');
        expect(movieCardImageElement).toBeInTheDocument()

        const movieTitleElement = screen.getByRole('heading');
        expect(movieTitleElement).toBeInTheDocument();
        expect(movieTitleElement).toHaveTextContent('Spiderman');
    })
})