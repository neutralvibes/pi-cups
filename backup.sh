#!/bin/bash
echo "*** Backup CUPS -> data/backups/config.tar ***"
docker-compose exec app tar cvf /backups/config.tar /etc/cups

if [ $? -le 0 ]; then
  echo "Backup success."
else
  echo "Backup failed."
fi
