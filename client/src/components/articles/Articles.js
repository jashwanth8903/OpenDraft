import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
// import { axiosWithToken } from '../../../axioswithtoken';
import './Articles.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();
  //let {currentUser,loginUserStatus} = useSelector();
  const getArticleOfAllAuthor = async () => {
    const token = localStorage.getItem('token')
    const axiosWithToken = axios.create({
      headers: {Authorization: `Bearer ${token}`}
    })
    let res = await axiosWithToken.get(`${BACKEND_URL}/user-api/articles`);
    console.log("response", res);
    // Defensive: ensure payload is always an array
    setArticlesList(Array.isArray(res.data.payload) ? res.data.payload : []);
  };

  

  useEffect(()=>{
    getArticleOfAllAuthor();
  },[])

  const readArticleByArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  };

  return (
    <div className="articles-container">
      <h3 className="articles-heading">Articles</h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {Array.isArray(articlesList) && articlesList.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + "..."}
                </p>
                <button className="custom-btn btn-4" onClick={() => readArticleByArticleId(article)}>
                  <span>Read More</span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on {article.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default Articles;
