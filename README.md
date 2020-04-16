# # Decentralized Notarization, Marketplace & Wallet (Ethereum DApp)

Υλοποίηση της αποκεντρωμένης Εφαρμογής

| Chapters | Description |
| ----------- | ----------- |
| Getting Started | Εγκατάσταση των εργαλείων |
| Smart Contract | Υποβολή στο Ropsten |
| Ρυθμίσεις | Οδηγίες για λειτουργική εφαρμογή σε όλα τα περιβάλλοντα |
| Εκτέλεση App | Πως να γίνει η εκτέλεση και η αυτοματοποίηση της  |
| IPFS site | Ένταξη στο δίκτυο  |
| Πληροφορίες | Εκδόσεις λογισμικού, τοποθεσίες αρχείων και sites |


## Getting Started

Οι παρακάτω οδηγίες θα μετατρέψουν τα αρχεία του προτζεκτ μας, σε μια πλήρως λειτουργική εφαρμογή.

### Προϋποθέσεις

Χρειάζεται η εγκατάσταση των παρακάτω εργαλείων:

```
Node.js
ExpressJS
MongoDb
Geth
Go-IPFS
IPFS-http-client
multer
mongoose
helmet
Web3.js
Ethers.js
```

### Εγκατάσταση του περιβάλλοντος ανάπτυξης

Αρχικά, κατεβάστε τον φάκελο του πρότζεκτ μας.

#### Geth
Για την εγκατάσταση του Geth (Go υλοποίηση του Ethereum), πηγαίνετε στην επίσημη σελίδα διανομής του [Go Ethereum](https://geth.ethereum.org/downloads/) και ακολουθήστε τις οδηγίες εγκατάστασης.

Μετά την επιτυχημένη εγκατάσταση, δημιουργείτε ένα πορτοφόλι μέσω της εντολής στο terminal:
```
geth account new
```
όπου συμπληρώνετε και τον αντίστοιχο κωδικό του.

Τέλος, η εκκίνηση του κόμβου γίνεται με την εντολή:
```
geth --testnet --syncmode "fast" --rpc --rpcapi="db,eth,net,web3,personal,admin" --rpcaddr="localhost" --rpcport="8545" --rpccorsdomain="*"
```


#### MongoDB

Επισκεφτείτε την επίσημη σελίδα του [MongoDB Community Server](https://www.mongodb.com/download-center/community) όπου κατεβάζετε την κατάλληλη έκδοση για το λειτουργικό σας. Ακολουθείτε τις οδηγίες και εγκαταστείτε τη βάση δεδομένων.

Έπειτα δημιουργείτε τον φάκελο όπου θα αποθηκεύονται τα δεδομένα και τον ορίζετε με την ενολή:
```
mongod -dbpath=μονοπάτι_φακέλου
```
όπου αντί για μονοπάτι_φακέλου βάζετε το πλήρες μονοπάτι του φακέλου

Τέλος, δημιουργούμε την βάση στην οποία θα αποθηκεύονται δεδομένα της εφαρμογής μέσα από τις εντολές στη γραμμή εντολών:
```
mongo
use vasipara4_test
```



#### Go-IPFS
Για το πρωτόκολλο του IPFS, επισκεπτόμαστε την επίσημη σελίδα του και εγκαθιστούμε την προτεινόμενη go υλοποίησή του:
* [Go-IPFS](https://dist.ipfs.io/#go-ipfs)

Μετά την εγκατάσταση, χρειάζεται η αρχικοποίηση του και η ενεργοποίηση του κόμβου μέσω των εντολών:
```
ipfs init --profile server
```
Ενεργοποιούμε τον κόμβο με προφίλ server. Για άλλα προφίλ επισκεφτείτε το site του IPFS [Profiles](https://github.com/ipfs/go-ipfs/blob/master/docs/config.md)

Έπειτα για να μπορούν να γίνονται αιτήματα CORS (Cross-origin resource sharing) από τον server μας στον κόμβο του IPFS πρέπει να τροποποιήσουμε το αρχείο (τύπου JSON) των ρυθμίσεων του που βρίσκεται στην τοποθεσία:
```
$IPFS_PATH/config
```
όπου $IPFS_PATH το μονοπάτι εγκατάστασης του IPFS

και το τροποποιούμε ώστε στην δεύτερη γραμμή να έχει τιμές στο API τις παρακάτω:
```
"API": {
		"HTTPHeaders": {
			"Access-Control-Allow-Methods": [
				"PUT",
				"GET",
				"POST"
			],
			"Access-Control-Allow-Origin": [
				"http://127.0.0.1:5001",
				"https://webui.ipfs.io",
				"http://miletus.dynu.net:3008"
			]
		}
	}
```
όπου "http://miletus.dynu.net:3008" βάζετε την αντίστοιχη διεύθυνση του site σας

Τέλος, μπορούμε να ενεργοποιήσουμε τον κόμβο με την εντολή:
```
ipfs daemon
```



#### NodeJS
Το τελευταίο βήμα γίνεται με την εγκατάσταση του NodeJS.  Από την επίσημη ιστοσελίδα, πραγματοποιούμε την εγκατάσταση της προτεινόμενης έκδοσης:
* [NodeJS](https://nodejs.org/en/)

Από το terminal, αλλάζουμε το directory εργασίας στον φάκελο του πρότζεκτ μας και τρέχουμε την εντολή:
```
npm install
```
η οποία εγκαθιστά όλα τα NodeJS dependencies.



---
## Smart Contract

Το ΑΒΙ και η διεύθυνση του συμβολαίου περιέχονται στον κώδικα μας. Μπορείς να κρατήσεις τα ίδια.

Εάν θέλεις να ξεκινήσεις μια καινούρια εφαρμογή με την ίδια λογική, υποβάλετε το συμβόλαιο στο Ropsten μέσα από τα παρακάτω βήματα:
Τοποθεσία συμβολαίου:
```
contract/NotaryMarket.sol
```


Ο πιο εύκολος τρόπος να υποβάλετε το συμβόλαιο είναι μέσω του REMIX IDE και την υποστήριξη του Metamask.
1. Κάντε εγκατάσταση την επέκταση του Metamask στον φυλλομετρητή σας, δημιουργήστε έναν λογαριασμό, επιλέξτε το δίκτυο του Ropsten και μέσω ενός faucet αποκτήστε Ether.
2. Επισκεφτείτε το site του Remix IDE, χρησιμοποιείστε το περιβάλλον του Solidity και κάντε copy-paste τον κώδικα του συμβολαίου.
3. Επιλέξτε έκδοση compiler μεγαλύτερη του 5.7, ενεργοποιώντας το optimization και καντε την μεταγλώττισή του.
4. Αποθηκεύστε κάπου το ABI του για να το χρησιμοποιήσετε (προαιρετικό βήμα αν δεν αλλάξατε κάτι στο συμβόλαιο).
5. Επιλέξτε την καρτέλα του "Deploy & Run transactions" και για περιβάλλον το "Injected Web3".
6. Πατήστε το deploy και εκτελέστε την συναλλαγή μέσω του MetaMask.
7. Όταν επιβεβαιωθεί η συναλλαγή, αποθηκεύστε την διεύθυνση του.
8. Χρησιμοποίησε το ABI & την διεύθυνση του όπως περιγράφεται στην περιοχή των Ρυθμίσεων.


---
## Ρυθμίσεις

Για να είναι πλήρως λειτουργική η εφαρμογή, πρέπει να ακολουθήσετε τις παρακάτω οδηγίες.

### Ports
Ο διακομιστής πρέπει να έχει ανοιχτά κάποια ports που χρειάζονται:
1. Το port (default:3008) για την παρουσίαση του site στον client.
2. Για το IPFS πρωτόκολλο (default: 5001)
3. Για την πύλη ανάγνωσης του IPFS (default:8080)
4. Για τον κόμβο του Geth (default:30303)

Για να ανοιχτούν τα ports αυτά στο Ubuntu γίνεται με τις εντολές:
```
sudo ufw allow portNumber
```
όπου αντί για το portNumber βάζετε τον αντίστοιχο αριθμό


### Back-end
1.  Επεξεργάσου το αρχείο app/config/mongodb.config.js
2.  Όπου θα βρεις τον παρακάτω κώδικα :

        module.exports = {
          url: 'mongodb://localhost:27017/vasipara4_test'
        }

3.  Ανανέωσε το url για να αντιστοιχεί με το port της mongodb (αν δεν είναι το default:27017) και το όνομα της βάσης δεδομένων αν δεν χρησιμοποίησες το όνομα "vasipara4_test".
4. Επεξεργάσου το αρχείο app/routes/user.route.js
5. Όπου θα βρεις τον παρακάτω κώδικα στη γραμμή 7:
        var ipfs = ipfsClient("localhost", "5001", { protocol: "http" });
6. Ανανέωσε την τιμή "5001" με το port του IPFS αν δεν ισχύει για default το 5001.


### Front-end
Σε περίπτωση που υποβάλεις το συμβόλαιο και δεν χρησιμοποιήσεις το δικά μας, θα πρέπει να αντικαταστήσεις όλες τις μεταβλητές με όνομα:
```
var abi
var addressContract
```
με τις αντίστοιχες τιμές του καινούριου συμβολαίου. Αν πρόκειται για το ίδιο συμβόλαιο, σε διαφορετική διεύθυνση τότε αλλάζετε μόνο το:
```
var addressContract
```
Οι αλλαγές θα πρέπει να γίνουν στα JS client αρχεία:
- profile.js
- ipfs.js
- web3.js
- marketplace.js

Αλλά και στο αρχείο
 - server.js

όπου δεν υπάρχουν τα ονόματα των μεταβλητών και βρίσκονται κατευθείαν οι τιμές στον ορισμό του συμβολαίου

 Για την αναπαράσταση των link των IPFS αντικειμένων στο marketplace χρησιμοποιείται για href το url της πύλης που έχουμε ανοίξει στον server μας.
 Αντικαταστήστε την με την δικιά σας τιμή. Η μεταβλητή μπορεί να βρεθεί στη γραμμή 360 του marketplace.js:

    const miletusIPFS = "http://miletus.dynu.net:8080/ipfs/";

### Server
Αντίστοιχα σε περίπτωση αλλαγής συμβολαίου, οι αλλαγές που έγιναν στην Front πλευρά θα γίνουν και στον διακομιστή.
Το αρχείο στο οποίο ορίζεται το συμβόλαιο και που θα αλλάξει είναι το:
- server.js


---

## Εκτέλεση app

Μετά από όλες τις εγκαταστάσεις και τις ρυθμίσεις, η εκτέλεση της εφαρμογής πραγματοποιείται με την εντολή:
```
node server.js
```

### Processes Automation using Services
Για την αυτοματοποιημένη λειτουργία της εφαρμογής, προτείνεται η δημιουργία κάποιων παρασκηνιακών services.

Η δημιουργία των παρακάτω Services προϋποθέτει δικαιώματα administrator και πραγματοποιήθηκαν σε λειτουργικό Ubuntu 16.
Δημιουργήστε ένα αρχείο με το όνομα που προτείνεται πιο κάτω για κάθε Service, στην τοποθεσία:
```
/etc/systemd/system/
```

Μετά την εγγραφή του περιεχόμενου σε κάθε αρχείο, εκτελέστε τις εντολές:
```
systemctl start όνομα_service
systemctl enable όνομα_service
```

#### Geth Service
Όνομα αρχείου: geth.service

Περιεχόμενο αρχείου:
```
[Unit]
Description=Ethereum go client

[Service]
Type=simple
SyslogIdentifier=geth
ExecStart=/usr/bin/geth --testnet --syncmode "light" --rpc --rpcapi="db,eth,net,web3,personal,admin" --rpcaddr="localhost" --rpcport="8545" --rpccorsdomain="*"

[Install]
WantedBy=default.target
```

Όνομα service: geth

#### IPFS Service
Όνομα αρχείου: ipfs.service

Περιεχόμενο αρχείου:
```
[Unit]
Description=IPFS Daemon
After=network-online.target

[Service]
Type=simple
SyslogIdentifier=ipfs
ExecStart=/usr/local/bin/ipfs daemon
User=vasipara4

[Install]
WantedBy=default.target
```
όπου User βάζετε το αντίστοιχό σας

Όνομα service: ipfs


#### Server Service
Όνομα αρχείου: marketplace.service

Περιεχόμενο αρχείου:
```
[Unit]
Description=Marketplace server

[Service]
Type=simple

SyslogIdentifier=marketplace
WorkingDirectory=/home/vasipara4/Desktop/Website
ExecStart=/usr/bin/npm start

[Install]
WantedBy=default.target
```
όπου στο WorkingDirectory βάζετε το πλήρες μονοπάτι του φακέλου της εφαρμογής


Όνομα service: marketplace

---

## IPFS site

Για την ένταξη του site στο ipfs, μέσω του terminal και ως working directory τον φάκελο του πρότζεκτ μας εκτελούμε την εντολή:
```
ipfs add -r ipfs_site
```

για να αποκτήσουμε κι εμείς τα αρχεία του site χωρίς να τα έχουμε, γίνεται με την εντολή:
```
ipfs pin hash_of_site
```
όπου hash_of_site βάζουμε την πλήρη ipfs διεύθυνση του φακέλου.


Για την εύκολη πρόσβαση στο δίκτυο του IPFS συνιστάται η εγκατάσταση της επέκτασης [IPFS Companion](https://github.com/ipfs-shipyard/ipfs-companion).

---
## Πληροφορίες

### Versions of Used software
* NodeJS: 8.15.1

* ExpressJS: 4.16.4

* Geth: 1.8.27

* Go-IPFS: 0.4.20

* multer: 1.4.1

* ipfs-http-client: 0.36.4

* mongod: 3.6.11

* mongodb: 3.2.3

* mongoose: 5.5.1

* helmet: 3.18.0

* web3: 1.0.54 beta

* ethers: 4.0.31

###  IPFS

Για να βρείτε τα αρχεία που έχουν αποθηκευτεί στον κόμβο του IPFS εκτελείτε την εντολή:
```
ipfs pin ls | grep recursive
```


### Server info
Ο διακομιστής χρησιμοποιεί το λειτουργικό σύστημα των Ubuntu έκδοσης 16.

### Σημαντικές Τοποθεσίες Αρχείων

Συμβόλαιο εφαρμογής
```
contract/NotaryMarket.sol
```

HTML αρχεία:
```
views/
```

Client JavaScript αρχεία:
```
resources/static/js/
```

Css αρχεία:
```
resources/static/css/
```

Server Routes:
```
app/routes/user.route.js
```
Στο Server Routes αρχείο περιέχεται και ο κώδικας για τον IPFS κώδικα.


Post & Get αιτήματα στον Server:
```
app/controllers/
```

Χώρος αποθήκευσης αρχείων του Client:
```
public/uploads/
```

### Βοηθητικά sites

* [Remix IDE](https://remix.ethereum.org/)
* [Truffle Suite](https://www.trufflesuite.com/)
* [Solidity Docs](https://solidity.readthedocs.io/en/v0.5.10/)
* [Cryptozombies - Solidity Tutorial](https://cryptozombies.io/)
* [Web3 Docs](https://web3js.readthedocs.io/)
* [Ethers Docs](https://docs.ethers.io/ethers.js/html/)


### Ομαλή Λειτουργία Site
Για να χρησιμοποιήσετε το site θα πρέπει να έχετε εγκατεστημένο το extension του [Metamask](https://metamask.io/). Η ανάπτυξη του dapp έγινε με την έκδοση 6.6
