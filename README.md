.github

## Contributors

`contributors.json` is the one list of everyone credited across BreatheOSS. To add or change someone, edit it, then run this from a folder that has the repos checked out side by side (`about`, `site`, `breathe`, `ios`, `github`):

```
node github/scripts/sync-contributors.mjs .
```

It rewrites the `contributors:start` / `contributors:end` blocks in the org profile, the about page, about's llms.txt, the web app settings and both apps. Pass `--check` to only report stale files.

- `tier` is `core` or `contributor`. `founder` marks the founders.
- `areas` decides which contributors the platform credits show (`android`, `ios`, `web`). Core members always show. Everyone shows on the about page.
- New avatars go in `about/assets/people/`.
