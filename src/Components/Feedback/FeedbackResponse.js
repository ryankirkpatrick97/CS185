import React, {Component} from 'react'

export class FeedbackResponse extends Component{
    constructor(props) {
        super(props)
        this.state = {response: []}
    }


    componentDidMount(){
        let ref = this.props.firebase.database().ref("response")
        ref.on('value', snapshot => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
              newState.push({
                id: item,
                name: items[item].name,
                description: items[item].description,
                message: items[item].message,
                display: (items[item].display === "Yes") ? true : false,
                email: items[item].email,
                time: items[item].time,

              });
            }

            this.setState({
              response: newState
            });

          });
    };


    displayMessage(item){
        if(item.display){
            return (
                <div id="itemMessage">Feedback: {item.message}</div>
            )
        }
    }

    displayEmail(item){
        if(item.email.length > 0){
            return(
                <div id="itemEmail">Email: {item.email} </div>
            )
        }
    }

    displayDescription(item){
        if(item.description.length > 0){
            return(
                <div id="itemDescription">Description: {item.description} </div>
            )
        }
    }


    render(){        
        return (
            <div className="FirebaseScroll">
            <ul className="FeedbackList">
                {this.state.response.slice(0).reverse().map(item => (
                    <div className="FeedbackItemContainer">
                    <li className="FeedbackItem">
                        <div id="itemTime">{item.time}</div>
                        <div id="itemName">Name: {item.name}</div>
                        {this.displayEmail(item)}
                        {this.displayDescription(item)}
                        {this.displayMessage(item)}
                    </li>
                    </div>
                ))}
            </ul>
            </div>
        )
    };
}
export default FeedbackResponse;
