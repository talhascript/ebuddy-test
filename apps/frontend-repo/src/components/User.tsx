import { useState } from "react";
import { Button, Typography, CircularProgress, Card, CardContent } from "@mui/material";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "@/services/firebase.service"; // Ensure you have Firebase initialized in this file

const UserInfo = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserInfo = async () => {
        setLoading(true);
        setError(null);

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                setError("No authenticated user found");
                setLoading(false);
                return;
            }

            const db = getFirestore(app);
            const userRef = doc(db, "USERS", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                setUserData(userSnap.data());
            } else {
                setError("User data not found in Firestore");
            }
        } catch (err) {
            setError("Error fetching user data");
            console.error("Firestore Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ maxWidth: 400, margin: "auto", mt: 4, p: 2, textAlign: "center" }}>
            <CardContent>
                <Typography variant="h6">User Information</Typography>
                <Button onClick={fetchUserInfo} variant="contained" sx={{ mt: 2 }} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Get User Info"}
                </Button>

                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

                {userData && (
                    <Typography sx={{ mt: 2 }}>
                        <strong>Name:</strong> {userData.name || "N/A"} <br />
                        <strong>Email:</strong> {userData.email || "N/A"}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default UserInfo;
