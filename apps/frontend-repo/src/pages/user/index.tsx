import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Typography, Button, Paper, CircularProgress, Box, List, ListItem, ListItemText } from "@mui/material";
import { motion } from "framer-motion";
import WebServices from "@/services";

const UserPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const webservice = new WebServices();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await webservice.fetchAllUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const user = await webservice.fetchUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };


    if (!localStorage.getItem("token")) {
      router.push("/"); // Redirect to login page if not logged in
    } else {
      fetchUsers();
      fetchUser();
      setLoading(false);
    }
  }, []);


  const handleLogout = async () => {
    localStorage.removeItem("token");
    router.push("/"); // Redirect to login page after logout
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper elevation={6} sx={{ p: 4, mt: 6, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            👋 Welcome, {user?.name}+{user?.email}!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            You are logged in at {user?.age} years old from {user?.country?.toString().toUpperCase()}. Enjoy your session!
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{ mt: 2, fontSize: "1rem" }}
            >
              Logout
            </Button>
          </Box>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/user/edit")}
              sx={{ py: 1, fontSize: "1rem" }}
            >
              Edit Details
            </Button>
          </Box>
        </Paper>

        {/* Display List of Users */}
        <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            🔹 All Users
          </Typography>
          {users.length > 0 ? (
            <List>
              {users.map((user, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={user.email}
                    secondary={`Name: ${user.name || "\"\""} | Age: ${user.age || "\"\""} | Country: ${user.country || "\"\""}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No users found.
            </Typography>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default UserPage;
