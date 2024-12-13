import { User } from "./src/models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const CreateAdmin = async () => {
    try {
        const email = process.env.ADMIN_EMAIL;
        const user = await User.findOne({ email });
        if(user){
            return console.log("Admin already exists");

        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        const admin = new User({ name: "Admin", email, password: hashedPassword, isAdmin: true });


        await admin.save();
       console.log("Admin created");
    } catch (error) {
        console.log(error);
    }
}   

export default CreateAdmin;