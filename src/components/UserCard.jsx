import React from "react";
import { defaultUrl } from "../utils/constants";

const UserCard = ({ user, disableActions = false }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName, profileUrl, about, age, gender } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={profileUrl || defaultUrl}
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
        {!disableActions && (
          <div className="card-actions justify-end">
            <button className="btn btn-secondary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
