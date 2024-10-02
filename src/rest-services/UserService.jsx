import RestService from "./RestService"; // Assuming RestService is set up to make HTTP requests
import axios from "axios";
const basePath = "/user"; // Matches the @RequestMapping in the backend

const UserService = {
  // Method to create a user
  createUser: async (userData) => {
    try {
      const response = await RestService.createUser(basePath, userData); // userData should match the UserRequestDto structure
      return response; // Return the API response
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Throw error for further handling
    }
  },

  // get the data
  fetchUsers: async (size, pageNo) => {
    try {
        const response = await axios.get(basePath, {
            params: {
                size,
                pageNo,
            },
        });
        return response.data; // Assuming your API returns JSON
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error for handling in the calling function
    }
},
};

export default UserService;
