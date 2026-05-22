import { Card, Col, Row, Carousel } from "antd";
import React, { useRef } from "react";
import Image from "next/image";
import "./HealthCheckGuidline.css";
import stethoscope from "../../../../../public/user/images/stethscope.svg";
import tooth from "../../../../../public/user/images/tooth.svg";
import dermatology from "../../../../../public/user/images/dermatology.svg";
import ob_gyn from "../../../../../public/user/images/ob_gyn.svg";
import psychristist from "../../../../../public/user/images/psychristist.svg";
import Explore_health_check_img from "../../../../../public/patient/Explore_health_check.png";

import health_check_allergies from "../../../../../public/patient/health_check_allergies.png";
import health_check_family_history from "../../../../../public/patient/health_check_family_history.png";
import health_check_medical_history from "../../../../../public/patient/health_check_medical_history.png";
import health_check_medication from "../../../../../public/patient/health_check_medication.png";
import health_check_social_history from "../../../../../public/patient/health_check_social_history.png";
import health_check_surgical_history from "../../../../../public/patient/health_check_surgical_history.png";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import ScreenWidth from "../../admin/common/ScreenWidth";
import { useRouter } from "next/navigation";

const HealthCheckGuidline = ({ t, lng }) => {
  const { push } = useRouter();

  let cardDetails = [
    {
      id: 1,
      image: health_check_medical_history,
      title: "Medical History",
      description: "Transform your smile with our expert dental care.",
    },
    {
      id: 2,
      image: health_check_surgical_history,
      title: "Surgical History",
      description: "Compassionate primary care, tailored to you.",
    },
    {
      id: 3,
      image: health_check_allergies,
      title: "Allergies",
      description: "Expert dermatological care for radiant skin.",
    },
    {
      id: 4,
      image: health_check_social_history,
      title: "Social History",
      description: "Empowering women's health through expert OB-GYN care",
    },
    {
      id: 5,
      image: health_check_medication,
      title: "Medications",
      description: "Tailored psychiatric care for your well-being.",
    },
    {
      id: 6,
      image: health_check_family_history,
      title: "Family History",
      description: "Enhance your vision with our expert optometric care.",
    },
  ];

  const goToHealthCheck = () => {
    push(`/${lng}/patient/healthcheck`);
  };

  return (
    <section className="">
      <div className="p-6 md:p-16 max-w-[1440px] mx-auto w-full ">
        <div className="mb-8 w-full ">
          <div className="flex flex-col gap-5 md:flex-row items-center justify-between w-[100%]">
            <div className="md:text-start text-center ">
              <h2 className="md:text-h2 text-h3 font-fam fw-600 md:max-w-[550px] text-customBlack">
                Stay healthy with our thorough health check.
              </h2>
              <p className="text-p2 font-fam fw-400 mt-4 md:max-w-[550px]">
                Monitor vital health metrics from home with our robust health
                check feature.
              </p>
            </div>
            <div className="flex  gap-2 w-full max-w-[316px] ">
              <Link href={`/${lng}/patient/healthcheck`} className="w-full">
                <button className="flex justify-center items-center gap-4 bg-primaryBlue text-[#fff] w-full py-4 rounded-md">
                  <Image
                    src={Explore_health_check_img}
                    alt="Explore"
                    width={30}
                    height={32}
                    className="w-[30px] h-[32px]"
                  />
                  <span className="text-[18px] font-semibold">
                    {" "}
                    Explore Health Check
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap mt-10 -m-3">
            {cardDetails.map((item) => (
              <div
                className="w-full sm:w-1/3 xl:w-1/6 p-3 cursor-pointer"
                key={item.id}
              >
                <div className="group border-2 rounded-lg flex flex-col gap-3 items-center px-[18px] py-6 h-full hover:bg-primaryBlue hover:text-[#fff]">
                  <Image
                    src={item.image}
                    alt="profile"
                    width={57}
                    height={57}
                    className="w-full h-full max-w-[57px] max-h-[57px]"
                  />
                  <span className="text-customBlack font-medium text-[14px] group-hover:text-[#fff]">
                    {item.title}
                  </span>
                  <p className=" text-customBlack !font-normal text-[12px] !leading-[14px] text-center group-hover:!text-[#fff]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="">
                        <Carousel
                            // slidesToShow={slidesToShow}
                            slidesToShow={slidesToShow}
                            slidesToScroll={1}
                            ref={carouselRef}
                            // autoplay
                            // className="w-full custom_carousel_home"
                            infinite={true}
                        >
                            {cardDetails.map((items, index) => (
                                <Row className="w-full" key={index}>
                                    <Col className="mb-4 w-[92%] mx-auto">
                                        <Link href={`/${lng}/neardoctors`} className="w-full">
                                            <Card className=" min-h-[272px] flex mt-8 flex-col justify-center items-center hover:bg-primaryBlue shadow-custom hover:text-white text-center spec_custom_card h-100 w-full bg-[#FFFFFF] border border-gray-300">
                                                <Image
                                                    src={items.image}
                                                    alt="profile"
                                                    width={80}
                                                    height={80}
                                                    className="rounded-full pb-2"
                                                />
                                                <span className="text-customBlack pt-2 !font-medium text-p1 fw-500">
                                                    {t(items.title)}
                                                </span>
                                                <p className="font-fam pt-4">{t(items.description)}</p>

                                            </Card>
                                        </Link>
                                    </Col>
                                </Row>
                            ))}
                        </Carousel>
                    </div> */}
        </div>
      </div>
    </section>
  );
};

export default HealthCheckGuidline;
