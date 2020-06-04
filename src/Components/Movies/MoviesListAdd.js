import React, {Component} from 'react'

export class MoviesListAdd extends Component{
    constructor(props){
        super(props);
        
        this.state = {
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
            }, () => {
                this.loadFromFirebase(val);
                this.props.setGraphViz(val === "GraphViz");
            });
        };

        this.addList = (event) => {
            let value = prompt("What would you like to name the new list?")
            if(value != null){
                this.props.firebase.database().ref(value).set('')
            }
        }
    }


    loadFromFirebase(listName) {
        var newMovies = {};
        var movieListsToRead = [];
        // Choose which movies to read
        if(listName === "All"){
            // Remove "All" from list of movies
            movieListsToRead = [...this.state.movieLists];
            var index = movieListsToRead.indexOf("All");
            movieListsToRead.splice(index, 1);
        } else {
            // Make list of just current list
            movieListsToRead = [listName];
        }
        
        // Read the lists from firebase
        movieListsToRead.forEach((x) => {
            let ref = this.props.firebase.database().ref(x);
            ref.on('value', snapshot => {
                if(snapshot.val() != null){
                    Object.entries(snapshot.val()).forEach(([key, movie]) => {
                        newMovies[key] = movie;
                    });
                }
                this.props.setMovies(newMovies);
            });
        });
    }

    componentDidMount() {
        // Read what lists are available in the firebase database, and then store in movieLists
        let ref = this.props.firebase.database().ref()
        ref.on('value', snapshot => {
            let movieLists = ["All"];
            snapshot.forEach(child => {
                movieLists.push(child.key)
            })

            this.setState({
                movieLists: movieLists,
            }, 
                // Load all the movies from firebase
                () => {this.loadFromFirebase(this.state.currentList);}
            );
        });
    }

    render(){
        return(
            <div id="movieListAddSection">
                <form id="movieForm">
                <select name="test" onChange={this.selectList}>
                    {this.state.movieLists.map((x) => (
                        <option name="test" value={x}>{x}</option>
                    ))}
                </select>
                </form>
                <input type="submit" value="Create New List" onClick={this.addList}/>
            </div>
        )
    };
}
export default MoviesListAdd;
