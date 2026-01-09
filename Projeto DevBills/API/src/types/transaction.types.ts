import type { TransactionType } from "@prisma/client"
import type { CategorySummary } from "./category.tipes";

export interface TransactionFilter {
    userId: string,
    date?:{
        gte: Date
        lte: Date
    },
    type?: TransactionType
    categoryId?: string;
}

//se usa uma ? é porque não é obrigatório

export interface TransactionSummary {
    totalExpenses: number;
    totalIncomes: number;
    balance: number;
    expensesByCategory: CategorySummary[]
}