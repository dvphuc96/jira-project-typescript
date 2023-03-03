import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

type Props = {};

const HomeTemplate = (props: Props) => {
    return (
        <>
          <Header />
          <div style={{ minHeight: "75vh" }}>
            <Outlet />
          </div>
          <Footer />
        </>
      );
};

export default HomeTemplate;
