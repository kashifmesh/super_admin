import { useEffect, useState } from "react";
import axiosInstance from "../../services/interceptors/axiosInstance";
import Swal from "sweetalert2";
// import { useTranslation } from "@/app/i18n/index";
// import i18n from "@/app/i18n/index";
// import i18nConfig from "../../../../../i18next.config";
// import i18nIndex from "@/app/i18n/index";
import './api.css'
import Cookies from "js-cookie";

let getLang;

export const fetchData = (url, optionalParams = {}) => {
  getLang = getCurrentlang();
  return axiosInstance
    .get(getLang !== "en" ? url + "?locale=" + getLang : url, {
      params: optionalParams,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchFile = (url, optionalParams = {}) => {
  getLang = getCurrentlang();
  return axiosInstance
    .get(getLang !== "en" ? url + "?locale=" + getLang : url, {
      params: optionalParams,
      responseType: 'blob'
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const getCurrentlang = () => {
  return Cookies.get("lng");
};

export const postData = (
  url,
  data,
  file,
  optionalParams = {},
  is_object = false,
  object_name = "",
  showalert = true
) => {
  const { files = {}, ...restParams } = optionalParams;
  const formData = new FormData();

  let providers = [];

  Object.keys(data).forEach((key) => {
    if (is_object === true) {
      let providerObject = {};

      Object.keys(data[key]).forEach((k) => {
        providerObject[k] = data[key][k];
      });

      providers.push(providerObject);
      formData.append(object_name, JSON.stringify(providers));
    } else {
      // Optimized handling for different data types
      const value = data[key];

      if (key === 'weekdays' && Array.isArray(value)) {
        // Handle weekdays as array - append each day name
        value.forEach((day, index) => {
          formData.append(`weekdays[${index}]`, day);
        });
      } else if (Array.isArray(value)) {
        // Handle other arrays - append each item
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (typeof value === 'boolean') {
        // Handle booleans properly
        formData.append(key, value ? '1' : '0');
      } else if (value !== null && value !== undefined) {
        // Handle other values
        formData.append(key, value);
      }
    }
  });

  getLang = getCurrentlang();
  let localeUrl = `${url}?locale=${getLang}`;

  if (getLang != "en") {
    return axiosInstance
      .post(
        localeUrl,
        formData,
        { params: restParams },
        { headers: { "Content-Type": "multipart/form-data" } }
      )

      .then((response) => {
        // if (showalert) successAlert("Saved", response.data.message);
        return response;
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          return error.response.data; // Throw the validation error message
        } else {
          throw error;
        }
      });
  }

  if (getLang == "en") {
    return axiosInstance
      .post(
        url,
        formData,
        { params: restParams },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        // if (showalert) successAlert("Saved", response.data.message);
        return response;
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          return error.response.data; // Throw the validation error message
        } else {
          throw error;
        }
      });
  }
};

// Optimized JSON POST method that sends weekdays as array of full day names
export const postDataJSON = (
  url,
  data,
  optionalParams = {},
  showalert = true
) => {
  const { ...restParams } = optionalParams;

  // Data is already prepared by validateAndPrepareData, so send as-is
  const transformedData = { ...data };

  getLang = getCurrentlang();
  let localeUrl = getLang !== "en" ? `${url}?locale=${getLang}` : url;

  console.log("Final API payload:", transformedData);

  return axiosInstance
    .post(
      localeUrl,
      transformedData, // Send data as JSON with weekdays as array
      {
        params: restParams,
        headers: {
          "Content-Type": "application/json" // Use JSON content type
        }
      }
    )
    .then((response) => {
      // if (showalert) successAlert("Saved", response.data.message);
      return response;
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        throw error.response; // Throw the full response for better error handling
      } else {
        throw error;
      }
    });
};

// New function to handle nested payload structures (group_plans, provider_plans, documents)
export const postDataWithNestedPayload = (
  url,
  payload,
  optionalParams = {},
  showalert = true
) => {
  const { ...restParams } = optionalParams;
  const formData = new FormData();

  // Helper function to recursively flatten nested objects and arrays
  const flattenData = (obj, parentKey = '') => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value === null || value === undefined) {
        // Skip null/undefined
        return;
      }

      // Special handling for documents array
      if (key === 'documents' && Array.isArray(value)) {
        value.forEach((doc, index) => {
          if (doc && typeof doc === 'object') {
            // Handle file field
            if (doc.file instanceof File) {
              formData.append(`documents[${index}][file]`, doc.file);
            }
            // Handle other document properties
            if (doc.document_name) {
              formData.append(`documents[${index}][document_name]`, doc.document_name);
            }
            if (doc.is_group_document !== undefined) {
              formData.append(`documents[${index}][is_group_document]`, doc.is_group_document ? '1' : '0');
            }
          }
        });
        return; // Skip further processing for documents
      }

      // Handle arrays (group_plans, provider_plans, etc.)
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'object' && item !== null && !(item instanceof File)) {
            // Recursively flatten nested objects in arrays
            flattenData(item, `${newKey}[${index}]`);
          } else if (typeof item === 'boolean') {
            // Explicitly convert boolean to integer string
            formData.append(`${newKey}[${index}]`, item ? '1' : '0');
          } else if (item !== null && item !== undefined) {
            formData.append(`${newKey}[${index}]`, String(item));
          }
        });
        return; // Skip further processing for arrays
      }

      // Handle nested objects (but not File objects)
      if (typeof value === 'object' && !(value instanceof File)) {
        flattenData(value, newKey);
        return; // Skip further processing for objects
      }

      // Handle boolean values
      if (typeof value === 'boolean') {
        formData.append(newKey, value ? '1' : '0');
        return;
      }

      // Handle all other types (strings, numbers, etc.)
      formData.append(newKey, value);
    });
  };

  // Start flattening the payload
  flattenData(payload);

  getLang = getCurrentlang();
  let localeUrl = getLang !== "en" ? `${url}?locale=${getLang}` : url;

  // Log FormData entries for debugging
  const debugLog = {};
  for (const [key, value] of formData.entries()) {
    const isFile = value instanceof File;
    debugLog[key] = isFile ? `File: ${value.name} (${value.size} bytes)` : value;
  }
  console.log("FormData being sent:", debugLog);
  console.log("Request URL:", localeUrl);

  return axiosInstance
    .post(
      localeUrl,
      formData,
      {
        params: restParams,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        console.error("Validation errors:", error.response.data);
        return error.response.data;
      } else {
        throw error;
      }
    });
};

export const successAlert = (title, msg) => {
  Swal.fire({
    title: title,
    text: msg,
  });
};

export const validationAlert = (title, msg) => {
  Swal.fire({
    title: title,
    text: msg,
  });
};

export const toastAlert = (title, msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    width: 470,
    timerProgressBar: true,
    
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon: "error",
    title: title,
  });
};

// Utility function to validate and prepare data before sending
export const validateAndPrepareData = (data) => {
  const prepared = {};

  // Map short weekday names to full names as expected by API
  const weekdayFullNameMap = {
    'Mon': 'Monday',
    'Tue': 'Tuesday',
    'Wed': 'Wednesday',
    'Thu': 'Thursday',
    'Fri': 'Friday',
    'Sat': 'Saturday',
    'Sun': 'Sunday'
  };

  Object.keys(data).forEach(key => {
    const value = data[key];

    if (key === 'weekdays') {
      // Ensure weekdays is always an array of full day names
      if (Array.isArray(value)) {
        prepared[key] = value.map(day => {
          // Convert short names to full names, or keep as is if already full
          return weekdayFullNameMap[day] || day;
        }).filter(day => day); // Remove any empty values
      } else if (typeof value === 'string') {
        prepared[key] = value.split(',')
          .map(day => {
            const trimmed = day.trim();
            return weekdayFullNameMap[trimmed] || trimmed;
          })
          .filter(day => day !== '');
      } else {
        prepared[key] = [];
      }
    } else if (key === 'public_holidays') {
      // Ensure public_holidays is always a boolean
      prepared[key] = Boolean(value);
    } else {
      // Keep other values as is
      prepared[key] = value;
    }
  });

  console.log("Data validation result:", {
    original: data,
    prepared: prepared,
    weekdays_mapping: weekdayFullNameMap,
    weekdays_type: typeof prepared.weekdays,
    weekdays_isArray: Array.isArray(prepared.weekdays),
    weekdays_values: prepared.weekdays
  });

  return prepared;
};

export const useFormState = (initialState) => {
  const removeElement = (data, name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((item) => item !== value),
    }));
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      type = null,
      checked = null,
      options = null,
    } = e.target;

    setFormData((prevData) => {
      if (type === "select-multiple") {
        // Check if the name already exists in the formData and convert it to an array
        const updatedValue = Array.isArray(prevData[name]) ? value : [value];

        return {
          ...prevData,
          [name]: [updatedValue],
        };
      } else if (type === "radio") {
        return {
          ...prevData,
          [name]: value,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
    // if (type === 'select-multiple') {
    //   setFormData((prevData) =>
    //   ({
    //     ...prevData,
    //     [name]: [value]
    //   }))

    // } else {
    //   const newValue = type === 'radio' ? checked : value;
    //   setFormData((prevData) =>
    //   ({
    //     ...prevData,
    //     [name]: value
    //   }))
    // }
  };

  const [formData, setFormData] = useState(initialState);
  return { formData, handleChange };
};
