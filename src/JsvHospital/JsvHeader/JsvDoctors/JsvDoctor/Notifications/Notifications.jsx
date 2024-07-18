import React, { useState, forwardRef, useImperativeHandle } from "react";

const Notifications = forwardRef((props, ref) => {
  const [notifications, setNotifications] = useState([]);

  // Function to handle new patient submission notification
  const handleNewPatientNotification = (formData) => {
    const notification = formData;
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  console.log(notifications);

  // Expose handleNewPatientNotification to parent components
  useImperativeHandle(ref, () => ({
    handleNewPatientNotification,
  }));

  return (
    <>
      <div className="text-xl font-bold mb-4">Notifications</div>
      <div className="space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="notification bg-blue-100 p-2 rounded shadow"
          >
            {notification}
          </div>
        ))}
      </div>
    </>
  );
});

export default Notifications;
