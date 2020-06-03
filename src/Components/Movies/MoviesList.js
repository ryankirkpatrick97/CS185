import React, {Component} from 'react'

export class MoviesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            unlinkedMovieLists: [],
            currentMovie: {},
            currentList: '',
        }


        this.displayLightBox = this.displayLightBox.bind(this);
        this.hideLightbox = this.hideLightbox.bind(this);
        this.findUnlinkedMovieLists = this.findUnlinkedMovieLists.bind(this);
        this.addMovieToList = this.addMovieToList.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.handleChange = (event) => {
            let nam = event.target.name;
            let val = event.target.value;
            this.setState({[nam]: val});
        }
    }

    addMovieToList(){
        // Add movie to currentList
        if(this.state.currentList !== ''){
            this.props.firebase.database().ref(this.state.currentList + "/" + this.state.currentMovie.imdbID).set(this.state.currentMovie);
            alert(this.state.currentMovie.Title + " successfully added to " + this.state.currentList);
            this.findUnlinkedMovieLists(this.state.currentMovie.imdbID);
        } else {
            alert("Error: Movie is already in all lists");
        }
    }

    deleteMovie(event){
        var imdbID = this.state.currentMovie.imdbID;
        var movieLists = [];


        // Loop through all lists and delete from database
        let ref = this.props.firebase.database().ref();
        ref.on('value', snapshot => {
            snapshot.forEach((listChild) => {
                // Search each list for if movie is contained
                listChild.forEach((movieChild) => {
                    if(movieChild.val() != null){
                        if(movieChild.key === imdbID){
                            movieLists.push(listChild.key);
                            return;
                        }
                    }
                })
            })
        })

        // Delete Movies
        movieLists.forEach((x) => {
            // Remove movie from each list
            ref.child(x).child(imdbID).remove();
        });

        // Reinstantiate missing lists
        ref.on('value', snapshot => {
            movieLists.forEach((x) => {
                if(!snapshot.child(x).exists())
                ref.child(x).set('');
            });
        });
        
        // Exit lightbox
        this.hideLightbox();

    }

    findUnlinkedMovieLists(imdbID){
        // Initialize unlinkedMovieLists, and remove "All from "
        var unlinkedMovieLists = [];
        var currentList = [];


        // Loop through database, and add listname to unlinkedMovieLists if it doesn't contain lightboxed movie
        let ref = this.props.firebase.database().ref();
        ref.on('value', snapshot => {
            snapshot.forEach((listChild) => {
                // Search each list for if movie is contained
                let found = false;
                listChild.forEach((movieChild) => {
                    if(movieChild.val() != null){
                        if(movieChild.key === imdbID){
                            // Movie was found in list, so exit loop
                            found = true;
                            return;
                        }
                    }
                })
                // Movie wasn't found in list, so add list to unnlinkedMoveiLists
                if(!found){
                    unlinkedMovieLists.push(listChild.key);
                    currentList[0] = unlinkedMovieLists[0];
                }
            })
            
        },
            this.setState({
                currentList: currentList,
                unlinkedMovieLists: unlinkedMovieLists,
            })
        );
    
    }

    hideLightbox(event){
        var lBox = document.getElementById("lightbox");
        if(event != null)
            if(event.target.id !== "lightbox")
                return;
        // Reenable scroll and remove lightbox
        document.body.style.overflowY = "scroll"
        lBox.style.display = "none";

        // Reset form to put dropdown back to first option
        document.getElementById("unlinkedMovieListForm").reset();
    }

    displayLightBox(movieInfo){
        //Find the lists that don't contain the movie
        this.findUnlinkedMovieLists(movieInfo.imdbID);

        this.setState({
            currentMovie: movieInfo,
        })
        
        // Retrieve elements
        var lBox = document.getElementById("lightbox");
        var divTitle = document.getElementById("LBPosterTitle");
        var divDirector = document.getElementById("LBPosterDirector");
        var divRating = document.getElementById("LBPosterRating");
        var divPlot = document.getElementById("LBPosterPlot");
        var overlayImg = document.getElementById("overlay_img");

        // Disable Scrolling
        document.body.style.overflow = "hidden"
        
        // Display lightbox
        lBox.style.display = "flex";
        
        // Change Image
        overlayImg.src = movieInfo.Poster;
        overlayImg.alt = movieInfo.Title;
        
        // Fill out movies info
        divTitle.textContent = movieInfo.Title;
        divDirector.textContent = "Directed by " + movieInfo.Director;
        divRating.textContent = "IMDB Rating: " + movieInfo.imdbRating + "/10";
        divPlot.textContent = movieInfo.Plot;

        // Set rating's color based on rating
        if (parseFloat(movieInfo.imdbRating) >= 7.0)
            divRating.style.color = "green";
        else
            divRating.style.color = "red";
    }

    render(){        
        return (
        <div>
            <div className="posterGrid">
                {Object.entries(this.props.movies).map(([key, movie]) => (
                    <div className="poster"><img className="posterImg" src={movie.Poster} alt={movie.Title} onClick={() => this.displayLightBox(movie)}/></div>
                ))
                }
            </div>
            <div className="lightbox" id="lightbox" onClick={this.hideLightbox}>
                <div className="LBDisplay" id="LBDisplay">
                    <img className="LBImage" id="overlay_img" alt="overlay"/>
                    <div className="LBInfo" id="LBInfo">
                        <div id="PosterInfo">
                            <div id="LBPosterTitle"/>
                            <div id="LBPosterDirector"/>
                            <div id="LBPosterRating"/>
                            <div id="LBPosterPlot"/>
                        </div>
                        <div id="DatabaseInfo">
                            <div id="DBIList">
                                <form id="unlinkedMovieListForm">
                                <select name="currentList" onChange={this.handleChange}>
                                    {this.state.unlinkedMovieLists.map((x) => (
                                        <option name="display" value={x}>{x}</option>
                                    ))}
                                </select>
                                </form>
                            </div>
                            <div id="DBIAddToList">
                                <input type="submit" value="Add to List" onClick={this.addMovieToList}/>
                            </div>
                            <div id="DBIDeleteMovie">
                                <input type="submit" value="Delete" onClick={this.deleteMovie}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    };
}
export default MoviesList;
