import { Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { GithubIssue } from '../../interfaces/github-issue.interface';

@Component({
  selector: 'issue-comment',
  imports: [MarkdownModule],
  templateUrl: './issue-comment.component.html',
})
export class IssueCommentComponent {
  public issue = input.required<GithubIssue>();
}
