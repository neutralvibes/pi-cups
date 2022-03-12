FROM debian:buster-slim
MAINTAINER $MAINTAINER

# Install Packages (basic tools, cups, basic drivers, HP drivers)
RUN apt-get update \
&& apt-get install -y \
  sudo \
  whois \
  usbutils \
  build-essential \
  libcups2-dev \
  cups \
  cups-client \
  cups-bsd \
  cups-filters \
  foomatic-db-compressed-ppds \
  printer-driver-all \
  openprinting-ppds \
  hpijs-ppds \
  hp-ppd \
  hplip \
  smbclient \
  printer-driver-cups-pdf \
&& apt-get clean \
&& rm -rf /var/lib/apt/lists/*

# Download and install driver patches for printers like Samsung M2020
RUN wget https://gitlab.com/ScumCoder/splix/-/archive/patches/splix-patches.zip \
  && unzip splix-patches.zip \
  && rm -v splix-patches.zip \
  && cd splix-patches/splix \
  && make DISABLE_JBIG=1 \
  && make install

# Add user and disable sudo password checking
RUN useradd \
  --groups=sudo,lp,lpadmin \
  --create-home \
  --home-dir=/home/print \
  --shell=/bin/bash \
  --password=$(mkpasswd print) \
  print \
&& sed -i '/%sudo[[:space:]]/ s/ALL[[:space:]]*$/NOPASSWD:ALL/' /etc/sudoers

# Configure the service's to be reachable
RUN /usr/sbin/cupsd \
  && while [ ! -f /var/run/cups/cupsd.pid ]; do sleep 1; done \
  && cupsctl --remote-admin --remote-any --share-printers \
  && kill $(cat /var/run/cups/cupsd.pid)

# Patch for ServerAlias to allow remote access 
# and enable encryption if requested
RUN sed -e '0,/^</s//DefaultEncryption IfRequested\n&/' -i /etc/cups/cupsd.conf \
  && echo "ServerAlias *" >> /etc/cups/cupsd.conf

VOLUME /splix-patches/splix/ppd
VOLUME /usr/share/cups/model
VOLUME /etc/cups

COPY ["entrypoint.sh", "/"]

RUN chmod +x entrypoint.sh

EXPOSE 631

ENTRYPOINT ["/entrypoint.sh"]
