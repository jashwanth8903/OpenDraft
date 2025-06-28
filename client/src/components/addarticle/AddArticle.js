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
    let {currentUser} = useSelector(state=>state.userAuthorLoginReducer);
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
        //make http request
        let res = await axiosWithToken.post(`${BACKEND_URL}/author-api/article`,article)
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
                        <label htmlFor="inputCategory" className="pro-label">Select a Category</label>
                        <select id="inputCategory" className="pro-input form-control" {...register("category", { required: 'Category is required' })} defaultValue="">
                            <option value="" disabled>Choose...</option>
                            <option value="Technology">Technology</option>
                            <option value="Programming">Programming</option>
                            <option value="Science">Science</option>
                            <option value="Health">Health</option>
                            <option value="Business">Business</option>
                            <option value="Finance">Finance</option>
                            <option value="Education">Education</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Travel">Travel</option>
                            <option value="Food">Food</option>
                            <option value="Sports">Sports</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Art">Art</option>
                            <option value="Politics">Politics</option>
                            <option value="Environment">Environment</option>
                            <option value="DIY">DIY</option>
                            <option value="Parenting">Parenting</option>
                            <option value="News">News</option>
                            <option value="Reviews">Reviews</option>
                            <option value="Opinion">Opinion</option>
                            <option value="History">History</option>
                            <option value="Personal">Personal</option>
                            <option value="Other">Other</option>
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
