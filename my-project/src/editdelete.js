import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditDelete() {
    const [item, setItem] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const apiUrl = "http://localhost:4000/items/" + id;

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((res) => {
                setItem(res);
            });
    }, [apiUrl]);

    if (!item) {
        console.log("not found");
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                    <span>Item not found.</span>
                </div>
            </div>
        );
    }
    else {
        return (
            <>
                <Link to="/admin/items" className="btn btn-info mx-2 sticky-top">Back</Link>
                {showSuccess && (
                    <div className="alert alert-success" role="alert">
                        Item deleted successfuly.
                    </div>
                )}
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
                <div className="text-center m-2">
                    <button className="btn btn-primary m-1" onClick={() => {
                        const apiUrl = "http://localhost:4000/admin/items/" + id;

                        fetch(apiUrl, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                            },
                        })
                            .then(res => {
                                if (!res.ok) {
                                    throw new Error('Network response was not ok: ' + res.statusText);
                                }
                                return res.json();
                            })
                            .then(() => {
                                setShowSuccess(true);
                                setTimeout(() => {
                                    setShowSuccess(false);
                                    navigate('/admin/items');
                                }, 1000);
                            })
                            .catch(err => {
                                console.error('Error:', err);
                                alert('Failed to delete item: ' + err.message);
                            });
                    }}>Delete</button>
                    
                    <Link to={`/admin/items/${item.id}/edit`} className="btn btn-primary m-1">
                        Edit
                    </Link>
                </div>
            </>
        );
    }
}

export default EditDelete;