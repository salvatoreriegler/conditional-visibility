import { ConditionalVisibilityEffectDefinitions } from '../conditional-visibility-effect-definition';
import {
  AtcvEffectSenseFlags,
  AtcvEffectConditionFlags,
  SenseData,
  CVSkillData,
} from '../conditional-visibility-models';
import CONSTANTS from '../constants';
import type Effect from '../effects/effect';

/*
HP: data.hp.value
Perception: data.perception.value
Passive perception: data.perception.value + 10
Stealth: data.skills.ste
Stealth active: data.skills.ste.value
Stealth passive: data.skills.ste.value + 10
*/
export default {
  HP_ATTRIBUTE: 'data.hp.value',
  PERCEPTION_PASSIVE_SKILL: `data.perception.value`,
  STEALTH_PASSIVE_SKILL: `data.skills.ste.value`,
  STEALTH_ACTIVE_SKILL: `data.skills.ste.value`,
  // STEALTH_ID_SKILL: `data.skills.ste`,
  // STEALTH_ID_LANG_SKILL: `PF2E.SkillSte`, // SkillStealth
  PATH_ATTRIBUTES_SENSES: `data.attributes.senses`,
  NPC_TYPE: `npc`,
  SENSES: <SenseData[]>[
    {
      id: AtcvEffectSenseFlags.NONE,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.NONE}`,
      path: '',
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/light_01.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectSenseFlags.NORMAL,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.NORMAL}`,
      path: ``,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/light_02.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectSenseFlags.BLINDED,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.BLINDED}`,
      path: 'data.traits.senses.blinded',
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/affliction_24.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: true,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectSenseFlags.LOW_LIGHT_VISION,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.LOW_LIGHT_VISION}`,
      path: 'data.traits.senses.lowlightvision',
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/violet_09.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectSenseFlags.DARKVISION,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.DARKVISION}`,
      path: 'data.traits.senses.darkvision',
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/evil-eye-red-1.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectSenseFlags.GREATER_DARKVISION,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectSenseFlags.GREATER_DARKVISION}`,
      path: 'data.traits.senses.greaterdarkvision',
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/evil-eye-eerie-1.jpg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    // Skills sense
    {
      id: 'perception',
      name: 'PF2E.ActionsCheck.perception',
      path: ``,
      img: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/perception.svg`,
      conditionType: 'sense',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
  ],
  CONDITIONS: <SenseData[]>[
    {
      id: AtcvEffectConditionFlags.NONE,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.NONE}`,
      path: ``,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/light_01.jpg`,
      conditionType: 'condition',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectConditionFlags.STEALTHED,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.STEALTHED}`,
      path: ``, //`data.skills.ste.passive`,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/ae/blue_35.jpg`,
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectConditionFlags.HIDDEN,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.HIDDEN}`,
      path: ``,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/newspaper.jpg`,
      conditionType: 'condition',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectConditionFlags.INVISIBLE,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.INVISIBLE}`,
      path: undefined,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/unknown.jpg`,
      conditionType: 'condition',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectConditionFlags.OBSCURED,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.OBSCURED}`,
      path: undefined,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/foggy.jpg`,
      conditionType: 'condition',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    {
      id: AtcvEffectConditionFlags.IN_DARKNESS,
      name: `${CONSTANTS.MODULE_NAME}.${AtcvEffectConditionFlags.IN_DARKNESS}`,
      path: undefined,
      img: `modules/${CONSTANTS.MODULE_NAME}/icons/moon.jpg`,
      conditionType: 'condition',
      conditionSources: <string[]>[],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
    // Skills condition
    {
      id: 'stealth',
      name: 'PF2E.ActionsCheck.stealth',
      path: ``,
      img: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/stealth.svg`,
      conditionType: 'condition',
      conditionSources: <string[]>['perception'],
      conditionTargets: <string[]>[],
      conditionElevation: false,
      conditionBlinded: false,
      conditionBlindedOverride: false,
    },
  ],
  EFFECTS: <Effect[]>[],
  SKILLS: <CVSkillData[]>[
    {
      id: 'acrobatics',
      name: 'PF2E.ActionsCheck.acrobatics',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/acrobatics.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'arcana',
      name: 'PF2E.ActionsCheck.arcana',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/arcana.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'athletics',
      name: 'PF2E.ActionsCheck.athletics',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/athletics.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'crafting',
      name: 'PF2E.ActionsCheck.crafting',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/crafting.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'deception',
      name: 'PF2E.ActionsCheck.deception',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/deception.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'diplomacy',
      name: 'PF2E.ActionsCheck.diplomacy',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/diplomacy.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'intimidation',
      name: 'PF2E.ActionsCheck.intimidation',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/intimidation.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'medicine',
      name: 'PF2E.ActionsCheck.medicine',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/medicine.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'nature',
      name: 'PF2E.ActionsCheck.nature',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/nature.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'occultism',
      name: 'PF2E.ActionsCheck.occultism',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/occultism.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'perception',
      name: 'PF2E.ActionsCheck.perception',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/perception.svg`,
      enable: false,
      senseData: {
        id: 'perception',
        name: 'PF2E.ActionsCheck.perception',
        path: ``,
        img: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/perception.svg`,
        conditionType: 'sense',
        conditionSources: <string[]>[],
        conditionTargets: <string[]>[],
        conditionElevation: false,
        conditionBlinded: false,
        conditionBlindedOverride: false,
      },
    },
    {
      id: 'performance',
      name: 'PF2E.ActionsCheck.performance',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/performance.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'religion',
      name: 'PF2E.ActionsCheck.religion',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/religion.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'society',
      name: 'PF2E.ActionsCheck.society',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/society.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'stealth',
      name: 'PF2E.ActionsCheck.stealth',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/stealth.svg`,
      enable: true,
      senseData: {
        id: 'stealth',
        name: 'PF2E.ActionsCheck.stealth',
        path: ``,
        img: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/stealth.svg`,
        conditionType: 'condition',
        conditionSources: <string[]>['perception'],
        conditionTargets: <string[]>[],
        conditionElevation: false,
        conditionBlinded: false,
        conditionBlindedOverride: false,
      },
    },
    {
      id: 'survival',
      name: 'PF2E.ActionsCheck.survival',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/survival.svg`,
      enable: false,
      senseData: null,
    },
    {
      id: 'thievery',
      name: 'PF2E.ActionsCheck.thievery',
      icon: `/modules/${CONSTANTS.MODULE_NAME}/icons/skills/thievery.svg`,
      enable: false,
      senseData: null,
    },
  ],
};
