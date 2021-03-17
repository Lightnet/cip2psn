# Database:
  The database is tricky to setup and hard to secure an open database for users to access.

  Encryption and Decryption will slow down the processing the data and database. But it better be safe in some ways.

# Web Master:
  It the person who host the web site has to manage the mods and users.
  
```
  Reasons follows:
  * Database protection from other nation or country.
  * User has full control in some degree.
  *

```

There are three or more type of access to allow and disallow that depend on the users and web masters.

# [ user database ]
  There are two more way to setup. One is create dabase but required user to connect online all times.

# [ web master ]
  They are not to interfere much unless they are attack again denial of service.
  As well maintain contents. But not fully that it up to users.

# [ mods ]
  They are respoonse for transfar and maintain order.



```
alias
{
  aliasID:random id
  alias: name
  passphrase: encode password

  saltkey: encode password

  pub: key
  sea: key for public and private
  date: created account

  role: user
  token: cookie stuff save?

  question1:
  question2: 
  hint:passphrase
}
Notes:
 * Data has be encode and decode
 * 
```

```
publickey
{
  publickey: alias pub key
  alias: name
  date: created
  postid:randomid
  commentid: randomid
}

comment id
{
  contentid: random id
  
  aliasId: id
  alias:name
  contentparentid: id
  content: string
  date: timestamp
}

```
