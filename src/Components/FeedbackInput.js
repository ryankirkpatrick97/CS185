import React, {Component} from 'react'
import { SRLWrapper } from 'simple-react-lightbox'

export class FeedbackInput extends Component{
    render(){        
        return (
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    };
}
export default FeedbackInput;
