import axios from "axios";

const REST_API_URL = "http://localhost:8080";

export const doctorsList = () => {
  return axios.get(REST_API_URL + "/doctors");
};

export const getDoctorById = (id) => {
  return axios.get(REST_API_URL + "/doctor-appointment/" + id);
};

export const newPatientEntry = (id, patientEntity) => {
  return axios.post(REST_API_URL + "/doctor-appointment/" + id, patientEntity);
};

export const patientVisits = (id) => {
  return axios.get(REST_API_URL + "/doctor/" + id);
};

export const getCredentials = (id) => {
  return axios.get(REST_API_URL + "/login/" + id);
};

export const newAdmitEntry = (newAdmitEntry) => {
  return axios.post(
    REST_API_URL + "/doctor/home/admittedPatients" + newAdmitEntry
  );
};

export const getPatientsByAppointmentDate = (id, appointmentDate) => {
  return axios.get(
    REST_API_URL + "/doctor/" + id + "/" + appointmentDate + "/home/"
  );
};

export const patientLoginByEmail = (email) => {
  return axios.post(REST_API_URL + "/login/email", { email });
};

export const verifyByOTP = (OTP) => {
  return axios.post(REST_API_URL + "/login/email/verify", OTP);
};

export const totalAppointments = (appointmentDate, email) => {
  return axios.get(REST_API_URL + "/patients/" + appointmentDate + "/" + email);
};
