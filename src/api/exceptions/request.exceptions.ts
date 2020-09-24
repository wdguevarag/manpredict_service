export class RequestException {
    public errors: any;

    constructor(errors: any) {
        this.errors = errors;
    }
}

export class RequestDatabaseException {
    public errors: any;

    constructor(errors: any) {
        this.errors = errors;
    }
}
