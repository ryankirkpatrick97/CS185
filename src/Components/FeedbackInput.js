import React, {Component} from 'react'
import {feedbackConfig} from '../config.js'
import moment from 'moment';

const firebase = require('firebase')

export class FeedbackInput extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            message: '',
            display: 'Yes',
            email: '',
            time: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 
    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
    
    handleSubmit(event) {
        if(this.state.name.length < 6  || this.state.name.length > 19){
            alert('Please insert a name that is more than 5 characters and less than 20')
        }
        else if(this.state.description.length > 99){
            alert('Please insert a description shorter than 100 characters')
        }
        else if(this.state.message.length < 16 || this.state.message.length > 499){
            alert('Please insert a message that is longer than 15 characters but shorter than 500')
        }
        else{
            this.setState(
                {time: moment().utcOffset('-07:00').format('YYYY-MM-DD hh:mm:ss a')},
                () => {
                    this.updateFirebase();
                    document.getElementById("userInput").reset();
                    alert('Database has been updated successfully.');
                }
            );
        }
        event.preventDefault();
    }

    updateFirebase(){
        if (!firebase.apps.length) {
            firebase.initializeApp(feedbackConfig)
        }
        firebase.database().ref('response').push().set(this.state)
    }


    render(){        
        return (
            <form id="userInput" onSubmit={this.handleSubmit}>
                <label>
                <div className="FeedbackLabel">Name:</div>
                <textarea type="text" name="name" onChange={this.handleChange} />
                </label>                

                <label>
                <div className="FeedbackLabel">Personal Description:</div>
                <textarea type="text" name="description" onChange={this.handleChange} />
                </label>                

                <label>
                <div className="FeedbackLabel">Email:</div>
                <textarea type="text" name="email" onChange={this.handleChange} />
                </label>

                <label>
                <div className="FeedbackLabel">Message:</div>
                <textarea type="text" name="message" onChange={this.handleChange} />
                </label>

                <label>
                <div className="FeedbackLabel">Would you like to display your message to everyone?</div>
                <select value={this.state.display} name="display" onChange={this.handleChange}>
                    <option name="display" value="Yes" onChange={this.handleChange}>Yes</option>
                    <option name="display" value="No" onChange={this.handleChange}>No</option>
                </select>
                </label>
                
                <div className="submitButton">
                <input type="submit" value="Submit" />
                </div>
                
            </form>
        )
    };
}
export default FeedbackInput;
