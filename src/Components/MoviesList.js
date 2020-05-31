import React, {Component} from 'react'

export class MoviesList extends Component{
    constructor(props){
        super(props);
        this.displayLightBox = this.displayLightBox.bind(this);
        this.hideLightbox = this.hideLightbox.bind(this);
    }

    hideLightbox(event){
        var lBox = document.getElementById("lightbox");
        if(event.target.id !== "lightbox")
            return;
        // Reenable scroll and remove lightbox
        document.body.style.overflowY = "scroll"
        lBox.style.display = "none";
    }

    displayLightBox(movieInfo){
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
                        <div id="LBPosterTitle"/>
                        <div id="LBPosterDirector"/>
                        <div id="LBPosterRating"/>
                        <div id="LBPosterPlot"/>
                    </div>
                </div>
            </div>
        </div>
        )
    };
}
export default MoviesList;
