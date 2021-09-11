export interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: UserRole;
    created_at: string;
    updated_at: string;
    admin_access: string;
}

export interface UserRole {
    id: number;
    name: string;
    description: string;
    type: string;
}