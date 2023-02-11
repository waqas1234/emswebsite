// add axios //
import axios from "axios";
const ApiRequest = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiRequest;
