import React from "react";

function JsvDoctorPrescription() {
  return (
    <>
      <header>
        <div className=" ">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-14 w-auto"
              src="/assets/Photos/hospital/Medical-Logo.jpg"
              alt="JSV Hospitals Logo"
            />
            <div>
              <h1 className="text-emerald-600 text-2xl font-bold ml-3 underline underline-offset-4">
                JSV Hospitals
              </h1>
            </div>
            <div></div>
          </div>
        </div>
      </header>
      <div>JsvDoctorPrescription</div>

      <section className="mt-4">
        <div className="container p-2 mx-auto">
          <h2 className="text-xl font-semibold">Patient Information</h2>
          <div className="mt-2 flex space-x-10">
            <p>
              <span className="font-semibold">Name:</span> Jane Smith
            </p>
            <p>
              <span className="font-semibold">Age:</span> 29
            </p>
            <p>
              <span className="font-semibold">Gender:</span> Female
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="bg-green-300 p-5 rounded-t-full text-center">
          Footer
        </div>
      </footer>
    </>
  );
}

export default JsvDoctorPrescription;
