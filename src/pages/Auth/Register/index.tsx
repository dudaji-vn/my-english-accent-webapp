import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, InputBase, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useLoginMutation } from "@/core/services";
import logo from "@/assets/icon/logo-login-icon.svg";
import background from "@/assets/icon/background.svg";
import persist from "@/shared/utils/persist.util";
import { UserResponseType } from "@/core/type";

export default function Register() {
  const elementDiv = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data }] = useLoginMutation();
  const loginApp = async () => {
    // await login({
    //   userName,
    //   password,
    // });
  };

  const register = async () => {
    await createUserWithEmailAndPassword(auth, "thien@gmail.com", "password")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  // useEffect(() => {
  //   if (data) {
  //     persist.saveMyInfo(data);
  //   }
  // }, [data]);

  return (
    <Box className={`flex flex-col items-center gap-3 grow`} sx={{ backgroundImage: `url(${background})` }}>
      <Container className='flex flex-col gap-4 items-center justify-center'>
        {/* step 1 */}
        {/* <Box className='flex flex-col gap-8  w-full'>
          <Typography component={"h6"} className='text-center'>
            What’s your nick name?
          </Typography>

          <InputBase
            className='px-5 py-3 border border-stroke border-solid rounded-md bg-white text-base-regular'
            value={userName}
            placeholder='Your nick name'
            onChange={(e) => setUserName(() => e.target.value)}
          />
        </Box> */}
        {/* step 2 */}
        <Box className='flex flex-col gap-8  w-full'>
          <Typography component={"h6"} className='text-center'>
            What’s your native language?
          </Typography>

          <InputBase
            className='px-5 py-3 border border-stroke border-solid rounded-md bg-white text-base-regular'
            value={userName}
            placeholder='Your nick name'
            onChange={(e) => setUserName(() => e.target.value)}
          />
        </Box>
      </Container>
      {/* <Button
          className='p-3 text-base-medium'
          variant='contained'
          onClick={() => {
            loginApp();
          }}
        >
          Signup
        </Button> */}
    </Box>
  );
}
