"use client";

import React, { useState, useEffect } from "react";
import { Col } from "antd";
import AboutDochyve from "../components/Dochyve/AboutDochyve";
import SigninDetails from "../components/Signin_Details/SigninDetails";
import CustomRow from "../components/StyledComponents/CustomRow";
import "./signin.css";
import Loader from "../components/Spinner/Loader";
import LoadingTimer from "../components/Loader/LoadingTimer";
import { useTranslation } from "../../i18n";

export default function SigninPage({ params: { lng } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [trans, setTrans] = useState(null);

  const load = async () => {
    const { t } = await useTranslation(lng, "signup");
    return t;
  };

  useEffect(() => {
    load()
      .then(async (f) => {
        setTrans(() => {
          return f;
        });
      })
      .catch((e) => {
        console.error("Failed to load sign-in translations", e);
      });
  }, []);

  return (
    trans && (
      <>
        <LoadingTimer setIsLoading={setIsLoading} isLoading={isLoading} />
        {isLoading ? (
          <Loader />
        ) : (
          <CustomRow gutter={[32, 32]}>
            <Col className="gutter-row pt-4" xs={0} md={0} lg={0} xl={13} xxl={12}>
              <AboutDochyve t={trans} />
            </Col>
            <Col xs={24} md={24} lg={24} xl={11} xxl={12}>
              <SigninDetails t={trans} lng={lng} />
            </Col>
          </CustomRow>
        )}
      </>
    )
  );
}
