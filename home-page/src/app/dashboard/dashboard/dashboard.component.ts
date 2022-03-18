import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';

interface DashboardItem {
  label: string,
  value: string,
  header?: string
}

const ITEMS: DashboardItem[] = [
  { label: "My Account", value: 'account', header: "Cloud77 Account" },
  { label: "Reset Password", value: "password" },
  { label: "Json Editor", value: "editor" },
  { label: "Orders", value: "orders" },
  { label: "Setting", value: "setting" }
]

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private client: HttpClient, private router: Router) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    document.title = "Cloud77 Dashboard";

    this.client.get<{ apikey: string}>("/login-api/info/apikey").subscribe(res => {
      console.log(res);
      sessionStorage.setItem("apikey", res['apikey']);
    });

    this.client.get("/login-api/prelogins?email=280908640@qq.com").subscribe(res => {
      console.log(res);
    });

    // this.client.get("/login-api/accounts?email=chenqinglong@danfoss.com").subscribe(res => {
    //   console.log(res);
    // });

    this.name = sessionStorage.getItem("name");
    this.email = sessionStorage.getItem("email");
    this.role = sessionStorage.getItem("role");
  }

  cardHeader: string = "unknown";

  selectedItem: DashboardItem = ITEMS[0];
  items = ITEMS;

  name?: string | null = "";
  email?: string  | null= "";
  role?: string | null = "";

  active: string = "";

  onSelectionChange(event: MatSelectionListChange)
  {
    console.log(event.options[0].value);
    const item = this.items.find(i => i.value === event.options[0].value);
    if (item) {
      this.selectedItem = item;
    }
  }

  onLogoutClick(): void
  {
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}