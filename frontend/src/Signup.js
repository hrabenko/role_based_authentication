import {Link, useNavigate} from 'react-router-dom';
import {useState} from "react";
import Validation from "./SignupValidation";
import axios from 'axios';
function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post("http://localhost:8801/signup", values)
                .then(res => {
                    navigate(`/login`);
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className='bg-white p-3 rounded w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder="Enter your name" id="name" name="name"
                               onChange={handleInput} className="form-control rounded-0" />
                    </div>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter your email" id="email" name="email"
                               onChange={handleInput} className="form-control rounded-0" />
                    </div>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter your password" id="pasword" name="password"
                               onChange={handleInput} className="form-control rounded-0" />
                    </div>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                    <button className="btn btn-success w-100 mb-2">Sign Up</button>
                    <Link to="/" className="btn btn-default border w-100 bg-light">Log In</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup;