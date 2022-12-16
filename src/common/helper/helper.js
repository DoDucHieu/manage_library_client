
const getUserInfor = () => {
  const user = localStorage.getItem("user");
  return user;
};

const removeUser = () =>{
  localStorage.removeItem("user");
}

const helper = {
  getUserInfor,
  removeUser
};

export default helper;
