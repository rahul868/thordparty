import React, { useContext, useState, useEffect } from "react";
import Button from "./button";
import style from "@/styles/reusable/pricing.module.css";
import { Gcommoncontext } from "@/context/common_global";
import Loader from "./loader";

export default function Pricingplan({ close }) {
  const { manupleting_events, setiopen, setimsg, setitype, user, useraccess } =
    useContext(Gcommoncontext);
  const [selectedplan, setselectedplan] = useState("");
  const [plans, setplans] = useState([]);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(true);

  const payment_process = async (plan) => {
    setselectedplan(plan);
    try {
      manupleting_events(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create_checkout_session?productcode=${plan}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // content type based on your API requirements
          },
          body: JSON.stringify({
            email: user.email,
            plancode: plan,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to process your payment journey.");
      }
      let payment_url = await response.json();
      if (payment_url["checkout_session_url"]) {
        return window.open(payment_url["checkout_session_url"], "_self");
      }
      throw new Error("Failed to process your payment journey.");
    } catch (err) {
      setitype("e");
      setimsg("Something went wrong in payment journey. pls try again");
      setiopen(true);
    } finally {
      manupleting_events(false);
      setselectedplan("");
    }
  };

  const fetch_pricingplans = async (plan) => {
    try {
      setloading(true);
      manupleting_events(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pricingplans`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // content type based on your API requirements
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to loads plans");
      }
      let plans = await response.json();
      if (plans) {
        setplans(plans);
        return;
      }
      throw new Error("Failed to loads plans");
    } catch (err) {
      seterror(true);
      setitype("e");
      setimsg("Something went wrong in payment journey. pls try again");
    } finally {
      manupleting_events(false);
      setloading(false);
    }
  };

  useEffect(() => {
    fetch_pricingplans();
  }, []);

  if (loading) {
    return (
      <div className={style.pricing_plan_model}>
        <Loader c_styles={{ backgroundColor: "#666" }} />
      </div>
    );
  }

  const return_feature_availability = (feature) => {
    let feature_arr = [];
    for (let i = 0; i < plans["plansmeta"].length; i++) {
      let value = plans["plansmeta"][i]["features"][feature];
      feature_arr.push(value);
    }
    return feature_arr.map((featurevalue) => {
      if (typeof featurevalue == "boolean") {
        return (
          <td className={`${style.feature_tab}`}>
            {featurevalue ? (
              <svg
                fill="inherit"
                className="thinCheck"
                color="#37352F"
                viewBox="0 0 16 16"
                style={{
                  width: 12,
                  height: 12,
                  WebkitFlexShrink: "0",
                  MsFlexShrink: "0",
                  flexShrink: "0",
                }}
              >
                <path d="M6.385 14.162c.362 0 .642-.15.84-.444L13.652 3.71c.144-.226.205-.417.205-.602 0-.485-.341-.82-.833-.82-.335 0-.54.123-.746.444l-5.926 9.4L3.31 8.229c-.205-.267-.417-.376-.718-.376-.492 0-.848.348-.848.827 0 .212.075.417.253.629l3.541 4.416c.24.3.492.437.848.437z"></path>
              </svg>
            ) : (
              ""
            )}
          </td>
        );
      }
      return <td className={style.feature_tab}>{featurevalue}</td>;
    });
  };


  const return_features_row = () => {
    return plans["common_features"].map((feature, index) => {
      if (index == 0) {
        return (
          <>
            <tr>
              <th
                className={`${style.plans_updatetrigger} ${style.plans_logo}`}
              >
                <img
                  width={"80%"}
                  src="assets/images/croppedlogo.png"
                  alt="Documentia Logo"
                />
              </th>
              {plans["plansmeta"].map((plan, index) => {
                return (
                  <td
                    className={`${style.plansmeta_header} ${style.plans_updatetrigger}`}
                  >
                    <div className={style.heading_plan}>
                      <span className={style.title_for_plan}>
                        {plan.plan_name}
                      </span>
                      <div className={style.tenure_interval}>
                        <span className={style.amount}>${plan.plan_price}</span>
                        &nbsp;
                        <span>/</span>
                        &nbsp;
                        <span>{plan.plan_tenure}</span>
                        &nbsp;
                        <span>/</span>
                        &nbsp;
                        <span>{plan.plan_desc}</span>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
            <tr>
              <th
                className={`${style.plansubtn_align} ${style.plansubtn_title}`}
              >
                Plans content & features
              </th>
              {plans["plansmeta"].map((plan, index) => {
                return (
                  <td
                    className={`${style.plansmeta_header} ${style.plansubtn_align}`}
                  >
                    {useraccess.curr_plans.planid == plan.plan_code ? (
                      <Button
                        callback={() => null}
                        disable={true}
                        loading={
                          selectedplan == plan.product_code ? true : false
                        }
                        title={"Active plan"}
                      />
                    ) : (
                      <Button
                        callback={() => payment_process(plan.plan_code)}
                        loading={selectedplan == plan.plan_code ? true : false}
                        title={"Upgrade"}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          </>
        );
      }

      return (
        <tr className={style.feature_row}>
          <th className={style.feature_header}>{feature}</th>
          {return_feature_availability(feature)}
        </tr>
      );
    });
  };
  return (
    <>
      <div className={style.pricing_plan_model}>
        <div className={style.wrapping_pricing_model}>
          <div className={style.pricing_header_container}>
            <table className={style.plans_features_section}>
              <tbody>{return_features_row()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
