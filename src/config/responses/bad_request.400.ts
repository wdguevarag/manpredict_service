import { httpResponse } from "../helpers/add_response"

export const badRequest = (error: object): httpResponse => {
    return {
        status: 400,
        content: {
            success: false,
            message: 'BAD_REQUEST',
            error: error,
        }
    }
}