import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../Const";
import JobTitle from "./JobTitle";
import DescriptionCard from "./DescriptionCard";

const ListPage = () => {
  const [jobList, setJobList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [functionList, setFunctionList] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [selectedDepartment, setDepartment] = useState(null);
  const [selectedLocation, setLocation] = useState(null);
  const [selectedFunction, setFunction] = useState(null);

  useEffect(() => {
    axios
      .get(`${url}/api/v1/locations`)
      .then(function (response) {
        setLocationList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`${url}/api/v1/departments`)
      .then(function (response) {
        setDepartmentList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`${url}/api/v1/functions`)
      .then(function (response) {
        setFunctionList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
	fetchJobs();
  }, [selectedDepartment, selectedFunction, selectedLocation, searchInput]);

  const fetchJobs = () => {
	axios
	.get(`${url}/api/v1/jobs`, {
		params: {
			q: searchInput,
			loc: selectedLocation,
			dept: selectedDepartment,
			fun: selectedFunction,
		}
	})
	.then(function (response) {
	  console.log("Job list data", response.data);
	  setJobList(response.data);
	})
	.catch(function (error) {
	  console.log(error);
	});
  }

  const departmentFn = (e) => {
	setDepartment(e.target.value);
  };

  const loactionFn = (e) => {
	setLocation(e.target.value);
  };

  const functionFn = (e) => {
	setFunction(e.target.value);
  };

  const jobGroup = jobList.reduce((field, curr) => {
    if (!field[curr.department.title]) field[curr.department.title] = [];
    field[curr.department.title].push(curr);
    return field;
  }, {});

  console.log("Job List", jobGroup);

  return (
    <div>
      <div className="row mt-3">
        <div className="col-xl-9 p-4 nav-style mx-auto sb">
          <div className="row">
            <div className="col-xl-10 mx-auto ">
              <input
                placeholder="Search for Job"
                className="search-style"
                onChange={(e) => setSearchInput(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-xl-10 mx-auto">

              <div className="row">
                <div className="col-xl-4 mx-auto ">
                  <select className="search-style" onChange={departmentFn}>
                    <option value={null}>Department</option>
                    {departmentList &&
                      departmentList.map((item) => (
                        <option value={item.id}>{item.title}</option>
                      ))}
                  </select>
                </div>

                <div className="col-xl-4 mx-auto ">
                  <select className="search-style" onChange={loactionFn}>
                    <option value={null}>Location</option>
                    {locationList &&
                      locationList.map((item) => (
                        <option value={item.id}>{item.title}</option>
                      ))}
                  </select>
                </div>

                <div className="col-xl-4 mx-auto ">
                  <select className="search-style" onChange={functionFn}>
                    <option value={null}>Function</option>
                    {functionList &&
                      functionList.map((item) => (
                        <option value={item.id}>{item.title}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {Object.keys(jobGroup).map((job) => {
          return (
            <div className="col-xl-10 mx-auto  mt-5">
              <JobTitle title={job} />
              {jobGroup[job].map((item) => {
                return <DescriptionCard data={item} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListPage;
