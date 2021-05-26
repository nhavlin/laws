import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { combineLatest, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  tap
} from 'rxjs/operators';
import { HttpService } from './law/02-repository/http.service';
import { Ilaw } from './law/01-domain/Ilaw.interface';
import { LawViewService } from './law/04-select-view/law-view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data$: Observable<TreeNode[]>;
  dataSearch$: Observable<TreeNode[]>;
  data1: TreeNode[];

  lawData$: Observable<TreeNode[]>;
  lawDataSearch$: Observable<TreeNode[]>;
  lawData1: TreeNode[];

  selectedNode: TreeNode;

  searchInput: FormControl = new FormControl('');
  searchInput$: Observable<string> = this.searchInput.valueChanges.pipe(
    startWith(''), // start it off
    debounceTime(300), // debounce the user input
    distinctUntilChanged()
  );

  result$: Observable<TreeNode[]>;

  constructor(
    private messageService: MessageService,
    private http: HttpService,
    private lawViewService:LawViewService
  ) {}

  ngOnInit() {
    this.dataSearch$ = this.http
      .getData()
      .pipe
     
      ();

      this.lawData$ = this.http.getLawData().pipe(
        map(data => this.lawViewService.flatme(data))
      );

    this.result$ = combineLatest([this.searchInput$, this.lawData$]).pipe(
      map(([search, data]) => {
        console.log(data)
        if (search) {
          return data.filter(single =>
            single.label.includes(search)
          );
        } else {
          return data;
        }
      })
       ,tap(console.log )
    );

    

    this.data$ = this.http.getData().pipe(tap(data => (this.data1 = data)));
  }
 
  onNodeSelect(event) {
    this.messageService.add({
      severity: 'success',
      summary: 'Node Selected',
      detail: event.node.label
    });
  }
  
}
