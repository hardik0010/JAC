#!/bin/bash

# Configuration
BACKUP_DIR="/var/backups/jayambeconstruction"
FRONTEND_DIR="/var/www/jayambeconstruction"
MONGODB_URI="your_mongodb_uri"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup MongoDB
mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR/mongodb_$DATE"

# Backup frontend files
tar -czf "$BACKUP_DIR/frontend_$DATE.tar.gz" -C "$FRONTEND_DIR" .

# Backup nginx configuration
sudo cp /etc/nginx/sites-available/jayambeconstruction.com "$BACKUP_DIR/nginx_$DATE.conf"

# Backup environment files
cp /var/www/jayambeconstruction/.env "$BACKUP_DIR/frontend_env_$DATE"
cp /var/www/jayambeconstruction/backend/.env "$BACKUP_DIR/backend_env_$DATE"

# Remove backups older than 30 days
find "$BACKUP_DIR" -type f -mtime +30 -exec rm {} \;

echo "Backup completed: $(date)"


