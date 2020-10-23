import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Form extends Component {
    state= {
        description: '',
        image_url: ''
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        //dispatch here!
        event.preventDefault()
        this.props.dispatch({type:"ADD_ITEM", payload: this.state})
        this.setState({
        description: '',
        image_url: ''
    });
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} action="">
                Description: <input onChange={this.handleChange} type="text" name="description" />
                <br />
                Image Url: <input onChange={this.handleChange} type="text" name='image_url' />
                <br />
                <button type='submit'>Submit</button>
                </form>
                
            </div>
        )
    }
}
// req.body.description, req.body.image_url, req.user.id

export default connect()(Form)
