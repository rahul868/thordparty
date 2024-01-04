import { Gcommoncontext } from "@/context/common_global";
import { useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/home.module.css";
const Lhswrapper = dynamic(() =>
  import("@/components/home/main_lhs/lhswrapper")
);
const Rhswrapper = dynamic(() =>
  import("@/components/home/main_rhs/rhswrapper")
);
import { Rhsprovider } from "@/context/provider";
import { Lhsprovider } from "@/context/lhsprovider";
import { Appwrapper } from "@/layouts";
import { parse } from "cookie";
import Serror from "@/components/home/reusable/error";
const Alert = dynamic(() => import("@/components/home/reusable/alert"));
const Splash = dynamic(() => import("@/components/home/reusable/splashscreen"));
const Gpopup = dynamic(() => import("@/components/home/reusable/gpopup"));
const Indicator = dynamic(() => import("@/components/home/reusable/indicator"));
const Landingrhs = dynamic(() => import("@/components/landing/landingrhs"));
function Home() {
  const { loading, filemeta, error } = useContext(Gcommoncontext);

  useEffect(() => {
    // Checking for user valid or unvalid with help token and userinformation which is in cookies
    // cookies are set for one day after it it will expire automatically from client side.
    const cookies = parse(document.cookie);
    if (!cookies.documentiatoken || !cookies.documentiauser) {
      window.location.href = "/signin";
    }
    return () => {
      // Any cleanup logic we can add here
    };
  }, []);

  if (loading) {
    /*
      loading is essential state in common_global context which handle initial loading state of
      user's Document fetching API i.e (filemeta data).
      
      So if loading is true then we are showing splash screen which is indicating that main application
      is loading.
    */
    return <Splash />;
  }

  if (error) {
    /*
      error is essential state in common_global context which handle initial error state of
      user's Document fetching API i.e (filemeta data).
      
      So if error is true then we are showing error screen which is indicating that main application
      facing some issue in starting journey i.e fetching users filementa data.
    */
    return <Serror />;
  }

  return (
    <>
      {/* Main home page template which can include  */}

      <div className={styles.app_container}>
        {/* LHS SECTION */}
        {filemeta.length > 0 ? (
          <div
            data-sec-lhswrapper
            id="lhs_wrapper"
            className={`${styles.left_section} ${styles.left_section_mob}`}
          >
            {/* SECTION 1. HEADER 2. CONTENT 3.FOOTER */}
            <Lhsprovider>
              <Lhswrapper />
            </Lhsprovider>
          </div>
        ) : (
          <></>
        )}

        {/* RHS SECTION */}
        <main data-sec-rhswrapper className={styles.main_rhs_container}>
          <Rhsprovider>
            {filemeta.length <= 0 ? (
              <>
                <div
                  className="set_img_newchat"
                  style={{
                    position: "fixed",
                    width: "100%",
                    left: "0",
                  }}
                >
                  <img
                    loading="lazy"
                    style={{ width: "100%" }}
                    src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.home_page_bg_desktop.png-26-4770753d59b970e1.png"
                  />
                </div>
                <Gpopup
                  id="doc-landingwidget"
                  c_ostyle={{ backdropFilter: "blur(8px)" }}
                  isOpen={filemeta.length <= 0 ? true : false}
                  onClose={() => null}
                >
                  <Landingrhs />
                </Gpopup>
              </>
            ) : (
              <></>
            )}
            <Rhswrapper />
          </Rhsprovider>
        </main>
      </div>
      <Alert />
      <Indicator />
    </>
  );
}

export default function Wrapper() {
  return (
    <Appwrapper is_main={true}>
      <Home />
    </Appwrapper>
  );
}
