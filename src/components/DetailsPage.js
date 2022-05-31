import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../Const";
import address from "../images/address.png";
import location from "../images/location.png";

const DetailsPage = (props) => {
  console.log(props.match.params.id);
  const [jobDetail, setJObDetail] = useState("");
  const [otherJobs, setOtherJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/api/v1/jobs/${props.match.params.id}`)
      .then(function (response) {
        console.log("Details", response.data);
        setJObDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`${url}/api/v1/jobs`)
      .then(function (response) {
        console.log("Details", response.data);
        setOtherJobs(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.match.params.id]);

  let result = otherJobs.filter(
    (t) => t.department.title === jobDetail.department.title
  );
  console.log(result);

  return (
      <div className="row">
        <div className="col-xl-11 mx-auto ">
          <h5>Job Details</h5>
          <div className="row">
            {jobDetail && (
              <div className="col-xl-10 mx-auto ">
                <h3 className="mt-4 mb-4">
                  Development Department at {jobDetail.company}{" "}
                </h3>
                <h1 className="departmenttitle">{jobDetail.title}</h1>
                <div className="row mt-4">
                  <div className="col-xl-3 ">
                    <img
                      src={address}
                      style={{ height: "40px", width: "40px" }} alt="address"
                    />{" "}
                    <span className="info-text">
                      {jobDetail.department.title}
                    </span>
                  </div>
                  <div className="col-xl-2 ">
                    <img
                      src={location}
                      style={{ height: "30px", width: "25px" }} alt="location"
                    />{" "}
                    <span className="info-text">
                      {" "}
                      {jobDetail.location.city} {jobDetail.location.state}
                    </span>
                  </div>
                  <div className="col-xl-2 ">
                    <p className="mb-0 type-style text-center">
                      {jobDetail.type}
                    </p>
                  </div>
                </div>

                <div className="row mt-5 mb-5">
                  <div className="col-xl-3">
                    <a
                      href={jobDetail.applyUrl}
                      target="_blank"
                      className="info-text mt-4 mb-4 detail-apply-btn" rel="noreferrer"
                    >
                      Apply
                    </a>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-8  ">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobDetail.description,
                      }}
                    ></div>
                  </div>
                  <div className="col-xl-3 mx-auto ">
                    <h3>OTHER JOB OPENINGS</h3>
                    <div className="underline"></div>
                    {result &&
                      result.map((item) => (
                        <div className="row mt-5">
                          <div className="col-xl-12 ">
                            <h4>{item.title}</h4>
                          </div>
                          <div className="col-xl-6 ">
                            <img
                              src={address}
                              style={{ height: "20px", width: "20px" }} alt="address"
                            />{" "}
                            {item.department.title}
                          </div>
                          <div className="col-xl-6 ">
                            <img
                              src={location}
                              style={{ height: "20px", width: "15px" }} alt="location"
                            />{" "}
                            {item.location.city}
                            {item.location.state}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default DetailsPage;
