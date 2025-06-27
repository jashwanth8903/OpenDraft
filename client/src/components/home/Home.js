import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const featuredArticles = [
        {
            title: "Understanding JavaScript",
            summary: "Closures are a powerful feature of JavaScript that allows for better modular code.",
            link: "/articles/js-closures"
        },
        {
            title: "Python for Data Science",
            summary: "Discover how Python is utilized in the field of data science, from data manipulation to machine learning.",
            link: "/articles/python-data-science"
        },
        {
            title: "Getting Started with React",
            summary: "React is a popular library for building user interfaces. This guide will help you get started with the basics.",
            link: "/articles/react-getting-started"
        }
    ];

    return (
        <div className="home-container pro-blog-bg">
            <section className="intro-section pro-intro-section">
                <div className="container pro-intro-content">
                    <h1 className="pro-title">Welcome to <span className="pro-accent">OpenDraft</span></h1>
                    <p className="pro-subtitle">Your go-to platform for insightful articles on a wide range of topics. Join our community and start exploring today!</p>
                    <Link to="/login" className="pro-btn pro-btn-primary">Learn More</Link>
                </div>
            </section>

            <section className="featured-articles-section pro-featured-section">
                <div className="container">
                    <h2 className="pro-section-title">Featured Articles</h2>
                    <div className="pro-articles-grid">
                        {featuredArticles.map((article, index) => (
                            <div className="pro-article-card" key={index}>
                                <div className="pro-card-content">
                                    <h5 className="pro-card-title">{article.title}</h5>
                                    <p className="pro-card-summary">{article.summary}</p>
                                    <Link to="/login" className="pro-btn pro-btn-outline">Read More</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section pro-cta-section">
                <div className="container pro-cta-content">
                    <h2 className="pro-section-title">Join Our Community</h2>
                    <p className="pro-cta-text">Become a part of our vibrant community. Share your knowledge and insights with others.</p>
                    <Link to="/register" className="pro-btn ">Sign Up Now</Link>
                </div>
            </section>
        </div>
    );
}

export default Home;