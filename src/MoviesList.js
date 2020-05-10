import React from "react";
import MovieCard from "./MovieCard";
import AnchorLink from "./AnchorLink";
import axios from "axios";
import "./styles.css";

// need to remove jump to top of page when couldn't find any movie appears
//need to limit the hover to around jump to top of page on x axis (anchor link takes the size of the moviecardcontainer)

export default class MoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: ["tt0094625"],
      searchTerm: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.searchTerm === "") {
      const search = document.getElementById("search");
      search.classList.add("noSearchTerm");
      search.placeholder = "Enter movie title to search for please";
      return;
    }
    axios
      .get(
        `https://www.omdbapi.com/?apikey=756abb2f&s=${
          this.state.searchTerm
        }&plot=full`
      )
      .then(res => res.data)
      .then(res => {
        if (!res.Search) {
          this.setState({ moviesList: [] });
          return;
        }
        const moviesList = res.Search.map(movie => movie.imdbID);
        this.setState({
          moviesList
        });
      });
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  handleClick(event) {
    const search = document.getElementById("search");
    search.placeholder = "";
    event.target.value = "";
  }

  handleBlur() {
    const search = document.getElementById("search");
    search.placeholder = "Search for a movie";
    search.classList.remove('noSearchTerm');
  }

  render() {
    const { moviesList } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            id="search"
            placeholder="Search for a movie"
            onChange={this.handleChange}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
          />
          <button type="submit">
            <i className="fa fa-search" />
          </button>
        </form>
        {moviesList.length > 0 ? (
          moviesList.map(movie => <MovieCard movieID={movie} key={movie} />)
        ) : (
          <p className="searchError">
            Couldn't find any movie. Please search again.
          </p>
        )}
        <AnchorLink />
      </div>
    );
  }
}
