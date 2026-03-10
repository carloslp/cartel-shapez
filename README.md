# Cartel Industry — shapez.io Mod

> A gritty 80s "Tropical Noir" logistics expansion inspired by **Cartel Tycoon**.

---

## Overview

**Cartel Industry** replaces the clean, clinical aesthetic of shapez.io with a dark, atmospheric jungle-noir theme and adds the first custom building: the **Processing Lab**.

| Feature | Detail |
|---|---|
| Mod ID | `cartel-industry` |
| Version | `1.0.0` |
| Minimum game version | `>=1.5.0` |
| Entry point | `mod.js` |

---

## Visual Theme

| Element | Value |
|---|---|
| Map background | `#0D1109` (deep jungle green) |
| Grid lines | `rgba(20, 30, 15, 0.5)` (dark olive, semi-transparent) |
| Processing Lab accent | `#00F5D4` (neon cyan) |

All theme tokens are defined in `src/css/cartel_theme.css` (`:root` block) and as constants at the top of `mod.js` / `src/buildings/processing_lab.js`.

---

## Buildings

### Processing Lab (`processing_lab`)

Inherits the split/cut logic of the vanilla **Cutter** building.  Drop it next to the Cutter in the regular toolbar.

Future upgrades will add dedicated processing modes for:

- **Cocaine Bricks** *(planned)*
- **Money Stacks** *(planned)*

---

## Project Structure

```
cartel-shapez/
├── mod.js                          # Main entry point – CartelIndustryMod class
├── package.json                    # Mod metadata & dev tooling
├── README.md
└── src/
    ├── buildings/
    │   └── processing_lab.js       # Processing Lab building definition
    ├── css/
    │   └── cartel_theme.css        # "Tropical Noir" CSS theme
    └── sprites/                    # Placeholder – add artwork here
```

---

## Installation

1. Copy the entire `cartel-shapez/` folder into your shapez.io **mods** directory.
2. Launch shapez.io and navigate to **Settings → Mods**.
3. Enable **Cartel Industry** and restart the game.

---

## Development

```bash
# Install dev dependencies (ESLint)
npm install

# Lint the mod source
npm run lint
```

---

## Extending the Mod

### Adding a new shape type

1. Create a sprite in `src/sprites/shapes/`.
2. Register it in `mod.js → _registerSprites()` (see the commented-out examples).
3. Add a CSS icon override in `src/css/cartel_theme.css` under the *"Future shape types"* section.
4. Wire up the new processing mode in `src/buildings/processing_lab.js`.

### Adding a new building

1. Create `src/buildings/<building_id>.js` following the pattern in `processing_lab.js`.
2. Import and call `this._registerBuildings()` additions in `mod.js`.

---

## License

MIT
