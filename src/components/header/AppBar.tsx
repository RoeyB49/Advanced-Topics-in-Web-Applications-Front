import React, { useState, useEffect } from "react";
import {
  AppBar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Toolbar,
  Container,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/user_api";

function isConnected() {
  const username = localStorage.getItem("username");
  return username !== null && username.trim() !== "";
}

const ResponsiveAppBar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(
    localStorage.getItem("imageUrl")
  );
  const [connected, setConnected] = useState<boolean>(isConnected());
  const navigate = useNavigate();

  // Update connection status and imageUrl
  useEffect(() => {
    const checkStatus = () => {
      const status = isConnected();
      setConnected(status);

      if (status) {
        const storedImageUrl = localStorage.getItem("imageUrl");
        if (storedImageUrl && storedImageUrl !== imageUrl) {
          setImageUrl(storedImageUrl);
        }
      }
    };

    const intervalId = setInterval(checkStatus, 1000);
    return () => clearInterval(intervalId);
  }, [imageUrl]);

  const handleNavClick = (page: string) => {
    switch (page) {
      case "Feed":
        navigate("/feed");
        break;
      case "Logout":
        logout();
        localStorage.removeItem("imageUrl");
        localStorage.removeItem("username");
        setConnected(false);
        navigate("/");
        break;
      default:
        break;
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (connected) {
      setAnchorElUser(event.currentTarget);
    } else {
      navigate("/");
    }
  };

  const handleCloseUserMenu = (setting: string) => {
    if (setting === "My Profile" && connected) {
      navigate("/profilePage");
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        width: "100%",
        background: "linear-gradient(to right, #4a752c,rgb(208, 245, 180))",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 68 }}>
          {/* Logo and brand */}
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <LocationOnIcon
              sx={{
                mr: 1,
                fontSize: 32,
                color: "#fff",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => navigate(connected ? "/feed" : "/")}
              sx={{
                // ... existing styles
                cursor: "pointer", // Add this to show it's clickable
              }}
            >
              LostAndFound
            </Typography>
          </Box>

          {/* Desktop navigation buttons */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              mr: 2,
            }}
          >
            {connected && (
              <>
                <Button
                  onClick={() => handleNavClick("Feed")}
                  sx={{
                    color: "white",
                    mx: 1,
                    px: 2,
                    py: 0.7,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                    textTransform: "none",
                  }}
                  startIcon={<HomeIcon />}
                >
                  <Typography fontWeight={500}>Feed</Typography>
                </Button>
              </>
            )}
          </Box>

          {/* User avatar */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={connected ? "User Settings" : "Sign In"}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  border: connected
                    ? "2px solid rgba(255,255,255,0.7)"
                    : "none",
                  borderRadius: "50%",
                  padding: "2px",
                }}
              >
                {connected && imageUrl ? (
                  <Avatar
                    alt="User Avatar"
                    src={imageUrl}
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  >
                    <AccountCircleIcon />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            {connected && (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    borderRadius: 2,
                    minWidth: 180,
                    overflow: "visible",
                    "& .MuiMenuItem-root": {
                      py: 1.2,
                    },
                  },
                }}
              >
                <MenuItem onClick={() => handleCloseUserMenu("My Profile")}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccountCircleIcon
                      sx={{ mr: 1.5, fontSize: 20, color: "#4a752c" }}
                    />
                    <Typography fontWeight={500}>My Profile</Typography>
                  </Box>
                </MenuItem>
                <MenuItem onClick={() => handleNavClick("Logout")}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LogoutIcon
                      sx={{ mr: 1.5, fontSize: 20, color: "#f44336" }}
                    />
                    <Typography fontWeight={500} color="#f44336">
                      Logout
                    </Typography>
                  </Box>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
