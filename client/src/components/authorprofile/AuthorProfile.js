import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AuthorProfile.css'; // Importing the CSS file

function AuthorProfile() {
    return (
        <div className="author-profile-container">
            <div className="link-container">
                <Link className="profile-link" to="article-by-author/:author">Articles</Link>
                <Link className="profile-link" to="new-article">Add New Article</Link>
            </div>
            <Outlet />
        </div>
    );
}

export default AuthorProfile;
