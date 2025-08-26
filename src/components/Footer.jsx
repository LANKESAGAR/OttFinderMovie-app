import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Movieflix. All Rights Reserved.</p>
                <p>Developed by SAGAR LANKE</p>
            </div>
        </footer>
    );
};

export default Footer;