import React, { useEffect, useState } from "react";
import { apiPaths, appApi } from "../utils/api";
import UserInfoCard from "./shared/UserInfoCard";

const Connections = () => {
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    try {
      const { data } = await appApi.get(apiPaths.connections);
      setConnections(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="h-full flex flex-col items-center py-3.5 gap-y-3.5">
      <div className="text-3xl tracking-wide">Connections</div>
      <UserInfoCard userData={connections} />
    </div>
  );
};

export default Connections;
