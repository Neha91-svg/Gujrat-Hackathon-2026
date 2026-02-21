export const success = (data, message = "Success") => ({
  success: true,
  message,
  data
});

export const failure = (message = "Error") => ({
  success: false,
  message
});