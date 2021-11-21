interface IUsers {
    username: string;
    email: string;
    password: string;
    townhall: {
        resource: {
            golds: number;
            foods: number;
            soldiers: number;
            medals: number;
        };
    };
    market: {
        amount: number;
        resource: Array<Market>;
    };
    farm: { amount: number; resource: Array<Farm> };
    barrack: { amount: number; resource: Array<Barrack> };
}

interface Market {
    id: string;
    name: string;
    gold: number;
}

interface Farm {
    id: string;
    name: string;
    food: number;
}

interface Barrack {
    id: string;
    name: string;
    soldier: number;
}

export default IUsers;
