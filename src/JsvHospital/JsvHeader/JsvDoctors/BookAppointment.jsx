import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoctorById, newPatientEntry } from "../../JsvServices/JsvDoctors";

const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+91", name: "India" },
  { code: "+44", name: "United Kingdom" },
  { code: "+61", name: "Australia" },
  { code: "+81", name: "Japan" },
  // Add more country codes as needed
];

const BookAppointment = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    sonOfOrWifeOf: "",
    age: "",
    gender: "",
    countryCode: "",
    phone: "",
    email: "",
    address: "",
    appointmentDate: "",
  });

  const [doctorName, setDoctorName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const [clickCounts, setClickCounts] = useState(0);
  const [doctorAvail, setDoctorAvail] = useState([{}]);
  const [slots, setSlots] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const [showToast, setToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      getDoctorById(id)
        .then((res) => {
          setDoctorAvail(res.data);
          setDoctorName(res.data[0].doctorName);
          setDoctorId(res.data[0].doctorId);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const objectCopy = { ...formData, doctorId, doctorName, timeSlot };
    setIsSubmitting(true);
    onSubmit(objectCopy);

    if (id) {
      newPatientEntry(id, objectCopy).then((res) => {
        console.log(res.data);
        setToast(true);
        // Hide the toaster after 5 seconds
        setTimeout(() => {
          setToast(false);
          navigate("/login");
        }, 5000);
      });
    }
  };

  useEffect(() => {
    if (formData.appointmentDate) {
      getSlot();
    }
  }, [formData.appointmentDate, doctorAvail]);

  const handleEditClick = (timeSlot) => {
    setClickCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[timeSlot] = (newCounts[timeSlot] || 0) + 1;
      return newCounts;
    });
  };

  const getSlot = () => {
    const currentDate = new Date();
    const selectedDate = new Date(formData.appointmentDate);

    const timeSlots = [
      "08:00 AM",
      "09:00 AM",
      "11:00 AM",
      "12:00 PM",
      "14:00 PM",
      "15:00 PM",
      "16:00 PM",
      "17:00 PM",
      "18:00 PM",
    ];

    if (selectedDate >= currentDate) {
      let availableSlots = timeSlots.map((timeSlot, index) => {
        let slotAvailable = true;
        let count = 0;
        doctorAvail.forEach((d) => {
          if (
            d.appointmentDate === formData.appointmentDate &&
            d.timeSlot === timeSlot
          ) {
            if (d.count >= 3) slotAvailable = false;
            count = d.count;
          }
        });

        return (
          <div key={index}>
            <fieldset>
              <div className="p-2 mx-2 ">
                <label className=" hover:bg-gray-100 peer-checked/draft:text-sky-500 text-base p-2 mx-3 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200">
                  {timeSlot}
                  <input
                    type="radio"
                    name="timeSlot"
                    className="checked:border-indigo-500 p-2 mx-3 size-4"
                    value={timeSlot}
                    onClick={() => handleEditClick(timeSlot)}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    disabled={!slotAvailable}
                    required
                  />
                  <span
                    className={
                      slotAvailable ? "text-green-600" : "text-red-600"
                    }
                  >
                    {slotAvailable ? `Available ${3 - count}` : "Not Available"}
                  </span>
                </label>
              </div>
            </fieldset>
          </div>
        );
      });

      setSlots(availableSlots);
    } else if (
      selectedDate.getDate() == currentDate.getDate() &&
      selectedDate.getMonth() == currentDate.getMonth()
    ) {
      let currentTime = currentDate.getHours();
      currentTime = currentTime >= 12 ? currentTime : "0" + currentTime;
      currentTime += currentTime >= 12 ? ":00 PM" : ":00 AM";

      console.log(timeSlots.indexOf(currentTime));
      console.log(currentTime);

      const newTimeSlots = Array.from(
        timeSlots.slice(timeSlots.indexOf(currentTime) + 1, timeSlots.length)
      );

      if (timeSlots.indexOf(currentTime) >= 0) {
        let availableSlots = newTimeSlots.map((timeSlot, index) => {
          let slotAvailable = true;
          let count = 0;
          doctorAvail.forEach((d) => {
            if (
              d.appointmentDate === formData.appointmentDate &&
              d.timeSlot === timeSlot
            ) {
              if (d.count >= 3) slotAvailable = false;
              count = d.count;
            }
          });

          return (
            <div key={index}>
              <fieldset>
                <div className="p-2 mx-2 ">
                  <label className=" hover:bg-gray-100 peer-checked/draft:text-sky-500 text-base p-2 mx-3 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200">
                    {timeSlot}
                    <input
                      type="radio"
                      name="timeSlot"
                      className="checked:border-indigo-500 p-2 mx-3 size-4"
                      value={timeSlot}
                      onClick={() => handleEditClick(timeSlot)}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      disabled={!slotAvailable}
                      required
                    />
                    <span
                      className={
                        slotAvailable ? "text-green-600" : "text-red-600"
                      }
                    >
                      {slotAvailable
                        ? `Available ${3 - count}`
                        : "Not Available"}
                    </span>
                  </label>
                </div>
              </fieldset>
            </div>
          );
        });

        setSlots(availableSlots);
      }
      if (currentDate.getHours() < 8) {
        let availableSlots = newTimeSlots.map((timeSlot, index) => {
          let slotAvailable = true;
          let count = 0;
          doctorAvail.forEach((d) => {
            if (
              d.appointmentDate === formData.appointmentDate &&
              d.timeSlot === timeSlot
            ) {
              if (d.count >= 3) slotAvailable = false;
              count = d.count;
            }
          });

          return (
            <div key={index}>
              <fieldset>
                <div className="p-2 mx-2 ">
                  <label className=" hover:bg-gray-100 peer-checked/draft:text-sky-500 text-base p-2 mx-3 has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200">
                    {timeSlot}
                    <input
                      type="radio"
                      name="timeSlot"
                      className="checked:border-indigo-500 p-2 mx-3 size-4"
                      value={timeSlot}
                      onClick={() => handleEditClick(timeSlot)}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      disabled={!slotAvailable}
                      required
                    />
                    <span
                      className={
                        slotAvailable ? "text-green-600" : "text-red-600"
                      }
                    >
                      {slotAvailable
                        ? `Available ${3 - count}`
                        : "Not Available"}
                    </span>
                  </label>
                </div>
              </fieldset>
            </div>
          );
        });

        setSlots(availableSlots);
      } else {
        let availableSlots = (
          <div>
            <h3 className="text-red-700 text-lg p-2 mx-2">
              Break Time / Slots Not Available Right Now!
            </h3>
          </div>
        );

        setSlots(availableSlots);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">S/O / W/O</label>
              <input
                type="text"
                name="sonOfOrWifeOf"
                value={formData.sonOfOrWifeOf}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <div className="flex">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="mt-2 p-2 border border-gray-300 rounded-l-lg bg-white"
                  required
                >
                  <option value="">Select Code</option>
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-r-lg"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <h3 className="block mx-5 text-lg text-gray-700">Time Slots</h3>
              <div className="flex flex-wrap">{slots}</div>
            </div>

            {/* <div className="mb-4">
              <label className="block text-gray-700">Doctor ID</label>
              <input
                type="text"
                name="doctorId"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                disabled
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              />
            </div> */}

            <div className="mb-4">
              <label className="block text-gray-700">Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                disabled
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-lg"
              />
            </div>

            <button
              type="submit"
              className={`w-full text-lg bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-800 transition duration-200  active:bg-green-600 focus:outline-none focus:ring focus:ring-violet-300
                ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Book Appointment"}
            </button>
          </form>

          {showToast && (
            <div className="fixed top-10 right-96 bg-green-700 text-white p-4 rounded-lg max-sm:left-10  max-sm:right-auto max-sm:top-20">
              Your Appointment has been successfully booked!
              <br /> You will receive a confirmation email soon.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
