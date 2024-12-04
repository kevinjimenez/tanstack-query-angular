import { NgStyle } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GithubIssue } from '../../interfaces/github-issue.interface';
import { IssuesService } from '../../services/issues.service';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [RouterLink, NgStyle],
  templateUrl: './issue-item.component.html',
})
export class IssueItemComponent {
  public issue = input.required<GithubIssue>();
  issueService = inject(IssueService);

  get isOpen() {
    return this.issue().state === 'open';
  }

  prefetchData() {
    // this.issueService.prefecthIssue(this.issue().number.toString());
    this.issueService.setIssueData(this.issue());
  }
}
