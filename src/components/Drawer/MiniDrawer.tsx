// import { ListItemText, Button, Drawer, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, Avatar } from "@mui/material";
// import { useState } from "react";
// import { data } from ".";
// import ChevronLeftIcon from "@/assets/icon/chevron-left-icon.svg";
// import logo from "@/assets/icon/logo-login-icon.svg";

// export default function MiniDrawer() {
//   const [open, setOpen] = useState(false);
//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const getList = () => (
//     <List>
//       {data.map((text, index) => (
//         <ListItem key={text.name} disablePadding sx={{ display: "block" }}>
//           <ListItemButton
//             sx={{
//               minHeight: 48,
//               justifyContent: open ? "initial" : "center",
//               px: 2.5,
//             }}
//           >
//             <ListItemIcon
//               sx={{
//                 minWidth: 0,
//                 mr: open ? 3 : "auto",
//                 justifyContent: "center",
//               }}
//             >
//               <Avatar
//                 src={text.icon}
//                 sx={{
//                   width: "24px",
//                   height: "24px",
//                 }}
//               ></Avatar>
//             </ListItemIcon>
//             <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List>
//   );

//   return (
//     <Box>
//       <Button onClick={() => setOpen(true)}>Click me</Button>
//       <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)} variant='persistent'>
//         <Box>
//           <Box sx={{ width: "120px", display: "flex" }}>
//             <img src={logo} style={{ width: "100%" }} />
//           </Box>
//         </Box>
//         {getList()}
//       </Drawer>
//     </Box>
//   );
// }
export default {};