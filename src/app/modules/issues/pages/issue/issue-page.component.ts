import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-issue-page',
  imports: [RouterLink, IssueCommentComponent],
  templateUrl: './issue-page.component.html',
})
export default class IssuePageComponent {
  public activatedRoute = inject(ActivatedRoute);
  public issueService = inject(IssueService);

  issueNumber = toSignal<string>(
    this.activatedRoute.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      tap((number) => {
        this.issueService.setIssueNumber(number);
      })
    )
  );

  public issueQuery = this.issueService.issuesQuery;
  public issueCommentsQuery = this.issueService.issueCommentsQuery;
}
