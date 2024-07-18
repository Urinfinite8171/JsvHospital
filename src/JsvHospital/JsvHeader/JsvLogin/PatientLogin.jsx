import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { totalAppointments } from "../../JsvServices/JsvDoctors";
import { format } from "date-fns";

function PatientLogin({ setLogged }) {
  const { email, appointmentDate } = useParams();
  const [upcomingApp, setUpcoming] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [current, setCurrent] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setLogged(true);
  }, [setLogged]);

  useEffect(() => {
    if (appointmentDate && email) {
      totalAppointments(appointmentDate, email)
        .then((res) => {
          setUpcoming(res.data.upcoming);
          setPrevious(res.data.previous);
        })
        .catch((e) => console.error(e));
    }
  }, [appointmentDate, email]);

  const renderTableRows = (appointments) =>
    appointments.map((appointment, index) => (
      <tr
        key={appointment.patientId}
        className={`${
          index % 2 === 0 ? "bg-gray-50" : "bg-white"
        } hover:bg-gray-200`}
      >
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {appointment.doctorName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {appointment.appointmentDate}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {appointment.timeSlot}
        </td>
      </tr>
    ));

  return (
    <>
      <header>
        <div>
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-20">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {!isMenuOpen ? (
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
                      Patient Portal
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
                        href="#"
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Medical History
                      </a>

                      <a
                        href="#"
                        className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      >
                        Appointments
                      </a>
                      <a
                        href="/login"
                        className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}
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
                  Medical History
                </a>
                <a
                  href="#"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Appointments
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
      <div className="flex flex-col lg:flex-row">
        <div className="flex justify-center items-center py-5 w-full lg:w-1/2">
          <div className="m-5 p-5 flex flex-col w-full max-w-7xl mx-1">
            <h1 className="font-semibold p-2 text-center mx-auto">
              Previous Appointments
            </h1>
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Doctor Name",
                          "Appointment Date",
                          "Time Slot",
                          "Status",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {renderTableRows(previous)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center py-5 w-full lg:w-1/2">
          <div className="m-5 p-5 flex flex-col w-full max-w-7xl mx-1">
            <h1 className="font-semibold p-2 text-center mx-auto">
              Current Appointments
            </h1>
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Doctor Name",
                          "Appointment Date",
                          "Time Slot",
                          "Status",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {renderTableRows(current)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center py-5 w-full lg:w-1/2">
          <div className="m-5 p-5 flex flex-col w-full max-w-7xl mx-1">
            <h1 className="font-semibold p-2 text-center mx-auto">
              Upcoming Appointments
            </h1>
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          "Doctor Name",
                          "Appointment Date",
                          "Time Slot",
                          "Status",
                        ].map((header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {renderTableRows(upcomingApp)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientLogin;
