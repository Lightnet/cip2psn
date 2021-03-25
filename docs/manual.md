# Information:
  Work in progress.

  The host or owner the hub server peer to peer system has to maintain rule and regulation with other users. As well the country data protection law. (work in progress have not read the rules in depth.)


  If needed to help prevent bots, spam, mature content and as well follow rules. Reason there will be under age childrend on the hub community.

# Setup:
  The host as to set up some network system to do some peer to peer and swarm network to handle black list and white list.
```
  List:
  * Allow/Disallow peer to peer network set permission
  * Handshake access between app that is same or functions.
  * 
```
# Configs:
  Each web server site has own config and secret keys. As well config other web amdin to talk among to allow access to database from other hub sites.
```

```

# Data Protection laws:
  The set up for data protection law is not easy to do as prevent easy used.

  One that database is half encrypted. As well prevent hacker impersonation to login into to download requested. It would required admin to allow access to grant permission. Since the keys can be decode base on the data encode to revise engineer.(opinion or guess.)

  Which required access to their full data like user info and data history record. Which required to need data to convert to encryted to decode but the identy must be verify. This required time, cost and other things.

  There are two ways but depend on the developement.

# Ticket and report system:
  The hard part that ticket system for users, mods and admins report that required some module setup.


# Fastify Setup:
  Note: cookie setup is a bit hard to handle. Reason is prevent cookie edit modifier checks. 

```javascript
  //npm fastify-cookie
  //mod

  fastify.decorate('unsignCookie', function unsignCookie (value) {
    return signer.unsign(value)
  })
  
```


  


