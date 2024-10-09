import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ItemDetail() {
    const [item, setItem] = useState({});
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const apiurl = `http://localhost:4000/items/` + id;
            try {
                const response = await fetch(apiurl);
                if (!response.ok) {
                    setItem("Item not found.");
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };
        fetchData();
    }, [id]);

    if(!item){
        console.log("not found");
        return(
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                    <span>Item not found.</span>
                </div>
            </div>
        );
    }
    else{
        return (
            <>
                <Link to="/" className="btn btn-info mx-2 sticky-top">Back</Link>
                <div className="container">
                    <div className="card col-7 m-3">
                        <img
                            src={item.avatar}
                            className="card-img-top p-1"
                            alt={item.proname}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{item.proname}</h5>
                            <p className="card-text">{item.price} Rs.</p>
                        </div>
                    </div>
                    <div><h3>{item.content}</h3></div>
                </div>
                <div className="text-center m-1">
                    <Link to={`/items/${item.id}/form`} className="btn btn-primary">
                        BUY
                    </Link>
                </div>
            </>
        );
    }
}

export default ItemDetail;
