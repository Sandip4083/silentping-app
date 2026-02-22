import { Message } from "@/model/User";

export interface ApiResponse {
    success: boolean;
    message: string;
    isAccountVerified?: boolean;
    messages?: Array<Message>
}
