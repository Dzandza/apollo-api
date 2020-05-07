import { Column, Entity, Index, OneToMany } from "typeorm";
import { LoanRequest } from "./LoanRequest";

@Index("loan_purpose_code_key", ["code"], { unique: true })
@Index("loan_purpose_pkey", ["id"], { unique: true })
@Entity("loan_purpose", { schema: "public" })
export class LoanPurpose {
  @Column("integer", { primary: true, name: "id" })
  id: number;

  @Column("character varying", { name: "code", unique: true, length: 4 })
  code: string;

  @Column("character varying", { name: "name", length: 120 })
  name: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(
    () => LoanRequest,
    loanRequest => loanRequest.loanPurpose
  )
  loanRequests: LoanRequest[];
}
