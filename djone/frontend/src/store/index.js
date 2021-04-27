import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const enhancer = composeWithDevTools(
    applyMiddleware(thunk)
);

// create the store
const store = createStore(rootReducer, enhancer);

export default store;
