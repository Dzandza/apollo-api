import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Client } from "./Client";
import { CreditAnalysis } from "./CreditAnalysis";
import { LoanPurpose } from "./LoanPurpose";

@Index("loan_request_pkey", ["id"], { unique: true })
@Entity("loan_request", { schema: "public" })
export class LoanRequest {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("numeric", { name: "loan_amount" })
  loanAmount: string;

  @Column("integer", { name: "number_of_monthly_payments" })
  numberOfMonthlyPayments: number;

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
    client => client.loanRequests
  )
  @JoinColumn([{ name: "client", referencedColumnName: "id" }])
  client: Client;

  @ManyToOne(
    () => CreditAnalysis,
    creditAnalysis => creditAnalysis.loanRequests
  )
  @JoinColumn([{ name: "credit_analysis", referencedColumnName: "id" }])
  creditAnalysis: CreditAnalysis;

  @ManyToOne(
    () => LoanPurpose,
    loanPurpose => loanPurpose.loanRequests
  )
  @JoinColumn([{ name: "loan_purpose", referencedColumnName: "id" }])
  loanPurpose: LoanPurpose;
}
