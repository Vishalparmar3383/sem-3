import './formcss.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ItemAdd() {
    const [data, setData] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.proname || !data.avatar || !data.price || !data.content) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Error adding item");
            }
            
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate("/admin/items");
            }, 1000);
        }
        catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div className="container mt-4">
                {showSuccess && (
                    <div className="alert alert-success" role="alert">
                        Item added successfuly.
                    </div>
                )}
                {showError && (
                    <div className="alert alert-danger" role="alert">
                        Please fill in all the required fields!
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={data.proname}
                            onChange={(e) => setData({ ...data, proname: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">Image URL:</label>
                        <input
                            type="text"
                            id="url"
                            className="form-control"
                            value={data.avatar}
                            onChange={(e) => setData({ ...data, avatar: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            className="form-control"
                            value={data.price}
                            onChange={(e) => setData({ ...data, price: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        <textarea
                            style={{ height: 120, overflowY: "auto" }}
                            id="content"
                            className="form-control"
                            value={data.content}
                            onChange={(e) => setData({ ...data, content: e.target.value })}
                        />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className="form-group text-center">
                        <button type="reset" onClick={() => setData({ proname: "", avatar: "", price: "", content: ""})}>
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ItemAdd;