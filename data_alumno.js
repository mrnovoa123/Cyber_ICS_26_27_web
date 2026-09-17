/* MP5021 — datos (alumnado) */
const LAB = {
 "vms": [
  {
   "n": "siem",
   "rol": "SIEM/XDR (Wazuh) + NIDS (Suricata) + TheHive + MailHog",
   "so": "Ubuntu Server 22.04",
   "ram": "4096–6144",
   "ip": "10.10.10.10",
   "mgmt": "192.168.56.10"
  },
  {
   "n": "win10",
   "rol": "Víctima — puesto de usuario (Sysmon + agente)",
   "so": "Windows 10/11 Enterprise Eval",
   "ram": "3072–4096",
   "ip": "10.10.10.20",
   "mgmt": "—"
  },
  {
   "n": "srvweb",
   "rol": "Víctima — servidor web LAMP (portal del concello)",
   "so": "Ubuntu Server 22.04",
   "ram": "1536–2048",
   "ip": "10.10.10.30",
   "mgmt": "—"
  },
  {
   "n": "kali",
   "rol": "Atacante / estación forense",
   "so": "Kali Linux 2025.x",
   "ram": "3072–4096",
   "ip": "10.10.10.100",
   "mgmt": "192.168.56.100"
  }
 ],
 "fuentes": [
  [
   "siem",
   "OVA Wazuh All-in-One (documentation.wazuh.com) o box <span class='mono'>bento/ubuntu-22.04</span>"
  ],
  [
   "win10",
   "Windows 10/11 Enterprise Evaluation (Microsoft Developer / Eval Center); se instala Sysmon + agente Wazuh"
  ],
  [
   "srvweb",
   "Ubuntu Server 22.04 o Debian 13 minimal; Apache2 + PHP + DVWA/Juice Shop"
  ],
  [
   "kali",
   "Imagen oficial Kali Linux para VirtualBox (kali.org/get-kali)"
  ]
 ]
};
const BITACORA = "================================================================================\nANEXO · BITÁCORA DE PROMPTS Y CONTROL DE INTELIGENCIA ARTIFICIAL (MP5021)\n================================================================================\nAlumno/grupo: ______________________________________________________________\nUnidad didáctica / actividad: _______________________________________________\nFecha de ejecución: ________________________\n\n1. HERRAMIENTA Y MODELO\n   [ ] ChatGPT   [ ] Claude   [ ] Gemini   [ ] Ollama (local)\n   Modelo exacto / versión: _________________________________________________\n\n2. NIVEL DEL SEMÁFORO DE DATOS\n   [ ] VERDE  (público / simulado)\n   [ ] ÁMBAR  (logs anonimizados del laboratorio)\n   [ ] ROJO   (evidencia sensible — solo IA local o ninguna IA)\n\n3. OBJETIVO DEL PROMPT\n   _________________________________________________________________________\n\n4. PROMPT LITERAL INTRODUCIDO (o el último de la cadena)\n   _________________________________________________________________________\n   _________________________________________________________________________\n\n5. RESPUESTA DE LA IA (resumen en 3 líneas)\n   _________________________________________________________________________\n\n6. VERIFICACIÓN CONTRA FUENTE PRIMARIA\n   Fuente (BOE, guía CCN-STIC, RFC, manual oficial): _______________________\n   Resultado:  [ ] Confirmado   [ ] Matizado   [ ] Descartado\n\n7. CORRECCIONES APLICADAS (¿dónde falló o alucinó la IA y por qué?)\n   _________________________________________________________________________\n   _________________________________________________________________________\n================================================================================";
const UNITS = [
 {
  "id": "ud1",
  "tag": "UD1",
  "color": "var(--ud1)",
  "ra": "RA1",
  "title": "Planes de prevención y concienciación",
  "dur": "36 sesiones",
  "peso": "20 %",
  "inst": "LC 60 / TO 40",
  "intro": "Unidad organizativa y documental sobre TecnoMariña S.L.: principios de la ciberseguridad, normativa del puesto de trabajo, plan de concienciación, materiales y auditoría interna. Se monta el laboratorio como si fuese la empresa y se introduce el SIEM al final, en la auditoría.",
  "teoria": [
   {
    "h": "Principios generales: la tríada CIA",
    "html": "<p>Un <b>incidente</b> es cualquier suceso que afecta a la <b>confidencialidad, integridad o disponibilidad</b> (CIA) de los activos de información. A la tríada se añaden la <b>autenticación</b>, el <b>no repudio</b> y el enfoque <b>Zero Trust</b>. Conviene distinguir <b>amenaza</b> (potencial), <b>vulnerabilidad</b> (debilidad explotable) e <b>incidente</b> (materialización), y encadenar <em>activo → amenaza → vulnerabilidad → impacto</em>.</p><p>Marco de referencia español: organismos <b>INCIBE</b> (ciudadanía y sector privado), <b>CCN-CERT</b> (sector público), <b>OSI</b>, <b>AEPD</b> y <b>CSIRT.es</b>. El material se ancla al <b>ENS (RD 311/2022)</b> y a <b>ISO/IEC 27002</b> / <b>CIS Controls v8</b>.</p>"
   },
   {
    "h": "Tipos de incidente e ingeniería social",
    "html": "<p>Panorama de amenazas: ciberterrorismo, hacktivismo, ciberespionaje y <b>APT</b>, desinformación, brechas y fugas de datos, y <b>malware</b> (virus, gusano, troyano —backdoor, keylogger, stealer—, spyware, adware, <b>ransomware</b> / RaaS).</p><p>La <b>ingeniería social</b> es transversal: el usuario es el «eslabón débil». Vectores: <b>phishing</b> (spray-and-pray y spear-phishing), smishing, vishing, spoofing (IP/ARP/DNS/web/mail), pretexting, baiting, shoulder surfing, dumpster diving, tailgating y <b>fraude del CEO (BEC)</b>. La única defensa efectiva es la <b>concienciación</b>.</p>"
   },
   {
    "h": "Normativa de protección del puesto",
    "html": "<p>Bloques que debe cubrir una política de puesto: actualización de software, dispositivos extraíbles y USB, almacenamiento (nube / red corporativa), antivirus/antimalware, aplicaciones permitidas, <b>borrado seguro</b>, clasificación de la información, <b>contraseñas</b> (robustas, distintas por servicio, gestor, doble factor para servicios críticos), control de acceso, copias de seguridad, correo, BYOD, técnicas criptográficas, wifi/redes externas, gestión de <b>logs</b> y una cláusula explícita de <b>uso de IA generativa</b>.</p>"
   },
   {
    "h": "Plan de concienciación y auditoría",
    "html": "<p>El plan de formación se documenta, se difunde y se evalúa por perfiles (dirección, técnicos, administración), con <b>materiales</b> (pósters, trípticos, píldoras, juegos, simulacros de phishing) e <b>indicadores (KPIs)</b>. La <b>auditoría interna</b> comprueba el cumplimiento con listas de control (CIS/ENS), en dos niveles (básico/avanzado) y tres alcances (procesos, tecnología, personas); se cierra el ciclo PDCA volviendo a medir tras aplicar mejoras.</p>"
   }
  ],
  "acts": [
   {
    "n": "1.1",
    "t": "Ciberseguridade: máis alá das pantallas",
    "ca": "CA1.1 · Principios generales (6 h)",
    "obj": "Comprender la tríada CIA e identificar riesgos en entornos reales a partir de casos y debate guiado.",
    "tools": [
     "draw.io",
     "INCIBE",
     "CCN-CERT",
     "ENISA"
    ],
    "steps": [
     "Debate sobre tres incidentes reales, clasificados según qué pilar CIA rompen.",
     "Mapa conceptual activo → amenaza → vulnerabilidad → impacto.",
     "Resumen escrito con los principios integrados y mapeo de los activos del laboratorio a controles del ENS / CIS v8."
    ],
    "deliver": "Resumen + mapa conceptual (PNG/PDF).",
    "amp": "Introducir AAA y defensa en profundidad; relacionar cada activo del laboratorio con su control.",
    "ia": {
     "ruta": [
      "Pedir a la IA <b>tres casos reales</b> de ciberataque a administraciones públicas españolas/gallegas (2021–2025) con fuente.",
      "<b>Verificación obligatoria</b>: cada caso se busca en prensa o INCIBE/CCN-CERT. El que no se pueda verificar se <b>tacha del mural pero se conserva tachado</b>, con el motivo.",
      "La IA hace de abogado del diablo («invertir en seguridad no compensa en una PYME») y el grupo la rebate con los casos que sobrevivieron."
     ],
     "prompts": [
      {
       "who": "prompt · casos reales verificables",
       "lines": "Actúa como analista de ciberseguridad. Dame 3 incidentes reales ocurridos en\nadministraciones públicas españolas o gallegas entre 2021 y 2025. Para cada uno:\n- qué pasó (4 líneas)\n- qué servicio dejó de prestarse y a quién afectó\n- qué principio de seguridad falló (confidencialidad / integridad / disponibilidad)\n- qué fuente lo publicó\nNo inventes casos. Si no estás seguro de alguno, dilo y ofréceme menos de 3."
      }
     ],
     "ctrl": "Ningún caso entra en el mural sin fuente primaria localizada. Tres salidas y ninguna más: confirmado, matizado o descartado."
    }
   },
   {
    "n": "1.2",
    "t": "Blindando o posto de traballo",
    "ca": "CA1.2 · Normativa del puesto (8 h)",
    "obj": "Redactar una normativa aplicable del puesto y experimentar de forma segura por qué existe: diseño de red con cortafuegos, endurecimiento del puesto y phishing controlado.",
    "tools": [
     "nftables",
     "secpol.msc",
     "BitLocker",
     "KeePassXC",
     "GoPhish",
     "MailHog"
    ],
    "steps": [
     "<b>Diseño de red con cortafuegos</b> (tareas 1.1–1.4 del aula): a partir de las políticas de TecnoMariña, diseñar el esquema de red (comercial, RRHH, IT, DMZ) y escribir el <em>ruleset</em>.",
     "Implementarlo en <b>nftables</b> sobre Debian, añadir registros (<code>log</code>) y securizar con un segundo cortafuegos (DMZ + interno).",
     "Endurecer el puesto Windows: política de contraseñas, bloqueo, cifrado, gestor y bloqueo de USB por directiva.",
     "Simulación de phishing <b>local</b> con GoPhish contra un buzón ficticio (MailHog), sin destinatarios reales.",
     "Redactar el decálogo de buenas prácticas del puesto."
    ],
    "deliver": "Ficheros <span class='mono'>.conf</span> de los cortafuegos + decálogo del puesto + informe de la simulación de phishing.",
    "amp": "Añadir MFA con app TOTP; demostrar el bloqueo de USB por directiva.",
    "ia": {
     "ruta": [
      "Generar con la IA un <b>borrador</b> de normativa del puesto para TecnoMariña que incluya, entre sus cláusulas, el <b>uso de IA generativa</b>.",
      "<b>Auditar</b> cada cláusula contra un control real del ENS (RD 311/2022) o ISO/IEC 27002; localizar cada cita legal y contrastarla en el BOE.",
      "Entregar la normativa final + tabla de trazabilidad cláusula ↔ control ↔ autoría (IA / persona)."
     ],
     "prompts": [
      {
       "who": "prompt · normativa del puesto",
       "lines": "Redacta una normativa de protección del puesto de trabajo para TecnoMariña S.L.,\nempresa de 30 personas que presta servicios informáticos a un ayuntamiento.\nEstructura: ámbito, uso de equipos, contraseñas y MFA, correo y navegación,\ndispositivos extraíbles, teletrabajo, mesa limpia, uso de IA generativa,\nincumplimientos. Máximo 2 páginas. Lenguaje claro, sin jerga jurídica.\nCita el artículo o medida del ENS (RD 311/2022) que respalda cada apartado."
      }
     ],
     "ctrl": "La columna «control» solo se rellena con el identificador comprobado en la fuente (p. ej. medidas [op.acc] del ENS). Si no aparece, la cláusula se reescribe.",
     "labId": 1
    }
   },
   {
    "n": "1.3",
    "t": "Facendo escola en ciberseguridade",
    "ca": "CA1.3 · Plan de concienciación (10 h)",
    "obj": "Diseñar un plan de formación completo dirigido a otros perfiles: objetivos, público, acciones, calendario e indicadores.",
    "tools": [
     "Impress / Canva",
     "Trello / Planner",
     "Aula Virtual (Moodle)"
    ],
    "steps": [
     "Análisis de riesgos frecuentes (phishing, contraseñas, shadow IT).",
     "Objetivos SMART y públicos diferenciados; en el aula, plan de formación por parejas para el propio instituto (ESO, ciclos, profesorado, PAS).",
     "Plan con acciones, canales, periodicidad y KPIs; presentación a la clase."
    ],
    "deliver": "Plan formativo + presentación (tarea 1.5 del aula, por parejas).",
    "amp": "Usar los resultados de la campaña GoPhish de 1.2 como línea base del KPI de phishing.",
    "ia": {
     "ruta": [
      "Usar la IA como <b>público simulado</b>, no como redactora: interpreta a tres perfiles reales de plantilla y reacciona al plan sin ser amable.",
      "Reescribir el plan después de cada reacción.",
      "Los KPI salen de la campaña GoPhish de 1.2, no de la IA."
     ],
     "prompts": [
      {
       "who": "prompt · público simulado",
       "lines": "Vas a interpretar a Marisa, 54 años, administrativa en TecnoMariña, 20 años en\nla empresa, poca confianza con la tecnología, mucha carga de trabajo y ninguna\npaciencia con las charlas de informática. Te voy a presentar un plan de\nconcienciación. Reacciona como reaccionaría ella: qué te aburre, qué no\nentiendes, qué te parece una pérdida de tiempo. Sé realista, no amable."
      }
     ],
     "ctrl": "Cada grupo recibe una restricción distinta (personal a turnos, teletrabajo, personal sin correo corporativo). La IA no puede uniformizar lo que parte de premisas distintas."
    }
   },
   {
    "n": "1.4",
    "t": "Mensaxes que protexen",
    "ca": "CA1.4 · Materiales de concienciación (6 h)",
    "obj": "Producir materiales de concienciación atractivos y correctos (infografías, vídeo corto, cartelería).",
    "tools": [
     "Canva",
     "GIMP",
     "Inkscape",
     "Shotcut"
    ],
    "steps": [
     "Elegir tres mensajes clave del decálogo.",
     "Crear infografía, vídeo (60–90 s) y cartel A3 (tarea 1.6: pósters, un póster por página).",
     "Empaquetar como campaña con hilo visual común."
    ],
    "deliver": "Kit de campaña (infografía + vídeo + cartel A3).",
    "amp": "Guion basado en un caso real; QR que enlace al material del Aula Virtual.",
    "ia": {
     "ruta": [
      "Generar variantes de mensaje y piezas visuales a partir de los tres mensajes del decálogo.",
      "Declarar en cada pieza si la imagen está generada por IA.",
      "Revisión cruzada por otro grupo antes de publicar: contraste, texto alternativo, lenguaje claro."
     ],
     "ctrl": "Ninguna pieza sale sin el visto bueno del grupo revisor, que busca explícitamente marcas reconocibles y problemas de accesibilidad."
    }
   },
   {
    "n": "1.5",
    "t": "Detectives da seguridade",
    "ca": "CA1.5 · Auditoría interna (6 h)",
    "obj": "Verificar el cumplimiento del plan mediante una auditoría estructurada, con checklist y propuestas de mejora.",
    "tools": [
     "Wazuh SCA",
     "CIS Controls v8 / ENS",
     "CIS-CAT Lite",
     "OpenVAS (opc.)"
    ],
    "steps": [
     "Construir el checklist a partir de CIS Controls / ENS.",
     "Auditoría manual sobre win10 y srvweb.",
     "Auditoría automática con el módulo <b>SCA de Wazuh</b> (% de cumplimiento CIS).",
     "Informe con hallazgos, riesgo y mejoras priorizadas."
    ],
    "deliver": "Checklist cumplimentada + informe de auditoría.",
    "amp": "Cerrar el ciclo PDCA: aplicar mejoras y repetir el SCA para demostrar el aumento del % de cumplimiento.",
    "ia": {
     "ruta": [
      "Convertir la normativa de 1.2 en <b>checklist de auditoría</b>: una fila por cláusula, evidencia requerida y método de comprobación.",
      "Contrastar ese checklist con el resultado del SCA de Wazuh: lo que propuso la IA frente a lo que mide la herramienta.",
      "La IA interpreta al <b>auditado evasivo</b>; se evalúa la capacidad de repreguntar y exigir evidencia, no la respuesta obtenida."
     ],
     "ctrl": "Todo ítem indica qué evidencia lo demuestra y dónde se obtiene. Si no se puede señalar, se elimina."
    }
   }
  ]
 },
 {
  "id": "ud2",
  "tag": "UD2",
  "color": "var(--ud2)",
  "ra": "RA2",
  "title": "Auditoría de incidentes",
  "dur": "48 sesiones",
  "peso": "25 %",
  "inst": "LC 40 / TO 60",
  "intro": "La unidad de mayor peso: monitorización, detección y clasificación. Wazuh pasa a ser el centro de operaciones (SOC), con Suricata como IDS de red y Sysmon como sensor en Windows; Kali genera el ruido a detectar. Se practica la taxonomía de incidentes, el triaje, OSINT sobre identidad ficticia y el registro estandarizado.",
  "teoria": [
   {
    "h": "Taxonomía de incidentes",
    "html": "<p>Clasificar los incidentes estandariza el lenguaje, mejora la detección y la respuesta, y es requisito de cumplimiento. La <b>taxonomía de referencia</b> (Guía Nacional de Notificación / ENISA / eCSIRT.net) agrupa: contenido abusivo, contenido malicioso, obtención de información (scanning, sniffing), intento de intrusión, intrusión, disponibilidad (DoS/DDoS), compromiso de la información, fraude, vulnerable y otros (APT, ciberterrorismo, daños a infraestructuras PIC). Existe además una clasificación por <b>prioridad</b> (emergencia, alta, normal, baja).</p>"
   },
   {
    "h": "Fuentes de detección: logs",
    "html": "<p>Los <b>logs</b> son la evidencia del comportamiento del sistema. Formatos habituales: CEF, LEEF, JSON. En Windows, el <b>Visor de eventos</b> (p. ej. evento 4624 de inicio de sesión, 4771 de error de autenticación). En Linux: <code>/var/log/messages</code>, <code>/var/log/secure</code> (logins), <code>/var/log/httpd/access_log</code>, etc. Importa la <b>sincronización horaria</b> y la protección de los registros.</p>"
   },
   {
    "h": "IDS/IPS, WAF, EDR y SIEM",
    "html": "<p><b>IDS</b> (detecta) e <b>IPS</b> (detecta y bloquea), por firmas (SIDS) o anomalías (SIDA), a nivel de red (NIDS) o de host (HIDS). Ejemplos: Suricata, Snort, Zeek, OSSEC, Wazuh. Un <b>WAF</b> (ModSecurity) filtra tráfico HTTP. Un <b>EDR</b> añade análisis de endpoints con sandboxing y machine learning.</p><p>El <b>SIEM</b> recopila, <b>parsea, normaliza, categoriza, agrega y correla</b> eventos de todas las fuentes para generar alertas. Tres capas: recolección, correlación y almacenamiento. Ejemplos: Wazuh, Splunk, QRadar, ArcSight, OSSIM.</p>"
   },
   {
    "h": "El stack del aula: Wazuh + Suricata + Splunk",
    "html": "<p>En el laboratorio se opera <b>Wazuh</b> como SIEM/XDR con agentes en las víctimas y <b>Suricata</b> como NIDS (reglas en <code>/etc/suricata/rules</code>, alertas en <code>fast.log</code> y <code>eve.json</code>). El material de aula practica además <b>Splunk</b> para búsquedas SPL sobre <code>eve.json</code> y sobre logs de Apache (métodos, códigos 5xx, <code>dedup</code> de IPs, trazas de SQLi/XSS con <code>iplocation</code> y <code>stats</code>).</p>"
   },
   {
    "h": "El stack Elastic (ELK) como alternativa",
    "html": "<p>El <b>Elastic Stack</b> (histórico <b>ELK</b>) es la otra gran plataforma de gestión de logs y SIEM, y conviene conocerla porque el alumnado la encontrará en el mundo profesional. Se compone de cuatro piezas:</p><ul><li><b>Elasticsearch</b> — motor de búsqueda y almacén distribuido de documentos JSON; es donde viven e se indexan los eventos.</li><li><b>Logstash</b> — canalización de ingesta que recibe, parsea y transforma los logs (equivalente al parseo/normalización del SIEM) antes de indexarlos. En despliegues ligeros se sustituye por los <b>Beats</b>.</li><li><b>Kibana</b> — capa de visualización y consulta: <em>Discover</em> para explorar eventos, <em>Lens</em>/<em>Dashboard</em> para paneles y <em>Alerting</em> para reglas.</li><li><b>Beats</b> — agentes ligeros que envían datos a Elasticsearch: <b>Filebeat</b> (ficheros de log, con módulo específico para Suricata), <b>Winlogbeat</b> (eventos de Windows/Sysmon) y <b>Packetbeat</b> (tráfico de red).</li></ul><p>El lenguaje de consulta es <b>KQL</b> (Kibana Query Language) o Lucene, frente al <b>SPL</b> de Splunk. <b>Security Onion</b> es una distribución que ya integra Elastic + Suricata + Zeek + Wazuh, muy usada para monitorización de red. <b>Matiz clave del módulo</b>: el propio panel de <b>Wazuh está construido sobre OpenSearch Dashboards, un fork de Kibana</b>, así que al usar Wazuh el alumnado ya maneja una interfaz de la familia Elastic; esta unidad lo hace explícito montando un ELK propio en paralelo.</p><table style='width:100%;border-collapse:collapse;margin-top:10px;font-size:13px'><thead><tr style='text-align:left'><th style='padding:4px 8px'>Función</th><th style='padding:4px 8px'>Wazuh</th><th style='padding:4px 8px'>Splunk</th><th style='padding:4px 8px'>Elastic (ELK)</th></tr></thead><tbody><tr><td style='padding:4px 8px'>Almacén/índice</td><td style='padding:4px 8px'>OpenSearch (incluido)</td><td style='padding:4px 8px'>Índices propios</td><td style='padding:4px 8px'>Elasticsearch</td></tr><tr><td style='padding:4px 8px'>Consulta</td><td style='padding:4px 8px'>Filtros del panel</td><td style='padding:4px 8px'>SPL</td><td style='padding:4px 8px'>KQL / Lucene</td></tr><tr><td style='padding:4px 8px'>Visualización</td><td style='padding:4px 8px'>Dashboard (fork Kibana)</td><td style='padding:4px 8px'>Dashboards Splunk</td><td style='padding:4px 8px'>Kibana</td></tr><tr><td style='padding:4px 8px'>Ingesta</td><td style='padding:4px 8px'>Agente Wazuh</td><td style='padding:4px 8px'>Forwarder / add-ons</td><td style='padding:4px 8px'>Beats / Logstash</td></tr><tr><td style='padding:4px 8px'>Licencia</td><td style='padding:4px 8px'>Libre (GPL)</td><td style='padding:4px 8px'>Gratuita limitada / de pago</td><td style='padding:4px 8px'>Libre (Basic) / de pago</td></tr></tbody></table>"
   }
  ],
  "acts": [
   {
    "n": "2.1",
    "t": "Cartografiando as ameazas",
    "ca": "CA2.1 · Taxonomía (9 h)",
    "obj": "Clasificar los incidentes con una taxonomía profesional y construir un mural de amenazas.",
    "tools": [
     "Taxonomía CCN-CERT / INCIBE",
     "MITRE ATT&CK Navigator",
     "draw.io"
    ],
    "steps": [
     "Presentar categorías (malware, phishing, DDoS, acceso no autorizado, insider…).",
     "Clasificar casos reales en la taxonomía de referencia y en ATT&CK (táctica → técnica).",
     "Comparar con otras taxonomías (ENISA) y construir una <b>taxonomía propia del instituto</b> a dos niveles (tareas 2.1 y 2.2 del aula).",
     "Mural colaborativo con los tipos frecuentes y su impacto CIA."
    ],
    "deliver": "Mural/mapa de amenazas + taxonomía del instituto (2 niveles, con ejemplos).",
    "amp": "Mapear los ataques que se lanzarán después (escaneo, fuerza bruta, ataque web, ransomware) a técnicas ATT&CK concretas.",
    "ia": {
     "ruta": [
      "Primero la taxonomía propia, <b>sin IA</b>. Después se le pide que la <b>critique</b>, no que la reescriba.",
      "Contrastar sus objeciones con la taxonomía de INCIBE/CCN-CERT y con ATT&CK.",
      "Anotar en el mural qué objeciones se aceptaron y cuáles no, con el motivo."
     ],
     "prompts": [
      {
       "who": "prompt · crítica de la taxonomía propia",
       "lines": "Esta es mi taxonomía de incidentes [pegar]. Compárala con la taxonomía de\nreferencia de INCIBE. Dime: qué categorías me faltan, qué categorías mías se\nsolapan, y qué incidente real no encajaría en ninguna de mis casillas.\nNo me reescribas la taxonomía: dime dónde falla la mía."
      }
     ],
     "ctrl": "Orden fijo: producir, contrastar, decidir. El entregable incluye la versión anterior a la IA."
    }
   },
   {
    "n": "2.2",
    "t": "Vixiantes dixitais",
    "ca": "CA2.2 · Monitorización y alerta (9 h)",
    "obj": "Montar y operar la detección: del log a la alerta, sobre Wazuh + Suricata + Sysmon.",
    "tools": [
     "Wazuh",
     "Suricata",
     "Sysmon",
     "Splunk",
     "Elastic / Kibana",
     "Filebeat",
     "nmap",
     "hydra",
     "hping3"
    ],
    "steps": [
     "Verificar que los agentes están <em>Active</em> en el dashboard.",
     "Integrar <b>Sysmon → Wazuh</b> (canal <code>eventchannel</code> en <code>ossec.conf</code>) y <b>Suricata → Wazuh</b> (lectura de <code>eve.json</code>).",
     "Generar ataques desde Kali y detectarlos; escribir alertas propias de Suricata (tarea 2.3) e integrarlas con Splunk (tareas 2.4–2.5).",
     "Interpretar las alertas y depurar las reglas que no disparan."
    ],
    "code": {
     "who": "kali · generar incidentes detectables",
     "lines": "<span class=\"a\">nmap</span> -sS -p- 10.10.10.30            <span class=\"c\"># escaneo → Suricata</span>\n<span class=\"a\">hydra</span> -l webadmin -P rockyou.txt ssh://10.10.10.30\n<span class=\"c\"># En Kali rockyou viene comprimido; primero:</span>\n<span class=\"c\">#   sudo gunzip -k /usr/share/wordlists/rockyou.txt.gz</span>\n<span class=\"a\">sudo hping3</span> --icmp --fast -c 150 10.10.10.30  <span class=\"c\"># dos guiones en --icmp y --fast</span>"
    },
    "deliver": "Fichero <span class='mono'>.rules</span> de Suricata sin errores + capturas de Splunk + informe interpretando 3–4 alertas.",
    "amp": "Crear una regla propia en <code>local_rules.xml</code>, una visualización a medida y una alerta por correo (MailHog). <b>Práctica paralela con Elastic/Kibana</b> (ver abajo): ingerir el mismo <code>eve.json</code> de Suricata en Elasticsearch con Filebeat y construir un dashboard en Kibana, para comparar KQL (Kibana) con SPL (Splunk).",
    "extra": "<span class=\"lbl\">Práctica paralela · Elastic Stack (ELK) y Kibana</span><p>El objetivo es ver el mismo flujo de detección en una plataforma distinta: los eventos de Suricata (<code>eve.json</code>) se envían a <b>Elasticsearch</b> con <b>Filebeat</b> y se exploran y visualizan en <b>Kibana</b>, en paralelo a lo hecho con Splunk. Así el alumnado compara arquitectura, ingesta y lenguaje de consulta (KQL frente a SPL).</p><div class=\"note warn\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M12 9v4M12 17h.01\"/><path d=\"M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z\"/></svg><div><b>Aviso de RAM.</b> Elasticsearch + Kibana consumen bastante memoria (2–4 GB). Con 16 GB en el puesto conviene hacerlo con las demás VM apagadas, o montarlo en el equipo del docente, o usar directamente <b>Security Onion</b> (que ya integra Elastic + Suricata + Zeek). No arrancar a la vez Wazuh y ELK completos.</div></div><div class=\"code\"><div class=\"bar\"><span class=\"who\">siem · instalar Elasticsearch + Kibana (nodo único)</span><button class=\"copy\" type=\"button\">copiar</button></div><pre><span class=\"c\"># Repositorio oficial de Elastic (v8)</span>\ncurl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch \\\n  | sudo gpg --dearmor -o /usr/share/keyrings/elastic.gpg\necho <span class=\"s\">\"deb [signed-by=/usr/share/keyrings/elastic.gpg] \\\nhttps://artifacts.elastic.co/packages/8.x/apt stable main\"</span> \\\n  | sudo tee /etc/apt/sources.list.d/elastic-8.x.list\nsudo apt update &amp;&amp; sudo apt install -y elasticsearch kibana\n<span class=\"c\"># Laboratorio: nodo único, sin cifrado (NUNCA en producción)</span>\n<span class=\"c\"># en /etc/elasticsearch/elasticsearch.yml -> discovery.type: single-node</span>\nsudo systemctl enable --now elasticsearch kibana</pre></div><div class=\"code\"><div class=\"bar\"><span class=\"who\">siem · enviar Suricata a Elasticsearch con Filebeat</span><button class=\"copy\" type=\"button\">copiar</button></div><pre>sudo apt install -y filebeat\nsudo filebeat modules enable suricata      <span class=\"c\"># módulo con dashboards incluidos</span>\n<span class=\"c\"># /etc/filebeat/modules.d/suricata.yml -> paths: [\"/var/log/suricata/eve.json\"]</span>\n<span class=\"c\"># /etc/filebeat/filebeat.yml -> output.elasticsearch.hosts: [\"localhost:9200\"]</span>\nsudo filebeat setup -e     <span class=\"c\"># crea índices, plantillas y dashboards en Kibana</span>\nsudo systemctl enable --now filebeat</pre></div><div class=\"code\"><div class=\"bar\"><span class=\"who\">kibana · explorar y visualizar</span><button class=\"copy\" type=\"button\">copiar</button></div><pre><span class=\"c\"># Panel de Kibana:</span>  http://10.10.10.10:5601\n<span class=\"c\"># 1) Discover -> data view filebeat-* (o suricata-*)</span>\n<span class=\"c\"># 2) Consultas KQL (equivalen a las SPL de la práctica con Splunk):</span>\nevent.dataset : <span class=\"s\">\"suricata.eve\"</span> and suricata.eve.event_type : <span class=\"s\">\"alert\"</span>\nsource.ip : <span class=\"s\">\"10.10.10.100\"</span> and destination.port : 22\n<span class=\"c\"># 3) Dashboard -> panel con recuento de alertas por firma, IP origen y hora</span>\n<span class=\"c\"># 4) Comparar KQL (Kibana) vs SPL (Splunk) en la bitácora</span></pre></div><div class=\"deliver\"><b>Entregable ·</b> capturas de Discover y de un dashboard de Kibana con las alertas de Suricata + tabla comparativa KQL/SPL de tres consultas equivalentes.</div>",
    "ia": {
     "ruta": [
      "Exportar 25 alertas de Wazuh del laboratorio (IP privadas → ámbar) y pedir <b>triaje</b>: verdadero positivo / falso positivo / necesita más contexto.",
      "<b>Contraste ciego</b>: dos alumnos clasifican las mismas alertas a mano; se comparan las tres clasificaciones y se discuten solo las discrepancias.",
      "La IA redacta un borrador de <b>regla Sigma</b>; el alumnado la traduce a regla de Wazuh y la prueba."
     ],
     "prompts": [
      {
       "who": "prompt · triaje de alertas",
       "lines": "Eres analista de nivel 1 de un SOC. Te doy 25 alertas de Wazuh de un laboratorio.\nPara cada una: clasifícala como Verdadero Positivo / Falso Positivo / Necesita\nmás contexto, con una línea de justificación y qué dato adicional pedirías.\nNo inventes campos que no estén en la alerta.\n[pegar alertas]"
      }
     ],
     "labId": 2
    }
   },
   {
    "n": "2.3",
    "t": "Detectives con OSINT",
    "ca": "CA2.4 OSINT · CA2.3 seguridad física (10 h)",
    "obj": "Investigar en fuentes abiertas y entender los controles de seguridad física (se cubren ambos CA).",
    "tools": [
     "theHarvester",
     "SpiderFoot",
     "Maltego CE",
     "Recon-ng",
     "Shodan"
    ],
    "steps": [
     "OSINT sobre un <b>dominio ficticio</b> del laboratorio con theHarvester.",
     "Correlacionar con SpiderFoot; grafo en Maltego.",
     "Seguridad física: análisis documental de controles (ENS) + simulación de sensor de acceso (log) integrado en Wazuh con regla de «acceso fuera de horario»."
    ],
    "deliver": "Informe OSINT + lista de fuentes + apartado de seguridad física con propuesta de detección.",
    "amp": "Correlacionar una credencial filtrada (OSINT) con un intento de login en Wazuh: OSINT como early warning.",
    "ia": {
     "ruta": [
      "La IA <b>planifica</b> la investigación por fases; la ejecución es manual con theHarvester, SpiderFoot y Maltego.",
      "Todo sobre la identidad ficticia sembrada por el docente y el dominio del laboratorio.",
      "Al cerrar, la IA señala qué conclusiones <b>no</b> se sostienen con las evidencias recogidas."
     ],
     "prompts": [
      {
       "who": "prompt · plan de investigación OSINT",
       "lines": "Tengo que investigar la huella digital de una empresa ficticia (TecnoMariña S.L.,\ndominio tecnomarina.local). Dame un plan de investigación OSINT por fases:\nqué buscar, en qué tipo de fuente, en qué orden, y qué hallazgo de cada fase\njustificaría pasar a la siguiente. No busques tú: dame el plan."
      }
     ],
     "ctrl": "Alcance por escrito y firmado antes de empezar. Si ocurre, se para la actividad, se borra lo recopilado y la sesión se convierte en el debate legal, que es contenido del módulo."
    }
   },
   {
    "n": "2.4",
    "t": "Do caos á orde",
    "ca": "CA2.5 · Clasificación y registro (10 h)",
    "obj": "Convertir alertas sueltas en incidentes gestionados, con registro estandarizado y seguimiento inicial.",
    "tools": [
     "TheHive + Cortex",
     "MISP (opc.)",
     "Wazuh",
     "Hoja de registro"
    ],
    "steps": [
     "Definir la plantilla de registro (ID, activo, tipo, gravedad, estado, responsable).",
     "Abrir casos en TheHive con las alertas de 2.2.",
     "Clasificar y valorar cada uno (crítico/alto/medio/bajo).",
     "Seguimiento inicial: responsable, próximos pasos, SLA."
    ],
    "deliver": "Registro estandarizado de incidentes + informe de seguimiento inicial.",
    "amp": "Conectar Wazuh → TheHive por webhook/Cortex para crear casos automáticamente: introducción al SOAR.",
    "ia": {
     "ruta": [
      "Entregar a la IA un aviso de usuario mal escrito y contradictorio: debe salir una ficha con los campos del registro.",
      "La IA propone criticidad (impacto × urgencia); el alumnado la valida, corrige y firma.",
      "Los casos se abren en TheHive o en la hoja de registro."
     ],
     "ctrl": "Cada campo de la ficha apunta a la línea del aviso o de la alerta que lo respalda. Lo demás queda como «pendiente de confirmar»."
    }
   },
   {
    "n": "2.5",
    "t": "Informe forense",
    "ca": "CA2.5 · Incidente complejo (10 h)",
    "obj": "Integrar toda la unidad en un caso completo con componente digital y físico.",
    "tools": [
     "Todo el stack",
     "Metasploit (docente)"
    ],
    "steps": [
     "Se plantea un escenario de ataque encadenado sobre el laboratorio que el grupo no conoce de antemano.",
     "Los grupos detectan en Wazuh, clasifican, valoran, documentan y reconstruyen la línea temporal.",
     "Presentación del informe forense con recomendaciones."
    ],
    "deliver": "Informe forense del incidente simulado + reflexión.",
    "amp": "Cronometrar el tiempo medio de detección (MTTD) y comparar entre grupos.",
    "ia": {
     "ruta": [
      "La IA normaliza y ordena la línea temporal a partir de eventos de Wazuh, Suricata y Sysmon con formatos de fecha distintos.",
      "Verificar a mano la primera entrada, la última y tres al azar.",
      "La IA hace de lector externo: «lee este informe como el responsable que lo recibe y no conoce el caso; dime qué no entiendes y qué falta»."
     ],
     "ctrl": "Toda marca temporal se convierte a UTC antes de entrar en la línea, anotando fuente y huso original. Si falla una verificación de muestra, se rehace completa."
    }
   }
  ]
 },
 {
  "id": "ud3",
  "tag": "UD3",
  "color": "var(--ud3)",
  "ra": "RA3",
  "title": "Investigación de incidentes",
  "dur": "36 sesiones",
  "peso": "20 %",
  "inst": "LC 40 / TO 60",
  "intro": "La unidad forense y la de mayor riesgo con IA: recogida de evidencias con cadena de custodia, análisis de disco/memoria/red, reconstrucción del incidente, intercambio con CERT y primeras medidas de contención. A partir de aquí la evidencia es material ROJO: fuera de la nube.",
  "aviso": {
   "tipo": "roja",
   "html": "<b>Regla de la unidad.</b> La evidencia es material rojo. Las herramientas en la nube quedan fuera para todo lo probatorio. Solo IA local (Ollama) y trabajo sobre extractos derivados."
  },
  "teoria": [
   {
    "h": "Recogida de evidencias (RFC 3227, ISO 27037)",
    "html": "<p>Una evidencia demuestra hechos; la mayoría son digitales. Las metodologías (<b>RFC 3227</b>, ISO/IEC 27037, UNE 71505/71506) exigen que sean <b>verificables, reproducibles, repetibles e independientes</b>, y que la prueba sea admisible, auténtica, completa, fiable y creíble. Se respeta el <b>orden de volatilidad</b> (registros y caché → RAM, tablas ARP y de procesos → disco y logs → configuración física → almacenamiento externo) y se decide el modo de adquisición (<em>live</em> vs <em>dead</em>).</p>"
   },
   {
    "h": "Cadena de custodia y almacenamiento seguro",
    "html": "<p>Se documenta <b>dónde, cuándo y quién</b> descubrió, recopiló y manipuló cada evidencia. Se hacen copias <b>bit a bit</b> sobre soportes con borrado seguro previo, se calculan <b>hashes</b> (SHA-256) de origen y destino para probar que nada se ha alterado, y se guarda con etiquetado, custodia firmada y control de accesos. Herramientas: <code>dd</code>/Guymager/FTK Imager (disco), WinPmem/AVML (memoria), <code>tcpdump</code> (red), <code>sha256sum</code>, GnuPG, VeraCrypt.</p>"
   },
   {
    "h": "Análisis: IOC y MITRE ATT&CK",
    "html": "<p>El análisis clasifica y estudia las copias (nunca el original). Herramientas por tipo: Autopsy/Sleuth Kit (disco), <b>Volatility 3</b> (memoria: <code>pslist</code>, <code>netscan</code>, <code>malfind</code>), YARA/strings (malware estático), Wireshark (red), Aid4Mail (correo). Se extraen <b>indicadores de compromiso (IOC)</b> —IP, hashes, dominios, claves de registro— y se mapean a la matriz <b>MITRE ATT&CK</b> (14 tácticas y sus técnicas). Complementos web: VirusTotal, Hybrid Analysis (usar hashes, no la evidencia).</p>"
   },
   {
    "h": "Intercambio y contención",
    "html": "<p>Los IOC se comparten en formatos estándar: <b>STIX/TAXII</b>, MISP, OpenIOC, IODEF; el CCN-CERT usa <b>REYES</b> (basado en MISP) y <b>LUCÍA</b>. Se aplica el <b>protocolo TLP</b> y cifrado PGP. Marco NIS2: los proveedores de servicios digitales pasan a operadores esenciales. Las <b>primeras medidas de contención</b> (aislar, bloquear IP/cuentas, parchear) se estudian en el plan de respuesta y equilibran contener con preservar la evidencia volátil.</p>"
   }
  ],
  "acts": [
   {
    "n": "3.1",
    "t": "Tras as pegadas dixitais",
    "ca": "CA3.1 · Compilación de evidencias (6 h)",
    "obj": "Recoger evidencias garantizando integridad y validez (cadena de custodia).",
    "tools": [
     "FTK Imager",
     "dd / Guymager",
     "WinPmem",
     "tcpdump",
     "sha256sum",
     "VeraCrypt"
    ],
    "steps": [
     "Explicar el orden de volatilidad y la cadena de custodia.",
     "Capturar memoria de win10 con WinPmem; hash.",
     "Imagen de disco con dd/Guymager; hash.",
     "Captura de tráfico durante el ataque; almacenar con hashes y formulario."
    ],
    "code": {
     "who": "srvweb · captura de tráfico + integridad",
     "lines": "sudo <span class=\"a\">tcpdump</span> -i eth1 -w captura.pcap\n<span class=\"a\">sha256sum</span> memoria.raw disco.img captura.pcap &gt; hashes.txt"
    },
    "deliver": "Registro de evidencias con hashes + formulario de cadena de custodia + informe de métodos.",
    "amp": "Firmar el registro con GnuPG (no repudio); contenedor VeraCrypt como «armario de evidencias».",
    "ia": {
     "ruta": [
      "La recogida se hace <b>sin IA</b>: orden de volatilidad, hashes, formulario y testigo.",
      "La IA solo diseña la plantilla de cadena de custodia y después la ataca como abogado de la parte contraria.",
      "Antes de consultar a cualquier IA se produce un <b>extracto derivado</b>: texto reescrito, sin identificadores ni adjuntos, registrado en la bitácora."
     ],
     "prompts": [
      {
       "who": "prompt · impugnar la propia cadena de custodia",
       "lines": "Esta es mi hoja de cadena de custodia [pegar plantilla vacía]. Actúa como el\nabogado de la parte contraria en un juicio. Dime todos los huecos que te\npermitirían impugnar la validez de esta evidencia."
      }
     ],
     "ctrl": "Carpeta EVIDENCIA_NO_IA dentro de la VM, semáforo rojo y declaración firmada. Si ocurre: parar, registrar qué se subió y cuándo, marcar la evidencia como comprometida (no se borra el registro), re-adquirir con nuevo hash y testigo, y redactar el incidente como ejercicio evaluable."
    }
   },
   {
    "n": "3.2",
    "t": "Radiografía dun ataque",
    "ca": "CA3.2 · Análisis de evidencias (8 h)",
    "obj": "Interpretar las evidencias para hallar el origen: malware, registros, memoria y correo.",
    "tools": [
     "Autopsy / Sleuth Kit",
     "Volatility 3",
     "YARA",
     "CyberChef",
     "kernelpstviewer"
    ],
    "steps": [
     "Disco: abrir la imagen en Autopsy, timeline, ficheros borrados, artefactos.",
     "Memoria: procesos, conexiones e inyección con Volatility 3.",
     "Malware: análisis estático seguro (sin ejecutar) con strings/YARA/hash.",
     "<b>Análisis de correo</b> (tarea 3.2 del aula, caso MINAF): cabeceras, SPF/DKIM/DMARC, enlaces y adjuntos.",
     "Correlacionar con las alertas de Wazuh."
    ],
    "code": {
     "who": "kali · análisis de memoria con Volatility 3",
     "lines": "<span class=\"a\">vol</span> -f memoria.raw windows.pslist     <span class=\"c\"># procesos</span>\n<span class=\"a\">vol</span> -f memoria.raw windows.netscan    <span class=\"c\"># conexiones</span>\n<span class=\"a\">vol</span> -f memoria.raw windows.malfind    <span class=\"c\"># inyección</span>"
    },
    "deliver": "Informe de análisis con conclusiones + metodología reproducible.",
    "amp": "Añadir análisis dinámico en sandbox aislado (Cuckoo/CAPE) y comparar con el estático.",
    "ia": {
     "ruta": [
      "Decodificar el PowerShell en CyberChef y pedir a la <b>IA local (Ollama)</b> explicación línea a línea, técnica ATT&CK y artefactos que buscar después.",
      "Validar cada técnica en el ATT&CK Navigator y descartar las que no tengan evidencia.",
      "Verificar en VirusTotal/MISP todo IOC que la IA atribuya; sin verificación no entra en el informe."
     ],
     "prompts": [
      {
       "who": "prompt · desofuscación y artefactos (Ollama)",
       "lines": "Analiza este comando de PowerShell decodificado, de un laboratorio controlado.\nExplícame línea por línea qué hace, qué técnica de MITRE ATT&CK corresponde a\ncada acción y qué artefactos dejaría (registro, ficheros, eventos de Windows)\nque yo debería buscar.\n[comando]"
      }
     ],
     "ctrl": "Se anota en la bitácora el ratio entre indicadores propuestos por la IA e indicadores que sobrevivieron a la verificación. Ese número da la reflexión final de la actividad.",
     "labId": 3
    }
   },
   {
    "n": "3.3",
    "t": "CSI Ciberseguridade",
    "ca": "CA3.3 · Investigación completa (8 h)",
    "obj": "Reconstruir un incidente completo a partir de indicios (caso global).",
    "tools": [
     "Kit forense + SIEM",
     "Timeline",
     "IOC",
     "Kill Chain / Diamond Model"
    ],
    "steps": [
     "Los grupos reciben el paquete de evidencias (imágenes, pcap, logs, correos): retos tipo <em>El correo me robó el dinero</em> y <em>Vientos remotos</em> (Unizar).",
     "Proceso: identificación → adquisición → análisis → reconstrucción → informe.",
     "Construir la línea temporal correlacionando fuentes y determinar IOC."
    ],
    "deliver": "Informe de investigación + cronología + tabla de IOC.",
    "amp": "Escribir los IOC en formato STIX; aplicar Cyber Kill Chain o Diamond Model.",
    "ia": {
     "ruta": [
      "Pedir cuatro <b>hipótesis</b>, una sin atacante externo, con la evidencia que confirmaría y la que refutaría cada una.",
      "El grupo busca la evidencia de <b>refutación</b>, no la de confirmación.",
      "Redactar con los tres niveles obligatorios: confirmado, probable, hipótesis."
     ],
     "prompts": [
      {
       "who": "prompt · hipótesis alternativas",
       "lines": "Estos son los hechos confirmados del incidente [lista]. Dame 4 hipótesis\ndistintas que expliquen lo ocurrido, incluyendo al menos una que NO implique\nun atacante externo. Para cada hipótesis dime qué evidencia la confirmaría y\nqué evidencia la refutaría. No me digas cuál es la correcta."
      }
     ],
     "ctrl": "Prohibidas las preguntas cerradas durante la investigación. Si todos los prompts de la bitácora son confirmatorios, baja la nota del proceso aunque la conclusión sea correcta."
    }
   },
   {
    "n": "3.4",
    "t": "Compartindo para protexer",
    "ca": "CA3.4 · Intercambio con organismos (6 h)",
    "obj": "Saber cuándo, cómo y con quién compartir, de forma segura.",
    "tools": [
     "MISP",
     "STIX / TAXII",
     "GnuPG / PGP",
     "TLP",
     "INCIBE-CERT · CCN-CERT · CSIRT.gal"
    ],
    "steps": [
     "Estudiar el mapa de organismos y a quién corresponde (marco NIS2).",
     "Cargar los IOC de 3.3 en MISP y generar el paquete STIX.",
     "Redactar el aviso formal al CERT, cifrado con GnuPG y con etiqueta TLP.",
     "Registrar todas las comunicaciones."
    ],
    "deliver": "Simulación de notificación cifrada + evento MISP + registro + justificación del organismo.",
    "amp": "Sincronizar MISP entre dos grupos para ver el intercambio real de feeds; investigar la herramienta REYES del CCN-CERT.",
    "ia": {
     "ruta": [
      "La IA redacta el borrador del aviso al CERT; el contenido técnico sale de 3.3, no de la IA.",
      "<b>Filtro de divulgación</b> antes de cifrar y enviar: datos personales, de terceros, detalles que faciliten reproducir el ataque, especulación sobre autoría.",
      "Role play: la IA interpreta al analista del CERT que pide aclaraciones."
     ],
     "ctrl": "Doble redacción: la IA trabaja sobre la versión con marcadores y los datos reales los sustituye una persona al final, en local."
    }
   },
   {
    "n": "3.5",
    "t": "Freando a ameaza",
    "ca": "CA3.5 · Primeras medidas de contención (8 h)",
    "obj": "Actuar rápido para limitar el daño sin destruir evidencias.",
    "tools": [
     "iptables / nftables",
     "Windows Firewall",
     "Wazuh active response",
     "Bloqueo de cuentas"
    ],
    "steps": [
     "Decidir el orden de contención (sin perder evidencia volátil).",
     "Aislar la máquina comprometida (quitar de la LAN o firewall).",
     "Bloquear la IP del atacante; automatizar con la respuesta activa de Wazuh.",
     "Bloquear cuentas, rotar credenciales y parchear la vulnerabilidad."
    ],
    "deliver": "Plan de contención aplicado + informe de acciones y resultados.",
    "amp": "Medir el MTTR de contención; discutir el dilema «apagar vs. mantener encendido» para preservar la RAM.",
    "ia": {
     "ruta": [
      "Pedir cinco medidas de contención y, para cada una, qué contiene, qué servicio rompe, qué evidencia destruye y qué reversión tiene.",
      "Ordenarlas de menos a más destructiva para la evidencia; el grupo decide y justifica.",
      "Contrastar la decisión con la respuesta activa de Wazuh ya configurada."
     ],
     "prompts": [
      {
       "who": "prompt · opciones de contención y su coste",
       "lines": "Escenario: servidor web comprometido (10.10.10.30) que además aloja el portal\nde citas del ayuntamiento. Dame 5 medidas de contención posibles, y para cada\nuna: qué contiene, qué servicio rompe, qué evidencia destruye y qué reversión\ntiene. Ordénalas de menos a más destructiva para la evidencia forense."
      }
     ],
     "ctrl": "Snapshot de la VM, ejecución en seco primero (--dry-run, -WhatIf) y explicación en voz alta del comando a un compañero. Si no se sabe explicar, no se ejecuta."
    }
   }
  ]
 },
 {
  "id": "ud4",
  "tag": "UD4",
  "color": "var(--ud4)",
  "ra": "RA4",
  "title": "Implementación de medidas",
  "dur": "36 sesiones",
  "peso": "20 %",
  "inst": "LC 50 / TO 50",
  "intro": "Del análisis a la respuesta operativa: playbooks, ciberresiliencia (copias, segmentación, continuidad), flujos de escalado, recuperación y simulación integral. El ciclo de vida de referencia es el de INCIBE-CERT / NIST SP 800-61.",
  "teoria": [
   {
    "h": "El ciclo de gestión de incidentes",
    "html": "<p>Fases (INCIBE-CERT, NIST SP 800-61): <b>preparación</b> (personas, procedimientos, tecnología; contactos, herramientas, imágenes y backups probados), <b>identificación</b>, <b>contención</b> (triaje, aislamiento, toma de evidencias, autorización del área de negocio antes de acciones de gran impacto), <b>mitigación/erradicación</b> (borrado seguro y reinstalación, o restauración de copia limpia), <b>recuperación</b> (vuelta a producción sin precipitarse, vigilancia reforzada) y <b>actuaciones post-incidente</b> (lecciones aprendidas, informe con resumen ejecutivo y anexos técnicos).</p>"
   },
   {
    "h": "Playbooks y árboles de decisión",
    "html": "<p>Un <b>playbook</b> concreta, por tipo de incidente (ransomware, phishing, SQLi…), las acciones de cada fase con responsable, tiempo objetivo y criterio de salida. Se acompaña de una <b>matriz de severidad</b> y un <b>árbol de escalado</b> interno/externo (técnico → responsable → dirección → CERT/autoridad). En el aula se practican con el <em>juego de rol de INCIBE</em> y la herramienta <b>FIR</b> (Fast Incident Response).</p>"
   },
   {
    "h": "Ciberresiliencia: 3-2-1, RTO/RPO y segmentación",
    "html": "<p>La resiliencia se prueba <b>restaurando</b>: una copia no probada no es una copia. Estrategia <b>3-2-1</b> con <code>restic</code>/Borg (3 copias, 2 soportes, 1 externa) e inmutabilidad frente a ransomware; se miden <b>RTO</b> (tiempo de recuperación) y <b>RPO</b> (pérdida admisible). La <b>segmentación</b> separa la LAN de una DMZ; se verifica la integridad tras recuperar con el <b>FIM de Wazuh</b> (syscheck) frente a la línea base.</p>"
   },
   {
    "h": "Herramientas del CCN-CERT",
    "html": "<p>El material integra el <b>curso ÁNGELES</b> del CCN-CERT (Gestión de Incidentes) y la herramienta <b>REYES</b> (repositorio de amenazas y código dañino, sobre MISP), además de <b>LUCÍA</b> para el ticketing de incidentes del sector público.</p>"
   }
  ],
  "acts": [
   {
    "n": "4.1",
    "t": "Plan de acción ante a tormenta",
    "ca": "CA4.1 · Procedimientos de actuación (5 h)",
    "obj": "Redactar playbooks de respuesta por tipo de incidente.",
    "tools": [
     "NIST SP 800-61",
     "Guía INCIBE-CERT",
     "draw.io",
     "FIR / TheHive"
    ],
    "steps": [
     "Elegir tres incidentes: ransomware, phishing con robo de credenciales, ataque web (SQLi) — base: <em>juego de rol de INCIBE</em>.",
     "Playbook por incidente: detección → triaje → contención → erradicación → recuperación → lecciones.",
     "Realizar el <b>curso ÁNGELES</b> del CCN-CERT (tarea 4.1) y gestionar los casos con <b>FIR</b> (tarea 4.3).",
     "Representar como diagrama de flujo; validar contra el caso de la UD3."
    ],
    "deliver": "Tres playbooks documentados + diagramas de flujo + casos en FIR.",
    "amp": "Automatizar un paso con Shuffle (alerta Wazuh → ticket → bloqueo de IP): SOAR práctico.",
    "ia": {
     "ruta": [
      "Pedir el playbook con la marca <code>[VERIFICAR]</code> en toda acción que dependa de la infraestructura concreta.",
      "Sustituir cada marca por el comando, la IP o la ruta reales del laboratorio. Un playbook con marcas sin resolver no se acepta.",
      "<b>Prueba de ejecución literal</b>: otro grupo lo ejecuta sin preguntar nada a sus autores."
     ],
     "prompts": [
      {
       "who": "prompt · playbook con marcas de aterrizaje",
       "lines": "Redacta un playbook de respuesta ante ransomware para TecnoMariña S.L.\n(30 empleados, un servidor de ficheros, un servidor web, sin SOC 24x7,\ncopias en NAS local + copia semanal externa). Estructura: detección, triaje,\ncontención, erradicación, recuperación, lecciones aprendidas. Para cada fase:\nacciones numeradas, responsable, tiempo objetivo y criterio de salida.\nMarca con [VERIFICAR] toda acción que dependa de la infraestructura concreta."
      }
     ],
     "ctrl": "Cada pregunta que el grupo ejecutor necesita hacer es un defecto anotado en el documento. Criterio objetivo y fácil de observar."
    }
   },
   {
    "n": "4.2",
    "t": "Fortaleza dixital",
    "ca": "CA4.2 · Respuestas ciberresilientes (5 h)",
    "obj": "Implantar medidas que permitan seguir operando pese al incidente: copias, segmentación y continuidad.",
    "tools": [
     "nftables / pfSense",
     "restic / BorgBackup",
     "snapshots VirtualBox",
     "Wazuh FIM"
    ],
    "steps": [
     "Segmentar: mover srvweb a la DMZ y permitir solo el puerto necesario. En el aula se usa el cortafuegos nftables de la UD1 (menos RAM que pfSense); pfSense queda para el nivel ampliado de 32 GB.",
     "Backups regla 3-2-1 con restic + cron.",
     "Probar la recuperación: simular pérdida y restaurar; medir RTO y RPO.",
     "Documentar el plan de resiliencia (activos, RTO/RPO, medidas)."
    ],
    "deliver": "Plan de resiliencia + informe de pruebas de backup/restauración (RTO/RPO) + evidencia de segmentación.",
    "amp": "Cifrar los backups y probar restauración en máquina limpia; inmutabilidad frente a ransomware.",
    "ia": {
     "ruta": [
      "La IA propone RTO y RPO por servicio y el esquema 3-2-1; el alumnado lo implementa con restic y lo prueba restaurando.",
      "Los diagramas de segmentación se generan en Mermaid y se corrigen a mano antes de tocar el cortafuegos.",
      "Ninguna regla de firewall se aplica sin explicar qué abre y qué cierra."
     ],
     "ctrl": "Verificación posterior desde Kali con nmap contra la DMZ, para comprobar que solo responde lo previsto. Regla de los tres filtros para todo comando (explicar, dry-run, snapshot).",
     "labId": 4
    }
   },
   {
    "n": "4.3",
    "t": "Decisión baixo presión",
    "ca": "CA4.3 · Flujo de decisiones y escalado (5 h)",
    "obj": "Decidir rápido y escalar correctamente según la gravedad.",
    "tools": [
     "draw.io / Mermaid",
     "Matriz de severidad CCN-CERT",
     "RACI",
     "NIS2 / RGPD"
    ],
    "steps": [
     "Matriz de severidad y qué implica cada nivel (a quién, en cuánto tiempo).",
     "Árbol de decisión y escalado interno (técnico → responsable → dirección) y externo (proveedor, CERT, autoridad).",
     "Role play de 2–3 incidentes de distinta gravedad bajo tiempo.",
     "Registrar decisiones y tiempos."
    ],
    "deliver": "Flujo de escalado + matriz de severidad + registro de simulaciones.",
    "amp": "Añadir plazos legales al árbol: NIS2 (alerta temprana) y RGPD (72 h a la AEPD).",
    "ia": {
     "ruta": [
      "Generar el árbol de escalado en sintaxis <b>Mermaid</b>, con nodos de decisión y plazos.",
      "Recorrerlo con cinco incidentes distintos: los que no encajan en ninguna rama obligan a rediseñarlo.",
      "Los plazos legales del árbol se verifican en la fuente, no en la IA."
     ],
     "prompts": [
      {
       "who": "prompt · árbol de escalado en Mermaid",
       "lines": "Genera en sintaxis Mermaid un diagrama de flujo de escalado de incidentes para\nuna empresa de 30 personas con un único técnico de sistemas, un responsable de\nTI y gerencia. Nodos de decisión: ¿hay datos personales afectados?, ¿hay\nservicio público caído?, ¿hay petición de rescate?, ¿se supera 1 hora sin\ncontención? Incluye plazos y a quién se notifica en cada rama."
      }
     ],
     "ctrl": "Regla del reloj: la IA se usa en preparación y en post-mortem, nunca durante la ventana de respuesta. Si el procedimiento no basta en caliente, se arregla después, en frío."
    }
   },
   {
    "n": "4.4",
    "t": "Volver á normalidade",
    "ca": "CA4.4 · Restablecimiento de servicios (5 h)",
    "obj": "Recuperar servicios de forma segura y verificar su integridad.",
    "tools": [
     "Backups (restic/snapshots)",
     "Wazuh FIM (syscheck)",
     "sha256sum",
     "debsums"
    ],
    "steps": [
     "Erradicar (webshell/persistencia) y restaurar srvweb desde copia limpia.",
     "Reforzar antes de producción: parche, contraseñas nuevas, cierre del vector.",
     "Verificar integridad con el FIM de Wazuh frente a la línea base.",
     "Reconectar y vigilar; confirmar la vuelta a la normalidad con criterios objetivos."
    ],
    "deliver": "Plan de recuperación + informe de verificación (checklist de integridad y disponibilidad).",
    "amp": "Definir criterios formales de cierre y una ventana de observación reforzada; ensayar un rollback. Investigar la herramienta REYES (tarea 4.4).",
    "ia": {
     "ruta": [
      "La IA genera el <b>checklist de vuelta a la normalidad</b>: qué se comprueba antes de reconectar y cómo se confirma que no hay persistencia.",
      "Contrastarlo con el FIM de Wazuh frente a la línea base: la herramienta manda sobre la lista.",
      "Definir criterios de cierre objetivos y una ventana de observación reforzada."
     ],
     "ctrl": "El criterio de cierre incluye siempre una comprobación explícita del vector identificado en la UD3."
    }
   },
   {
    "n": "4.5",
    "t": "Aprender do pasado",
    "ca": "CA4.5 · Documentación y lecciones (6 h)",
    "obj": "Cerrar el ciclo con documentación que evite repeticiones.",
    "tools": [
     "Plantillas INCIBE-CERT / NIST",
     "BookStack / DokuWiki",
     "5 porqués"
    ],
    "steps": [
     "Informe post-incidente: resumen ejecutivo, cronología, impacto, causa raíz.",
     "Extraer lecciones y acciones correctivas/preventivas (responsable y fecha).",
     "Publicar en la base de conocimiento."
    ],
    "deliver": "Documentación completa del incidente + informe de lecciones con plan de mejora.",
    "amp": "Retrospectiva sin culpables; convertir cada lección en una regla Wazuh o un control CIS.",
    "ia": {
     "ruta": [
      "La IA facilita un <b>post-mortem sin culpables</b>: preguntas, fallos de proceso y acciones correctivas con indicador.",
      "Cada lección se convierte en algo comprobable: una regla de Wazuh o un control CIS.",
      "Publicar indicando qué parte redactó la IA."
     ],
     "prompts": [
      {
       "who": "prompt · post-mortem sin culpables",
       "lines": "Te paso la cronología de nuestra respuesta al incidente [pegar]. Facilita un\npost-mortem sin culpabilizar (blameless). Dame: 5 preguntas que deberíamos\nrespondernos, 3 fallos de proceso (no de personas) que detectas, y 3 acciones\ncorrectivas con indicador medible para saber si funcionaron."
      }
     ],
     "ctrl": "Ninguna acción correctiva se acepta sin responsable, fecha e indicador que diga si funcionó."
    }
   },
   {
    "n": "4.6",
    "t": "Simulación integral de resposta",
    "ca": "CA4.6 · Seguimiento (10 h)",
    "obj": "Ejecutar el ciclo completo de respuesta en equipo, en escenario realista.",
    "tools": [
     "Todo el laboratorio",
     "Escenario del docente"
    ],
    "steps": [
     "Se lanza un incidente completo sobre el laboratorio, sin aviso previo de su tipo ni de su vector de entrada.",
     "El equipo aplica todo el ciclo: detección → contención → erradicación → recuperación → escalado → documentación → seguimiento.",
     "Roles distribuidos (analista, coordinador, comunicación)."
    ],
    "deliver": "Informe final + plan de seguimiento + reflexión.",
    "amp": "Repetir el escenario tras aplicar mejoras y demostrar que ahora se detecta/contiene más rápido.",
    "ia": {
     "ruta": [
      "Durante el simulacro la IA queda <b>fuera</b>: solo playbooks y procedimientos escritos.",
      "Se usa después, en el post-mortem, para contrastar la cronología real con el playbook previsto.",
      "Se anotan los puntos donde el procedimiento no bastó y se corrigen en frío."
     ],
     "ctrl": "El playbook incorpora una sección explícita de acciones prohibidas con su fundamento legal. Cuando aparece la sugerencia, se detiene la actividad y se analiza: la mala respuesta acaba mejorando el entregable."
    }
   }
  ]
 },
 {
  "id": "ud5",
  "tag": "UD5",
  "color": "var(--ud5)",
  "ra": "RA5",
  "title": "Detección y documentación",
  "dur": "12 sesiones",
  "peso": "15 %",
  "inst": "LC 60 / TO 40",
  "intro": "Unidad corta y muy densa, centrada en la notificación: procedimientos y plazos, canales internos, notificación a terceros y autoridades, análisis de impacto y lecciones. Es donde la IA es más útil (redacción bajo presión) y donde más falla (plazos legales). Un buzón MailHog permite «enviar» avisos sin salir a Internet.",
  "teoria": [
   {
    "h": "Marco de notificación y ventanilla única",
    "html": "<p>La <b>Guía Nacional de Notificación y Gestión de Ciberincidentes</b> (Consejo Nacional de Ciberseguridad) define la <b>ventanilla única</b>: el afectado notifica a su CSIRT de referencia (INCIBE-CERT para el sector privado y ciudadanía; CCN-CERT vía <b>LUCÍA</b> para el sector público), que deriva a la autoridad competente (AEPD si hay datos personales; CNPIC si hay infraestructura crítica; ESP-DEF-CERT si afecta a Defensa).</p>"
   },
   {
    "h": "Peligrosidad, impacto y plazos",
    "html": "<p>Cada incidente recibe un nivel de <b>peligrosidad</b> (crítico, muy alto, alto, medio, bajo) y de <b>impacto</b>. Son de notificación <b>obligatoria</b> los de nivel alto o superior. Ventana temporal de reporte para sujetos obligados: notificación <b>inicial inmediata</b>; intermedia y final según nivel (crítico: 24/48 h y 20 días; muy alto: 72 h y 40 días).</p>"
   },
   {
    "h": "RGPD y NIS2 (situación en 2026)",
    "html": "<p>El <b>RGPD</b> obliga a notificar una brecha de datos personales a la AEPD en <b>72 horas</b> (y a los afectados si hay alto riesgo). Los plazos de <b>NIS2</b> (alerta temprana 24 h, notificación 72 h, informe final 1 mes) derivan de la propia Directiva (UE) 2022/2555.</p><div class='note warn'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round'><path d='M12 9v4M12 17h.01'/><path d='M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'/></svg><div><b>Dato a verificar cada curso.</b> A julio de 2026 la <b>Ley de Coordinación y Gobernanza de la Ciberseguridad</b> (transposición española de NIS2) <b>seguía sin publicarse en el BOE</b>; España fue remitida al TJUE el 9/7/2026. Mientras no se publique, los plazos aplicables provienen del RGPD y de la Directiva NIS2. Comprobar el estado en el BOE al inicio de cada curso.</div></div>"
   },
   {
    "h": "Comunicación multi-audiencia",
    "html": "<p>El mismo incidente se traduce a públicos distintos (técnico, responsable de TI, dirección, plantilla/ciudadanía) sin cambiar los hechos. Reglas de oro: <b>doble redacción</b> (marcadores primero, datos reales en local al final), verificación de plazos en fuente primaria, y revisión cruzada de tres lecturas antes de emitir.</p>"
   }
  ],
  "acts": [
   {
    "n": "5.1",
    "t": "Alerta temperá",
    "ca": "CA5.1 · Procedimiento y plazos (2 h)",
    "obj": "Definir cómo y en qué plazos se notifica cada incidente.",
    "tools": [
     "Plantillas INCIBE-CERT / LUCÍA",
     "MailHog / Mailpit",
     "NIS2 · RGPD · ENS"
    ],
    "steps": [
     "Clasificar qué incidentes exigen notificación inmediata y a quién.",
     "Construir la <b>tabla de disparadores y plazos</b>, verificando cada plazo en la fuente; imprimirla y colgarla en el aula.",
     "Redactar la plantilla de aviso de 10 líneas y «enviarla» al buzón MailHog."
    ],
    "code": {
     "who": "siem · buzón de correo de laboratorio",
     "lines": "sudo <span class=\"a\">docker</span> run -d -p 8025:8025 -p 1025:1025 mailhog/mailhog\n<span class=\"c\"># Buzón web: http://10.10.10.10:8025   ·   SMTP: 10.10.10.10:1025</span>"
    },
    "deliver": "Procedimiento de notificación + tabla de plazos verificada + ejemplo de aviso.",
    "amp": "Tabla comparativa de plazos: NIS2 (24 h / 72 h) vs RGPD (72 h a la AEPD).",
    "ia": {
     "ruta": [
      "La IA propone la tabla de disparadores y plazos; cada plazo se verifica en la fuente y la tabla se cuelga en el aula.",
      "El resto del curso los plazos se miran en la tabla: no se vuelven a preguntar a la IA.",
      "Plantilla de aviso de diez líneas: qué ha pasado, cuándo se detectó, qué está afectado, qué se hace, qué necesito de ti, cuándo vuelvo a informar."
     ],
     "ctrl": "Lo que tiene consecuencias legales se verifica en la fuente primaria, siempre."
    }
   },
   {
    "n": "5.2",
    "t": "Canles internas",
    "ca": "CA5.2 · Notificación interna (2 h)",
    "obj": "Comunicar internamente y escalar según la gravedad.",
    "tools": [
     "MailHog",
     "Flujo de escalado (UD4.3)",
     "Parte de incidente interno"
    ],
    "steps": [
     "Notificar un incidente medio/alto siguiendo el flujo: analista → responsable → dirección.",
     "Redactar el parte interno (qué, impacto, medidas, decisión requerida).",
     "Simular el escalado al subir la gravedad; registrar comunicaciones."
    ],
    "deliver": "Registro de comunicaciones internas + informe de escalado.",
    "amp": "Plantilla de comunicación de crisis y un canal «fuera de banda» por si el correo corporativo está comprometido.",
    "ia": {
     "ruta": [
      "Pedir cuatro versiones del mismo aviso <b>sin cambiar un solo hecho</b>: técnico, responsable de TI, gerencia y plantilla.",
      "Comparar qué se pierde en cada traducción y si algo importante desapareció al simplificar. Esa comparación es la actividad.",
      "Enviar las versiones al buzón MailHog siguiendo el flujo de escalado de 4.3."
     ],
     "prompts": [
      {
       "who": "prompt · el mismo incidente, cuatro audiencias",
       "lines": "Te doy los hechos de un incidente [pegar]. Redacta cuatro versiones del mismo\naviso, sin cambiar ni un hecho:\n1. Para el técnico de sistemas (que tiene que actuar ya) — máx. 8 líneas\n2. Para el responsable de TI — máx. 10 líneas, con impacto y decisiones pendientes\n3. Para gerencia — máx. 6 líneas, sin jerga, con coste y riesgo legal\n4. Para la plantilla — máx. 5 líneas, qué deben hacer y qué no\nEn ninguna versión especules sobre causas ni sobre responsables."
      }
     ],
     "ctrl": "La versión para gerencia se valida contra la técnica: cada decisión solicitada debe tener su hecho de respaldo.",
     "labId": 5
    }
   },
   {
    "n": "5.3",
    "t": "Informes que protexen",
    "ca": "CA5.3 · Notificación a autoridades (2 h)",
    "obj": "Notificar a terceros con la documentación y el canal correctos.",
    "tools": [
     "INCIBE-CERT",
     "CCN-CERT (LUCÍA)",
     "CSIRT.gal",
     "AEPD",
     "GnuPG · TLP",
     "IODEF / STIX"
    ],
    "steps": [
     "Determinar el organismo competente según entidad e incidente.",
     "Rellenar el informe estandarizado (identificación, impacto, IOC, medidas).",
     "Cifrar y enviar el aviso (a MailHog) aplicando TLP y confidencialidad.",
     "Registrar la comunicación externa y el seguimiento."
    ],
    "deliver": "Informe estandarizado listo para compartir + registro de comunicaciones externas + justificación del organismo.",
    "amp": "Comparar una notificación NIS2 (a la autoridad) frente a una RGPD (a la AEPD y a los afectados).",
    "ia": {
     "ruta": [
      "Borrador del informe estandarizado con la IA, sobre la plantilla del organismo competente.",
      "<b>Filtro de confidencialidad</b> antes de cifrar y enviar: nombres, terceros, detalles reproducibles, especulación sobre autoría.",
      "La IA interpreta al funcionario que responde con un requerimiento de ampliación."
     ],
     "ctrl": "Doble redacción con marcadores [N] afectados, [SERVICIO], [FECHA]. Los datos reales entran en local y al final, nunca al revés."
    }
   },
   {
    "n": "5.4",
    "t": "Análise de impacto",
    "ca": "CA5.4 · Notificación a afectados (3 h)",
    "obj": "Evaluar el impacto y comunicar a los afectados adecuadamente.",
    "tools": [
     "Datos del SIEM / registro",
     "Matriz de impacto",
     "Plantillas RGPD"
    ],
    "steps": [
     "Evaluar el impacto sobre sistemas, datos y servicios; estimar alcance.",
     "Priorizar incidentes/afectados por gravedad e impacto.",
     "Redactar la comunicación formal a los afectados (clara, honesta, con medidas) y enviarla al buzón."
    ],
    "deliver": "Informe de análisis de impacto + lista priorizada + comunicación a afectados.",
    "amp": "Dos versiones de la comunicación (técnica para proveedores, sencilla para clientes) y evaluar cuál cumple el RGPD.",
    "ia": {
     "ruta": [
      "La IA propone la matriz de impacto y una priorización; el alumnado la ajusta al caso y justifica cada cambio.",
      "El entregable lleva las dos versiones en paralelo: la de la IA y la corregida.",
      "Las cifras de alcance salen del SIEM y del registro, nunca de la estimación de la IA."
     ],
     "ctrl": "Todo número de la comunicación apunta a la consulta del SIEM o al campo del registro que lo respalda."
    }
   },
   {
    "n": "5.5",
    "t": "Leccións aprendidas e mellora",
    "ca": "CA5.5 · Medios y mejora (3 h)",
    "obj": "Cerrar la gestión comunicativa y mejorar el proceso.",
    "tools": [
     "Plantilla de comunicado / portavocía",
     "BookStack / Moodle",
     "Retrospectiva"
    ],
    "steps": [
     "Decidir si procede informar a medios y redactar, si aplica, un comunicado medido.",
     "Informe final de lecciones sobre la comunicación (qué funcionó, tiempos).",
     "Plan de mejora de los procedimientos; archivar en la base de conocimiento."
    ],
    "deliver": "Informe final de lecciones + plan de mejora de notificación + (si procede) comunicado público.",
    "amp": "Simulacro de rueda de prensa / preguntas difíciles; analizar un caso real de gestión de una brecha.",
    "ia": {
     "ruta": [
      "La IA interpreta a un periodista incisivo: cuántos afectados, por qué no se dijo antes, si van a pagar. Tres rondas, la segunda sin preparación previa.",
      "<b>Prueba de la frase concreta</b>: se subraya todo lo que podría aparecer en el comunicado de cualquier otra empresa, y se elimina.",
      "Informe final de lecciones sobre la comunicación y plan de mejora."
     ],
     "ctrl": "Tres lecturas con tres preguntas distintas: ¿hay algún hecho no confirmado?, ¿alguna frase admite culpa sin base?, ¿se entiende sin saber informática?"
    }
   }
  ]
 }
];
const LAB_TASKS = {
 "1": {
  "t": "Laboratorio integrado · Normativa del puesto y detección de alucinaciones normativas",
  "escenario": "Como responsable de seguridad de TecnoMariña S.L., elaboras la Normativa de Protección del Puesto de Trabajo. Usas un LLM comercial para un primer borrador exhaustivo (autenticación, teletrabajo, bloqueo de pantalla, uso de IA generativa) y auditas cada control frente al ENS (RD 311/2022), detectando y corrigiendo las alucinaciones normativas.",
  "elementos": [
   "Enunciado de contexto de TecnoMariña S.L.",
   "Asistente de IA en la nube (nivel verde)",
   "Texto oficial del RD 311/2022 (ENS) y guías CCN-STIC"
  ],
  "entregable": "Normativa del puesto corregida + tabla de trazabilidad + bitácora de prompts.",
  "fases": [
   "Generación inicial",
   "Auditoría de afirmaciones",
   "Tratamiento de discrepancias",
   "Cláusula de IA",
   "Entrega"
  ]
 },
 "2": {
  "t": "Laboratorio integrado · Triaje en Wazuh y mitigación de prompt injection en logs",
  "escenario": "Desde kali se lanza tráfico web hacia srvweb con una carga que intenta engañar al analista mediante instrucciones inyectadas en las cabeceras HTTP. El alumnado exporta las alertas de Wazuh, las somete a triaje asistido por IA, detecta la manipulación y crea una regla de detección.",
  "elementos": [
   "Máquinas siem, srvweb y kali activas",
   "Panel Wazuh en https://10.10.10.10"
  ],
  "entregable": "Ficha del incidente + regla local de Wazuh + bitácora con los dos triajes (vulnerable y mitigado).",
  "fases": [
   "Lanzamiento",
   "Extracción",
   "Comprobar la vulnerabilidad",
   "Aislamiento de contexto",
   "Regla de detección"
  ]
 },
 "3": {
  "t": "Laboratorio integrado · Cadena de custodia (RFC 3227) y desofuscación con IA local",
  "escenario": "Un atacante ha ejecutado un comando ofuscado en PowerShell en win10. Siguiendo el RFC 3227, se extrae la evidencia, se mantiene la cadena de custodia sin exponer datos a la nube y se analiza el código con un LLM local (Ollama) para mapearlo a MITRE ATT&CK.",
  "elementos": [
   "win10 con Sysmon (Event ID 1: creación de procesos)",
   "CyberChef para decodificación",
   "IA local: <code>ollama run llama3.2:3b</code> o <code>qwen2.5:3b</code>",
   "Formulario de cadena de custodia"
  ],
  "entregable": "Informe forense pericial + hoja de custodia + bitácora de IA local.",
  "fases": [
   "Preservación (evidencia roja)",
   "Decodificación manual",
   "Análisis asistido local",
   "Verificación de artefactos",
   "Entrega"
  ]
 },
 "4": {
  "t": "Laboratorio integrado · Playbook ante ransomware y resiliencia con Restic",
  "escenario": "Desarrollas un playbook técnico ante ransomware siguiendo NIST SP 800-61 para TecnoMariña S.L. Configuras en srvweb copias 3-2-1 con Restic, simulas un cifrado y mides experimentalmente el RTO y el RPO.",
  "elementos": [
   "srvweb con el paquete restic instalado",
   "Guía NIST SP 800-61 y Wazuh FIM (syscheck)"
  ],
  "entregable": "Playbook validado por ejecución ciega + informe de RTO/RPO + evidencia FIM.",
  "fases": [
   "Generación con IA",
   "Parametrización local",
   "Despliegue de copias",
   "Simulación y restauración",
   "Comprobación FIM"
  ]
 },
 "5": {
  "t": "Laboratorio integrado · Notificación de brecha y gestión comunicativa de crisis",
  "escenario": "Tras una fuga de datos personales en el portal municipal, se activan los procedimientos de notificación según el RGPD (72 h). Se usa la IA para adaptar el incidente a cuatro registros comunicativos con el protocolo de doble redacción y se realiza un simulacro de rueda de prensa.",
  "elementos": [
   "Buzón MailHog en siem (http://10.10.10.10:8025)",
   "Formulario de notificación de brechas de la AEPD / INCIBE-CERT"
  ],
  "entregable": "Notificación formal + protocolo de doble redacción + registro de comunicaciones.",
  "fases": [
   "Doble redacción",
   "Adaptación multi-audiencia",
   "Desanonimización y prueba SMTP",
   "Rueda de prensa",
   "Entrega"
  ]
 }
};
