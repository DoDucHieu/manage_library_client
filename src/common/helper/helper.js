const getUserInfor = () => {
  const user = localStorage.getItem("user");
  return user;
};

const helper = {
  getUserInfor,
};

export default helper;
