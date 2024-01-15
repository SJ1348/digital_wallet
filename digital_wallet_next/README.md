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
- RESPONSE : {message : "Bank account added successfully"}
- ERROR : { message: "Invalid Credentials" }

URL : "/api/bankBalance"

- METHOD : POST
- BODY : { "accountNumber": Int, "pin": string }
- RESPONSE : { balance: response.data.balance }
- ERROR : { message: "Invalid Credentials" }

URL : "/api/getAccounts"

- METHOD : POST
- BODY : { "id": Int }
- RESPONSE : {accountNumbers: BigInt[]}
- ERROR : { message: "No account numbers found" }

URL : "/api/signup"

- METHOD : POST
- BODY : { "email": email, "phone": Int, "password": string }
- RESPONSE : {message : "User created"}
- ERROR : { message: "User not created" }

URL : "/api/updateWallet"

- METHOD : POST
- BODY : { "id": Int, "operation" : "debit"/"credit", "pin" : String, "amount" : Int, "accountNumber" : Int }
- RESPONSE : {message : "Wallet updated"}
- ERROR : { message: "Wallet not updated" }

URL : "/api/walletToWallet"

- METHOD : POST
- BODY : {"amount": Int, "password": String, "email": String", "id": Int}
- RESPONSE : {message : "Transaction successful"}
- ERROR : { message: "Internal Server Error" }
