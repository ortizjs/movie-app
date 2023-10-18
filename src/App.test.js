import { render, screen, logRoles, act } from '@testing-library/react';
import user from '@testing-library/user-event'

import App from './App';
describe("App", () => {
  test('renders the component correctly', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', {  name: /movieland/i})
    expect(headingElement).toBeInTheDocument();

    const textBoxElement = screen.getByRole('textbox');
    expect(textBoxElement).toBeInTheDocument();

    const searchImgElement = screen.getByRole('img', {  name: /search/i});
    expect(searchImgElement).toBeInTheDocument();
  });

  test('renders the text No movies found upon initial render', () => {
    render(<App />);
    const noMovieHeadingElement = screen.getByRole('heading', {  name: /no movies found!/i})
    expect(noMovieHeadingElement).toBeInTheDocument();
  })

  test('renders the text No movies found when searching with empty string', async () => {
    user.setup();
    render(<App />);
    const textBoxElement = screen.getByRole('textbox');
    await act(() => user.type(textBoxElement, "''"));
    // await act(() => user.type(textBoxElement, "abc{enter}"));
    await act(() => user.keyboard("Enter", textBoxElement));
    const noMovieHeadingElement = screen.getByRole('heading', {  name: /no movies found!/i})
    expect(noMovieHeadingElement).toBeInTheDocument();
  })

  test('renders a list of movies from initial search term', async () => {
    render(<App />);
    // const moiveListElement = await screen.findAllByTestId('movie-card-div', {
    //   timeout: 100
    // });
  
    const moiveListElement = await screen.findAllByTestId('movie-card-div');
    expect(moiveListElement).toHaveLength(10)
  })

  test('renders a list of movies when a valid search term is provided', async () => {
    user.setup();
    render(<App />);
    const textBoxElement = screen.getByRole('textbox');
    await act(() => user.type(textBoxElement, "'Notebook'"));
    await act(() => user.keyboard("Enter", textBoxElement));
    // await act(() => user.type(textBoxElement, "abc{enter}"));
    const moiveListElement = await screen.findAllByTestId('movie-card-div');
    expect(moiveListElement).toHaveLength(10)
  })

  test('renders the text No movies found when an valid search term is provided', async () => {
    user.setup();
    render(<App />);
    const textBoxElement = screen.getByRole('textbox');
    await act(() => user.type(textBoxElement, "'Notm'"));
    await act(() => user.keyboard("Enter", textBoxElement));
    // await act(() => user.type(textBoxElement, "abc{enter}"));
  
    const noMovieHeadingElement = screen.getByRole('heading', {  name: /no movies found!/i})
    expect(noMovieHeadingElement).toBeInTheDocument();
  })
})
