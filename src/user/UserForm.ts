import { View } from "../framework/views/View";
import { User, UserProps } from "./User";

export class UserForm extends View<User, UserProps> {
  onSetAgeClick = () => {
    this.model.setRandomAge();
  };

  onSetNameClick = () => {
    const input = this.parent.querySelector("input");
    this.model.set({ name: input!.value });
  };

  onSaveClick = () => {
    this.model.save();
  };

  setUser(user: User) {
    this.model = user;
    this.render();
  }

  template() {
    return `<div>
        <h1>User Form</h1>
        <input value="${this.model.get("name") || ""}" />
        <button class="set-name">Update name</button>
        <button class="set-age">Random Age</button>
        <button class="save-model">Save model</button>
      </div>`;
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-model": this.onSaveClick,
    };
  }
}
