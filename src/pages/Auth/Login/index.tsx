import background from "@/assets/icon/background.svg";
import logo from "@/assets/icon/logo-login-icon.svg";
import { useLoginMutation } from "@/core/services/fakeUser.service";
import ROUTER from "@/shared/const/router.const";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const loginApp = async () => {
    const isSuccess = await login().unwrap();
    if (isSuccess) {
      navigate(ROUTER.AUTH + ROUTER.REGISTER);
    } else {
      window.location.reload();
    }
  };

  return (
    <Box className={`flex flex-col items-center gap-3 grow h-screen`} sx={{ backgroundImage: `url(${background})` }}>
      <Box className='mb-9 mt-20'>
        <img src={logo} />
      </Box>
      <Button className='p-3 text-base-medium' variant='contained' onClick={loginApp}>
        Sign In
      </Button>
    </Box>
  );
}
