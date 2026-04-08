import type { Friend } from "../../model/friend.js";
import { getFriends } from "../getUserDetail/fetch_data.js";

class UserValidation {
  emailExist = async (email: string) => {
    const data: Friend[] = await getFriends();
    if (data.length === 0) {
      return false;
    }
    const result = data.some((e: Friend) => e.email === email);
    if (result) {
      console.log("📧 Email already Exist");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("Invalid email format. Use: username@company.com");
      return false;
    }
    return true;
  };

  isValidNumber = async (phone: string) => {
    if (phone.length !== 10) {
      console.log("Phone number must be exactly 10 digits.");
      return false;
    }
    if (!/^\d+$/.test(phone)) {
      console.log("Phone number should contain only digits");
      return false;
    }
    const data = await getFriends();
    const exists = data.some((p: Friend) => {
      p.phone === phone;
    });
    if (exists) {
      console.log("☎️ Phone number already exist.");
      return false;
    }
    return true;
  };
}
