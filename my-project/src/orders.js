import { useState, useEffect } from "react";

function Orders() {
    const [orders, setOrders] = useState([]);
    const apiUrl2 = "http://localhost:4000/orders";

    useEffect(() => {
        fetch(apiUrl2)
            .then((res) => res.json())
            .then((res) => {
                setOrders(res);
            })
            .catch((error) => console.error("Error fetching orders:", error));
    }, []);

    let newarr = orders.map((order) => {
        return (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={order.id}>
                <div className="card h-100">
                    <img
                        src={order.avatar}
                        className="card-img-top"
                        alt={order.proname}
                        style={{ height: '150px', width: '100%', objectFit: 'contain' }}
                    />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{order.proname}</h5>
                        <p className="card-text">{order.price} Rs.</p>
                    </div>
                    <div className="card-body d-flex flex-column">{order.content}</div>
                </div>
            </div>
        );
    });

    return (
        <div className="container-fluid mt-4">
            <h1 className="mb-4">Orders : </h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="container-fluid mt-4">
                    <div className="row justify-content-center">
                        {newarr}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Orders;
