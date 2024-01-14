import { useContext, useEffect, useState } from "react";
import Lheader from "./header";
import Lmiddle from "./middle";
import styles from "@/styles/home/lhs/lhswrapper.module.css";
import { Gcommoncontext } from "@/context/common_global";
import Loader from "../reusable/loader";

export default function Lhswrapper() {
  // States for handling user documents meta data fetching from server according to user
  // It is dependent on users data which is available in global context.

  // const [docsloading, setDocsloading] = useState(true);
  const [error, setError] = useState(null); // Updated to store the actual error object

  // Global context dependencies
  const {
    setcurrdoc,
    setfilemeta,
    user,
    docsloadingindicator,
    setDocsloadingindicator,
  } = useContext(Gcommoncontext);

  const fetchData = async () => {
    try {
      // Simulate API call for user file metadata
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/DocumentHistory?emailid=${user.email}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch user files: ${response.statusText}`);
      }
      const files = await response.json();
      setfilemeta(files.documents);
      if (files.documents.length > 0) {
        // Opening the first document as default.
        setcurrdoc(files.documents[0]);
      }
    } catch (err) {
      setError(err); // Store the actual error object
    } finally {
      setDocsloadingindicator(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  if (error) {
    return <>Error: {error.message}</>; // Display the actual error message
  }

  return (
    <div id="lhs_section" className={styles.lhs_content_wrapper}>
      <Lheader />
      {docsloadingindicator ? (
        <div className={styles.lhs_loading_indicator}>
          <Loader c_styles={{ background: "#666" }} />
        </div>
      ) : (
        <Lmiddle />
      )}
      {/* Documentia logo */}
      <img src="assets/images/logo.png" alt="Documentia Logo" />
    </div>
  );
}
