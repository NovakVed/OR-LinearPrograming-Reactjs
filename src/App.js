import React, {Component} from 'react';
import {generate} from 'shortid';
import {solver} from 'javascript-lp-solver';
import {math} from 'mathjs';

import './css/App.css';
import Product from './components/Product';
import Table from './components/Table';
import Chart from './components/Chart';
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
      feasible: "",
      allAroundResult: 0,
      dotX: 0,
      dotY: 0,
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
  }

  addProduct(event) {
    event.preventDefault()
    document.getElementById("functionX").value = ""
    document.getElementById("functionY").value = ""
    document.getElementById("restriction").value = ""
    document.getElementById("result").value = ""

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
  }

  removeProduct(event) {

  }

  /* Function solver */
  /* All programming logic */
  functionSolver(event) {
    event.preventDefault();
    var solver = require('javascript-lp-solver')



    /* ------------------------------- */
    /* ------------------------------- */
    /* ---------IF IT'S MIN----------- */
    /* ------------------------------ */
    /* ------------------------------ */




    if (this.state.objectiveLimitation === "max") {
      const object = {
        "optimize": "cost",
        "opType": "max",
        "constraints": {
        },
        "variables": {
          "x": {},
          "y": {}
        }
      }
  
      /* Matrix */
      /* Requires library math.js */
      var math = require('mathjs')
      var matrix = new Array()
      var transposeMatrix = math.matrix()
  
      this.state.products.forEach(element => {
        matrix.push([element.functionX, element.functionY, element.result])
      });
      transposeMatrix = math.transpose(matrix)
  
      /* Constraints */
      const arrayCapacity = new Array();
      var productName = 1
      this.state.products.forEach(element => {
        var restriction = ""
        if (element.restriction === "=") {
          restriction = "equal"
        } else if (element.restriction === "≤") {
          restriction = "max"
        } else {
          restriction = "min"
        }
        object.constraints[productName] = {
          [restriction]: element.result
        }
  
        productName++
      });
  
      /* Variables */
      object.variables.x["cost"] = this.state.objectiveX
      object.variables.y["cost"] = this.state.objectiveY
      for (let index = 0; index < transposeMatrix.length - 1; index++) {
        var productName = 1
        if (index === 0) {
          transposeMatrix[index].forEach(element => {
            object.variables.x[productName] = element
            productName++
          });
        } 
        if (index === 1) {
          transposeMatrix[index].forEach(element => {
            object.variables.y[productName] = element
            productName++
          });
        }
      }
  
      const result = solver.Solve(object);

      var feasible = "";
      if (result.feasible){
        feasible = "da"
      } else {
        feasible = "ne"
      }
      this.setState({
        feasible: feasible,
        allAroundResult: result.result,
        dotX: result.x,
        dotY: result.y
      })

      console.log(result)
    } else {



      /* ------------------------------- */
      /* ------------------------------- */
      /* ---------IF IT'S MIN----------- */
      /* ------------------------------ */
      /* ------------------------------ */



      
      const object = {
        "optimize": "cost",
        "opType": "min",
        "constraints": {
        },
        "variables": {
          "x": {},
          "y": {}
        }
      }
  
      /* Matrix */
      /* Requires library math.js */
      var math = require('mathjs')
      var matrix = new Array()
      var transposeMatrix = math.matrix()
  
      this.state.products.forEach(element => {
        matrix.push([element.functionX, element.functionY, element.result])
      });
      transposeMatrix = math.transpose(matrix)  
      /* Constraints */
      const arrayCapacity = new Array();
      var productName = 1
      this.state.products.forEach(element => {
        var restriction = ""
        if (element.restriction === "=") {
          restriction = "equal"
        } else if (element.restriction === "≤") {
          restriction = "max"
        } else {
          restriction = "min"
        }
        object.constraints[productName] = {
          [restriction]: element.result
        }
  
        productName++
      });
  
      /* Variables */
      object.variables.x["cost"] = this.state.objectiveX
      object.variables.y["cost"] = this.state.objectiveY
      for (let index = 0; index < transposeMatrix.length - 1; index++) {
        var productName = 1
        if (index === 0) {
          transposeMatrix[index].forEach(element => {
            object.variables.x[productName] = element
            productName++
          });
        } 
        if (index === 1) {
          transposeMatrix[index].forEach(element => {
            object.variables.y[productName] = element
            productName++
          });
        }
      }
  
      const result = solver.Solve(object);

      var feasible = "";
      if (result.feasible){
        feasible = "da"
      } else {
        feasible = "ne"
      }
      this.setState({
        feasible: feasible,
        allAroundResult: result.result,
        dotX: result.x,
        dotY: result.y
      })
      console.log(result)
    }
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
          <br></br>
          <br></br>
          <Chart
              data={this.state}
            />
          <br></br>
          <br></br>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Rješenje</h5>
              <h6 className="card-subtitle mb-2 text-muted">Pokrenite aplikaciju kako bi vidjeli rješenje</h6>
              <p className="card-text">Funkcija cilja: {this.state.allAroundResult}</p>
              <p className="card-text">M({this.state.dotX}, {this.state.dotY})</p>
              <p className="card-text">Izvediva (da/ne) = {this.state.feasible}</p>
            </div>
          </div>
          
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
