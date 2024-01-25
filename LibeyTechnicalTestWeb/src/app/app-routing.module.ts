import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { UsercardsComponent } from "./User/user/usercards/usercards.component";
import { UsermaintenanceComponent } from "./User/user/usermaintenance/usermaintenance.component";
import {ListusersComponent} from "./User/user/listusers/listusers.component";
import {UpdateuserComponent} from "./User/user/updateuser/updateuser.component";
const routes: Routes = [
	{
		path: "",
		redirectTo: "/user/card",
		pathMatch: "full",
	},
	{
		path: "user",
		children: [
			{ path: "card", component: UsercardsComponent },
			{ path: "maintenance", component: UsermaintenanceComponent },
      { path: "list", component: ListusersComponent },
      { path: "update/:documentNumber", component: UpdateuserComponent },
		],
	},
	{ path: "**", component: AppComponent },
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
