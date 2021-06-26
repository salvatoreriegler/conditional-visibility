import { ConditionalVisibilityFacade } from '../ConditionalVisibilityFacade';
import { DefaultConditionalVisibilitySystem } from "./DefaultConditionalVisibilitySystem";
import { getCanvas, MODULE_NAME, StatusEffect } from '../settings';
import { i18n } from '../../conditional-visibility';

/**
 * Conditional visibility system for dnd5e.  Uses the same base conditions, plus adds hidden, which compares
 * stealth with passive perception.
 */
export class ConditionalVisibilitySystem5e extends DefaultConditionalVisibilitySystem {

    BASE_EFFECTS = new Array<StatusEffect> (
        {
            id: MODULE_NAME + '.invisible',
            visibilityId: 'invisible',
            label:  game.i18n.localize(MODULE_NAME+'.invisible'),
            icon:'modules/'+MODULE_NAME+'/icons/unknown.svg'
        }, {
            id: MODULE_NAME + '.obscured',
            visibilityId: 'obscured',
            label:  game.i18n.localize(MODULE_NAME+'.obscured'),
            icon: 'modules/'+MODULE_NAME+'/icons/foggy.svg',
         }, {
            id: MODULE_NAME + '.indarkness',
            visibilityId: 'indarkness',
            label:  game.i18n.localize(MODULE_NAME+'.indarkness'),
            icon: 'modules/'+MODULE_NAME+'/icons/moon.svg'
        }
    );

    async onCreateActiveEffect(effect, options, userId) {
        const status = this.getEffectByIcon(effect);
        if (status) {
            const actor = effect.parent;
            await actor.setFlag(MODULE_NAME, status.visibilityId, true);
        }
    }

    async onDeleteActiveEffect(effect, options, userId) {
        const status = this.getEffectByIcon(effect);
        if (status) {
            const actor = effect.parent;
            await actor.unsetFlag(MODULE_NAME, status.visibilityId, true);
        }
    }

    /**
     * Use the base conditions, plus set up the icon for the "hidden" condition
     */
    effects() {
        const effects = super.effects();
        effects.push(
            {
                id: MODULE_NAME + '.hidden',
                visibilityId: 'hidden',
                label: i18n(MODULE_NAME + '.hidden'),
                icon: 'modules/' + MODULE_NAME + '/icons/newspaper.svg'
            }
        );
        return effects;
    }

    gameSystemId() {
        return "dnd5e";
    }

    initializeHooks(facade) {
        Hooks.on('createChatMessage', (message, jQuery, speaker) => {
            if (game.settings.get(MODULE_NAME, "autoStealth") === true && message.data.flags.dnd5e
                && message.data.flags.dnd5e.roll
                && message.data.flags.dnd5e.roll.skillId === 'ste') {
                if (message.data.speaker.token) {
                    const tokenId = message.data.speaker.token;
                    const token = getCanvas().tokens.placeables.find(tok => tok.id === tokenId);
                    if (token && token.owner) {
                        facade.hide([token], message._roll.total);
                    }
                }
            }
        });
    }

    /**
     * Get the base vision capabilities, and add the maximum passive perception for any token in the list.
     * @param srcTokens tokens whos abilities to test
     */
    getVisionCapabilities(srcTokens: Token[]):any {
        const flags = super.getVisionCapabilities(srcTokens);
        //@ts-ignore
        flags.prc = Math.max(...srcTokens.map(sTok => {
            if (sTok.actor && sTok.actor.data && sTok.actor.data.data.skills.prc.passive) {
                return sTok.actor.data.data.skills.prc.passive;
            }
            return -1;
        }));
        return flags;
    }
    /**
     * Override seeContested to compare any available stealth with the passive perception calculated in getVisionCapabilities
     * @param target the toekn to try and see
     * @param flags the flags calculated from getVisionCapabilities
     */
    seeContested(target: Token, visionCapabilities: any): boolean {

        const hidden = this.hasStatus(target, 'hidden');
        if (hidden === true) {
            //@ts-ignore
            const actor = target.actor;
            //@ts-ignore
            if (actor.data.flags[MODULE_NAME] && actor.data.flags[MODULE_NAME]._ste) {
                //@ts-ignore
                const stealth = actor.data.flags[MODULE_NAME]._ste;
                if (visionCapabilities.prc < stealth) {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }

    initializeOnToggleEffect(tokenHud) {
    
        const realOnToggleEffect = tokenHud._onToggleEffect.bind(tokenHud);

        tokenHud._onToggleEffect = (event, opts) => {
            const icon = event.currentTarget;
            if (icon.src.endsWith('newspaper.svg')) {
                const object = tokenHud.object;
                if (icon.className.indexOf('active') < 0) {
                    this.stealthHud(object).then(result => {
                        if (!object.data.flags) {
                            object.data.flags = {};
                        }
                        if (!object.data.flags[MODULE_NAME]) {
                            object.data.flags[MODULE_NAME] = {};
                        }
                        //object.setFlag(MODULE_NAME, "_ste", result);
                        if (object.actor) {
                            if (!object.actor.data) {
                                object.actor.data = {};
                            }
                            if (!object.actor.data.flags) {
                                object.actor.data.flags = {};
                            }
                            if (!object.actor.data.flags[MODULE_NAME]) {
                                object.actor.data.flags[MODULE_NAME] = {};
                            }
                            object.actor.setFlag(MODULE_NAME, "_ste", result);
                        }
                        return realOnToggleEffect(event, opts);
                    });
                } else {
                    if (object.getFlag(MODULE_NAME, "_ste")) {
                        object.unsetFlag(MODULE_NAME, "_ste");
                    }
                    if (object.actor && object.actor.getFlag(MODULE_NAME, "_ste")) {
                        object.actor.unsetFlag(MODULE_NAME, "_ste");
                    }
                    return realOnToggleEffect(event, opts);
                }
                return false;
            } else {
                return realOnToggleEffect(event, opts);
            }
        }
    }

    hasStealth() {
        return true;
    }

    rollStealth(token:Token):Roll {
        if (token && token.actor) {
            return new Roll("1d20 + (" + token.actor.data.data.skills.ste.total + ")");
        } else {
            return super.rollStealth(token);
        }
        
    }
}
