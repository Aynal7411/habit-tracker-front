import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // ✅ Import api

export default function Register() {
  const { register } = useContext(AuthContext); // use AuthContext's register function
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Call backend API
      const res = await api.post("/auth/register", form);

      // ✅ Use AuthContext register function
      register(res.data); // this should save JWT + user info

      // ✅ Redirect after registration
      navigate("/");
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input
        placeholder="Name"
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email || ""}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password || ""}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
}
