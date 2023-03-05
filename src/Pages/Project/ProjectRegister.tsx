import React, { useEffect } from "react";
import { DispatchType, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { projectRegisterApi } from "../../redux/reducers/projectReducer";
import {
  getAllProjectCategoryApi,
  ProjectCategoryModel,
} from "../../redux/reducers/projectCategoryReducer";
import { Form, Input, Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

type Props = {};

const ProjectRegister = (props: Props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch: DispatchType = useDispatch();
  const { arrProjectCategory } = useSelector(
    (state: RootState) => state.projectCategoryReducer
  );
  useEffect(() => {
    const actionAsync = getAllProjectCategoryApi();
    dispatch(actionAsync);
  }, []);
  const validateMessages = {
    required: "${label} is required !!",
  };
  const handleCreateProject = (values: any) => {
    values.categoryId = values.projectCategory.id;
    const action = projectRegisterApi(values);
    dispatch(action);
    form.resetFields();
  };
  return (
    <>
      <div className="d-flex justify-content-between mt-4 mb-2">
        <div className="ms-5">Project Register</div>
        <div className="me-5">
          <Button
            onClick={() => {
              navigate("/project");
            }}
          >
            Back
          </Button>
        </div>
      </div>
      <div className="tabled pt-3">
        <div className="mx-auto" style={{ maxWidth: "1000px" }}>
          <Form
            form={form}
            onFinish={handleCreateProject}
            size="large"
            name="nest-messages"
            wrapperCol={{ span: 24 }}
            layout="vertical"
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Project Name"
              name="projectName"
              rules={[{ required: true }]}
              tooltip="This is a required field"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Category"
              name={["projectCategory", "id"]}
              rules={[{ required: true }]}
              tooltip="This is a required field"
            >
              <Select
                style={{
                  width: "100%",
                }}
                maxTagCount="responsive"
                placeholder="Please select category"
                options={arrProjectCategory?.map(
                  (item: ProjectCategoryModel) => {
                    return {
                      label: item.projectCategoryName,
                      value: item.id,
                    };
                  }
                )}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
              tooltip="This is a required field"
            >
              <TextArea />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProjectRegister;
