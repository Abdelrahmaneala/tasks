const fetch = require('node-fetch');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter GitHub username: ', async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
      throw new Error(`Error fetching repos: ${response.status} ${response.statusText}`);
    }
    const repos = await response.json();

    if (repos.length === 0) {
      console.log('No repositories found for this user.');
      rl.close();
      return;
    }

    const repoNames = repos.map(repo => repo.name);

    fs.writeFileSync(`${username}.txt`, repoNames.join('\n'), 'utf-8');
    console.log(`Repository names saved to ${username}.txt`);

  } catch (error) {
    console.error('Failed to fetch repositories:', error.message);
  } finally {
    rl.close();
  }
});
