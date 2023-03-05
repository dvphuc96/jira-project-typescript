import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DispatchType, RootState } from "../../redux/configStore";
// import {
//   getDetailTaskApi,
//   projectUpdaterApi,
// } from "../../redux/reducers/taskReducer";
import { Form, Input, Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  getDetailTaskApi,
  TaskModelUpdate,
  taskUpdaterApi,
} from "../../redux/reducers/taskReducer";
import {
  getAllProjectApi,
  ProjectModel,
} from "../../redux/reducers/projectReducer";
import {
  getAllStatusApi,
  StatusModel,
} from "../../redux/reducers/statusReducer";
import {
  getAllPriorityApi,
  PriorityModel,
} from "../../redux/reducers/priorityReducer";
import { getAllTypeApi, TypeModel } from "../../redux/reducers/typeReducer";
type Props = {};

const TaskUpdate = (props: Props) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
  const { taskDetail } = useSelector((state: RootState) => state.taskReducer);
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const { arrProject } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const { arrStatus } = useSelector((state: RootState) => state.statusReducer);
  const { arrType } = useSelector((state: RootState) => state.typeReducer);
  const { arrPriority } = useSelector(
    (state: RootState) => state.priorityReducer
  );

  const getDetailTask = () => {
    const actionAsync = getDetailTaskApi(id);
    dispatch(actionAsync);
  };
  const getAllProject = () => {
    const actionAsync = getAllProjectApi();
    dispatch(actionAsync);
  };
  const getAllStatus = () => {
    const actionAsync = getAllStatusApi();
    dispatch(actionAsync);
  };
  const getAllPriority = () => {
    const actionAsync = getAllPriorityApi();
    dispatch(actionAsync);
  };
  const getAllType = () => {
    const actionAsync = getAllTypeApi();
    dispatch(actionAsync);
  };
  useEffect(() => {
    getDetailTask();
    getAllProject();
    getAllStatus();
    getAllPriority();
    getAllType();
  }, []);
  useEffect(() => {
    form.setFieldsValue({ ...taskDetail });
  }, [taskDetail]);

  const validateMessages = {
    required: "${label} is required !!",
  };
  const handleUpdateTask = (values: TaskModelUpdate) => {
    const actionAsync = taskUpdaterApi(values);
    dispatch(actionAsync);
    form.resetFields();
  };
  return (
    <>
      <div className="d-flex justify-content-between mt-4 mb-2">
        <div className="ms-5">Task Update</div>
        <div className="me-5">
          <Button
            onClick={() => {
              navigate("/");
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
            onFinish={handleUpdateTask}
            size="large"
            name="nest-messages"
            wrapperCol={{ span: 24 }}
            layout="vertical"
            validateMessages={validateMessages}
          >
            <Form.Item label="Task Id" name="taskId">
              <Input readOnly disabled />
            </Form.Item>
            <Form.Item
              label="Task Name"
              name="taskName"
              rules={[{ required: true }]}
              tooltip="This is a required field"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Project"
              name="projectId"
              rules={[{ required: true }]}
              tooltip="This is a required field"
            >
              <Select
                style={{
                  width: "100%",
                }}
                maxTagCount="responsive"
                placeholder="Please select project"
                options={arrProject
                  ?.filter((project) => project.creator.id === userLogin?.id)
                  .map((project: ProjectModel) => {
                    return {
                      label: project.projectName,
                      value: project.id,
                    };
                  })}
              />
            </Form.Item>
            <Form.Item
              label="Status"
              name="statusId"
              rules={[{ required: true }]}
              tooltip="This is a required field"
            >
              <Select
                style={{
                  width: "100%",
                }}
                maxTagCount="responsive"
                placeholder="Please select status"
                options={arrStatus?.map((status: StatusModel) => {
                  return {
                    label: status.statusName,
                    value: status.statusId,
                  };
                })}
              />
            </Form.Item>
            <Form.Item
              label="Priority"
              name="priorityId"
              rules={[{ required: true }]}
              tooltip="This is a required field"
            >
              <Select
                style={{
                  width: "100%",
                }}
                maxTagCount="responsive"
                placeholder="Please select status"
                options={arrPriority?.map((priority: PriorityModel) => {
                  return {
                    label: priority.priority,
                    value: priority.priorityId,
                  };
                })}
              />
            </Form.Item>
            <Form.Item
              label="Type"
              name="typeId"
              rules={[{ required: true }]}
              tooltip="This is a required field"
            >
              <Select
                style={{
                  width: "100%",
                }}
                maxTagCount="responsive"
                placeholder="Please select status"
                options={arrType?.map((type: TypeModel) => {
                  return {
                    label: type.taskType,
                    value: type.id,
                  };
                })}
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

export default TaskUpdate;
