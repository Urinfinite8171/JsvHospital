import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./JsvHospital/JsvFooter/Footer";
import Appointment from "./JsvHospital/JsvHeader/JsvAppointment/Appointment";
import JsvHeader from "./JsvHospital/JsvHeader/JsvHeader";
import Home from "./JsvHospital/JsvHeader/JsvHome/Home";
import Login from "./JsvHospital/JsvHeader/JsvLogin/Login";
import Doctors from "./JsvHospital/JsvHeader/JsvDoctors/Doctors";
import BookAppointment from "./JsvHospital/JsvHeader/JsvDoctors/BookAppointment";
import ContactUs from "./JsvHospital/JsvHeader/JsvContact/ContactUs";
import DoctorsPage from "./JsvHospital/JsvHeader/JsvDoctors/JsvDoctor/DoctorsPage";
import { useRef, useState } from "react";
import Cookies from "js-cookie";
import Notifications from "./JsvHospital/JsvHeader/JsvDoctors/JsvDoctor/Notifications/Notifications";
import React from "react";
import AdmittedPatients from "./JsvHospital/JsvHeader/JsvDoctors/JsvDoctor/AdmittedPatients";
import PatientLogin from "./JsvHospital/JsvHeader/JsvLogin/PatientLogin";
import JsvDoctorPrescription from "./JsvHospital/JsvPrescription/JsvDoctorPrescription";

const ProtectedRoute = ({ children }) => {
  const session = Cookies.get("session");
  return session ? children : <Navigate to="/login" />;
};

function App() {
  const [isLogged, setLogged] = useState(false);
  const notificationRef = useRef(null);

  const handlePatientFormSubmit = (formData) => {
    if (notificationRef.current) {
      notificationRef.current.handleNewPatientNotification(formData);
    }
  };

  return (
    <>
      {!isLogged && <JsvHeader />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login setLogged={setLogged} />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route
            path="/doctor-appointment/:id"
            element={<BookAppointment onSubmit={handlePatientFormSubmit} />}
          />
          <Route path="/book-appointment" element={<Appointment />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/doctor/:id/home"
            element={
              <ProtectedRoute>
                <DoctorsPage setLogged={setLogged} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/admittedPatients"
            element={
              <ProtectedRoute>
                <AdmittedPatients setLogged={setLogged} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/:id/notifications"
            element={
              <ProtectedRoute>
                <Notifications setLogged={setLogged} ref={notificationRef} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/:appointmentDate/:email"
            element={<PatientLogin setLogged={setLogged} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
