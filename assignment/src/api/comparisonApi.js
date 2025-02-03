export const fetchComparisonData = async () => {
  const response = await fetch("http://localhost:5000/api/comparison");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
