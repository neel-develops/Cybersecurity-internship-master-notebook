const M2={title:'Networking for Cybersecurity',topics:[
{title:'OSI Model',
def:'The OSI (Open Systems Interconnection) model is a 7-layer conceptual framework standardising how network systems communicate.',
why:'Security professionals use OSI to identify where an attack exists and which controls apply at each layer.',
beginner:'Think of OSI like mailing a letter: you write it (Layer 7), put it in an envelope (Layer 6), address it (Layer 3), and the postal truck delivers it (Layer 1).',
technical:'Each layer adds headers (encapsulation) as data travels down; headers are stripped (decapsulation) at the receiving end. Attacks map to specific layers — SYN flood=L4, SQLi=L7, IP spoofing=L3.',
commands:cb('OSI Model Reference',`Layer 7 - Application  : HTTP, HTTPS, DNS, FTP, SMTP
Layer 6 - Presentation : SSL/TLS, JPEG, encoding
Layer 5 - Session      : NetBIOS, RPC, session management
Layer 4 - Transport    : TCP (reliable), UDP (fast)
Layer 3 - Network      : IP, ICMP, routing
Layer 2 - Data Link    : Ethernet, MAC addresses, switches
Layer 1 - Physical     : Cables, hubs, signals

Mnemonic (top→bottom): All People Seem To Need Data Processing
Mnemonic (bottom→top): Please Do Not Throw Sausage Pizza Away

Attacks by layer:
  L7: SQLi, XSS, HTTP floods
  L4: SYN flood, UDP flood
  L3: IP spoofing, routing attacks
  L2: ARP poisoning, MAC spoofing`),
interview:[{q:'What OSI layer does IP addressing operate at?',a:'Layer 3 — the Network layer. IP handles routing and addressing.'},{q:'What layer does TCP/UDP operate at?',a:'Layer 4 — the Transport layer.'}],
summary:'7 layers: Physical→Data Link→Network→Transport→Session→Presentation→Application. L3=IP | L4=TCP/UDP | L7=HTTP/DNS. DDoS targets L3-4; app attacks target L7.'},

{title:'TCP/IP & Three-Way Handshake',
def:'TCP/IP is the fundamental internet protocol suite. TCP provides reliable, ordered delivery. UDP provides fast, connectionless delivery.',
why:'Understanding TCP/IP is essential for network scanning, firewall rules, and attack analysis. SYN floods exploit the handshake.',
beginner:'TCP is like a phone call — you call, they answer, you talk, then both say goodbye. UDP is like sending a postcard — no confirmation it arrived.',
technical:'TCP three-way handshake: SYN → SYN-ACK → ACK. Connection teardown: FIN → FIN-ACK. SYN flood = attacker sends many SYNs without ACK, exhausting server connection table.',
commands:cb('TCP Three-Way Handshake',`Client          Server
  |--- SYN ----------->|  "I want to connect"
  |<-- SYN-ACK --------|  "OK, I acknowledge"
  |--- ACK ----------->|  "Connection established"
       [Data Transfer]
  |--- FIN ----------->|  "I want to close"
  |<-- FIN-ACK --------|  "Closing"

TCP flags: SYN, ACK, FIN, RST, PSH, URG

TCP vs UDP:
  TCP: reliable, ordered, slower  → HTTP, SSH, email
  UDP: unreliable, fast           → DNS, VoIP, gaming, video`),
interview:[{q:'What is a SYN flood attack?',a:'Attacker sends many SYN packets without completing the handshake, filling the server\'s connection table causing DoS.'},{q:'When would you use UDP instead of TCP?',a:'When speed matters more than reliability — DNS queries, live video, VoIP, gaming.'}],
summary:'TCP=reliable/ordered | UDP=fast/unreliable. Handshake: SYN→SYN-ACK→ACK. SYN flood=DoS attack on TCP. TCP for HTTP/SSH; UDP for DNS/VoIP.'},

{title:'IP Addressing & Subnetting',
def:'An IP address is a unique numerical label for each network device. IPv4 = 32-bit (e.g., 192.168.1.1). IPv6 = 128-bit (e.g., 2001:db8::1).',
why:'IP addressing is the foundation of all networking. Security professionals need to read IPs, identify private/public ranges, and understand subnetting for network segmentation.',
beginner:'IP address = your home address on the internet. Private IPs are internal (like a house number in a private estate). Public IPs are routable on the internet.',
technical:'RFC 1918 private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. NAT maps private IPs to one public IP. CIDR notation: /24 = 255.255.255.0, gives 254 usable hosts.',
commands:cb('IP & Subnetting Reference',`Private IP Ranges (not internet-routable):
  10.0.0.0/8       (10.0.0.0 – 10.255.255.255)
  172.16.0.0/12    (172.16.0.0 – 172.31.255.255)
  192.168.0.0/16   (192.168.0.0 – 192.168.255.255)

Special addresses:
  127.0.0.1        = localhost (your own machine)
  0.0.0.0          = any/all interfaces
  255.255.255.255  = broadcast

Subnet quick reference:
  /24 = 255.255.255.0   → 254 hosts
  /25 = 255.255.255.128 → 126 hosts
  /26 = 255.255.255.192 → 62 hosts
  /30 = 255.255.255.252 → 2 hosts
  /32 = single host

Formula: hosts = 2^(32-CIDR) - 2

Windows: ipconfig /all
Linux:   ip addr  OR  ifconfig`),
interview:[{q:'What is the loopback address?',a:'127.0.0.1 — refers to your own machine (localhost).'},{q:'How many usable hosts does a /24 subnet have?',a:'254 (256 total minus network address and broadcast address).'}],
summary:'IPv4=32-bit | IPv6=128-bit. Private: 10.x, 172.16-31.x, 192.168.x. Loopback=127.0.0.1. /24=254 hosts. NAT=private→public mapping.'},

{title:'DNS — Domain Name System',
def:'DNS is the internet\'s "phone book" — translates domain names (google.com) into IP addresses (142.250.80.46) that computers use to communicate.',
why:'DNS is critical for security — DNS poisoning redirects users to malicious sites. DNS enumeration reveals subdomains for attack surface mapping.',
beginner:'Without DNS you would memorise IP addresses for every website. DNS lets you type "google.com" and your computer figures out the IP automatically.',
technical:'DNS hierarchy: Root → TLD (.com) → Authoritative nameserver. Key records: A (IPv4), AAAA (IPv6), MX (mail), CNAME (alias), TXT (SPF/DKIM), PTR (reverse). Port 53 UDP (queries) / TCP (zone transfers).',
commands:cb('DNS Commands',`# Basic DNS lookup
nslookup google.com
dig google.com

# All DNS records
dig google.com ANY

# Specific record types
dig google.com MX         # Mail servers
dig google.com TXT        # TXT records (SPF, DKIM)
dig google.com NS         # Name servers

# Reverse DNS lookup
dig -x 8.8.8.8
nslookup 8.8.8.8

# Zone transfer attempt (misconfiguration check)
dig axfr @nameserver domain.com

# Subdomain brute force
fierce --domain example.com
# Check cert transparency logs:
# https://crt.sh/?q=example.com`),
interview:[{q:'What DNS record maps a domain to an IPv4 address?',a:'A record (AAAA for IPv6).'},{q:'What is DNS cache poisoning?',a:'An attacker injects false DNS records causing users to be redirected to malicious sites instead of the intended destination.'}],
summary:'DNS=domain→IP. Port 53. A=IPv4 | AAAA=IPv6 | MX=mail | TXT=email auth. dig/nslookup=DNS tools. DNS poisoning=redirect to attacker site.'},

{title:'HTTP vs HTTPS',
def:'HTTP (port 80) transfers web data in plaintext. HTTPS (port 443) is HTTP secured with TLS/SSL encryption.',
why:'HTTP traffic can be read by anyone intercepting it. Credentials, session cookies, and sensitive data are exposed. HTTPS encrypts the channel.',
beginner:'HTTP = sending a postcard (anyone can read it). HTTPS = sending a sealed encrypted letter. Always look for the padlock in your browser.',
technical:'TLS handshake negotiates cipher suites and exchanges keys before data transfer. X.509 certificates issued by CAs (Let\'s Encrypt, DigiCert). HSTS forces HTTPS. HTTP status: 200=OK, 301=Redirect, 401=Unauth, 403=Forbidden, 404=NotFound, 500=ServerError.',
commands:cb('HTTP Methods & Headers',`HTTP Methods:
  GET    - Retrieve data (should have no side effects)
  POST   - Send data / create resource
  PUT    - Update/replace resource
  DELETE - Remove resource
  PATCH  - Partial update
  HEAD   - Headers only (no body)
  OPTIONS- List allowed methods

Important security headers:
  Strict-Transport-Security → Force HTTPS (HSTS)
  Content-Security-Policy   → Prevent XSS
  X-Frame-Options           → Prevent clickjacking
  X-Content-Type-Options    → Prevent MIME sniffing

curl -I https://example.com        # View response headers
curl -X POST -d "user=a&pass=b" http://target/login`),
interview:[{q:'What port does HTTPS use?',a:'443. HTTP uses port 80.'},{q:'What is HSTS?',a:'HTTP Strict Transport Security — a header that forces browsers to only use HTTPS for a site, preventing protocol downgrade attacks.'}],
summary:'HTTP=port 80 plaintext | HTTPS=port 443 encrypted. TLS=encryption layer. HSTS=force HTTPS. GET=read | POST=create | PUT=update | DELETE=remove.'},

{title:'Ports & Protocols',
def:'A port is a virtual endpoint identifying a specific service on a device. Ports 0-1023 are well-known/reserved for standard services.',
why:'Knowing common ports is essential for Nmap scanning, firewall rules, and identifying services during enumeration.',
beginner:'IP address = building. Port = specific apartment. You need both to reach the right service — just like you need a building address AND a flat number.',
commands:cb('Critical Ports — MEMORISE',`21   TCP  FTP          (file transfer — insecure)
22   TCP  SSH          (secure remote shell)
23   TCP  Telnet       (insecure — NEVER use in prod)
25   TCP  SMTP         (email sending)
53   UDP  DNS          (domain name resolution)
67   UDP  DHCP Server  (IP assignment)
80   TCP  HTTP         (web — unencrypted)
110  TCP  POP3         (email retrieval)
143  TCP  IMAP         (email retrieval)
443  TCP  HTTPS        (web — encrypted)
445  TCP  SMB          (Windows file sharing — WannaCry!)
3306 TCP  MySQL        (database)
3389 TCP  RDP          (Windows remote desktop — brute force target)
5432 TCP  PostgreSQL   (database)
8080 TCP  HTTP-alt     (dev/proxy)

Attack vectors: SMB(445)=WannaCry, RDP(3389)=brute force, Telnet(23)=plaintext creds`),
interview:[{q:'Which port does SSH use?',a:'Port 22 TCP.'},{q:'Why is Telnet dangerous?',a:'Telnet sends all data including credentials in plaintext — anyone on the network can read them. Always use SSH instead.'}],
summary:'SSH=22 | HTTP=80 | HTTPS=443 | DNS=53 | RDP=3389 | SMB=445. SMB and RDP are frequent attack targets. Telnet=insecure always use SSH.'},

{title:'VPN',
def:'A VPN (Virtual Private Network) creates an encrypted tunnel between a device and a remote server, protecting data from interception and masking the user\'s IP.',
why:'Used for corporate remote access, securing traffic on public WiFi, and connecting to pentest lab networks (TryHackMe uses OpenVPN).',
beginner:'VPN = a private secure tunnel through the public internet. Your traffic appears to come from the VPN server, not your real location.',
commands:cb('VPN Types & Protocols',`VPN Types:
  Site-to-Site   → Connects two offices/networks
  Remote Access  → Individual user to corporate network
  SSL/TLS VPN    → Browser-based, no client needed

VPN Protocols (security ranking):
  WireGuard   ★★★★★  Modern, fast, simple
  OpenVPN     ★★★★★  Open source, highly configurable
  IPSec/IKEv2 ★★★★   Common in mobile VPNs
  L2TP/IPSec  ★★★    Older but still used
  PPTP        ★      AVOID — known vulnerabilities

# Connect to TryHackMe VPN
sudo openvpn username.ovpn

# Check VPN connection
ip addr show tun0    # TryHackMe VPN interface`),
interview:[{q:'What VPN protocol is recommended today?',a:'WireGuard or OpenVPN — both are modern, open-source, and highly secure. Avoid PPTP.'},{q:'What is split tunneling?',a:'A VPN configuration where only some traffic routes through the VPN tunnel, the rest goes directly to the internet.'}],
summary:'VPN=encrypted tunnel+IP masking. OpenVPN/WireGuard=secure. PPTP=avoid. TryHackMe uses OpenVPN. VPN≠full anonymity.'},

{title:'Firewalls & IDS/IPS',
def:'A firewall monitors and controls network traffic based on rules. IDS detects attacks. IPS detects AND blocks attacks.',
why:'Firewalls are the primary network perimeter control. Understanding them is essential for network security, pentest evasion, and rule writing.',
beginner:'Firewall = security guard at a building entrance, checking IDs (packet headers) before letting anyone in. IPS = a guard who also tackles intruders.',
technical:'Stateful firewalls track connection state. NGFWs add DPI, application awareness, and IPS. WAFs specifically protect web applications from L7 attacks (SQLi, XSS). DMZ = network segment for public-facing servers.',
commands:cb('Firewall Concepts & Commands',`Firewall types:
  Packet Filter    → IP/port/protocol — fast, basic
  Stateful         → Tracks connection state — smarter
  Application (WAF)→ Inspects HTTP content — stops SQLi/XSS
  NGFW             → All above + DPI + IPS + identity

Architecture:
  Internet → [Firewall] → [DMZ: web/mail] → [Firewall] → Internal

Linux UFW (simple firewall):
  ufw enable
  ufw allow 22/tcp
  ufw deny 23
  ufw allow from 192.168.1.0/24
  ufw status verbose

iptables basics:
  iptables -L -n -v              # List rules
  iptables -A INPUT -p tcp --dport 22 -j ACCEPT  # Allow SSH
  iptables -A INPUT -j DROP      # Default deny`),
interview:[{q:'What is the difference between IDS and IPS?',a:'IDS (Intrusion Detection System) detects and alerts. IPS (Intrusion Prevention System) detects and automatically blocks.'},{q:'What is a WAF?',a:'Web Application Firewall — operates at Layer 7, inspects HTTP traffic to block SQLi, XSS, and other web attacks.'}],
summary:'Firewall=traffic gatekeeper. Stateful>packet filter. WAF=web protection. IDS=detect | IPS=detect+block. DMZ=public-facing servers segment.'},

{title:'Wireshark Introduction',
def:'Wireshark is an open-source network packet analyser that captures and decodes network traffic in real time.',
why:'Essential for understanding network behaviour, detecting attacks, analysing malware C2 traffic, and finding plaintext credentials.',
beginner:'Wireshark lets you see every packet on the network — like reading every letter in a post office. You can see unencrypted passwords in HTTP traffic.',
commands:cb('Wireshark Display Filters',`# Install
sudo apt install wireshark    # Kali/Debian

# Essential display filters
http                           # HTTP traffic only
https / ssl / tls              # TLS/HTTPS traffic
dns                            # DNS queries
tcp.port == 22                 # SSH traffic
ip.addr == 192.168.1.100       # Traffic to/from IP
tcp.flags.syn == 1             # SYN packets (scanning detection)
http.request.method == "POST"  # POST requests
frame contains "password"      # Find "password" in any packet

# Useful actions
Right-click → Follow → TCP Stream   # See full conversation
File → Export Objects → HTTP        # Extract files from capture
Statistics → Protocol Hierarchy     # Protocol breakdown
Statistics → Conversations          # Top talkers

# Capture filter (before capture starts)
port 80             # Only port 80
host 192.168.1.100  # Only this host
not arp             # Exclude ARP noise`),
example:'Capture traffic on HTTP site, filter for `http.request.method == "POST"`, then Follow TCP Stream — you can see credentials in plaintext. This is why HTTPS is essential.',
interview:[{q:'What is Wireshark used for?',a:'Capturing and analysing network packets for troubleshooting, security analysis, and malware investigation.'},{q:'What Wireshark feature lets you see a full TCP conversation?',a:'Follow → TCP Stream — reassembles the full exchange between client and server.'}],
summary:'Wireshark=packet capture/analysis. Captures at L2+. Use display filters to reduce noise. Follow TCP Stream=see full conversations. Can detect plaintext creds.',
quiz:qz('Which Wireshark filter shows only DNS traffic?',['http','tcp.port == 53','dns','ip.proto == 17'],2,'The display filter "dns" shows all DNS protocol traffic. tcp.port==53 also works but "dns" is cleaner.')}
]};
