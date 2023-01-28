import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import styles from '../signup/styles.module.css';


const Signup = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState();
     

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const url =  "http://localhost:8080/api/auth";
            const {data: res} = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/"
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                <form className={styles.signup_form_container} onSubmit={handleSubmit}>
                        <h1>LOG IN</h1>
                        <input 
                            type="email" 
                            placeholder='email'
                            name='laemailName'
                            onChange={handleChange}
                            value={data.email}
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
                <div className={styles.right}>
                    <h1>New  Here</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign-In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;