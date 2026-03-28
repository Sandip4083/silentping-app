import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ messageid: string }> }
) {
    const { messageid } = await params;
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return Response.json(
            { success: false, message: "Not authenticated" },
            { status: 401 }
        );
    }

    try {
        const result = await UserModel.updateOne(
            { _id: session.user._id },
            { $pull: { messages: { _id: messageid } } }
        );

        if (result.modifiedCount === 0) {
            return Response.json(
                { success: false, message: "Message not found or already deleted" },
                { status: 404 }
            );
        }

        return Response.json(
            { success: true, message: "Message deleted" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting message:", error);
        return Response.json(
            { success: false, message: "Error deleting message" },
            { status: 500 }
        );
    }
}
