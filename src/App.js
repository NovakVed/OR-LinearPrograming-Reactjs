import React from 'react';
import './css/App.css';
import Product from './components/Product';
import Navbar from './components/inc/Navbar';
import Footer from './components/inc/Footer';

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />
        <div className="container">
          <h1 className="text-center">Forma</h1>
          <br/>
          <form>

            {/* Maximize or Minimize */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Max/Min</label>
              </div>
              <select className="custom-select" id="inputGroupSelect01">
                <option value="0">Odaberi...</option>
                <option value="1">Max</option>
                <option value="2">Min</option>
                <option value="3">Max/Min</option>
              </select>
            </div>

            {/* Objective function */}
            <div className="for-group">
              <label htmlFor="objectiveFunction">Funkcija cilja</label>
              <input type="objective" className="form-control" id="objectiveFunction" aria-describedby="objective" placeholder="Upišite svoju funkciju cilja" />
              <small id="emailHelp" className="form-text text-muted">Primjer upisa 12x+40y</small>
            </div>

            <br/>

            {/* Product */}
            <Product />

            <br></br>
            <br></br>
            <button href="#" className="btn btn-primary">Dodaj proizvod</button>
            <button type="submit" className="btn btn-primary float-right">Submit</button>
          </form>
        </div>
      <Footer />
    </div>
  );
}

export default App;
