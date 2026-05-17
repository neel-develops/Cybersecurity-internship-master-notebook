const EXTRAS={
  roadmap:{
    title:'60-Day Study Roadmap',
    icon:'🗺️',
    phases:[
      {title:'Phase 1 — Foundations (Days 1-14)',color:'#3b82f6',items:[
        'Day 1-2: CIA Triad, threat actors, basic terminology (Module 1)',
        'Day 3-4: OSI model + TCP/IP — memorise layers and attacks per layer',
        'Day 5-6: IP addressing, DNS, HTTP/HTTPS, common ports',
        'Day 7: Set up VirtualBox + Kali Linux VM (test: ip addr, nmap -v)',
        'Day 8-9: Linux basics — file system, permissions, essential commands',
        'Day 10-11: SSH, networking commands, log analysis',
        'Day 12-13: TryHackMe — complete "Pre-Security" path (free)',
        'Day 14: REVISION — flashcard all port numbers and OSI layers'
      ]},
      {title:'Phase 2 — Tools & Scanning (Days 15-30)',color:'#8b5cf6',items:[
        'Day 15-16: Nmap deep dive — all scan types, NSE scripts, practice on Metasploitable',
        'Day 17-18: Wireshark — capture + filter HTTP traffic, find credentials',
        'Day 19-20: Set up DVWA, configure Burp Suite proxy + CA cert',
        'Day 21-22: Burp Suite — Proxy, Repeater, Intruder basics',
        'Day 23-24: Web vulnerabilities — SQL Injection theory + DVWA practice',
        'Day 25-26: XSS — all 3 types, payloads, cookie theft demo',
        'Day 27: Nikto + gobuster directory enumeration',
        'Day 28-29: TryHackMe — "Jr Penetration Tester" path (start)',
        'Day 30: REVISION — full port + tool cheat sheet from memory'
      ]},
      {title:'Phase 3 — Exploitation & Hardening (Days 31-45)',color:'#10b981',items:[
        'Day 31-32: Metasploit basics — msfconsole workflow, EternalBlue on Metasploitable',
        'Day 33-34: Privilege escalation (Linux) — sudo -l, SUID, LinPEAS',
        'Day 35: Privilege escalation (Windows) — whoami /priv, WinPEAS',
        'Day 36-37: Password security — hashing, Hashcat, John the Ripper with rockyou.txt',
        'Day 38-39: Linux hardening — UFW, SSH config, fail2ban',
        'Day 40: Windows security — Event IDs, SAM, Active Directory basics',
        'Day 41-42: Write first Nmap scan + Metasploit exploit writeup for GitHub',
        'Day 43-44: TryHackMe — complete 3 "Easy" CTF machines',
        'Day 45: REVISION — OWASP Top 10 from memory'
      ]},
      {title:'Phase 4 — Blue Team & Career (Days 46-60)',color:'#f59e0b',items:[
        'Day 46-47: SIEM basics — set up free Wazuh OR explore Splunk free trial',
        'Day 48-49: Incident response — NIST lifecycle, triage commands',
        'Day 50: Digital forensics basics — order of volatility, Autopsy',
        'Day 51-52: Cloud security — AWS IAM, S3, CloudTrail, shared responsibility',
        'Day 53: MITRE ATT&CK — learn 14 tactics, map to techniques',
        'Day 54-55: Mock interview — answer all interview questions aloud (record yourself)',
        'Day 56-57: Build GitHub portfolio — upload 3 scripts + 2 CTF writeups',
        'Day 58: Update TryHackMe profile — complete 5 more rooms',
        'Day 59: Update CV + LinkedIn with all certs, tools, platforms',
        'Day 60: Full revision day — all cheat sheets, mock scenario questions'
      ]}
    ]
  },

  labSetup:{
    title:'Lab Setup Guide',
    icon:'🔬',
    steps:[
      {title:'1. Virtualisation Software',content:cb('Install VirtualBox',`# Download VirtualBox (FREE)
https://www.virtualbox.org/wiki/Downloads
→ Choose your host OS (Windows/macOS/Linux)
→ Install VirtualBox + Extension Pack

# Alternative: VMware Workstation Player (also free)
https://www.vmware.com/products/workstation-player.html

# Memory requirements:
Host RAM: 8GB minimum (16GB recommended)
Each VM: 2GB RAM (Kali), 512MB (Metasploitable)`)},
      {title:'2. Download Kali Linux',content:cb('Set Up Kali VM',`# Download Kali VM Image
https://www.kali.org/get-kali/#kali-virtual-machines
→ Choose VirtualBox or VMware image (pre-built VM)

# Import to VirtualBox:
File → Import Appliance → select .ova file
Allocate: 2048MB RAM, 2 CPU cores

# Default credentials: kali / kali
# First steps:
sudo apt update && sudo apt upgrade -y
sudo passwd kali     # Change password
# Install tools:
sudo apt install -y nmap wireshark gobuster dirb john hashcat`)},
      {title:'3. Metasploitable 2 Target',content:cb('Set Up Vulnerable Target VM',`# Download Metasploitable 2 (intentionally vulnerable)
https://sourceforge.net/projects/metasploitable/

# Import to VirtualBox (extract .zip, use .vmdk file)
New VM → Linux → Ubuntu → Use existing VHD → select .vmdk

# IMPORTANT: Network Configuration
Set BOTH VMs (Kali + Metasploitable) to:
Settings → Network → Adapter 1 → Host-Only Adapter
(This creates an isolated lab network — safe!)

# Metasploitable credentials: msfadmin / msfadmin
# From Kali, find Metasploitable:
nmap -sn 192.168.56.0/24     # Ping sweep
nmap -sV TARGET_IP            # Scan Metasploitable`)},
      {title:'4. Web App Labs (DVWA)',content:cb('Set Up DVWA',`# Option A: Docker (fastest)
docker run --rm -it -p 80:80 vulnerables/web-dvwa

# Option B: XAMPP + DVWA
# Download XAMPP: https://www.apachefriends.org/
# Download DVWA: https://github.com/digininja/DVWA
# Copy DVWA to htdocs folder, configure db settings
# Access: http://localhost/dvwa

# DVWA Setup:
→ Navigate to http://localhost/dvwa/setup.php
→ Click "Create / Reset Database"
→ Login: admin / password
→ Set Security Level to "Low" for learning

# Burp Suite setup with DVWA:
1. Launch Burp Suite Community
2. Proxy → Intercept → Browser → Open Browser
3. In Burp browser, navigate to http://localhost/dvwa`)},
      {title:'5. TryHackMe VPN Setup',content:cb('Connect to TryHackMe Labs',`# 1. Create free account at https://tryhackme.com
# 2. Access VPN: https://tryhackme.com/access
# 3. Download OpenVPN config file (.ovpn)

# Connect (Linux/Kali):
sudo openvpn your-username.ovpn

# Verify connection:
ip addr show tun0        # Should show 10.x.x.x address
ping 10.10.10.10         # Ping TryHackMe network

# Keep terminal with VPN running while doing rooms
# Disconnect: Ctrl+C in VPN terminal

# Recommended starter rooms:
→ "Starting Out In Cybersecurity"
→ "Intro to Networking"
→ "Linux Fundamentals Part 1-3"
→ "Nmap"
→ "OWASP Top 10 - 2021"`)}
    ]
  },

  cheatSheets:{
    title:'Cheat Sheets',
    icon:'📄',
    sheets:[
      {title:'Ports — MEMORISE ALL',content:cb('Critical Ports Reference',`PORT  PROTOCOL  SERVICE     NOTES
21    TCP       FTP         File transfer — plaintext credentials!
22    TCP       SSH         Encrypted remote shell — use this
23    TCP       Telnet      NEVER use — sends everything plaintext
25    TCP       SMTP        Email sending (outbound)
53    UDP/TCP   DNS         Domain resolution — UDP queries, TCP zone transfers
67    UDP       DHCP        IP assignment (server)
80    TCP       HTTP        Web — no encryption
110   TCP       POP3        Email retrieval (old)
143   TCP       IMAP        Email retrieval (modern)
443   TCP       HTTPS       Web — encrypted (TLS)
445   TCP       SMB         Windows file sharing — WannaCry exploit!
3306  TCP       MySQL       Database — common SQLi target
3389  TCP       RDP         Windows remote desktop — brute force target
5432  TCP       PostgreSQL  Database
8080  TCP       HTTP-alt    Dev servers, proxy
8443  TCP       HTTPS-alt   Dev HTTPS
1433  TCP       MSSQL       Microsoft SQL Server
27017 TCP       MongoDB     NoSQL database (often no auth!)`)},
      {title:'Nmap Quick Reference',content:cb('Nmap Commands',`# DISCOVERY
nmap -sn 192.168.1.0/24           # Ping sweep
nmap -Pn 192.168.1.100            # Skip ping, scan anyway

# SCAN TYPES
nmap -sS TARGET    # SYN (stealth, root)
nmap -sT TARGET    # TCP connect (no root)
nmap -sU TARGET    # UDP (slow)

# INTENSITY
nmap -T4 TARGET    # Fast
nmap -p- TARGET    # All 65535 ports
nmap -p 22,80,443  # Specific ports

# INFORMATION
nmap -sV TARGET    # Service versions
nmap -sC TARGET    # Default scripts
nmap -A TARGET     # All (OS+ver+scripts)
nmap -O TARGET     # OS detection

# OUTPUT
nmap -oA scan TARGET   # All formats (txt+xml+gnmap)

# VULNERABILITY SCAN
nmap --script vuln TARGET

# FULL PENTEST SCAN
nmap -sV -sC -p- --min-rate 5000 -oA full TARGET`)},
      {title:'Linux Commands Quick Ref',content:cb('Essential Linux Commands',`# NAVIGATION
pwd | ls -la | cd PATH | cd .. | cd ~

# FILES
cat | less | head -n | tail -f | touch | nano | vim
cp src dst | mv src dst | rm -rf | mkdir -p

# PERMISSIONS
chmod 755 file  chmod 644 file  chmod 600 id_rsa
chown user:group file
find / -perm -4000 2>/dev/null    # SUID files

# NETWORK
ip addr | ip route | ss -tulpn | arp -a
ping -c4 HOST | dig HOST | curl -I URL

# SEARCH
grep -r "pattern" /path
grep -v "exclude" file
find / -name "*.conf" 2>/dev/null
find / -type f -mtime -1          # Modified in last day

# PROCESS
ps aux | top | htop | kill PID | pkill name

# SYSTEM INFO
whoami | id | uname -a | sudo -l
cat /etc/os-release | hostname

# LOGS
tail -f /var/log/auth.log
grep "Failed" /var/log/auth.log | awk '{print $11}' | sort | uniq -c`)},
      {title:'OWASP Top 10 Quick Ref',content:cb('OWASP Top 10 2021',`A01 Broken Access Control  → IDOR, privilege escalation, missing authz checks
A02 Cryptographic Failures → HTTP not HTTPS, MD5 for passwords, exposed keys
A03 Injection              → SQLi, command injection, XSS (also injection)
A04 Insecure Design        → Security not considered in architecture
A05 Security Misconfiguration → Default creds, verbose errors, open S3 buckets
A06 Vulnerable Components  → Log4Shell (CVE-2021-44228), outdated libraries
A07 Auth Failures          → Weak passwords, no MFA, session fixation
A08 Data Integrity Failures → Unsigned updates, insecure deserialization
A09 Logging Failures       → No audit trail, slow breach detection
A10 SSRF                   → Server fetches attacker-controlled URLs

PREVENTION SUMMARY:
SQLi     → Parameterised queries (prepared statements)
XSS      → Output encode + CSP + HttpOnly cookies
CSRF     → CSRF tokens + SameSite=Strict cookies
Auth     → MFA + strong hashing (bcrypt) + HTTPS
Access   → Default deny, check every request server-side`)},
      {title:'Python Security Scripts',content:cb('Quick Python Scripts',`#!/usr/bin/env python3
# Simple Port Scanner
import socket

def scan_port(host, port):
    s = socket.socket()
    s.settimeout(0.5)
    result = s.connect_ex((host, port))
    s.close()
    return result == 0

host = "192.168.1.100"
print(f"Scanning {host}...")
for port in range(1, 1025):
    if scan_port(host, port):
        print(f"  [OPEN] Port {port}")

---

# Banner Grabber
import socket

def grab_banner(host, port):
    try:
        s = socket.socket()
        s.settimeout(2)
        s.connect((host, port))
        banner = s.recv(1024).decode().strip()
        print(f"Port {port}: {banner}")
        s.close()
    except:
        pass

for port in [21, 22, 23, 25, 80, 110, 443]:
    grab_banner("192.168.1.100", port)

---

# Hash Generator + Comparison (don't use MD5 for passwords!)
import hashlib

text = "password123"
print(f"MD5:    {hashlib.md5(text.encode()).hexdigest()}")
print(f"SHA-1:  {hashlib.sha1(text.encode()).hexdigest()}")
print(f"SHA256: {hashlib.sha256(text.encode()).hexdigest()}")`)}
    ]
  },

  interviewQA:{
    title:'Master Interview Questions',
    icon:'🎤',
    categories:[
      {title:'Fundamentals',qa:[
        {q:'What is the CIA Triad?',a:'Confidentiality (data only accessible to authorised), Integrity (data accurate and unmodified), Availability (systems accessible when needed). The three core principles of information security.'},
        {q:'What is the difference between a vulnerability, threat, and risk?',a:'Vulnerability = weakness (unpatched software). Threat = potential danger that could exploit the weakness (attacker). Risk = likelihood × impact of the threat exploiting the vulnerability.'},
        {q:'What is defence in depth?',a:'Layered security controls so no single failure causes a breach — e.g., firewall + IPS + AV + EDR + MFA + encryption. The more layers, the harder to compromise all simultaneously.'},
        {q:'Explain the difference between IDS and IPS.',a:'IDS (Intrusion Detection System) monitors and alerts. IPS (Intrusion Prevention System) monitors, alerts, AND automatically blocks. IPS is inline; IDS is passive.'},
        {q:'What is the difference between symmetric and asymmetric encryption?',a:'Symmetric: same key for encrypt/decrypt (AES) — fast, used for bulk data. Asymmetric: public key encrypts, private key decrypts (RSA, ECC) — slower, used for key exchange and digital signatures.'},
        {q:'What is a zero-day vulnerability?',a:'A vulnerability unknown to the software vendor with no patch available — "zero days" to apply a fix. Extremely valuable to attackers and nation-states.'},
        {q:'What is social engineering?',a:'Manipulating people (not systems) to reveal information or perform actions — phishing emails, pretexting, vishing (phone calls), physical tailgating.'},
        {q:'What is the difference between authentication and authorisation?',a:'Authentication = proving who you are (login). Authorisation = what you are allowed to do after proving identity (access control).'}
      ]},
      {title:'Networking',qa:[
        {q:'Describe the TCP three-way handshake.',a:'SYN → SYN-ACK → ACK. Client sends SYN, server responds with SYN-ACK, client confirms with ACK. Connection is established. Exploited by SYN flood DDoS attacks.'},
        {q:'What is the difference between TCP and UDP?',a:'TCP: reliable, ordered, connection-oriented, handshake required (HTTP, SSH, email). UDP: unreliable, no guarantee of delivery, connectionless, fast (DNS, VoIP, gaming).'},
        {q:'How does DNS work?',a:'Browser checks cache → query local resolver → root nameserver → TLD nameserver → authoritative nameserver → IP returned and cached. TTL determines cache duration.'},
        {q:'What is ARP poisoning?',a:'An attack where the attacker sends fake ARP replies associating their MAC address with a legitimate IP — causes traffic to route through the attacker (man-in-the-middle). Detected with Wireshark.'},
        {q:'What is the difference between a hub and a switch?',a:'Hub broadcasts to all ports — all devices see all traffic (security risk, collisions). Switch sends traffic only to the specific destination port based on MAC address table — more secure and efficient.'},
        {q:'What port does HTTPS use and why is it important?',a:'Port 443. HTTPS = HTTP over TLS. Encrypts all web traffic preventing man-in-the-middle attacks, eavesdropping, and credential theft.'}
      ]},
      {title:'Web Security',qa:[
        {q:'How does SQL injection work?',a:'Unsanitised user input is incorporated directly into a SQL query. Attacker injects SQL syntax to manipulate the query — bypass auth, extract data, or execute commands. Prevention: parameterised queries always.'},
        {q:'What is the difference between stored and reflected XSS?',a:'Stored: malicious script saved in the database, executed when any user views the page (affects all users). Reflected: script in the URL, executes only if victim clicks the crafted link.'},
        {q:'How do you prevent CSRF attacks?',a:'CSRF tokens (unique random value in every form, server validates), SameSite=Strict cookie attribute (prevents cross-site submission), verify Origin/Referer headers.'},
        {q:'What is an IDOR vulnerability?',a:'Insecure Direct Object Reference — accessing objects (files, records) by changing an identifier (id=123 → id=124) without proper authorisation checks. Allows accessing other users\' data.'},
        {q:'What is the purpose of the Content Security Policy header?',a:'CSP restricts what scripts can execute on a page — only scripts from whitelisted sources are permitted. Powerful XSS mitigation even if injection occurs.'},
        {q:'What is SSRF?',a:'Server-Side Request Forgery — attacker tricks the server into making HTTP requests to internal services. Can access AWS metadata (169.254.169.254), internal APIs, or bypass firewall rules.'}
      ]},
      {title:'Tools & Practical',qa:[
        {q:'What Nmap scan is most commonly used for stealth?',a:'-sS (SYN scan, also called half-open) — sends SYN, receives SYN-ACK but never completes handshake. Less likely to appear in application logs. Requires root.'},
        {q:'How do you use Burp Suite to test for SQLi?',a:'Intercept login/search request in Proxy → Send to Repeater → Add single quote (\') to each parameter → Observe response. If error message containing SQL syntax appears, SQLi is likely. Use Scanner or SQLMap to confirm.'},
        {q:'What is the rockyou.txt wordlist?',a:'A 14+ million password wordlist from the 2009 RockYou data breach. The industry-standard wordlist for dictionary attacks with Hashcat and John the Ripper.'},
        {q:'How would you identify what services are running on a host?',a:'nmap -sV TARGET — service version detection. Use -p- for all ports. Add -sC for default scripts. Output: port, state, service name, version.'},
        {q:'What Wireshark filter would you use to find login attempts?',a:'http.request.method == "POST" — shows all POST requests (login forms). Then Follow TCP Stream to see credentials. Also: frame contains "password" to search all packets.'}
      ]},
      {title:'Incident Response & Blue Team',qa:[
        {q:'Walk me through the NIST incident response lifecycle.',a:'1. Preparation (IR plan, team, tools ready). 2. Detection & Analysis (confirm incident, scope). 3. Containment (isolate, preserve evidence). 4. Eradication (remove malware, patch). 5. Recovery (restore, monitor). 6. Post-Incident (lessons learned, update playbooks).'},
        {q:'What is the difference between a SIEM and a SOC?',a:'SOC = the team of people (analysts, managers) doing security monitoring. SIEM = a tool (Splunk, Sentinel) used by the SOC to aggregate and correlate logs. A SOC uses a SIEM.'},
        {q:'What would you do if you suspected a server was compromised?',a:'1. Preserve volatile evidence (RAM, network connections). 2. Contain: isolate from network. 3. Capture forensic disk image. 4. Investigate: check auth.log, running processes, scheduled tasks, new users. 5. Eradicate malware. 6. Restore from clean backup. 7. Document and report.'},
        {q:'What is MITRE ATT&CK?',a:'A globally-accessible knowledge base of adversary tactics and techniques based on real-world observations. Used for threat modelling, detection rule development, and communication between red/blue teams.'},
        {q:'What is the order of volatility?',a:'Most volatile first: CPU registers → RAM (running processes, network state) → swap/pagefile → network connections → running processes → disk. Always collect volatile data before shutting down.'}
      ]}
    ]
  }
};
