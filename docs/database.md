# Database:
  The database is tricky to setup and hard to secure an open database for users to access.

  Encryption and Decryption will slow down the processing the data and database. But it better be safe in some ways.

```
  Reasons follows:
  * Database protection from other nation or country.
  * User has full control in some degree.
  *

```


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
