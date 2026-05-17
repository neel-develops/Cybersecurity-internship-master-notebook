// ===== HELPER FUNCTIONS (used by data files) =====
function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function cb(lang,code){return`<div class="code-block"><div class="code-header"><span>${lang}</span><button class="copy-btn">Copy</button></div><pre><code>${escHtml(code.trim())}</code></pre></div>`;}
function tbl(rows){return`<div style="overflow-x:auto;margin:12px 0"><table style="width:100%;border-collapse:collapse;font-size:13px">${rows.map((r,ri)=>`<tr>${r.map(c=>`<${ri===0?'th':'td'} style="padding:8px 12px;border:1px solid var(--glass-border);${ri===0?'background:var(--accent3);font-weight:600;text-align:left':'text-align:left;color:var(--fg2)'}">${c}</${ri===0?'th':'td'}>`).join('')}</tr>`).join('')}</table></div>`;}
function qz(q,opts,ci,ex){return`<div class="quiz"><div class="quiz-q">❓ ${q}</div><div class="quiz-opts">${opts.map((o,i)=>`<div class="quiz-opt" data-correct="${i===ci?1:0}">${o}</div>`).join('')}</div><div class="quiz-explain">${ex}</div></div>`;}
function al(type,text){return`<div class="alert alert-${type}">${text}</div>`;}
function fc(q,a){return`<div class="flashcard"><div class="flashcard-q">💡 ${q}</div><div class="flashcard-a">${a}</div><div class="flashcard-hint">Click to reveal</div></div>`;}

// ===== CORE ENGINE =====
const $ = s=>document.querySelector(s);
const $$ = s=>document.querySelectorAll(s);
let allExpanded=false, techMode=false;

// ===== DOT GRID =====
function initDotGrid(){
  const c=$('#dotGrid'),ctx=c.getContext('2d');
  const resize=()=>{c.width=innerWidth;c.height=innerHeight;draw();};
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    const sp=30,r=.6;
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--fg3');
    for(let x=sp;x<c.width;x+=sp)
      for(let y=sp;y<c.height;y+=sp){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  }
  addEventListener('resize',resize);resize();
}

// ===== SCROLL PROGRESS =====
function initScrollProgress(){
  addEventListener('scroll',()=>{
    const h=document.documentElement.scrollHeight-innerHeight;
    $('#scrollProgress').style.width=(scrollY/h*100)+'%';
  });
}

// ===== THEME =====
function initTheme(){
  const saved=localStorage.getItem('theme')||'dark';
  document.documentElement.dataset.theme=saved;
  $('#themeToggle').onclick=()=>{
    const t=document.documentElement.dataset.theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=t;
    localStorage.setItem('theme',t);
    initDotGrid();
  };
}

// ===== SIDEBAR =====
function initSidebar(){
  $('#menuToggle').onclick=()=>$('#sidebar').classList.toggle('open');
  document.addEventListener('click',e=>{
    if(innerWidth<=900&&!e.target.closest('#sidebar')&&!e.target.closest('#menuToggle'))
      $('#sidebar').classList.remove('open');
  });
}

// ===== SEARCH =====
function initSearch(){
  const box=$('#searchBox'),res=$('#searchResults');
  box.addEventListener('input',()=>{
    const q=box.value.toLowerCase().trim();
    if(q.length<2){res.style.display='none';return;}
    const items=[];
    $$('.topic-title').forEach(t=>{
      if(t.textContent.toLowerCase().includes(q)){
        const mod=t.closest('.module');
        items.push({title:t.textContent.trim(),module:mod?.querySelector('.module-title')?.textContent||'',el:t});
      }
    });
    $$('.topic-body p, .topic-body li').forEach(p=>{
      if(p.textContent.toLowerCase().includes(q)&&items.length<15){
        const mod=p.closest('.module');
        items.push({title:p.textContent.substring(0,60)+'…',module:mod?.querySelector('.module-title')?.textContent||'',el:p});
      }
    });
    if(!items.length){res.style.display='none';return;}
    res.innerHTML=items.slice(0,10).map((it,i)=>
      `<div class="sr-item" data-idx="${i}"><strong>${it.title}</strong><span>${it.module}</span></div>`
    ).join('');
    res.style.display='block';
    res.querySelectorAll('.sr-item').forEach((el,i)=>{
      el.onclick=()=>{
        const target=items[i].el;
        const topic=target.closest('.topic');
        const mod=target.closest('.module');
        if(mod&&!mod.classList.contains('open'))mod.classList.add('open');
        if(topic&&!topic.classList.contains('open'))topic.classList.add('open');
        setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'center'}),100);
        res.style.display='none';box.value='';
      };
    });
  });
  document.addEventListener('click',e=>{
    if(!e.target.closest('#searchResults')&&!e.target.closest('#searchBox'))res.style.display='none';
  });
}

// ===== KEYBOARD =====
function initKeyboard(){
  document.addEventListener('keydown',e=>{
    if(e.ctrlKey&&e.key==='k'){e.preventDefault();$('#searchBox').focus();}
    if(e.ctrlKey&&e.key==='e'){e.preventDefault();toggleExpandAll();}
    if(e.ctrlKey&&e.key==='d'){e.preventDefault();$('#themeToggle').click();}
  });
}

// ===== EXPAND ALL =====
function toggleExpandAll(){
  allExpanded=!allExpanded;
  $$('.module').forEach(m=>m.classList.toggle('open',allExpanded));
  $$('.topic').forEach(t=>t.classList.toggle('open',allExpanded));
}

// ===== MODE TOGGLE =====
function initModeToggle(){
  const t=$('#modeToggle');
  t.onclick=()=>{
    techMode=!techMode;
    t.classList.toggle('on',techMode);
    $$('.beginner-text').forEach(el=>el.style.display=techMode?'none':'block');
    $$('.tech-text').forEach(el=>el.style.display=techMode?'block':'none');
  };
}

// ===== COPY BUTTONS =====
function initCopy(){
  document.addEventListener('click',e=>{
    if(e.target.classList.contains('copy-btn')){
      const code=e.target.closest('.code-block').querySelector('pre').textContent;
      navigator.clipboard.writeText(code).then(()=>{
        e.target.textContent='Copied!';
        setTimeout(()=>e.target.textContent='Copy',1500);
      });
    }
  });
}

// ===== FLASHCARD =====
function initFlashcards(){
  document.addEventListener('click',e=>{
    const f=e.target.closest('.flashcard');
    if(f)f.classList.toggle('revealed');
  });
}

// ===== QUIZ =====
function initQuiz(){
  document.addEventListener('click',e=>{
    const opt=e.target.closest('.quiz-opt');
    if(!opt)return;
    const quiz=opt.closest('.quiz');
    if(quiz.dataset.answered)return;
    quiz.dataset.answered='1';
    const correct=opt.dataset.correct==='1';
    opt.classList.add(correct?'correct':'wrong');
    if(!correct)quiz.querySelector('[data-correct="1"]').classList.add('correct');
    const explain=quiz.querySelector('.quiz-explain');
    if(explain)explain.style.display='block';
  });
}

// ===== DAILY CHECKLIST =====
function initChecklist(){
  const items=['Review yesterday\'s notes','Read one module section','Complete one practical lab','Practice 5 terminal commands','Watch one cybersecurity video','Solve one CTF challenge','Update learning journal','Review flashcards (10 min)'];
  const container=$('#dailyChecklist');
  const today=new Date().toDateString();
  let state=JSON.parse(localStorage.getItem('checklist')||'{}');
  if(state.date!==today){state={date:today,items:{}};localStorage.setItem('checklist',JSON.stringify(state));}
  container.innerHTML=items.map((it,i)=>
    `<label class="check-item ${state.items?.[i]?'done':''}"><input type="checkbox" ${state.items?.[i]?'checked':''} data-idx="${i}"> ${it}</label>`
  ).join('');
  container.addEventListener('change',e=>{
    const idx=e.target.dataset.idx;
    const s=JSON.parse(localStorage.getItem('checklist')||'{}');
    if(!s.items)s.items={};
    s.items[idx]=e.target.checked;
    localStorage.setItem('checklist',JSON.stringify(s));
    e.target.closest('.check-item').classList.toggle('done',e.target.checked);
    updateProgress();
  });
}

// ===== PROGRESS =====
function updateProgress(){
  const total=$$('.topic').length;
  const opened=$$('.topic[data-visited="1"]').length;
  const pct=total?Math.round(opened/total*100):0;
  const bar=$('#navProgressBar');
  if(bar)bar.style.width=pct+'%';
  $$('.nav-item[data-mod]').forEach(n=>{
    const modIdx=n.dataset.mod;
    const mod=$$('.module')[modIdx];
    if(!mod)return;
    const modTopics=mod.querySelectorAll('.topic').length;
    const modVisited=mod.querySelectorAll('.topic[data-visited="1"]').length;
    const prog=n.querySelector('.prog');
    if(prog)prog.textContent=modTopics?Math.round(modVisited/modTopics*100)+'%':'0%';
  });
}

// ===== RENDER MODULE =====
function renderModule(mod,idx){
  const topicsHtml=mod.topics.map((t,ti)=>{
    const sections=[];
    if(t.def)sections.push(`<h4>📖 Definition</h4><p>${t.def}</p>`);
    if(t.why)sections.push(`<h4>🎯 Why It Matters</h4><p>${t.why}</p>`);
    if(t.beginner)sections.push(`<h4>🌱 Beginner Explanation</h4><div class="beginner-text"><p>${t.beginner}</p></div>`);
    if(t.technical)sections.push(`<h4>⚙️ Technical Deep Dive</h4><div class="tech-text" style="display:none"><p>${t.technical}</p></div>`);
    if(t.example)sections.push(`<h4>🌍 Real-World Example</h4><p>${t.example}</p>`);
    if(t.commands)sections.push(`<h4>💻 Commands & Tools</h4>${t.commands}`);
    if(t.commands2)sections.push(t.commands2);
    if(t.lab)sections.push(`<h4>🔬 Practical Lab</h4>${t.lab}`);
    if(t.mistakes)sections.push(`<h4>⚠️ Common Mistakes</h4><ul>${t.mistakes.map(m=>`<li>${m}</li>`).join('')}</ul>`);
    if(t.interview)sections.push(`<h4>💼 Interview Q&A</h4>${t.interview.map(q=>fc(q.q,q.a)).join('')}`);
    if(t.summary)sections.push(`<h4>📝 Revision Summary</h4><p class="alert alert-info">${t.summary}</p>`);
    if(t.quiz)sections.push(t.quiz);
    return`<div class="topic" data-idx="${ti}"><div class="topic-title" onclick="this.parentElement.classList.toggle('open');this.closest('.topic').dataset.visited='1';updateProgress();"><span class="arrow">▶</span> ${t.title}</div><div class="topic-body">${sections.join('')}</div></div>`;
  }).join('');
  return`<div class="module" id="mod${idx}"><div class="module-header" onclick="this.parentElement.classList.toggle('open')"><div class="module-num">${String(idx+1).padStart(2,'0')}</div><div class="module-title">${mod.title}</div><div class="module-meta">${mod.topics.length} topics</div><div class="module-chevron">▾</div></div><div class="module-body"><div class="module-content">${topicsHtml}</div></div></div>`;
}

// ===== RENDER EXTRAS =====
function renderExtras(){
  const ex=EXTRAS;
  let html='';

  // ── Roadmap ──
  html+=`<div class="module" id="roadmap">
    <div class="module-header" onclick="this.parentElement.classList.toggle('open')">
      <div class="module-num">📅</div>
      <div class="module-title">${ex.roadmap.title}</div>
      <div class="module-meta">${ex.roadmap.phases.length} phases</div>
      <div class="module-chevron">▾</div>
    </div>
    <div class="module-body"><div class="module-content">`;
  ex.roadmap.phases.forEach(ph=>{
    html+=`<div class="topic"><div class="topic-title" onclick="this.parentElement.classList.toggle('open')"><span class="arrow">▶</span> ${ph.title}</div><div class="topic-body"><div class="timeline">`;
    ph.items.forEach(it=>{ html+=`<div class="tl-item"><p>${it}</p></div>`; });
    html+=`</div></div></div>`;
  });
  html+=`</div></div></div>`;

  // ── Lab Setup ──
  html+=`<div class="module" id="labsetup">
    <div class="module-header" onclick="this.parentElement.classList.toggle('open')">
      <div class="module-num">🔬</div>
      <div class="module-title">${ex.labSetup.title}</div>
      <div class="module-meta">${ex.labSetup.steps.length} steps</div>
      <div class="module-chevron">▾</div>
    </div>
    <div class="module-body"><div class="module-content">`;
  ex.labSetup.steps.forEach(s=>{
    html+=`<div class="topic"><div class="topic-title" onclick="this.parentElement.classList.toggle('open')"><span class="arrow">▶</span> ${s.title}</div><div class="topic-body">${s.content}</div></div>`;
  });
  html+=`</div></div></div>`;

  // ── Cheat Sheets ──
  html+=`<div class="module" id="cheatsheets">
    <div class="module-header" onclick="this.parentElement.classList.toggle('open')">
      <div class="module-num">📋</div>
      <div class="module-title">${ex.cheatSheets.title}</div>
      <div class="module-meta">${ex.cheatSheets.sheets.length} sheets</div>
      <div class="module-chevron">▾</div>
    </div>
    <div class="module-body"><div class="module-content">`;
  ex.cheatSheets.sheets.forEach(s=>{
    html+=`<div class="topic"><div class="topic-title" onclick="this.parentElement.classList.toggle('open')"><span class="arrow">▶</span> ${s.title}</div><div class="topic-body">${s.content}</div></div>`;
  });
  html+=`</div></div></div>`;

  // ── Interview Q&A ──
  html+=`<div class="module" id="interview">
    <div class="module-header" onclick="this.parentElement.classList.toggle('open')">
      <div class="module-num">🎤</div>
      <div class="module-title">${ex.interviewQA.title}</div>
      <div class="module-meta">${ex.interviewQA.categories.length} categories</div>
      <div class="module-chevron">▾</div>
    </div>
    <div class="module-body"><div class="module-content">`;
  ex.interviewQA.categories.forEach(cat=>{
    html+=`<div class="topic"><div class="topic-title" onclick="this.parentElement.classList.toggle('open')"><span class="arrow">▶</span> ${cat.title}</div><div class="topic-body">`;
    cat.qa.forEach(q=>{ html+=fc(q.q,q.a); });
    html+=`</div></div>`;
  });
  html+=`</div></div></div>`;

  // ── Free Resources ──
  html+=`<div class="module" id="resources">
    <div class="module-header" onclick="this.parentElement.classList.toggle('open')">
      <div class="module-num">📚</div>
      <div class="module-title">Free Learning Resources</div>
      <div class="module-meta">Curated platforms</div>
      <div class="module-chevron">▾</div>
    </div>
    <div class="module-body"><div class="module-content">
    <div class="topic"><div class="topic-title" onclick="this.parentElement.classList.toggle('open')"><span class="arrow">▶</span> Practice Platforms</div>
    <div class="topic-body">
    ${tbl([
      ['Platform','URL','Best For','Cost'],
      ['TryHackMe','tryhackme.com','Guided beginner→advanced rooms','Free tier (premium £10/mo)'],
      ['Hack The Box','hackthebox.com','CTF-style machine hacking','Free tier available'],
      ['PortSwigger Academy','portswigger.net/web-security','Web security labs (Burp)','FREE'],
      ['PentesterLab','pentesterlab.com','Web + code review','Free + Pro'],
      ['picoCTF','picoctf.org','CTF for beginners','FREE'],
      ['OWASP WebGoat','owasp.org/www-project-webgoat','Intentionally vulnerable app','FREE'],
      ['CyberDefenders','cyberdefenders.org','Blue team SOC challenges','FREE'],
      ['LetsDefend','letsdefend.io','SOC analyst training','Free + Pro'],
      ['Wazuh','wazuh.com','Free open-source SIEM','FREE']
    ])}
    </div></div>
    <div class="topic"><div class="topic-title" onclick="this.parentElement.classList.toggle('open')"><span class="arrow">▶</span> YouTube Channels</div>
    <div class="topic-body">
    ${cb('Top Cybersecurity YouTube Channels',`John Hammond       → CTF walkthroughs, malware analysis, hacking tutorials
NetworkChuck       → Networking + CEH + fun beginner content
LiveOverflow       → Deep technical binary exploitation
HackerSploit       → Metasploit, Kali, pentest tutorials
IppSec             → Hack The Box machine walkthroughs (MUST watch)
David Bombal       → Networking, Python for hackers, certs
TCM Security       → Ethical hacking courses (PNPT creator)
STOK               → Bug bounty hunting
The Cyber Mentor   → Practical ethical hacking (also PNPT)
Black Hills InfoSec → Advanced enterprise security concepts`)}
    </div></div>
    </div></div></div>`;

  return html;
}

// ===== BUILD NAV =====
function buildNav(modules){
  $('#navItems').innerHTML=modules.map((m,i)=>
    `<div class="nav-item" data-mod="${i}" onclick="scrollToEl('mod${i}')"><span class="num">${String(i+1).padStart(2,'0')}</span>${m.title}<span class="prog">0%</span></div>`
  ).join('');
}

function scrollToEl(id){
  const el=document.getElementById(id);
  if(el){
    const mod=el.closest('.module')||el;
    if(mod.classList&&mod.classList.contains('module')&&!mod.classList.contains('open'))mod.classList.add('open');
    el.scrollIntoView({behavior:'smooth',block:'start'});
    if(innerWidth<=900)$('#sidebar').classList.remove('open');
  }
}

// ===== INIT =====
function init(){
  initDotGrid();initScrollProgress();initTheme();initSidebar();
  initSearch();initKeyboard();initModeToggle();initCopy();
  initFlashcards();initQuiz();initChecklist();
  $('#expandAll').onclick=toggleExpandAll;
  $('#printBtn').onclick=()=>window.print();

  // All modules array
  const MODULES=[M1,M2,M3,M4,M5,M6,M7,M8,M9,M10,M11];

  // Update stats
  const totalTopics=MODULES.reduce((a,m)=>a+m.topics.length,0);
  $('#statModules').textContent=MODULES.length;
  $('#statTopics').textContent=totalTopics+'+';

  // Render modules
  $('#moduleContainer').innerHTML=MODULES.map((m,i)=>renderModule(m,i)).join('');
  buildNav(MODULES);

  // Render extras
  $('#extrasContainer').innerHTML=renderExtras();

  updateProgress();
}

document.addEventListener('DOMContentLoaded',init);
