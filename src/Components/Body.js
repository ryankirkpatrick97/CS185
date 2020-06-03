import React, { Component} from 'react';
import Home from './Home.js'
import Images from './Images.js'
import Movies from './Movies/Movies.js'
import Videos from './Videos.js'
import Projects from './Projects.js'
import Feedback from './Feedback/Feedback.js'

export class Body extends Component {
    displayContent = () => {
        var activeTab = this.props.activeTab
        if(activeTab === 1)
            return <Home/>
        else if(activeTab === 2){
            return <Images/>
        }
        else if(activeTab === 3){
            return <Movies/>
        }
        else if(activeTab === 4){
            return <Videos/>
        }
        else if(activeTab === 5){
            return <Projects/>
        }  
        else if(activeTab === 6){
            return <Feedback/>
        }  
    }

    render() {
        return (
            this.displayContent(this.props.activeTab)
        )
    }
}
export default Body;