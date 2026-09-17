/* MP5021 — Manual Vagrant (datos) */
const MANUAL = {
 "files": {
  "Vagrantfile": "# labcyber/Vagrantfile — Laboratorio MP5021 (TecnoMariña S.L.)\nWAZUH_BRANCH    = \"4.14\"      # rama del instalador (packages.wazuh.com/<rama>/)\nWAZUH_AGENT_VER = \"4.14.0-1\"  # versión exacta del agente, igual o menor que el manager\nLAN             = \"labcyber-lan\"\n\nVagrant.configure(\"2\") do |config|\n  config.vm.box_check_update = false\n  config.vm.boot_timeout     = 900\n\n  # ---------- SIEM: Wazuh + Suricata ----------\n  config.vm.define \"siem\", primary: true do |m|\n    m.vm.box      = \"bento/ubuntu-22.04\"\n    m.vm.hostname = \"siem\"\n    m.vm.network \"private_network\", ip: \"10.10.10.10\", virtualbox__intnet: LAN\n    m.vm.network \"private_network\", ip: \"192.168.56.10\"\n    m.vm.provider \"virtualbox\" do |vb|\n      vb.name   = \"lab-siem\"\n      vb.memory = 5120\n      vb.cpus   = 2\n      vb.customize [\"modifyvm\", :id, \"--nicpromisc2\", \"allow-all\"]  # Suricata ve toda la LAN\n    end\n    m.vm.provision \"shell\", path: \"provision/siem.sh\", args: [WAZUH_BRANCH]\n  end\n\n  # ---------- SRVWEB: víctima LAMP ----------\n  config.vm.define \"srvweb\" do |m|\n    m.vm.box      = \"bento/ubuntu-22.04\"\n    m.vm.hostname = \"srvweb\"\n    m.vm.network \"private_network\", ip: \"10.10.10.30\", virtualbox__intnet: LAN\n    m.vm.network \"private_network\", ip: \"192.168.56.30\"\n    m.vm.provider \"virtualbox\" do |vb|\n      vb.name   = \"lab-srvweb\"\n      vb.memory = 1024\n      vb.cpus   = 1\n    end\n    m.vm.provision \"shell\", path: \"provision/srvweb.sh\", args: [WAZUH_AGENT_VER]\n  end\n\n  # ---------- WIN10: víctima Windows ----------\n  config.vm.define \"win10\", autostart: false do |m|\n    m.vm.box          = \"gusztavvargadr/windows-10\"\n    m.vm.hostname     = \"win10\"\n    m.vm.guest        = :windows\n    m.vm.communicator = \"winrm\"\n    m.vm.network \"private_network\", ip: \"10.10.10.20\", virtualbox__intnet: LAN\n    m.vm.network \"private_network\", ip: \"192.168.56.20\"\n    m.vm.provider \"virtualbox\" do |vb|\n      vb.name   = \"lab-win10\"\n      vb.memory = 3072\n      vb.cpus   = 2\n      vb.gui    = true\n    end\n    m.vm.provision \"shell\", path: \"provision/win10.ps1\", args: [WAZUH_AGENT_VER]\n  end\n\n  # ---------- KALI: atacante ----------\n  config.vm.define \"kali\" do |m|\n    m.vm.box      = \"kalilinux/rolling\"\n    m.vm.hostname = \"kali\"\n    m.vm.network \"private_network\", ip: \"10.10.10.100\", virtualbox__intnet: LAN\n    m.vm.network \"private_network\", ip: \"192.168.56.100\"\n    m.vm.provider \"virtualbox\" do |vb|\n      vb.name   = \"lab-kali\"\n      vb.memory = 2048\n      vb.cpus   = 2\n      vb.gui    = true\n    end\n    m.vm.provision \"shell\", path: \"provision/kali.sh\"\n  end\nend\n",
  "siem.sh": "#!/usr/bin/env bash\n# provision/siem.sh — Wazuh all-in-one + Suricata\nset -euo pipefail\nBRANCH=\"${1:-4.14}\"\nexport DEBIAN_FRONTEND=noninteractive\nLAN_IF=$(ip -o -4 addr show | awk '/ 10\\.10\\.10\\./{print $2; exit}')\n\napt-get update\napt-get install -y curl software-properties-common\n\n# --- 1. Wazuh (indexer + manager + dashboard en una sola VM) ---\ncd /root\ncurl -sO \"https://packages.wazuh.com/${BRANCH}/wazuh-install.sh\"\nbash ./wazuh-install.sh -a -i | tee /root/wazuh-install.log   # -i: omite la comprobación de requisitos\ntar -O -xf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt > /vagrant/wazuh-passwords.txt\n\n# --- 2. Suricata escuchando en la LAN del laboratorio ---\nadd-apt-repository -y ppa:oisf/suricata-stable\napt-get update\napt-get install -y suricata\nCONF=/etc/suricata/suricata.yaml\nsed -i \"s|^\\(\\s*HOME_NET:\\).*|\\1 \\\"[10.10.10.0/24]\\\"|\" \"$CONF\"\nsed -i \"s|interface: eth0|interface: ${LAN_IF}|g\" \"$CONF\"\n[ -f /etc/default/suricata ] && sed -i \"s|^IFACE=.*|IFACE=${LAN_IF}|\" /etc/default/suricata\n\n# Reglas propias para las prácticas\nmkdir -p /etc/suricata/rules\ncat > /etc/suricata/rules/local.rules <<'EOF'\nalert icmp any any -> $HOME_NET any (msg:\"LAB ICMP echo hacia la LAN\"; itype:8; sid:1000001; rev:1;)\nalert tcp any any -> $HOME_NET 22 (msg:\"LAB intento de conexion SSH\"; flags:S; sid:1000002; rev:1;)\nEOF\ngrep -q local.rules \"$CONF\" || sed -i 's|^\\(\\s*\\)- suricata.rules|\\1- suricata.rules\\n\\1- /etc/suricata/rules/local.rules|' \"$CONF\"\nsuricata-update\nsystemctl enable suricata && systemctl restart suricata\n\n# --- 3. Wazuh lee las alertas de Suricata ---\ngrep -q suricata/eve.json /var/ossec/etc/ossec.conf || cat >> /var/ossec/etc/ossec.conf <<'EOF'\n\n<ossec_config>\n  <localfile>\n    <log_format>json</log_format>\n    <location>/var/log/suricata/eve.json</location>\n  </localfile>\n</ossec_config>\nEOF\nsystemctl restart wazuh-manager\necho \"SIEM listo: https://192.168.56.10 (credenciales en labcyber/wazuh-passwords.txt)\"\n",
  "srvweb.sh": "#!/usr/bin/env bash\n# provision/srvweb.sh — LAMP + DVWA + usuario débil SSH + agente Wazuh\nset -euo pipefail\nAGENT_VER=\"${1:-4.14.0-1}\"\nexport DEBIAN_FRONTEND=noninteractive\n\n# --- 1. Pila LAMP ---\napt-get update\napt-get install -y apache2 mariadb-server php php-mysqli php-gd libapache2-mod-php git curl gnupg\n\n# --- 2. DVWA (instalada en Apache, no en contenedor) ---\n[ -d /var/www/html/dvwa ] || git clone --depth 1 https://github.com/digininja/DVWA.git /var/www/html/dvwa\ncp /var/www/html/dvwa/config/config.inc.php.dist /var/www/html/dvwa/config/config.inc.php\nmysql -e \"CREATE DATABASE IF NOT EXISTS dvwa;\n  CREATE USER IF NOT EXISTS 'dvwa'@'localhost' IDENTIFIED BY 'p@ssw0rd';\n  GRANT ALL ON dvwa.* TO 'dvwa'@'localhost'; FLUSH PRIVILEGES;\"\nsed -i 's/^allow_url_include = .*/allow_url_include = On/' /etc/php/*/apache2/php.ini\nchown -R www-data:www-data /var/www/html/dvwa\nsystemctl restart apache2\n\n# --- 3. Usuario con contraseña débil para la fuerza bruta SSH ---\nid empleado &>/dev/null || useradd -m -s /bin/bash empleado\necho 'empleado:123456' | chpasswd\necho 'PasswordAuthentication yes' > /etc/ssh/sshd_config.d/00-lab.conf\nsystemctl restart ssh\n\n# --- 4. Agente Wazuh (misma versión o menor que el manager) ---\ncurl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import\nchmod 644 /usr/share/keyrings/wazuh.gpg\necho \"deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main\" > /etc/apt/sources.list.d/wazuh.list\napt-get update\nWAZUH_MANAGER=\"10.10.10.10\" WAZUH_AGENT_NAME=\"srvweb\" apt-get install -y \"wazuh-agent=${AGENT_VER}\"\napt-mark hold wazuh-agent\n\n# Logs de Apache hacia Wazuh\ngrep -q apache2/access.log /var/ossec/etc/ossec.conf || cat >> /var/ossec/etc/ossec.conf <<'EOF'\n\n<ossec_config>\n  <localfile>\n    <log_format>apache</log_format>\n    <location>/var/log/apache2/access.log</location>\n  </localfile>\n  <localfile>\n    <log_format>apache</log_format>\n    <location>/var/log/apache2/error.log</location>\n  </localfile>\n</ossec_config>\nEOF\nsystemctl daemon-reload\nsystemctl enable --now wazuh-agent\necho \"srvweb listo: http://192.168.56.30/dvwa/setup.php\"\n",
  "win10.ps1": "# provision/win10.ps1 — Sysmon + agente Wazuh\nparam([string]$AgentVer = \"4.14.0-1\")\n$ErrorActionPreference = \"Stop\"\n[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12\n$tmp = \"C:\\lab\"; New-Item -ItemType Directory -Force $tmp | Out-Null\n\n# --- 1. Permitir ping desde la LAN del laboratorio ---\nif (-not (Get-NetFirewallRule -DisplayName \"LAB ICMPv4 entrada\" -ErrorAction SilentlyContinue)) {\n  New-NetFirewallRule -DisplayName \"LAB ICMPv4 entrada\" -Protocol ICMPv4 -IcmpType 8 `\n    -Direction Inbound -Action Allow -RemoteAddress 10.10.10.0/24 | Out-Null\n}\n\n# --- 2. Sysmon con la configuración de SwiftOnSecurity ---\nInvoke-WebRequest https://download.sysinternals.com/files/Sysmon.zip -OutFile \"$tmp\\Sysmon.zip\" -UseBasicParsing\nExpand-Archive \"$tmp\\Sysmon.zip\" -DestinationPath \"$tmp\\Sysmon\" -Force\nInvoke-WebRequest https://raw.githubusercontent.com/SwiftOnSecurity/sysmon-config/master/sysmonconfig-export.xml -OutFile \"$tmp\\sysmonconfig.xml\" -UseBasicParsing\n& \"$tmp\\Sysmon\\Sysmon64.exe\" -accepteula -i \"$tmp\\sysmonconfig.xml\"\n\n# --- 3. Agente Wazuh ---\nInvoke-WebRequest \"https://packages.wazuh.com/4.x/windows/wazuh-agent-$AgentVer.msi\" -OutFile \"$tmp\\wazuh-agent.msi\" -UseBasicParsing\nStart-Process msiexec.exe -Wait -ArgumentList \"/i $tmp\\wazuh-agent.msi /q WAZUH_MANAGER=10.10.10.10 WAZUH_AGENT_NAME=win10\"\n\n# Eventos de Sysmon hacia Wazuh\n$conf = \"C:\\Program Files (x86)\\ossec-agent\\ossec.conf\"\nif (-not (Select-String -Path $conf -Pattern \"Sysmon/Operational\" -Quiet)) {\n  Add-Content $conf @\"\n\n<ossec_config>\n  <localfile>\n    <location>Microsoft-Windows-Sysmon/Operational</location>\n    <log_format>eventchannel</log_format>\n  </localfile>\n</ossec_config>\n\"@\n}\nRestart-Service WazuhSvc -ErrorAction SilentlyContinue\nif ((Get-Service WazuhSvc).Status -ne \"Running\") { Start-Service WazuhSvc }\nWrite-Host \"win10 lista\"\n",
  "kali.sh": "#!/usr/bin/env bash\n# provision/kali.sh — herramientas del atacante\nset -euo pipefail\nexport DEBIAN_FRONTEND=noninteractive\n\n# Clave del repositorio de Kali (las boxes antiguas traen la clave caducada)\nwget -q https://archive.kali.org/archive-keyring.gpg -O /usr/share/keyrings/kali-archive-keyring.gpg\n\napt-get update\napt-get install -y -o Dpkg::Options::=\"--force-confold\" \\\n  nmap hydra hping3 sqlmap nikto wordlists curl tcpdump\n\n# Diccionario rockyou descomprimido (t2.3)\n[ -f /usr/share/wordlists/rockyou.txt ] || gunzip -k /usr/share/wordlists/rockyou.txt.gz\n\n# Nombres de las máquinas del laboratorio\ngrep -q \"10.10.10.30  srvweb\" /etc/hosts || cat >> /etc/hosts <<'EOF'\n10.10.10.10  siem\n10.10.10.20  win10\n10.10.10.30  srvweb\nEOF\necho \"kali listo\"\n",
  "README.md": "# Laboratorio MP5021 — labcyber (Vagrant + VirtualBox)\n\n| VM | Rol | LAN labcyber-lan | Gestión host-only |\n|---|---|---|---|\n| siem | Wazuh all-in-one + Suricata | 10.10.10.10 | 192.168.56.10 |\n| win10 | Víctima Windows + Sysmon (autostart: false) | 10.10.10.20 | 192.168.56.20 |\n| srvweb | Víctima LAMP + DVWA | 10.10.10.30 | 192.168.56.30 |\n| kali | Atacante | 10.10.10.100 | 192.168.56.100 |\n\n## Puesta en marcha\n```bash\ncd labcyber\nvagrant validate\nvagrant up siem          # primero el manager (15-25 min)\nvagrant up srvweb kali\nvagrant up win10         # solo si hace falta\n```\n\n- Panel Wazuh: https://192.168.56.10 — usuario `admin`, contraseña en `wazuh-passwords.txt` (se crea en esta carpeta).\n- DVWA: http://192.168.56.30/dvwa/setup.php → Create/Reset Database → login `admin` / `password`.\n- Usuario SSH débil en srvweb: `empleado` / `123456`.\n- Kali y win10: `vagrant` / `vagrant`.\n\n## Antes de usar\n- Comprueba la versión de Wazuh en https://documentation.wazuh.com/current/quickstart.html y ajusta\n  `WAZUH_BRANCH` y `WAZUH_AGENT_VER` al principio del Vagrantfile (el agente nunca mayor que el manager).\n- Los `.sh` deben tener finales de línea LF (si los editas en Windows).\n\n## Snapshots\n```bash\nvagrant halt\nvagrant snapshot save siem base-limpia    # repetir para srvweb, kali, win10\nvagrant snapshot restore srvweb base-limpia\n```\n\nManual completo: documento «Manual Vagrant – Laboratorio MP5021».\n"
 },
 "vms": [
  [
   "siem",
   "Wazuh all-in-one + Suricata",
   "bento/ubuntu-22.04",
   "10.10.10.10",
   "192.168.56.10",
   "5 GB / 2"
  ],
  [
   "srvweb",
   "Víctima LAMP + DVWA",
   "bento/ubuntu-22.04",
   "10.10.10.30",
   "192.168.56.30",
   "1 GB / 1"
  ],
  [
   "win10",
   "Víctima Windows + Sysmon",
   "gusztavvargadr/windows-10",
   "10.10.10.20",
   "192.168.56.20",
   "3 GB / 2"
  ],
  [
   "kali",
   "Atacante / forense",
   "kalilinux/rolling",
   "10.10.10.100",
   "192.168.56.100",
   "2 GB / 2"
  ]
 ],
 "install": [
  [
   "bash",
   "anfitrión Ubuntu/Debian — instalar Vagrant",
   "wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg\necho \"deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main\" | sudo tee /etc/apt/sources.list.d/hashicorp.list\nsudo apt update && sudo apt install -y vagrant"
  ],
  [
   "check",
   "comprobar la instalación",
   "vagrant --version\nVBoxManage --version"
  ],
  [
   "hyperv",
   "anfitrión Windows — PowerShell como administrador, y reiniciar",
   "bcdedit /set hypervisorlaunchtype off\nDisable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All"
  ],
  [
   "boxes",
   "descargar las boxes con antelación",
   "vagrant box add bento/ubuntu-22.04 --provider virtualbox\nvagrant box add kalilinux/rolling --provider virtualbox\nvagrant box add gusztavvargadr/windows-10 --provider virtualbox"
  ]
 ],
 "cmds": [
  [
   "vagrant status",
   "Estado de cada VM (running, poweroff, not created)"
  ],
  [
   "vagrant up siem",
   "Crea o arranca siem; la primera vez también la provisiona"
  ],
  [
   "vagrant ssh kali",
   "Abre una sesión SSH en kali"
  ],
  [
   "vagrant halt srvweb",
   "Apaga srvweb ordenadamente"
  ],
  [
   "vagrant reload siem",
   "Reinicia y aplica cambios de red/RAM del Vagrantfile"
  ],
  [
   "vagrant provision srvweb",
   "Vuelve a ejecutar los scripts de configuración"
  ],
  [
   "vagrant snapshot save siem base",
   "Guarda una instantánea llamada base"
  ],
  [
   "vagrant snapshot restore siem base",
   "Vuelve a esa instantánea"
  ],
  [
   "vagrant snapshot list",
   "Lista las instantáneas"
  ],
  [
   "vagrant destroy -f win10",
   "Borra la VM (la box sigue descargada)"
  ],
  [
   "vagrant box list / vagrant box prune",
   "Lista boxes / borra versiones antiguas"
  ],
  [
   "vagrant global-status --prune",
   "Todas las VMs de Vagrant del equipo"
  ]
 ],
 "first": "vagrant init bento/ubuntu-22.04   # crea un Vagrantfile mínimo\nvagrant up                        # descarga la box si falta y arranca la VM\nvagrant ssh                       # entra en la VM (usuario vagrant)\nexit\nvagrant destroy -f                # borra la VM",
 "tree": "labcyber/\n├── Vagrantfile\n├── README.md\n└── provision/\n    ├── siem.sh      # Wazuh all-in-one + Suricata\n    ├── srvweb.sh    # LAMP + DVWA + agente Wazuh + usuario débil SSH\n    ├── win10.ps1    # Sysmon + agente Wazuh\n    └── kali.sh      # herramientas y diccionarios",
 "per": [
  {
   "n": "siem",
   "t": "Wazuh all-in-one + Suricata",
   "ca": "provision/siem.sh · 15–25 min",
   "file": "siem.sh",
   "steps": [
    "Levanta la máquina: <code>vagrant up siem</code>. El instalador de Wazuh es la parte lenta.",
    "Al terminar aparece <code>wazuh-passwords.txt</code> en la carpeta <code>labcyber/</code> del anfitrión. Busca el usuario <code>admin</code>.",
    "Abre <span class=\"mono ip\">https://192.168.56.10</span> en el navegador del anfitrión, acepta el certificado autofirmado y entra con <code>admin</code>.",
    "Comprueba los servicios con los comandos de abajo."
   ],
   "check": "vagrant ssh siem\nsudo systemctl status wazuh-manager wazuh-indexer wazuh-dashboard suricata --no-pager\nsudo suricata -T -c /etc/suricata/suricata.yaml    # \"Configuration provided was successfully loaded\"\nip -br a                                           # nombre real de la interfaz 10.10.10.10",
   "note": "<code>wazuh-passwords.txt</code> queda en la carpeta compartida para comodidad del aula. Fuera del laboratorio sería una mala práctica, y puede comentarse con el alumnado como tal."
  },
  {
   "n": "srvweb",
   "t": "LAMP + DVWA + agente Wazuh",
   "ca": "provision/srvweb.sh · 5 min",
   "file": "srvweb.sh",
   "steps": [
    "Con <code>siem</code> ya en marcha: <code>vagrant up srvweb</code>.",
    "Desde el anfitrión abre <span class=\"mono ip\">http://192.168.56.30/dvwa/setup.php</span> y pulsa <b>Create / Reset Database</b>.",
    "Entra en <span class=\"mono ip\">http://192.168.56.30/dvwa/</span> con <code>admin</code> / <code>password</code> y ajusta <b>DVWA Security</b> al nivel de la actividad.",
    "Comprueba desde <code>siem</code> que el agente se ha registrado."
   ],
   "check": "vagrant ssh siem -c \"sudo /var/ossec/bin/agent_control -l\"   # debe listar srvweb como Active",
   "note": "Al instalar DVWA directamente en Apache, <code>access.log</code> está en la propia VM y el agente lo lee sin montar volúmenes: desaparece el problema del log dentro del contenedor de la UD2."
  },
  {
   "n": "win10",
   "t": "Víctima Windows con Sysmon y agente Wazuh",
   "ca": "provision/win10.ps1 · 20–30 min",
   "file": "win10.ps1",
   "steps": [
    "<code>vagrant up win10</code>. Se abre la ventana de la VM; usuario <code>vagrant</code> / <code>vagrant</code>.",
    "Comprueba en PowerShell dentro de la VM con los comandos de abajo.",
    "En el panel de Wazuh, <b>Agents</b> debe mostrar <code>win10</code> activo, y en <b>Threat Hunting</b> aparecen eventos de <code>Microsoft-Windows-Sysmon</code>."
   ],
   "check": "ipconfig | findstr 10.10.10          # debe mostrar 10.10.10.20\nGet-Service Sysmon64, WazuhSvc      # ambos Running\nGet-WinEvent -LogName \"Microsoft-Windows-Sysmon/Operational\" -MaxEvents 5",
   "note": "La box usa una licencia de evaluación que caduca. Si deja de activarse: <code>vagrant destroy -f win10</code> y volver a crearla."
  },
  {
   "n": "kali",
   "t": "Atacante",
   "ca": "provision/kali.sh · 10–15 min",
   "file": "kali.sh",
   "steps": [
    "<code>vagrant up kali</code>. Se abre el escritorio Xfce; usuario <code>vagrant</code> / <code>vagrant</code>.",
    "Comprueba conectividad y herramientas desde un terminal de Kali.",
    "No se hace <code>apt full-upgrade</code> en clase: descarga varios GB y rompe la homogeneidad entre puestos."
   ],
   "check": "ip -br a                          # 10.10.10.100 en una interfaz\nping -c 2 srvweb\nnmap -sV 10.10.10.30              # 22/ssh y 80/http abiertos\nls -lh /usr/share/wordlists/rockyou.txt",
   "note": "El script reinstala la clave del repositorio de Kali porque las boxes antiguas la traen caducada y <code>apt update</code> falla."
  }
 ],
 "start": "cd labcyber\nvagrant validate          # revisa la sintaxis del Vagrantfile\nvagrant up siem           # 1º el manager\nvagrant up srvweb kali    # 2º víctima Linux y atacante\nvagrant up win10          # 3º solo si el puesto va sobrado o la actividad lo pide\nvagrant status",
 "e2e": [
  [
   "1",
   "kali",
   "<code>ping -c 3 10.10.10.10</code> y <code>ping -c 3 10.10.10.30</code>",
   "Responden todas las IPs de la LAN"
  ],
  [
   "2",
   "siem",
   "<code>sudo /var/ossec/bin/agent_control -l</code>",
   "<code>srvweb</code> (y <code>win10</code>) en estado Active"
  ],
  [
   "3",
   "kali",
   "<code>sudo hping3 --icmp --fast -c 20 10.10.10.30</code>",
   "Alertas de Suricata en Wazuh: «LAB ICMP echo hacia la LAN»"
  ],
  [
   "4",
   "kali",
   "<code>hydra -l empleado -P /usr/share/wordlists/rockyou.txt -t 4 ssh://10.10.10.30</code>",
   "Hydra encuentra <code>123456</code>; Wazuh muestra la regla 5763 de fuerza bruta SSH en <code>srvweb</code>"
  ]
 ],
 "snap": "vagrant halt\nvagrant snapshot save siem   base-limpia\nvagrant snapshot save srvweb base-limpia\nvagrant snapshot save kali   base-limpia\nvagrant snapshot save win10  base-limpia\n\n# Al terminar una práctica\nvagrant snapshot restore srvweb base-limpia",
 "iso": "VBoxManage controlvm lab-srvweb setlinkstate1 off   # desconecta la NAT\nVBoxManage controlvm lab-srvweb setlinkstate1 on    # la vuelve a conectar",
 "trouble": [
  [
   "<code>VT-x is not available</code> o la VM no arranca",
   "Virtualización desactivada en BIOS, o Hyper-V activo",
   "Activar VT-x/AMD-V; desactivar Hyper-V"
  ],
  [
   "<code>Timed out while waiting for the machine to boot</code>",
   "Equipo lento o primer arranque de Windows",
   "Repetir <code>vagrant up &lt;vm&gt;</code>; si sigue, <code>vagrant reload &lt;vm&gt;</code>"
  ],
  [
   "IP host-only «not within the allowed ranges»",
   "VirtualBox 7 solo admite 192.168.56.0/21",
   "Usar 192.168.56.x, o añadir <code>* 0.0.0.0/0</code> en <code>/etc/vbox/networks.conf</code>"
  ],
  [
   "<code>/usr/bin/env: 'bash\\r'</code>",
   "Scripts <code>.sh</code> con finales CRLF",
   "Convertir a LF y <code>vagrant provision &lt;vm&gt;</code>"
  ],
  [
   "Wazuh se detiene o el panel no carga",
   "Poca RAM o descarga interrumpida",
   "Subir <code>siem</code> a 6 GB; <code>vagrant destroy -f siem &amp;&amp; vagrant up siem</code>"
  ],
  [
   "El agente no aparece en Wazuh",
   "<code>siem</code> apagado al provisionar, agente más nuevo que el manager o puertos 1514/1515",
   "<code>nc -zv 10.10.10.10 1514</code>; revisar <code>ossec.log</code>; corregir <code>WAZUH_AGENT_VER</code>"
  ],
  [
   "Suricata no genera alertas",
   "Interfaz mal detectada o sin modo promiscuo",
   "Revisar <code>interface:</code> en <code>suricata.yaml</code>; <code>vagrant reload siem</code>"
  ],
  [
   "<code>win10</code> sin IP 10.10.10.20",
   "Vagrant no pudo configurarla por WinRM",
   "<code>New-NetIPAddress -InterfaceAlias \"Ethernet 2\" -IPAddress 10.10.10.20 -PrefixLength 24</code>"
  ],
  [
   "<code>apt update</code> falla en Kali por firma",
   "Clave del repositorio caducada",
   "Ya lo corrige <code>kali.sh</code>"
  ],
  [
   "Disco lleno en el anfitrión",
   "Boxes antiguas y VMs huérfanas",
   "<code>vagrant box prune</code> y <code>vagrant global-status --prune</code>"
  ]
 ]
};
