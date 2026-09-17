/* MP5021 — render */
(function(){
"use strict";
const $ = s => document.querySelector(s);
const el = (t,c,h)=>{const e=document.createElement(t); if(c)e.className=c; if(h!=null)e.innerHTML=h; return e;};
const ICON = {
  ia:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 4.6L18.5 9l-4.6 1.4L12 15l-1.9-4.6L5.5 9l4.6-1.4z"/><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z"/></svg>',
  chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>',
  q:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="10"/></svg>',
  warn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>',
  fix:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>'
};
function codeBlock(c){
  const prompt = /prompt/i.test(c.who||"") ? " prompt":"";
  return `<div class="code${prompt}"><div class="bar"><span class="who">${c.who}</span><button class="copy" type="button">copiar</button></div><pre>${c.lines}</pre></div>`;
}
function list(arr){return `<ul>${arr.map(x=>`<li>${x}</li>`).join("")}</ul>`;}

/* ---------- HERO + progression ---------- */
function hero(){
  const s = el("header","hero");
  s.innerHTML = `
    <div class="eyebrow">MP5021 · Analista de incidentes · RA1–RA5</div>
    <h1>Laboratorio de Incidentes de Ciberseguridad</h1>
    <p class="sub">Entorno de prácticas, teoría por unidad y actividades del módulo. Cada actividad incluye su tarea de laboratorio y las pautas para trabajar con IA de forma segura. Curso de Especialización en Ciberseguridade — IES Chan do Monte (Marín), 2026/2027.</p>
    <div class="facts">
      <span class="fact"><b>140</b> horas</span><span class="fact"><b>168</b> sesiones</span>
      <span class="fact"><b>5</b> unidades</span><span class="fact"><b>26</b> actividades</span>
      <span class="fact">TecnoMariña S.L.</span>
    </div>
    <div class="setup-note">${ICON.info}<div><b>VirtualBox + Vagrant</b> · 16 GB RAM / SSD por puesto · red interna aislada <span class="mono ip">10.10.10.0/24</span>. Organización ficticia de referencia: <b>TecnoMariña S.L.</b>, 30 puestos que dan soporte a un ayuntamiento.</div></div>`;
  return s;
}

/* ---------- LABORATORIO ---------- */
function labSection(){
  const s = el("section"); s.id="lab";
  const diag = `<div class="diagram" role="img" aria-label="Topología: red interna 10.10.10.0/24 con SIEM Wazuh .10, servidor web víctima .30, Windows víctima .20 y Kali atacante .100">
  <svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono, monospace">
    <rect x="40" y="150" width="680" height="40" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="60" y="167" fill="var(--accent-ink)" font-size="12" font-weight="600">RED INTERNA VirtualBox · "labcyber-lan"</text>
    <text x="60" y="182" fill="var(--accent-ink)" font-size="11">10.10.10.0/24 · aislada, sin salida</text>
    <g stroke="var(--border-strong)" stroke-width="2"><line x1="150" y1="110" x2="150" y2="150"/><line x1="370" y1="110" x2="370" y2="150"/><line x1="590" y1="110" x2="590" y2="150"/><line x1="370" y1="190" x2="370" y2="230"/></g>
    <g><rect x="60" y="40" width="180" height="70" rx="10" fill="var(--surface-2)" stroke="var(--ud1)" stroke-width="1.6"/><text x="150" y="64" text-anchor="middle" fill="var(--ink)" font-size="13" font-weight="600">SIEM · Wazuh</text><text x="150" y="81" text-anchor="middle" fill="var(--muted)" font-size="10.5">Ubuntu 22.04 · Suricata</text><text x="150" y="98" text-anchor="middle" fill="var(--accent-ink)" font-size="11.5" font-weight="600">10.10.10.10</text></g>
    <g><rect x="280" y="40" width="180" height="70" rx="10" fill="var(--surface-2)" stroke="var(--ud2)" stroke-width="1.6"/><text x="370" y="64" text-anchor="middle" fill="var(--ink)" font-size="13" font-weight="600">SRV-WEB · víctima</text><text x="370" y="81" text-anchor="middle" fill="var(--muted)" font-size="10.5">LAMP · DVWA · Juice Shop</text><text x="370" y="98" text-anchor="middle" fill="var(--accent-ink)" font-size="11.5" font-weight="600">10.10.10.30</text></g>
    <g><rect x="500" y="40" width="180" height="70" rx="10" fill="var(--surface-2)" stroke="var(--ud5)" stroke-width="1.6"/><text x="590" y="64" text-anchor="middle" fill="var(--ink)" font-size="13" font-weight="600">WIN10 · víctima</text><text x="590" y="81" text-anchor="middle" fill="var(--muted)" font-size="10.5">Sysmon + agente</text><text x="590" y="98" text-anchor="middle" fill="var(--accent-ink)" font-size="11.5" font-weight="600">10.10.10.20</text></g>
    <g><rect x="280" y="230" width="180" height="70" rx="10" fill="var(--attack-soft)" stroke="var(--attack)" stroke-width="1.6"/><text x="370" y="254" text-anchor="middle" fill="var(--ink)" font-size="13" font-weight="600">KALI · atacante</text><text x="370" y="271" text-anchor="middle" fill="var(--muted)" font-size="10.5">analista forense</text><text x="370" y="288" text-anchor="middle" fill="var(--attack)" font-size="11.5" font-weight="600">10.10.10.100</text></g>
    <text x="700" y="324" text-anchor="end" fill="var(--faint)" font-size="10.5">Gestión host-only 192.168.56.0/24 → consolas web de SIEM y Kali</text>
  </svg></div>`;
  const rows = LAB.vms.map(v=>`<tr><td class="mono">${v.n}</td><td>${v.rol}</td><td>${v.so}</td><td class="num">${v.ram}</td><td class="mono ip">${v.ip}</td><td class="mono ip">${v.mgmt}</td></tr>`).join("");
  const prov = LAB.fuentes.map(f=>`<tr><td class="mono">${f[0]}</td><td>${f[1]}</td></tr>`).join("");
  s.innerHTML = `
    <div class="sec-head"><span class="tag" style="background:var(--accent)">LAB</span><h2>El laboratorio</h2></div>
    <p class="sec-meta">Entorno común sobre el que se resuelven las cinco unidades</p>
    <p class="lead">Todo el tráfico entre víctimas y atacante vive en una <b>red interna de VirtualBox</b> que no sale al exterior: se pueden lanzar ataques reales sin riesgo. Cada VM añade un adaptador NAT que se usa <em>solo</em> para instalar y actualizar. IPs privadas fijas y laboratorio reproducible con <span class="mono">vagrant up</span>.</p>
    ${diag}
    <h3>Direccionamiento (nivel base)</h3>
    <div class="tbl-wrap"><table><thead><tr><th>Máquina</th><th>Rol</th><th>SO</th><th>RAM (MB)</th><th>IP LAN</th><th>Gestión</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="note">${ICON.info}<div>El laboratorio completo suma ~14 GB. En 16 GB conviene <b>no arrancar las 4 a la vez</b>: para casi todo bastan <span class="mono">siem</span> + una víctima + <span class="mono">kali</span>. Con 32 GB se añade <b>pfSense</b> con DMZ <span class="mono ip">10.10.20.0/24</span> para segmentación real (UD4).</div></div>
    <h3>Aprovisionamiento de las máquinas</h3>
    <div class="tbl-wrap"><table><thead><tr><th>VM</th><th>Fuente de la imagen y dimensionamiento</th></tr></thead><tbody>${prov}</tbody></table></div>
`
    +`<div class="note">${ICON.info}<div>La instalación y configuración de las máquinas se explica paso a paso en el <a href="#vagrant"><b>Manual Vagrant</b></a>.</div></div>`
    ;
  return s;
}

/* ---------- MANUAL VAGRANT ---------- */
const esc = t => String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function rawCode(who, text, file){
  const dl = "";
  return `<div class="code"><div class="bar"><span class="who">${who}</span><span style="display:flex;gap:6px">${dl}<button class="copy" type="button">copiar</button></span></div><pre>${esc(text)}</pre></div>`;
}
function vagrantSection(){
  const s = el("section"); s.id="vagrant";
  const M = MANUAL;
  const vms = M.vms.map(v=>`<tr><td class="mono">${v[0]}</td><td>${v[1]}</td><td class="mono">${v[2]}</td><td class="mono ip">${v[3]}</td><td class="mono ip">${v[4]}</td><td class="num">${v[5]}</td></tr>`).join("");
  const cmds = M.cmds.map(c=>`<tr><td class="mono" style="white-space:nowrap">${esc(c[0])}</td><td>${c[1]}</td></tr>`).join("");
  const e2e = M.e2e.map(r=>`<tr><td class="num">${r[0]}</td><td class="mono">${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join("");
  const tr = M.trouble.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("");
  const inst = Object.fromEntries(M.install.map(i=>[i[0],i]));
  const ic = k => rawCode(inst[k][1], inst[k][2]);

  s.innerHTML = `
    <div class="sec-head"><span class="tag" style="background:var(--accent)">VAG</span><h2>Manual Vagrant: montar el laboratorio</h2></div>
    <p class="sec-meta">Instalación · Vagrantfile · configuración de las 4 VMs · verificación · problemas frecuentes</p>
    <p class="lead">Con un único <span class="mono">Vagrantfile</span> y cuatro scripts se levantan las 4 máquinas con <span class="mono">vagrant up</span>. Vagrant crea las VMs en VirtualBox, les asigna red y ejecuta la configuración, de modo que todos los puestos quedan idénticos y se reconstruyen en minutos.</p>
    <div class="note">${ICON.info}<div>Todos los ficheros del laboratorio aparecen completos más abajo, con botón <b>copiar</b>. Guárdalos en <span class="mono">labcyber/</span> con la estructura del apartado 4 (o descárgalos del repositorio <a href="https://github.com/mrnovoa123/CE_ICS_lab_config" target="_blank" rel="noopener"><b>CE_ICS_lab_config</b></a> en GitHub).</div></div>

    <h3>1. Qué vamos a montar</h3>
    <div class="tbl-wrap"><table><thead><tr><th>VM</th><th>Rol</th><th>Box</th><th>IP LAN</th><th>Gestión</th><th>RAM / CPU</th></tr></thead><tbody>${vms}</tbody></table></div>
    <p>Total: unos 11 GB de RAM. <span class="mono">win10</span> tiene <span class="mono">autostart: false</span> y solo se arranca en las actividades que la usan. Cada VM lleva tres tarjetas: <b>1) NAT</b> (SSH/WinRM de Vagrant y descargas), <b>2) red interna</b> <span class="mono">labcyber-lan</span> (ataques y detección) y <b>3) host-only</b> (panel de Wazuh desde el anfitrión). La tarjeta 2 de <span class="mono">siem</span> va en modo promiscuo para que Suricata vea toda la LAN.</p>

    <h3>2. Instalación en el equipo anfitrión</h3>
    <ol>
      <li><b>Activar la virtualización</b> en la BIOS/UEFI (Intel VT-x o AMD-V). Hacen falta unos 60 GB libres en el SSD.</li>
      <li><b>Instalar VirtualBox 7.x</b> desde <a href="https://www.virtualbox.org/wiki/Downloads" target="_blank" rel="noopener">virtualbox.org</a> con su <i>Extension Pack</i> de la misma versión.</li>
      <li><b>Instalar Vagrant</b> desde <a href="https://developer.hashicorp.com/vagrant/install" target="_blank" rel="noopener">developer.hashicorp.com/vagrant/install</a>.</li>
    </ol>
    ${ic("bash")}${ic("check")}
    <div class="note warn">${ICON.warn}<div><b>Anfitriones Windows:</b> con Hyper-V, WSL2 o «Plataforma de máquina virtual» activos, VirtualBox va muy lento o no arranca VMs de 64 bits.</div></div>
    ${ic("hyperv")}
    <p>Descarga las boxes la tarde anterior (la de Windows supera los 10 GB):</p>
    ${ic("boxes")}

    <h3>3. Vagrant en 10 minutos</h3>
    <ul>
      <li><b>Box</b>: imagen base de un sistema operativo (p. ej. <span class="mono">bento/ubuntu-22.04</span>). Se descarga una vez y se reutiliza.</li>
      <li><b>Vagrantfile</b>: fichero Ruby que dice qué box usa cada VM, cuánta RAM, qué redes y qué scripts ejecutar.</li>
      <li><b>Provisionamiento</b>: scripts (shell o PowerShell) que Vagrant ejecuta dentro de la VM la primera vez que la crea.</li>
    </ul>
    ${rawCode("primer ejemplo", M.first)}
    <p>La carpeta del proyecto se monta dentro de la VM en <span class="mono">/vagrant</span>. En un proyecto con varias VMs, los comandos aceptan el nombre de la máquina; sin nombre, actúan sobre todas.</p>
    <div class="tbl-wrap"><table><thead><tr><th>Comando</th><th>Qué hace</th></tr></thead><tbody>${cmds}</tbody></table></div>

    <h3>4. El Vagrantfile del laboratorio</h3>
    ${rawCode("estructura de la carpeta", M.tree)}
    <div class="note">${ICON.info}<div>Las versiones de Wazuh se fijan al principio del fichero (<span class="mono">WAZUH_BRANCH</span>, <span class="mono">WAZUH_AGENT_VER</span>). El agente nunca puede ser más nuevo que el manager. Revisa la <a href="https://documentation.wazuh.com/current/quickstart.html" target="_blank" rel="noopener">guía rápida de Wazuh</a> antes de preparar los puestos.</div></div>
    ${rawCode("labcyber/Vagrantfile", M.files["Vagrantfile"], "Vagrantfile")}
    <ul>
      <li><b>Orden de definición = orden de arranque:</b> <span class="mono">siem</span> primero, porque los agentes necesitan el manager para registrarse.</li>
      <li><b>Los scripts detectan la interfaz por su IP</b> en lugar de dar por hecho <span class="mono">enp0s8</span>. Para las reglas nftables de la UD4, comprueba el nombre real con <span class="mono">ip -br a</span>.</li>
      <li>Los <span class="mono">.sh</span> deben tener finales de línea <b>LF</b>; si se editan en Windows, fallan con <span class="mono">\\r: command not found</span>.</li>
    </ul>

    <h3>5. Configuración de cada máquina</h3>
    <p class="lead">Cada tarjeta contiene el script completo, los pasos y la comprobación manual.</p>
    <div class="acts" id="vagActs"></div>

    <h3>6. Puesta en marcha y verificación</h3>
    <p>La primera creación completa lleva 60–90 minutos por puesto: hazla antes de la primera sesión y guarda snapshots. Después, arrancar cuesta 2–3 minutos.</p>
    ${rawCode("primera vez", M.start)}
    <h4>Prueba de extremo a extremo</h4>
    <div class="tbl-wrap"><table><thead><tr><th>#</th><th>Desde</th><th>Acción</th><th>Resultado esperado</th></tr></thead><tbody>${e2e}</tbody></table></div>
    <h4>Snapshots</h4>
    <p>Tras una práctica que «rompe» una máquina (malware, nftables, active-response) se restaura en segundos sin reprovisionar.</p>
    ${rawCode("instantáneas", M.snap)}
    <h4>Rutina de cada sesión</h4>
    <ol><li><span class="mono">cd labcyber &amp;&amp; vagrant up</span> (arranca siem, srvweb y kali).</li><li>Esperar 2–3 minutos a que responda <span class="mono ip">https://192.168.56.10</span>.</li><li>Hacer la actividad.</li><li><span class="mono">vagrant halt</span> y restaurar <span class="mono">base-limpia</span> donde haga falta.</li></ol>
    <h4>Aislamiento adicional (opcional)</h4>
    <p>La tarjeta NAT da salida a Internet. Para malware real, desconéctala tras el provisionamiento; <span class="mono">vagrant ssh</span> deja de funcionar, pero queda la ventana de la VM o <span class="mono">ssh vagrant@192.168.56.30</span>.</p>
    ${rawCode("VBoxManage", M.iso)}

    <h3>7. Problemas frecuentes</h3>
    <div class="tbl-wrap"><table><thead><tr><th>Síntoma</th><th>Causa probable</th><th>Solución</th></tr></thead><tbody>${tr}</tbody></table></div>`;
  const wrap = s.querySelector("#vagActs");
  M.per.forEach(p=>{
    const d = el("details","act"); d.style.setProperty("--udc","var(--accent)");
    d.innerHTML = `<summary><span class="anum">${p.n}</span><span class="stit"><span class="t">${p.t}</span><span class="ca">${p.ca}</span></span><span class="chev">${ICON.chev}</span></summary>
      <div class="body">
        <span class="lbl">Script de configuración</span>${rawCode("provision/"+p.file, M.files[p.file], p.file)}
        <span class="lbl">Paso a paso</span><ol>${p.steps.map(x=>`<li>${x}</li>`).join("")}</ol>
        ${rawCode("comprobación", p.check)}
        <div class="note">${ICON.info}<div>${p.note}</div></div>
      </div>`;
    wrap.appendChild(d);
  });
  return s;
}

/* ---------- MARCO IA ---------- */
function iaSection(){
  const s = el("section"); s.id="ia"; s.setAttribute("data-ia","1");
  const flow = UNITS.map(u=>{
    const verbo = {ud1:["Produce","y el alumnado verifica"],ud2:["Propone","y el alumnado decide"],ud3:["Pregunta","y el alumnado investiga"],ud4:["Despeja","el papel en blanco, y el alumnado aterriza"],ud5:["Traduce","y el alumnado responde"]}[u.id];
    return `<div class="st" style="--udc:${u.color}"><div class="u">${u.tag}</div><div class="v">${verbo[0]}</div><div class="d">${verbo[1]}</div></div>`;
  }).join("");
  s.innerHTML = `
    <div class="sec-head"><span class="tag" style="background:var(--ia)">IA</span><h2>Trabajar con IA en el módulo</h2></div>
    <p class="sec-meta">Reglas comunes · una sesión antes de la UD1</p>
    <p class="lead">La IA cambia de papel en cada unidad. No es la misma herramienta cinco veces, sino una progresión desde la producción asistida hasta la respuesta autónoma bajo presión. El criterio de evaluación no es <em>haber usado IA</em> sino <em>saber dónde falla</em>.</p>
    <div class="flow">${flow}</div>
    <h3>Semáforo de datos</h3>
    <p class="lead">Regla única que el alumnado debe poder recitar. En la UD3 deja de ser hipótesis: allí se manejan volcados de memoria y muestras.</p>
    <div class="sem">
      <div class="v"><div class="l">Verde · público o inventado</div><p>Conceptos, casos de prensa, todo lo de TecnoMariña S.L. → IA en la nube (Claude, ChatGPT, Gemini, Copilot) sin restricción.</p></div>
      <div class="a"><div class="l">Ámbar · laboratorio anonimizado</div><p>Logs y configuraciones con IP privadas y usuarios ficticios → IA en la nube, solo fragmentos, nunca ficheros completos.</p></div>
      <div class="r"><div class="l">Rojo · evidencia, malware, datos personales</div><p>Todo lo que tenga cadena de custodia → solo IA local (Ollama / LM Studio, modelo de 3B) o ninguna IA.</p></div>
    </div>
    <h3>Herramientas</h3>
    <div class="chips"><span class="chip">Claude / ChatGPT / Gemini</span><span class="chip">Ollama (local)</span><span class="chip">LM Studio</span><span class="chip">NotebookLM</span><span class="chip">Mermaid</span><span class="chip">Canva</span><span class="chip">Whisper</span><span class="chip">MITRE ATT&amp;CK Navigator</span><span class="chip">Sigma</span><span class="chip">CyberChef</span></div>
    <div class="note">${ICON.info}<div>La IA local es obligatoria desde la UD3. Con <b>16 GB y las VM levantadas, lo realista es un modelo de 3B</b> (<span class="mono">ollama run llama3.2:3b</span>); el de 7–8B solo en el equipo del docente o con el laboratorio apagado.</div></div>
    <h3>Bitácora de prompts</h3>
    <p class="lead">Anexo de una página en todo trabajo hecho con IA. Encaja en la lista de cotejo y en la tabla de observación previstas en la programación. El criterio no es «ha usado IA» sino <b>«sabe dónde falla la IA»</b>.</p>
    <div class="dlrow"><button class="dlbtn" id="dlBita" type="button">${ICON.dl} Descargar plantilla (.txt)</button></div>
    <div class="code"><div class="bar"><span class="who">anexo · bitácora de prompts</span><button class="copy" type="button">copiar</button></div><pre id="bitaPre"></pre></div>`;
  return s;
}

/* ---------- UNITS ---------- */
function activityCard(a, color){
  const d = el("details","act"); d.style.setProperty("--udc",color);
  let ia = "";
  if(a.ia){
    ia += `<div class="ia"><div class="iah">${ICON.ia}Capa IA</div>`;
    ia += `<span class="lbl" style="color:var(--ia)">Ruta de trabajo</span>${list(a.ia.ruta)}`;
    (a.ia.prompts||[]).forEach(p=> ia += codeBlock(p));
    if(a.ia.ctrl) ia += `<div class="line ctrl"><b>Norma ·</b> ${a.ia.ctrl}</div>`;
    if(a.ia.labId && typeof LAB_TASKS!=="undefined" && LAB_TASKS[a.ia.labId]){
      const L = LAB_TASKS[a.ia.labId];
      ia += `<div class="labia"><div class="lh">Laboratorio integrado</div><h4 style="margin-top:6px">${L.t}</h4><p>${L.escenario}</p><div class="lh">Elementos necesarios</div>${list(L.elementos)}<div class="lh">${L.fases?"Fases de la tarea":"Resolución paso a paso"}</div><ol>${(L.fases||L.pasos).map(x=>`<li>${x}</li>`).join("")}</ol><div class="deliver"><b>Entregable ·</b> ${L.entregable}</div></div>`;
    }
    ia += `</div>`;
  }
  let fixes = "";
  let q = "";
  let note = a.note ? `<div class="note">${ICON.info}<div>${a.note}</div></div>` : "";
  d.innerHTML = `
    <summary><span class="anum">${a.n}</span><span class="stit"><span class="t">${a.t}</span><span class="ca">${a.ca}</span></span><span class="chev">${ICON.chev}</span></summary>
    <div class="body">
      <p>${a.obj}</p>
      <span class="lbl">Entorno y herramientas</span><div class="chips">${a.tools.map(t=>`<span class="chip">${t}</span>`).join("")}</div>
      <span class="lbl">Tarea de aula (sin IA)</span>${list(a.steps)}
      ${a.code?codeBlock(a.code):""}
      ${fixes}
      <div class="deliver"><b>Entregable ·</b> ${a.deliver}</div>
      <p class="amp"><b>Ampliación ·</b> ${a.amp}</p>
      ${a.extra||""}
      ${q}${note}${ia}
    </div>`;
  return d;
}
function unitSection(u){
  const s = el("section"); s.id=u.id; s.style.setProperty("--udc",u.color);
  let av = u.aviso ? `<div class="note ${u.aviso.tipo==='roja'?'warn':''}">${ICON.warn}<div>${u.aviso.html}</div></div>` : "";
  let teoria = "";
  if(u.teoria){
    teoria = `<span class="lbl">Teoría de la unidad</span>` + u.teoria.map(t=>`<h4>${t.h}</h4>${t.html}`).join("");
  }
  s.innerHTML = `
    <div class="sec-head"><span class="tag" style="background:${u.color}">${u.tag}</span><h2>${u.title}</h2></div>
    <p class="sec-meta">${u.dur} · ${u.peso} · ${u.ra} · Instrumentos ${u.inst}</p>
    <p class="lead">${u.intro}</p>
    ${av}${teoria}
    <span class="lbl" style="margin-top:26px">Actividades (${u.acts.length})</span>
    <div class="acts"></div>`;
  const wrap = s.querySelector(".acts");
  u.acts.forEach(a=> wrap.appendChild(activityCard(a,u.color)));
  return s;
}

/* ---------- CIERRE ---------- */
function evalSection(){
  const s = el("section"); s.id="eval";
  const tiles = UNITS.map(u=>`<div class="tile" style="--udc:${u.color}"><div class="k">${u.tag} · ${u.ra}</div><div class="b">${u.peso.replace(' %','%')}</div><div class="d">${u.inst}</div></div>`).join("");
  s.innerHTML = `
    <div class="sec-head"><span class="tag" style="background:var(--accent)">EVAL</span><h2>Evaluación</h2></div>
    <p class="sec-meta">Ponderación por unidad e instrumentos</p>
    <div class="tiles">${tiles}</div>
    <p class="lead">Instrumentos: <b>Lista de Cotejo (LC)</b> para la calidad del producto técnico y <b>Tabla de Observación (TO)</b> para el proceso y la destreza en las VM. La nota de cada evaluación es la media ponderada de las UD (70 %) más el trabajo diario en clase (30 %); cada UD exige un mínimo de 5. La <b>bitácora de prompts</b> es anexo obligatorio de todo trabajo con IA y se integra en ambos instrumentos.</p>`;
  return s;
}
function footer(){
  const f = el("footer");
  f.innerHTML = `
    <p>Material del módulo <b>MP5021 · Incidentes de Ciberseguridade</b> · Curso de Especialización en Ciberseguridade en Contornos das TI · IES Chan do Monte (Marín), 2026/2027.</p>
    <p class="legal">Todas las herramientas ofensivas se usan <b>exclusivamente dentro de la red aislada del laboratorio</b> y sobre activos ficticios. OSINT y phishing solo contra objetivos de prueba propios, nunca contra terceros reales.</p>`;
  return f;
}

/* ---------- NAV ---------- */
function buildNav(){
  let h = `<li class="grp">Entorno</li>
    <li><a href="#lab" class="udh" style="--udc:var(--accent)"><span class="n">LAB</span>El laboratorio</a></li>
    <li><a href="#vagrant" class="udh" style="--udc:var(--accent)"><span class="n">VAG</span>Manual Vagrant</a></li>
    <li data-ia="1"><a href="#ia" class="udh" style="--udc:var(--ia)"><span class="n">IA</span>Trabajar con IA</a></li>
    <li class="grp">Unidades</li>`;
  UNITS.forEach(u=>{
    h += `<li><a href="#${u.id}" class="udh" style="--udc:${u.color}"><span class="n">${u.tag}</span>${u.title}</a></li>`;
  });
  h += `<li class="grp">Cierre</li>`
    + `<li><a href="#eval" class="udh" style="--udc:var(--accent)"><span class="n">EVAL</span>Evaluación</a></li>`;
  $("#navList").innerHTML = h;
}

/* ---------- MOUNT ---------- */
const main = $("#main");
main.appendChild(hero());
main.appendChild(labSection());
main.appendChild(vagrantSection());
main.appendChild(iaSection());
UNITS.forEach(u=> main.appendChild(unitSection(u)));
main.appendChild(evalSection());
main.appendChild(footer());
buildNav();
$("#bitaPre").textContent = BITACORA;

/* ---------- INTERACCIONES ---------- */
// copy
document.addEventListener("click", e=>{
  const b = e.target.closest(".copy"); if(!b) return;
  const pre = b.closest(".code").querySelector("pre");
  const txt = pre.innerText;
  (navigator.clipboard? navigator.clipboard.writeText(txt): Promise.reject()).then(()=>{
    const o=b.textContent; b.textContent="copiado ✓"; b.classList.add("ok");
    setTimeout(()=>{b.textContent=o;b.classList.remove("ok");},1400);
  }).catch(()=>{});
});
// bitácora download
(function(){
  const btn = $("#dlBita"); if(!btn) return;
  btn.addEventListener("click", ()=>{
    try{
      const blob = new Blob([BITACORA], {type:"text/plain;charset=utf-8"});
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "MP5021_bitacora_prompts.txt";
      document.body.appendChild(a); a.click();
      setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();}, 500);
    }catch(err){ /* sandbox puede bloquear la descarga; el texto está visible y copiable abajo */ }
  });
})();
// theme
(function(){
  const root=document.documentElement, tb=$("#themeBtn");
  tb.addEventListener("click", ()=>{
    const cur=root.getAttribute("data-theme");
    const dark = cur? cur==="dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("data-theme", dark?"light":"dark");
    try{localStorage.setItem("mp5021-theme", dark?"light":"dark");}catch(e){}
  });
  try{const t=localStorage.getItem("mp5021-theme"); if(t) root.setAttribute("data-theme",t);}catch(e){}
})();
// IA switch
(function(){
  const sw=$("#iaSwitch");
  function apply(on){ document.body.classList.toggle("no-ia", !on); sw.setAttribute("aria-pressed", on?"true":"false"); sw.querySelector("span:last-child").textContent = on?"Capa IA visible":"Capa IA oculta"; }
  let on=true; try{on = localStorage.getItem("mp5021-ia")!=="0";}catch(e){}
  apply(on);
  sw.addEventListener("click", ()=>{ on=!on; apply(on); try{localStorage.setItem("mp5021-ia", on?"1":"0");}catch(e){} });
})();
// mobile nav
(function(){
  const side=$("#side"), nt=$("#navToggle");
  if(nt) nt.addEventListener("click", ()=> side.classList.toggle("open"));
  $("#navList").addEventListener("click", e=>{ if(e.target.closest("a")) side.classList.remove("open"); });
})();
})();
