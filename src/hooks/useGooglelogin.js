import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const useGooglelogin = () => {
  const login = useGoogleLogin({
    onSuccess: async (coderesponse) => {
      console.log(coderesponse);
      const data = await googleloginfunction(coderesponse.access_token);
      console.log(data);
      if (data) {
        // window.location.replace("/home");
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return { login };
};

// get result token with user
const googleloginfunction = async (access_token) => {
  try {
    console.log(access_token);
    const getinfo = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );

    let googleresult = await getinfo.data;
    console.log(googleresult);
    return googleresult;
  } catch (error) {
    console.log(error);
  }
};

export default useGooglelogin;
