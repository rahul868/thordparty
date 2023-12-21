import { useState, createContext, useEffect } from "react";
import { parse } from "cookie";

const Gcommoncontext = createContext();

// const cookies = parse(document.cookie);

const Gcommonprovider = (props) => {
  const [user, setuser] = useState({
    username: "Rahul Darekar",
    // email: "ssatale@bigiota.ai",
    email: "ru1@gmail.com",
  });
  // const [user, setuser] = useState(null);

  // useEffect(() => {
  //   if (typeof document !== "undefined") {
  //     // Check for user validity with the help of a token
  //     const cookies = parse(document.cookie);
  //     if (cookies.documentiauser) {
  //       let newuserObj = JSON.parse(cookies.documentiauser);
  //       setuser(newuserObj);
  //     }
  //   }
  //   // Check if running on the client side where document is defined
  // }, []);

  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(true);
  const [filemeta, setfilemeta] = useState([]);

  // Indicator states
  const [iopen, setiopen] = useState(false);
  const [itype, setitype] = useState("l");
  const [imsg, setimsg] = useState("");

  const [currdoc, setcurrdoc] = useState(null);

  // Progress Alert
  const [pastatus, setpastatus] = useState(false);
  const [pamsg, setpamsg] = useState("");
  const [pasecmsg, setpasecmsg] = useState("0 / 0 Uploaded successfully.");
  const [patype, setpatype] = useState("e");
  // For first time uploading states
  const [isfirstupload, setisfirstupload] = useState(false);

  // Indicator popup
  const [gindicatormsg, setgindicatormsg] = useState(null);

  function limit_string(text, maxLength) {
    // Split the text into words

    if (text.length <= maxLength) {
      return text;
    }
    const words = text.split("");

    // Ensure the string has more than maxWords
    // Join the first maxWords words and add ellipsis
    const truncatedText = words.slice(0, maxLength).join("") + "...";

    // If the string is within the limits or the truncation process failed
    // Return the original string
    return truncatedText;
  }

  // Function for calling user files from server

  // Simulating fetching user file metadata
  const fetchUserFiles = async () => {
    try {
      // Simulate API call for user file metadata
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/DocumentHistory?emailid=${user.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user files");
      }
      const files = await response.json();
      setfilemeta(files.documents);
      if (files.documents.length > 0) {
        setcurrdoc(files.documents[0]);
      }
    } catch (err) {
      seterror(err.message);
    } finally {
      setTimeout(() => {
        setloading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    // Get userinfo from cookies.
    if (user && user !== null) {
      fetchUserFiles();
    }
  }, [user]);

  return (
    <Gcommoncontext.Provider
      value={{
        currdoc,
        setcurrdoc,
        user,
        setuser,
        filemeta,
        error,
        loading,
        setfilemeta,
        setiopen,
        setimsg,
        setitype,
        iopen,
        imsg,
        itype,
        limit_string,
        pastatus,
        pamsg,
        patype,
        pasecmsg,
        setpasecmsg,
        setpamsg,
        setpastatus,
        setpatype,
        gindicatormsg,
        setgindicatormsg,
        isfirstupload,
        setisfirstupload,
      }}
    >
      {props.children}
    </Gcommoncontext.Provider>
  );
};

export { Gcommoncontext, Gcommonprovider };
