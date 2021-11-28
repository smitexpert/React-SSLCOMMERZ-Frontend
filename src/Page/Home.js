import axios from 'axios';
import React from 'react'

export default function Home() {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        if(orders.length == 0)
        {
            axios.get('/orders', {
                headers: {
                    Accept: 'application/json'
                }
            }).then(response => {
                console.log(response);
                setOrders(response.data);
            }).catch(errors => {
                console.log(errors.response);
            })
        }
    }, [orders])

    const paymentHandler = (id) => {
        axios.post('/pay', {
            order_id: id
        }, {
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            console.log(response);
            if(response.status == 200 && response.data.status == 1)
            {
                window.location.replace(response.data.redirect);
            }
        }).catch(errors => {
            console.log(errors.response);
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Transection ID</th>
                                    <th>Customer</th>
                                    <th>Total Amount</th>
                                    <th>Payment Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item, index) => (

                                <tr key={index}>
                                    <td>{item.tran_id}</td>
                                    <td>{item.ship_name}</td>
                                    <td>{item.total_amount} TK.</td>
                                    <td>{item.status == 0 ? 'Unpaid' : 'Paid'}</td>
                                    <td>
                                        {item.status == 0 ? (
                                            <button onClick={() => paymentHandler(item.id)} type="button" style={{backgroundColor: 'blue', color: 'white'}}>Pay</button>
                                        ) : ''}
                                        
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
