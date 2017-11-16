(function () {
    "use strict";

    WinJS.Namespace.define("SWO", {
        writeTempFiles: null,
        fireAlert: null,
        getFileTokenFromFutureAccessList: null,
        clearFutureAccessList: null,
        getSetting: null,
        allData: null,
        autoImportFile: null,
        backUpFile: null,

        roamingSettings: null,

        futureAccessList: null
    });

    WinJS.Namespace.define("SWO.livesync", {});
    WinJS.Namespace.define("SWO.settings", {
        data: { monsterLocked: {}, presets: { general: [], monster: {} } },
        key: 'swop_settings',
        firstLoaded: false
    });

    WinJS.Namespace.define("SWO.func", {});
    WinJS.Namespace.define("SWO.optimizer", {
        firstLoaded: false,
        autoImported: false
    });
    WinJS.Namespace.define("SWO.presets", {});
    WinJS.Namespace.define("SWO.speedtune", {});
    WinJS.Namespace.define("SWO.prioritylist", {});
    WinJS.Namespace.define("SWO.compare", {
        firstLoaded: false
    });
    WinJS.Namespace.define("SWO.optimizer", {});
    WinJS.Namespace.define("SWO.api.swarfarm", {
        firstLoaded: false,
        monsterData: {},
        bestiary: {},
        monsterDataSelect: '',
        folders: { icons: null }
    });

    WinJS.Namespace.define("SWO.vars", {
        localDataName: 'swrunes_saveddata',
        nextRuneId: 0,
        nextCraftId: 0,
        nextMonsId: 0,
        nextBuildId: 0,
        tableMetaData: { gridRunes: { nextIdString: 'nextRuneId', unique_field: 'unique_id', section: 'runes' }, gridCrafts: { nextIdString: 'nextCraftId', unique_field: 'item_id', section: 'crafts' }, gridMons: { nextIdString: 'nextMonsId', unique_field: 'unit_id', section: 'monsters' } },
        statFields: { base: ['b_hp', 'b_atk', 'b_def', 'b_spd', 'b_crate', 'b_cdmg', 'b_res', 'b_acc'], actual: ['a_hp', 'a_atk', 'a_def', 'a_spd', 'a_crate', 'a_cdmg', 'a_res', 'a_acc'], max: ['m_hp', 'm_atk', 'm_def', 'm_spd', 'm_crate', 'm_cdmg', 'm_res', 'm_acc'] },
        statLabels: ['HP', 'Atk', 'Def', 'Spd', 'Crit', 'CDmg', 'Res', 'Acc'],
        filterFields: { base: ['b_hp', 'b_atk', 'b_def', 'b_spd', 'b_crate', 'b_cdmg', 'b_res', 'b_acc'], actual: ['a_hp', 'a_atk', 'a_def', 'a_spd', 'a_crate', 'a_cdmg', 'a_res', 'a_acc', 'a_effhp', 'a_effhp_d', 'a_dps', 'rune_avg'], max: ['m_hp', 'm_atk', 'm_def', 'm_spd', 'm_crate', 'm_cdmg', 'm_res', 'm_acc', 'm_effhp', 'm_effhp_d', 'm_dps', 'rune_avg'] },
        bonusStatToColumn: { a_atk: 'atk', m_atk: 'atk', a_hp: 'hp', m_hp: 'hp', a_def: 'def', m_def: 'def', a_spd: 'spd', m_spd: 'spd', a_acc: 'acc', m_acc: 'acc', a_res: 'res', m_res: 'res' },
        menuIcons: { 'export': 'import_icon.png', 'runes': 'rune_icon.png', 'crafts-optimize': 'grindstones_icon.png', 'monsters': 'monster_icon.png', 'optimizer': 'optimize_icon.png', 'prioritylist': 'priolist_icon.png', 'speedtune': 'speedtune_icon.png', 'compare': 'compare_icon.png', 'settings': 'settings_icon.png', 'notes': 'notes_icon.png' },
        defaultFocusWeights: { HP: 1, DEF: 1, ATK: 1, SPD: 1.5, CRate: 1.5, CDmg: 1, RES: 1, ACC: 1 }
    });


    WinJS.Namespace.define("SWO.lookUp", {
        monsterLocked: null,
        uniqueToId: { gridRunes: {}, gridMons: {}, gridCrafts: {} },
        buildingsData: null,
        monsterSearchList: []
    });

    WinJS.Namespace.define("SWO.tables", {
        gridMons: null,
        gridMonsFirstLoaded: false,
        gridRunes: null,
        gridCrafts: null
    });

    WinJS.Namespace.define("SWO.dialogs", {
        aiDialog: null,
        aiDialogBlocked: false,
        coDialog: null,
        dmgcustomDialog: null,
        swfDialog: null,
        presetDialog: null,
        createmonsterDialog: null,
        runeEnchantDialog: null,
        renamemonsterDialog: null
    });

    WinJS.Namespace.define("SWO.buttons", {});

    WinJS.Namespace.define("SWO.crafts", {
        equip: null,
        equipContext: null,
        filterMode: 'G',
        selectedMon: 0,
        selectedRuneElement: null,
        //functions
        selectMonster: null,
        selectRune: null,
        rebuildNeeded: null,
        donothing: false,
        firstLoaded: false
    });

})();
