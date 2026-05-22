"use-client";
import { Button, Form, Input, Select } from "antd";
import "./SigninDetails.css";
import Image from "next/image";
import Link from "next/link";
import usa from "../../../../../public/usa.svg";
import spain from "../../../../../public/spain.svg";
import { useRouter } from "next/navigation";
import {
  postData,
  toastAlert,
  useFormState,
} from "../../services/methods/api";
import { useEffect, useState } from "react";
import france from "../../../../../public/france.svg";
import Cookies from "js-cookie";
import SignupFooter from "../Signup_Footer/SignupFooter";
const SigninDetails = ({ t, lng }) => {
  const { push } = useRouter();

  const initialFormData = {
    email: "",
    password: "",
    user_type: "super_admin",
  };

  const { formData, handleChange } = useFormState(initialFormData);
  const [validationErrors, setValidationErrors] = useState();
  const [passwordValidationErrors, setPasswordValidationErrors] = useState();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const onboarding = Cookies.get("onboarding");
    const role = Cookies.get("role");

    if (token && role) {
      const isSystemAdmin = role === "super_admin" || role === "admin";
      if (isSystemAdmin || onboarding === "1") {
        router.replace(`/${lng}/admin/dashboard`);
        return;
      }
    }

    if (token && role) {
      const isSystemAdmin = role === "super_admin" || role === "admin";
      if (!isSystemAdmin && onboarding !== "1") {
        Cookies.remove("token");
        Cookies.remove("role");
        Cookies.remove("onboarding");
        Cookies.remove("verification");
      }
    }
  }, [lng, router]);

  const Login = () => {
    if (formData.email == "") {
      setValidationErrors("Please enter the required email address.");
      toastAlert("Please enter the required email address.");
    } else if (formData.password == "") {
      setPasswordValidationErrors("Please enter the password.");
      toastAlert("Please enter the password.");
    } else {
      setPasswordValidationErrors("");
      postData("/login", formData)
        .then((res) => {
          if (res.errors) {
            setValidationErrors("The provided credentials are invalid");
            toastAlert("The provided credentials are invalid");
          } else {
            const token = res.data.data.authorization.token;
            const userType = (res.data.data.user_type || res.data.data.user?.user_type || "super_admin").toLowerCase();
            const onboardingComplete = res.data.data.users_details
              ? res.data.data.users_details.is_on_boarding_complete
              : 1;

            Cookies.set("token", token, { expires: 7 });
            Cookies.set("role", userType, { expires: 7 });
            Cookies.set("onboarding", String(onboardingComplete), { expires: 7 });
            Cookies.set("verification", res.data.data.user.verification_status || "complete", { expires: 7 });
            Cookies.set("lng", lng, { expires: 365 });

            localStorage.setItem("userid", res.data.data.user.id);
            router.push(`/${lng}/admin/dashboard`);
          }
        })
        .catch((error) => {
          console.error(error);
          toastAlert("An error occurred during login");
        });
    }
  };

  const handleLanguageChange = (lng) => {
    push(`/${lng}/signin`);
  };
  const options = [
    {
      key: "en-opt",
      value: "en",
      label: (
        <div className="font-fam fs-16 fw-600 flex select-icons gap-2 custom_option">
          <Image src={usa} alt="english" width={40} height={40} />
          <span className="fw-500">{t("switch_lanuage.en")}</span>
        </div>
      ),
    },
    {
      key: "es-opt",
      value: "es",
      label: (
        <div className="font-fam fs-16 fw-600 flex select-icons gap-2 custom_option">
          <Image src={spain} alt="spanish" width={40} height={40} />
          <span className="fw-500">{t("switch_lanuage.es")}</span>
        </div>
      ),
    },

    {
      key: "fr-opt",
      value: "fr",
      label: (
        <div className="font-fam fs-16 fw-600 flex select-icons gap-2 custom_option">
          <Image src={france} alt="spanish" width={20} height={20} />
          <span className="fw-500">{t("switch_lanuage.fr")}</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="md:mt-16 mt-8">
        <div className="flex mb-5 justify-end items-center">
          <Select
            className="language-select signup-lang md:w-56"
            value={lng}
            options={options}
            onChange={handleLanguageChange}
          ></Select>
        </div>
        <div className="lg:w-[83%] mb-5">
          <div className="about-dochyve">
            <h2 className="fw-700 font-fam lh-26 black">
              {t("welcome_dochyve.welcome")}{" "}
              <span className="fw-700 font-fam text-primary lh-26">
                {t("welcome_dochyve.dochyve.part1")}
              </span>
            </h2>

            <h1 className="fw-700 font-fam  mt-3 black">
              Access Super Admin Portal
            </h1>
          </div>

          <Form
            onFinish={Login}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                Login();
              }
            }}
          >
            <Form.Item
              className="email_label fw-600 font-fam mt-8"
              label="Email Address"
              rules={[
                {
                  required: true,
                  message: t("form.label.address_required"),
                },
              ]}
              validateStatus={validationErrors ? "error" : ""}
              help={validationErrors || ""}
              name="email"
            >
              <Input
                className="input_email"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => {
                  handleChange(e);
                }}
                maxLength={60}
              />
            </Form.Item>

            <Form.Item
              className="email_label fw-600 font-fam"
              label="Password"
              rules={[
                {
                  required: true,
                  message: t("form.label.password_required"),
                },
              ]}
              validateStatus={passwordValidationErrors ? "error" : ""}
              help={passwordValidationErrors || ""}
              name="password"
            >
              <Input.Password
                className="input_email"
                name="password"
                placeholder="Enter password"
                onChange={(e) => {
                  handleChange(e);
                }}
                maxLength={50}
              />
            </Form.Item>
            <div className="text-right email_label mb-5">
              <Link
                className="text-primary font-fam  fs-16 fw-600"
                href={`/${lng}/password/forgot-password`}
              >
                {t("form.forgot-password")}
              </Link>
            </div>

            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full text-white btn-primary input_email !font-semibold"
              >
                {t("form.sign_in")}
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="xl:absolute bottom-1 right-4">
          <SignupFooter t={t} />
        </div>
      </div>
    </>
  );
};

export default SigninDetails;
