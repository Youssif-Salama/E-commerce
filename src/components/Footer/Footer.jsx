import React from 'react';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="container">
                <div className='d-flex align-items-center justify-content-between row'>
                    <div className="aboutSite d-flex align-items-center justify-content-around col-md-5">
                        <div className="logo h1"><a href="/home">E-COMMERCE</a></div>
                        <div className='footerLinks d-flex align-items-center justify-content-between'>
                            <li><a href="/home">home</a></li>
                            <li><a href="/about">about</a></li>
                            <li><a href="/contact">contact</a></li>
                        </div>
                    </div>
                    <div className="aboutDeveloper col-md-3 text-center">
                        <div className="name">Youssif Salama</div>
                        <span>finished 2/11/2023</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Footer;
