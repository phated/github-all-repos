var Github = require('github-api');

var when = require('when');
var nodefn = require('when/node/function');

function getAllRepos(token, cb){
  var github = new Github({
    token: token
  });

  var user = github.getUser();

  function reduceRepos(allRepos, org){
    var orgRepos = getReposByOrg(org.login);
    return when(orgRepos, function(repos){
      return allRepos.concat(repos);
    });
  }

  function filterRepos(allRepos, repo){
    var perms = repo.permissions;
    if(perms.admin && perms.push && perms.pull){
      allRepos.push(repo);
    }
    return allRepos;
  }

  function getReposByOrg(org){
    return nodefn.call(user.orgRepos, org);
  }

  var repos = nodefn.call(user.repos);

  var orgs = nodefn.call(user.orgs);
  var allRepos = when.reduce(orgs, reduceRepos, repos);
  var reposWithPermissions = when.reduce(allRepos, filterRepos, []);

  return nodefn.bindCallback(reposWithPermissions, cb);
}

module.exports = getAllRepos;
