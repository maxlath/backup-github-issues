const { execSync } = require('child_process')

// Support the following remote URL format
// - git@github.com:owner/repo-name.git
// - https://github.com/owner/repo-name
// - https://github.com/owner/repo-name.git

const getName = remoteCmd => {
  const cmd = `${remoteCmd} | awk '{printf $2}' | sed 's|^.*:||' | sed 's|//github.com/||' | sed 's|\.git$||'`
  return execSync(cmd).toString().trim()
}

const githubOriginRemote = getName('git remote -v | grep origin | grep github.com')
const firstGithubRemote = getName('git remote -v | grep github.com | head -n 1')

module.exports = githubOriginRemote.match(/.+\/.+/) != null ? githubOriginRemote : firstGithubRemote
