#!/bin/bash

# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Create website directory
sudo mkdir -p /var/www/jayambeconstruction
sudo chown -R $USER:$USER /var/www/jayambeconstruction

# Configure Nginx
sudo cat > /etc/nginx/sites-available/jayambeconstruction.com << EOF
server {
    listen 80;
    server_name jayambeconstruction.com www.jayambeconstruction.com;

    location / {
        root /var/www/jayambeconstruction/dist;
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/jayambeconstruction.com /etc/nginx/sites-enabled/

# Remove default nginx site
sudo rm /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

# Setup SSL
sudo certbot --nginx -d jayambeconstruction.com -d www.jayambeconstruction.com

# Setup automatic renewal
sudo certbot renew --dry-run

# Setup PM2 startup script
pm2 startup

echo "Server setup completed!"
echo "Next steps:"
echo "1. Clone your repository"
echo "2. Install dependencies"
echo "3. Build the project"
echo "4. Start the backend with PM2"


