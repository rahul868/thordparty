import { Inter } from "next/font/google";
import styles from "../styles/home.module.css";
import Lhswrapper from "@/components/home/main_lhs/lhswrapper";
import Rhswrapper from "@/components/home/main_rhs/rhswrapper";
import { Rhsprovider } from "@/context/provider";
import { Lhsprovider } from "@/context/lhsprovider";
import Alert from "@/components/home/reusable/alert";
import { Gcommoncontext } from "@/context/common_global";
import Landingrhs from "@/components/landing/landingrhs";
import { useContext } from "react";
import Splash from "@/components/home/reusable/splashscreen";
import Gpopup from "@/components/home/reusable/gpopup";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const context = useContext(Gcommoncontext);
  const { alertstatus, alertmsg, alerttype, loading, gindicatormsg } =
    useContext(Gcommoncontext);
  const { filemeta } = context;

  if (loading) {
    return <Splash />;
  }

  return (
    <>
      {/* Main home page template which can include  */}
      {/* <Gcommonprovider> */}
      <div className={styles.app_container}>
        {/* LHS SECTION */}
        <div
          data-sec-lhswrapper
          id="lhs_wrapper"
          className={styles.left_section}
        >
          {/* SECTION 1. HEADER 2. CONTENT 3.FOOTER */}
          <Lhsprovider>
            <Lhswrapper />
          </Lhsprovider>
        </div>

        {/* RHS SECTION */}
        <main data-sec-rhswrapper className={styles.main_rhs_container}>
          <Rhsprovider>
            <Rhswrapper />
            {filemeta.length <= 0 ? (
              <Gpopup
                id="doc-landingwidget"
                c_ostyle={{ backdropFilter: "blur(2px)" }}
                isOpen={filemeta.length <= 0 ? true : false}
                onClose={() => null}
              >
                <Landingrhs />
              </Gpopup>
            ) : (
              <></>
            )}
          </Rhsprovider>
        </main>
      </div>
      <Alert />
    </>
  );
}
