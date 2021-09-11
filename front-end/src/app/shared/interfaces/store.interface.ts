export interface Store {
    _id: string;
    name: string;
    type: string;
    address: string;
    phoneNo: string;
    freshMeats: boolean;
    freshVeggies: boolean;
    dairy: boolean;
    poultry: boolean;
    bakery: boolean;
    location: Location;
}

export interface Location {
    latitude: number;
    longitude: number;
}