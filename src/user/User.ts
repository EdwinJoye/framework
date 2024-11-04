import { Model } from "../framework/model/Model";
import { ApiSync } from "../framework/ApiSync";
import { Attributes } from "../framework/Attributes";
import { Eventing } from "../framework/Eventing";
import { UserCollection } from "../framework/UserCollection";

export interface UserProps {
  id?: string;
  name?: string;
  age?: number;
}

const url = "http://localhost:3001/users";

export class User extends Model<UserProps> {
  static build(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(url)
    );
  }

  static buildCollection() {
    return new UserCollection(url);
  }

  setRandomAge() {
    this.set({ age: Math.floor(Math.random() * 99 + 1) });
  }

  getAllProps(): UserProps {
    return this.getAttributes().getAllProps();
  }
}
