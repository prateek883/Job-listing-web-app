import React from "react";
import address from "../images/address.png";
import location from "../images/location.png";
import { Link } from "react-router-dom";

const DescriptionCard = (props) => {
  console.log(props);
  return (
      <div className="col-xl-11 mx-auto  mt-5">
        <h2 className="departmenttitle">{props.data.title}</h2>
        <div className="row mt-3">
          <div className="col-xl-3 ">
            <img src={address} style={{ height: "40px", width: "40px" }} alt="address" />
            <span className="info-text">{props.data.department.title}</span>
          </div>
          <div className="col-xl-2  text-center">
            <img src={location} style={{ height: "30px", width: "25px" }}alt="location"/>{" "}
            <span className="info-text"> {props.data.location.city}</span>
          </div>
          <div className="col-xl-2 ">
            {"  "}
            <p className="mb-0 type-style text-center">{props.data.type}</p>
          </div>
          <div className="col-xl-2">
            <a
              href={props.data.applyUrl}
              target="_blank"
              className="apply-btn info-text" rel="noreferrer"
            >
              Apply
            </a>
          </div>
          <div className="col-xl-2 ">
            <p className="info-text view-btn">
              <Link to={`/details-page/${props.data.id}`}>View</Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default DescriptionCard;
