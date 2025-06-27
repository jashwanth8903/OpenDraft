import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer-container'>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-4 foot">
                        <h5>About OpenDraft</h5>
                        <p>
                            OpenDraft is your go-to platform for insightful articles on a wide range of topics.
                            Join our community and start exploring today!
                        </p>
                    </div>
                    <div className="col-md-4 foot ">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-secondary">Home</a></li>
                            <li><a href="#" className="text-secondary">About</a></li>
                            <li><a href="#" className="text-secondary">Contact</a></li>
                            <li><a href="#" className="text-secondary">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 foot">
                        <h5>Contact Us</h5>
                        <p>OpenDraft Team</p>
                        <p>Email: jashuslv03@gmail.com</p>
                        <p>Phone: +91 9999999999</p>
                        <p>Created by K.Jashwanth</p>
                        <div className="social-icons">
                            <a href="https://www.facebook.com" className="text-light"><FaFacebook /></a>
                            <a href="https://www.twitter.com" className="text-light"><FaTwitter /></a>
                            <a href="https://www.linkedin.com/in/k-jashwanth-a18b4a24b/" className="text-light"><FaLinkedin /></a>
                            <a href="https://www.instagram.com/__j.ashh.03/" className="text-light"><FaInstagram /></a>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} OpenDraft. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
