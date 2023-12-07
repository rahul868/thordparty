import { useState, createContext } from "react";
const Gcommoncontext = createContext();
const Gcommonprovider = (props) => {
  // Current users of application
  const [user, setuser] = useState({
    name: "Rahul Darekar",
    email: "rahuldarekar369782@gmail.com",
    a_profile: "",
  });

  // Current Doc which is loaded
  const [currdoc, setcurrdoc] = useState({
    id: "fedgerg34ertgefg34t3",
    type: "file",
    slug: "https://www.cl.cam.ac.uk/teaching/1011/OpSystems/os1a-slides.pdf",
    name: "",
    filename: "index.m3u8",
    Lastedit: "3 days ago",
  });

  // Alert
  const [alertstatus, setalertstatus] = useState(false);
  const [alertmsg, setalertmsg] = useState("Chat your way through long documents");
  const [alerttype, setalerttype] = useState("l");

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
  return (
    <Gcommoncontext.Provider
      value={{
        currdoc,
        setcurrdoc,
        user,
        limit_string,
        alertstatus,
        alertmsg,
        alerttype,
      }}
    >
      {props.children}
    </Gcommoncontext.Provider>
  );
};

export { Gcommoncontext, Gcommonprovider };
