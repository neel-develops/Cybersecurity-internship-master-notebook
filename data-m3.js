const M3={title:'Linux for Hackers',topics:[
{title:'Linux Basics & Kali Linux',
def:'Linux is an open-source OS. Kali Linux is a Debian-based pentest distro pre-loaded with 600+ security tools — the industry-standard platform for ethical hackers.',
why:'Most servers, cloud infrastructure, and security tools are Linux-native. Kali is the OS you will use daily in pentesting.',
beginner:'Linux is like a highly customisable car engine — you control everything. Kali is the same engine but tuned specifically for hacking, with all the right tools pre-installed.',
commands:cb('Linux File System Hierarchy',`/           Root directory (everything starts here)
├── /bin    Essential binaries (ls, cp, cat, bash)
├── /etc    System configuration files (passwd, hosts, ssh)
├── /home   User home directories (/home/kali)
├── /root   Root user's home
├── /var    Variable data → /var/log (logs!), /var/www (web)
├── /tmp    Temp files — world-writable, attack target
├── /usr    User programs (/usr/bin, /usr/share/wordlists)
├── /proc   Virtual FS — process/kernel info (/proc/1/cmdline)
├── /dev    Device files
└── /opt    Third-party software (Burp Suite installs here)

Kali Linux:
  Download: kali.org/get-kali → Virtual Machines
  Default creds: kali / kali
  Update:  sudo apt update && sudo apt upgrade -y
  Tools at: /usr/share/  (wordlists, nmap scripts, exploits)`),
interview:[{q:'Where are system configuration files stored in Linux?',a:'/etc — e.g., /etc/passwd (users), /etc/ssh/sshd_config (SSH config), /etc/hosts (hostname resolution).'},{q:'Why is /tmp significant for attackers?',a:'/tmp is world-writable — any user can write files there. Often used to upload and execute exploits.'}],
summary:'Kali=pentest Linux. /etc=config | /var/log=logs | /tmp=writable | /home=users. Everything is a file in Linux. Root=UID 0=full access.'},

{title:'File Permissions',
def:'Linux file permissions control read (r=4), write (w=2), and execute (x=1) access for Owner, Group, and Others.',
why:'Misconfigured permissions are a primary privilege escalation vector. SUID files can be abused to gain root.',
beginner:'Think of permissions like keys to a room: read=can enter and look, write=can rearrange furniture, execute=can use the machinery inside.',
technical:'Permission string: -rwxr-xr-- = file, owner=rwx(7), group=r-x(5), others=r--(4) → chmod 754. SUID (4000) runs file as owner regardless of who executes it.',
commands:cb('File Permissions & Commands',`# Read permissions
ls -la
# Output: -rw-r--r-- 1 kali kali 1234 May 17 file.txt
#         |---|---|---
#         own grp oth

Permission octal:
  r=4, w=2, x=1
  7=rwx  6=rw-  5=r-x  4=r--  0=---

chmod 755 script.sh   # rwxr-xr-x (owner full, rest read+exec)
chmod 644 file.txt    # rw-r--r-- (standard file)
chmod 600 id_rsa      # rw------- (SSH private key - MUST be this)
chmod 777 file        # DANGEROUS - everyone full access

chown kali:kali file  # Change owner:group
chmod +x script.sh    # Add execute permission

# SUID/SGID/Sticky bit
chmod 4755 binary     # Set SUID (runs as file owner)
chmod 1777 /tmp       # Sticky bit (only owner can delete)

# Find SUID files (privilege escalation recon!)
find / -perm -4000 -type f 2>/dev/null

# Find world-writable files (misconfiguration)
find / -perm -002 -type f 2>/dev/null`),
interview:[{q:'What does chmod 600 mean?',a:'rw------- — owner can read and write, nobody else has any access. Required for SSH private keys.'},{q:'What is the SUID bit and why is it a security risk?',a:'SUID causes a file to run with the permissions of its owner. If root owns an SUID binary, attackers can exploit it to gain root.'}],
summary:'r=4, w=2, x=1. 644=standard file | 755=executable | 600=private key. SUID=runs as owner=privesc risk. find/-perm -4000 to find SUID files.'},

{title:'Essential Terminal Commands',
def:'The Linux terminal is the primary interface for security work — mastering it is non-negotiable.',
commands:cb('Core Command Reference',`# NAVIGATION
pwd                      # Where am I?
ls -la                   # List with hidden files + details
cd /path | cd .. | cd ~  # Navigate
find / -name "*.conf" 2>/dev/null  # Find config files

# FILES
cat file.txt             # Print file
less file.txt            # Page through file (q to quit)
head -20 file.txt        # First 20 lines
tail -f /var/log/auth.log # Live log follow
cp src dst | mv src dst | rm -rf dir | mkdir -p dir/sub
touch file.txt           # Create empty file
nano file.txt            # Text editor (beginner)

# SEARCH
grep -r "password" /etc/ # Recursive search
grep -i "error" log.txt  # Case-insensitive
grep -v "pattern" file   # Invert (exclude pattern)

# PIPES & PROCESSING
cat file | sort | uniq -c | sort -rn  # Count unique values
awk '{print $1}' file    # Print first column
sed 's/old/new/g' file   # Replace text
cut -d':' -f1 /etc/passwd # Extract field

# SYSTEM INFO
whoami | id | hostname | uname -a
ps aux                   # All running processes
top | htop               # Live process monitor
df -h                    # Disk usage
free -h                  # Memory usage
sudo -l                  # What can I sudo? (KEY FOR PRIVESC)
history                  # Command history
env                      # Environment variables`),
interview:[{q:'What does sudo -l show?',a:'The commands the current user is allowed to run with sudo. Critical for privilege escalation reconnaissance.'},{q:'How do you search for a pattern recursively in all files?',a:'grep -r "pattern" /path/'}],
summary:'grep=search | find=locate files | ps aux=processes | sudo -l=check privesc. Pipe (|) chains commands. tail -f=live log. awk/sed=text processing.'},

{title:'Networking Commands',
def:'Linux networking commands configure, diagnose, and analyse network interfaces — essential for pentesting and incident response.',
commands:cb('Networking Command Reference',`# Interface info (modern)
ip addr              # Show IP addresses
ip link show         # Show interfaces
ip route             # Routing table

# Legacy (still widely used)
ifconfig             # Interface info
route -n             # Routing table

# Connectivity
ping -c 4 8.8.8.8    # Test reachability
traceroute google.com # Trace route to host
mtr google.com        # Continuous traceroute (better)

# DNS
dig google.com ANY   # All DNS records
nslookup google.com  # Basic DNS lookup
host google.com      # Simple lookup

# Active connections & ports
ss -tulpn            # All listening ports (MODERN - use this)
netstat -tulpn       # Same but legacy
netstat -an          # All connections + state

# ARP cache (local network devices)
arp -a

# HTTP requests
curl -I http://example.com          # Headers only
curl -X POST -d "a=1&b=2" http://.. # POST request
wget http://example.com/file        # Download file

# Firewall
iptables -L -n -v   # List all rules
ufw status verbose   # Ubuntu simple firewall`),
interview:[{q:'What is the modern replacement for netstat?',a:'ss — e.g., ss -tulpn shows all listening TCP/UDP ports with process names.'},{q:'How do you check listening ports on a Linux system?',a:'ss -tulpn (or netstat -tulpn on older systems)'}],
summary:'ip addr=modern ifconfig | ss -tulpn=modern netstat. curl=HTTP requests | dig=DNS queries | ping/traceroute=connectivity. arp -a=local network devices.'},

{title:'SSH (Secure Shell)',
def:'SSH is a cryptographic protocol for secure remote login and command execution, replacing insecure Telnet. Default port 22.',
why:'SSH is how security professionals access remote servers. Understanding SSH tunnelling, key-based auth, and config hardening is essential.',
commands:cb('SSH Commands & Configuration',`# Basic connection
ssh user@192.168.1.100
ssh -p 2222 user@host         # Non-standard port

# Key pair generation
ssh-keygen -t ed25519         # Generate Ed25519 key (recommended)
ssh-keygen -t rsa -b 4096     # Generate RSA 4096-bit key

# Deploy public key to server
ssh-copy-id user@host         # Copies ~/.ssh/id_*.pub

# Secure copy
scp file.txt user@host:/path/  # Upload
scp user@host:/path/file.txt . # Download

# SSH tunnelling
ssh -L 8080:localhost:80 user@remote  # Local port forward
ssh -R 8080:localhost:80 user@remote  # Remote port forward
ssh -D 1080 user@remote               # SOCKS proxy (dynamic)

# SSH config (~/.ssh/config)
Host myserver
    HostName 192.168.1.100
    User admin
    Port 22
    IdentityFile ~/.ssh/id_ed25519

# SSH hardening (/etc/ssh/sshd_config)
PermitRootLogin no            # Disable root login via SSH
PasswordAuthentication no     # Key-only auth
MaxAuthTries 3                # Limit brute force
Port 2222                     # Change default port
AllowUsers specificuser       # Whitelist users

# Apply changes
sudo systemctl restart ssh`),
interview:[{q:'Why is key-based SSH auth better than passwords?',a:'SSH keys are cryptographically much stronger than passwords, immune to brute force, and not sent over the network.'},{q:'What is SSH local port forwarding?',a:'ssh -L local_port:remote_host:remote_port user@server — forwards a local port through the SSH tunnel to a remote service.'}],
summary:'SSH=encrypted remote shell. Port 22. Ed25519 keys=preferred. Key auth>passwords. Disable root login. SSH tunnelling=forward ports through encrypted channel.'},

{title:'Users, Groups & Privileges',
def:'Linux uses a UID/GID-based permission system. Root (UID 0) has full system access. sudo allows controlled privilege elevation.',
commands:cb('User & Privilege Commands',`# User info
cat /etc/passwd             # All users (no passwords here)
cat /etc/shadow             # Password hashes (root only!)
cat /etc/group              # Groups
id                          # Current UID, GID, groups
whoami                      # Current username

# User management
adduser newuser             # Create user (interactive)
passwd username             # Set/change password
userdel -r username         # Delete user + home dir
usermod -aG sudo username   # Add user to sudo group

# Privilege escalation recon
sudo -l                     # What can this user sudo?
cat /etc/sudoers            # Sudoers configuration
find / -perm -4000 2>/dev/null  # SUID files
uname -a                    # Kernel version (kernel exploits)
cat /etc/crontab            # Scheduled tasks
ls -la /etc/cron*           # All cron directories
env                         # Environment variables

# Switch users
sudo su -                   # Switch to root
su - username               # Switch to user

# GTFOBins - sudo/SUID privesc:
# https://gtfobins.github.io`),
interview:[{q:'What is /etc/shadow?',a:'Contains hashed passwords for all users. Only readable by root. Used in offline cracking attacks.'},{q:'What is a common first step in Linux privilege escalation?',a:'Run sudo -l to check what commands the current user can execute as root.'}],
summary:'/etc/passwd=users | /etc/shadow=password hashes | UID 0=root. sudo -l=check privesc. GTFOBins=privesc via sudo/SUID misconfigs. LinPEAS=automated privesc enum.'},

{title:'Linux Log Analysis',
def:'Linux logs record all system events, user activity, and security events — the primary evidence source for incident response.',
commands:cb('Key Log Files & Commands',`# Critical log files
/var/log/auth.log      # SSH logins, sudo usage (MOST IMPORTANT)
/var/log/syslog        # General system messages
/var/log/kern.log      # Kernel messages
/var/log/apache2/access.log  # Web server requests
/var/log/apache2/error.log   # Web server errors
/var/log/fail2ban.log  # Banned IPs

# Viewing logs
tail -f /var/log/auth.log          # Live monitoring
grep "Failed password" /var/log/auth.log  # Brute force attempts
grep "Accepted" /var/log/auth.log         # Successful logins
grep "sudo" /var/log/auth.log             # Sudo usage

# Find attacking IPs (brute force)
grep "Failed password" /var/log/auth.log | \
  awk '{print $11}' | sort | uniq -c | sort -rn | head -20

# Login history
last                     # Login history
lastlog                  # Last login per user
w                        # Currently logged in users

# Systemd journal (modern)
journalctl -xe           # Recent events with explanations
journalctl -u ssh        # SSH service logs
journalctl --since "1 hour ago"  # Last hour`),
interview:[{q:'Which Linux log file contains SSH authentication events?',a:'/var/log/auth.log — shows successful logins, failed attempts, and sudo usage.'},{q:'How do you find the top IPs attempting SSH brute force?',a:'grep "Failed password" /var/log/auth.log | awk \'{print $11}\' | sort | uniq -c | sort -rn'}],
summary:'/var/log/auth.log=most security-relevant. tail -f=live monitor. grep+awk+sort+uniq=log analysis toolkit. Attackers clear logs — SIEM provides offsite log storage.',
quiz:qz('Which command shows all listening TCP/UDP ports with process names on modern Linux?',['netstat -an','ifconfig -a','ss -tulpn','ip link show'],2,'ss -tulpn is the modern replacement for netstat -tulpn. Shows all listening sockets with process info.')}
]};
