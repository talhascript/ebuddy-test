import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Webservice from "@/services";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [age, setAge] = useState<number | undefined>(undefined);
    // const [country, setCountry] = useState("");
    // const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const service = new Webservice();
            const res = await service.loginUser(email, password);
            if (res.token) {
                router.push("/user"); // Redirect to the main dashboard after login
            }
        } catch (err) {
             console.log(err);
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
                        🔐 Welcome Back!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Login to access your dashboard.
                    </Typography>

                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                            onClick={handleLogin}
                            disabled={loading}
                            sx={{ mt: 2, py: 1, fontSize: "1rem" }}
                        >
                            {loading ? <CircularProgress size={24} /> : "Login"}
                        </Button>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default Login;
