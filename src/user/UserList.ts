import { View } from "../framework/views/View";
import { UserCollection } from "../framework/UserCollection";
import { UserProps } from "./User";

export class UserList extends View<UserCollection, UserProps> {
  template(): string {
    return `
      <div>
        <select class="user-select">
          ${this.model.models
            .map(
              (user) => `
            <option value="${user.get("id")}">${user.get("name")}</option>
          `
            )
            .join("")}
        </select>
        <button class="select-user">Choisir cet utilisateur à éditer</button>
      </div>
    `;
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.select-user": this.onSelectUserClick,
    };
  }

  onSelectUserClick = () => {
    const selectElement = this.parent.querySelector(
      ".user-select"
    ) as HTMLSelectElement;
    const selectedUserId = selectElement.value;
    const selectedUser = this.model.getUserById(selectedUserId);
    if (selectedUser) {
      this.trigger("userSelected", selectedUser);
    }
  };

  trigger(eventName: string, data: any) {
    const event = new CustomEvent(eventName, { detail: data });
    this.parent.dispatchEvent(event);
  }
}
