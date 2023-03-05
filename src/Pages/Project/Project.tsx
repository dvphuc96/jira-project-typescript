import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

type Props = {};

const Project = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="d-flex justify-content-between py-4">
        <h5 className="title-page">Project List</h5>
        <Button
          onClick={() => {
            navigate("/project/register");
          }}
        >
          Create project
        </Button>
      </div>
    </div>
  );
};

export default Project;
