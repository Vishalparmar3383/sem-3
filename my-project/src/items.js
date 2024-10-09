import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Items() {
    const [item, setItem] = useState([]);
    const apiUrl = "http://localhost:4000";

    useEffect(() => {
        fetch(apiUrl)
            .then((res) =>{ 
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((res) => {
                setItem(res);
            });
    }, []);

    let newarr = item.map((obj) => {
        return (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={obj.id}>
                <div className="card h-100">
                    <img
                        src={obj.avatar}
                        className="card-img-top"
                        alt={obj.proname}
                        style={{ height: '150px', width: '100%', objectFit: 'contain' }} // Adjusted to 'contain'
                    />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{obj.proname}</h5>
                        <p className="card-text">{obj.price} Rs.</p>
                        <Link
                            to={`/items/${obj.id}`}
                            className="btn btn-primary mt-auto"
                        >
                            More info
                        </Link>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="container-fluid mt-4">
            <div className="row justify-content-center">
                {newarr}
            </div>
        </div>
    );
}

export default Items;
