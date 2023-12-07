import { useState, createContext } from "react";
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
    name: "Rahul Darekar",
    email: "rahuldarekar369782@gmail.com",
    a_profile: "",
  });

  const [filemeta, setfilemeta] = useState([]);
  //   [
  //   {
  //     id: "fedgerg34ertgefg34t3",
  //     type: "file",
  //     slug: "Actual slug of file",
  //     name: "",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "now",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t4",
  //     type: "group",
  //     groupname: uniqueNamesGenerator(config),
  //     Lastedit: "3h",
  //     childs: [
  //       {
  //         id: "fedgerg34ertgefg34th",
  //         filename: uniqueNamesGenerator(config),
  //         Lastedit: "22h",
  //       },
  //       {
  //         id: "fedgerg34ertgefg34ta",
  //         filename: uniqueNamesGenerator(config),
  //         Lastedit: "22h",
  //       },
  //       {
  //         id: "fedgerg34ertgefg34tk",
  //         filename: uniqueNamesGenerator(config),
  //         Lastedit: "22h",
  //       },
  //     ],
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },

  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  //   {
  //     id: "fedgerg34ertgefg34t5",
  //     type: "file",
  //     filename: uniqueNamesGenerator(config),
  //     Lastedit: "3min",
  //   },
  // ]

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
        filemeta,
        setfilemeta,
      }}
    >
      {props.children}
    </Gcommoncontext.Provider>
  );
};

export { Gcommoncontext, Gcommonprovider };
