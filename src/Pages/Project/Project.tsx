import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState, DispatchType } from "../../redux/configStore";
import {
  getAllProjectApi,
  ProjectModel,
} from "../../redux/reducers/projectReducer";
import { EditOutlined } from "@ant-design/icons";

type Props = {};

const Project = (props: Props) => {
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
  const { arrProject } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  useEffect(() => {
    const actionAsync = getAllProjectApi();
    dispatch(actionAsync);
  }, []);
  const columns: ColumnsType<ProjectModel> = [
    {
      title: "Id",
      dataIndex: "id",
      defaultSortOrder: "descend",
      width: 250,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      width: 300,
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      width: 350,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      width: 350,
      render: (_, data) => <>{data.creator.name}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Button
          style={{
            fontSize: "12px",
            padding: "0px 15px 1px 14px",
            lineHeight: "14px",
            height: "36px",
          }}
          className="mx-2 table-action-button"
          onClick={() => {
            navigate(`/project/${data.id}`);
          }}
          type="default"
        >
          <EditOutlined />
        </Button>
      ),
    },
  ];
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
      <div>
        <Table columns={columns} dataSource={arrProject.filter((project) => project.creator.id === userLogin?.id)} />
      </div>
    </div>
  );
};

export default Project;
