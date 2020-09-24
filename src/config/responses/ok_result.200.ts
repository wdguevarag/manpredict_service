import { httpResponse } from '../helpers/add_response';

export const okResponse = (data: object): httpResponse => {
    return {
        status: 200,
        content: {
            success: true,
            message: 'OK_SUCCESSFULLY',
            result: data,
        },
    };
};
