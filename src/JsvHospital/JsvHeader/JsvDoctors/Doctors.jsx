import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctorsList } from "../../JsvServices/JsvDoctors";

function Doctors() {
  const [dList, setList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    doctorsList()
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  function bookAppointment(id) {
    navigate(`/doctor-appointment/${id}`);
  }

  return (
    <>
      <div className="container mx-auto p-3">
        <h1 className="text-2xl font-semibold p-3 mx-3">
          JSV Hospital Doctors
        </h1>

        <div className="flex flex-wrap justify-center">
          {dList.map((doctor) => (
            <div
              key={doctor.doctorId}
              className="flex flex-col bg-slate-300 rounded-2xl shadow-xl w-full m-3 sm:w-64 max-sm:w-72"
            >
              <img
                className="m-3 rounded-full shadow-xl cursor-pointer h-56 "
                src={`data:image/jpeg;base64,${doctor.image}`} // Ensure this path is correct
                alt="profile-pic"
              />
              <h2 className="text-xl text-center mb-1 font-medium">
                <strong>{doctor.doctorName}</strong>
              </h2>
              <p className="text-base text-center mb-2 pt-2">
                <strong>Specialization :</strong>{" "}
                <span className="font-semibold">{doctor.specialization}</span>
              </p>
              <p className="text-base text-center mb-2 ">
                <strong>Experience :</strong>{" "}
                <span className="font-semibold">{doctor.experience}</span>
              </p>
              <button
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={() => bookAppointment(doctor.doctorId)}
              >
                Book An Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Doctors;
