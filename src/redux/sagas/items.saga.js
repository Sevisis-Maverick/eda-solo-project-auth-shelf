import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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

function* itemsSaga() {
  yield takeLatest('FETCH_ITEMS', fetchItems);
  yield takeEvery('DELETE_ITEMS', deleteItem);
}

function* deleteItem(action) {
  console.log(('deleting item,', action.payload));
  let id = action.payload.id;
  yield axios.delete(`/api/shelf/${id}`, action.payload);
}

export default itemsSaga;