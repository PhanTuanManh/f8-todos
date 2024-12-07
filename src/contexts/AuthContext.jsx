import { createContext, useReducer, useContext, useEffect } from "react";
import { loginAccount, registerAccount } from "../services/authServices";

const AuthContext = createContext();

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: "LOGIN", payload: user });
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      // eslint-disable-next-line no-undef
      const userInfo = await loginAccount({ email, password });
      if (userInfo) {
        dispatch({ type: "LOGIN", payload: userInfo });
        console.log(userInfo);
        // Save user info including userId in localStorage
        localStorage.setItem("user", JSON.stringify(userInfo));
        localStorage.setItem("userId", userInfo.user.id); // Save userId in localStorage
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (email, password) => {
    try {
      const userInfo = await registerAccount({ email, password });
      if (userInfo) {
        dispatch({ type: "LOGIN", payload: userInfo });
        localStorage.setItem("user", JSON.stringify(userInfo));
        localStorage.setItem("userId", userInfo.id);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
