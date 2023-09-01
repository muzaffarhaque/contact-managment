// import React from 'react'; 
import './App.scss'
import { Route } from './router/Route'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/Stor';
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  )
}

export default App
