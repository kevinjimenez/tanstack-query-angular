import { sleep } from '@helpers/sleep';
import { environment } from '../../../../environments/environment.development';
import { GithubIssue } from '../interfaces/github-issue.interface';
const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueCommentsByNumber = async (
  issueNumber: string
): Promise<GithubIssue[]> => {
  await sleep(1500);
  try {
    const response = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) throw "Can't get issue comments";

    const issues: GithubIssue[] = await response.json();

    return issues;
  } catch (error) {
    throw "Can't get issue comments";
  }
};
