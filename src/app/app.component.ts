import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { RealtimeService } from './shared/services/realtime.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribed: Subject<any> = new Subject();

  constructor(private realtime: RealtimeService, private auth: AuthService) {}

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.realtime.trackChanges(user.uid);
    }
  }

  ngOnDestroy(): void {
    //
  }
}
