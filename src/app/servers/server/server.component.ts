import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute,Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {

  server: {id: number, name: string, status: string};
  serverId: string;
  paramsSubscription: Subscription

  constructor(private serversService: ServersService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.serverId = this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(parseInt(this.serverId));
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(parseInt(params['id']));
        }
      );
  }

  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }
}
