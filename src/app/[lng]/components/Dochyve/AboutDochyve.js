"use-client"
import "./AboutDochyve.css"
import Logo from "../Logo/Logo";
import Image from "next/image";
import sign_banner from '../../../assets/images/signup-bg.svg'

const Aboutdochyve = ({ t }) => {

  return (
    <>
      <div className=" rounded-br-[84px] relative w-full">
        <Image
          src={sign_banner}
          width={500}
          height={500}
          alt="Picture of the author"
          className="w-full rounded-br-[84px]"
        />
        <div className="banner-element">
          <Logo />
          <div className='about-dochyve mx-auto text-center mw-465' style={{ color: "#ffffff" }}>
            Reach the right patients without upfront costs or complexity. Get started quickly and
            connect with patients actively seeking care, with no subscription fees.
          </div>
        </div>
      </div>
    </>

  );
}

export default Aboutdochyve;
