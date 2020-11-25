export default interface Bin {
  readonly _id: string;
  readonly data: string;
  readonly createdAt: Date;
}

export const BinProperties = {
  _id: String,
  data: String,
  createdAt: Date
};
