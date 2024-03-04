import { Link } from "react-router-dom";
const Home = () => {
  return (
    <main className="px-3">
      <h1>Cover your page.</h1>
      <p className="lead">
        Cover is a one-page template for building simple and beautiful home
        pages. Download, edit the text, and add your own fullscreen background
        photo to make it your own.
      </p>
      <p className="lead">
        <Link
          to="/auth"
          href="#"
          className="btn btn-lg btn-light fw-bold border-white bg-white"
        >
          Learn more
        </Link>
      </p>
    </main>
  );
};

export default Home;
