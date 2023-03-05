import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DispatchType, RootState } from "../../redux/configStore";
import {
  getDetailProjectApi,
  projectUpdaterApi,
} from "../../redux/reducers/projectReducer";
import { Form, Input, Button, Select } from "antd";
import {
  getAllProjectCategoryApi,
  ProjectCategoryModel,
} from "../../redux/reducers/projectCategoryReducer";
import TextArea from "antd/es/input/TextArea";
type Props = {};

const ProjectUpdate = (props: Props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
  const { projectDetail } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const { arrProjectCategory } = useSelector(
    (state: RootState) => state.projectCategoryReducer
  );

  const getDetailProject = () => {
    const action = getDetailProjectApi(id);
    dispatch(action);
  };
  const getAllCategory = () => {
    const actionAsync = getAllProjectCategoryApi();
    dispatch(actionAsync);
  };
  useEffect(() => {
    getDetailProject();
    getAllCategory();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...projectDetail });
  }, [projectDetail]);

  const validateMessages = {
    required: "${label} is required !!",
  };

  const handleSubmit = (values: any) => {
    values.categoryId = values.projectCategory.id.toString();
    values.creator = values.creator.id;
    delete values.projectCategory;
    const action = projectUpdaterApi(values);
    dispatch(action);
    form.resetFields();
  };

  return (
    <>
      <div className="d-flex justify-content-between mt-4 mb-2">
        <div className="ms-5">Project Update</div>
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
            onFinish={handleSubmit}
            size="large"
            name="nest-messages"
            wrapperCol={{ span: 24 }}
            layout="vertical"
            validateMessages={validateMessages}
          >
            <Form.Item label="Project Id" name="id">
              <Input readOnly disabled />
            </Form.Item>
            <Form.Item
              label="Project Name"
              name="projectName"
              rules={[{ required: true }]}
              tooltip="This is a required field"
            >
              <Input />
            </Form.Item>
            <Form.Item name={["creator", "id"]} hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Category"
              name={["projectCategory", "id"]}
              rules={[{ required: true }]}
              tooltip="This is a required field"
            >
              <Select
                // mode="multiple"
                style={{
                  width: "100%",
                }}
                maxTagCount="responsive"
                placeholder="Please select category"
                // value={categories?.map(item => item.value)}
                options={arrProjectCategory?.map(
                  (item: ProjectCategoryModel) => {
                    // form.setFieldsValue({
                    //   categoryId: item.id,
                    // });
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

export default ProjectUpdate;
