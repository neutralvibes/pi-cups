#!/bin/sh
echo "*** Restore data/backups/config.tar -> CUPS ***"

if [ ! -f 'data/backups/config.tar' ]; then
  echo -n " \nNo backups available to restore from!\n"
  exit 1
fi

read -r -p "Are You Sure? [Y/n] " input

case $input in [yY])
  echo "Yes"
  docker-compose exec app tar -xvf /backups/config.tar -C /
  exit $?
  ;;
esac
echo "Cancelled"
exit 1
