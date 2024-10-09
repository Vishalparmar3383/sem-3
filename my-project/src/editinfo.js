import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditInfo() {
    const [item, setItem] = useState({});
    const [data, setData] = useState({ proname: "", avatar: "", price: "", content: "" });
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = `http://localhost:4000/items/` + id;

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                // if (!res.ok) {
                //     throw new Error('Network response was not ok');
                // }
                return res.json();
            })
            .then((res) => {
                setItem(res);
                setData({
                    proname: res.proname,
                    avatar: res.avatar,
                    price: res.price,
                    content: res.content,
                });
            })
            .catch((error) => console.error('Error fetching item:', error));
    }, [apiUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.proname || !data.avatar || !data.price || !data.content) {
            setShowError(true);
            return;
        }

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok: ' + res.statusText);
                }
                console.log(data);
                return res.json();
            })
            .then(() => {
                setData({data});
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    navigate('/admin/items');
                }, 1000);
            })
            .catch(err => {
                console.error('Error updating item:', err);
                alert('Failed to update item: ' + err.message);
            });
    };

    if (!item) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                    <span>Item not found.</span>
                </div>
            </div>
        );
    }
    return (
        <>
            <Link to="/admin/items" className="btn btn-info mx-2 sticky-top">Back</Link>
            {showSuccess && (
                <div className="alert alert-success" role="alert">
                    Item updated successfully.
                </div>
            )}
            {showError && (
                <div className="alert alert-danger" role="alert">
                    Please fill in all the required fields!
                </div>
            )}
            <div className="container mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={data.proname}
                            onChange={(e) => setData({ ...data, proname: e.target.value })} // Ensure this line is working
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">Image URL:</label>
                        <input
                            type="text"
                            id="url"
                            value={data.avatar}
                            onChange={(e) => setData({ ...data, avatar: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            value={data.price}
                            onChange={(e) => setData({ ...data, price: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        <textarea
                            style={{ height: 100, overflowY: "auto" }}
                            id="content"
                            value={data.content}
                            onChange={(e) => setData({ ...data, content: e.target.value })}
                        />
                    </div>

                    <div className="form-group text-center">
                        <button type="submit">Submit</button>
                    </div>
                    <div className="form-group text-center">
                        <button type="reset" onClick={() => setData({ proname: "", avatar: "", price: "", content: "" })}>
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditInfo;
