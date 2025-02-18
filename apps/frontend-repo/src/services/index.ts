export default class Webservice {
    api_url = process.env.NEXT_PUBLIC_API_URL;

    async fetchUser() {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.api_url}/fetch-user-data/me`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                }
            }
        );

        if (!res.ok) throw new Error("User not found");
        return res.json();
    }


    async registerUser(email: string, password: string, name: string, age: number, country: string) {
        const res = await fetch(`${this.api_url}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name, age, country }),
        });
    
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Registration failed");
        }
    
        const data = await res.json(); // ✅ Consume the JSON once
    
        if (data.token) {
            localStorage.setItem("token", data.token); // ✅ Store the token in localStorage
        }
    
        return data;
    }
    
    async loginUser(email: string, password: string) {
        const res = await fetch(`${this.api_url}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
    
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Login failed");
        }
    
        const data = await res.json(); // ✅ Consume the JSON once
    
        if (data.token) {
            localStorage.setItem("token", data.token); // ✅ Store the token in localStorage
        }
    
        return data;
    }

    async fetchAllUsers() {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.api_url}/fetch-user-data`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            }
        });

        // if (!res.ok) throw new Error("Users not found");
        return res.json();
    }

    async updateUser(user: any) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.api_url}/update-user-data`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            },
            body: JSON.stringify({ ...user }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Update Failed");
        }

        return res.json();
    }
}
