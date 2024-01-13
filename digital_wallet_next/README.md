# Digital-Wallet

# Frontend Pages

- URL : "/addAccount"
- URL : "/bankBalance"
- URL : "/signup"
- URL : "/transactionHistory"
- URL : "/userProfile"
- URL : "/wallet"

# Backend APIs

URL : "/api/addAccount"

- METHOD : POST
- BODY : { "id": Int, "accountNumber": Int, "pin": string }
- RESPONSE : {message : ""}
- ERROR :

URL : "/api/bankBalance"

- METHOD : POST
- BODY : { "accountNumber": Int, "pin": string }
- RESPONSE : {message : ""}
- ERROR :

URL : "/api/getAccounts"

- METHOD : POST
- BODY : { "id": Int }
- RESPONSE : {accountNumbers: BigInt[]}
- ERROR :

URL : "/api/signup"

- METHOD : POST
- BODY : { "email": email, "phone": Int, "password": string }
- RESPONSE : {message : ""}
- ERROR :

URL : "/api/updateWallet"

- METHOD : POST
- BODY : { "id": Int, "operation" : "debit"/"credit", "pin" : String, "amount" : Int, "accountNumber" : Int }
- RESPONSE : {message : ""}
- ERROR :
