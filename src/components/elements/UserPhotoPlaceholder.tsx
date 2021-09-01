import React from "react";
import userPhoto from "../../assets/images/user.jpg";

export const UserPhotoPlaceholder = () => {
  return (
    <div>
      <img
        src={userPhoto}
        alt='userPhoto placeholder'
        style={{ height: "100%", width: "100%", marginTop: -5 }}
      />
    </div>
  );
};
