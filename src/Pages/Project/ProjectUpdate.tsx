import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { DispatchType, RootState } from "../../redux/configStore";
import {
  getDetailProjectApi,
  projectUpdaterApi,
  ProjectModelDetail,
} from "../../redux/reducers/projectReducer";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import {
  getAllProjectCategoryApi,
  ProjectCategoryModel,
} from "../../redux/reducers/projectCategoryReducer";
type Props = {};

const ProjectUpdate = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
  const { projectDetail } = useSelector(
    (state: RootState) => state.projectReducer
  );
  const { arrProjectCategory } = useSelector(
    (state: RootState) => state.projectCategoryReducer
  );
  //State component
  const [projectDetailClone, setProjectDetail] = useState(projectDetail);

  useEffect(() => {
    const action = getDetailProjectApi(id);
    dispatch(action);
  }, [id]);

  useEffect(() => {
    const actionAsync = getAllProjectCategoryApi();
    dispatch(actionAsync);
  }, []);

  useEffect(() => {
    setProjectDetail(projectDetail);
  }, [projectDetail]);

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
      values.id = projectDetail?.id;
      values.creator = projectDetail?.creator.id;
      console.log(values);
      //   const action = projectUpdaterApi(values);
      //   dispatch(action);
      //   resetForm();
    },
  });
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
          <Form onSubmit={form.handleSubmit}>
            <fieldset disabled>
              <Form.Group className="mb-3">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  id="projectIdInput"
                  name="id"
                  value={projectDetailClone?.id}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </Form.Group>
            </fieldset>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                id="projectNameInput"
                name="projectName"
                value={projectDetailClone?.projectName}
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
                value={projectDetailClone?.description}
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

export default ProjectUpdate;
