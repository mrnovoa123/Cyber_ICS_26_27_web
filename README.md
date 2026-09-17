# MP5021 Incidentes de Ciberseguridade — Laboratorio

Paquete con la web del módulo (incluida la nueva sección «Manual Vagrant») y los ficheros para montar el laboratorio.

```
MP5021_laboratorio/
├── web/                  Web estática (abrir index.html o desplegar en Vercel)
│   ├── index.html        Estructura y estilos
│   ├── app.js            Renderizado de secciones (incluye vagrantSection)
│   ├── data.js           Contenido: laboratorio, unidades, actividades, capa IA
│   ├── manual.js         Contenido del Manual Vagrant (datos y ficheros de configuración)
│   └── vercel.json
└── labcyber/             Laboratorio Vagrant + VirtualBox
    ├── Vagrantfile
    ├── README.md
    ├── .gitattributes
    └── provision/
        ├── siem.sh       Wazuh all-in-one + Suricata      10.10.10.10
        ├── srvweb.sh     LAMP + DVWA + agente Wazuh        10.10.10.30
        ├── win10.ps1     Sysmon + agente Wazuh             10.10.10.20
        └── kali.sh       Herramientas de ataque            10.10.10.100
```

## Web
- Local: abrir `web/index.html` en el navegador (las fuentes de Google necesitan conexión; sin ella se usan fuentes del sistema).
- Vercel: `cd web && vercel deploy` (o arrastrar la carpeta `web` al panel de Vercel).
- Para editar contenido: `data.js` (módulo) y `manual.js` (manual Vagrant).

## Cambios de esta versión
- Nueva sección **Manual Vagrant** (menú Entorno → VAG): instalación, comandos, Vagrantfile, configuración paso a paso de las 4 VMs, verificación de extremo a extremo, snapshots y problemas frecuentes.
- Aviso en «El laboratorio» que remite al manual (el Vagrantfile de esa sección es el esquema inicial).
- Fichero nuevo `manual.js`, cargado desde `index.html`.

## Laboratorio
Ver `labcyber/README.md`. Antes de preparar los puestos, comprobar la versión de Wazuh y ajustar
`WAZUH_BRANCH` / `WAZUH_AGENT_VER` en el Vagrantfile.
