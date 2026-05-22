import { dir } from "i18next";
import { languages } from "../i18n/settings";
import Providers from "./components/redux/provider";
import "../assets/css/admin.css"
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function Layout({ children, params: { lng } }) {

  return (
    // <html lang={lng} >
    //   <head />
    //   <body>
        <Providers>{children}</Providers>
    //   </body>
    // </html>
  );
}
