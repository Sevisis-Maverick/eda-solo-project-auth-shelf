import React, { Component } from 'react';
import { connect } from 'react-redux';

class Item extends Component {
    state = {
        edit: false,
        editDescription: '',
        editImageURL: '',
    };

    deleteItem = (event, id) => {
        console.log('trying to delete item:', id);
        this.props.dispatch({
            type: 'DELETE_ITEM',
            payload: id,
        });
    }
    editItem = (event, id) => {
        console.log('trying to edit item:', id);
        this.props.dispatch({
            type: 'EDIT_ITEM',
            payload: {
                id: id,
                update: {
                    description: this.state.editDescription,
                    image_url: this.state.editImageURL
                }
            },
        });
        this.setState({
            edit: false
        })
    }

    setEdit = () => {
        this.setState({
            editDescription: this.props.item.description,
            editImageURL: this.props.item.image_url,
            edit: true
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render = () => {
        const item = this.props.item;
        console.log(this.state);
        return (<>
            <br/><br/>
            <img alt={item.id} src={item.image_url} />
            <p>{item.description}</p>
            <button onClick={(event) => this.deleteItem(event, item.id)}>Delete?</button>
            <button onClick={this.setEdit}>Edit?</button>
            <br/>
            {this.state.edit && <>
                <input name='editDescription' placeholder='Edit Description' value={this.state.editDescription} onChange={this.handleChange} /> <br />
                <input name='editImageURL' placeholder='Edit Image URL' value={this.state.editImageURL} onChange={this.handleChange} />
                <button onClick={(event) => this.editItem(event, item.id)}>Save</button>
            </>}
        </>
        );
    }
}

export default connect()(Item);