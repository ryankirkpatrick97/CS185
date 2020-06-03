import React, {Component} from 'react'
const axios = require('axios')


export class MovieSearch extends Component{
    constructor(props){
        super(props);

        this.state = {
            searchStr: "",
        }        

        this.selectList = (event) => {
            let val = event.target.value;
            this.setState({
                currentList: val,
            });
        };

        this.handleChange = (event) => {
            let nam = event.target.name;
            let val = event.target.value;
            this.setState({[nam]: val});
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.search = this.search.bind(this);
    }

    handleKeyDown(e){
        // Set up enter press to call search 
        if (e.keyCode === 13) {
            this.search();
        }
    }

    search() {
        
        document.getElementById("movieForm").reset();
        let searchStr = this.state.searchStr.toLowerCase();        
        let found = false;

        // Check to see if searchStr is in database 
        let ref = this.props.firebase.database().ref();
        ref.on('value', snapshot => {
            snapshot.forEach((listChild) => {
                listChild.forEach((movieChild) => {
                    if(movieChild.val() != null){
                        let movie = [];
                        if(searchStr === movieChild.val().Title.toLowerCase()){
                            movie[movieChild.key] = movieChild.val();
                            this.props.setMovies(movie);
                            found = true;
                            return;
                        }
                    }
                })             
            })
        });
        
        // Check to see if searchStr is imdbID and retrieve from omdb
        let movie = [];
        axios.get('https://www.omdbapi.com/?apikey=d0b4efe6&i=' + searchStr)
            .then((value) => {
                if(value.data.Error == null){
                    let movie = [];
                    movie[searchStr] = value.data;
                    this.props.setMovies(movie);
                    found = true;
                    return;
                }
            })
            .then(() => {
                if(!found)
                    alert("Searched movie was not found in database, and was not a valid ImdbID")
            });

    }    

    render(){

        return (
            <div id="MovieSearch">
                <input id="movieSearchInput" type="text" name="searchStr" placeholder= "Movie title/ID..." onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
                <div id="searchButton">
                    <input type="submit" value="Search" onClick={this.search}/>
                </div>


            </div>
        )
    };
}
export default MovieSearch;
