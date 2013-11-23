github-all-repos
================

Because fetching all repos for a Github user is a pain

## Usage

With a nodeback

```js
var getAllRepos = require('github-all-repos');

getAllRepos(GITHUB_ACCESS_TOKEN, function(err, repos){
  // check for and handle error

  // do something with repos
});
```

As a promise

```js
var getAllRepos = require('github-all-repos');

getAllRepos(GITHUB_ACCESS_TOKEN)
  .then(function(repos){
    // do something with repos
  }, function(err){
    // handle error
  });
```
