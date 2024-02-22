import background from "@/assets/icon/background.svg";
import googleIcon from "@/assets/icon/google-icon.svg";
import logo from "@/assets/icon/logo-login-icon.svg";
import { useLoginMutation } from "@/core/services/fakeUser.service";
import ROUTER from "@/shared/const/router.const";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import ModalExpireSession from "@/components/modal/modal-expire-session";
import { useAppSelector } from "@/core/store";
import { ModalType } from "@/shared/const/modal-type.const";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { type } = useAppSelector((state) => state.GlobalStore.modal);

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const loginApp = async () => {
    const isSuccess = await login().unwrap();
    if (isSuccess) {
      navigate(ROUTER.AUTH + ROUTER.REGISTER);
    } else {
      navigate(ROUTER.HOME);
    }
  };

  return (
    <Box
      className={`flex flex-col items-center gap-4 grow h-screen p-6 text-center`}
      sx={{ backgroundImage: `url(${background})` }}
    >
      <ModalExpireSession isOpen={type === ModalType.SESSION_EXPIRE} />
      <Box className="mb-8 mt-20">
        <img src={logo} />
      </Box>
      <Typography className="text-2-extra-large-semibold">Start now for free</Typography>
      <Typography className="mb-8">Your colleagues are already using and learning. Join them!</Typography>
      <IconButton
        onClick={loginApp}
        className={`p-4 gap-4 shadow-[0_1px_3px_0px_#A6AFC366] rounded-lg bg-white mb-2 cursor-pointer ${
          isSmallScreen ? "w-full" : "w-80"
        } `}
      >
        <img src={googleIcon} />
        <Typography className="text-base-semibold">Continue with Google</Typography>
      </IconButton>
      <Typography className="text-small-regular">
        By clicking Continue with, you agree to{" "}
        <Typography component="span" color="primary">
          MEA Terms of Use
        </Typography>
        {" and  "}
        <Typography component="span" color="primary">
          Privacy Policy.
        </Typography>
      </Typography>
    </Box>
  );
}
