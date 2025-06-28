import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userAuthorLoginThunk } from '../../redux/slices/userAuthorSlice';
import './Login.css'; // Importing the CSS file

function Login() {
    
    // let navigate = useNavigate();
    let { register, handleSubmit, formState: { errors } } = useForm();
    let {errorOccurred,loginUserStatus,currentUser}=useSelector(state=>state.userAuthorLoginReducer);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    
    let handleLoginBtn = (usercredentialobj) => {
        dispatch(userAuthorLoginThunk(usercredentialobj))
    }
    
    useEffect(() => {
        if (loginUserStatus === true) {
            if (currentUser.usertype === 'user') {
                navigate('/user-profile')
            }
            if (currentUser.usertype === 'author') {
                navigate('/author-profile')
            }
        }
    }, [loginUserStatus, currentUser.usertype, navigate])

    return (
        <div className='login-container'>

            <form className="form" onSubmit={handleSubmit(handleLoginBtn)}>
                <p className="form-title">Sign in to your account</p>
                {
                    errorOccurred===true &&
                    <p className='text-danger mx-auto'>
                        Login failed. Please check your credentials.
                    </p>
                }
                <div className="usertype">
                    <div className="input-container-radio">
                        <input
                            type="radio"
                            name="usertype"
                            value="user"
                            id="user"
                            className='input-radio'
                            {...register('usertype', { required: 'Please select a user type' })}
                        />
                        <label htmlFor='user' className="label" >User</label>
                    </div>
                    <div className="input-container-radio">
                        <input
                            type="radio"
                            name="usertype"
                            value="author"
                            id="author"
                            className='input-radio'
                            {...register('usertype', { required: 'Please select a user type' })}
                        />
                        <label htmlFor='author' className="label">Author</label>
                    </div>
                </div>
                {errors.usertype && <p className="text-danger">{errors.usertype.message}</p>}
                <div className="input-container">
                    <input className='input' type="text" placeholder="Enter Username" {...register('Username', { required: 'Username is required', minLength: { value: 3, message: 'Username must be at least 3 characters' } })} />
                </div>
                {errors.Username && <p className="text-danger">{errors.Username.message}</p>}
                <div className="input-container">
                    <input className='input' type="password" placeholder="Enter password" {...register('Password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} />
                </div>
                {errors.Password && <p className="text-danger">{errors.Password.message}</p>}
                <button type="submit" className="submit">
                    Sign in
                </button>
                <p className="signup-link">
                    No account?
                    <Link to='/register'>Sign up</Link>
                </p>
            </form>

        </div>
    )
}

export default Login;
