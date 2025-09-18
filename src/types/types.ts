"use client"
export interface Shakes{
    id:number;
    title:string;
    method: string;
    rating:number;
}
export type NewShake = Omit<Shakes, "id">;