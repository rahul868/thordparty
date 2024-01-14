import React, { useContext, useState, useEffect } from "react";
import Gpopup from "./gpopup";
import { pricing } from "@/schema/pricingschema";
import Button from "./button";
import style from "@/styles/reusable/pricing.module.css";
import { Gcommoncontext } from "@/context/common_global";

export default function Pricingplan({ close }) {
  const { manupleting_events, setiopen, setimsg, setitype, useraccess } =
    useContext(Gcommoncontext);
  const [selectedplan, setselectedplan] = useState("");

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
            emailid: "user.email",
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

  return (
    <>
      <div className={style.pricing_plan_model}>
        <div className={style.wrapping_pricing_model}>
          {pricing.map((plan, index) => {
            return (
              <div key={index} className={style.plan_box_display_user}>
                <div className={style.supwrappe_pan_box}>
                  <div className={style.heading_plan}>
                    <span className={style.title_for_plan}>
                      {plan.product_title}
                    </span>
                    <div className={style.tenure_interval}>
                      <span className={style.amount}>
                        ${plan.product_amount}
                      </span>
                      &nbsp;
                      <span>/</span>
                      &nbsp;
                      <span>{plan.tenure_interval}</span>
                      &nbsp;
                      <span>/</span>
                      &nbsp;
                      <span>{plan.product_billing_desc}</span>
                    </div>
                    {useraccess.curr_plans.product_code == plan.product_code ? (
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
                        callback={() => payment_process(plan.product_code)}
                        loading={
                          selectedplan == plan.product_code ? true : false
                        }
                        title={"Upgrade"}
                      />
                    )}
                  </div>
                  <span className={style.info_features}>
                    Everything in {plan.product_title}
                  </span>
                  <div className={style.features_for_plan}>
                    {plan.features.map((item, ind) => {
                      return (
                        <div key={ind} className={style.wrapping_features_plan}>
                          <svg
                            viewBox="0 0 16 16"
                            style={{
                              height: 20,
                              WebkitFlexShrink: "0",
                              MsFlexShrink: "0",
                              flexShrink: "0",
                              padding: 2,
                              fill: "rgb(120, 119, 116)",
                            }}
                            className="thinCheck"
                          >
                            <path d="M6.385 14.162c.362 0 .642-.15.84-.444L13.652 3.71c.144-.226.205-.417.205-.602 0-.485-.341-.82-.833-.82-.335 0-.54.123-.746.444l-5.926 9.4L3.31 8.229c-.205-.267-.417-.376-.718-.376-.492 0-.848.348-.848.827 0 .212.075.417.253.629l3.541 4.416c.24.3.492.437.848.437z"></path>
                          </svg>
                          <span>{item.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
