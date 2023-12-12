// Gpopup.js
import React from "react";
import PropTypes from "prop-types";
import styles from "../../../styles/gpopup.module.css";
import Gpopupheader from "./gpopupheader";

const Gpopup = ({ id, isOpen, onClose, targetElement, children, name }) => {
  const handleOverlayClick = (e) => {
    const isOverlay = e.target.getAttribute("data-popup-overlay") === `${id}`;
    if (isOverlay) {
      onClose();
    }
  };

  const calculatePosition = () => {
    if (!targetElement) {
      return { top: 0, left: 0 };
    }

    const targetRect = targetElement.getBoundingClientRect();
    const top = targetRect.bottom + window.scrollY;
    const left = targetRect.left + window.scrollX;

    return { top, left };
  };

  const position = calculatePosition();

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        data-popup-overlay={`${id}`}
        className={styles.popup_overlay}
        style={{ top: position.top, left: position.left }}
        onClick={handleOverlayClick}
      >
        <div className={styles.popup_content}>{children}</div>
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
