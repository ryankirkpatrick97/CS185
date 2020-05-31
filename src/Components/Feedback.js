import React, {Component} from 'react';
import FeedbackInput from './FeedbackInput';
import FeedbackResponse from './FeedbackResponse';
import { feedbackConfig } from '../config';
const firebase = require('firebase')

export class Feedback extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.name = "feedbackApp";
    }

    componentDidMount(){
        var newFirebase;
        try {
            newFirebase = firebase.app(this.name);
        } catch (error) {
            newFirebase = firebase.initializeApp(feedbackConfig, this.name)
        }
        this.setState({
            firebase: newFirebase,
        });
    }

    render(){        
        if(this.state.firebase != null){
            return(
            <div className="content">
                <div className="item">
                    <FeedbackInput firebase={this.state.firebase}/>
                </div>
                <div className="item">
                    <FeedbackResponse firebase={this.state.firebase}/>
                </div>
            </div>
            )
        } else {
            return (<div></div>)
        }
    };
}
export default Feedback;
