const M10={title:'Blue Team Basics',topics:[
{title:'Security Operations Centre (SOC)',
def:'A SOC is a centralised team monitoring, detecting, analysing, and responding to cybersecurity incidents 24/7. The first career destination for most security graduates.',
commands:tbl([['SOC Tier','Role','Responsibilities'],['Tier 1 - Analyst','Alert triage','Monitor SIEM dashboards, triage alerts, escalate to T2'],['Tier 2 - Analyst','Investigation','Investigate escalated incidents, threat hunting, containment'],['Tier 3 - Senior','Threat Hunting','Proactive hunting, IR, malware analysis, tooling'],['SOC Manager','Management','Team leadership, metrics, vendor management, reporting']]),
why:'SOC analyst roles are the most common entry point to cybersecurity. Understanding SOC workflow is essential for interviews.',
commands2:cb('SOC Tools & Workflow',`# SOC WORKFLOW: Alert → Triage → Investigate → Respond → Report

# SIEM TOOLS (log aggregation + correlation)
Splunk          → Industry leader, powerful SPL query language
Microsoft Sentinel → Cloud-native, Azure-integrated
IBM QRadar      → Enterprise, large orgs
Elastic SIEM    → Open source, flexible

# SOAR (Security Orchestration, Automation & Response)
Automates repetitive tasks: blocking IPs, disabling accounts
Examples: Splunk SOAR (Phantom), Palo Alto XSOAR, IBM SOAR

# THREAT INTELLIGENCE PLATFORMS
VirusTotal      → File/URL/IP/domain scanning (aggregates 70+ AV)
MalwareBazaar   → Malware samples and IOCs
OTX AlienVault  → Open threat intelligence sharing
MISP            → Open source threat intelligence sharing
Shodan          → Internet-exposed asset intelligence

# TICKETING (incident tracking)
ServiceNow      → ITSM + security operations
Jira            → Issue tracking
TheHive         → Open source IR case management

# KEY SOC METRICS
MTTD → Mean Time To Detect    (how fast you spot attacks)
MTTR → Mean Time To Respond   (how fast you contain)
False Positive Rate → Too high = alert fatigue`),
interview:[{q:'What does a Tier 1 SOC analyst do?',a:'Monitors SIEM dashboards, triages incoming alerts, determines true/false positive, documents findings, and escalates true positives to Tier 2 for deeper investigation.'},{q:'What is alert fatigue?',a:'When SOC analysts receive so many alerts (especially false positives) that they begin ignoring or dismissing them — increasing the risk of missing a real attack.'}],
summary:'SOC=24/7 monitoring team. T1=triage | T2=investigate | T3=hunt. SIEM=alert source. SOAR=automation. VirusTotal=essential tool. MTTD and MTTR are key metrics.'},

{title:'Incident Response (IR)',
def:'Incident response is the structured approach to handling security breaches and attacks, minimising damage and recovery time.',
commands:cb('IR Lifecycle (NIST SP 800-61)',`NIST INCIDENT RESPONSE LIFECYCLE:

1. PREPARATION
   ├── IR policy, plan, and playbooks documented
   ├── IR team trained and tooled
   ├── Contact lists ready
   └── Backup and recovery tested

2. DETECTION & ANALYSIS
   ├── Identify incident from SIEM/EDR/user report
   ├── Validate: true positive or false positive?
   ├── Scope: what systems affected?
   └── Severity: P1/P2/P3/P4?

3. CONTAINMENT
   ├── Short-term: isolate affected systems (network block)
   ├── Evidence preservation (image drive before wipe)
   └── Long-term: patch, credential reset

4. ERADICATION
   ├── Remove malware, backdoors, unauthorised accounts
   ├── Identify root cause
   └── Patch the exploited vulnerability

5. RECOVERY
   ├── Restore from clean backups
   ├── Monitor for recurrence
   └── Gradually restore services

6. POST-INCIDENT ACTIVITY
   ├── Lessons learned (within 2 weeks)
   ├── Update playbooks
   └── Root cause analysis document

# IR TRIAGE COMMANDS (Windows)
netstat -ano                 # Current connections
tasklist /svc                # Processes with services
net user                     # Check for rogue accounts
net localgroup administrators
schtasks /query              # Scheduled tasks (persistence)
dir /s /b C:\\Users\\*\\AppData\\Roaming  # Suspicious files

# LIVE FORENSICS (preserve volatile data first!)
# Memory → swap file → temp → disk (most volatile → least)`),
interview:[{q:'What are the 6 phases of NIST incident response?',a:'Preparation → Detection & Analysis → Containment → Eradication → Recovery → Post-Incident Activity.'},{q:'Why must evidence be preserved before containment?',a:'Volatile evidence (memory, running processes, network connections) is lost when a system is shut down. Forensically image the system before eradicating malware.'}],
summary:'NIST IR: Preparation→Detection→Containment→Eradication→Recovery→Post-Incident. Preserve evidence first. Short-term containment=isolate. Eradication=remove root cause. Lessons learned=improve.'},

{title:'Digital Forensics Basics',
def:'Digital forensics involves the collection, preservation, analysis, and presentation of digital evidence from computers, networks, and storage devices.',
commands:cb('Forensics Process & Tools',`# ORDER OF VOLATILITY (collect most volatile first)
1. CPU registers & cache (lost immediately)
2. RAM (running processes, network connections, encryption keys)
3. Swap file / pagefile
4. Network connections / routing tables
5. Running processes
6. Disk (persistent - can be imaged later)

# MEMORY FORENSICS
# Capture RAM (Windows)
winpmem.exe ram.dmp              # Winpmem (free)
FTK Imager → Capture Memory     # GUI option

# Analyse memory with Volatility (must-know tool)
volatility -f ram.dmp --profile=Win10x64_19041 pslist   # Process list
volatility -f ram.dmp --profile=Win10x64_19041 netscan  # Network connections
volatility -f ram.dmp --profile=Win10x64_19041 cmdline  # Command history
volatility -f ram.dmp --profile=Win10x64_19041 hashdump # Password hashes

# DISK FORENSICS
# Create forensic image (never work on original!)
dd if=/dev/sda of=disk.img bs=4M status=progress  # Linux
# Verify integrity
md5sum disk.img && sha256sum disk.img

# Autopsy (free GUI forensics platform)
# https://www.autopsy.com/

# FILE SYSTEM ANALYSIS
# Key locations on Windows:
%USERPROFILE%\\Recent           # Recent files
%TEMP%                         # Temp directory
C:\\Windows\\Prefetch           # Program execution history
C:\\Windows\\System32\\winevt\\Logs  # Event logs
HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run  # Registry persistence
# Browser history: AppData\\Local\\Google\\Chrome\\User Data\\Default\\History

# CHAIN OF CUSTODY
→ Document every action taken on evidence
→ Who collected, when, where, method
→ Evidence should never be modified — always work on COPY`),
interview:[{q:'What is the order of volatility in forensics?',a:'Most volatile first: CPU registers → RAM → swap → network connections → running processes → disk. Volatile data is lost when power is cut.'},{q:'Why should you never work on the original evidence?',a:'Working on the original modifies it, destroying forensic integrity. Always create a forensic copy (image), verify with hash, and work on the copy.'}],
summary:'Forensics=collect→preserve→analyse→report. Volatility order: RAM→swap→disk. Volatility tool=memory analysis. Always hash verify evidence. Chain of custody=legal requirement. Autopsy=free forensics platform.'},

{title:'Threat Intelligence & Hunting',
def:'Threat intelligence is evidence-based knowledge about adversaries and their tactics. Threat hunting proactively searches for hidden threats not caught by automated detection.',
commands:cb('Threat Intel & Hunting Reference',`# THREAT INTELLIGENCE FEEDS (FREE)
VirusTotal      → https://virustotal.com (file/URL/IP/domain)
OTX AlienVault  → https://otx.alienvault.com
MalwareBazaar   → https://bazaar.abuse.ch
Shodan          → https://shodan.io (exposed services)
GreyNoise       → https://greynoise.io (benign scanner IPs)
AbuseIPDB       → https://abuseipdb.com (IP reputation)

# IOC TYPES (Indicators of Compromise)
File hash     → MD5/SHA256 of malware
IP address    → C2 server, attacker IP
Domain        → Malicious domain / C2 domain
URL           → Malicious URL
Registry key  → Malware persistence location
File path     → Dropped file location
Email         → Phishing sender

# MITRE ATT&CK FRAMEWORK
→ Knowledge base of adversary tactics and techniques
→ https://attack.mitre.org
→ 14 Tactics (what attackers want to achieve)
→ 200+ Techniques (how they achieve it)

Key ATT&CK Tactics:
  TA0001 Initial Access        (phishing, public-facing exploit)
  TA0002 Execution             (PowerShell, scripts)
  TA0003 Persistence           (registry, scheduled tasks)
  TA0004 Privilege Escalation  (SUID, token manipulation)
  TA0005 Defense Evasion       (obfuscation, disable logging)
  TA0007 Discovery             (account/network/file discovery)
  TA0008 Lateral Movement      (pass-the-hash, RDP, PSExec)
  TA0009 Collection            (keylogging, screenshot)
  TA0010 Exfiltration          (C2 channels, cloud storage)
  TA0011 Command & Control     (C2 beaconing)

# THREAT HUNTING EXAMPLES (Splunk)
# Hunt for PowerShell encoded commands
index=windows EventCode=4688
  CommandLine="*-encodedcommand*" OR CommandLine="*-enc *"

# Hunt for lateral movement via WMI
index=windows EventCode=4624 LogonType=3
| stats count by src_ip, dest_host, user`),
interview:[{q:'What is MITRE ATT&CK?',a:'A globally-accessible knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world observations. Used for threat modelling, detection engineering, and red/blue team communication.'},{q:'What is an IOC?',a:'Indicator of Compromise — artefacts observed during an attack: file hashes, malicious IPs/domains, registry keys, or file paths that indicate a system may be compromised.'}],
summary:'Threat intel=evidence about adversaries. IOC=attack artefacts (hash/IP/domain). MITRE ATT&CK=TTPs framework (memorise the 14 tactics). VirusTotal=first tool for any suspicious file.',
quiz:qz('What does MTTD stand for in SOC metrics?',['Mean Time to Deploy','Mean Time to Detect','Maximum Threat and Damage','Mean Tier to Defend'],1,'MTTD = Mean Time To Detect — measures how quickly the SOC identifies an incident. Lower is better.')}
]};

const M11={title:'Career & Internship Readiness',topics:[
{title:'Certifications Roadmap',
def:'Cybersecurity certifications validate skills to employers. The right roadmap depends on whether you pursue offensive (red team) or defensive (blue team) roles.',
commands:tbl([['Cert','Level','Focus','Cost','Value'],['CompTIA Security+','Beginner','Broad security fundamentals','£350','★★★★★ (HR shortlisting)'],['CompTIA Network+','Beginner','Networking','£300','★★★★ (pre-Security+)'],['eJPT (eLearnSecurity)','Beginner','Practical pentesting','£150','★★★★★ (best starter)'],['OSCP (OffSec)','Intermediate','Hands-on pentesting (24h exam)','£1,300','★★★★★ (gold standard)'],['CEH','Intermediate','Ethical hacking (multiple choice)','£2,000','★★★ (less practical)'],['CySA+ (CompTIA)','Intermediate','Blue team, SOC analyst','£350','★★★★'],['PNPT (TCM Security)','Intermediate','Practical pentesting + report','£350','★★★★★ (value for money)'],['CISSP','Advanced','Security management','£650','★★★★★ (senior roles)']]),
commands2:cb('Recommended Learning Order',`# BEGINNER PATH (Start here — 0-6 months)
1. TryHackMe (free) → Beginner rooms → Pre-Security path
   https://tryhackme.com
2. CompTIA Network+ OR Security+
3. eJPT (eLearnsecurity Junior Penetration Tester)

# PENETRATION TESTER PATH
1. TryHackMe → Junior Pentester path
2. Hack The Box (free) → Starting Point machines
3. PNPT (TCM Security) — practical, affordable, respected
4. OSCP — gold standard, required for many senior roles

# SOC/BLUE TEAM PATH
1. TryHackMe → SOC Level 1 path
2. CompTIA Security+ → CySA+
3. Microsoft SC-200 (Sentinel), AZ-500 (Azure Security)
4. Splunk Core Certified User/Admin

# FREE PRACTICE PLATFORMS
TryHackMe          → https://tryhackme.com (best for beginners)
Hack The Box        → https://hackthebox.com (more challenging)
DVWA               → Damn Vulnerable Web App (local lab)
VulnHub            → Downloadable vulnerable VMs
PicoCTF            → CTF challenges for beginners
PortSwigger Academy → Free web security labs (burp suite)`),
interview:[{q:'Which certification is recommended for starting a penetration testing career?',a:'eJPT for beginners (practical, affordable). PNPT for intermediate (practical, great value). OSCP is the gold standard for senior roles but requires significant experience first.'},{q:'What is TryHackMe?',a:'A browser-based learning platform with guided cybersecurity rooms. The best starting point — no setup required, structured learning paths for beginner to advanced.'}],
summary:'Start: TryHackMe free → CompTIA Security+ → eJPT. Pentest: PNPT → OSCP. Blue team: CySA+ → Splunk. OSCP=gold standard pentesting cert. All certs require practical skills, not just theory.'},

{title:'Interview Preparation',
def:'A structured approach to cybersecurity interviews combining technical knowledge, practical demonstrations, and professional communication.',
commands:cb('Interview Preparation Framework',`# CATEGORY 1: FUNDAMENTAL CONCEPTS
Must be able to explain in 60 seconds:
□ CIA Triad
□ OSI model (what happens at each layer)
□ TCP 3-way handshake
□ How HTTPS/TLS works
□ What SQL injection is and how to prevent it
□ What XSS is and how to prevent it
□ Difference between authentication and authorisation
□ What a VLAN is
□ How DNS works
□ What is Zero Trust

# CATEGORY 2: SCENARIO QUESTIONS
"Walk me through how you would..."
□ Investigate a suspected compromise on a Windows server
□ Respond to an alert of outbound traffic to known malicious IP
□ Test a web application for XSS
□ Approach a penetration test from scratch
□ Handle a phishing email reported by an employee

# CATEGORY 3: PRACTICAL/TECHNICAL
Expect technical tests for pentest roles:
□ Write a Nmap command to scan all ports with service detection
□ Identify the vulnerability in a code snippet
□ What port does [SSH/HTTPS/DNS] use?
□ What does this Wireshark filter do?
□ Decode this Base64 string

# BEHAVIOURAL QUESTIONS (STAR method)
Situation → Task → Action → Result

"Tell me about a time you..."
□ Solved a complex technical problem
□ Worked in a team under pressure
□ Learned a new skill quickly
□ Made a mistake and how you handled it

# QUESTIONS TO ASK THEM
□ What does the team's typical day look like?
□ What tools does the SOC use?
□ What growth and training opportunities exist?
□ How mature is the security programme?
□ What would success look like in the first 90 days?

# PORTFOLIO PROJECTS TO MENTION
□ TryHackMe / HackTheBox profile with rooms completed
□ Home lab (VirtualBox/VMware + Kali + Metasploitable)
□ CTF competition participation
□ GitHub with security scripts/tools
□ Writeups on Medium/personal blog`),
interview:[{q:'What is the CIA Triad?',a:'Confidentiality (data only accessible to authorised), Integrity (data is accurate and unmodified), Availability (systems and data accessible when needed). The three core principles of information security.'},{q:'Explain what happens when you type https://google.com in your browser.',a:'DNS resolves google.com → IP address. TCP handshake with server. TLS handshake negotiates encryption. Browser sends HTTP GET. Server responds with HTML. All subsequent traffic is encrypted.'}],
summary:'Prep: CIA triad + OSI + handshake + SQL + XSS + ports. STAR method for behavioural. Have GitHub/TryHackMe profile ready. Ask smart questions. Dress for security professional, not school.'},

{title:'Building Your Portfolio',
def:'A strong portfolio demonstrates practical skills employers cannot see from a CV alone. It proves you can do the job, not just pass theory exams.',
commands:cb('Portfolio Building Guide',`# HOME LAB SETUP (Free)
1. Install VirtualBox (free) or VMware Workstation Player
2. Download Kali Linux VM from kali.org
3. Download Metasploitable 2 from VulnHub
4. Set both VMs to Host-Only networking
5. Practice: nmap → nikto → metasploit → post-exploitation

# TRYHACKME PROFILE
→ Complete beginner path rooms
→ Earn certificates for completed paths
→ Share your profile URL in applications
→ Aim for 100+ rooms completed

# GITHUB PORTFOLIO
Repos to create:
□ Python security scripts (port scanner, hash cracker, banner grabber)
□ Bash automation scripts (log analyser, network scanner)
□ CTF writeups (solve a challenge + document your process)
□ Config templates (hardened SSH config, UFW rules, fail2ban config)
□ README files explaining each project

# CTF WRITEUPS (Medium / Personal Blog)
→ Document your solve process for CTF challenges
→ Shows problem-solving, communication, and knowledge
→ Builds SEO for your name in security context

# PYTHON SCRIPTS TO BUILD
# 1. Simple port scanner
import socket
for port in range(1, 1025):
    s = socket.socket()
    s.settimeout(0.5)
    if s.connect_ex(('target', port)) == 0:
        print(f"Port {port}: OPEN")
    s.close()

# 2. Hash identifier
import hashlib
def hash_password(password):
    return {
        'md5':    hashlib.md5(password.encode()).hexdigest(),
        'sha1':   hashlib.sha1(password.encode()).hexdigest(),
        'sha256': hashlib.sha256(password.encode()).hexdigest()
    }

# 3. Banner grabber
import socket
s = socket.socket()
s.connect(('target', 22))
print(s.recv(1024).decode())

# LINKEDIN PROFILE
□ "Cybersecurity Intern | CompTIA Security+ | TryHackMe"
□ List all certs, platforms, tools
□ Connect with cybersecurity professionals
□ Share your writeups/projects`),
interview:[{q:'What should a cybersecurity portfolio include?',a:'Home lab evidence (screenshots, writeups), TryHackMe/HTB profile, GitHub with security scripts and CTF writeups, any certifications, and blog posts documenting problem-solving.'},{q:'Why are CTF writeups valuable?',a:'They demonstrate technical problem-solving ability, knowledge of specific vulnerability types, persistence, and communication skills — all key attributes for security roles.'}],
summary:'Portfolio=proof of skills. Home lab: VirtualBox+Kali+Metasploitable. GitHub: scripts+writeups. TryHackMe profile. CTF writeups on Medium. LinkedIn with certs+tools. Python scripts show coding ability.'}
]};
