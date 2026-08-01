import { useEffect } from "react";
import "../styles/about.css";
const AboutScreen = () => {
  useEffect(() => {
    document.title = "TennisWorld|About";
  }, []);

  return (
    <>
      <h1>About TennisWorld</h1>
      <div className="center">
        <p>TennisWorld made with 🖤 to Tennis and Fullstack development </p>
        <p>Here you can find the best tennis products</p>
        <p>
          All the information and photos from{" "}
          <a
            href="https://www.tennis-warehouse.com"
            target="_blank"
            rel="noreferrer"
          >
            Tennis Warehouse
          </a>
        </p>
        <p>
          This site lives at{" "}
          <a
            href="https://tennisworld.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            tennisworld.vercel.app
          </a>
        </p>
        <p>
          Source code on{" "}
          <a
            href="https://github.com/omrialt/TennisWorld-MERN-e-commerce"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
        <p>Enjoy!</p>
      </div>
    </>
  );
};
export default AboutScreen;
