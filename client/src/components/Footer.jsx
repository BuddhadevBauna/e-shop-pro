import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <section className="footer">
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-col">
                        <h2 className="">Commerce Theme</h2>
                        <div className="media-container">
                            <form>
                                <div className="form-group">
                                    <input type="email" name="email" required="" placeholder="Enter Your Email*" />
                                </div>
                                <div className="input-group">
                                    <button className="btn" type="submit">Subscribe</button>
                                </div>
                            </form>
                        </div>
                        <p>Get monthly updates and free resource</p>
                    </div>

                    <div className="footer-col">
                        <h3>MOBIRISE</h3>
                        <div className="contact-information">
                            <ul>
                                <li>Phone: +1 (0) 000 0000 001</li>
                                <li>Email: yourmail@example.com</li>
                                <li>Address:1234 Street Name City, AA 99999</li>
                            </ul>
                        </div>
                        <div className="social-list">
                            <div className="soc-item">
                                <i className="soc-icon soc-icon-twitter"> <FaTwitter /> </i>
                            </div>
                            <div className="soc-item">
                                <i className="soc-icon soc-icon-facebook"> <FaFacebookF /> </i>

                            </div>
                            <div className="soc-item">
                                <i className="soc-icon soc-icon-youtube"> <FaYoutube /> </i>

                            </div>
                            <div className="soc-item">
                                <i className="soc-icon soc-icon-instagram"> <FaInstagram /> </i>
                            </div>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h3>RECENT NEWS</h3>
                        <div>
                            <ul className="list">
                                <li>About Us</li>
                                <li>Services</li>
                                <li>Get In Touch</li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h3>LINKS</h3>
                        <div>
                            <ul className="list">
                                <li>Website Builder</li>
                                <li>Download for Mac</li>
                                <li>Download for Windows</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Footer;