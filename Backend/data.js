import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Chung",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      role: "admin",
      department: "Finance",
      avatar:
        "http://res.cloudinary.com/dj1fsj5ec/image/upload/v1679611526/r4i3tsryjcwht4qvtbvn.jpg",
    },
    {
      name: "Thanh",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      role: "staff",
      department: "Finance",
      avatar:
        "http://res.cloudinary.com/dj1fsj5ec/image/upload/v1679611526/r4i3tsryjcwht4qvtbvn.jpg",
    },
  ],
};
export default data;
