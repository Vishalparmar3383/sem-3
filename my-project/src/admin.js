import { useNavigate } from 'react-router-dom';
import './formcss.css';
import { useState } from 'react';
import { useAuth } from './AuthContext';

const username = "Vishal Parmar";
const password = "12345678";

function Admin() {
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (inputUsername !== username || inputPassword !== password) {
            setShowError(true);
        } else {
            setShowError(false); 
            console.log('Login successful');
            login();
            navigate('/admin/items');
        }
    };

    return (
        <div className="container mt-4">
            {showError && (
                <div className="alert alert-danger" role="alert">
                    Invalid username or password!
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">User Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={inputUsername}
                        onChange={(e) => setInputUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
                <div className="form-group">
                    <button type="reset" onClick={() => {
                        setInputUsername('');
                        setInputPassword('');
                        setShowError(false);
                    }}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Admin;
