export const loginRequest = async ({ username, password }) => {
  const response = await fetch("http://3.111.196.92:8020/api/v1/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email: "trial@example.com",
      password,
      phone_number: "1234567890",
      input_code: 0,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Try again later.");
  } else if (data.message === "Incorrect Username" || data.message === "Incorrect Password") {
    // For security reasons, the message will not display which of the two (username or password) is incorrect.
    throw new Error("Wrong name or password");
  }

  return data;
};
