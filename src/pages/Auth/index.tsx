import React from "react";
import { useAppDispatch } from "@/store/hook";
import { login } from "@/store/userStore";
import { ILogin } from "@/shared/type";

export default function Login() {
  const dispatch = useAppDispatch();
  return (
    <div>
      Login Page
      <button
        onClick={() =>
          dispatch(login({ user: "admin", password: "123456" } as ILogin))
        }
      >
        Login
      </button>
    </div>
  );
}
