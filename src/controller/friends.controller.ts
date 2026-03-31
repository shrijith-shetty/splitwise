import type { ReturnModel } from "../core/return-type.js";
import type { Friend } from "../models/freind.model.js";
import { FriendsRepository } from "../repository/friends.repository.js";

export class FriendsController {
  checkEmailExist(email: string) {
    return false;
  }
  checkPhoneExists(phone: string) {
    return false;
  }
  addFriend(friend: Friend): ReturnModel<Friend> {
    if (!FriendsRepository.getInstance()) {
      console.error("Failed to get the instance of FriendRepository");
      return { success: false };
    }
    const response = FriendsRepository.getInstance().addFriend(friend);
    if (response.success) return { success: true };
    console.error("Error: adding friend to DB failed");
    return { success: false };
  }
}
