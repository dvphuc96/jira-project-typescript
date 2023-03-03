import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configStore";
type Props = {};

const Home = (props: Props) => {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const renderSlider = () => {
    if (userLogin) {
      return (
        <div
          className="container-fluid md-comfortable-bottom xs-cozy-top hero-form"
          style={{
            height: "700px",
            display: "flex",
            backgroundImage:
              "url(https://wac-cdn.atlassian.com/dam/jcr:f505eadc-b6e5-4644-b96e-a8136ec63ceb/Hero-IMG-2x.png?cdnVersion=821)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="row flex-container">
            <div className="column column-md-5 column-lg-4 column-lg-offset-1 vertical-middle text-n0 s0 between">
              <div
                className="component component--heading"
                style={{ marginTop: "30px" }}
              >
                <h1 className="font-wt- font-mgn- font-lnh- heading text-white">
                  Jira Project
                </h1>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className="container-fluid md-comfortable-bottom xs-cozy-top hero-form"
        style={{
          height: "700px",
          display: "flex",
          backgroundImage:
            "url(https://wac-cdn.atlassian.com/dam/jcr:f505eadc-b6e5-4644-b96e-a8136ec63ceb/Hero-IMG-2x.png?cdnVersion=821)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="row flex-container">
          <div className="column column-md-5 column-lg-4 column-lg-offset-1 vertical-middle text-n0 s0 between">
            <div
              className="component component--heading"
              style={{ marginTop: "30px" }}
            >
              <h1 className="font-wt- font-mgn- font-lnh- heading text-white">
                Jira Project
              </h1>
              <h2 className="font-wt- font-mgn- font-lnh- heading text-white">
                Please login to see more
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return <>{renderSlider()}</>;
};

export default Home;
