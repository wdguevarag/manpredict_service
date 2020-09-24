/***
 * Extendemos Express
 */
declare module Express {

    /***
     * Agregamos caracteristicas al Response
     */
    export interface Response {
        /***
         * Status 200
         */
        ok(data: object): any;

        /**
         * Status 400
         */
        badRequest(error: object): any;
    }
}