const JobTitle = (props) => {
  console.log(props);
  return (
      <div className="row">
        <div className="col-xl-11 mx-auto">
          {" "}
          <h1 className="departmenttitle">{props.title}</h1>
          <div className="underline"></div>
        </div>
      </div>
  );
};

export default JobTitle;
