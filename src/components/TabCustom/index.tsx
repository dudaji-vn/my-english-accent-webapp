import { Tabs, Tab } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { SyntheticEvent, useState } from "react";

interface TabsProp {
  tab: string[];
  callback: Function;
}
export default function TabCustom(props: TabsProp) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTabIndex = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    props.callback(newValue);
  };

  return (
    <Tabs
      sx={{
        marginTop: "16px",
        alignItems: "center",
        ".MuiTabScrollButton": {
          minHeight: "0",
          maxHeight: "40px",
        },
        ".MuiTabs-flexContainer": {
          gap: "8px",
          // marginTop: "16px",
        },
        ".MuiTabs-indicator": {
          background: "none",
        },
        button: {
          minHeight: "0",
          maxHeight: "40px",
          padding: "8px 16px",
          border: "1px solid #D0D5DD",
          borderRadius: "8px",
        },
        ".Mui-selected": {
          background: "#F9F5FF",
          border: "none",
        },
      }}
      value={tabIndex}
      onChange={handleChangeTabIndex}
      variant='scrollable'
      allowScrollButtonsMobile
      aria-label='scrollable tabs add user'
    >
      {props.tab.map((item) => {
        return <Tab key={nanoid()} label={item} />;
      })}
    </Tabs>
  );
}
