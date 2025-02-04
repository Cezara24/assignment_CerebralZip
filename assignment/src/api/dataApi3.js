import { useSelector } from "react-redux";

export const fetchPerformanceScoreData = async (_, { getState }) => {
  const { username, password } = getState().auth;

  if (!username || !password) {
    throw new Error("Not authenticated");
  }

  const response = await fetch("http://3.111.196.92:8020/api/v1/sample_assignment_api_3/", {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch performance score data");
  }

  return response.json();
};
