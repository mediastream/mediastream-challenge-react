import { Link } from "react-router-dom";
import "./assets/styles.css";
import OttNextLogo from "./components/OttNextLogo";

export default function Home() {
  return (
    <div className="home">
      <div className="home__content">
        <OttNextLogo className="home__logo" />
        <h1 className="home__title">
          OTT Next React Technical Test
        </h1>
      </div>
      <div className="home__navigation">
        <Link to="/01">
          Exercise 01
        </Link>
        <Link to="/02">
          Exercise 02
        </Link>
      </div>
    </div>
  )
}