import axios from "axios";

const API = axios.create({
    baseURL: "https://bom-api-1-0-1.onrender.com/api/v1"
})

export { API }