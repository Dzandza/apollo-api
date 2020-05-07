import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Client } from "./Client";
import { LoanRequest } from "./LoanRequest";

@Index("credit_analysis_pkey", ["id"], { unique: true })
@Entity("credit_analysis", { schema: "public" })
export class CreditAnalysis {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("numeric", { name: "provable_monthly_income", nullable: true })
  provableMonthlyIncome: string | null;

  @Column("numeric", { name: "unprovable_monthly_income", nullable: true })
  unprovableMonthlyIncome: string | null;

  @Column("numeric", { name: "monthly_household_expense", nullable: true })
  monthlyHouseholdExpense: string | null;

  @Column("boolean", {
    name: "existing_loans",
    nullable: true,
    default: () => "false"
  })
  existingLoans: boolean | null;

  @Column("numeric", {
    name: "existing_monthly_payments_amount",
    nullable: true
  })
  existingMonthlyPaymentsAmount: string | null;

  @Column("boolean", {
    name: "late_payments",
    nullable: true,
    default: () => "false"
  })
  latePayments: boolean | null;

  @Column("character varying", {
    name: "settlement_type",
    nullable: true,
    length: 20
  })
  settlementType: string | null;

  @Column("character varying", {
    name: "tenancy_type",
    nullable: true,
    length: 20
  })
  tenancyType: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(
    () => Client,
    client => client.creditAnalyses
  )
  @JoinColumn([{ name: "client", referencedColumnName: "id" }])
  client: Client;

  @OneToMany(
    () => LoanRequest,
    loanRequest => loanRequest.creditAnalysis
  )
  loanRequests: LoanRequest[];
}
