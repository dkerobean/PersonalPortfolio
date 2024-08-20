import Link from 'next/link';
import Layout from '../src/layouts/Layout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchBlogPosts = async (page = 1) => {
    try {
      const response = await axios.get(`${backendUrl}/user/api/blog/`);
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      {/* Section Started Heading */}
      <section className="section section-inner started-heading">
        <div className="container">
          <div className="m-titles align-center">
            <h1
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Blog </span>
            </h1>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Recent Articles </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section - Blog */}
      <div className="section section-inner m-archive">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div className="articles-container">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="archive-item scrolla-element-anim-1 scroll-animate"
                    data-animate="active"
                  >
                    <div className="image">
                      <Link legacyBehavior href={`/blog-single?id=${post.id}`}>
                        <a>
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="desc">
                      <div className="category lui-subtitle">
                        <span>{post.category.name}</span>
                      </div>
                      <h5 className="lui-title">
                        <Link legacyBehavior href={`/blog-single?id=${post.id}`}>
                          <a>{post.title}</a>
                        </Link>
                      </h5>
                      <div className="lui-text">
                        <div
                          className="post-excerpt"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.description.slice(0, 200) + (post.description.length > 200 ? '...' : ''))
                          }}
                        />
                        <div className="readmore">
                          <Link legacyBehavior href={`/blog-single?id=${post.id}`}>
                            <a className="lnk">Read more</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              {/* Sidebar */}
              <div
                className="col__sedebar scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="content-sidebar">
                  <aside className="widget-area">
                    {/* <div className="widget widget_block widget_search">
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        className="wp-block-search"
                      >
                        <div className="wp-block-search__inside-wrapper">
                          <input
                            type="search"
                            className="wp-block-search__input"
                            defaultValue=""
                          />
                          <button
                            type="submit"
                            className="wp-block-search__button wp-element-button"
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </div> */}
                    <section className="widget widget_block">
                      <div className="wp-block-group">
                        <div className="wp-block-group__inner-container">
                          <h2>Recent Posts</h2>
                          <ul className="wp-block-latest-posts__list">
                            {blogPosts.map((post) => (
                              <li key={post.id}>
                                <Link legacyBehavior href={`/blog-single?id=${post.id}`}>
                                  <a className="wp-block-latest-posts__post-title">
                                    {post.title}
                                  </a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                    <section className="widget widget_block">
                      <div className="is-layout-flow wp-block-group">
                        <div className="wp-block-group__inner-container">
                          <h2>Categories</h2>
                          <ul className="wp-block-categories-list">
                            {blogPosts.map((post) => (
                              <li key={post.category.id} className="cat-item">
                                <Link legacyBehavior href={`/blog-single?id=${post.id}`}>
                                  <a>{post.category.name}</a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
