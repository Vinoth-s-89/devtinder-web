import React from "react";
import { defaultUrl } from "../../utils/constants";

const UserInfoCard = ({ userData, ActionComponent }) => {
  return (
    <div className="min-w-[300px] w-[50%] max-w-[700px] flex flex-col gap-3.5">
      {userData.map((connection) => (
        <div
          className="grid grid-cols-[80px_1fr] bg-base-100 p-3.5 items-start gap-2.5"
          key={connection._id}
        >
          <div className="w-full">
            <img
              className="rounded-full aspect-square object-cover"
              alt="image"
              src={connection?.profileUrl || defaultUrl}
            />
          </div>
          <div className="flex flex-col justify-center px-2">
            <div className="text-lg font-semibold">{`${connection?.firstName} ${connection?.lastName}`}</div>
            {connection.age && connection.gender && (
              <p className="text-gray-300">
                {connection.age} ,
                <span className="capitalize">{connection.gender}</span>
              </p>
            )}
            <p className="text-sm w-full line-clamp-4 text-gray-300">
              {connection?.about || "No about"}
            </p>
          </div>
          {ActionComponent && <ActionComponent data={connection} />}
        </div>
      ))}
    </div>
  );
};

export default UserInfoCard;
