import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";

export async function GET() {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return Response.json(
            { success: false, message: "Not authenticated" },
            { status: 401 }
        );
    }

    const userId = new mongoose.Types.ObjectId(session.user._id);

    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },
            { $sort: { "messages.createdAt": -1 } },
            { $group: { _id: "$_id", messages: { $push: "$messages" } } },
        ]);

        if (!user || user.length === 0) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Filter out null messages (when user has no messages)
        const messages = user[0].messages.filter((msg: unknown) => msg && typeof msg === "object" && msg !== null && "content" in (msg as Record<string, unknown>));

        return Response.json(
            { success: true, messages },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error getting messages:", error);
        return Response.json(
            { success: false, message: "Error getting messages" },
            { status: 500 }
        );
    }
}
