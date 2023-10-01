import { Octokit } from '@octokit/core';

const token = import.meta.env.VITE_APP_GITHUB_TOKEN;
const octokit = new Octokit({ auth: token });

export class ApiService {  
  async request(owner, repoName,sinceTimestamp,page,direction) {
    try {
      const response = sinceTimestamp ? await octokit.request('GET /repos/{owner}/{repo}/issues?state=all&since={sinceTimestamp}&per_page=100', {
        owner: owner,
        repo: repoName,
        sinceTimestamp:sinceTimestamp,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }) : await octokit.request('GET /repos/{owner}/{repo}/issues?state=all&per_page=100&page={page}&direction={}', {
        owner: owner,
        repo: repoName,
        page:page||1,
        direction: direction || 'desc',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      return response.data;
    } catch (err) {
      if (err.response) {
        throw err.response.data;
      } else if (err.request) {
        throw err.request;
      } else {
        throw new Error(`Error: ${err.message}`);
      }
    }
  }
}

