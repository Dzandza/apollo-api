import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { CreditAnalysis } from "./CreditAnalysis";
import { LoanRequest } from "./LoanRequest";

@Index("client_pkey", ["id"], { unique: true })
@Entity("client", { schema: "public" })
export class Client {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "first_name", length: 60 })
  firstName: string;

  @Column("character varying", {
    name: "last_name",
    nullable: true,
    length: 60
  })
  lastName: string | null;

  @Column("character varying", { name: "jmbg", length: 13 })
  jmbg: string;

  @Column("character varying", { name: "lk", nullable: true, length: 13 })
  lk: string | null;

  @Column("character varying", {
    name: "phone_number_mobile",
    nullable: true,
    length: 15
  })
  phoneNumberMobile: string | null;

  @Column("character varying", {
    name: "phone_number_fixed",
    nullable: true,
    length: 15
  })
  phoneNumberFixed: string | null;

  @Column("character varying", {
    name: "martial_status",
    nullable: true,
    length: 10
  })
  martialStatus: string | null;

  @Column("integer", {
    name: "household_size",
    nullable: true,
    default: () => "0"
  })
  householdSize: number | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(
    () => CreditAnalysis,
    creditAnalysis => creditAnalysis.client
  )
  creditAnalyses: CreditAnalysis[];

  @OneToMany(
    () => LoanRequest,
    loanRequest => loanRequest.client
  )
  loanRequests: LoanRequest[];
}
