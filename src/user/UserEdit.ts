import { View } from "../framework/views/View";
import { User, UserProps } from "./User";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";
import { UserList } from "./UserList";
import { UserCollection } from "../framework/UserCollection";

export class UserEdit extends View<User, UserProps> {
  regionsMap(): { [key: string]: string } {
    return {
      userList: ".user-list",
      userShow: ".user-show",
      userForm: ".user-form",
    };
  }

  template(): string {
    return `
      <div>
        <div class="user-list"></div>
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `;
  }

  onRender(): void {
    const userCollection = new UserCollection("http://localhost:3001/users");
    userCollection.fetch();
    userCollection.on("change", () => {
      const userList = new UserList(this.regions.userList, userCollection);
      userList.render();
      userList.parent.addEventListener(
        "userSelected",
        this.onUserSelected as EventListener
      );
    });

    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  onUserSelected = (event: Event) => {
    const customEvent = event as CustomEvent;
    const selectedUser = customEvent.detail;
    if (selectedUser instanceof User) {
      this.model.set(selectedUser.getAllProps());
      new UserShow(this.regions.userShow, this.model).render();
      new UserForm(this.regions.userForm, this.model).render();
    }
  };
}
