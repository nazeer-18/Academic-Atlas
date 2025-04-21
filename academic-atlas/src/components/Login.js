"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/Login.css"
import userService from "../services/userService"
import collegeService from "../services/collegeService"
import LoginImg from "../assets/LoginIcon.svg"
import { useUser } from "../contexts/userContext"
import { FaEye, FaRegEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

// Button styles defined in JavaScript
const buttonStyles = {
  loginBtnsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    margin: "20px 0",
    width: "100%",
  },
  atlasBtn: {
    flex: 1,
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: "#ff0000", // Assuming red is your theme color
    color: "white",
    border: "none",
    minHeight: "45px",
    textAlign: "center",
  },
  atlasBtnHover: {
    backgroundColor: "#d10000",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  googleBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "45px",
    minHeight: "45px",
    borderRadius: "8px",
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: "10px",
  },
  googleBtnHover: {
    backgroundColor: "#f5f5f5",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
}

// Responsive styles based on screen size
const getResponsiveStyles = () => {
  const width = window.innerWidth

  if (width <= 480) {
    return {
      loginBtnsRow: {
        ...buttonStyles.loginBtnsRow,
        gap: "8px",
      },
      atlasBtn: {
        ...buttonStyles.atlasBtn,
        fontSize: "14px",
        padding: "8px 12px",
      },
      googleBtn: {
        ...buttonStyles.googleBtn,
        minWidth: "40px",
        minHeight: "40px",
      },
    }
  } else if (width <= 768) {
    return {
      loginBtnsRow: {
        ...buttonStyles.loginBtnsRow,
        gap: "10px",
      },
      atlasBtn: {
        ...buttonStyles.atlasBtn,
        fontSize: "14px",
        padding: "8px 16px",
      },
      googleBtn: {
        ...buttonStyles.googleBtn,
        minWidth: "40px",
        minHeight: "40px",
      },
    }
  }

  return buttonStyles
}

export default function Login() {
  const { setUser, setLogged } = useUser()
  const navigate = useNavigate()
  const [message, setMessage] = useState("")
  const [showPwd, setShowPwd] = useState(false)
  const [checked, setChecked] = useState(false)
  const [success, setSuccess] = useState(false)
  const [colleges, setColleges] = useState([])
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ email: "", password: "" })

  // State for button hover effects
  const [loginBtnHover, setLoginBtnHover] = useState(false)
  const [googleBtnHover, setGoogleBtnHover] = useState(false)

  // State for responsive styles
  const [responsiveStyles, setResponsiveStyles] = useState(getResponsiveStyles())

  // Update responsive styles on window resize
  useEffect(() => {
    const handleResize = () => {
      setResponsiveStyles(getResponsiveStyles())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await collegeService.getColleges()
        if (response.data?.results) {
          setColleges(response.data.results)
        } else {
          setMessage("Failed to load colleges.")
        }
      } catch (err) {
        setMessage("Failed to load colleges.")
      }
      setLoading(false)
    }
    fetchColleges()
  }, [])

  const detectCollegeDomain = (email) => {
    if (!email.includes("@")) return null
    const domain = email.split("@")[1]
    const matchedCollege = colleges.find(
      (college) => college.studentDomain === domain || college.facultyDomain === domain,
    )
    return matchedCollege ? matchedCollege._id : null
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const form = document.getElementById("atlas-form")
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const loginData = { ...data }
    const collegeId = detectCollegeDomain(data.email)
    if (collegeId) {
      loginData.collegeId = collegeId
    }

    try {
      const response = await userService.login(loginData)
      const { success, message, token, user } = response.data
      setSuccess(success)
      setMessage(message)

      if (success) {
        setLogged(true)
        setUser(user)

        if (checked) {
          localStorage.setItem("atlasToken", token)
        } else {
          sessionStorage.setItem("atlasToken", token)
        }

        setTimeout(() => {
          setMessage("")
          navigate("/")
        }, 2000)
      } else {
        setLogged(false)
        setTimeout(() => setMessage(""), 2000)
      }
    } catch (err) {
      setLogged(false)
      setMessage("Server is Down, please try again later")
      setTimeout(() => setMessage(""), 2000)
    }
  }

  const handleGoogleLogin = () => {
    try {
      window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google-login`
      setMessage("Redirecting to Google login...")
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setMessage("Google login failed. Please try again.")
      setSuccess(false)
      setTimeout(() => setMessage(""), 3000)
    }
  }

  if (loading) {
    return <div className="loading-center">Loading...</div>
  }

  return (
    <div className="login-page">
      <div className="login-img">
        <img src={LoginImg || "/placeholder.svg"} alt="login" />
      </div>
      <div className="login-content">
        <div className="login-title atlas-title">Login</div>
        <div className="login-form">
          <form id="atlas-form">
            {/* Email */}
            <div className="login-form-component">
              <label className="atlas-font" htmlFor="email">
                Email
              </label>
              <br />
              <input
                className="atlas-input"
                type="email"
                name="email"
                id="email"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="login-form-component">
              <label className="atlas-font" htmlFor="password">
                Password
              </label>
              <br />
              <div className="password-group password-input-group">
                <input
                  className="atlas-input"
                  type={showPwd ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  placeholder="Enter your password"
                />
                <span className="eye-display" onClick={() => setShowPwd((prev) => !prev)}>
                  {showPwd ? <FaRegEyeSlash title="Hide" /> : <FaEye title="Show" />}
                </span>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="login-adds">
              <div className="remember-me">
                <input
                  title={checked ? "Unmark" : "Mark"}
                  type="checkbox"
                  name="remember-me"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  id="remember-me"
                />
                <label className="atlas-font" htmlFor="remember-me">
                  Remember Me!
                </label>
              </div>
              <div className="forgotPwd">
                <Link className="text-red-merry" to="/forgotpassword">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Message */}
            {message && <div className={`login-response-msg ${success}`}>{message}</div>}

            {/* Login + Google Buttons Side by Side - Using inline styles */}
            <div style={responsiveStyles.loginBtnsRow}>
              {/* Normal Login Button */}
              <button
                style={{
                  ...responsiveStyles.atlasBtn,
                  ...(loginBtnHover ? buttonStyles.atlasBtnHover : {}),
                }}
                onMouseEnter={() => setLoginBtnHover(true)}
                onMouseLeave={() => setLoginBtnHover(false)}
                onClick={handleLogin}
                type="submit"
              >
                Login
              </button>

              {/* Google Login Button */}
              <button
                style={{
                  ...responsiveStyles.googleBtn,
                  ...(googleBtnHover ? buttonStyles.googleBtnHover : {}),
                }}
                onMouseEnter={() => setGoogleBtnHover(true)}
                onMouseLeave={() => setGoogleBtnHover(false)}
                onClick={handleGoogleLogin}
                type="button"
                title="Login with Google"
              >
                <FcGoogle size={24} />
              </button>
            </div>

            {/* Signup Redirect */}
            <div className="noacnt-signup atlas-font">
              Don't have an account?{" "}
              <Link to="/signupmail" className="text-red-merry">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
