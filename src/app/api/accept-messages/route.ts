import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return Response.json(
            { success: false, message: "Not authenticated" },
            { status: 401 }
        );
    }

    const userId = session.user._id;
    const { acceptMessages } = await request.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages },
            { new: true }
        );

        if (!updatedUser) {
            return Response.json(
                { success: false, message: "Failed to update user" },
                { status: 404 }
            );
        }

        return Response.json(
            { success: true, message: "Message acceptance status updated", isAcceptingMessages: updatedUser.isAcceptingMessages },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating message acceptance:", error);
        return Response.json(
            { success: false, message: "Error updating message acceptance" },
            { status: 500 }
        );
    }
}

export async function GET() {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return Response.json(
            { success: false, message: "Not authenticated" },
            { status: 401 }
        );
    }

    const userId = session.user._id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return Response.json(
            { success: true, isAcceptingMessages: user.isAcceptingMessages },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error getting message acceptance:", error);
        return Response.json(
            { success: false, message: "Error getting message acceptance" },
            { status: 500 }
        );
    }
}
