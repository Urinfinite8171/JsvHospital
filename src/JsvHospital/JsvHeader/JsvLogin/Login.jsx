import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCredentials,
  patientLoginByEmail,
  verifyByOTP,
} from "../../JsvServices/JsvDoctors";
import Cookies from "js-cookie";
import { format } from "date-fns";

const Login = ({ setLogged }) => {
  const [id, setDoctorId] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState(null); // Initialize credentials as null
  const navigate = useNavigate();
  const [showToast, setToast] = useState(false);
  const [showDoctorLoginForm, setShowDoctorLoginForm] = useState(true);
  const [showPatientLoginForm, setShowPatientLoginForm] = useState(false);
  const [sendToast, setSendToast] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [appointmentDate, setAppointment] = useState("");

  useEffect(() => {
    if (id) {
      getCredentials(id)
        .then((res) => {
          setCredentials(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  useEffect(() => {
    const date = new Date(); // Replace with your actual Date object
    // Format Date to "YYYY-MM-DD"
    const formattedDate = format(date, "yyyy-MM-dd");
    setAppointment(formattedDate);
  }, []);

  function validateCredentials(id, password, credentials) {
    if (
      credentials &&
      (credentials.doctorId == id || credentials.userName === id)
    ) {
      if (credentials.password === password) return true;
    }
    return false;
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOtp = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    patientLoginByEmail(email)
      .then((res) => {
        console.log(res.data);
        setSendToast(true);
        setTimeout(() => {
          setSendToast(false);
        }, 3000);
      })
      .catch((error) => console.log(error));
  };

  const verifyOtp = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    const cred = { email, otp };
    verifyByOTP(cred)
      .then((res) => {
        console.log(res.data);
        setLogged(true);
        navigate(`/patients/${appointmentDate}/${email}`);
      })
      .catch((error) => console.log(error));
  };

  const handleLoginAsDoctor = (e) => {
    e.preventDefault();

    if (validateCredentials(id, password, credentials)) {
      console.log("Logging in as Doctor with ID:", id);
      setLogged(true);
      setCookieWithMinutes("session", id, 30);
      navigate(`/doctor/${id}/home`);
    } else {
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  };

  const handleLoginAsPatient = (e) => {
    e.preventDefault();
    setShowDoctorLoginForm(false);
    setShowPatientLoginForm(true);
  };

  const setCookieWithMinutes = (key, value, minutes) => {
    const expiresInDays = minutes / 1440; // 1440 minutes in a day
    Cookies.set(key, value, { expires: expiresInDays });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {showDoctorLoginForm && (
          <form onSubmit={handleLoginAsDoctor}>
            <div className="mb-4">
              <label className="block text-gray-700">Doctor ID</label>
              <input
                type="text"
                value={id}
                required
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-between mb-4">
              <button
                onClick={handleLoginAsPatient}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Login as Patient
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Login
              </button>
            </div>
          </form>
        )}

        {/* Patient Login Form */}
        {showPatientLoginForm && (
          <form onSubmit={verifyOtp}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(""); // Clear email error when user starts typing
                }}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              />
              {emailError && <p className="text-red-600 mt-2">{emailError}</p>}
              <button
                className="text-red-600 p-2 mt-2 rounded-lg hover:bg-slate-100 transition duration-200"
                onClick={handleOtp}
              >
                Get OTP
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">One Time Password</label>
              <input
                type="text"
                value={otp}
                required
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>

      {showToast && (
        <div className="fixed top-10 right-1/3 bg-red-600 text-white p-4 rounded-lg">
          Invalid username or password. Please try again.
        </div>
      )}

      {sendToast && (
        <div className="fixed top-10 right-1/3 bg-green-600 text-white p-4 rounded-lg">
          OTP successfully sent to your email.
        </div>
      )}
    </div>
  );
};

export default Login;
