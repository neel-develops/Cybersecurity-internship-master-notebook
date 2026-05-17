const M8={title:'System Security',topics:[
{title:'Windows Security Basics',
def:'Windows security encompasses built-in and configurable features protecting Windows systems, including Active Directory, Group Policy, authentication protocols, and event logging.',
commands:cb('Windows Security Commands',`# USER & GROUP ENUMERATION
net user                              # List local users
net user administrator                # User account details
net localgroup administrators         # Local admin group members
whoami /priv                          # Current user privileges
whoami /groups                        # Group memberships

# SERVICES
sc query                              # List all services
sc query wuauserv                     # Windows Update status
tasklist /svc                         # Processes with services

# NETWORK
netstat -ano                          # Connections with PIDs
ipconfig /all                         # Network config
arp -a                                # ARP cache

# SCHEDULED TASKS (persistence)
schtasks /query /fo LIST /v           # All scheduled tasks

# REGISTRY (common attack targets)
reg query HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run  # Startup
reg query HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run  # User startup

# POWERSHELL (more powerful)
Get-LocalUser                         # Local users
Get-Process                           # Running processes
Get-Service                           # Services
Get-ScheduledTask                     # Scheduled tasks
Get-WinEvent -LogName Security -MaxEvents 50  # Security log

# KEY WINDOWS SECURITY CONCEPTS
Active Directory → Centralised auth for Windows domains
Kerberos       → Domain authentication protocol (tickets)
NTLM           → Legacy Windows auth (pass-the-hash vulnerable)
SAM database   → Local password hashes (C:\\Windows\\System32\\config\\SAM)
LSA Secrets    → Cached domain credentials
BitLocker      → Full disk encryption
UAC            → User Account Control (privilege elevation prompts)
Windows Defender → Built-in AV + EDR
AppLocker      → Application whitelisting

# KEY EVENT IDs (MEMORISE)
4624  → Successful logon
4625  → Failed logon (watch for brute force)
4648  → Logon with explicit credentials
4720  → User account created (persistence?)
4726  → User account deleted
4732  → User added to privileged group
4756  → Member added to universal group`),
interview:[{q:'What is the SAM database?',a:'Security Account Manager — stores local user password hashes on Windows (NTLM hashes). Located at C:\\Windows\\System32\\config\\SAM — only readable by SYSTEM.'},{q:'What is the difference between NTLM and Kerberos?',a:'NTLM is legacy, vulnerable to pass-the-hash attacks. Kerberos uses ticket-based authentication — more secure, used in Active Directory domains.'}],
summary:'SAM=local hashes | Active Directory=domain auth | Kerberos=domain protocol | NTLM=legacy. Key Event IDs: 4624=login, 4625=failed, 4720=user created, 4732=added to admin group.'},

{title:'Linux Security Hardening',
def:'Linux hardening systematically reduces attack surface by configuring security controls, removing unnecessary services, and implementing defence-in-depth.',
commands:cb('Linux Hardening Checklist',`# 1. KEEP SYSTEM UPDATED
sudo apt update && sudo apt upgrade -y
sudo apt install unattended-upgrades  # Auto-updates

# 2. FIREWALL (UFW)
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp                # SSH only
sudo ufw allow 443/tcp               # HTTPS if web server
sudo ufw deny 23/tcp                 # Block Telnet
sudo ufw status verbose

# 3. SSH HARDENING (/etc/ssh/sshd_config)
PermitRootLogin no                   # Never allow root SSH
PasswordAuthentication no            # Key-only auth
MaxAuthTries 3                       # Limit attempts
Port 2222                            # Non-default port
AllowUsers kali admin                # Whitelist users
LoginGraceTime 30                    # 30 sec to authenticate
sudo systemctl restart ssh

# 4. FAIL2BAN (auto-ban brute force)
sudo apt install fail2ban
# Config: /etc/fail2ban/jail.local
[sshd]
enabled = true
maxretry = 5
bantime = 3600        # 1 hour ban
findtime = 600        # Within 10 minute window

# 5. REMOVE UNNECESSARY PACKAGES
sudo apt remove telnet rsh-server xinetd
sudo apt autoremove

# 6. DISABLE UNNECESSARY SERVICES
sudo systemctl disable avahi-daemon
sudo systemctl disable cups
sudo systemctl disable bluetooth

# 7. FILE SYSTEM SECURITY
# Find SUID files (review each one)
find / -perm -4000 -type f 2>/dev/null
# Find world-writable files
find / -perm -002 -type f 2>/dev/null
# Check /tmp permissions (should be 1777)
ls -la / | grep tmp

# 8. AUDIT CRON JOBS
crontab -l && cat /etc/crontab
ls -la /etc/cron*

# 9. STRONG PASSWORD POLICY
sudo apt install libpam-pwquality
# Edit /etc/security/pwquality.conf:
minlen = 14
dcredit = -1      # Require digit
ucredit = -1      # Require uppercase

# 10. KERNEL HARDENING (/etc/sysctl.conf)
net.ipv4.ip_forward = 0              # Disable IP forwarding
net.ipv4.conf.all.accept_redirects = 0  # No ICMP redirects
kernel.randomize_va_space = 2        # Full ASLR`),
interview:[{q:'What does PermitRootLogin no do in SSH config?',a:'Prevents the root user from logging in directly via SSH. Attackers must first gain access as a regular user then escalate — adds a step to attacks.'},{q:'What is fail2ban?',a:'A daemon that monitors log files and automatically bans IPs exceeding a threshold of failed login attempts — protects against SSH brute force attacks.'}],
summary:'Hardening: update+UFW firewall+SSH keys only+fail2ban+remove services+audit SUID/cron. PermitRootLogin no=essential. ufw=simple firewall. fail2ban=auto-ban brute force.'},

{title:'SIEM Basics',
def:'SIEM (Security Information and Event Management) aggregates, correlates, and analyses security logs from across an organisation to detect threats and enable incident response.',
commands:cb('SIEM Concepts & Splunk SPL',`# WHAT SIEM DOES
1. Collects logs from: firewalls, servers, AV, IDS/IPS, endpoints
2. Normalises: converts raw logs to structured fields
3. Correlates: matches events across sources (same IP on 5 systems)
4. Alerts: notifies SOC when rules match suspicious patterns
5. Stores: long-term retention for compliance (90d - 1yr)

# COMMON SIEM PLATFORMS
Splunk           → Industry leader, powerful SPL query language
IBM QRadar       → Enterprise-grade
Microsoft Sentinel → Cloud-native SIEM (Azure)
Elastic SIEM (ELK Stack) → Open source (Elasticsearch+Logstash+Kibana)
Wazuh            → Free open source SIEM + HIDS (best for learning)

# SPLUNK SPL BASICS (Search Processing Language)
index=*                                    # Search all indices
index=windows EventCode=4625              # Failed Windows logins
index=* sourcetype=syslog "Failed password"  # SSH failures
| stats count by src_ip                    # Count by source IP
| sort -count                              # Sort descending
| head 20                                  # Top 20

# Brute force detection:
index=windows EventCode=4625
| timechart count span=5m
| where count > 10

# Correlate events across sources:
index=* src_ip=192.168.1.100
| table _time, source, action, user

# WAZUH (FREE OPEN SOURCE - START HERE)
# Install: https://documentation.wazuh.com/
# Provides: SIEM + HIDS + file integrity monitoring + vulnerability detection`),
interview:[{q:'What is a SIEM and what does it do?',a:'Security Information and Event Management — collects and centralises logs from all sources, correlates events to detect threats, and generates alerts for the SOC team.'},{q:'What is the difference between a SIEM and an EDR?',a:'SIEM=centralised log aggregation and correlation across the entire environment. EDR (Endpoint Detection & Response)=agent on each endpoint providing deep process/behaviour monitoring.'}],
summary:'SIEM=centralised log correlation+alerting. Wazuh=free open source (start here). Splunk=industry standard (learn SPL). Key for SOC analyst role. Log retention=compliance requirement.'},

{title:'Antivirus, EDR & Hardening',
def:'Defence-in-depth for endpoints: AV detects known malware, EDR provides behavioural detection and response, and system hardening reduces attack surface.',
commands:cb('EDR & Hardening Reference',`# AV vs EDR
AV (Antivirus):
  - Signature-based detection (known malware hashes)
  - Misses zero-days and polymorphic/fileless malware
  - Examples: Windows Defender, Malwarebytes

EDR (Endpoint Detection & Response):
  - Behavioural analysis (detects malicious behaviour, not just files)
  - Process monitoring, memory analysis, network connections
  - Response: isolate, kill, rollback
  - Examples: CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint

# WINDOWS HARDENING
# Disable unnecessary services
Get-Service | Where-Object {$_.Status -eq "Running"} | Select Name
Stop-Service -Name "Spooler" -Force  # Disable print spooler (PrintNightmare)

# Enable Windows Defender features
Set-MpPreference -DisableRealtimeMonitoring $false
Set-MpPreference -EnableNetworkProtection Enabled

# AppLocker (whitelist allowed applications)
Get-AppLockerPolicy -Effective

# Windows Firewall
netsh advfirewall set allprofiles state on
netsh advfirewall show allprofiles

# SYSMON (free Microsoft tool — deep endpoint logging)
# Logs: process creation, network connections, file creation
# Essential for threat hunting and IR
# Config: https://github.com/SwiftOnSecurity/sysmon-config
sysmon -accepteula -i sysmonconfig.xml

# Check Windows Defender status
Get-MpComputerStatus | Select AMRunningMode, RealTimeProtectionEnabled`),
interview:[{q:'What is the difference between AV and EDR?',a:'AV uses signature-based detection for known malware. EDR uses behavioural analysis, monitoring process behaviour, memory, and network activity — detects zero-days and fileless malware that AV misses.'},{q:'What is Sysmon?',a:'A free Microsoft Sysinternals tool that logs detailed Windows events (process creation, network connections, registry changes) — dramatically improves visibility for threat hunting and IR.'}],
summary:'AV=signature-based | EDR=behavioural (better). CrowdStrike/SentinelOne=top EDR. Sysmon=free deep Windows logging. Defence-in-depth=multiple controls, no single point of failure.'}
]};

const M9={title:'Cloud & Modern Security',topics:[
{title:'Cloud Security & Shared Responsibility',
def:'Cloud security protects cloud data, applications, and infrastructure. The shared responsibility model divides security duties between the cloud provider and the customer.',
commands:cb('Shared Responsibility Model',`SHARED RESPONSIBILITY MODEL:

                    IaaS          PaaS          SaaS
                   (EC2/VM)    (App Service)  (Office365)
Customer Owns:
  ├── Data          ✓             ✓             ✓
  ├── Users/IAM     ✓             ✓             ✓
  ├── Application   ✓             ✓             ✗
  ├── OS/Runtime    ✓             ✗             ✗
  └── Network conf  ✓             ✗             ✗

Provider Owns:
  ├── Physical DC   ✓             ✓             ✓
  ├── Hypervisor    ✓             ✓             ✓
  └── Network infra ✓             ✓             ✓

TOP CLOUD SECURITY MISCONFIGURATIONS:
1. Public S3 buckets (open to internet)
2. Overly permissive IAM roles (admin everywhere)
3. Security groups: inbound 0.0.0.0/0 on all ports
4. Unencrypted databases and storage
5. CloudTrail/logging disabled
6. Default credentials on cloud services
7. No MFA on root/admin accounts

CLOUD SECURITY TOOLS:
ScoutSuite   → Multi-cloud security auditor (AWS/Azure/GCP)
Prowler      → AWS security assessment tool
Pacu         → AWS exploitation framework (like Metasploit for AWS)
CloudMapper  → Visualise AWS network topology`),
interview:[{q:'What is the shared responsibility model?',a:'Cloud provider secures the infrastructure (physical, hypervisor, network). Customer secures their data, identity/access management, and configuration. Misconfiguration of customer-owned layers is the #1 cloud risk.'},{q:'What is the most common cloud security mistake?',a:'Misconfiguration — specifically public S3 buckets, overly permissive IAM roles, and security groups open to 0.0.0.0/0.'}],
summary:'Shared responsibility: provider=infrastructure, customer=data+config. Misconfiguration=#1 cloud risk. Public S3 bucket=most common breach. Always enable CloudTrail logging.'},

{title:'AWS Security Fundamentals',
def:'AWS is the world\'s leading cloud platform. Key security services include IAM (identity), CloudTrail (audit logs), GuardDuty (threat detection), and VPC (network isolation).',
commands:cb('AWS Security Services & CLI',`# KEY AWS SECURITY SERVICES
IAM          → Identity & Access Management (who can do what)
CloudTrail   → Audit log of ALL AWS API calls (enable always!)
CloudWatch   → Monitoring, metrics, alarms
GuardDuty    → ML-based threat detection
Security Hub → Centralised security findings aggregator
WAF          → Web Application Firewall
Shield       → DDoS protection (Standard=free, Advanced=paid)
KMS          → Key Management Service (encryption keys)
VPC          → Virtual Private Cloud (isolated network)
Security Groups → Stateful firewall for EC2 instances
S3 Block Public Access → Prevent accidental public buckets
Macie        → Auto-discover and classify sensitive data (S3)

# AWS CLI SECURITY COMMANDS
# Configure CLI
aws configure    # Enter Access Key, Secret, Region

# IAM enumeration (pentest/audit)
aws iam list-users
aws iam list-roles
aws iam list-attached-user-policies --user-name admin
aws iam get-policy-version --policy-arn ARN --version-id v1

# Check for public S3 buckets
aws s3 ls
aws s3api get-bucket-acl --bucket bucket-name
aws s3api get-public-access-block --bucket bucket-name

# CloudTrail status
aws cloudtrail describe-trails
aws cloudtrail get-trail-status --name trail-name

# Security group audit (find open-to-internet rules)
aws ec2 describe-security-groups \
  --query 'SecurityGroups[?IpPermissions[?IpRanges[?CidrIp==\`0.0.0.0/0\`]]]'

# GuardDuty
aws guardduty list-detectors
aws guardduty list-findings --detector-id DETECTOR_ID

# IAM best practices:
# ✓ Enable MFA on root account immediately
# ✓ Never use root account for daily tasks
# ✓ Least privilege for all IAM users/roles
# ✓ Rotate access keys regularly
# ✓ Use IAM roles for EC2 instances (not access keys)`),
interview:[{q:'What is AWS IAM?',a:'Identity and Access Management — controls who (users, roles, services) can do what (actions) on which AWS resources. Core of AWS security.'},{q:'What is AWS CloudTrail?',a:'A service that logs every AWS API call — who did what, when, from where. Essential for audit, compliance, and incident response. Should always be enabled.'}],
summary:'IAM=AWS identity+access. CloudTrail=audit everything (ALWAYS enable). GuardDuty=threat detection. Security Groups=EC2 firewall. Never use root. Least privilege for all IAM entities.'},

{title:'Zero Trust Security',
def:'Zero Trust assumes no user, device, or network is inherently trusted — every access request must be explicitly verified regardless of source.',
commands:cb('Zero Trust Principles',`ZERO TRUST CORE PRINCIPLES:
"Never Trust, Always Verify"

1. VERIFY IDENTITY
   → Strong MFA for all users
   → Continuous re-authentication
   → Identity provider: Okta, Azure AD, Google Workspace

2. LEAST PRIVILEGE ACCESS
   → Minimum permissions required for the task
   → Just-in-time access (temporary elevation)
   → No standing admin privileges

3. ASSUME BREACH
   → Segment networks (microsegmentation)
   → Limit blast radius if compromised
   → Monitor all traffic (even internal)

4. DEVICE COMPLIANCE
   → Verify device health before granting access
   → MDM (Mobile Device Management)
   → Patch level, AV status, encryption enabled

5. ENCRYPT EVERYTHING
   → TLS for all traffic (even internal east-west)
   → Encrypt data at rest

6. MONITOR & LOG EVERYTHING
   → All access requests logged
   → Anomaly detection (behavioural analytics)
   → SIEM + UEBA (User Entity Behaviour Analytics)

ZERO TRUST vs TRADITIONAL (PERIMETER-BASED):
Traditional: "Trust everything inside the network" (castle+moat)
Zero Trust:  "Trust nothing, verify everything" (even internal traffic)

Real implementations:
  Google BeyondCorp → pioneer of Zero Trust
  Microsoft Entra   → Azure-native Zero Trust
  Cloudflare Access → Zero Trust network access`),
interview:[{q:'What does "Zero Trust" mean?',a:'A security model that assumes no user, device, or network location is inherently trusted. Every access request is verified based on identity, device health, and context — regardless of network location.'},{q:'How does Zero Trust differ from traditional perimeter security?',a:'Traditional security trusts everything inside the network ("castle and moat"). Zero Trust treats all traffic as potentially hostile — internal users are verified the same as external.'}],
summary:'Zero Trust="Never trust, always verify". Key pillars: MFA+least privilege+microsegmentation+encrypt all. Replaces perimeter security. Google BeyondCorp=real-world pioneer.'},

{title:'DevSecOps & Container Security',
def:'DevSecOps integrates security throughout the software development lifecycle. Container security addresses the unique risks of Docker and Kubernetes environments.',
commands:cb('DevSecOps & Container Security',`# DEVSECOPS — SHIFT SECURITY LEFT
Integrate security at every SDLC phase:

Plan   → Threat modelling, security requirements
Code   → Secure coding standards, IDE security plugins
Build  → SAST (Static Analysis Security Testing)
Test   → DAST (Dynamic Analysis), dependency scanning
Deploy → Container scanning, IaC security checks
Run    → RASP, WAF, monitoring, EDR

# SAST TOOLS (scan code without running it)
Semgrep         → Fast, flexible rule-based SAST
Bandit          → Python security linter
SonarQube       → Multi-language SAST platform
CodeQL          → GitHub's SAST engine (free for open source)

# DEPENDENCY SCANNING
npm audit                    # Node.js vulnerabilities
pip audit                    # Python packages
OWASP Dependency-Check       # Multi-language

# DOCKER SECURITY
# Image scanning
docker scan myimage:latest   # Docker Scout
trivy image myimage:latest   # Trivy (comprehensive scanner)

# Container security best practices
FROM node:18-slim             # Use minimal base image
RUN useradd -m appuser        # Don't run as root
USER appuser                  # Switch to non-root

# Never: docker run --privileged (full host access!)
# Scan: trivy image ubuntu:latest

# KUBERNETES SECURITY
kubectl auth can-i --list                   # Check permissions
kubectl get pods --all-namespaces           # All pods
# Enable RBAC, network policies, pod security standards`),
interview:[{q:'What is "shift left" in DevSecOps?',a:'Moving security testing earlier (left) in the development pipeline — finding and fixing vulnerabilities in code, before deployment, rather than in production where they are costlier.'},{q:'What is SAST?',a:'Static Application Security Testing — analyses source code without executing it to find vulnerabilities. Run in CI/CD pipeline on every code commit.'}],
summary:'DevSecOps=security in CI/CD pipeline. Shift left=find bugs in dev, not prod. SAST=static code analysis. DAST=runtime testing. Trivy=container image scanner. Never run containers as root.'}
]};
