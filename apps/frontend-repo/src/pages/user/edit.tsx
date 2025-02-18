import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Typography, TextField, Button, Box, CircularProgress } from "@mui/material";
import WebServices from "@/services";

const EditEmailPage = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [country, setCountry] = useState("");

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const webservice = new WebServices();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await webservice.fetchUser();
      setName(res.name);
      setAge(res.age);
      setCountry(res.country);

      if (!res) {
        router.push("/"); // Redirect to login page if not logged in
      } else {
        setUser(res);
      }
    };
    checkAuth();
  }, []);

  // Handle change email
  const handleChange = async () => {
    setLoading(true);
    try {
      if (user) {
        const temp: any = {};
        if (name) temp.name = name;
        if (age) temp.age = age;
        if (country) temp.country = country;
        // Then call the updateUser function to update the email in your backend
        await webservice.updateUser({ ...user, ...temp });
        setTimeout(() => {
          router.push("/user"); // Redirect back to user page
        }, 2000);

      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>

      <Typography variant="h5">Edit Details</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
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

          <Button variant="contained" color="primary" onClick={handleChange}>
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditEmailPage;
