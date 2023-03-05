import React, { useEffect } from "react";
import { DispatchType, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllProjectApi,
  ProjectModel,
} from "../../redux/reducers/projectReducer";
import {
  TaskModelRegister,
  taskRegisterApi,
} from "../../redux/reducers/taskReducer";
import {
  getAllStatusApi,
  StatusModel,
} from "../../redux/reducers/statusReducer";
import {
  getAllPriorityApi,
  PriorityModel,
} from "../../redux/reducers/priorityReducer";
import { getAllTypeApi, TypeModel } from "../../redux/reducers/typeReducer";
import { Form, Input, Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

type Props = {};

const TaskRegister = (props: Props) => {
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
  const [form] = Form.useForm();
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const { arrProject } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const { arrStatus } = useSelector((state: RootState) => state.statusReducer);
  const { arrType } = useSelector((state: RootState) => state.typeReducer);
  const { arrPriority } = useSelector(
    (state: RootState) => state.priorityReducer
  );
  useEffect(() => {
    const actionAsync = getAllProjectApi();
    dispatch(actionAsync);
  }, []);
  useEffect(() => {
    const actionAsync = getAllStatusApi();
    dispatch(actionAsync);
  }, []);
  useEffect(() => {
    const actionAsync = getAllPriorityApi();
    dispatch(actionAsync);
  }, []);
  useEffect(() => {
    const actionAsync = getAllTypeApi();
    dispatch(actionAsync);
  }, []);

  const validateMessages = {
    required: "${label} is required !!",
  };
  const handleCreateTask = (values: TaskModelRegister) => {
    const action = taskRegisterApi(values);
    dispatch(action);
    form.resetFields();
  };
  return (
    <>
      <div className="d-flex justify-content-between mt-4 mb-2">
        <div className="ms-5">Task Register</div>
        <div className="me-5">
          <Button
            onClick={() => {
              navigate("/task");
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
            onFinish={handleCreateTask}
            size="large"
            name="nest-messages"
            wrapperCol={{ span: 24 }}
            layout="vertical"
            validateMessages={validateMessages}
          >
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
              label="Task Name"
              name="taskName"
              rules={[{ required: true }]}
              tooltip="This is a required field"
            >
              <Input />
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
                options={arrStatus?.map(
                  (status: StatusModel) => {
                    return {
                      label: status.statusName,
                      value: status.statusId,
                    };
                  }
                )}
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
                placeholder="Please select priority"
                options={arrPriority?.map(
                  (priority: PriorityModel) => {
                    return {
                      label: priority.priority,
                      value: priority.priorityId,
                    };
                  }
                )}
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
                placeholder="Please select type"
                options={arrType?.map(
                  (type: TypeModel) => {
                    return {
                      label: type.taskType,
                      value: type.id,
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
export default TaskRegister;
