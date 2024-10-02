import RestService from "./RestService"; // Assuming RestService is set up to make HTTP requests
import config from "../config";

const baseUrl = "/user"; // Matches the @RequestMapping in the backend

const UserService = {
  
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
