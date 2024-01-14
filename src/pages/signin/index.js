import React, { useState, useEffect } from "react";
import styles from "@/styles/Auth/signin.module.css";
import { Input } from "@/components/home/reusable/input";
import Button from "@/components/home/reusable/button";
import Sociallogin from "@/components/home/reusable/googleloginbtn";
import { parse } from "cookie";
import useGooglelogin from "@/hooks/useGooglelogin";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isvalidemail, setIsvalidemail] = useState(true);
  const [isvalidpassword, setIsvalidpassword] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const [isgoogleloading, setIsGoogleloading] = useState(false);

  // Callback for handling response from google servers.
  const googleLoginProcesscCallback = async (userdata) => {
    manupleting_events(true);
    setIsGoogleloading(true);
    // Backend is expecting exactly below schema.
    let ctms_userobj = {
      email: userdata.email,
      familyname: userdata.family_name,
      givenname: userdata.given_name,
      locale: userdata.locale,
      username: userdata.name,
      picturelink: userdata.picture,
      isemailverified: true,
    };
    try {
      // Call API which is handling google login case.
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/useroauth`,
        {
          method: "POST",
          body: JSON.stringify(ctms_userobj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Not receive wrong credentials at all because. IF user not exist
      // in DB backend will create new entry for resp user.

      // So need to handle 500 error.

      // Check if the google login process was successful or not.
      if (!response.ok) {
        throw new Error("Failed in google login process.");
      }

      const user = await response.json();
      if (user.accesstoken && !user.restricted_user) {
        // Set cookies for application use
        // Setting cookies with a max-age of 1 day
        document.cookie = `documentiatoken=${user.accesstoken}; max-age=${
          60 * 60 * 24
        }`;
        // Navigate to mainApp
        clearForm();
        return (window.location.href = "/");
      }
      throw new Error("Failed in google login process.");
    } catch (err) {
      // handle error
      alert(err);
      clearForm();
    } finally {
      manupleting_events(false);
      setIsGoogleloading(false);
    }
  };

  // get google login functionality
  // Click continue with google
  // Here we need to process or authenticate user with one tap
  const { googleLogin } = useGooglelogin(googleLoginProcesscCallback);

  const verifyEmail = () => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // common function for event menupleting
  function manupleting_events(status) {
    if (status) {
      document.body.style.pointerEvents = "none";
      return;
    }
    document.body.style.pointerEvents = "auto";
  }

  // Function to clear the form-related state variables
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setIsvalidemail(true);
    setIsvalidpassword(true);
    setIsloading(false);
  };

  const verifyPassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}|;:'",<>/`~])[a-zA-Z\d!@#$%^&*()-=_+{}|;:'",<>/`~]{8,}$/;
    return passwordRegex.test(password);
  };

  const verifyUser = async () => {
    try {
      manupleting_events(true);
      setIsloading(true);
      if (!verifyEmail()) {
        setIsvalidemail(false);
        return;
      } else {
        setIsvalidemail(true);
      }

      if (!verifyPassword()) {
        setIsvalidpassword(false);
        return;
      } else {
        setIsvalidpassword(true);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the credentials are correct
      if (response.status === 401) {
        throw new Error("Wrong credentials. Please enter the correct ones.");
      }

      // Check if the login request was successful
      if (!response.ok) {
        throw new Error("Failed in login process.");
      }

      const user = await response.json();
      if (user.email && user.access_token) {
        // Set cookies for application use
        // Setting cookies with a max-age of 1 day
        document.cookie = `documentiatoken=${user.access_token}; max-age=${
          60 * 60 * 24
        }`;
        // Navigate to mainApp
        clearForm();
        return (window.location.href = "/");
      }
      alert("Invalid credentials. Please try again.");
    } catch (err) {
      alert(err);
      clearForm();
    } finally {
      setIsloading(false);
      manupleting_events(false);
    }
  };

  // Check if the token exists in cookies
  useEffect(() => {
    const cookies = parse(document.cookie);

    // If both documentiatoken and documentiauser exist, redirect to "/"
    if (cookies.documentiatoken) {
      window.location.href = "/";
      return;
    }

    document.querySelectorAll("[data-common-input]").forEach((input) => {
      input.addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
          let cur_btn = document.querySelector([
            `data-btn-context=${input.getAttribute("btn_id")}`,
          ]);
          if (cur_btn) {
            cur_btn.click();
          }
        }
      });
    });
  }, []);

  return (
    <div className={`${styles.login_main_container}`}>
      <div className={styles.login_content}>
        <div style={{ textAlign: "center" }}>
          <img width={300} src="assets/images/logo.png" alt="" />
        </div>
        <div className={styles.auth_title_wrapper}>
          <span>Let's understand your content better</span>
        </div>
        <div className={styles.auth_two_wrapper}>
          <div className={styles.login_left_side}>
            <span style={{ fontWeight: "bold" }}>Signin</span>
            <hr
              style={{
                marginTop: "12px",
                border: "0.5px solid #eee",
                marginBottom: "25px",
              }}
            />
            <Input
              placeholder="Email"
              disable={"false"}
              onchange={(e) => setEmail(e.target.value)}
              type="text"
              value={email}
              autoFocus="autofocus"
              unique_id="login_email"
            />
            {!isvalidemail ? (
              <div style={{ color: "red" }}>Please enter valid email</div>
            ) : (
              <></>
            )}
            <Input
              btn_id="login-context"
              placeholder="Password"
              disable={"false"}
              onchange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              autoFocus={false}
              unique_id="login_password"
              data-common-input
            />
            {!isvalidpassword ? (
              <div style={{ color: "red" }}>Please create strong password.</div>
            ) : (
              <></>
            )}
            <div className={styles.login_meta_info}>
              <span data="warning" style={{ color: "#666" }}>
                Session is valid only for 1 day.
              </span>
              <span data="forgot-password">Forgot Password?</span>
            </div>
            {/* Assuming setUserSession is defined elsewhere */}
            <Button
              callback={verifyUser}
              btn_id={"login-context"}
              unique_id="verification_btn"
              title="Continue"
              loading={isloading}
            />
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                textAlign: "center",
                color: "#666",
              }}
            ></div>
          </div>
          <div className={styles.login_right_side}>
            <div className={styles.login_privacy_section1}>
              <span>
                By continuing it is considered that you have accepted{" "}
                <span style={{ color: "#3e92f2" }}>Terms & Conditions</span> and{" "}
                <span style={{ color: "#3e92f2" }}>Privacy Policy</span>.
              </span>
            </div>
            <br />
            <Sociallogin loading={isgoogleloading} func={googleLogin} />
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                textAlign: "center",
                color: "#666",
              }}
            >
              or
            </div>
            <a href="/signup">
              <Sociallogin
                text={"Signup with us"}
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#666"
                    class="bi bi-person-plus-fill"
                    viewBox="0 0 16 16"
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    <path
                      fill-rule="evenodd"
                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                    />
                  </svg>
                }
              />
            </a>
            <div className={styles.login_privacy_info}>
              <span>
                Documentia is a proprietary AI-based foundational model which
                generates the foundation for the Generative AI applications like
                ChatGPT, Llama, and Falcon.
              </span>
            </div>
            <div className={styles.login_privacy_section}>
              <div className={styles.login_privacy_section2}>
                <span>
                  Contact us on{" "}
                  <span style={{ color: "#3e92f2" }}>bigiota@gmail.com</span>{" "}
                  @2023 Documentia inc. All rights are reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
