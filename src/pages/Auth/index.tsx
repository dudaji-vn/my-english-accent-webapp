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

export default function Login() {
  const elementDiv = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  const [login, { data }] = useLoginMutation();

  const loginApp = async () => {
    // await login({
    //   userName,
    //   password,
    // });

    try {
      const res = await login();
      // res = true => redirect => home
      // window.location.reload();
      
      // res = false =>redirect => register
    } catch (error) {
      console.log(error);
    }
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
      <div id='loginDiv' ref={elementDiv}></div>
      <Box className='mb-9 mt-20'>
        <img src={logo} />
      </Box>
      <Container className='flex flex-col gap-4'>
        <Box className='flex flex-col gap-2'>
          <Typography htmlFor='email' component={"label"} className='text-base-medium'>
            Account
          </Typography>

          {/* <InputBase
            id='email'
            className='px-5 py-3 border border-stroke border-solid rounded-md bg-white text-base-regular'
            value={userName}
            placeholder='Your account'
            onChange={(e) => setUserName(() => e.target.value)}
          /> */}
        </Box>
        <Box className='flex flex-col gap-2'>
          <Typography htmlFor='password' component={"label"} className='text-base-medium'>
            Password
          </Typography>
          {/* <InputBase
            id='password'
            className='px-5 py-3 border border-stroke border-solid rounded-md bg-white text-base-regular'
            value={password}
            placeholder='Your password'
            onChange={(e) => setPassword(() => e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                loginApp();
              }
            }}
          /> */}
        </Box>
        {/* <TextField label='Password' variant='outlined' onChange={(e) => setPassword(() => e.target.value)} /> */}
        <Button
          className='p-3 text-base-medium'
          variant='contained'
          onClick={() => {
            // dispatch(login({ user: userName, password: password } as ILogin));
            // UserController.login({ userName, password });
            loginApp();
          }}
        >
          Sign In
        </Button>
      </Container>
    </Box>
  );
}
