import React from "react";
import Link from "next/link"

const SignupFooter = ({ t, lng }) => {
  return (
    <div className="text-center sm:text-end  pr-5 pt-20 pb-5">
      <p className=" font-fam text-primary">
        {t("form.copy_rights")}
        <Link href="/signup" className="font-fam ml-4 text-primary">
          {t("form.license")}
        </Link>{" "}
        <Link href="/signup" className="font-fam text-primary ml-4">
          {t("form.terms")}
        </Link>
      </p>
    </div>
  );
};

export default SignupFooter;
