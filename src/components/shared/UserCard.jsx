import React from "react";
import { defaultUrl } from "../../utils/constants";

const UserCard = ({ user, ActionComponent }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName, profileUrl, about, age, gender } = user;
  let imageUrl = profileUrl || defaultUrl;
  if (typeof imageUrl === "object") imageUrl = URL.createObjectURL(profileUrl);
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={imageUrl}
          className="w-full aspect-square object-contain"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p>
            {age}, <span className="capitalize">{gender}</span>
          </p>
        )}
        <p>{about || "This is default about"}</p>
        {ActionComponent && ActionComponent}
      </div>
    </div>
  );
};

export default UserCard;
