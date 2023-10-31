import { useRef } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useLoginMutation } from "@/core/services";
import logo from "@/assets/icon/logo-login-icon.svg";
import background from "@/assets/icon/background.svg";
import { isFetchBaseQueryError } from "@/core";
import ROUTER from "@/shared/const/router.const";

export default function Login() {
  const elementDiv = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const loginApp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      const response = await signInWithPopup(auth, provider);
      if (response) {
        const googleId = response.user.uid;
        const email = response.user.email;
        if (googleId && email) {
          const loginResponse = await login({
            email,
            googleId,
          });

          if (isFetchBaseQueryError(loginResponse)) {
            navigate(ROUTER.REGISTER);
          } else {
            console.log("loginResponse", loginResponse);
            window.location.reload();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={`flex flex-col items-center gap-3 grow`} sx={{ backgroundImage: `url(${background})` }}>
      <div id='loginDiv' ref={elementDiv}></div>
      <Box className='mb-9 mt-20'>
        <img src={logo} />
      </Box>
      <Button
        className='p-3 text-base-medium'
        variant='contained'
        onClick={() => {
          loginApp();
        }}
      >
        Sign In
      </Button>
    </Box>
  );
}
