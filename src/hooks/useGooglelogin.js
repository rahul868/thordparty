import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const useGooglelogin = (callback) => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (coderesponse) => {
      let data = await googleloginfunction(coderesponse.access_token);
      return callback(data);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return { googleLogin };
};

// get result token with user
const googleloginfunction = async (access_token) => {
  try {
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
    return googleresult;
  } catch (error) {
  }
};

export default useGooglelogin;
