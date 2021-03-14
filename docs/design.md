# Information:
  Just thinking. It is base on https://github.com/pfrazee/ctzn and youtuber https://www.youtube.com/channel/UCSkcL4my2wgDRFvjQOJzrlg 

  Trying to understand the design and logic of coding.

# Design:
  Current build for server and p2p in developement.

  To build the web server to access from any browser device.

  To create module script required some code. Which is not easy as it could leak memory.

# Users:
  User will have some sandbox and island like data format to self contain to prevent spamming.

## Security and Authentication and Network:
  Since there will be network, peer to peer, and server talking to other server base on the researching and development to have some permission system. As well some default settings for each servers and peer to peer. Each owner is responsble for maintain.

  One is mature content and spam is not build for it.

  To have super user since one is the server owning and maintain hosting is montior file size and connection. As well clean up if the file size is increase or to off load to other servers.

# Encrypt and Decrypt Data:
  Creating the secure data is not easy. As the keys are not leaked and user can be access with their own passphrase key.

  But some area like public post must be cypot or not that depend on the design.

# Email:
  Since the email can't host. It would allow user to use proxy build into the nodejs and used their login as it would not login password it would be Encrypt base on time.
```
email:<name>@<company>.<>
password:<user password>
```
  Since it client broswer it would need some basic Encrypt and Decrypt to client to server to send them self email. It would required some detect type to send mail.

  Another way is to used the email and proxy email system to send the recovery system.

# QRcode:

 * https://github.com/papnkukn/qrcode-svg

# Moblie and Browser:
  There are two different in text font size.

# Database
 * gun.js
 * hypercore
 * pouchdb

  Testing and learning some in and out of the database format. It has it own pros and cons of the setup.