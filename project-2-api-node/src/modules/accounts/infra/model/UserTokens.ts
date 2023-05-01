import { randomUUID } from "node:crypto";

interface IPropsUsersToken {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
}
export class UserTokens {
  id: string;
  user_id: string;
  expires_date: Date;
  created_at: Date;
  refresh_token: string;
  constructor({ user_id, expires_date, refresh_token }: IPropsUsersToken) {
    this.user_id = user_id;
    this.expires_date = expires_date;
    this.refresh_token = refresh_token;
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
