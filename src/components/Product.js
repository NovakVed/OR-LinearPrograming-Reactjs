import React from 'react';

function Product() {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">1. Proizvod</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Ispod upišite sve potrebne podatke</h6>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="formula_1" />
                            <small id="formula_1" className="form-text text-muted">Primjer upisa x+3y</small>
                        </div>
                        <div className="form-group col-md-2">
                            <select id="restriction_1" className="form-control">
                                <option value="0">Odaberi</option>
                                <option value="1">=</option>
                                <option value="2">≤</option>
                                <option value="3">≥</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <input type="text" className="form-control" id="inputZip" />
                            <small id="emailHelp" className="form-text text-muted">Primjer upisa 36</small>
                        </div>
                    </div>

                    <button className="btn btn-danger">Izbriši</button>
                </div>
            </div>
            <br></br>
        </div>
    )
}

export default Product;