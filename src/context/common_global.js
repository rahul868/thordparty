import { useState, createContext, useEffect } from "react";
import { parse } from "cookie";

const Gcommoncontext = createContext();

// const cookies = parse(document.cookie);

const Gcommonprovider = (props) => {
  // const [user, setuser] = useState({
  //   username: "Rahul Darekar",
  //   email: "ssatale@bigiota.ai",
  //   // email: "ru1@gmail.com",
  // });
  const [user, setuser] = useState(null);
  const [useraccess, setuseraccess] = useState(null);

  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(true);
  const [docsloadingindicator, setDocsloadingindicator] = useState(true);
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

  // common function for event menupleting
  function manupleting_events(status) {
    if (status) {
      document.body.style.pointerEvents = "none";
      return;
    }
    document.body.style.pointerEvents = "auto";
  }

  return (
    <Gcommoncontext.Provider
      value={{
        currdoc,
        setcurrdoc,
        user,
        setuser,
        useraccess,
        setuseraccess,
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
        manupleting_events,
        docsloadingindicator,
        setDocsloadingindicator,
      }}
    >
      {props.children}
    </Gcommoncontext.Provider>
  );
};

export { Gcommoncontext, Gcommonprovider };
