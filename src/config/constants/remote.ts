import { CONFIG } from '../core/environment';

/**
 * ALL STATUS ALLOWS
 */
const all_status: number[] = [200, 500, 404, 400];

/**
 * VALIDATE STATUS RESPONSES FROM API
 */
export const VALIDATE_STATUS_RESPONSE = (status: number) => {
    return all_status.includes(status);
};

/**
 * MAX WAIT TIME FOR API CALL
 */
export const TIMEOUT_RESPONSE = 5000;

/**
 * ALL URLS APIS REMOTE
 */
export const REMOTE_API = {
    /**
     * APIS SITES SERVICES
     */
    // LABOURS_BY_IDS: `${CONFIG.REMOTE_API.EX_SITES_SERVICE}/all/api/site/ms4m/v1/labours/by-ids`,
};
