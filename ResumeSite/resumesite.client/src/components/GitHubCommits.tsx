import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Link } from '@mui/material';

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

const GITHUB_OWNER = 'Dlynn2'; // Change if your GitHub username is different
const GITHUB_REPO = 'ResumeSite'; // Change if your repo name is different
const COMMITS_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=3`;

const GitHubCommits: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(COMMITS_API)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch commits');
        return res.json();
      })
      .then((data) => {
        setCommits(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Could not load commits.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Latest GitHub Commits For This Project
      </Typography>
      <List>
        {commits.map((commit) => (
          <ListItem key={commit.sha} alignItems="flex-start">
            <ListItemText
              primary={
                <Link href={commit.html_url} target="_blank" rel="noopener noreferrer">
                  {commit.commit.message.split('\n')[0]}
                </Link>
              }
              secondary={`by ${commit.commit.author.name} on ${new Date(commit.commit.author.date).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
      <Link href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/commits`} target="_blank" rel="noopener noreferrer">
        View more on GitHub
      </Link>
    </Box>
  );
};

export default GitHubCommits;
