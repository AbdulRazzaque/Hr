import axios from "axios";
import config from "../auth/Config";

// ✅ Update employee status to rejoined
export const updateEmployeeRejoinStatus = async (employeeId) => {
  try {
    const response = await axios.put(
      `${config.baseUrl}/api/updateStatus/${employeeId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ✅ Get all employees with status "Rejoin"
export const fetchRejoinedEmployees = async () => {
  try {
    const response = await axios.get(
      `${config.baseUrl}/api/allRejoinEmployee`,
      {
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
