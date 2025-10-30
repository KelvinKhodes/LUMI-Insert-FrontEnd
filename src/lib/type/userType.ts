export type loginForm = {
  username: string,
  password: string,
};

export type registerStaffForm = {
  username: string,
  password: string,
  fullname: string,
};

export type getStaffDataType = {
  id: string,
  username: string,
  role: string,
  fullname: string,
}