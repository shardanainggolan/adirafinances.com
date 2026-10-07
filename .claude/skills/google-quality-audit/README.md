# Google Quality Audit · skill para Claude y Codex

Skill de Nacho Mascort (https://nachomascort.com) para auditar páginas, plantillas o secciones con los criterios de quality de Google: los cuatro pilares de las Quality Rater Guidelines, el contenido commodity y las señales de quality del leak de Google.

## Instalación

**Claude.ai / app de escritorio:** Settings → Capabilities → Skills → Upload skill, y sube el archivo `google-quality-audit.zip`.

**Claude Code:** descomprime la carpeta en `~/.claude/skills/google-quality-audit/` (o en `.claude/skills/` dentro de tu proyecto).

**Codex:** descomprime la carpeta en `~/.codex/skills/google-quality-audit/` y reinicia Codex.

## Cómo usarla

Pídele a Claude o a Codex algo como:

- "Audita la quality de esta URL: https://..."
- "Esta es mi plantilla de fichas de ciudad (te pego el texto). ¿Es contenido commodity?"
- "Caímos un 20 % en el último core update. Estas son nuestras secciones y cuántas páginas tiene cada una. ¿Por dónde empiezo?"

Te devuelve un veredicto, la puntuación de cada pilar con evidencias, el test de commodity, las red flags y las acciones prioritarias. Cada señal del leak va marcada como documentada, inferencia o hipótesis.

---

# Google Quality Audit · skill for Claude and Codex

By Nacho Mascort. Install on Claude.ai via Settings → Capabilities → Skills → Upload skill, unzip into `~/.claude/skills/google-quality-audit/` for Claude Code, or into `~/.codex/skills/google-quality-audit/` for Codex. Then ask it to audit a URL, a template or a site section.
