import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
const PortfolioIsotope = ({ noViewMore }) => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
    fetchCategories();
    fetchProjects();
  }, []);

  useEffect(() => {
    isotope.current = new Isotope(".works-items", {
      itemSelector: ".works-col",
      //    layoutMode: "fitRows",
      percentPosition: true,
      masonry: {
        columnWidth: ".works-col",
      },
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });
    return () => isotope.current.destroy();
  });
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${backendUrl}/user/api/project-category/`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${backendUrl}/user/api/project/`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  const activeBtn = (value) => (value === filterKey ? "active" : "");
  return (
    <Fragment>
      <div className="works-box">
        <div
          className="filter-links scrolla-element-anim-1 scroll-animate"
          data-animate="active"
        >
          <a
            className={`c-pointer lui-subtitle ${activeBtn("*")}`}
            onClick={handleFilterKeyChange("*")}
            data-href=".works-col"
          >
            All
          </a>
          {categories.map((category) => (
            <a key={category.id} className={`c-pointer lui-subtitle ${activeBtn(category.name)}`} onClick={handleFilterKeyChange(category.name)} data-href={`.${category.name}`}>{category.name}</a>
          ))}

        </div>
        <div className="works-items works-masonry-items row">
          {projects.map((project) => (
          <div className={`works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 ${project.category.name}`}>
            <div
              className="works-item scrolla-element-anim-1 scroll-animate"
              data-animate="active"
            >
              <div className="image">
                <div className="img">
                   <Link legacyBehavior href={`/work-single?id=${project.id}`}>
                    <a>
                      <img
                        decoding="async"
                        src={project.image}
                        alt={project.name}
                      />
                      <span className="overlay" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="desc">
                <span className="category">{project.category.name} </span>
                <h5 className="name">
                  <Link legacyBehavior href={`/work-single?id=${project.id}`}>
                    <a>{project.title}</a>
                  </Link>
                </h5>
                <div className="text">
                  <p>
                    {project.description.length > 50
                          ? `${project.description.slice(0, 130)}...`
                          : project.description}
                  </p>
                </div>
                 <Link legacyBehavior href={`/work-single?id=${project.id}`}>
                  <a className="lnk">See project</a>
                </Link>
              </div>
              <div
                className="bg-img"
                style={{
                  backgroundImage: "url(assets/images/pat-2.png)",
                }}
              />
            </div>
          </div>
          ))}
        </div>
        {!noViewMore && (
          <div className="load-more-link">
            <Link legacyBehavior href="/works">
              <a
                className="btn scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span>View All</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default PortfolioIsotope;
