export class FWResponseHeader {
  status: String;
  message: String;
  data: [];

  constructor(status: String, message: String, data: []) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export class FWResponseData {
  id: Number;
  name: String;
  amount: Number;
  interval: String;
  duration: Number;
  status: String;
  currency: String;
  plan_token: String;
  created_at: String;
  constructor(
    id: Number,
    name: String,
    amount: Number,
    interval: String,
    duration: Number,
    status: String,
    currency: String,
    plan_token: String,
    created_at: String
  ) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.interval = interval;
    this.duration = duration;
    this.status = status;
    this.currency = currency;
    this.plan_token = plan_token;
    this.created_at = created_at;
  }
}
