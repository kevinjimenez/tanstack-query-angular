import { Injectable, signal } from '@angular/core';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions/get-issue-comments-by-number.action';
import { getIssueCommentsByNumber } from '../actions/get-issue-by-number.action';
import { GithubIssue } from '../interfaces/github-issue.interface';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issueNumber = signal<string | null>(null);
  private queryClient = injectQueryClient();

  issuesQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null, //default true
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null, //default true
  }));

  public setIssueNumber(issueId: string | null) {
    this.issueNumber.set(issueId);
  }

  // ayuda a precargar la data en este ejemlpo se usa ciando pasa el mause por el issue
  public prefecthIssue(issueId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId], // tipo estrinto
      queryFn: () => getIssueByNumber(issueId),
      staleTime: 1000 * 60 * 5, // 5 min
    });
  }

  public setIssueData(issue: GithubIssue) {
    this.queryClient.setQueryData(['issue', issue.number], issue, {
      updatedAt: Date.now() + 1000 * 60, // 1 min
    });
  }
}
