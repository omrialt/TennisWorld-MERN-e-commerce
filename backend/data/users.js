import bcrypt from "bcrypt";
const users = [
  {
    name: "Omri Altaras",
    email: "omrialt@gmail.com",
    password: bcrypt.hashSync("omri0908", 12),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "user@example.com",
    password: bcrypt.hashSync("123456", 12),
  },
  {
    name: "Jane Doe",
    email: "users@example.com",
    password: bcrypt.hashSync("123456", 12),
  },
];
export default users;
