import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from "react-router-dom";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  const navigate = useNavigate()
  return (
    <Tab
      component="a"
      onClick={(event) => {
        const a = { ...props }
        navigate(a.href)
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };
  return (
    <Box sx={{ width: '100%', paddingTop: "20px" }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" orientation="vertical" >
        <LinkTab label="Faculty Management" href="/admin/faculty-management" sx={{
          color: "#ffff"
        }} icon={<ReceiptLongIcon sx={{
          color: "#ffff"
        }} />} />
        <LinkTab label="Medical Records" href="/admin/create-medical-records" sx={{
          color: "#ffff"
        }} icon={<AssignmentIcon sx={{
          color: "#ffff"
        }} />} />
        <LinkTab label="User Management" href="/admin/user-management" sx={{
          color: "#ffff"
        }} icon={<AdminPanelSettingsIcon sx={{
          color: "#ffff"
        }} />} />
        <LinkTab label="Home" href="/" sx={{
          color: "#ffff"
        }} icon={<HomeIcon sx={{
          color: "#ffff"
        }} />} />
      </Tabs>
    </Box>
  );
}
