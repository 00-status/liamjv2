
export type Item = {
    name: string,
    cost: number,
    currency: string,
    weight: number | null
};

export type Currency = {
    gold: number;
    silver: number;
    copper: number;
};

export type PlayerCurrency = {
    gold: number | string;
    silver: number | string;
    copper: number | string;
};

export enum CurrencyEnum {
    Gold = "gold",
    Silver = "silver",
    Copper = "copper" 
};
