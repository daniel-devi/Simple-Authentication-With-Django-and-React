import { useState } from "react";
import { useEffect } from "react";
import api from "./api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
/// Material Ui ////////////////
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {"MyProject"}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function AuthForm({ route, method }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formOK, setFormOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    api
      .get("api/user/username")
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching usernames:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let newPassword = data.get("password");
    let newUsername = data.get("username");
    setUsername(newUsername);
    setPassword(newPassword);
    setLoading(true);

    if (method === "register") {
      let foundUser = userList.find((user) => user.username === username);
      if (foundUser) {
        setError("Username already exists");
      } else if (password.length < 8) {
        setError("Password must be at least 8 characters long");
      } else {
        setError("");
        setFormOk(true);
      }
    } else {
      setFormOk(true);
    }

    if (formOK === true) {
      try {
        const res = await api.post(route, {
          username: data.get("username"),
          password: data.get("password"),
        });

        if (method === "login") {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
          navigate("/");
        } else {
          if (res.status === 201) {
            navigate("/login");
          }
        }
      } catch (error) {
        if (error.response.status === 401 && method === "login") {
          setError("Incorrect username or password");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
      setLoading(false);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 500 }}>
            <Link href="/">
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                align="right"
                size="small"
              ></Button>
            </Link>

            <Typography variant="h4" gutterBottom color={"blue"} align="center">
              My Project
            </Typography>
          </Box>

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {method == "login" ? "Log In" : "Register Now"}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            {loading === true ? (
              <CircularProgress color="inherit" margin="" />
            ) : (
              ""
            )}
            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {method == "login" ? "Login" : "Register"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {method == "login" ? (
                  <Link href="/register" variant="body2">
                    {"Don't have an account?"}
                  </Link>
                ) : (
                  <Link href="/login" variant="body2">
                    {"Login"}
                  </Link>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
