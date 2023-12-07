import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/home.module.css";
import Lhswrapper from "@/components/home/main_lhs/lhswrapper";
import Rhswrapper from "@/components/home/main_rhs/rhswrapper";
import { Rhsprovider } from "@/context/provider";
import { Lhsprovider } from "@/context/lhsprovider";
import {Alert} from "@/components/home/reusable/alert"
import { Gcommoncontext } from "@/context/common_global";
import Landingrhs from "@/components/landing/landingrhs";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const context = useContext(Gcommoncontext);
  const { alertstatus, alertmsg, alerttype } = useContext(Gcommoncontext);
  const { filemeta } = context;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
        </style>
      </Head>
      <Alert
        alertstatus={alertstatus}
        alerttype={alerttype}
        alertmsg={alertmsg}
      />
      {/* Main home page template which can include  */}
      {/* <Gcommonprovider> */}
      <div className={styles.app_container}>
        {/* LHS SECTION */}
        <div id={styles.left_section}>
          {/* SECTION 1. HEADER 2. CONTENT 3.FOOTER */}
          <Lhsprovider>
            <Lhswrapper />
          </Lhsprovider>
        </div>

        {/* RHS SECTION */}
        <main className={styles.main_rhs_container}>
          <Rhsprovider>
            {filemeta.length !== 0 ? <Rhswrapper /> : <Landingrhs />}
          </Rhsprovider>
        </main>
      </div>
      {/* </Gcommonprovider> */}

      <div className="overlay" g-overlay id="overlay"></div>
      {/* <Alert msg="Hello this is testing" /> */}
    </>
  );
}
