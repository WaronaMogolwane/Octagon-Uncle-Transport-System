export class BankInformation {
  id!: number;
  name!: string;
  slug!: string;
  code!: number;
  longcode!: number;
  gateway!: string;
  pay_with_bank!: boolean;
  supports_transfer!: boolean;
  active!: boolean;
  country!: string;
  currency!: string;
  type!: string;
  is_deleted!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  supported_types!: string[];
}
