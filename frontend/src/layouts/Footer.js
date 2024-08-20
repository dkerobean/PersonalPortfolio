import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/api/contact/`);
        if (response.data.length > 0) {
          setContactInfo(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="footer">
      <div className="footer__builder">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div
                className="social-links scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <a target="_blank" rel="nofollow" href={contactInfo.twitter}>
                  <i aria-hidden="true" className="fab fa-twitter" />
                </a>
                <a target="_blank" rel="nofollow" href={contactInfo.linkedin}>
                  <i aria-hidden="true" className="fab fa-linkedin" />
                </a>
                <a target="_blank" rel="nofollow" href={contactInfo.github}>
                  <i aria-hidden="true" className="fab fa-github" />
                </a>
                <a target="_blank" rel="nofollow" href={contactInfo.instagram}>
                  <i aria-hidden="true" className="fab fa-instagram" />
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <div
                className="copyright-text align-center scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                © {currentYear} <strong>Deeks</strong>. All rights reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
