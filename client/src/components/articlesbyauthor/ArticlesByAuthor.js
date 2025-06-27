import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
//import { axiosWithToken } from '../../../axioswithtoken';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function ArticlesByAuthor() {

  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();
  let {currentUser} = useSelector(
    (state)=> state.userAuthorLoginReducer
  );

  const getArticleOfCurrentAuthor = async()=>{
    const token = localStorage.getItem('token')
  const axiosWithToken = axios.create({
    headers: {Authorization: `Bearer ${token}`}
  })
    let res = await axiosWithToken.get(`${BACKEND_URL}/author-api/article/${currentUser.username}`)
    console.log("response",res)
    setArticlesList(res.data.payload)
  }

  useEffect(() => {
    getArticleOfCurrentAuthor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const readArticleByArticleId= (articleObj)=>{
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
  }


  return (
    <div>
      <div className='row row-col-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5'>
        {articlesList.map((article)=>(
          <div className='col' key={article.articleId}>
            <div className='card h-100'>
              <div className='card-body'>
                <h5 className='card-title'>{article.title}</h5>
                <p className='card-text'>
                  {article.content.substring(0, 80) + "..."}
                </p>
                <button className='custom-btn btn-4 ' onClick={()=>readArticleByArticleId(article)}>
                  <span>Read More</span>
                </button>
              </div>
              <div className='card-footer'>
                <small className='text-body-secondary'>
                  Last updated on {article.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet/>
    </div>
  )
}

export default ArticlesByAuthor