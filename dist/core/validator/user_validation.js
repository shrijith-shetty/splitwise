import { getFriends } from "../../repository/getUserDetail/fetch_data.js";
export class UserValidation {
    validateEmail = async (email, opts) => {
        if (email.trim() === "")
            return true;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.log("Invalid email format. Use: username@company.com");
            return false;
        }
        const data = (await getFriends()) || [];
        const exists = data.some((e) => !e.isDeleted &&
            e.email === email &&
            (opts?.ignoreId ? e.id !== opts.ignoreId : true));
        if (exists) {
            console.log("Email already exists");
            return false;
        }
        return true;
    };
    isValidNumber = async (phone, opts) => {
        if (phone.trim() === "")
            return true;
        if (phone.length !== 10) {
            console.log("Phone number must be exactly 10 digits.");
            return false;
        }
        if (!/^\d+$/.test(phone)) {
            console.log("Phone number should contain only digits");
            return false;
        }
        const data = (await getFriends()) || [];
        const exists = data.some((p) => !p.isDeleted &&
            p.phone === phone &&
            (opts?.ignoreId ? p.id !== opts.ignoreId : true));
        if (exists) {
            console.log("Phone number already exists.");
            return false;
        }
        return true;
    };
}
//# sourceMappingURL=user_validation.js.map