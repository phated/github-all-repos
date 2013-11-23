var test = require('tap').test;

var when = require('when');

var getAllRepos = require('../');

var testRepos = [
  'github-all-repos-test/test1',
  'github-all-repos-test/test2',
  'github-all-repos-test/test3',
  'github-all-repos-test-org/test1',
  'github-all-repos-test-org/test2'
];

test('getAllRepos should return all repos and org repos the user has access to', function(t){
  getAllRepos(process.env.GH_ACCESS_TOKEN)
    .then(function(repos){
      t.equal(repos.length, 5, 'should be 5');
      repos.forEach(function(repo){
        t.notEqual(testRepos.indexOf(repo.full_name), -1, 'should exist in test repos');
      });
      t.end();
    });
});

test('getAllRepos should take a nodeback', function(t){
  getAllRepos(process.env.GH_ACCESS_TOKEN, function(err, repos){
    t.equal(err, null, 'error should be null');
    t.equal(repos.length, 5, 'should be 5');
    t.end();
  });
});

test('getAllRepos should return a promise', function(t){
  t.ok(when.isPromise(getAllRepos(process.env.GH_ACCESS_TOKEN)), 'should be a promise');
  t.end();
});

test('getAllRepos should error when no access token is given', function(t){
  t.plan(2);
  getAllRepos()
    .otherwise(function(err){
      t.equal(err.error, 404, 'should return a 404');
    });

  getAllRepos(null, function(err, repos){
    t.equal(err.error, 404, 'should return a 404');
  });
});
