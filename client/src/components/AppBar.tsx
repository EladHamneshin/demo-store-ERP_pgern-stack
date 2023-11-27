import { MouseEvent, useState } from 'react';
import {
  AppBar as MUIAppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import SearchField from './SearchField';
import usersAPI from '../api/userAPI.ts';
import ROUTES from '../routes/routes.ts';
import { toastError } from '../utils/toastUtils.ts';
import { useAppSelector, useAppDispatch } from '../utils/store/hooks.ts';
import { saveEmail } from '../utils/store/emailSlice.ts';


const AppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const {email} = useAppSelector((state) => state.email);
  const dispatch = useAppDispatch();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    try {
      await usersAPI.logoutUser();
      dispatch(saveEmail(''));
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toastError((err as Error).message);
    }
  };

  return (
    <MUIAppBar position="static" color='primary'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          onClick={() => navigate('/')}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <StorefrontIcon sx={{ marginRight: 2 }} />
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            Demo Store Inventory
          </Typography>
          <SearchField />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {email && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={'email'} disabled>
                <Typography>{email}</Typography>
              </MenuItem>
              <MenuItem key={'logOut'} onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>}
        </Box>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
