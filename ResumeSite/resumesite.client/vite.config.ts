import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ''
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = 'resumesite.client';
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

const isCI = process.env.CI === 'true' || process.env.NODE_ENV === 'production';
const isDocker = process.env.NODE_ENV === 'development' && !fs.existsSync(keyFilePath);

if (!isCI && !isDocker && (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath))) {
  if (
    0 !==
    child_process.spawnSync(
      'dotnet',
      ['dev-certs', 'https', '--export-path', certFilePath, '--format', 'Pem', '--no-password'],
      { stdio: 'inherit' }
    ).status
  ) {
    throw new Error('Could not create certificate.');
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(';')[0]
    : 'https://localhost:7103';

const useHttps = !isCI && !isDocker && fs.existsSync(keyFilePath) && fs.existsSync(certFilePath);

export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: Object.fromEntries(
            ['/weatherforecast', '/external', '/contact', '/resume', '/email', '/blob', '/userInfo'].map(
                (path) => [path, { target: isDocker ? 'http://backend:8080' : target, secure: false }]
            )
        ),
        port: 5173,
        host: '0.0.0.0',
        strictPort: true,
        watch: {
            usePolling: isDocker,
        },
        https: useHttps
            ? {
                key: fs.readFileSync(keyFilePath),
                cert: fs.readFileSync(certFilePath),
            }
            : undefined,
    },
});