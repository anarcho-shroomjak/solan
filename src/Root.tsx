import {AppBar, Box, Button, Divider, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import {HistoryEdu, ReceiptLong, Settings} from "@mui/icons-material";
import {Outlet, useLocation, useNavigate, useNavigation} from "react-router-dom";

export default function Root() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  const location = useLocation();
  return (
    <>
      <AppBar elevation={0} color={'transparent'} position="static">
        <Toolbar>
          <Box mr={1}>
            <ReceiptLong/>
          </Box>
          <Typography onClick={() => navigate('/')} component="div" sx={{ flexGrow: 1, fontSize: '16px', fontWeight: 500, textTransform: 'uppercase', cursor: 'pointer' }}>
            Solan Bud
          </Typography>
          <Button color={location.pathname === '/settings' ? 'secondary' : 'primary'} onClick={() => navigate('/settings')} startIcon={<Settings/>} sx={{mr: 1}}>Settings</Button>
          <Button color={location.pathname === '/offers' ? 'secondary' : 'primary'} onClick={() => navigate('/offers')} startIcon={<HistoryEdu/>}>History</Button>
        </Toolbar>
      </AppBar>
      <Divider/>
      <Box m={matches ? 10 : 0} mt={5}>
        <Outlet/>
      </Box>
    </>
  )
}