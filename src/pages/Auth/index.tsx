import React, { useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { login } from "@/store/userStore";
import { ILogin } from "@/shared/type";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { addDoc, collection } from "firebase/firestore";
import db from "@/config/firebase";
import UserService from "@/services/user.service";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box className="flex flex-col items-center gap-3 grow">
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
          UserService.register({ userName, password });
          // navigate(ROUTER.ROOT);
        }}
      >
        Login
      </Button>
    </Box>
  );
}
