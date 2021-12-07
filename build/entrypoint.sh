#!/bin/sh
set -e
set -x
exec /usr/sbin/cupsd -f
