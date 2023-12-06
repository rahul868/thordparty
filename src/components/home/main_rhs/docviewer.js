import styles from "@/styles/home/rhs/docviewer.module.css";
import { useEffect, useRef } from "react";
export default function Rdocviewer() {
  const presenterRef = useRef(null);

  // Function for creating canvas
  const createCanvas = () => {
    // Create a new canvas for the page
    const newCanvas = document.createElement("canvas");
    newCanvas.width = 400;
    newCanvas.height = 500;

    const context = newCanvas.getContext("2d");

    // Create an example image data (replace this with your actual base64 image data)
    const exampleBase64 =
      "https://miro.medium.com/v2/resize:fit:1358/0*rxenFnYLZJb-7mJy";

    // Render the page on the canvas
    const imgElement = new Image();
    imgElement.src = exampleBase64;

    imgElement.onload = function () {
      context.drawImage(imgElement, 0, 0, 400, 500);
    };

    // Append the new canvas to the container
    presenterRef.current?.appendChild(newCanvas);
  };

  // Variables to keep track of scroll position
  let lastScrollTop = 0;

  // Function to check if the user has reached the bottom of the page
  const isPageBottom = () => {
    const presenter = presenterRef.current;
    const windowHeight = presenter.clientHeight;
    const documentHeight = presenter.scrollHeight;

    // You can adjust the threshold as needed
    const scrollThreshold = 10;

    return (
      presenter.scrollTop >= documentHeight - windowHeight - scrollThreshold
    );
  };

  // Function to handle scroll events
  const handleScroll = () => {
    const presenter = presenterRef.current;
    // Check if the user has reached the bottom
    if (isPageBottom()) {
      // User has reached the end of the page
      createCanvas();
      console.log("User reached the bottom of the page");
    }
  };

  // Throttle the scroll event to improve performance
  const throttle = (callback, wait) => {
    let time = Date.now();
    return function () {
      if (time + wait - Date.now() < 0) {
        callback();
        time = Date.now();
      }
    };
  };

  // Attach the scroll event listener
  useEffect(() => {
    const presenter = presenterRef.current;
    createCanvas();
    // createCanvas();
    // createCanvas();
    presenter.addEventListener("scroll", throttle(handleScroll, 1));

    return () => {
      // Clean up the scroll event listener when the component unmounts
      presenter.removeEventListener("scroll", throttle(handleScroll, 20));
    };
  }, []);

  return (
    <>
      <div id="doc_container" className="viwer_for_detail">
        {/* <div className="presenter_wrapper"> */}
        <div id="doc_presenter" ref={presenterRef}></div>
        {/* </div> */}
      </div>
    </>
  );
}
