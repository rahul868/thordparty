import styles from "@/styles/home/rhs/chatinput.module.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Rhscontext } from "@/context/provider";
import Popuplist from "./popuplist";
import { Gcommoncontext } from "@/context/common_global";
export default function Rchatinput() {
  const [query, setquery] = useState("");
  const { setSavedMessages } = useContext(Rhscontext);

  const [isresponding, setisresponding] = useState(false);

  const { currdoc, user } = useContext(Gcommoncontext);
  const chat_opts = [
    {
      name: "Highlight",
      svg: (
        <svg
          fill="#666"
          className="topbarStar"
          display="block"
          viewBox="0 0 20 20"
          style={{
            width: 20,
            height: 20,
            WebkitFlexShrink: "0",
            MsFlexShrink: "0",
            flexShrink: "0",
          }}
        >
          <path d="M4.773 18.064c.375.282.836.188 1.367-.195l4.063-2.984 4.055 2.984c.53.383.992.477 1.367.195.367-.28.445-.742.234-1.359l-1.601-4.765 4.093-2.938c.532-.375.75-.797.602-1.234-.148-.438-.563-.657-1.219-.649l-5.016.04-1.53-4.798c-.204-.625-.524-.96-.985-.96-.469 0-.79.335-.992.96L7.687 7.158 2.664 7.12c-.656-.008-1.07.211-1.219.64-.148.446.078.868.602 1.243L6.14 11.94 4.54 16.704c-.211.617-.133 1.078.234 1.36zm1.399-1.914c-.016-.015-.016-.023 0-.07l1.476-4.164c.133-.39.094-.625-.273-.867l-3.649-2.5c-.03-.024-.047-.04-.03-.055.007-.023.023-.023.062-.023l4.421.101c.407.016.618-.117.735-.515l1.242-4.235c.016-.047.024-.062.047-.062.016 0 .031.015.039.062l1.242 4.235c.117.398.328.53.742.515l4.414-.101c.047 0 .063 0 .07.023.008.016-.007.031-.038.055l-3.649 2.5c-.36.242-.406.476-.265.867l1.468 4.164c.016.047.016.055 0 .07-.008.016-.03.008-.062-.015l-3.5-2.703c-.328-.25-.602-.25-.93 0l-3.5 2.703c-.031.023-.047.031-.062.015z"></path>
        </svg>
      ),
      callback: applysentquery,
    },
    {
      name: "Sentiment",
      svg: (
        <svg
          fill="rgba(55, 53, 47, 0.85)"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: 19,
            height: 19,
            WebkitFlexShrink: "0",
            MsFlexShrink: "0",
            flexShrink: "0",
          }}
          version="1.1"
          viewBox="0 0 122.88 122.88"
          xmlSpace="preserve"
        >
          <path d="M77.1 47.09a2.66 2.66 0 01-3.29 1.8 2.645 2.645 0 01-1.79-3.29c.95-3.22 2.71-5.74 4.93-7.52 2.2-1.77 4.9-2.8 7.72-2.96 2.76-.16 5.61.51 8.21 2.07 2.77 1.66 5.24 4.32 6.95 8.05a2.649 2.649 0 11-4.82 2.2c-1.23-2.68-2.96-4.57-4.86-5.71-1.66-.99-3.47-1.42-5.2-1.32-1.71.1-3.35.71-4.71 1.79-1.39 1.13-2.51 2.77-3.14 4.89zm24.43 5.09c-.79 50.6-79.69 50.6-80.49 0 24.42 29.63 50.82 33.77 80.49 0zM61.44 0v.01c16.97 0 32.33 6.87 43.44 17.98s17.98 26.47 17.98 43.44h.01v.01h-.01c0 16.97-6.87 32.33-17.98 43.44s-26.47 17.98-43.44 17.98v.01h-.01v-.01c-16.97 0-32.33-6.87-43.44-17.98C6.89 93.77.02 78.41.02 61.44H0v-.01h.02C.02 44.47 6.89 29.11 18 18S44.47.02 61.44.01V0zm0 7.83v.02h-.01l.01-.02c-14.79 0-28.19 6.01-37.9 15.71-9.7 9.71-15.71 23.11-15.71 37.89h.01v.01h-.01c0 14.79 6.01 28.19 15.71 37.89 9.71 9.71 23.11 15.72 37.89 15.72v-.02h.01v.02c14.79 0 28.19-6.01 37.89-15.71 9.71-9.71 15.71-23.11 15.71-37.9h-.01v-.01h.02c0-14.78-6.01-28.18-15.71-37.89-9.71-9.71-23.11-15.71-37.9-15.71zm-33.7 39.26a2.655 2.655 0 01-3.29 1.8 2.645 2.645 0 01-1.79-3.29c.95-3.22 2.71-5.74 4.93-7.52 2.2-1.76 4.91-2.8 7.72-2.96 2.76-.16 5.61.51 8.21 2.07 2.77 1.66 5.24 4.32 6.95 8.05a2.649 2.649 0 11-4.82 2.2c-1.23-2.68-2.95-4.57-4.86-5.71-1.66-.99-3.46-1.42-5.2-1.32-1.71.1-3.35.71-4.71 1.79-1.38 1.13-2.51 2.77-3.14 4.89z"></path>
        </svg>
      ),
      callback: applysentquery,
    },
    {
      name: "Summarize",
      svg: (
        <svg
          fill="rgba(55, 53, 47, 0.85)"
          className="topbarCommentFilled"
          display="block"
          viewBox="0 0 20 20"
          style={{
            width: 20,
            height: 20,
            WebkitFlexShrink: "0",
            MsFlexShrink: "0",
            flexShrink: "0",
          }}
        >
          <path d="M5.938 18.484c.445 0 .773-.218 1.312-.695l2.68-2.36h4.703c2.351 0 3.672-1.359 3.672-3.679V5.68c0-2.32-1.32-3.68-3.672-3.68H4.672C2.328 2 1 3.36 1 5.68v6.07c0 2.328 1.367 3.68 3.617 3.68h.32v1.914c0 .695.368 1.14 1 1.14zm.39-1.75v-2.226c0-.461-.203-.64-.64-.64h-.961c-1.47 0-2.172-.743-2.172-2.165V5.727c0-1.422.703-2.165 2.172-2.165h9.859c1.46 0 2.164.743 2.164 2.165v5.976c0 1.422-.703 2.164-2.164 2.164H9.844c-.477 0-.711.078-1.04.422l-2.476 2.445zM5.68 6.828h7.867a.495.495 0 00.484-.5.485.485 0 00-.484-.476H5.68a.478.478 0 00-.477.476c0 .274.211.5.477.5zm0 2.477h7.867a.488.488 0 000-.977H5.68a.485.485 0 00-.477.485c0 .273.211.492.477.492zm0 2.484h5.125a.482.482 0 00.484-.484.484.484 0 00-.484-.492H5.68a.482.482 0 00-.477.492c0 .265.211.484.477.484z"></path>
        </svg>
      ),
      callback: applysentquery,
    },
    {
      name: "Critique",
      svg: (
        <svg
          fill="rgba(55, 53, 47, 0.85)"
          className="duplicate"
          display="block"
          viewBox="0 0 16 16"
          style={{
            width: 16,
            height: 16,
            WebkitFlexShrink: "0",
            MsFlexShrink: "0",
            flexShrink: "0",
          }}
        >
          <path d="M2.839 12.152H4v1.033c0 1.456.759 2.214 2.242 2.214h6.918c1.477 0 2.242-.758 2.242-2.214V6.212c0-1.456-.765-2.215-2.242-2.215H12V2.965c0-1.456-.766-2.215-2.242-2.215H2.839C1.362.75.597 1.502.597 2.965V9.93c0 1.463.765 2.221 2.242 2.221zm.082-1.34c-.636 0-.984-.328-.984-.99v-6.74c0-.664.348-.999.984-.999h6.76c.63 0 .985.335.985.998v.916H6.243c-1.483 0-2.242.759-2.242 2.215v4.6h-1.08zm3.397 3.248c-.635 0-.977-.329-.977-.992v-6.74c0-.663.342-.991.977-.991h6.761c.629 0 .984.328.984.991v6.74c0 .663-.355.992-.984.992H6.32z"></path>
        </svg>
      ),
      callback: applysentquery,
    },
    {
      name: "Keywords",
      svg: (
        <svg
          fill="rgba(55, 53, 47, 0.85)"
          className="loop"
          display="block"
          viewBox="0 0 16 16"
          style={{
            width: 16,
            height: 16,
            WebkitFlexShrink: "0",
            MsFlexShrink: "0",
            flexShrink: "0",
          }}
        >
          <path d="M5.804 3.123c.006.38.254.622.673.622h4.887c.59 0 .914.305.914.92v6.628l-.901-.978-.514-.514c-.267-.254-.629-.273-.895-.013-.254.26-.248.635.012.895l2.165 2.158c.476.47 1.022.47 1.498 0l2.165-2.158c.26-.26.266-.635.012-.895-.266-.26-.628-.241-.895.013l-.514.514-.895.971V4.564c0-1.358-.71-2.063-2.082-2.063H6.477c-.42 0-.68.241-.673.622zM.186 7.06c.26.266.622.247.889-.013l.52-.508.889-.971v6.722c0 1.359.71 2.063 2.082 2.063h4.957c.42 0 .68-.241.673-.622-.006-.387-.254-.622-.673-.622h-4.88c-.591 0-.915-.311-.915-.927V5.554l.895.984.52.508c.26.26.629.28.89.013.26-.26.253-.629-.013-.89L3.855 4.013c-.476-.476-1.016-.476-1.492 0L.2 6.17c-.267.26-.273.628-.013.889z"></path>
        </svg>
      ),
      callback: applysentquery,
    },
    {
      name: "Hashtags",
      svg: (
        <svg
          fill="rgba(55, 53, 47, 0.85)"
          className="loop"
          style={{
            width: 16,
            height: 16,
            WebkitFlexShrink: "0",
            MsFlexShrink: "0",
            flexShrink: "0",
          }}
          version="1.1"
          viewBox="0 0 99.88 122.88"
          xmlSpace="preserve"
        >
          <path d="M36.92 4.32c.6-2.89 3.43-4.74 6.32-4.14 2.89.6 4.74 3.43 4.14 6.32l-6.09 29.31h28.77l6.56-31.55c.6-2.89 3.43-4.74 6.32-4.14 2.89.6 4.74 3.43 4.14 6.32l-6.11 29.38h13.56a5.35 5.35 0 110 10.7H78.74l-6.73 32.35h22.51a5.35 5.35 0 110 10.7H69.79l-6.04 29.05a5.341 5.341 0 01-6.32 4.14 5.341 5.341 0 01-4.14-6.32l5.59-26.88H30.1l-6.01 28.92a5.341 5.341 0 01-6.32 4.14 5.341 5.341 0 01-4.14-6.32l5.56-26.75H5.35C2.4 89.57 0 87.17 0 84.22c0-2.96 2.4-5.35 5.35-5.35h16.06l6.73-32.35H5.35C2.4 46.52 0 44.12 0 41.16s2.4-5.35 5.35-5.35h25.02l6.55-31.49zM61.1 78.86l6.73-32.35H39.05l-6.73 32.35H61.1z"></path>
        </svg>
      ),
      callback: applysentquery,
    },
    {
      name: "Place & Names",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="rgba(55, 53, 47, 0.85)"
          className="loop"
          style={{
            width: 16,
            height: 16,
            WebkitFlexShrink: "0",
            MsFlexShrink: "0",
            flexShrink: "0",
          }}
          version="1.1"
          viewBox="0 0 92.26 122.88"
          xmlSpace="preserve"
        >
          <path d="M47.49 116.85c6.31-4.01 11.98-8.87 16.92-14.29 10.73-11.75 17.97-26.11 20.87-40.2 2.88-13.91 1.52-27.54-4.85-38.06-1.81-3.02-4.08-5.78-6.78-8.26-7.74-7.05-16.6-10.41-25.52-10.5-9.37-.07-18.87 3.45-27.27 10.14-3.58 2.86-6.53 6.15-8.82 9.78-5.9 9.28-7.69 20.8-5.74 32.85 1.97 12.23 7.78 25.02 17.04 36.61 6.44 8.08 14.54 15.58 24.18 21.91l-.03.02zm-1.36-95.69c7.05 0 13.45 2.86 18.06 7.49 4.63 4.63 7.49 11 7.49 18.06 0 7.05-2.86 13.45-7.49 18.06-4.63 4.63-11 7.49-18.06 7.49a25.42 25.42 0 01-18.06-7.49c-4.63-4.63-7.49-11-7.49-18.06 0-7.05 2.86-13.45 7.49-18.06 4.63-4.63 11-7.49 18.06-7.49zm14.38 11.17a20.337 20.337 0 00-14.38-5.97 20.16 20.16 0 00-14.38 5.97 20.337 20.337 0 00-5.97 14.38c0 5.63 2.27 10.71 5.97 14.38 3.67 3.67 8.78 5.97 14.38 5.97 5.63 0 10.71-2.27 14.38-5.97 3.67-3.67 5.97-8.78 5.97-14.38-.01-5.63-2.27-10.71-5.97-14.38zm8.01 73.94c-5.6 6.12-12.09 11.61-19.42 16.06-.88.66-2.13.75-3.13.11-10.8-6.87-19.85-15.13-26.99-24.09C9.15 86.02 2.94 72.34.83 59.16-1.32 45.8.69 32.96 7.34 22.48a45.03 45.03 0 0110.07-11.14C26.78 3.88 37.51-.07 48.17 0c10.28.09 20.42 3.9 29.22 11.93 3.09 2.81 5.67 5.99 7.78 9.48 7.15 11.77 8.69 26.81 5.56 42.01-3.11 15.04-10.8 30.33-22.18 42.8l-.03.05z"></path>
        </svg>
      ),
      callback: applysentquery,
    },
  ];

  const sendPrompt = async (promptobj) => {
    setSavedMessages((prevMessages) => [...prevMessages, promptobj]);
    setisresponding(true);
    try {
      // Simulate API call for user file metadata
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat?email=${user.email}&prompt=${
          promptobj.summary
        }&fileid=${currdoc.id}&filename=${currdoc.name}&chat_type=${"QnA"}`
      );
      if (!response.ok) {
        throw new Error("Failed to update group");
      }
      const result = await response.json();
      setSavedMessages((prevMessages) => [...prevMessages, result]);
      return { success: true };
    } catch (err) {
      return { success: false };
    } finally {
      setisresponding(false);
    }
  };

  function sendenterquery(e, isbtn) {
    if (e.key == "Enter" || isbtn) {
      let obj = {
        isChatUI: false,
        re_type: "string",
        timeStamp: Date.now().toString(),
        summary: query,
        source: "string",
      };
      sendPrompt(obj);
      setquery("");
    }
  }

  function sendbtnquery(e) {
    let obj = {
      isChatUI: false,
      re_type: "string",
      timeStamp: Date.now().toString(),
      summary: query,
      source: "string",
    };
    sendPrompt(obj);
    setquery("");
  }

  useEffect(() => {
    document.querySelector("[data-chat-input]").autofocus = true;
  },[currdoc]);

  function applysentquery(sent) {
    // API call
    let obj = {
      isChatUI: false,
      re_type: "string",
      timeStamp: Date.now().toString(),
      summary: query || sent.name,
      source: "string",
    };
    sendPrompt(obj);
    setquery("");
  }

  return (
    <div data-g-nav-container className={styles.chatinput_wrapper}>
      {isresponding ? (
        <div className={styles.server_response_container}>
          <div className={styles.server_response_content}>
            Server is responding...
          </div>
        </div>
      ) : (
        <div className={styles.chatinput_subwrapper}>
          <div className={styles.msg_firstsec}>
            <div data-g-opt-flyer className={styles.option_flyer_wrapper}>
              <div className={styles.option_flyer_subwrapper}>
                <Popuplist list={chat_opts} />
              </div>
            </div>
            <div data-g-chatsec className={styles.msg_input_profile}>
              <svg
                className="settingsIntegration"
                display="block"
                viewBox="0 0 20 20"
                style={{
                  width: 20,
                  height: 20,
                  WebkitFlexShrink: "0",
                  MsFlexShrink: "0",
                  flexShrink: "0",
                  fill: "white",
                }}
              >
                <path d="M4.633 9.42h3.154c1.093 0 1.632-.532 1.632-1.656V4.655C9.42 3.532 8.88 3 7.787 3H4.633C3.532 3 3 3.532 3 4.655v3.109c0 1.124.532 1.655 1.633 1.655zm7.58 0h3.162C16.468 9.42 17 8.887 17 7.763V4.655C17 3.532 16.468 3 15.374 3h-3.16c-1.094 0-1.633.532-1.633 1.655v3.109c0 1.124.539 1.655 1.633 1.655zm-7.58-1.251c-.262 0-.382-.135-.382-.405V4.648c0-.27.12-.405.382-.405h3.146c.262 0 .39.135.39.405v3.116c0 .27-.128.405-.39.405H4.633zm7.588 0c-.262 0-.39-.135-.39-.405V4.648c0-.27.128-.405.39-.405h3.146c.262 0 .39.135.39.405v3.116c0 .27-.128.405-.39.405h-3.146zM4.633 17h3.154c1.093 0 1.632-.532 1.632-1.655v-3.109c0-1.124-.539-1.655-1.632-1.655H4.633C3.532 10.58 3 11.112 3 12.236v3.109C3 16.468 3.532 17 4.633 17zm7.58 0h3.162C16.468 17 17 16.468 17 15.345v-3.109c0-1.124-.532-1.655-1.626-1.655h-3.16c-1.094 0-1.633.531-1.633 1.655v3.109c0 1.123.539 1.655 1.633 1.655zm-7.58-1.25c-.262 0-.382-.128-.382-.398v-3.116c0-.277.12-.405.382-.405h3.146c.262 0 .39.128.39.405v3.116c0 .27-.128.397-.39.397H4.633zm7.588 0c-.262 0-.39-.128-.39-.398v-3.116c0-.277.128-.405.39-.405h3.146c.262 0 .39.128.39.405v3.116c0 .27-.128.397-.39.397h-3.146z"></path>
              </svg>
            </div>
            <input
              placeholder="Type you question here..."
              data-chat-input
              id={styles.message_input}
              autoFocus
              value={query}
              type="text"
              onChange={(e) => setquery(e.target.value)}
              onKeyDown={(e) => sendenterquery(e)}
            />
          </div>

          {query == "" ? (
            <div
              style={{
                background: "#f1f1f1",
                cursor: "not-allowed",
                userSelect: "none",
                width: 30,
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{
                  width: 20,
                  height: 20,
                  WebkitFlexShrink: "0",
                  MsFlexShrink: "0",
                  flexShrink: "0",
                  fill: "white",
                }}
              >
                <path
                  fill="#666"
                  d="M9.71 18.293a1 1 0 001.415 0l4.887-4.892a2 2 0 000-2.828l-4.89-4.89a1 1 0 00-1.415 1.414l4.186 4.185a1 1 0 010 1.415L9.71 16.879a1 1 0 000 1.414z"
                ></path>
              </svg>
            </div>
          ) : (
            <div
              onClick={(e) => sendbtnquery(e)}
              style={{
                background: "dodgerblue",
                borderRadius: 5,
                cursor: "pointer",
                width: 30,
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                style={{
                  width: 20,
                  height: 20,
                  WebkitFlexShrink: "0",
                  MsFlexShrink: "0",
                  flexShrink: "0",
                  fill: "white",
                  transition: "200ms",
                }}
              >
                <path
                  fill="#white"
                  d="M9.71 18.293a1 1 0 001.415 0l4.887-4.892a2 2 0 000-2.828l-4.89-4.89a1 1 0 00-1.415 1.414l4.186 4.185a1 1 0 010 1.415L9.71 16.879a1 1 0 000 1.414z"
                ></path>
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
