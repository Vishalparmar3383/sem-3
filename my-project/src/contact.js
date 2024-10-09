import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
    const [data, setData] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!data.name || !data.email || !data.message){
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        
        try{
            const res = await fetch("http://localhost:4000/contact",{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(!res.ok){
                throw new Error("Error Contacting with US.");
            }
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/');
            }, 1000);
        }
        catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5">
            {showSuccess && (
                    <div className="alert alert-success" role="alert">
                        Message send successfuly.
                    </div>
                )}
                {showError && (
                    <div className="alert alert-danger" role="alert">
                        Please fill in all the required fields!
                    </div>
                )}
            <h1 className="mb-4">Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Message:</label>
                    <textarea
                        id="message"
                        className="form-control"
                        value={data.message}
                        onChange={(e) => setData({ ...data, message: e.target.value })}
                    />
                </div>
                <div className="form-group text-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className="form-group text-center">
                    <button type="reset" className="btn btn-primary">Clear</button>
                </div>
            </form>
        </div>
    );
};

export default Contact;