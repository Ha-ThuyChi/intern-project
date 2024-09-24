export declare enum Status {
    ACTIVE = "ACTIVE",
    DISABLE = "DISABLE",
    PENDING = "PENDING"
}
export declare class SignUpDTO {
    name: string;
    email: string;
    password: string;
    address: string;
    dob: string;
    phone: string;
    status: Status;
}
