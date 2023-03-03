import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { DispatchType, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { projectRegisterApi } from "../../redux/reducers/projectReducer";

import {
  getAllProjectCategoryApi,
  ProjectCategoryModel,
} from "../../redux/reducers/projectCategoryReducer";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

type Props = {};

const ProjectRegister = (props: Props) => {
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
  const { arrProjectCategory } = useSelector(
    (state: RootState) => state.projectCategoryReducer
  );
  useEffect(() => {
    const actionAsync = getAllProjectCategoryApi();
    dispatch(actionAsync);
  }, []);
  const form = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      categoryId: 1,
    },
    validationSchema: yup.object().shape({
      projectName: yup.string(),
      description: yup.string(),
      categoryId: yup.number(),
      alias: yup.string(),
    }),
    onSubmit: (values: any, { resetForm }) => {
      const action = projectRegisterApi(values);
      dispatch(action);
      resetForm();
    },
  });
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
          <Form onSubmit={form.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                id="projectNameInput"
                name="projectName"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Category</Form.Label>
              <Form.Select
                name="categoryId"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                {arrProjectCategory?.map(
                  (category: ProjectCategoryModel, index: number) => {
                    return (
                      <option key={index} value={category.id}>
                        {category.projectCategoryName}
                      </option>
                    );
                  }
                )}
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

export default ProjectRegister;
