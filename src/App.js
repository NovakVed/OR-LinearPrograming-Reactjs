import React, {Component} from 'react';
import {generate} from 'shortid';
import {solver} from 'javascript-lp-solver';

import './css/App.css';
import Product from './components/Product';
import Table from './components/Table';
import Navbar from './components/inc/Navbar';
import Footer from './components/inc/Footer';

class App extends Component {
  constructor() {
    super()
    this.state = {
      objectiveX: "",
      objectiveY: "",
      objectiveLimitation: "",
      functionX: "",
      functionY: "",
      restriction: "",
      result: "",
      products: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.functionSolver = this.functionSolver.bind(this)
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({ 
      [name]: value 
    })
    console.log(this.state.objectiveX)
    console.log(this.state.objectiveY)
  }

  addProduct(event) {
    event.preventDefault()
    this.setState(prevState => ({
      products: [...prevState.products, 
        {
          id: generate(),
          functionX: this.state.functionX,
          functionY: this.state.functionY,
          restriction: this.state.restriction,
          result: this.state.result
        }]
    }))
    console.log(this.state.products)
  }

  removeProduct(event) {

  }

  /* Function solver */
  functionSolver(event) {
    event.preventDefault();
    var solver = require('javascript-lp-solver')

    const object = {
      "optimize": "capacity",
      "opType": "max",
      "constraints": {
      },
      "variables": {

      }
    }

    const rows = this.state.products.length + 1
    console.log(this.state.products)



    this.state.products.forEach(element => {
      const id = element.id
      const productName = 1
      object.constraints = {
        id: {"max":element.result},
      }
      element.
      productName++
    });

    /* Example of end product */
    var solver = require('javascript-lp-solver')
    const model = {
      "optimize": "capacity",
      "opType": "max",
      "constraints": {
          "wood": {"max": 54},
          "labor": {"max": 50},
      },
      "variables": {
          "1": {
              "wood": 6,
              "labor": 10,
              "capacity": 3,
          },
          "2": {
              "wood": 9,
              "labor": 5,
              "capacity": 2,
          }
      }
    }

    const result = solver.Solve(model);

    console.log(result)
  }

  handleSubmit(event) {
    
  }

  render() {
    return (
      <div className="App">
        {/* Navbar */}
        <Navbar />
        <div className="container">
          <h1 className="text-center">Linear Programming Calculator</h1>
          <br />
          <form onSubmit={this.handleSubmit}>

            {/* Maximize or Minimize */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="objectiveLimitation">Max/Min</label>
              </div>
              <select 
                value={this.state.objectiveLimitation}
                className="custom-select" 
                onChange={this.handleChange}
                name="objectiveLimitation" 
                id="objectiveLimitation"> 

                  <option value="">Odaberi...</option>
                  <option value="max">Max</option>
                  <option value="min">Min</option>

                {/* <option value="both">Max/Min</option> */}
              </select>
            </div>

            {/* Objective function */}
            <div className="for-group">
            <label htmlFor="objective">Funkcija cilja</label>
              <div className="row">
                <div className="col">
                  <input type="text" 
                    className="form-control" 
                    name="objectiveX" 
                    placeholder="Prva varijabla" 
                    onChange={this.handleChange}
                  />
                </div>
                <h4 id="functionHelp" className="form-text text-muted">X&emsp;</h4>
                <h3>+</h3>
                <div className="col">
                  <input type="text" 
                    className="form-control" 
                    name="objectiveY"  
                    placeholder="Druga varijabla" 
                    onChange={this.handleChange}
                  />
                </div>
                <h4 id="functionHelp" className="form-text text-muted">Y&emsp;</h4>
              </div>
              <small id="objectiveHelp" className="form-text text-muted">Primjer upisa: 12x + 40y</small>
            </div>
            <br />

            {/* Product */}
            <Product 
              addProduct={this.addProduct}
              handleChange={this.handleChange}
            />

            <Table 
              data={this.state}
            />

            <br></br>
            <br></br>
            <button className="btn btn-primary float-right" onClick={this.functionSolver}>Izračunaj</button>
          </form>
        </div>
        <br />
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

export default App;
