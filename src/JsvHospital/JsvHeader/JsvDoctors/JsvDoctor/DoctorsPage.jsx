import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPatientsByAppointmentDate,
  newAdmitEntry,
  patientVisits,
} from "../../../JsvServices/JsvDoctors";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from "recharts";
import { BarChart, Bar, CartesianGrid } from "recharts";
import axios from "axios";
import { format } from "date-fns";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function DoctorsPage({ setLogged }) {
  let [patientDetails, setPatientDetails] = useState([]);
  const [pieChartData, setPieChart] = useState([]);
  const [barChartData, setBarChart] = useState([]);
  const [doctorName, setDoctorName] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const [appointmentDate, setAppointment] = useState("");
  const [todayPatients, setTodayPatients] = useState([]);

  const [isEnabled, setEnable] = useState(false);
  const prevEnabledRef = useRef([]);

  useEffect(() => {
    const date = new Date(); // Replace with your actual Date object
    // Format Date to "YYYY-MM-DD"
    const formattedDate = format(date, "yyyy-MM-dd");
    setAppointment(formattedDate);
  }, []);

  useEffect(() => {
    setLogged(true);
  }, [setLogged]);

  useEffect(() => {
    if (id) {
      patientVisits(id).then((res) => {
        setPatientDetails(res.data.patientDto);
        setPieChart(res.data.pieChartDto);
        setBarChart(res.data.barChartDto);
        setDoctorName(res.data.patientDto[0].doctorName);
      });
    }
  }, [id]);

  useEffect(() => {
    if ((id, appointmentDate)) {
      getPatientsByAppointmentDate(id, appointmentDate)
        .then((res) => {
          setTodayPatients(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [id, appointmentDate]);

  useEffect(() => {
    todayPatients.reverse();
    function checkEnableStatus() {
      const currentDate = new Date();
      const timeSlots = [
        "08:00 AM",
        "09:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
      ];

      const enableStatus = todayPatients.map((patient) => {
        const appointmentDate = new Date(patient.appointmentDate);
        const isSameDay =
          currentDate.getDate() === appointmentDate.getDate() &&
          currentDate.getMonth() === appointmentDate.getMonth() &&
          currentDate.getFullYear() === appointmentDate.getFullYear();

        if (isSameDay) {
          let currentTime = currentDate.getHours();
          if (currentTime < 12) currentTime = "0" + currentTime;

          currentTime += currentTime >= 12 ? ":00 PM" : ":00 AM";
          console.log(currentTime);

          if (currentTime === patient.timeSlot) return true;
        }
        return false;
      });

      // Check if the new enableStatus array is different from the previous one
      const isDifferent = enableStatus.some(
        (status, index) => status !== prevEnabledRef.current[index]
      );

      if (isDifferent) {
        setEnable(enableStatus);
        prevEnabledRef.current = enableStatus;
      }
    }

    const interval = setInterval(checkEnableStatus, 60000);
    checkEnableStatus(); // Initial check

    return () => clearInterval(interval);
  }, [todayPatients]);

  const handleSubmit = (index) => {
    const newEntry = todayPatients[index];

    axios
      .post("http://localhost:8080/doctor/home/admittedPatients", newEntry, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("Data submitted!");
        setEnable((prevEnable) =>
          prevEnable.map((status, i) => (i === index ? false : status))
        );
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to submit data.");
      });
  };

  // if (todayPatients.length === 0 || pieChartData.length === 0) {
  //   return <div>Loading...</div>;
  // }

  const genderColorMap = {};
  barChartData.forEach((entry, index) => {
    if (!genderColorMap[entry.gender]) {
      genderColorMap[entry.gender] =
        COLORS[Object.keys(genderColorMap).length % COLORS.length];
    }
  });

  return (
    <>
      <header>
        <div>
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-20">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {!isOpen ? (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="h-14 w-auto"
                      src="\assets\Photos\hospital\Medical-Logo.jpg"
                      alt="profile"
                    />
                    <h1 className="text-emerald-600 text-2xl font-bold ml-3">
                      Dr. {doctorName}
                    </h1>
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-6 mt-2">
                      <a
                        href=""
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Dashboard
                      </a>

                      <a
                        href="/doctor/admittedPatients"
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Admitted Patients
                      </a>

                      <a
                        href=""
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Re-visited Patients
                      </a>

                      <a
                        href="/notifications"
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Notifications
                      </a>
                      <a
                        href="/login"
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${isOpen ? "block" : "hidden"} sm:hidden`}
              id="mobile-menu"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href=""
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a>

                <a
                  href="#"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Admitted Patients
                </a>
                <a
                  href=""
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Re-visite Patients
                </a>
                <a
                  href="/login"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="mt-3">
        <div className="min-h-40 p-5 bg-gray-100  flex flex-col lg:flex-row justify-center items-center lg:space-x-8 space-y-8 lg:space-y-0 rounded-2xl">
          <div className="bg-white  rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-xl pt-4 font-bold mb-4 text-center">
              Visited Patients Date Wise
              <br /> Bar Chart View
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="appointmentDate" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
                <Bar dataKey="gender" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white  rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-xl pt-4 font-bold mb-4 text-center">
              Total Visited Patients
              <br /> Pie Chart View
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="gender"
                  label
                >
                  {pieChartData.map((entry) => (
                    <Cell
                      key={`cell-${entry.gender}`}
                      fill={genderColorMap[entry.gender]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center py-5">
        <div className="m-5 p-5 flex flex-col w-full max-w-7xl mx-1">
          <h1 className="font-semibold p-2 text-center mx-auto">
            Today's Patient List
          </h1>

          <div className="overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Patient ID",
                        "Patient Name",
                        "Age",
                        "Email",
                        "Phone Number",
                        "Address",
                        "Appointment Date",
                        "Time Slot",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {todayPatients.map((patient, index) => (
                      <tr
                        key={patient.patientId}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-200`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.patientId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.fullName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.age}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.address}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.appointmentDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.timeSlot}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleSubmit(index)}
                            disabled={!isEnabled[index]}
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${
                              isEnabled[index]
                                ? `hover:bg-white hover:text-green-500 bg-green-500`
                                : "opacity-95 bg-red-500"
                            }`}
                          >
                            {isEnabled[index] ? "Admit" : "OP"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorsPage;
