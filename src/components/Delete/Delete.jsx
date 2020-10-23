import React, { Component } from 'react'

export class Delete extends Component {

    deleteItem = (event, id) => {
        console.log('Attempting to delete an item on the shelf', id);
        this.props.dispatch({
          type: "DELETE_ITEM",
          url: `/api/shelf/id`
        });
        this.getItems();
    
    }  


    render() {
        return (
            <div>
                <button onClick={(event) => this.deleteItem(event, this.props.item.id)}>Delete</button>
            </div>
        )
    }
}

export default Delete;
