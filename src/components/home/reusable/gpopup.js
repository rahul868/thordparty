// Gpopup.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../../styles/gpopup.module.css";

const Gpopup = ({ id, isOpen, onClose, targetElement, children, c_ostyle }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleOverlayClick = (e) => {
    const isOverlay = e.target.getAttribute("data-popup-overlay") === `${id}`;
    if (isOverlay) {
      onClose();
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

    if (isOpen) {
      setPosition(calculatePosition());
    }
  }, [isOpen, targetElement]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        style={c_ostyle}
        data-popup-overlay={`${id}`}
        className={`${styles.popup_overlay} ${
          isOpen ? "popup_overlay_active" : ""
        }`}
        onClick={handleOverlayClick}
      >
        <div
          style={
            targetElement && {
              position: "fixed",
              top: position.top + 5,
              left: position.left + 80,
            }
          }
          className={styles.popup_content}
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
