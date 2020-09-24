import moment from 'moment';
import Socket from '../config/core/socket';
import { SOCKET_TYPES } from '../config/constants/socket';
import { FORMAT_TIMESTAMP_MILLISECONDS } from '../config/constants/timestamp';
import { dataSocketEquipmentPosition } from './types';

/**
 *
 * @param data
 */
export const sendSocketEquipmentPosition = (data: dataSocketEquipmentPosition): void => {
    const socket = Socket.instance;
    socket.services().create({
        type: SOCKET_TYPES.EQUIPMENT_POSITION,
        sendAt: moment().format(FORMAT_TIMESTAMP_MILLISECONDS),
        result: data,
    });
};
