export interface AppUser {
    _id: string;
    name: string;
    type: string;
    available: string;
    email: string;
    phoneNo: string;
    baseLocation: Location;
    currentLocation: Location;
    baseAddress: string;
}