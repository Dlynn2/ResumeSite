import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Link } from '@mui/material';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

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
  const titleRef = useRef<HTMLSpanElement>(null);

  // Check if mobile to disable scramble animation
  const isMobile = window.matchMedia('(max-width:768px)').matches;

  useEffect(() => {
    // Scramble text animation on title (desktop only to prevent layout issues on mobile)
    const scrambleText = () => {
      if (titleRef.current && !isMobile) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const originalText = 'Latest GitHub Commits For This Project';
        let iteration = 0;
        
        const interval = setInterval(() => {
          if (titleRef.current) {
            titleRef.current.innerText = originalText
              .split('')
              .map((char, index) => {
                if (index < iteration) {
                  return originalText[index];
                }
                if (char === ' ') return ' ';
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');
            
            iteration += 1 / 2; // Faster iteration
            
            if (iteration >= originalText.length) {
              clearInterval(interval);
              if (titleRef.current) {
                titleRef.current.innerText = originalText;
              }
            }
          }
        }, 30);
      }
    };

    fetch(COMMITS_API)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch commits');
        return res.json();
      })
      .then((data) => {
        setCommits(data);
        setLoading(false);
        
        // Wait for name scramble to finish (about 2 seconds total from page load)
        // Then scramble the GitHub title
        setTimeout(scrambleText, 1500);
      })
      .catch(() => {
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
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ 
          fontFamily: 'monospace',
          minHeight: '1.5em',
        }}
      >
        <span ref={titleRef} style={{ display: 'inline-block', minWidth: '100%' }}>Latest GitHub Commits For This Project</span>
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
