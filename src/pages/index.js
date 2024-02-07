import { Gcommoncontext } from "@/context/common_global";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/home.module.css";
import Lhswrapper from "@/components/home/main_lhs/lhswrapper";
import Rhswrapper from "@/components/home/main_rhs/rhswrapper";
import { Rhsprovider } from "@/context/provider";
import { Lhsprovider } from "@/context/lhsprovider";
import { Appwrapper } from "@/layouts";
import { parse } from "cookie";
import Serror from "@/components/home/reusable/error";
const Alert = dynamic(() => import("@/components/home/reusable/alert"));
const Splash = dynamic(() => import("@/components/home/reusable/splashscreen"));
const Indicator = dynamic(() => import("@/components/home/reusable/indicator"));
function Home() {
  // States for handling main app most important data API call flow.
  // This APP is main app and first component to render after authentication process.
  // So this component is reponsible for handling USER FULL FLEDGE API DATA

  const [loading, setLoading] = useState(true);
  // Set true while calling Application's first API after landing. Loading screen will be displayed.

  const [error, setError] = useState(false);
  // Set true while facing issue with Application's first API after landing. Error screen will be displayed.

  const { filemeta, setuser, setuseraccess } = useContext(Gcommoncontext);

  const userValidation = async (enc_token) => {
    // API call for validating token. Also for fetching full fedge data of authenticated user.
    try {
      // const user_test = new Promise((res, rej) => {
      //   setTimeout(() => {
      //     res({
      //       sucess: true,
      //       user_meta: {
      //         username: "Rahul Darekar",
      //         email: "ssatale@bigiota.ai",
      //       },
      //       user_access: {
      //         curr_plans: {
      //           product_code: "P",
      //           name: "plan_name",
      //           initiated_on: "imestamp of initiating",
      //           last_date: "timestamps of last date",
      //           active: true,
      //         },
      //       },
      //     });
      //   }, 1000);
      // });
      // const user_data = await user_test;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/initialize`,
        {
          method: "GET",
          headers: {
            Authorization: enc_token,
          },
        }
      );

      // Check if the user's token is valid
      if (response.status === 401) {
      // First clear cookie from clients browser.
      // Then navigate for fresh login and authentication.
      document.cookie =
      "documentiatoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return (window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
      }

      // Check if the google login process was successful or not.
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      // Everything is fine we have received user's full fledge data which is required
      // For preceeding with application and which will require by application.
      // We can set this users data in Global context (common_globalcontext) So that any component
      // in tree can use this user's data

      const user_data = await response.json();
      if (user_data) {
      // Set received userdata in gloabl context so that everyone can access it.
      setuser(user_data.user_meta);
      setuseraccess(user_data.user_access);
      }
    } catch (error) {
      console.log(error)
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(async () => {
    // Checking for user is valid or unvalid with help token which is in cookies
    // cookies are set for one day, after it it will expire automatically from client side.
    const cookies = parse(document.cookie);
    if (!cookies.documentiatoken) {
      return (window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
    }

    // If coockies exist then check it and verify with documentia server.
    await userValidation(cookies.documentiatoken);
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
      user's Document fetching API i.e (filemeta data).emailid: x@bigiota.ai
      
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

        {/* RHS SECTION */}
        <main data-sec-rhswrapper className={styles.main_rhs_container}>
          <Rhsprovider>
            {/* {filemeta.length <= 0 ? (
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
            )} */}
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
