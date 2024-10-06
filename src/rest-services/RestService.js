import axiosInstance from "./axiosConfig";
import { useState, useEffect } from "react";
const CreateData = async (path, data) => {
  const encodedCredentials = localStorage.getItem('encodedCredentials');
  const config = {
    headers: {
      'Authorization': `Bearer ${encodedCredentials}`
    }
  };
  try {
    const response = await axiosInstance.post(path, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error creating ${path}:`, error);
    return error.response.data
  }
};

const CreateDataWithState = (path, data) => {
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    const encodedCredentials = localStorage.getItem('encodedCredentials');
    const config = {
      headers: {
        'Authorization': `Bearer ${encodedCredentials}`
      }
    };
    try {
      axiosInstance.post(path, data, config).then((res) => {
        setResultData(res.data);
        setLoading(false)
      });

    } catch (error) {
      setLoading(false)
      console.error(`Error fetching ${path}s:`, error);
      setResultData(error.response.data);
    }
  }, [path, data]);

  return [resultData, setResultData, loading, setLoading];

};

const UpdateData = async (path, data) => {
  const encodedCredentials = localStorage.getItem('encodedCredentials');
  const config = {
    headers: {
      'Authorization': `Bearer ${encodedCredentials}`
    }
  };
  try {
    const response = await axiosInstance.put(path, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error creating ${path}:`, error);
    return error.response.data
  }
};
const UpdateUserData = async (path, data) => {
  const encodedCredentials = localStorage.getItem('encodedCredentials');
  const config = {
    headers: {
      'Authorization': `Bearer ${encodedCredentials}`
    }
  };
  try {
    const response = await axiosInstance.post(path, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error updating ${path}:`, error);
    return error.response ? error.response.data : { error: 'Unknown error occurred' };
  }
};


const PartialUpdateData = async (path, data) => {
  const encodedCredentials = localStorage.getItem('encodedCredentials');
  const config = {
    headers: {
      'Authorization': `Bearer ${encodedCredentials}`
    }
  };
  try {
    const response = await axiosInstance.patch(path, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error creating ${path}:`, error);
    return error.response != null ? error.response.data : {}
  }
};

const DeleteData = async (path, id) => {
  const encodedCredentials = localStorage.getItem('encodedCredentials');
  const config = {
    headers: {
      'Authorization': `Bearer ${encodedCredentials}`
    }
  };
  try {
    const response = await axiosInstance.delete(`${path}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error deleting ${path}:`, error);
    return error.response.data
  }
};

const DeleteDataWithState = async (path, id) => {


  const [data, setData] = useState(null);
  useEffect(() => {
    const encodedCredentials = localStorage.getItem('encodedCredentials');
    const config = {
      headers: {
        'Authorization': `Bearer ${encodedCredentials}`
      }
    };
    try {
      axiosInstance.delete(`${path}/${id}`, config).then((res) => { setData(res.data.data) });

    } catch (error) {

      console.error(`Error fetching ${path}s:`, error);
      setData(error.response.data);
    }
  }, [path, id]);

  return [data, setData];

};

const GetAllDataWithState = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    const encodedCredentials = localStorage.getItem('encodedCredentials');
    const config = {
      headers: {
        'Authorization': `Bearer ${encodedCredentials}`
      }
    };
    try {
      axiosInstance.get(path, config).then((res) => {
        setData(res.data);
        setLoading(false)
      });

    } catch (error) {
      setLoading(false)
      console.error(`Error fetching ${path}s:`, error);
      setData(error.response.data);
    }
  }, [path]);

  return [data, setData, loading, setLoading];
};

const GetAllData = async (path) => {
  const encodedCredentials = localStorage.getItem('encodedCredentials');
  const config = {
    headers: {
      'Authorization': `Bearer ${encodedCredentials}`
    }
  };
  try {
    const res = await axiosInstance.get(path, config);
    return res.data;
  } catch (error) {

    console.error(`Error fetching ${path}s:`, error);
    return error.response.data
  };
};

const GetByIdData = async (path, id) => {
  const encodedCredentials = localStorage.getItem('encodedCredentials');
  const config = {
    headers: {
      'Authorization': `Bearer ${encodedCredentials}`
    }
  };
  try {
    const response = await axiosInstance.get(`${path}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return error.response.data;
  }
};
const GetByIdDataWithState = (path, id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const encodedCredentials = localStorage.getItem('encodedCredentials');
    const config = {
      headers: {
        'Authorization': `Bearer ${encodedCredentials}`
      }
    };
    try {
      axiosInstance.get(`${path}/${id}`, config).then((res) => {
        setData(res.data);
        setLoading(false)
      });
    } catch (error) {
      setLoading(false)
      console.error(`Error fetching ${path}s:`, error);
      setData(error.response.data);
    }
  },[path,id])
  return [data, setData, loading, setLoading];
};


const RestService = {
  CreateData,
  UpdateData,
  UpdateUserData,
  DeleteData,
  DeleteDataWithState,
  GetAllDataWithState,
  GetByIdData,
  GetAllData,
  CreateDataWithState,
  PartialUpdateData,
  GetByIdDataWithState
}

export default RestService;

