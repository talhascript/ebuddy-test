import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Webservice from "@/services"; // Import Webservice class

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setError("");
  
    try {
      const service = new Webservice();
      const res = await service.registerUser(email, password, name, age ?? 0, country);
      if (res.token) {
        console.log("User registered successfully");
        alert("User registered successfully, Go to login page to continue");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <Paper elevation={6} sx={{ p: 4, mt: 6, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            📝 Create an Account
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Sign up to access the dashboard.
          </Typography>

          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            
            <TextField
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Age"
              type="number"
              variant="outlined"
              fullWidth
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />

            <TextField
              label="Country"
              type="text"
              variant="outlined"
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />


            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              disabled={loading}
              sx={{ mt: 2, py: 1, fontSize: "1rem" }}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Register;
