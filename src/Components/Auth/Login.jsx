// src/components/Auth/Login.jsx
import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Store/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAUH6t36-km79JywjWzXvpPlXy-iTqbMs
`;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error.message || "Login failed!");
      }

      // ✅ Store token in context + localStorage
      authCtx.login(data.idToken);

      // Redirect to Products page
      navigate("/productsPage");
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <input type="email" required ref={emailRef} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" required ref={passwordRef} />
        </div>
        <div>
          {!isLoading && <button>Login</button>}
          {isLoading && <p>Logging in...</p>}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </section>
  );
};

export default Login;
