import { Collection } from "../framework/Collections";
import { User, UserProps } from "../user/User";

export class UserCollection extends Collection<User, UserProps> {
  constructor(url: string) {
    super(url, (json: UserProps) => User.build(json));
  }

  getUserById(id: string): User | undefined {
    return this.models.find((user) => user.get("id") === id);
  }
}
