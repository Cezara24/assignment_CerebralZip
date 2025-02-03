import { useSelector } from "react-redux";

export const fetchFinancialSummary = async (_, { getState }) => {
  const { username, password } = getState().auth;

  if (!username || !password) {
    throw new Error("Not authenticated");
  }

  const response = await fetch("http://3.111.196.92:8020/api/v1/sample_assignment_api_1/", {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch financial summary");
  }

  return response.json();
};
