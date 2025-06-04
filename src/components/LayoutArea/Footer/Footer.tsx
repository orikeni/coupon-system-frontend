import type { JSX } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Footer.css';


function Footer(): JSX.Element {
    return(
    <div className='Footer'>
 <p>&copy; {new Date().getFullYear()} coupon system. All rights reserved.</p>

            <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-facebook"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-instagram"></i>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-github"></i>
                </a>
            </div>
        </div>
    );
}

export default Footer;