import { useState, createContext, useEffect } from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

const Gcommoncontext = createContext();
const Gcommonprovider = (props) => {
  const config = {
    dictionaries: [adjectives, colors, animals],
    separator: " ",
  };

  const [user, setuser] = useState({
    name:"Rahul Darekar",
    email:"ssatale@bigiota.ai"
    // email:"rd@gmail.com"
  });

  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(true);
  const [filemeta, setfilemeta] = useState([]);

  const [currdoc, setcurrdoc] = useState(null);

  // Progress Alert
  const [pastatus, setpastatus] = useState(true);
  const [pamsg, setpamsg] = useState("Uploading in progress...");
  const [pasecmsg, setpasecmsg] = useState("0 / 0 Uploaded successfully.");
  const [patype, setpatype] = useState("e");

  // Indicator popup
  const [gindicatormsg, setgindicatormsg] = useState("");

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
      }, 3000);
    }
  };

  useEffect(() => {
    // Get userinfo from coockies.
    fetchUserFiles();
  }, []);

  const popup_closer = () => {
    document.querySelectorAll("[data-g-navbar-flyer]").forEach((ele) => {
      ele.classList.remove("popup_container_active");
    });
    document.querySelector("#overlay").classList.remove("active_overlay");
  };

  return (
    <Gcommoncontext.Provider
      value={{
        currdoc,
        setcurrdoc,
        user,
        filemeta,
        error,
        loading,
        setfilemeta,
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
        popup_closer,
      }}
    >
      {props.children}
    </Gcommoncontext.Provider>
  );
};

export { Gcommoncontext, Gcommonprovider };
