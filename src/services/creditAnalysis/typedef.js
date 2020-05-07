import gql from 'graphql-tag';

export default gql`
  extend type Query {
    creditAnalysis: CreditAnalysisConnection
  }

  type CreditAnalysisConnection {
    nodes: [CreditAnalysis]!
    totalCount: Int
  }

  type CreditAnalysis {
    id: ID
    provableMonthlyIncome: String
    unprovableMonthlyIncome: String
    monthlyHouseholdExpense: String
    existingLoans: Boolean
    existingMonthlyPaymentsAmount: String
    latePayments: Boolean
    settlementType: String
    tenancyType: String
  }
`;
