import RestService from "./RestService"; // Assuming RestService is set up to make HTTP requests
import config from "../config";
import axios from "axios";

const baseUrl = "/user"; // Matches the @RequestMapping in the backend

const UserService = {

  login: async (encodedCredentials) => {
    const config = {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
    },
  }
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/token`, config);
    return response.data; // Return the data from the response if successful
},
  
  findAll: async () => {
    try {
      return await RestService.GetAllData(baseUrl);
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error; // Handle error as needed
    }
  },

  findPagable: async (pageNo = 0) => {
    try {
      return await RestService.GetAllData(`${baseUrl}?size=${config.DEFAULT_SIZE_PAGE}&pageNo=${pageNo}`);
    } catch (error) {
      console.error(`Error fetching users for page ${pageNo}:`, error);
      throw error;
    }
  },

  findOne: async (id) => {
    try {
      return await RestService.GetByIdData(baseUrl, id);
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  createUser: async (data) => {
    try {
      return await RestService.CreateData(baseUrl, data);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  updateUser: async (data) => {
    try {
      return await RestService.UpdateData(baseUrl, data.id, data);
    } catch (error) {
      console.error(`Error updating user with ID ${data.id}:`, error);
      throw error;
    }
  },
};

export default UserService;
