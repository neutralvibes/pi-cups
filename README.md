# Pi-CUPS

Docker based CUPS Printer server for Raspberry PI that supports the Samsung M2020 and others...

## Introduction

I have a pretty reliable Samsung M2020 laser printer which is not wireless, without CUPS and Splix support. The Linux drivers provided by Samsung do not support Arm processors so they were also of no use.

After a lot of wasted time I finally managed to find some patches to Splix @ https://gitlab.com/ScumCoder/Splix/tree/patches/Splix that included the required drivers plus some.

This docker container:-

* Installs CUPS
* printer-driver-all
* printer-driver-cups-pdf
* openprinting-ppds
* Enables remote access
* Builds the Splix patches
* Installs the Splix patches
* Persists the configuration
* Serves the new driver files for download @ http://host:8631


## Installation

```bash
git clone https://github.com/neutralvibes/pi-cups.git && cd pi-cups && chmod +x *.sh
```

## Usage

**On the very first run it will take a while as it builds the image.** CUPS has a ton of requirements so having a cup of tea and a slice of cake while it completes is recommended. On a Raspberry pi 3B it took circa 30 mins.

### Starting

```bash
docker-compose up -d
```

You should now be able to connect to CUPS @ http://hostname:631

### Using drivers

Remember, this is usually for those drivers not already available in CUPS, so see if it's not there already first.

In-order to setup a printer using one of the patched drivers you have to surf to http://hostname:8631 and download the ppd driver file for your model of printer.

In CUPS go to:-

* Administration -> [Add Printer]
* Select Samsung M2020 Series (or the printer required) -> [Continue]
* Make any changes required -> [Continue]
* [Choose File]
* Select the driver file you previously downloaded.
* Click [Add Printer]

### Backups

* Location -> `data/backups/config.tar`

The CUPS data is stored on a docker volume for persistent storage. If the need arises, you can create or restore from a  tar backup. This creates a copy of the `/etc/cups` folder.

#### Create

```bash
sudo ./backup.sh
```

#### Restore

A confirmation prompt is shown when restoring.

```bash
sudo ./restore.sh
```

***

## To do

[ ] The container runs in privileged mode 😱, fix this.

***

## Credits

* Based on https://github.com/olbat/dockerfiles/tree/master/cupsd
