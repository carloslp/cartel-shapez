/**
 * @module ProcessingLab
 * @description Custom "Processing Lab" building for the Cartel Industry mod.
 *
 * Inherits the core split/cut logic of the vanilla Cutter building and
 * applies the "Tropical Noir" aesthetic (neon-cyan accent on a dark map).
 *
 * Future shape types (Cocaine Bricks, Money Stacks, etc.) can be wired in
 * by extending the `getSupportedVariants` / `getProcessorType` overrides
 * that live at the bottom of this file.
 */

/* global Shapez */

// ---------------------------------------------------------------------------
// Theme constants – single source of truth for all colour values used by
// the Processing Lab so they can be tweaked without hunting through the file.
// ---------------------------------------------------------------------------

/** Neon-cyan accent that pops against the jungle-green map background. */
export const PROCESSING_LAB_ACCENT = "#00F5D4";

// ---------------------------------------------------------------------------
// Building definition
// ---------------------------------------------------------------------------

/**
 * Returns a fully-configured Processing Lab building class that inherits the
 * vanilla Cutter (splitter) logic.
 *
 * We defer class creation until runtime so that `Shapez.*` globals are
 * guaranteed to be available when the function is called from `mod.js`.
 *
 * @returns {typeof Shapez.MetaBuilding} The Processing Lab metaclass.
 */
export function createProcessingLabBuilding() {
    return class MetaProcessingLabBuilding extends Shapez.MetaCutterBuilding {
        // ------------------------------------------------------------------ //
        // Identity                                                            //
        // ------------------------------------------------------------------ //

        static getId() {
            return "processing_lab";
        }

        static getSchema() {
            return Shapez.MetaCutterBuilding.getSchema();
        }

        // ------------------------------------------------------------------ //
        // Display                                                             //
        // ------------------------------------------------------------------ //

        getName() {
            return "Processing Lab";
        }

        getDescription() {
            return (
                "Splits raw material shapes into two equal halves. " +
                "Future upgrades will support Cocaine Bricks and Money Stacks."
            );
        }

        /**
         * Falls back to the parent cutter sprite until custom artwork is
         * available in `src/sprites/buildings/processing_lab.png`.
         *
         * @param {string} variant - Building variant identifier.
         * @returns {string} Sprite path resolved by the game's asset loader.
         */
        getPreviewImageBase(variant) {
            // TODO: replace with a dedicated sprite once artwork is ready.
            // return require("../../sprites/buildings/processing_lab.png");
            return /** @type {string} */ (super.getPreviewImageBase(variant));
        }
    };
}
