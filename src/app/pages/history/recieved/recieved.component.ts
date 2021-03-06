import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-recieved',
  templateUrl: './recieved.component.html',
})
export class RecievedComponent implements OnInit, AfterViewInit {
  transactions: Array<any> = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns = ['senderName', 'amount', 'createdAt'];
  loading = false;
  private token = '';

  constructor(private auth: AuthService, private account: AccountService) {}

  async ngOnInit() {
    this.token = (await this.auth.getCurrentUser()?.getIdToken()) || '';
    this.reloadData();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  reloadData(): void {
    this.loading = true;

    this.account
      .getRecieved()
      .toPromise()
      .then((data) => {
        this.transactions = data || [];
        this.dataSource.data = this.transactions;
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
