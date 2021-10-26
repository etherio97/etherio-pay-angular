import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from "src/app/shared/auth.service";

@Component({
  selector: "app-recieved",
  templateUrl: "./sent.component.html",
})
export class SentComponent implements OnInit, AfterViewInit {
  transactions: Array<any> = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns = ["recipientName", "amount", "createdAt"];
  loading = false;
  private token = "";

  constructor(private auth: AuthService, private http: HttpClient) {}

  async ngOnInit() {
    this.token = (await this.auth.getCurrentUser()?.getIdToken()) || "";
    this.reloadData();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  reloadData() {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };

    this.loading = true;

    this.http
      .get("https://etherio-pay.herokuapp.com/transaction/transfered", {
        headers,
      })
      .toPromise()
      .then((data: any) => {
        this.transactions = data || [];
        this.dataSource.data = this.transactions;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
