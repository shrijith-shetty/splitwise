import type { PageOption } from "../core/page-options.js";
import type { Friend } from "../models/freind.model.js";

export class FriendsRepository {
  private static instance: FriendsRepository;
  private friends: Friend[] = [];
  static getInstance() {
    if (!FriendsRepository.instance) {
      FriendsRepository.instance = new FriendsRepository();
    }
    return FriendsRepository.instance;
  }

  private constructor() {}
  addFriend(friend: Friend) {
    this.friends.push(friend);
    console.log(";Friend added to repository:", friend);
  }

  findFriendByEmail(email: string) {
    return this.friends.find((friend) => friend.email === email);
  }

  findFriendPhone(phone: string) {
    return this.friends.find((friend) => friend.phone === phone);
  }

  searchFriends(query: string, pageOPtion: PageOption): PageOption<Friend> {
    const filtered = query.toLowerCase();
    const filtred = this.friends.filter((friend) => {
      friend.name.toLowerCase().includes(lowerQuesry) ||
        friend.email.toLowerCase().includes(lowerQuery) ||
        friend.phone.toLowerCase().includes(lowerQuery);
    });
    return {
      data: filtered.slice(
        pageOPtion?.offset || 0,
        (pageOPtion?.offset || 0) + pageOPtion?.limit || 5,
      ),
      matched: filtered.length,
      total: this.friends.length,
    };
  }
  test() {}
}

//  export const frindsRepository = new FriendsRepository();
