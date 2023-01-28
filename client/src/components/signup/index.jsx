import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import styles from '../signup/styles.module.css';


const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const url =  "http://localhost:8080/api/users";
            const {data: res} = await axios.post(url, data);
            navigate("/login")
            console.log(res.message);
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Sign-Up
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.signup_form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input 
                            type="text" 
                            placeholder='First Name'
                            name='firstName'
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input 
                            type="email" 
                            placeholder='Last Name'
                            name='lastName'
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />
                        <input 
                            type="password" 
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        
                        <button type="submit" className={styles.green_btn}>
                            SignUp
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;