import { StageExercise } from "@/shared/type";
import { Tabs, Tab } from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface TabsProp {
  tab: string[];
  callback: Function;
  tabIndex: StageExercise;
}
export default function TabCustom(props: TabsProp) {
  const handleChangeTabIndex = (event: SyntheticEvent, newValue: number) => {
    props.callback(newValue);
  };
  return (
    <Tabs
      sx={{
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
          border: "1px solid #DDD6FE",
          borderRadius: "8px",
        },
        ".Mui-selected": {
          background: "#DDD6FE",
          borderColor: "#DDD6FE",
        },
      }}
      value={props.tabIndex}
      onChange={handleChangeTabIndex}
      variant='scrollable'
      scrollButtons={false}
      allowScrollButtonsMobile
      aria-label='scrollable tabs add user'
    >
      {props.tab.map((item) => {
        return <Tab className="hover:bg-purple-200" key={item} label={item} />;
      })}
    </Tabs>
  );
}
