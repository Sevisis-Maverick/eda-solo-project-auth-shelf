import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';


function* fetchItems() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/shelf', config);

    yield put({ type: 'SET_ITEMS', payload: response.data });
  } catch (error) {
    console.log('Items get request failed', error);
  }
}

function* addItem(action) {
  try{
    const response = yield axios.post('/api/shelf', action.payload)
    yield put({type: 'FETCH_ITEMS'})
  }catch(err){ console.log('error adding item', err)}
}

function* itemsSaga() {
  yield takeLatest('FETCH_ITEMS', fetchItems);
  yield takeEvery('DELETE_ITEM', deleteItem);
  yield takeLatest('ADD_ITEM', addItem);
}

function* deleteItem(action) {
  console.log(('deleting item,', action.payload));
  let id = action.payload;
  yield axios.delete(`/api/shelf/${id}`, action.payload);
  yield put({type: 'FETCH_ITEMS'});

}

export default itemsSaga;