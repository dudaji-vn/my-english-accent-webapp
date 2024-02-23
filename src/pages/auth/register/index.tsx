import ChervonIcon from "@/assets/icon/chevron-left-icon.svg";
import CheckIcon from "@/assets/icon/circle-check-icon.svg";
import UncheckIcon from "@/assets/icon/circle-uncheck-icon.svg";
import CloseIcon from "@/assets/icon/close-icon.svg";
import FooterCard from "@/components/footer-btn";
import { useRegisterMutation } from "@/core/services";
import { Language, NATIONAL } from "@/core/type";
import ROUTER from "@/shared/const/router.const";
import persist from "@/shared/utils/persist.util";
import { Avatar, Box, Button, Checkbox, Container, InputBase, TextField, Typography } from "@mui/material";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { KeyboardEventHandler, useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";

function LanguageComponent({
  nation,
  selected,
  onClick,
  onKeyDown,
}: {
  nation: Language;
  selected: Language;
  onClick: Function;
  onKeyDown?: KeyboardEventHandler;
}) {
  const onSelectLecture = () => {
    onClick(nation);
  };

  return (
    <Box className="flex gap-2 p-3 bg-white divider items-center" onClick={onSelectLecture}>
      <ReactCountryFlag
        countryCode={nation}
        title={nation}
        svg
        cdnSuffix="svg"
        style={{
          fontSize: "2rem",
          lineHeight: "2rem",
          borderRadius: "50px",
          objectFit: "cover",
        }}
      />
      <Typography className="text-base-regular grow">{NATIONAL[nation]}</Typography>
      <Checkbox
        onKeyDown={onKeyDown}
        checked={nation === selected}
        icon={<Avatar src={UncheckIcon} alt="uncheck-icon" className="w-4 h-4" />}
        checkedIcon={<Avatar src={CheckIcon} alt="check-icon" className="w-4 h-4" />}
      />
    </Box>
  );
}

export default function Register() {
  const MAX_STEP = 1;
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [nickName, setNickName] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState<Language | null>(null);
  const [displayLanguage] = useState<string>("us");
  const provider = persist.getProviderInfo();

  const [registerAccount] = useRegisterMutation();

  const disableContinueBtn = useMemo(() => {
    if (step === 0) {
      return !provider || !nickName || nickName.trim().length === 0 || nickName.trim().length > 40;
    }

    if (step === MAX_STEP) {
      return !nativeLanguage;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, nickName, nativeLanguage]);

  const renderNational = (selected: Language | null, isNativeLanguage: boolean) => {
    return Object.keys(NATIONAL).map((item) => (
      <LanguageComponent
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disableContinueBtn) {
            onHandleNext();
          }
        }}
        nation={item as Language}
        selected={selected as Language}
        key={item}
        onClick={(value: Language) => {
          setNativeLanguage(() => value);
        }}
      />
    ));
  };

  const displayLayoutRegister = () => {
    let element;
    switch (step) {
      case 0:
        element = (
          <Box className="flex flex-col gap-8 w-full">
            <Typography component={"h6"} className="text-center">
              What’s your full name?
            </Typography>

            <TextField
              onKeyDown={(e) => {
                if (e.key === "Enter" && !disableContinueBtn) {
                  onHandleNext();
                }
              }}
              name="nickName"
              onChange={(e) => setNickName(() => e.target.value)}
              className=""
              value={nickName}
              placeholder="Your full name"
              error={nickName.length > 40}
              helperText={nickName.length > 40 && "Full name character limit – 40 characters"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "1px solid #DFE4EA",
                  },
                  "&:hover fieldset": {
                    borderWidth: "1px",
                  },
                },
              }}
            />
          </Box>
        );
        break;
      case 1:
        element = (
          <Box className="flex flex-col w-full">
            <Typography component={"h6"} className="text-center mb-8 self-center w-80">
              What’s your native language?
            </Typography>
            {renderNational(nativeLanguage, true)}
          </Box>
        );
        break;
    }
    return element;
  };

  const onHandleBack = () => {
    if (step === 0) {
      navigate(ROUTER.AUTH + ROUTER.LOGIN);
    } else {
      setStep((pre) => pre - 1);
    }
  };

  const onHandleNext = () => {
    if (step === MAX_STEP && provider) {
      if (displayLanguage && nativeLanguage) {
        const payload = {
          ...provider,
          displayLanguage,
          nativeLanguage,
          nickName,
        };
        registerAccount(payload)
          .unwrap()
          .then((resolve) => {
            persist.saveToken(resolve.token);
            persist.saveMyInfo(resolve.user);
            navigate(ROUTER.ROOT);
          })
          .catch((error) => console.error(error));
      }
    } else {
      setStep((pre) => pre + 1);
    }
  };

  return (
    <Box className={`flex flex-col gap-16 h-screen bg-gray-50`}>
      <Box className="flex items-center divider p-4 bg-white" onClick={onHandleBack}>
        <Avatar src={step === 0 ? CloseIcon : ChervonIcon} className="w-6 h-6" />
        <Typography className="text-large-semibold">Setup your account</Typography>
      </Box>
      <Container className="max-w-[600px] flex flex-col gap-4 items-center grow">{displayLayoutRegister()}</Container>
      <FooterCard classes="justify-center">
        <Button
          className="p-3 text-base-medium md:max-w-fit"
          variant="contained"
          fullWidth
          onClick={onHandleNext}
          disabled={disableContinueBtn}
        >
          Continue
        </Button>
      </FooterCard>
    </Box>
  );
}
