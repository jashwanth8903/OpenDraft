import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // Importing the CSS file

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    let [err, setErr] = useState('');

    const onSubmit = async (userData) => {
        console.log(userData)
        //make http post req
        if(userData.usertype==='user'){
        let res = await axios.post('http://localhost:4000/user-api/user',userData)
        console.log(res)
        if(res.data.message === 'user created'){
            //navigate to login
            navigate('/login')
        }else{
            setErr(res.data.message)
            console.log(res.data.message)
        }
    }else{
        
            let res = await axios.post('http://localhost:4000/author-api/author',userData)
            console.log(res)
            if(res.data.message === 'user created'){
                //navigate to login
                navigate('/login')
            }else{
                setErr(res.data.message)
                console.log(res.data.message)
            }
    }
    };

    console.log(err)

    return (
        <div className='register-container'>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <p className="form-title">Register</p>
                <p className="message">Sign up now and get full access to our app.</p>

                {/* display error message */}
                {
                    err.length!==0 && <p className='text-danger mx-auto'>{err}</p>
                }

                <div className="usertype">
                    <div className="input-container-radio">
                    <input
                        type="radio"
                        name="usertype"
                        value="user"
                        id="user"
                        {...register('usertype', { required: 'Please select a user type' })}
                    />
                    <label htmlFor='user' className="label"> User</label>
                    </div>
                    <div className="input-container-radio">
                    <input
                        type="radio"
                        name="usertype"
                        value="author"
                        id="author"
                        {...register('usertype', { required: 'Please select a user type' })}
                    />
                        <label htmlFor='author' className="label"> Author</label>
                    </div>
                </div>
                {errors.usertype && <p className="text-danger">{errors.usertype.message}</p>}
                <div className="input-container">
                    <input type="text" className="input" placeholder="Username" {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'Username must be at least 3 characters' } })} />
                </div>
                {errors.username && <p className="text-danger">{errors.username.message}</p>}
                <div className="input-container">
                    <input type="email" className="input" placeholder="Email" required {...register('email', { required: 'Email is required', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Invalid email address' } })} />
                </div>
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                <div className="input-container">
                    <input type="password" className="input" placeholder="Password" required {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} />
                </div>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
                <button type="submit" className="submit">Submit</button>
                <p className="signin">Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default Register;
