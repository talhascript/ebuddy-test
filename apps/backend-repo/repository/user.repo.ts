import { db } from "../config/firebase";
import { User } from "../models/user.model";

export default class UserRepository {
  static #name = "USERS"; 

  public async addUser(user: User) {
    const userRef = db.collection(UserRepository.#name).doc(user.email);
    await userRef.set(user);
    return { message: "User added successfully", user };
  }

  public async updateUser(user: User) {
    const userRef = db.collection(UserRepository.#name).doc(user.email);
    await userRef.update({ ...user });
    return { message: "User updated successfully", user };
  }

  public async getUser(email: string) {
    const userRef = db.collection(UserRepository.#name).doc(email);
    const doc = await userRef.get();
    if (!doc.exists) throw new Error("User not found");
    return doc.data();
  }

  public async getAllUsers() {
    const snapshot = await db.collection(UserRepository.#name).get();
    const users: User[] = [];
    snapshot.forEach((doc) => users.push(doc.data() as User));
    return users;
  }
}
