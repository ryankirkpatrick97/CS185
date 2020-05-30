import React, {Component} from 'react'
import MovieList from "./MoviesList.js"
import {movieConfig} from "../config.js"
const axios = require('axios')
const firebase = require('firebase')


export class Movies extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            ids: ["tt0061418",
             "tt0033467", "tt0068646", "tt0137523",
                "tt0114814", "tt0169547", "tt0144084", "tt0206634", "tt1130884", "tt0092005", "tt0338013",
                "tt0264464", "tt0075314", "tt0066921", "tt0432283", "tt0034583", "tt0099348", "tt0095016"],
            movies: [],
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(movieConfig)
        }


    }

    componentDidMount() {
        let ref = firebase.database().ref("Watched")
        ref.on('value', snapshot => {
            this.setState({
                movies: snapshot.val(),
            }) 
        })


    }

    // let newState = [];
    // for (let item in items) {
    //   newState.push({
    //     id: item,
    //     name: items[item].name,
    //     description: items[item].description,
    //     message: items[item].message,
    //     display: (items[item].display === "Yes") ? true : false,
    //     email: items[item].email,
    //     time: items[item].time,

    //   });
    // }

    // this.setState({
    //   response: newState
    // });





    // Add movies to database
    // this.state.ids.map(id => {
    //     axios.get('https://www.omdbapi.com/?apikey=d0b4efe6&i=' + id)
    //         .then((value) => {
    //             firebase.database().ref('Watched/'+ value.data.imdbID).set(value.data)
    //         })
    // })



    render(){        
        return (
            // <div></div>
            <MovieList movies={this.state.movies}/>
        )
    };
}
export default Movies;
