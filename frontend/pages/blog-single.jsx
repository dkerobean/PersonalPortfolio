import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../src/layouts/Layout';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/router';
import Link from 'next/link';

const BlogSingle = () => {
  const [blogPost, setBlogPost] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/blog/${id}/`);
        setBlogPost(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  return (
    <Layout>
      {/* Section Started Heading */}
      <section className="section section-inner started-heading">
        <div className="container">
          {/* Heading */}
          <div className="m-titles align-center">
            {blogPost && (
              <div
                className="m-category scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <Link legacyBehavior href="/blog">
                  <a>{blogPost.category.name}</a>
                </Link>
                ,{' '}
                {blogPost.date && (
                  <>
                    /{' '}
                    {new Date(blogPost.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </>
                )}
              </div>
            )}
            {blogPost && (
              <h1
                className="m-title scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                {blogPost.title}
              </h1>
            )}
          </div>
        </div>
      </section>
      {/* Single Post Image */}
      <div className="section section-inner m-image-large">
        <div className="container">
          <div className="v-line-right v-line-top">
            <div className="v-line-block">
              <span />
            </div>
          </div>
        </div>
        <div className="image">
          <div
            className="img scrolla-element-anim-1 scroll-animate"
            data-animate="active"
            style={{ backgroundImage: `url(${blogPost && blogPost.image})` }}
          />
        </div>
      </div>
      {/* Section - Blog */}
      <section className="section section-inner m-archive">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 offset-1">
              {/* content */}
              <div className="description">
                {blogPost && (
                  <div
                      className="post-content scrolla-element-anim-1 scroll-animate"
                      data-animate="active"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogPost.description) }}
                    />
                )}
              </div>
              {/* Comments */}
              <div
                className="comments-post scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              ></div>
            </div>
          </div>
          <div className="v-line-left v-line-top">
            <div className="v-line-block">
              <span />
            </div>
          </div>
        </div>
      </section>
      {/* Section Navigation */}
    </Layout>
  );
};
export default BlogSingle;
