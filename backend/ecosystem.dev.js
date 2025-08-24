module.exports = {
  apps: [
    {
      name: 'etma-backend-dev',
      script: 'src/server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development',
        PORT: 5002,
        MONGODB_URI: 'mongodb://root:root123@localhost:27017/etma?retryWrites=true&w=majority',
        JWT_SECRET: 'dev-secret-key-change-in-production',
        FRONTEND_URL: 'http://localhost:3002'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      watch: ['src'],
      ignore_watch: ['node_modules', 'uploads', 'logs'],
      max_memory_restart: '512M',
      node_args: '--max-old-space-size=512'
    }
  ]
};
