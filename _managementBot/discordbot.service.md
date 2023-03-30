[Unit]
Description=Discord bot service
After=docker.service
Requires=docker.service

[Service]
Type=simple
Restart=always
RestartSec=10
User=azureuser
WorkingDirectory=/home/azureuser/muzikcalanbot
ExecStart=/var/lib/docker start -a serene_leakey
ExecStop=/var/lib/docker stop -t 2 serene_leakey

[Install]
WantedBy=multi-user.target
