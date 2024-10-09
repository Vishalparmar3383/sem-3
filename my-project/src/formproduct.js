import "./formcss.css";
import { useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";

function Formproduct() {
    const [data,setData] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.name || !data.number || !data.address || !data.email) {
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/items/:id/form", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Error in adding order.");
            }
            const result = await response.json();
            console.log("Order added:", result);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const { id } = useParams();
    return (
        <>
            <div>
                <Link to={`/items/${id}`} className="btn btn-primary m-1 sticky-top top-10">
                            Bcak
                </Link>
            </div>
            <div className="container mt-4">
                {showSuccess && (
                    <div className="alert alert-success" role="alert">
                        Oderded successfult.
                    </div>
                )}
                {showError && (
                    <div className="alert alert-danger" role="alert">
                        Please fill in all the required fields!
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name :</label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Address :</label>
                        <textarea
                            id="address"
                            value={data.address}
                            onChange={(e) => setData({ ...data, address: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Mobile No. :</label>
                        <input
                            type="number"
                            id="number"
                            value={data.number}
                            onChange={(e) => setData({ ...data, number: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Email :</label>
                        <input
                            type="text"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className="form-group text-center">
                        <button type="reset"onClick={() => setData({ name: "", number: "", address: "", email: ""})}>clear</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Formproduct;
