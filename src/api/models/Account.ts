import { AccountDb } from "@/db/models/AccountDb";
import Big from "big.js";

export type AccountId = number;

/**
 * @swagger
 *
 * definitions:
 *     Account:
 *         type: "object"
 *         properties:
 *             id:
 *                 type: "integer"
 *                 format: "int32"
 *             balance:
 *                 type: "string"
 *                 format: "decimal"
 */
export type Account = {
    id: AccountId;
    balance: Big;
};

// TODO [RM]: move somewhere else
export const accountFromDbModel = (accountDb: AccountDb): Account => ({
    id: accountDb.id,
    balance: accountDb.balance,
});
