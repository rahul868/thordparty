import React, { useState } from "react";
import styles from "@/styles/Auth/signin.module.css";
import { Input } from "@/components/home/reusable/input";
import Button from "@/components/home/reusable/button";
import Sociallogin from "@/components/home/reusable/googleloginbtn";
import useGooglelogin from "@/hooks/useGooglelogin";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isvalidemail, setIsvalidemail] = useState(true);
  const [isvalidpassword, setIsvalidpassword] = useState(true);
  const [isvalidusername, setIsvalidusername] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const [iserror, setIserror] = useState(false);
  const [isgoogleloading, setIsGoogleloading] = useState(false);

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

  const verifyPassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}|;:'",<>/`~])[a-zA-Z\d!@#$%^&*()-=_+{}|;:'",<>/`~]{8,}$/;
    return passwordRegex.test(password);
  };

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
        return (window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
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
  const { googleLogin } = useGooglelogin(googleLoginProcesscCallback);

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPass("");
    setIsPasswordMatch(true);
    setIsvalidemail(true);
    setIsvalidpassword(true);
    setIsvalidusername(true);
    setIsloading(false);
    setIserror(false);
  };
  const registerUser = async () => {
    try {
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

      if (confirmPass !== password) {
        setIsPasswordMatch(false);
        return;
      } else {
        setIsPasswordMatch(true);
      }

      if (username == "") {
        setIsvalidusername(false);
        return;
      } else {
        setIsPasswordMatch(true);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        {
          method: "POST",
          body: JSON.stringify({
            username,
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const user = await response.json();
      if (!response.ok) {
        throw Error(user.detail);
      }
      if (user.detail) {
        alert("User is already registred.");
        return;
      }
      if (user.email && user.message) {
        alert("Registration is successful");
        clearForm();
        setTimeout(() => {
          return (window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
        }, 3000);
      }
    } catch (err) {
      clearForm();
      alert(err);
    } finally {
      setIsloading(false);
    }
  };

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
            <span style={{ fontWeight: "bold" }}>Signup</span>
            <hr
              style={{
                marginTop: "12px",
                border: "1px solid #eee",
                marginBottom: "25px",
              }}
            />
            <Input
              placeholder="Username"
              disable={false}
              onchange={(e) => setUsername(e.target.value)}
              type="text"
              autoFocus="autofocus"
              unique_id="username"
            />
            {!isvalidusername ? (
              <div style={{ color: "red" }}>Please type username for you.</div>
            ) : (
              <></>
            )}
            <Input
              placeholder="Email"
              disable={false}
              onchange={(e) => setEmail(e.target.value)}
              type="text"
              autoFocus="autofocus"
              unique_id="login_email"
            />
            {!isvalidemail ? (
              <div style={{ color: "red" }}>Please enter valid email</div>
            ) : (
              <></>
            )}
            <Input
              placeholder="Password"
              disable={false}
              onchange={(e) => setPassword(e.target.value)}
              type="password"
              autoFocus={false}
              unique_id="login_password"
            />
            {!isvalidpassword ? (
              <div style={{ color: "red" }}>Please create strong password.</div>
            ) : (
              <></>
            )}
            <Input
              placeholder="Confirm Password"
              disable={false}
              onchange={(e) => setConfirmPass(e.target.value)}
              type="password"
              autoFocus={false}
              unique_id="confirm_password"
            />
            {!isPasswordMatch ? (
              <div style={{ color: "red" }}>
                Password is not matching. Please try again.
              </div>
            ) : (
              <></>
            )}
            <div className={styles.login_meta_info}>
              <span data="warning" style={{ color: "#666" }}>
                Let's create your account
              </span>
              <span data="forgot-password">Forgot Password?</span>
            </div>
            {/* Assuming setUserSession is defined elsewhere */}
            <Button
              callback={registerUser}
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
            <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/signin`}>
              <Sociallogin
                func={() => null}
                text={"Signin with email"}
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
                  <span style={{ color: "#3e92f2" }}>contact@bigiota.ai</span>{" "}
                  <br />
                  @2022 pointers inc. All rights are reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
