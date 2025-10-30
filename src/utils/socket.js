import { io } from "socket.io-client";
import { BASE_URL } from "./api";

export function createSocketConnection() {
  if (import.meta.env.MODE === "development") return io(BASE_URL);
  return io("/", { path: "/api/socket.io" });
}
