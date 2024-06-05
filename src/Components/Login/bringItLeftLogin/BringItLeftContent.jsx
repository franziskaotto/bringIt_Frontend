
import { Outlet, Link } from "react-router-dom";

import "./BringItLeftContent.css";

const BringItLeftContent = () => {
  return (
    <div className="container-left-content">
      <h1 className="bringIt-headline">bring it</h1>
      <h2 className="bringIt-h2">step up your neighbourhood</h2>
      <Link to={'/ReadMore'}>
        <button className="read-more-btn" type="button">Read More</button>
      </Link>
      
    </div>
  );
};

export default BringItLeftContent;
