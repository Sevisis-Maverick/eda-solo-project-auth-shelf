import React, {Component} from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Form from './Form';
import Delete from '../Delete/Delete';
 // This is one of our simplest components


// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'


// If you needed to add local state or other things,
// you can make it a class component like:


class InfoPage extends Component {

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    console.log('Getting items');
    this.props.dispatch({
      type: 'FETCH_ITEMS'
    })
  };
  
  
  render() {
    console.log(this.props.reduxState);
    return (
      <div>
        <p>Info Page</p>
        <ul>
            {this.props.reduxState.items != undefined && this.props.reduxState.items.map((item) => {
              return (
              <>
              <img alt={item.id} src={item.url} />
              <p>{item.description}</p>
              <Delete item={item} /> 
              </>
            )
          })}
        </ul>
      <Form />
    </div>
    )
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState
});

export default connect(mapReduxStateToProps)(InfoPage);
