import { getFriends } from "../../repository/getUserDetail/fetch_data.js";
export class UserValidation {
    emailExist = async (email) => {
        const data = await getFriends();
        if (data.length === 0) {
            return false;
        }
        const result = data.some((e) => e.email === email);
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
    isValidNumber = async (phone) => {
        if (phone.length !== 10) {
            console.log("Phone number must be exactly 10 digits.");
            return false;
        }
        if (!/^\d+$/.test(phone)) {
            console.log("Phone number should contain only digits");
            return false;
        }
        const data = await getFriends();
        const exists = data.some((p) => {
            p.phone === phone;
        });
        if (exists) {
            console.log("☎️ Phone number already exist.");
            return false;
        }
        return true;
    };
}
//# sourceMappingURL=user_validation.js.map