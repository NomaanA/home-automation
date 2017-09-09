# Home Automation 

I started this project because I was lazy and wanted a way to keep it that way and have an excuse to shop on Aliexpress and get my hands dirty with some hardware. 


## Components 
### Pi zero 
 
You can go with Pi Zero W which has a wifi module built in. 
TODO: link

### 8 Channels Relay

Depending how many device you want to control, you can substitute this for 2, 4, 16 or 32 channels. 
TODO: link

### Jumper wires

Need those for connecting things together. 
TODO: link

### Electrical outlets

You need one for each 2 channels on your relay.
TODO: link 


## Setup pi

### Static ip
```
route -ne
```

This should give you your gateway information. Write it down. 

Edit the following file: 
```
sudo nano /etc/dhcpcd.conf
```

Add this at the end: 

```
interface wlan0
static ip_address=<ip>
static routers=<gateway>
static domain_name_servers=<gateway>
```
### Run at boot 
You can use `forever` npm module to do so.

```
sudo -i npm install forever -g
```

Add the user you want this to be run under: 
```
crontab -u pi -e
```

select nano editor and add this to the last line: 

```
@reboot /usr/bin/sudo -u pi -H /usr/local/bin/forever start /var/www/your-server.js
```
