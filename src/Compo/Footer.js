import React from 'react'
import { MdLanguage } from 'react-icons/md'

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer_Upperdiv'>
                <div className='div_one'>
                    <p>Udemy Business</p>
                    <p>Teach on Udemy</p>
                    <p>Get the app</p>
                    <p>About us</p>
                    <p>Contact us</p>
                </div>
                <div className='div_two'>
                    <p>Careers</p>
                    <p>Blog</p>
                    <p>Help and Support</p>
                    <p>Affiliate</p>
                    <p>Popular courses</p>
                </div>
                <div className='div_three'>
                    <p>Terms</p>
                    <p>Privacy policy</p>
                    <p>cookie settings</p>
                    <p>Sitemap</p>
                    <p>Accessibility statement</p>
                </div>
            </div>
            <div className='footerbutton'>
                <MdLanguage size={"1.2em"} color='white' />
                <span className='langbut'>English</span>
            </div>
            <div className='footerlogo'>
                <div className='udemylogo_div'>
                    <img src='https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg' alt='not found' />
                </div>
                <div className='copyrights'>
                    <p>© 2023 Udemy, Inc.</p>
                </div>
            </div>

        </footer>
    )
}

export default Footer