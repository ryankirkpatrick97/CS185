import React, {Component} from 'react'
import MovieList from "./MoviesList.js"
import MovieSearch from "./MovieSearch.js"
import {movieConfig} from "../config.js"
const axios = require('axios')
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

        this.loadFromFirebase = this.loadFromFirebase.bind(this);

        this.selectList = (event) => {
            let val = event.target.value;
            this.setState({
                currentList: val,
            }, this.loadFromFirebase(val));
        };

        this.addList = (event) => {
            let value = prompt("What would you like to name the new list?")
            if(value != null){
                this.state.firebase.database().ref(value).set('')
            }
        }

        this.setMovies = (movies) => {
            this.setState({
                movies: movies,
            });
        }
    }


    loadFromFirebase(listName) {
        var newMovies = {};
        var movieListsToRead = [];
        // Choose which movies to read
        if(listName == "All"){
            // Remove "All" from list of movies
            movieListsToRead = [...this.state.movieLists];
            var index = movieListsToRead.indexOf("All");
            movieListsToRead.splice(index, 1);
        } else {
            // Make list of just current list
            movieListsToRead = [listName];
        }
        
        // Read the lists from firebase
        movieListsToRead.map((x) => {
            let ref = this.state.firebase.database().ref(x);
            ref.on('value', snapshot => {
                if(snapshot.val() != null){
                    Object.entries(snapshot.val()).map(([key, movie]) => {
                        newMovies[key] = movie;
                    });
                }

                this.setState({
                    movies: newMovies,
                });
            });
        });
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
        }, () => {

        // Read what lists are available in the firebase database, and then store in movieLists
        let ref = this.state.firebase.database().ref()
        ref.on('value', snapshot => {
            let movieLists = ["All"];
            snapshot.forEach(child => {
                movieLists.push(child.key)
            })

            this.setState({
                movieLists: movieLists,
            }, 
                // Load all the movies from firebase
                () =>{this.loadFromFirebase(this.state.currentList);}
            );
        });

        });
    }

    render(){
        if(this.state.firebase != null){
            return(
                <div>
                    <div style={{display:"inline-block", width:"100%"}}>
                        <div id="movieListAddSection">
                            <div>
                            <form id="movieForm">
                            <select name="test" onChange={this.selectList}>
                                {this.state.movieLists.map((x) => (
                                    <option name="test" value={x}>{x}</option>
                                ))}
                            </select>
                            </form>
                            </div>
                            <div id="addListButton">
                            <input type="submit" value="Create New List" onClick={this.addList}/>
                            </div>
                        </div>

                        <MovieSearch firebase={this.state.firebase} setMovies={this.setMovies} />
                    </div>


                    <MovieList firebase={this.state.firebase} movies={this.state.movies} movieLists={this.state.movieLists}/>
                </div>
                )
        } else {
            return(<div></div>)
        }
    };
}
export default Movies;
