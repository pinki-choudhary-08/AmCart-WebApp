// Class for Address.
export class Address {
    constructor(
    public id: string,
    public customerName: string,
    public addressLine1: string,
    public addressLine2: string,
    public landmark: string,
    public city: string,
    public state: string,
    public pincode: string,
    public isDefault: boolean,
    public contactNumber: string,
    public country: string,
    public addressType: number, ) {}
}
