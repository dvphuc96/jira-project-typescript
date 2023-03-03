import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { DispatchType, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllProjectApi,
  ProjectModel,
} from "../../redux/reducers/projectReducer";
import { taskRegisterApi } from "../../redux/reducers/taskReducer";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
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

const TaskRegister = (props: Props) => {
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
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
  const form = useFormik({
    initialValues: {
      taskName: "",
      description: "",
      statusId: "0",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: 1,
      typeId: 1,
      priorityId: 1,
    },
    validationSchema: yup.object().shape({
      taskName: yup.string(),
      description: yup.string(),
      statusId: yup.number(),
      originalEstimate: yup.number(),
      timeTrackingSpent: yup.number(),
      timeTrackingRemaining: yup.number(),
      projectId: yup.number(),
      typeId: yup.number(),
      priorityId: yup.number(),
    }),
    onSubmit: (values: any, { resetForm }) => {
      const action = taskRegisterApi(values);
      dispatch(action);
      resetForm();
    },
  });
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
          <Form onSubmit={form.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project</Form.Label>
              <Form.Select
                name="projectId"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                {arrProject?.map((project: ProjectModel, index: number) => {
                  return (
                    <option key={index} value={project.id}>
                      {project.projectName}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                id="taskNameInput"
                name="taskName"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="statusId"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                {arrStatus?.map((status: StatusModel, index: number) => {
                  return (
                    <option key={index} value={status.statusId}>
                      {status.statusName}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priorityId"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                {arrPriority?.map((priority: PriorityModel, index: number) => {
                  return (
                    <option key={index} value={priority.priorityId}>
                      {priority.priority}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="typeId"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                {arrType?.map((type: TypeModel, index: number) => {
                  return (
                    <option key={index} value={type.id}>
                      {type.taskType}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                style={{ height: "100px" }}
                name="description"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default TaskRegister;
