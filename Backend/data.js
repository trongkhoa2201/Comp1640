import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Chung",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      role: "admin",
      department: "Finance",
    },
    {
      name: "Thanh",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      role: "staff",
      department: "Finance",
    },
  ],
};
export default data;
