import React, {Component} from 'react'
import MovieList from "./MoviesList.js"

export class MoviePage extends Component{
    constructor(props){
        super(props);
        
        
        this.moviesPerPage = 8;
        this.state = {
            // ids: ["tt0061418",
            //  "tt0033467", "tt0068646", "tt0137523",
            //     "tt0114814", "tt0169547", "tt0144084", "tt0206634", "tt1130884", "tt0092005", "tt0338013",
            //     "tt0264464", "tt0075314", "tt0066921", "tt0432283", "tt0034583", "tt0099348", "tt0095016"],
            start: 0,
            end: this.moviesPerPage,
            movies: {},
            shownMovies: {},
            numMovies: 0,
            isPrevMovies: false,
            isNextMovies: false,
        }

        this.displayPrev = this.displayPrev.bind(this);
        this.displayNext = this.displayNext.bind(this);

        this.goPrev = this.goPrev.bind(this);
        this.goNext = this.goNext.bind(this);
    }


    goPrev(){
        var newStart = this.state.start - this.moviesPerPage;
        var newEnd = this.state.end - this.moviesPerPage;
        var shownMovies = this.state.movies.slice(newStart, newEnd)
        this.setState({
            start: newStart,
            end: newEnd,
            isPrevMovies: (newStart > 0),
            isNextMovies: (newEnd < this.state.numMovies),
            shownMovies: shownMovies,
        })
    }

    goNext(){
        var newStart = this.state.start + this.moviesPerPage;
        var newEnd = this.state.end + this.moviesPerPage;
        var shownMovies = this.state.movies.slice(newStart, newEnd)
        this.setState({
            start: newStart,
            end: newEnd,
            isPrevMovies: (newStart > 0),
            isNextMovies: (newEnd < this.state.numMovies),
            shownMovies: shownMovies,
        })
    }



    componentWillReceiveProps(nextProps){
        if(this.state.movies !== nextProps.movies){
            var newMovies = Object.values(nextProps.movies);
            var numMovies = newMovies.length;
            var shownMovies = newMovies.slice(0, this.moviesPerPage)
            this.setState({
                start: 0,
                end: this.moviesPerPage,
                movies: newMovies,
                numMovies: numMovies,
                shownMovies: shownMovies,
                isPrevMovies: false,
                isNextMovies: (this.moviesPerPage < numMovies)
            })
        }
            
    }
    displayPrev(){
        if(this.state.isPrevMovies)
            return(<div style={{float: "left"}}><input type="submit" name="PrevButton" value="Prev" onClick={this.goPrev}/></div>)
    }
    displayNext(){
        if(this.state.isNextMovies)
            return(<div style={{float: "right"}}><input type="submit" name="NextButton" value="Next" onClick={this.goNext}/></div>)
    }



    render(){
        return(
            <div>
                <MovieList firebase={this.props.firebase} movies={this.state.shownMovies} />
                <div style={{display: "inline-block", width: "100%"}}>
                    {this.displayPrev()}
                    {this.displayNext()}
                </div>
            </div>
        )
    };
}
export default MoviePage;
