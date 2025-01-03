# Gitlab Contributions

A lightweight web service to fetch your commits history from GitLab.

### Prerequisites

-   A valid [GitLab Personal Access Token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)

## Getting Started

Add your GitLab access key to the environment:

1. Create a `.env` by copying the `.env.example`
2. Run `yarn start` command

## Usage

### Endpoint

`GET /contributions/gitlab/commits`

### Request Payload

```json
{
    "username": "your_gitlab_username",
    "author": "your_commit_author_name_or_email"
}
```
