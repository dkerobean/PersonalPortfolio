import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from "../src/layouts/Layout";
import { useRouter } from 'next/router';
import axios from 'axios';
import YouTube from 'react-youtube'; // Import react-youtube

const WorkSingleISotope = dynamic(
  () => import("../src/components/WorkSingleISotope"),
  {
    ssr: false,
  }
);

const WorkSingle = () => {
  const [videoToggle, setVideoToggle] = useState(false);
  const [project, setProject] = useState(null);
  const [randomProjectName, setRandomProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/project/${id}/`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/api/project/`);
        const projects = response.data.filter(proj => proj.id !== project?.id); // Filter out current project
        const randomIndex = Math.floor(Math.random() * projects.length);
        const randomProject = projects[randomIndex];
        setRandomProjectName(randomProject.title);
        setProjectId(randomProject.id);
      } catch (error) {
        console.error('Error fetching all projects:', error);
      }
    };

    if (project) {
      fetchAllProjects();
    }
  }, [project]);

  if (!project) {
    return <p>Loading...</p>;
  }

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]*)/);
    return match && match[1];
  }
  return (
    <Layout pageClassName={"portfolio-template"}>
      {/* Section Started Heading */}
      <section className="section section-inner started-heading">
        {/* Heading */}
        <div className="container">
          <div className="m-titles align-left">
            <h1
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>{project.title}</span>
            </h1>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>{project.category.name}</span>
            </div>
          </div>
        </div>
        {/* Details */}
        <div className="v-line v-line-right v-line-top">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                <div className="m-details">
                  <div className="details-label">
                    <span>Year:</span>
                    <strong>
                      <span>{project.year}</span>
                    </strong>
                  </div>
                  <div className="details-label">
                    <span>Technology:</span>
                    <strong>
                      <span>{project.technology}</span>
                    </strong>
                  </div>
                  <div className="details-label">
                    <span>Categories:</span>
                    <strong>
                      <span>{project.category.name}</span>
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 align-right">
                <a
                  target="_blank"
                  href={project.url}
                  className="btn scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <span>Live Preview</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Image */}
      <div className="section section-inner">
        {/* Image */}
        <div className="m-image-large">
          <div className="image">
            <div
              className="img js-parallax"
              style={{
                backgroundImage: project && project.image ? `url(${project.image})` : 'none',
              }}
            />

          </div>
        </div>
      </div>
      {/* Section - Description */}
      <section className="section section-inner">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="post-content">
                <h4>Description</h4>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="post-content">
                <p>
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Gallery */}
      <div className="section section-inner">
        <div className="container">
          {/* Section Gallery */}
          {/* <WorkSingleISotope /> */}
        </div>
      </div>
      {/* Section - Description */}
      {/* <section className="section section-inner">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="post-content">
                <h4>Conclusion</h4>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="post-content">
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using ‘Content
                  here, content here’, making it look like readable English.
                </p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="post-content">
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using ‘Content
                  here, content here’, making it look like readable English.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Section - Video */}

      


      {/* Section - Navigation */}
      <div className="section section-inner m-page-navigation">
        <div className="container">
          <div className="h-titles h-navs">
            {/* Link to the next project with a different random project */}
            <Link legacyBehavior href={`/work-single?id=${projectId}`}>
              <a>
                <span
                  className="nav-arrow scrolla-element-anim-1 scroll-animate"
                  data-animate="active"
                >
                  <span>Next Project</span>
                </span>
                <span
                  className="h-title splitting-text-anim-2 scroll-animate"
                  data-splitting="chars"
                  data-animate="active"
                >
                  <span>{randomProjectName}</span>
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkSingle;
