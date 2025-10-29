import { io } from "socket.io-client";
import { BASE_URL } from "./api";

export function createSocketConnection() {
  return io(BASE_URL);
}
