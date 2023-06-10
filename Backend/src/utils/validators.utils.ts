// Function to check if the email is valid or not using regex
export const isValidEmail = (email: string) => {
  return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

// Function to check if the password is valid or not using regex
export const isValidPassword = (password: string) => {
  return password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
};

export const isRecordExists = async (model: any, where: any) => {
  const record = await model.findOne({ where });
  return record ? true : false;
};
