/**
 * @file mod.js
 * @description Cartel Industry – main mod entry point.
 *
 * This file bootstraps the "Cartel Industry" shapez.io mod.  It:
 *   • Declares mod metadata consumed by the game's mod loader.
 *   • Applies the "Tropical Noir" visual theme (map background + grid lines).
 *   • Registers the custom "Processing Lab" building.
 *   • Injects the mod's CSS theme sheet.
 *   • Provides placeholder hooks for custom sprites and future shape types
 *     (Cocaine Bricks, Money Stacks).
 *
 * Usage
 * -----
 * Drop this file (and the accompanying src/ directory) into the shapez.io
 * mods folder, then enable "Cartel Industry" from the in-game Mod Manager.
 *
 * Modding API reference:
 *   https://github.com/tobspr-games/shapez.io/blob/master/mod_examples/
 */

/* global Shapez */

import { createProcessingLabBuilding, PROCESSING_LAB_ACCENT } from "./src/buildings/processing_lab.js";

// ---------------------------------------------------------------------------
// Theme constants – single source of truth for all colour values so that
// future contributors can retheme the mod by editing one place.
// ---------------------------------------------------------------------------

/** Deep jungle green used as the map canvas background. */
const MAP_BG_COLOR = "#0D1109";

/** Dark, semi-transparent olive for map grid lines. */
const GRID_LINE_COLOR = "rgba(20, 30, 15, 0.5)";

// ---------------------------------------------------------------------------
// Mod class
// ---------------------------------------------------------------------------

/**
 * `CartelIndustryMod` is the root class for the Cartel Industry shapez.io mod.
 *
 * It extends `Shapez.Mod` and wires together:
 *   - Visual theme overrides (background + grid lines).
 *   - The "Processing Lab" custom building.
 *   - CSS injection and sprite placeholders.
 *
 * @extends {Shapez.Mod}
 */
class CartelIndustryMod extends Shapez.Mod {
    // ---------------------------------------------------------------------- //
    // Metadata                                                               //
    // ---------------------------------------------------------------------- //

    /**
     * Mod metadata consumed by the shapez.io mod loader.
     * These values appear in the in-game Mod Manager UI.
     *
     * @type {import("shapez/mods/mod").ModMetadata}
     */
    static get METADATA() {
        return {
            id: "cartel-industry",
            name: "Cartel Industry",
            version: "1.0.0",
            author: "Cartel Shapez Contributors",
            website: "https://github.com/carloslp/cartel-shapez",
            description:
                "A gritty 80s tropical logistics expansion inspired by Cartel Tycoon.",
            minimumGameVersion: ">=1.5.0",
        };
    }

    // ---------------------------------------------------------------------- //
    // Lifecycle                                                              //
    // ---------------------------------------------------------------------- //

    /**
     * Called once by the mod loader after the game engine is ready.
     * All registration and patching must happen here (or in helpers called
     * from here) – **not** in the constructor.
     */
    init() {
        // ------------------------------------------------------------------ //
        // 1. CSS – inject the Tropical Noir theme sheet first so that visual  //
        //    overrides applied later in this method have a consistent base.   //
        // ------------------------------------------------------------------ //
        this._injectThemeCss();

        // ------------------------------------------------------------------ //
        // 2. Visual overrides – hook into gameStarted to patch map colours.  //
        // ------------------------------------------------------------------ //
        this.signals.gameStarted.add(this._applyVisualOverrides.bind(this));

        // ------------------------------------------------------------------ //
        // 3. Buildings – register the Processing Lab.                        //
        // ------------------------------------------------------------------ //
        this._registerBuildings();

        // ------------------------------------------------------------------ //
        // 4. Sprites – placeholder; add real sprites here when artwork is    //
        //    ready (see src/sprites/).                                        //
        // ------------------------------------------------------------------ //
        this._registerSprites();
    }

    // ---------------------------------------------------------------------- //
    // Private helpers                                                        //
    // ---------------------------------------------------------------------- //

    /**
     * Injects `src/css/cartel_theme.css` into the document.
     *
     * The CSS file is loaded relative to this mod's root directory using
     * `this.modInterface.injectCss()` so the game's asset pipeline handles
     * caching and order-of-insertion automatically.
     *
     * @private
     */
    _injectThemeCss() {
        this.modInterface.injectCss(require("./src/css/cartel_theme.css"));
    }

    /**
     * Applies programmatic colour overrides that cannot be expressed in CSS
     * alone (map background canvas colour + WebGL grid line colour).
     *
     * This method is invoked via the `gameStarted` signal so the root game
     * state and map renderer are guaranteed to be initialised.
     *
     * @private
     * @param {import("shapez/game/root").GameRoot} root - The game root object.
     */
    _applyVisualOverrides(root) {
        // -- Map background --------------------------------------------------
        // The map renderer exposes `background` as a plain CSS colour string
        // that is applied to the WebGL canvas clear colour each frame.
        if (root.map && root.map.background !== undefined) {
            root.map.background = MAP_BG_COLOR;
        }

        // -- Grid lines ------------------------------------------------------
        // `gridLineColor` is read by the map renderer when drawing the tile
        // grid overlay.  Providing an rgba value retains transparency so the
        // background texture (if any) remains partially visible.
        if (root.map && root.map.gridLineColor !== undefined) {
            root.map.gridLineColor = GRID_LINE_COLOR;
        }
    }

    /**
     * Registers all custom buildings provided by this mod.
     *
     * Each building is created via a factory function so that it can safely
     * reference `Shapez.*` globals (which are only available at runtime, not
     * at module evaluation time).
     *
     * @private
     */
    _registerBuildings() {
        const MetaProcessingLabBuilding = createProcessingLabBuilding();

        this.modInterface.registerBuilding(MetaProcessingLabBuilding, {
            // Toolbar category – place beside the vanilla Cutter so players
            // can find it intuitively.
            toolbar: "regular",
            // Visual accent colour shown on the building icon and overlay.
            // Using the PROCESSING_LAB_ACCENT constant keeps this in sync
            // with the building's own definition.
            accentColor: PROCESSING_LAB_ACCENT,
        });

        // Add the building to the regular building toolbar so it appears
        // in the in-game build menu next to related buildings.
        this.modInterface.addNewBuildingToToolbar({
            toolbar: "regular",
            location: "secondary",
            metaClass: MetaProcessingLabBuilding,
        });
    }

    /**
     * Registers custom sprites (building icons, shape thumbnails, etc.).
     *
     * **Placeholder** – sprite files do not exist yet.  Uncomment and adjust
     * the paths below once artwork is available in `src/sprites/`.
     *
     * Sprite IDs must match the keys used by the game's sprite resolver.
     * Convention: `"sprites/buildings/<building_id>.png"`.
     *
     * @private
     */
    _registerSprites() {
        // -- Processing Lab building icon ------------------------------------
        // this.modInterface.registerSprite(
        //     "sprites/buildings/processing_lab.png",
        //     require("./src/sprites/buildings/processing_lab.png")
        // );

        // -- Future shape sprites -------------------------------------------
        // Uncomment when "Cocaine Bricks" shape is implemented:
        // this.modInterface.registerSprite(
        //     "sprites/shapes/cocaine_bricks.png",
        //     require("./src/sprites/shapes/cocaine_bricks.png")
        // );
        //
        // Uncomment when "Money Stacks" shape is implemented:
        // this.modInterface.registerSprite(
        //     "sprites/shapes/money_stacks.png",
        //     require("./src/sprites/shapes/money_stacks.png")
        // );
    }
}

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

// `registerMod` is the official entry-point expected by the shapez.io loader.
// The second argument is the METADATA object; the loader uses it to display
// the mod in the Mod Manager without needing to instantiate the class first.
Shapez.registerMod(CartelIndustryMod, CartelIndustryMod.METADATA);
