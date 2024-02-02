// Gpopup.js
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styles from "../../../styles/gpopup.module.css";

const Gpopup = ({ id, isOpen, onClose, targetElement, children,c_contentstyle, c_ostyle }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [ismobile, setismobile] = useState(false);

  const [isActive, setisActive] = useState(false);

  const [isWeb, setisWeb] = useState(false);

  const handleOverlayClick = (e) => {
    const isOverlay = e.target.getAttribute("data-popup-overlay") === `${id}`;
    if (isOverlay) {
      {
        !isWeb ? onClose() : onClose();
      }
    }
  };

  useEffect(() => {
    const calculatePosition = () => {
      if (!targetElement) {
        return { top: 0, left: 0 };
      }

      const targetRect = targetElement.getBoundingClientRect();
      const top = targetRect.bottom + window.scrollY;
      const left = targetRect.left + window.scrollX;
      return { top, left };
    };

    if (isOpen || targetElement) {
      setisActive(true);
      setPosition(calculatePosition());
    }

    const handleResize = () => {
      setismobile(window.innerWidth <= 550);
      setisWeb(window.innerWidth > 550);
    };

    handleResize(); // Call it once to set the initial state

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, targetElement]);

  if (!isOpen) {
    return null;
  }

  const overlayStyle = {
    ...c_ostyle,
    position: ismobile ? "" : "fixed", // Use absolute on mobile, fixed otherwise
  };

  const contentStyle = {
    ...c_contentstyle,
    ...(targetElement && {
      position: ismobile ? "" : "fixed", // Use absolute on mobile, fixed otherwise
      top: position.top + 5,
      left: position.left + 80,
    }),
  };

  return (
    <>
      <div
        style={overlayStyle}
        data-popup-overlay={`${id}`}
        className={`${styles.popup_overlay} `}
        onClick={handleOverlayClick}
      >
        <div
          style={contentStyle}
          id="popup-content"
          className={`${styles.popup_content} `}
        >
          {children}
        </div>
      </div>
    </>
  );
};

Gpopup.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Gpopup;
