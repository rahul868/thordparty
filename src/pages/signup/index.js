import React, { useState } from "react";
import styles from "@/styles/Auth/signin.module.css";
import { Input } from "@/components/home/reusable/input";
import Button from "@/components/home/reusable/button";
import Googlelogin from "@/components/home/reusable/googleloginbtn";
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

  // get google login functionality
  const { login } = useGooglelogin();

  const colors = {
    bigiota: {
      blue: "#7385fb",
    },
  };

  const verifyEmail = () => {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const verifyPassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}|;:'",<>/`~])[a-zA-Z\d!@#$%^&*()-=_+{}|;:'",<>/`~]{8,}$/;
    return passwordRegex.test(password);
  };

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
          return (window.location.href = "/signin");
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
          <img width={250} src="assets/images/logo.png" alt="" />
        </div>
        <br />
        <div>
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
              Email is most important part of profile.
            </span>
          </div>
          {/* Assuming setUserSession is defined elsewhere */}
          <Button
            callback={registerUser}
            title="Continue"
            isloading={isloading}
          />
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
          <Googlelogin func={login} />
        </div>
        <div>
          <div className={styles.awesome_divider_div}>
            <div className={styles.awesome_divider} data-label="or"></div>
          </div>
          <div className={styles.login_join_opt}>
            <span data="warning">Existing user ?</span>{" "}
            <a
              href="/signin"
              style={{
                paddingLeft: 8,
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "500",
              }}
              data="forgot-password"
            >
              Signin
            </a>
          </div>
          <div className={styles.login_privacy_section}>
            <div className={styles.login_privacy_section1}>
              <span>
                By continuing it is considered that you have accepted{" "}
                <span style={{ color: "#3e92f2" }}>Terms & Conditions</span> and{" "}
                <span style={{ color: "#3e92f2" }}>Privacy Policy</span>.
              </span>
            </div>
            <div className={styles.login_privacy_section2}>
              <span>
                Contact us on{" "}
                <span style={{ color: "#3e92f2" }}>pointersinc@gmail.com</span>{" "}
                <br />
                @2022 pointers inc. All rights are reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
