import { io } from "socket.io-client";
import API_URL from "../src/App_URL";
const socket = io.connect(`${API_URL}`);
export default socket;