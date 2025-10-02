module.exports = {
  apps: [{
    name: 'jac-backend',
    script: './backend/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true,
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    monitoring: {
      metrics: {
        http: true,
        custom_metrics: [{
          name: 'realtime_users',
          type: 'metric',
          unit: 'count'
        }]
      },
      logs: {
        error: true,
        info: true
      }
    }
  }]
}


