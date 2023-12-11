import {
  React,
  useState,
  useRef,
  createContext,
  useContext,
  useEffect,
} from "react";
import { Gcommoncontext } from "./common_global";
import { upload_doc } from "@/utils/fileuploading";

const Rhscontext = createContext();
const Rhsprovider = (props) => {
  //Global context
  const { user, currdoc, setcurrdoc, setfilemeta, setgindicatormsg } =
    useContext(Gcommoncontext);

  // Storage for actual file data uploaded which will remove after uploading.
  const [files, setfiles] = useState([]);
  const messagesContainerRef = useRef(null);

  // Chats state for storing chat API status and data
  const [SavedMessages, setSavedMessages] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  // group creation for storing chat API status and data
  const [gasuccess, setgasuccess] = useState(false);
  const [galoading, setgaloading] = useState(false);
  const [gaerror, setgaerror] = useState(false);

  const [chatsetting, setchatsetting] = useState({
    response_mode: "efficient",
    answers_length: "medium",
    content_source: "focused",
    text_size: "normal",
  });

  // Function for fetching chat hostory of individual doc

  const fetchFileChats = async () => {
    try {
      // Simulate API call for user file metadata
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chatHistory?email=${user.email}&fileid=${currdoc.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user files");
      }
      const chats_data = await response.json();
      setSavedMessages(chats_data.data);
    } catch (err) {
      seterror(err.message);
    } finally {
      setloading(false);
    }
  };

  // Function for sending created group to backend for persistent purpose.
  const setUserGroup = async (groupobj) => {
    setgaloading(true);
    try {
      // Simulate API call for user file metadata
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/process_document_group?emailid=${user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // content type based on your API requirements
          },
          body: JSON.stringify(groupobj),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update group");
      }
      const files = await response.json();
      setfilemeta((prevFiles) => [groupobj, ...prevFiles]);
      setgasuccess(true);
      setTimeout(() => {
        setgasuccess(false);
        setgaerror(false);
      }, 4000);
      return { success: true };
    } catch (err) {
      setgaerror(err.message);
      setTimeout(() => {
        setgaerror(false);
      }, 4000);
      return { success: false };
    } finally {
      setgaloading(false);
    }
  };

  const cloud_upload = async () => {
    files.forEach(async (file) => {
      await upload_doc(file);
    });
  };

  const setSeperateFiles = async (files) => {
    setgaloading(true);
    try {
      // Simulate API call for user file metadata
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/process_documents?emailid=${user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // content type based on your API requirements
          },
          body: JSON.stringify(files),
        }
      );
      if (!response.ok) {
        console.log(response, "this happen");
        throw new Error("Failed to update group");
      }
      const result = await response.json();
      setfilemeta((prevFiles) => [...files, ...prevFiles]);
      setcurrdoc(files[0]);
      setgasuccess(true);
      setTimeout(() => {
        setgasuccess(false);
        setgaerror(false);
      }, 4000);
      return { success: true };
    } catch (err) {
      setgaerror(err.message);
      setTimeout(() => {
        setgaerror(false);
      }, 4000);
      return { success: false };
    } finally {
      setgaloading(false);
    }
  };

  useEffect(() => {
    if (currdoc) {
      setloading(true);
      fetchFileChats();
    }
  }, [currdoc]);

  const save_chats_local = (currfile) => {
    // First API call will go here.
    window.localStorage.setItem(
      `doc_${currfile}`,
      JSON.stringify(SavedMessages)
    );
    setgindicatormsg("Chats saved.");
  };

  const del_chats_local = (currfile) => {
    console.log(`doc_${currfile}`);
    console.log(window.localStorage.getItem(`doc_${currfile}`));
    window.localStorage.removeItem(`doc_${currfile}`);
  };

  // const/ [SelectGroupChat, setSelectGroupChat] = useState();

  return (
    <Rhscontext.Provider
      value={{
        SavedMessages,
        setSavedMessages,
        messagesContainerRef,
        setfiles,
        files,
        save_chats_local,
        del_chats_local,
        error,
        loading,
        setUserGroup,
        galoading,
        gaerror,
        gasuccess,
        setSeperateFiles,
      }}
    >
      {props.children}
    </Rhscontext.Provider>
  );
};

export { Rhscontext, Rhsprovider };
