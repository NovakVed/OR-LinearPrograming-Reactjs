import React from 'react';

function Product(props) {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Dodaj proizvod</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Ispod upišite sve potrebne podatke</h6>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <input type="text" name="functionX" onChange={props.handleChange} className="form-control" id="functionX" />
                            <small id="functionHelp" className="form-text text-muted">Primjer upisa: 12</small>
                        </div>
                        <h4 id="functionHelp" className="form-text text-muted">X&emsp;</h4>
                        <h4 id="functionHelp" className="form-text">+&emsp;</h4>
                        <div className="form-group col-md-2">
                            <input type="text" name="functionY" onChange={props.handleChange} className="form-control" id="functionY" />
                            <small id="functionHelp" className="form-text text-muted">Primjer upisa: -8</small>
                        </div>
                        <h4 id="functionHelp" className="form-text text-muted">Y&emsp;</h4>
                        <div className="form-group col-md-2">
                            <select id="restriction" name="restriction" onChange={props.handleChange} className="form-control">
                                <option value="">Odaberi</option>
                                <option value="=">=</option>
                                <option value="≤">≤</option>
                                <option value="≥">≥</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="text" name="result" onChange={props.handleChange} className="form-control" id="result" />
                            <small id="resultHelp" className="form-text text-muted">Primjer upisa: 36</small>
                        </div>
                    </div>

                    <button id="addProductButton" className="btn btn-primary" onClick={props.addProduct}>Dodaj proizvod</button>
                </div>
            </div>
            <br></br>
        </div>
    )
}

export default Product;