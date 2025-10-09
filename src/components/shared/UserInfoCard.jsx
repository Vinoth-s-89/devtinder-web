import React from "react";
import { defaultUrl } from "../../utils/constants";

const UserInfoCard = ({ data, ActionComponent }) => {
  return (
    <div className="w-full grid grid-cols-[80px_1fr] bg-base-100 p-3.5 items-start gap-2.5">
      <div className="w-full">
        <img
          className="rounded-full aspect-square object-cover"
          alt="image"
          src={data?.profileUrl || defaultUrl}
        />
      </div>
      <div className="flex flex-col justify-center px-2">
        <div className="text-lg font-semibold">{`${data?.firstName} ${data?.lastName}`}</div>
        {data.age && data.gender && (
          <p className="text-gray-300">
            {data.age} ,<span className="capitalize">{data.gender}</span>
          </p>
        )}
        <p className="text-sm w-full line-clamp-4 text-gray-300">
          {data?.about || "No about"}
        </p>
      </div>
      {ActionComponent && ActionComponent}
    </div>
  );
};

export default UserInfoCard;
