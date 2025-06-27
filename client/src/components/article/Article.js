import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsClockFill } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { MdOutlineComment } from "react-icons/md";
import { PiSubtitlesBold } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosWithToken } from '../../axioswithtoken';

import './Article.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Article() {
  let { currentUser } = useSelector(state => state.userAuthorLoginReducer);
  let { register, handleSubmit, reset, formState: { errors } } = useForm();
  let state = useLocation();
  let navigate = useNavigate();
  let [comment, setComment] = useState('');
  let [comments, setComments] = useState(state.state.comments || []);
  let [articleEditStatus, setArticleEditStatus] = useState(false);
  let [articleDeleteStatus, setArticleDeleteStatus] = useState(state.status);

  console.log('stateobj', state);
  console.log('stateobj articleId', state.state.articleId);

  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let month = new Date(iso).getUTCMonth() + 1;
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${month}/${year}`;
  }

  const writeComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    let res = await axiosWithToken.post(`${BACKEND_URL}/user-api/comment/${state.state.articleId}`, commentObj);
    if (res.data.message === 'comment posted') {
      setComment('Comment posted!');
      setComments(prev => [...prev, { username: commentObj.username, comment: commentObj.comment }]);
      reset();
    }
  };

  const enableEditStatus = () => {
    setArticleEditStatus(true);
  };

  const saveModifiedData = async (editedArticle) => {
    let modifiedArticle = { ...state.state, ...editedArticle };
    modifiedArticle.dateOfModification = new Date();
    delete modifiedArticle._id;
    console.log(modifiedArticle);
    console.log("id is ", modifiedArticle.articleId);
    let res = await axiosWithToken.put(`${BACKEND_URL}/author-api/article`, modifiedArticle);
    console.log(res);
    if (res.data.message === 'Article updated') {
      setArticleEditStatus(false);
      navigate(`/author-profile/article/${modifiedArticle.articleId}`, { state: res.data.article });
    }
  };

  const enableDeleteStatus = async () => {
    let res = await axiosWithToken.put(`${BACKEND_URL}/author-api/article/${state.state.articleId}`);
    console.log('deleted res', res);
    if (res.data.message === 'Article deleted') {
      setArticleDeleteStatus(true);
    }
  };

  const restoredArticle = async () => {
    let res = await axiosWithToken.put(`${BACKEND_URL}/author-api/restore-article/${state.state.articleId}`);
    console.log('restored res', res);
    if (res.data.message === 'Article restored') {
      setArticleDeleteStatus(false);
    }
  };

  return (
    <div className="article-container">
      {
        articleEditStatus === false ? (
          <>
            <div>
              <div className="article-header">
                <div>
                  <p className="article-title"><PiSubtitlesBold /> {state.state.title}</p>
                  <span className="article-meta">
                    <small className="text-secondary me-4">
                    <BsClockFill /> Created on: {ISOtoUTC(state.state.dateOfCreation)}
                    </small>
                    <small className="text-secondary me-4">
                    <IoCreate /> Modified on: {ISOtoUTC(state.state.dateOfModification)}
                    </small>
                    <small className="text-secondary">
                    <FaCircleUser /> Author: <b>{state.state.username}</b>
                    </small>
                  </span>
                </div>
                <div className="buttons">
                  {currentUser.usertype === 'author' && (
                    <>
                      <button onClick={enableEditStatus} className="btn btn-primary">Edit</button>
                      {
                        articleDeleteStatus === false ?
                          <button onClick={enableDeleteStatus} className="btn btn-danger">Delete</button> :
                          <button onClick={restoredArticle} className="btn btn-warning">Restore</button>
                      }
                    </>
                  )}
                </div>
              </div>
              <div className="article-content-container">
                <p className="article-content">
                  {state.state.content}
                </p>
              </div>
              <div className="comments-section">
                <h3 className="comments-title"><MdOutlineComment /> Comments</h3>
                <div className="comments my-4">
                  {comments.length === 0 ?
                    <p className="no-comments">No comments yet...</p>
                    :
                    <div className="comments-list">
                      {
                        comments.map((commentObj, ind) => {
                          return (
                            <div key={ind} className="comment-card">
                              <div className="comment-header">
                                <span className="comment-avatar"><FaCircleUser /></span>
                                <span className="comment-author"> {commentObj.username}</span>
                              </div>
                              <p className="comment-text">{commentObj.comment}</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  }
                </div>
                {comment && <div className="comment-success">{comment}</div>}
                {currentUser.usertype === 'user' && (
                  <form className="comment-form" onSubmit={handleSubmit(writeComment)}>
                    <input
                      type='text'
                      {...register('comment', { required: 'Comment cannot be empty', minLength: { value: 2, message: 'Comment must be at least 2 characters' } })}
                      className='form-control comment-input'
                      placeholder='Write your comment...'
                    />
                    <button className="btn btn-warning comment-btn" type='submit'>
                      Add Comment
                    </button>
                    {errors.comment && <p className="text-danger mt-2">{errors.comment.message}</p>}
                  </form>
                )}
              </div>
            </div>
          </>
        ) :
          <form className="pro-article-form new-article-form mx-auto" onSubmit={handleSubmit(saveModifiedData)}>
            <h2 className="pro-form-heading form-heading text-secondary">✏️ Edit Article</h2>
            <div className="pro-form-row form-group">
              <label htmlFor="inputTitle" className="pro-label">Title</label>
              <input type="text" className="pro-input form-control" id="inputTitle" defaultValue={state.state.title} {...register("title", { required: 'Title is required', minLength: { value: 5, message: 'Title must be at least 5 characters' } })} placeholder="Enter article title" />
              {errors.title && <p className="text-danger">{errors.title.message}</p>}
            </div>
            <div className="pro-form-row form-group">
              <label htmlFor="inputCategory" className="pro-label">Select a Category</label>
              <select id="inputCategory" className="pro-input form-control" defaultValue={state.state.category} {...register("category", { required: 'Category is required' })} >
                <option value="" disabled>Choose...</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="c lang">C</option>
                <option value="c++ lang">C++</option>
                <option value="java script">JavaScript</option>
              </select>
              {errors.category && <p className="text-danger">{errors.category.message}</p>}
            </div>
            <div className="pro-form-row form-group">
              <label htmlFor="inputContent" className="pro-label">Content</label>
              <textarea className="pro-input form-control" id="inputContent" rows="10" {...register("content", { required: 'Content is required', minLength: { value: 20, message: 'Content must be at least 20 characters' } })} defaultValue={state.state.content} placeholder="Write your article here..." />
              {errors.content && <p className="text-danger">{errors.content.message}</p>}
            </div>
            <button type="submit" className="pro-btn pro-btn-primary btn btn-warning d-block mx-auto">Save</button>
          </form>
      }
    </div>
  );
}

export default Article;
