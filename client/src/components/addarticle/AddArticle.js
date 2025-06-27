import '../addarticle/AddArticle.css';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function AddArticle() {
    let {register,handleSubmit, formState: { errors }} = useForm();
    let navigate = useNavigate();
    
    let token = localStorage.getItem('token')
    //console.log(token)
    let {currentUser} = useSelector(state=>state.userAuthorLoginReducer);
    console.log(currentUser);
    let axiosWithToken = axios.create({
        headers: {Authorization:`Bearer ${token}`}
    })

    const postNewArticle = async(article) => {
        article.dateOfCreation = new Date();
        article.dateOfModification = new Date();
        article.articleId = Date.now();
        article.username = currentUser.username;
        article.comments = [];
        article.status = true;
        console.log(article)
        //make http request
        let res = await axiosWithToken.post(`${BACKEND_URL}/author-api/article`,article)
        console.log(res)
        if(res.data.message === 'new article created'){
            navigate(`/author-profile/article-by-author/${currentUser.username}`)
        }
    }

    return (
        <div className="pro-add-article-bg">
            <form className='pro-article-form new-article-form mx-auto' onSubmit={handleSubmit(postNewArticle)}>
                <h2 className='pro-form-heading form-heading text-secondary'>📝 Write an Article</h2>
                <div className="pro-form-row form-row">
                    <div className="pro-form-group form-group">
                        <label htmlFor="inputTitle" className="pro-label">Title</label>
                        <input type="text" className="pro-input form-control" id="inputTitle" placeholder="Enter article title" {...register("title", { required: 'Title is required', minLength: { value: 5, message: 'Title must be at least 5 characters' } })} />
                        {errors.title && <p className="text-danger">{errors.title.message}</p>}
                    </div>
                </div>
                <div className="pro-form-row form-row">
                    <div className="pro-form-group form-group">
                        <label htmlFor="inputCatergory" className="pro-label">Select a Category</label>
                        <select id="inputCatergory" className="pro-input form-control" {...register("category", { required: 'Category is required' })} >
                            <option value="" disabled selected>Choose...</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                            <option value="c lang">C</option>
                            <option value="c++ lang">C++</option>
                            <option value="java script">JavaScript</option>
                        </select>
                        {errors.category && <p className="text-danger">{errors.category.message}</p>}
                    </div>
                </div>
                <div className="pro-form-row form-row">
                    <div className="pro-form-group form-group">
                        <label htmlFor="inputContent" className="pro-label">Content</label>
                        <textarea type='text' className="pro-input form-control" id="inputContent" placeholder="Write your article here..." {...register("content", { required: 'Content is required', minLength: { value: 20, message: 'Content must be at least 20 characters' } })} rows="10"/>
                        {errors.content && <p className="text-danger">{errors.content.message}</p>}
                    </div>
                </div>
                <button type="submit" className="pro-btn pro-btn-primary btn btn-primary d-block mx-auto">Post</button>
            </form>
        </div>
    )
}
