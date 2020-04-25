import React, {Component} from 'react';
import {generate} from 'shortid';
import {solver} from 'javascript-lp-solver';
import {math} from 'mathjs';

import './css/App.css';
import Product from './components/Product';
import Table from './components/Table';
/* import Chart from './components/Chart'; */
import Chart from './components/ChartTest';
import Navbar from './components/inc/Navbar';
import Footer from './components/inc/Footer';
import ChartTest from './components/ChartTest';

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
      products: [],
      chartData: {
        datasets:[]
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.functionSolver = this.functionSolver.bind(this)
    /* this.getChartData = this.getChartData.bind(this) */
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

    /* const temp: { id: number, name: string }[] */
    const temp = new Array({functionX: Number, functionY: Number, result: Number})
    if (this.state.products.length > 0) {
      for (let index = 0; index < this.state.products.length; index++) {
          temp.push(this.state.products[index])
      }
    }

    if (temp > 0) {
      this.addData("1. pravac", (this.getData(temp.functionX, temp.functionY, temp.result)))
    } else {
      var element = temp[temp.length - 1];
      var label = temp.length + ".pravac";
      this.addData(label, (this.getData(element.functionX, element.functionY, element.result)))
    }
  }

  removeProduct(event) {

  }

    /* ---------------------------------- */
    /* --------------------------------- */
    /* ---------Set chartData---------- */
    /* ------------------------------- */
    /* ------------------------------ */

    /*  */
  /* componentWillMount(){
    this.getChartData()
  } */

  /* Random number generator */
  random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";
  }

  getData(functionX, functionY, result) {
    var data = []
    var x = 0
    var y = 0
    var object1 = {x: 0, y: 0}
    var object2 = {x: 0, y: 0}

    x = result / functionY
    y = result / functionX

    /* For x = 0 */
    object1.x = 0
    object1.y = y

    data.push(object1)

    /* For y = 0 */
    object2.x = x
    object2.y = 0

    data.push(object2)
    return data
}

/* Add data to the existing chart */
addData(label, data) {
  this.state.chartData.datasets.push(
    {
      label: label,
      data: data,
      borderColor: [this.random_bg_color()],
      borderWidth: 1,
      pointBackgroundColor: ['#000', '#00bcd6', '#d300d6'],
      pointBorderColor: ['#000', '#00bcd6', '#d300d6'],
      fill: false,
      tension: 0,
      showLine: true
    })
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

      var label = "M(" + result.x + ", " + result.y + ")"
      var data = [{x: this.isUndefinedDotX(result.x), y: this.isUndefinedDotY(result.y)}]
      this.addData(label, data)

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

      var label = "M(" + result.x + ", " + result.y + ")"
      var data = [{x: this.isUndefinedDotX(result.x), y: this.isUndefinedDotY(result.y)}]
      this.addData(label, data)

      console.log(result)
    }
  }


  isUndefinedDotX(x) {
    if (x === 'undefined') {
      return 0
    } else {
      return x
    }
  }

  isUndefinedDotY(y) {
    if (y === 'undefined') {
      return 0
    } else {
      return y
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
          <h1 className="text-center">Grafička metoda rješavanja problema LP</h1>
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
          {/* <Chart
              data={this.state}
            /> */}
          <ChartTest chartData={this.state.chartData} />
          <br></br>
          <br></br>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Rješenje</h5>
              <h6 className="card-subtitle mb-2 text-muted">Pokrenite aplikaciju kako bi vidjeli rješenje</h6>
              <p className="card-text">Funkcija cilja: {this.state.allAroundResult}</p>
              <p className="card-text">M({this.state.dotX}, {this.state.dotY})</p>
              <p className="card-text">x = {this.state.dotX}</p>
              <p className="card-text">y = {this.state.dotY}</p>
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
