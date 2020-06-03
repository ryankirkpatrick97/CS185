import React, {Component} from 'react'
import MoviesListAdd from "./MoviesListAdd"
import MovieSearch from "./MovieSearch.js"
import MoviePage from "./MoviePage.js"
import {movieConfig} from "../../config.js"
const firebase = require('firebase')


export class Movies extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            // ids: ["tt0061418",
            //  "tt0033467", "tt0068646", "tt0137523",
            //     "tt0114814", "tt0169547", "tt0144084", "tt0206634", "tt1130884", "tt0092005", "tt0338013",
            //     "tt0264464", "tt0075314", "tt0066921", "tt0432283", "tt0034583", "tt0099348", "tt0095016"],
            movieLists: ["All"],
            currentList: "All",
            movies: [],
        }
        this.name = "movieApp";

        this.setMovies = (movies) => {
            this.setState({
                movies: movies,
            });
        }
    }

    componentDidMount() {
        // Initialize/Recall firebase connection
        var newFirebase;
        try {
            newFirebase = firebase.app(this.name);
        } catch (error) {
            newFirebase = firebase.initializeApp(movieConfig, this.name)
        }

        // Set firebase to state variable
        this.setState({
            firebase: newFirebase,
        });
    }

    render(){
        if(this.state.firebase != null){
            return(
                <div>
                    <div style={{display:"inline-block", width:"100%"}}>
                        <MoviesListAdd firebase={this.state.firebase} setMovies={this.setMovies}/>
                        <MovieSearch firebase={this.state.firebase} setMovies={this.setMovies} />
                    </div>

                    <MoviePage firebase={this.state.firebase} movies={this.state.movies}/>
                </div>
                )
        } else {
            return(<div></div>)
        }
    };
}
export default Movies;
