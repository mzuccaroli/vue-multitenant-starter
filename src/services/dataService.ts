import axios from "axios";
import userInterface, { User } from "@/models/user.interface.ts";

export async function geUsers(): Promise<User[]> {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
  return res.data.map(userInterface.deserialize);
}
