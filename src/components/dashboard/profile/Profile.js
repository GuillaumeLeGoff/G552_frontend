import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
function Profile() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#203038",
    boxShadow: 24,
    p: 4,
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleCancel = () => {
    setIsEditMode(false);
    // reset the user information here
  };

  const handlePasswordChange = () => {
    // change the user's password here
  };

  return (
    <Grid item xs={12}>
      <Paper>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ ml: 2 }}>
              <AccountBoxIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6" color="white" sx={{ padding: 2 }}>
              Media
            </Typography>
          </div>
        </Stack>
        <Box
          sx={{ minHeight: "calc(94vh - 120px)", overflowY: "scroll" }}
          p={1}
        >
          <Typography variant="h5" component="h2">
            Sport: {username}
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Change Password:
            </Typography>
            <TextField
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              label="Current Password"
            />
            <TextField
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="New Password"
            />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handlePasswordChange}>
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Profile;
