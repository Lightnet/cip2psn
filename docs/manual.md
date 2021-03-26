# Information:
  Work in progress.

  The host or owner the hub server peer to peer system has to maintain rule and regulation with other users. As well the country data protection law. (work in progress have not read the rules in depth.)

  If needed to help prevent bots, spam, mature content and as well follow rules. Reason there will be under age children on the hub community.

# Setup:
  The host as to set up some network system to do some peer to peer and swarm network to handle black list and white list.
```
  List:
  * Allow/Disallow peer to peer network set permission
  * Handshake access between app that is same or functions.
  * 
```

# Fastify Setup:
  Note: cookie setup is a bit hard to handle. Reason is prevent cookie edit modifier checks. 

```javascript
  //npm fastify-cookie
  //mod

  fastify.decorate('unsignCookie', function unsignCookie (value) {
    return signer.unsign(value)
  })
  
```


  


