import { Gcommoncontext } from "@/context/common_global";
import { useContext } from "react";
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
const Alert = dynamic(() => import("@/components/home/reusable/alert"));
const Splash = dynamic(() => import("@/components/home/reusable/splashscreen"));
const Gpopup = dynamic(() => import("@/components/home/reusable/gpopup"));
const Indicator = dynamic(() => import("@/components/home/reusable/indicator"));
const Landingrhs = dynamic(() => import("@/components/landing/landingrhs"));

export default function Home() {
  const context = useContext(Gcommoncontext);
  const { loading } = useContext(Gcommoncontext);
  const { filemeta } = context;

  if (loading) {
    // Load splash screen
    return <Splash />;
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
