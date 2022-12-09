import { io } from "socket.io-client";
import Socket_URL from "../src/Socket_URL"; 

const socket = io.connect(`${Socket_URL}`);
export default socket;