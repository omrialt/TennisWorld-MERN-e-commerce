export const validateEmail = (mail) => {
  return String(mail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const validatePassword = (password) => {
  return String(password).match(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[@$!%*?&])(?=.*\d{4,})[a-zA-Z\d!@#$%^&*]{8,}$/
  );
};
