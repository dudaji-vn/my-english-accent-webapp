import { useRef, useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/config/firebase";

export default function Login() {
  const elementDiv = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const login = () => {
    // signInWithEmailAndPassword(auth, "thien@gmail.com", "password")
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     navigate("/home");
    //     console.log(user);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage);
    //   });

    //TODO: NEED REWORK
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // // The signed-in user info.
        const user = result.user;
        const { displayName, email } = user;
        // dispatch(saveToken({ token: token! }));
        navigate("/login");
        // // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(error);
      });
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

  return (
    <Box className="flex flex-col items-center gap-3 grow">
      <div id="loginDiv" ref={elementDiv}></div>
      <Typography className="text-base-medium">Login Page</Typography>
      <TextField
        id="outlined-basic"
        label="User Name"
        variant="outlined"
        onChange={(e) => setUserName(() => e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onChange={(e) => setPassword(() => e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => {
          // dispatch(login({ user: userName, password: password } as ILogin));
          // UserController.login({ userName, password });
          login();
          navigate(ROUTER.ROOT);
        }}
      >
        Login
      </Button>
      <Button variant="contained" onClick={register}>
        Register
      </Button>
    </Box>
  );
}
