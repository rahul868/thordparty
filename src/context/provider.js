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
  const {
    user,
    currdoc,
    setcurrdoc,
    setfilemeta,
    setgindicatormsg,
    setpamsg,
    setpastatus,
    setpatype,
    setpasecmsg,
  } = useContext(Gcommoncontext);

  // Storage for actual file data uploaded which will remove after uploading.
  const [files, setfiles] = useState([]);
  const [progress, setprogress] = useState([]);

  // Messages hook for nevigating to bottom
  const [isresponding, setisresponding] = useState(false);
  const messagesContainerRef = useRef(null);

  // Chats state for storing chat API status and data
  const [SavedMessages, setSavedMessages] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  const [settinglang, setsettinglang] = useState("Auto-detect");
  const [settingmode, setsettingmode] = useState("efficient");
  const [settinglength, setsettinglength] = useState("medium");
  const [settingsource, setsettingsource] = useState("focused");
  const [settingsize, setsettingsize] = useState("normal");

  // File uploading function which is responsible for uploading
  // single file asynchrounously
  const uploadFile = async (file, index) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);

      // Track progress
      xhr.upload.addEventListener("progress", (event) => {
        const percentage = event.lengthComputable
          ? Math.round((event.loaded * 100) / event.total)
          : null;

        // Update progress in the state or handle it as needed
        console.log(`${file.name} progress: ${percentage}%`);
      });

      // Handle completion
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            console.log("update", progress);
            const uploadInfo = {
              name: file.name,
              size: file.size,
              status: "success",
              slug: response.url,
            };

            setprogress((prevUploadInfos) => [...prevUploadInfos, uploadInfo]);

            resolve(uploadInfo); // Resolve with upload information
            // setprogress(updatedProgress)

            console.log(`${file.name} uploaded successfully!`, progress);
            // resolve(); // Resolve the promise for successful upload
          } else {
            // Log the error or take additional actions
            console.error(
              `Error uploading $  {file.name}. Status: ${xhr.status}`
            );
            reject(
              new Error(`Error uploading ${file.name}. Status: ${xhr.status}`)
            );
          }
        }
      };

      // Connection opening and sending request
      xhr.open(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL}/upload_file?email_id=${user.email}`,
        true
      );
      xhr.send(formData);
    });
  };

  const handleFileChange = (e) => {
    // Check if the total number of files doesn't exceed the limit
    const selectedFiles = e.target.files;
    // Initialize progress array with objects for each file
    setfiles([...files, ...Array.from(selectedFiles)]);
  };

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

  // Function for updating lastaccesstime of individual doc
  const updateLastAcces = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/document_update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // content type based on your API requirements
          },
          body: JSON.stringify({
            email_id: user.email,
            fileid: currdoc.id,
            lastedittimestamp: Date.now().toString(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update lastaccess time for doc.");
      }
      const chats_data = await response.json();
    } catch (err) {
      console.log("while updating lastaccess time of doc", err.message);
      // seterror(err.message);
    }
  };

  // Function for sending created group to backend for persistent purpose.
  const setUserGroup = async (groupobj) => {
    setpastatus(true);
    setpatype("l");
    setpamsg("Your documents are processing...");
    setpasecmsg(`0 / ${groupobj.childs.length} Uploaded successfully.`);
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
      setcurrdoc(groupobj["childs"][0]);
      setpatype("s");
      setpamsg("Document processed successfully.");
      setpasecmsg(
        `${groupobj.childs.length} / ${groupobj.childs.length} Uploaded successfully.`
      );
      return { success: true };
    } catch (err) {
      setpatype("e");
      setpamsg("Something went wrong please try again.");
      setpasecmsg(`0 / ${groupobj.childs.length} Uploaded successfully.`);
      return { success: false };
    } finally {
      setTimeout(() => {
        setpastatus(false);
        setpatype("l");
        setpamsg("");
        setpasecmsg("");
      }, 4000);
    }
  };

  const startUpload = async () => {
    try {
      setpastatus(true);
      setpatype("l");
      setpamsg("Your documents are processing...");
      const uploadPromises = files.map(uploadFile);
      let uploadinfo = await Promise.all(uploadPromises);
      // Trigger the next function or API call after all successful uploads
      return { success: true, doc: uploadinfo };
    } catch (error) {
      return { success: false };
    } finally {
    }
  };

  const setSeperateFiles = async (files) => {
    setpamsg("Final processing is in progress please wait...");
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
        throw new Error("Failed to update group");
      }
      await response.json();
      setfilemeta((prevFiles) => [...files, ...prevFiles]);
      setcurrdoc(files[0]);
      setpatype("s");
      setpamsg("Document processed successfully.");
      setpasecmsg(`${files.length} / ${files.length} Uploaded successfully.`);
      return { success: true };
    } catch (err) {
      setpatype("e");
      setpamsg("Something went wrong please try again.");
      setpasecmsg(`0 / ${files.length} Uploaded successfully.`);
      return { success: false };
    } finally {
      setTimeout(() => {
        setpastatus(false);
        setpatype("l");
        setpamsg("");
        setpasecmsg("");
      }, 4000);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currdoc) {
        setloading(true);
        await fetchFileChats();
        updateLastAcces();
      }
    };

    fetchData();
  }, [currdoc]);

  const save_tofiles = () => {
    let fileName = `${currdoc.name.split(".")[0]}_chats.txt`;
    const blob = new Blob([JSON.stringify(SavedMessages)], { type: "text/plain" });
    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);

    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
        error,
        loading,
        setUserGroup,
        setSeperateFiles,
        startUpload,
        isresponding,
        setisresponding,
        progress,
        setprogress,
        handleFileChange,
        settinglang,
        setsettinglang,
        settingmode,
        setsettingmode,
        settinglength,
        setsettinglength,
        settingsource,
        setsettingsource,
        settingsize,
        setsettingsize,
        save_tofiles,
      }}
    >
      {props.children}
    </Rhscontext.Provider>
  );
};

export { Rhscontext, Rhsprovider };
