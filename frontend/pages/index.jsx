import dynamic from "next/dynamic";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Resume from "../src/components/Resume";
import Layout from "../src/layouts/Layout";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  servicesSliderProps,
  testimonialsSliderProps,
} from "../src/sliderProps";
const PortfolioIsotope = dynamic(
  () => import("../src/components/PortfolioIsotope"),
  {
    ssr: false,
  }
);
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Index = () => {
  const [profile, setProfile] = useState([]);
  const [services, setServices] = useState([]);
  const [contact, setContact] = useState([]);
  const [blog, setBlog] = useState([]);
  const [testimonials, setTestimonial] = useState([]);
  const [projects, setProjects] = useState([]);
  const [project_category, setProjectCategory] = useState([]);
  const [skills, setSkills] = useState([]);
  const [cv, setCV] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // submit form data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/user/api/contact-me/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log("here is the form data", formData);

      if (response.ok) {
        // Success, show success message
        toast.success(`Hi ${formData.name}! Your message has been sent successfully. I'll get back to you soon! 🚀`);
        // Reset form data
        resetForm();
      } else {
        // Handle error response
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/profile/`);
        setProfile(response.data[0]);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/service/`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services data:', error);
      }
    };

    const fetchContact = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/contact/`);
        setContact(response.data[0] || {});
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/blog/`);
        setBlog(response.data || {});
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/testimonials/`);
        setTestimonial(response.data || []);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/project/`);
        setProjects(response.data || {});
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/project-category/`);
        setProjectCategory(response.data || {});
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/skills/`);
        setSkills(response.data || {});
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    const fetchCV = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/cv/`);
        setCV(response.data[0] || {});
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };


    fetchProfile();
    fetchServices();
    fetchContact();
    fetchBlog();
    fetchTestimonials();
    fetchCategories();
    fetchProjects();
    fetchSkills();
    fetchCV();
    console.log(profile);
  }, []);


  return (
    <Layout pageClassName={"home"}>
      {/* Section - Hero Started */}
      <section
        className="lui-section lui-section-hero lui-gradient-top"
        id="started-section"
      >
        <div className="container">
          <div className="lui-started v-line v-line-left">
            <div className="section hero-started">
              <div
                className="content scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="titles">
                  <div className="lui-subtitle">
                    <span>
                      {" "}
                      Hello, <b>my name is</b>
                    </span>
                  </div>
                  <h1
                    className="title splitting-text-anim-1 scroll-animate"
                    data-splitting="chars"
                    data-animate="active"
                  >
                    <span>
                      <b>{profile.first_name ? profile.first_name : "Name"}</b>Amenyo{" "}
                    </span>
                  </h1>
                  <div className="label lui-subtitle">
                    {" "}
                    I am <strong>{profile.title ? profile.title : "Title"}</strong>
                  </div>
                </div>
                <div className="description">
                  <div>
                    <p>
                      {profile.about_me ? profile.about_me : "About me description here"}
                    </p>
                  </div>
                  <div className="social-links">
                    <a target="_blank" rel="nofollow" href={contact.twitter ? contact.twitter : "#"}>
                      <i aria-hidden="true" className="fab fa-twitter" />
                    </a>
                    <a target="_blank" rel="nofollow" href={contact.linkedin ? contact.linkedin : "#"}>
                      <i aria-hidden="true" className="fab fa-linkedin" />
                    </a>
                    <a target="_blank" rel="nofollow" href={contact.github ? contact.github : "#"}>
                      <i aria-hidden="true" className="fab fa-github" />
                    </a>
                    <a target="_blank" rel="nofollow" href={contact.instagram ? contact.instagram : "#"}>
                      <i aria-hidden="true" className="fab fa-instagram" />
                    </a>
                  </div>
                </div>
                <div className="bts">
                  <a
                    target="_blank"
                    href={cv.url ? cv.url : "#"}
                    className="btn"
                  >
                    <span>Download CV</span>
                  </a>
                  <a href="#skills-section" className="btn-lnk">
                    {" "}
                    My Skills{" "}
                  </a>
                </div>
              </div>
              <div
                className="slide scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <img
                  decoding="async"
                  src={profile.image ? profile.image : "/path/to/default/image.jpg"}
                  alt={`${profile.first_name ? profile.first_name : "Name"} Amenyo`}
                />
                <span className="circle circle-1" />
                <span
                  className="circle img-1"
                  style={{
                    backgroundImage: "url(assets/images/pat-1.png)",
                  }}
                />
                <span
                  className="circle img-2"
                  style={{
                    backgroundImage: "url(assets/images/pat-2.png)",
                  }}
                />
                <span
                  className="circle img-3"
                  style={{
                    backgroundImage: "url(assets/images/pat-3.png)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Services */}
      <section
        className="lui-section lui-gradient-bottom"
        id="services-section"
      >
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> What I Do </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  my <b>Services</b>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Services */}
        <div className="v-line v-line-right">
      <div className="container">
        <Swiper
          {...servicesSliderProps}
          className="swiper-container js-services scrolla-element-anim-1 scroll-animate"
          data-animate="active"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="services-item">
                <div className="lui-subtitle">
                  <span> {service.category.name ? service.category.name : "category name"} </span>
                </div>
                <div className="icon" />
                <h5 className="lui-title">
                  <span> {service.title ? service.title : "service title"} </span>
                </h5>
                <div className="lui-text">
                  <div>
                    {service.description ? service.description : "description"}
                  </div>
                </div>
                {/* <a href={service.link} className="lnk">
                  {" "}
                  See Pricing{" "}
                </a> */}
                <div
                  className="image"
                  style={{
                    backgroundImage: "url(assets/images/pat-2.png)"
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination" />
        </Swiper>
        <div className="lui-bgtitle">
          <span> Services </span>
        </div>
      </div>
    </div>
      </section>
      {/* Section - Skills */}
      <section className="lui-section lui-gradient-center" id="skills-section">
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Professional Skills </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  my <b>Talent</b>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Skills */}
        <div className="v-line v-line-left">
          <div className="container">
            <div className="row">
            {skills.map((skill, index) => (
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <div className="skills-items">
                  <div
                    className="skills-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <h6 className="name">
                      <span> {skill.name ? skill.name : "name"} </span>
                    </h6>
                    <div className="text">
                      <div>
                        <p>
                          {skill.description}
                        </p>
                      </div>
                    </div>
                    <div className="dots">
                    </div>
                    <div className="value">
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
            <div className="lui-bgtitle">
              <span> Skills </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section - Works */}
      <section className="lui-section lui-gradient-top" id="works-section">
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Portfolio </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  my <b>Cases</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Works */}
        <div className="v-line v-line-right">
          <div className="container">
            <PortfolioIsotope />
            <div className="lui-bgtitle">
              <span> Portfolio </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section - Resume */}
      <Resume />
      {/* Section - Testimonials */}
      <section
        className="lui-section lui-gradient-center"
        id="testimonials-section"
      >
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Testimonials </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  what <b>Clients Say</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonials */}
        <div className="v-line v-line-right">
          <div className="container">

            <Swiper
              {...testimonialsSliderProps}
              className="swiper-container js-testimonials scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide className="swiper-slide">
                <div className="testimonials-item">
                  <div className="image">
                    <img
                      decoding="async"
                      src={testimonial.image ? testimonial.image : "#"}
                      alt="Paul Freeman"
                    />
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="44px"
                        height="34px"
                      >
                        <path
                          fillRule="evenodd"
                          strokeWidth="2px"
                          stroke="rgb(0, 0, 0)"
                          fill="rgb(41, 165, 135)"
                          d="M17.360,8.325 C15.490,5.563 11.616,4.762 8.705,6.536 C6.901,7.635 5.815,9.533 5.826,11.567 C5.828,14.854 8.637,17.516 12.101,17.515 C13.290,17.513 14.456,17.192 15.460,16.587 C14.967,17.975 14.049,19.457 12.537,20.942 C11.934,21.533 11.951,22.476 12.574,23.048 C13.198,23.619 14.192,23.604 14.794,23.012 C20.384,17.515 19.658,11.539 17.360,8.333 L17.360,8.325 ZM32.407,8.325 C30.538,5.563 26.663,4.762 23.752,6.536 C21.949,7.635 20.863,9.533 20.873,11.567 C20.875,14.854 23.685,17.516 27.148,17.515 C28.338,17.513 29.503,17.192 30.508,16.587 C30.015,17.975 29.097,19.457 27.585,20.942 C26.982,21.533 26.999,22.476 27.622,23.048 C28.245,23.619 29.239,23.604 29.842,23.012 C35.432,17.515 34.706,11.539 32.407,8.333 L32.407,8.325 Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text lui-text">
                    <div>
                      <p>
                        {testimonial.testimonial}
                      </p>
                    </div>
                  </div>
                  <div className="info">
                    <h6 className="name">
                      <span>{testimonial.name}</span>
                    </h6>
                    <div className="author">
                      <span>{testimonial.possition}</span>
                    </div>
                  </div>
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-2.png)",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
              <div className="swiper-pagination" />
            </Swiper>
            <div className="lui-bgtitle">
              <span> Reviews </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Pricing */}

      {/* Section - Blog */}
      <section className="lui-section lui-gradient-top" id="blog-section">
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Latest Blog </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  my <b>Articles and Advice</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Archive */}
        <div className="v-line v-line-right">
          <div className="container">
            <div className="blog-items row">
            {blog.map((blog, index) => (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div
                  className="archive-item scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div className="image">
                     <Link legacyBehavior href={`/blog-single?id=${blog.id}`}>
                      <a>
                        <img
                          decoding="async"
                          src={blog.image}
                          alt="Usability Secrets to Create Better Interfaces"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="category lui-subtitle">
                    <span>{blog.category.name}</span>

                    </div>
                    <h5 className="lui-title">
                       <Link legacyBehavior href={`/blog-single?id=${blog.id}`}>
                        <a>{blog.title}</a>
                      </Link>
                    </h5>
                    <div className="lui-text">
                      <p>
                        {blog.description.length > 50
                          ? `${blog.description.slice(0, 150)}...`
                          : blog.description}
                      </p>
                      <div className="readmore">
                         <Link legacyBehavior href={`/blog-single?id=${blog.id}`}>
                          <a className="lnk">Read more</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
            <div className="load-more">
              <Link legacyBehavior href="/blog">
                <a
                  className="btn scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <span>View Blog</span>
                </a>
              </Link>
            </div>
            <div className="lui-bgtitle">
              <span> Blog </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Contacts */}
      <section className="lui-section lui-gradient-bottom" id="contact-section">
        {/* Heading */}
        <div className="lui-heading">
          <div className="container">
            <div className="m-titles align-center">
              <h2
                className="m-title splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span> Contact Me </span>
              </h2>
              <div
                className="m-subtitle splitting-text-anim-1 scroll-animate"
                data-splitting="words"
                data-animate="active"
              >
                <span>
                  {" "}
                  Let’s <b>Talk About Ideas</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Contact */}
        <div className="lui-contacts v-line v-line-left">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                <div className="numbers-items">
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-map" />
                    </div>
                    <div className="title">
                      <span> Address </span>
                    </div>
                    <div className="lui-text">
                      <span> {contact.address} </span>
                    </div>
                  </div>
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-user" />
                    </div>
                    <div className="title">
                      <span> Freelance </span>
                    </div>
                    <div className="lui-text">
                      <span> {contact.availability} </span>
                    </div>
                  </div>
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-envelope" />
                    </div>
                    <div className="title">
                      <span> Email </span>
                    </div>
                    <div className="lui-text">
                      <span> {contact.email} </span>
                    </div>
                  </div>
                  <div
                    className="numbers-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="icon">
                      <i aria-hidden="true" className="far fa-address-book" />
                    </div>
                    <div className="title">
                      <span> Phone </span>
                    </div>
                    <div className="lui-text">
                      <span> {contact.phone} </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                <div
                  className="contacts-form scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <div
                    className="bg-img"
                    style={{
                      backgroundImage: "url(assets/images/pat-1.png)",
                    }}
                  />
                  <div className="contacts-form">
                    <form onSubmit={handleSubmit} id="cform">
                      <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                          <div className="group">
                            <label>
                              Your Full Name <b>*</b>
                              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            </label>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                          <div className="group">
                            <label>
                              Your Email Address <b>*</b>
                              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                            </label>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <div className="group">
                            <label>
                              Your Subject <b>*</b>
                              <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} />
                            </label>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <div className="group">
                            <label>
                              Your Message <b>*</b>
                              <textarea name="message" value={formData.message} onChange={handleInputChange} />
                            </label>
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-right">
                          <div className="terms-label">
                            * Accept the terms and conditions.
                          </div>
                          <button type="submit" className="btn">
                          <span>Send Message</span>
                          </button>
                        </div>
                      </div>
                    </form>
                    <ToastContainer />
                    <div className="alert-success" style={{ display: "none" }}>
                      <p>Thanks, your message is sent successfully.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lui-bgtitle">
              <span> Contact Me </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Index;
