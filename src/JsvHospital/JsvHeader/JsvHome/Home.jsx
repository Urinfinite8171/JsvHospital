import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const images = [
    "/assets/Photos/hospital/bg.jpeg",
    "/assets/Photos/hospital/bg.jpeg",
    "/assets/Photos/hospital/hospitalBed.jpeg",
    "/assets/Photos/hospital/hospital-bg.jpg",
    "/assets/Photos/hospital/hospital-bg1.jpg",
    "/assets/Photos/hospital/hospital-bg2.jpg",
    "/assets/Photos/hospital/laboratory.jpg",
  ];

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome to JSV Hospitals
        </h1>

        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Hospital ${index + 1}`}
                className="w-full h-72 object-cover rounded-lg shadow-md p-2"
              />
            </div>
          ))}
        </Slider>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-lg mb-2">
            JSV Hospitals, located in the heart of Warangal, Telangana, stands
            as a beacon of hope and healing. Our state-of-the-art healthcare
            facility is dedicated to providing the highest quality medical care
            to our community.
          </p>
        </div>
      </div>

      <div className="">
        <h1 className="font-[Arial] text-[28px] text-center mt-4 font-semibold underline ">
          Our facilities
        </h1>

        <div className="flex flex-wrap justify-center ">
          <div className=" flex flex-col  bg-slate-300 rounded-2xl shadow-md w-full m-3  sm:w-96 max-sm:w-96">
            <img
              className="h-52 m-3 rounded-2xl shadow-xl cursor-pointer"
              src="/assets/Photos/hospital/ot-picture.jpg"
              alt="OT"
            ></img>
            <h6 className="text-xl text-center mb-2 font-medium ">
              Advanced Operating Theaters
            </h6>
            <p className="mx-5 mb-3 text-base ">
              State-of-the-art operating rooms equipped with the latest medical
              technologies.
            </p>
          </div>

          <div className=" flex flex-col  bg-slate-300 rounded-2xl shadow-md w-full m-3  sm:w-96 max-sm:w-96 ">
            <img
              className="h-52 m-3 rounded-2xl shadow-xl cursor-pointer"
              src="/assets/Photos/hospital/icu-patientjpg.jpg"
              alt="OT"
            ></img>
            <h6 className="text-xl text-center mb-2 font-medium ">
              Intensive Care Units (ICUs)
            </h6>
            <p className="mx-5 mb-3 text-base ">
              Dedicated ICUs for critical care patients, ensuring continuous
              monitoring and specialized treatment.
            </p>
          </div>

          <div className=" flex flex-col  bg-slate-300 rounded-2xl shadow-md w-full m-3  sm:w-96 max-sm:w-96 ">
            <img
              className="h-52 m-3 rounded-2xl shadow-xl cursor-pointer"
              src="/assets/Photos/hospital/pharmacist.jpg"
              alt="OT"
            ></img>
            <h6 className="text-xl text-center mb-2 font-medium ">
              Pharmacy and Laboratory Services
            </h6>
            <p className="mx-5 mb-3 text-base ">
              On-site pharmacy and laboratory services for quick and convenient
              access to medications and test results.
            </p>
          </div>

          <div className=" flex flex-col  bg-slate-300 rounded-2xl shadow-md w-full m-3  sm:w-96 max-sm:w-96">
            <img
              className="h-52 m-3 rounded-2xl shadow-xl cursor-pointer"
              src="/assets/Photos/hospital/hospitalBed.jpeg"
              alt="OT"
            ></img>
            <h6 className="text-xl text-center mb-2 font-medium ">
              Comfortable Patient Rooms
            </h6>
            <p className="mx-5 mb-3 text-base ">
              Spacious and well-equipped patient rooms to provide a homely and
              restful atmosphere during the recovery period.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-[Arial] text-[28px] text-center mt-4 font-semibold underline">
          Our Vision
        </h2>
        <div className="bg-[url('/assets/Photos/hospital/hospital-bg1.jpg')] bg-cover bg-center bg-no-repeat container mx-auto flex items-center justify-center rounded-3xl p-4 md:p-8">
          <div className="bg-white bg-opacity-75 p-4 md:p-8 rounded-3xl shadow-lg w-full max-w-7xl">
            <p className="text-lg md:text-xl p-3 mx-2">
              At JSV Hospitals, we offer a wide range of medical services to
              cater to the diverse needs of our patients.
            </p>
            <strong className="text-lg md:text-xl">
              Specialized Departments:
            </strong>
            <div className="flex flex-wrap justify-center mt-4">
              {[
                {
                  src: "cardiology.jpg",
                  alt: "cardiology",
                  title: "Cardiology",
                },
                { src: "pediatric.jpg", alt: "pediatric", title: "Pediatric" },
                { src: "neurology.jpg", alt: "neurology", title: "Neurology" },
                {
                  src: "orthopedic.jpeg",
                  alt: "orthopedic",
                  title: "Orthopedic",
                },
                { src: "oncology.jpg", alt: "oncology", title: "Oncology" },
              ].map((dept, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-slate-300 rounded-2xl shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 m-3"
                >
                  <img
                    src={`/assets/Photos/hospital/${dept.src}`}
                    alt={dept.alt}
                    className="h-52 m-3 rounded-2xl shadow-xl cursor-pointer object-cover"
                  />
                  <h6 className="text-lg md:text-xl text-center mb-2 font-medium">
                    {dept.title}
                  </h6>
                </div>
              ))}
            </div>
            <p className="text-lg md:text-xl mt-4">
              Our hospital houses specialized departments including cardiology,
              neurology, oncology, orthopedics, pediatrics, and more, staffed by
              highly skilled and experienced medical professionals.
            </p>
            <br />
            <div>
              <strong className="text-lg md:text-xl">
                Advanced Diagnostics:
              </strong>
              <div className="p-2 flex flex-col md:flex-row bg-slate-300 rounded-2xl shadow-md w-full mt-4">
                <img
                  src="/assets/Photos/hospital/diagnosis.jpg"
                  alt="diagnosis"
                  className="w-full md:w-1/2 rounded-2xl object-cover"
                />
                <p className="text-lg md:text-xl m-4 p-2">
                  Equipped with cutting-edge diagnostic tools, we ensure
                  accurate and timely diagnosis to facilitate effective
                  treatment plans.
                </p>
              </div>
            </div>
            <div>
              <strong className="text-lg md:text-xl">
                Surgical Excellence:
              </strong>
              <div className="p-2 flex flex-col md:flex-row bg-slate-300 rounded-2xl shadow-md w-full mt-4">
                <img
                  src="/assets/Photos/hospital/surgical.jpg"
                  alt="surgical"
                  className="w-full md:w-1/2 rounded-2xl object-cover"
                />
                <p className="text-lg md:text-xl m-4 p-2">
                  We perform complex surgeries with precision, using the latest
                  surgical techniques and technologies to ensure the best
                  outcomes for our patients.
                </p>
              </div>
            </div>
            <div>
              <strong className="text-lg md:text-xl ">Emergency Care:</strong>
              <div className="p-2 flex flex-col md:flex-row bg-slate-300 rounded-2xl shadow-md w-full mt-4">
                <img
                  src="/assets/Photos/hospital/Emergency.jpg"
                  alt="Emergency"
                  className="w-full md:w-1/2 rounded-2xl object-cover"
                />
                <p className="text-lg md:text-xl m-4 p-2">
                  Our emergency department operates 24/7, ready to provide
                  immediate and life-saving care to those in need.
                </p>
              </div>
            </div>
            <div>
              <strong className="text-lg md:text-xl">
                Patient-Centric Approach:
              </strong>
              <p className="text-lg md:text-xl m-4 p-2">
                Our approach is centered around the well-being of our patients.
                We provide personalized care, ensuring each patient receives the
                attention and treatment they deserve.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 mt-3">
        <h6 className="font-[Arial] text-[28px] mt-4 font-semibold underline ">
          Community Engagement
        </h6>
        <div className="flex bg-slate-300 rounded-2xl shadow-md w-full m-3  max-sm:flex-col">
          <img
            src="/assets/Photos/hospital/medical-camp.jpg"
            alt="medical-camp"
            className="h-52 m-3 rounded-2xl shadow-xl "
          />
          <p className="mx-5 mb-3  text-base text-wrap overflow-x-hidden md:text-xl m-6  max-sm:text-base p-2">
            We believe in giving back to the community. JSV Hospitals regularly
            conducts health camps, awareness programs, and free medical
            check-ups to promote health and well-being in the region. Our
            outreach programs aim to educate and empower the community with
            knowledge about preventive healthcare and wellness.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
