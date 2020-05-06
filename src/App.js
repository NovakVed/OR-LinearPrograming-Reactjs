import React, {Component} from 'react';
import {generate} from 'shortid';
import {solver} from 'javascript-lp-solver';
import {math} from 'mathjs';

import './css/App.css';
import Product from './components/Product';
import Table from './components/Table';
import Navbar from './components/inc/Navbar';
import Footer from './components/inc/Footer';
import Chart from './components/Chart';

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
      feasible: false,
      bounded: false,
      allAroundResult: "",
      dotX: "",
      dotY: "",
      products: [],
      jxgboard: [],
      boundingbox: [-1, 21, 21, -1]
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

    /* const temp: { functionX: number, functionY: number, result: number }[] */
    var temp = new Array({ functionX: Number, functionY: Number, result: Number })
    if (this.state.products.length > 0) {
      for (let index = 0; index < this.state.products.length; index++) {
        temp.push(this.state.products[index])
      }
    }

    this.getData(this.state.functionX, this.state.functionY, this.state.result)
  }

  removeProduct(event) {

  }

    /* ---------------------------------- */
    /* --------------------------------- */
    /* ---------Set chartData---------- */
    /* ------------------------------- */
    /* ------------------------------ */


  /* function to get value of x */
  getDataFunctionX(functionX, functionY, result, number) {
    var x = 0
    x = (result - (functionY*number))/functionX
    return x;
  }

  fillValueRestriction()  {
    if (this.state.restriction === "=") {
      return "false"
    } else if (this.state.restriction === "≤") {
      return "bottom"
    } else {
      return "top"
    }
  }

  /* function to get value of y */
  getDataFunctionY(functionX, functionY, result, number) {
    var y = 0
    y = (result - (functionX*number))/functionY
    return y;
  }

  /* functionX and functionY are swapped because of the wrong output when drawing graph */
  /* Gets line values in form of an object*/
  getData(functionY, functionX, result) {
    let x = 0
    let y = 0

    /* Ako x i y != 0 */
    if (functionX != 0 && functionY != 0) {
      /* Ako rezultat != 0 */
      if (result != 0) {
        /* For x = 0 */
        x = 0
        y = this.getDataFunctionX(functionX, functionY, result, 0)

        this.state.jxgboard.push([x, y])

        /* For y = 0 */
        x = this.getDataFunctionY(functionX, functionY, result, 0)
        y = 0

        this.state.jxgboard.push([x, y])
      } else {
        if (functionX < 0 && functionY > 0 ) {
          this.state.jxgboard.push([0, 0])
          this.state.jxgboard.push([1, 1])
        } else if ( functionX > 0 && functionY < 0 ){
          this.state.jxgboard.push([0, 0])
          this.state.jxgboard.push([1, 1])
        } else {
          this.state.jxgboard.push([0, 0])
          this.state.jxgboard.push([-1, 1])
        }
      }
    } else {
      if (this.state.functionX != 0) {
        /* Za y = 0 */
        x = result / this.state.functionX
        y = 0

        this.state.jxgboard.push([x, y])
        /* Za y = 1 */
        x = result / this.state.functionX
        y = 1

        this.state.jxgboard.push([x, y])
      } else if (this.state.functionY != 0){
        /* Za x = 0 */
        x = 0
        y = result / this.state.functionY

        this.state.jxgboard.push([x, y])
        /* Za x = 1 */
        x = 1
        y = result / this.state.functionY

        this.state.jxgboard.push([x, y])
      }
    }
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

      this.setState({
        feasible: result.feasible,
        bounded: result.bounded,
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

      this.setState({
        feasible: result.feasible,
        bounded: result.bounded,
        allAroundResult: result.result,
        dotX: result.x,
        dotY: result.y
      })

      console.log(result)
    }
  }


  isUndefinedDotX(x) {
    if (typeof x == "undefined") {
      return 0
    } else if(x == "") {
      return 0
    } else if(this.state.allAroundResult == "-0") {
      return 0
    } else {
      return x
    }
  }

  isUndefinedDotY(y) {
    if (typeof y == "undefined") {
      return 0
    } else if(y == "") {
      return 0
    } else if(this.state.allAroundResult == "-0") {
      return 0
    } else {
      return y      
    }
  }

  outputResult() {
    if (this.state.allAroundResult == "Infinity") {
      return "Beskonačno"
    } else if (this.state.allAroundResult == "-0") {
      return "Ne postoji moguče rješenje za ovaj problem"
    } else if (this.state.allAroundResult == "0") {
      return "Ne postoji moguče rješenje za ovaj problem"
    } else if (this.state.allAroundResult < 0) {
      return "Beskonačno"
    } else {
      return this.state.allAroundResult
    }
  }

  feasibleResult() {
    if (this.state.feasible) {
      return "da"
    } else {
      return "ne"
    }
  }

  boundedResult() {
    if (this.state.bounded) {
      return "ograničen"
    } else {
      return "nije ograničen"
    }
  }

  explanation() {
    if (this.state.feasible === true && this.state.bounded === true) {
      if (this.state.allAroundResult < 0) {
        return "Postoji multiplicitet optimalnih rješenja (beskonačno mnogo rješenja)"
      }
      return "Zajednički prostor rješenja je ograničeno, te rješenje je optimalno"
    } else if (this.state.allAroundResult == "-0") {
      return "Ne postoji moguče rješenje za ovaj problem"
    } else if (this.state.feasible  === true && this.state.bounded === false) {
      return "Zajednički prostor rješenja nije ograničeno, ali je izvedivo"
    } else if (this.state.feasible  === false && this.state.bounded === true) {
      return "Zajednički prostor rješenja je ograničeno, ali rješenje nikad nije optimalno"
    } else if (typeof this.state.dotX  == "undefined" && typeof this.state.dotY == "undefined") {
      return "Rješenje postoji, ali nikad nije optimalno, (0, 0) nikad nije optimalno, jer tada tvornica posluje kao da nikada ne proizvodi, što nikada ne može biti optimalni odgovor"
    } else {
      return "Rješenje ne postoji!"
    }
  }



  render() {
    return (
      <div className="App">
        {/* Navbar */}
        <Navbar />
        <div className="container">
          <h1 className="text-center">Grafička metoda rješavanja problema LP</h1>
          <br />
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
                    autoComplete="off"
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
                    autoComplete="off"
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
            <button className="btn btn-danger">Reset</button>
            <button className="btn btn-primary float-right" onClick={this.functionSolver}>Izračunaj</button>
          </form>
          <br></br>
          <br></br>
          <br></br>
          <p className="card-subtitle mb-2 text-muted">U slučaju da ne možete vidjeti upisane pravce, koristite opciju zoomiranja na grafu dok ne možete vidjeti vaše pravce</p>
          <br></br>
          <Chart key={generate()} jxgboard={this.state.jxgboard} boundingbox={this.state.boundingbox}/>
          <br></br>
          <br></br>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Rješenje</h2>
              <h6 className="card-subtitle mb-2 text-muted">Pokrenite aplikaciju kako bi vidjeli rješenje</h6>
              <p className="card-text"><strong>Funkcija cilja:</strong> {this.outputResult()}</p>
              <p className="card-text">M({this.isUndefinedDotX(this.state.dotX)}, {this.isUndefinedDotY(this.state.dotY)})</p>
              <p className="card-text">x = {this.isUndefinedDotX(this.state.dotX)}</p>
              <p className="card-text">y = {this.isUndefinedDotY(this.state.dotY)}</p>
              <p className="card-text">Izvediva (da/ne) = {this.feasibleResult()}</p>
              <p className="card-text">Zajedničko područje rješenja (ograničeno/nije ograničeno) = {this.boundedResult()}</p>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Objašnjenje</h2>
              <p className="card-text">{this.explanation()}</p>
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
