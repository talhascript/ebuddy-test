import { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Container, Typography, Button, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";
import Webservice from "@/services";
import router, { useRouter } from "next/router";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login & register
  const router = useRouter();

  useEffect(() => {
        const token = localStorage.getItem("token");
    if (!token) {
      // setUser(null);
      return; // Exit early if no token
    }
    const fetchUser = async () => {
      try {
        const user = await new Webservice().fetchUser();
        setUser(user);
      }
      catch (error) {
        setUser(null);
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  
  const handleLogout = async () => {
    localStorage.removeItem("token");
  };

  return (
    <Container maxWidth="sm">
      {user ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={6} sx={{ p: 4, mt: 6, borderRadius: 3, textAlign: "center" }}>
            <Typography variant="h5">🎉 Welcome,  {user.name} || {user.email} || {user.country}!</Typography>
            <Typography variant="body1" sx={{ my: 2 }}>
              You are successfully logged in.
            </Typography>

            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Paper>
        </motion.div>
      ) : (
        <>
          {isRegistering ? <Register /> : <Login />}
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Button
              variant="text"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}



