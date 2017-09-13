# Home Automation

I started this project because I was lazy and wanted a way to keep it that way and have an excuse to shop on AliExpress and get my hands dirty with some hardware. 

## Components

### Pi zero

You can go with Pi Zero W which has a wifi module built in.

[MicroCenter - $5.00](http://www.microcenter.com/search/search_results.aspx?Ntt=pi+zero+board)

### 8 Channels Relay

Depending how many device you want to control, you can substitute this for 2, 4, 16 or 32 channels.

[AliExpress - $3.88](https://www.aliexpress.com/wholesale?catId=0&initiative_id=SB_20170912200904&SearchText=8+relay+channel)

### Jumper wires

Need those for connecting things together. 
[AliExpress - $2.50](https://www.aliexpress.com/wholesale?catId=0&initiative_id=SB_20170912200700&SearchText=jumper+wire+female+to+female)

### Electrical outlets

You need one for each 2 channels on your relay.

[HomeDepot - $2.49/each](http://www.homedepot.com/p/Leviton-Decora-15-Amp-Tamper-Resistant-Duplex-Outlet-Black-R55-T5325-0DE/202066690)

## Pi Setup

### Static ip

```javascript
route -ne
```

This should give you your gateway information. Write it down.

Edit the following file:

```javascript
sudo nano /etc/dhcpcd.conf
```

Add this at the end:

```javascript
interface wlan0
static ip_address=<ip>
static routers=<gateway>
static domain_name_servers=<gateway>
```

### Run at boot 

You can use `forever` npm module to do so.

```bash
sudo -i npm install forever -g
```

Add the user you want this to be run under:

```bash
crontab -u pi -e
```

select nano editor and add this to the last line: 

```bash
@reboot /usr/bin/sudo -u pi -H /usr/local/bin/forever start /var/www/your-server.js
```
