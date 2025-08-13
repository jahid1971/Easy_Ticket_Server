// export interface User {
//     id: string;
//     name: string;
//     email: string;
//     phone?: string | null;
//     password: string;
//     role: string; // user, admin, operator
//     createdAt: string;
//     updatedAt: string;
// }

// import { SeatMap } from "./seatMap";

// export interface Bus {
//     id: string;
//     name: string;
//     operator: string;
//     seatMap: SeatMap; // JSON - uses SeatMap type
//     registrationNumber: string;
//     routeId?: string | null; // optional assigned route
//     route?: Route;          // populated route details
//     createdAt: string;
//     updatedAt: string;
// }

// export interface Route {
//     id: string;
//     source: string;
//     destination: string;
//     distance: number;
//     createdAt: string;
//     updatedAt: string;
// }

// export interface Schedule {
//     id: string;
//     busId: string;
//     routeId: string;
//     departureTime: string;
//     arrivalTime: string;
//     price: number;
//     date: string;
//     createdAt: string;
//     updatedAt: string;
// }

// export interface Seat {
//     id: string;
//     scheduleId: string;
//     row: string;
//     column: number;
//     seatNumber: string;
//     isBooked: boolean;
// }

// export interface Booking {
//     id: string;
//     userId: string;
//     scheduleId: string;
//     seatId: string;
//     status: string;
//     paymentId?: string | null;
//     createdAt: string;
//     updatedAt: string;
// }

// export interface Payment {
//     id: string;
//     userId: string;
//     amount: number;
//     status: string;
//     method: string;
//     transactionId: string;
//     createdAt: string;
//     updatedAt: string;
// }

// export type Role = "user" | "admin" | "operator" | string;
