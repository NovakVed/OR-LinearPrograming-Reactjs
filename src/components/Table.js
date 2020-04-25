import React from 'react';

function Table(props) {
    const items = props.data.products.map((item, key) => 
    <tr key={item.id}>
        <th scope="row">{key + 1}</th>
        <td>{item.functionX}x + {item.functionY}y {item.restriction} {item.result}</td>
        {/* <td><button className="btn btn-danger">x</button></td> */}
        
    </tr>
    )

    if (items.length === 0) {
        return (
            <div>
                <p><strong>Funkcija cilja</strong> = {props.data.objectiveX}x + {props.data.objectiveY}y -> {props.data.objectiveLimitation} </p>
                <h3 className="text-center">Prazno</h3>
            </div>
        )
    } else {
        return (
            <div>
                <p><strong>Funkcija cilja</strong> = {props.data.objective}x -> {props.data.objectiveLimitation}y </p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Pravac</th>
                            <th scope="col">Formula</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
                <p>x, y ≥ 0 --> uvjet nenegativnosti</p>
            </div>
        )
    }
    
}

export default Table;