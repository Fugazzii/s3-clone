export abstract class IException {
    protected readonly name: string;
    protected readonly error: Error;
    protected readonly stack: string;

    public constructor(protected readonly errorMessage: string) {
        this.name = this.constructor.name;
        this.error = new Error(errorMessage);
        this.stack = this.error.stack as string;
    }
}
