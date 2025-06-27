import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AuthorProfile from '../authorprofile/AuthorProfile';
import Error from '../error/Error';
import Home from '../home/Home';
import Login from '../login/Login';
import Main from '../main/Main';
import Register from '../register/Register';
import UserProfile from '../userprofile/UserProfile';
import Article from '../article/Article';
import Articles from '../articles/Articles';
import AddArticle from '../addarticle/AddArticle';
import ArticlesByAuthor from '../articlesbyauthor/ArticlesByAuthor';
import './Router.css'


function Router() {
    let router = createBrowserRouter([
        {
            path: '',
            element: <Main />,
            errorElement: <Error />,
            children: [
                {
                    path: '',
                    element: <Home />
                },
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <Register />
                },
                {
                    path: '/user-profile',
                    element: <UserProfile/>,
                    children: [
                        {
                            path: 'articles',
                            element: <Articles/>
                        },
                        {
                            path: 'article/:articleId',
                            element: <Article/>
                        },
                        {
                            path: '',
                            element: <Navigate to='articles'/>
                        },
                    ]
                },
                {
                    path: '/author-profile',
                    element: <AuthorProfile/>,
                    children: [
                        {
                            path: 'new-article',
                            element: <AddArticle/>
                        },
                        {
                            path: 'article-by-author/:author',
                            element: <ArticlesByAuthor/>
                        },
                        {
                            path: 'article/:articleId',
                            element: <Article/>
                        },
                        {
                            path: '',
                            element: <Navigate to='article-by-author/:author'/>
                        },
                    ]
                },
                
            ]
        }
    ])

    return (
        <div className="App" >

            <RouterProvider router={router} />

        </div>
    );
}

export default Router