self.addEventListener('message', function (e) {
    if (e.data.cmd == 'start') {
        data = e.data.data;
        worker_id = e.data.worker_id;
        start_id = e.data.start_id;
        monster = e.data.monster;
        runeMap = e.data.runeMap;
        runeMax = e.data.options.runeMax;
        runeMode = e.data.options.runeMode;
        loadCurrent = e.data.options.loadCurrent;

        optimizerMode = (loadCurrent) ? runeMode : 'all';

        optSubslotsNoMax = e.data.options.optSubslotsNoMax;
        dmgCustom = e.data.options.dmgCustom;
        bonusStatData = e.data.options.bonusStatData;
        max_permutations = e.data.options.max_permutations;
        crafts_optimizedData = e.data.crafts_optimizedData;
        gOptimization = e.data.options.gOptimization;
        prefiltered = e.data.options.prefiltered;

        generateBuilds();
    }
}, false);

function generateBuilds() {
    var permutations_length = data.length;

    for (var i = 0; i < permutations_length; i++) {
        var monster_x = extendMonster(cloneObject(monster), data[i], false, runeMax, dmgCustom, bonusStatData, gOptimization);
        monster_x.id = monster_x.rune_ids;
        if (monster_x)
            extendedMonsters.push(monster_x);

        data[i] = null;

        if (i % 5000 == 0) {
            var progress = Math.round(i / permutations_length * 100);
            self.postMessage({ cmd: 'report_builds', worker_id: worker_id, progress: progress, buildsCount: extendedMonsters.length });
        }
        start_id++;
    }
    self.postMessage({ cmd: 'done', worker_id: worker_id, builds: extendedMonsters });
}

var data, start_id, monster, runeMap, runeMax, runeMode, loadCurrent, optimizerMode, optSubslotsNoMax, dmgCustom, bonusStatData, max_permutations, crafts_optimizedData, gOptimization, prefiltered = null;

var relevantBuildFields = {
    all: ["a_hp", "a_atk", "a_def", "a_spd", "a_crate", "a_cdmg", "a_res", "a_acc", "a_dps", "a_effhp", "a_effhp_d", "m_hp",
    "m_atk", "m_def", "m_spd", "m_crate", "m_cdmg", "m_res", "m_acc", "m_dps", "m_effhp", "m_effhp_d",
    "rune_avg", "rune_ids", "sets", "slots246", "rune_max"],
    a: ["a_hp", "a_atk", "a_def", "a_spd", "a_crate", "a_cdmg", "a_res", "a_acc", "a_dps", "a_effhp", "a_effhp_d", "rune_avg", "rune_ids", "sets", "slots246", "rune_max"],
    m: ["m_hp", "m_atk", "m_def", "m_spd", "m_crate", "m_cdmg", "m_res", "m_acc", "m_dps", "m_effhp", "m_effhp_d", "rune_avg", "rune_ids", "sets", "slots246", "rune_max"]
};

var extendedMonsters = [];

var allSets = {
    "Energy": [2, "HP%", 15],
    "Fatal": [4, "ATK%", 35],
    "Blade": [2, "CRate", 12],
    "Rage": [4, "CDmg", 40],
    "Swift": [4, "SPD%", 25],
    "Focus": [2, "ACC", 20],
    "Guard": [2, "DEF%", 15],
    "Endure": [2, "RES", 20],
    "Violent": [4, "", ""],
    "Will": [2, "", ""],
    "Nemesis": [2, "", ""],
    "Shield": [2, "", ""],
    "Revenge": [2, "", ""],
    "Despair": [4, "", ""],
    "Vampire": [4, "", ""],
    "Destroy": [2, "", ""],
    "Fight": [2, "ATK%", 8],
    "Determination": [2, "DEF%", 8],
    "Enhance": [2, "HP%", 8],
    "Accuracy": [2, "ACC", 10],
    "Tolerance": [2, "RES", 10]
};

var allRunesStats = {
    "SPD": { "g1": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18], "g2": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19], "g3": [3, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 19, 21, 25], "g4": [4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23, 25, 30], "g5": [5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 39], "g6": [7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 42] },
    "ATK flat": { "g1": [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 54], "g2": [5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 74], "g3": [7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57, 62, 67, 72, 77, 92], "g4": [10, 16, 22, 28, 34, 40, 46, 52, 58, 64, 70, 76, 82, 88, 94, 112], "g5": [15, 22, 29, 36, 43, 50, 57, 64, 71, 78, 85, 92, 99, 106, 113, 135], "g6": [22, 30, 38, 46, 54, 62, 70, 78, 86, 94, 102, 110, 118, 126, 134, 160] },
    "ATK%": { "g1": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18], "g2": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20], "g3": [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 38], "g4": [5, 7, 9, 11, 13, 16, 18, 20, 22, 23, 27, 29, 31, 33, 36, 43], "g5": [8, 10, 12, 15, 17, 20, 22, 24, 27, 29, 32, 34, 37, 40, 43, 51], "g6": [11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 63] },
    "HP%": { "g1": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18], "g2": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20], "g3": [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 38], "g4": [5, 7, 9, 11, 13, 16, 18, 20, 22, 23, 27, 29, 31, 33, 36, 43], "g5": [8, 10, 12, 15, 17, 20, 22, 24, 27, 29, 32, 34, 37, 40, 43, 51], "g6": [11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 63] },
    "HP flat": { "g1": [40, 85, 130, 175, 220, 265, 310, 355, 400, 445, 490, 535, 580, 625, 670, 804], "g2": [70, 130, 190, 250, 310, 370, 430, 490, 550, 610, 670, 730, 790, 850, 910, 1092], "g3": [100, 175, 250, 325, 400, 475, 550, 625, 700, 775, 850, 925, 1000, 1075, 1150, 1380], "g4": [160, 250, 340, 430, 520, 610, 700, 790, 880, 970, 1060, 1150, 1240, 1330, 1420, 1704], "g5": [270, 375, 480, 585, 690, 795, 900, 1005, 1110, 1215, 1320, 1425, 1530, 1635, 1740, 2088], "g6": [360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440, 1560, 1680, 1800, 1920, 2040, 2448] },
    "DEF%": { "g1": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18], "g2": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20], "g3": [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 38], "g4": [5, 7, 9, 11, 13, 16, 18, 20, 22, 23, 27, 29, 31, 33, 36, 43], "g5": [8, 10, 12, 15, 17, 20, 22, 24, 27, 29, 32, 34, 37, 40, 43, 51], "g6": [11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 63] },
    "DEF flat": { "g1": [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 54], "g2": [5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 74], "g3": [7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57, 62, 67, 72, 77, 92], "g4": [10, 16, 22, 28, 34, 40, 46, 52, 58, 64, 70, 76, 82, 88, 94, 112], "g5": [15, 22, 29, 36, 43, 50, 57, 64, 71, 78, 85, 92, 99, 106, 113, 135], "g6": [22, 30, 38, 46, 54, 62, 70, 78, 86, 94, 102, 110, 118, 126, 134, 160] },
    "CRate": { "g1": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18], "g2": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20], "g3": [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 37], "g4": [4, 6, 8, 11, 13, 15, 17, 19, 22, 24, 26, 28, 30, 33, 35, 41], "g5": [5, 7, 10, 12, 15, 17, 19, 22, 24, 27, 29, 31, 34, 36, 39, 47], "g6": [7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 58] },
    "CDmg": { "g1": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20], "g2": [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 37], "g3": [4, 6, 9, 11, 13, 16, 18, 20, 22, 25, 27, 29, 32, 34, 36, 43], "g4": [6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 57], "g5": [8, 11, 15, 18, 21, 25, 28, 31, 34, 38, 41, 44, 48, 51, 54, 65], "g6": [11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63, 67, 80] },
    "RES": { "g1": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18], "g2": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20], "g3": [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 38], "g4": [6, 8, 10, 13, 15, 17, 19, 21, 24, 26, 28, 30, 32, 35, 37, 44], "g5": [9, 11, 14, 16, 19, 21, 23, 26, 28, 31, 33, 35, 38, 40, 43, 51], "g6": [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 64] },
    "ACC": { "g1": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18], "g2": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20], "g3": [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 38], "g4": [6, 8, 10, 13, 15, 17, 19, 21, 24, 26, 28, 30, 32, 35, 37, 44], "g5": [9, 11, 14, 16, 19, 21, 23, 26, 28, 31, 33, 35, 38, 40, 43, 51], "g6": [12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 64] }
};

var craftsValueMap = {
    'G': {
        "SPD": { g1: { min: 1, max: 2 }, g2: { min: 1, max: 2 }, g3: { min: 2, max: 3 }, g4: { min: 3, max: 4 }, g5: { min: 4, max: 5 } },
        "ATK%": { g1: { min: 1, max: 3 }, g2: { min: 2, max: 5 }, g3: { min: 3, max: 6 }, g4: { min: 4, max: 7 }, g5: { min: 5, max: 10 } },
        "ATK flat": { g1: { min: 4, max: 8 }, g2: { min: 6, max: 12 }, g3: { min: 10, max: 18 }, g4: { min: 12, max: 22 }, g5: { min: 18, max: 30 } },
        "HP%": { g1: { min: 1, max: 3 }, g2: { min: 2, max: 5 }, g3: { min: 3, max: 6 }, g4: { min: 4, max: 7 }, g5: { min: 5, max: 10 } },
        "HP flat": { g1: { min: 80, max: 120 }, g2: { min: 100, max: 200 }, g3: { min: 180, max: 250 }, g4: { min: 230, max: 450 }, g5: { min: 430, max: 550 } },
        "DEF%": { g1: { min: 1, max: 3 }, g2: { min: 2, max: 5 }, g3: { min: 3, max: 6 }, g4: { min: 4, max: 7 }, g5: { min: 5, max: 10 } },
        "DEF flat": { g1: { min: 4, max: 8 }, g2: { min: 6, max: 12 }, g3: { min: 10, max: 18 }, g4: { min: 12, max: 22 }, g5: { min: 18, max: 30 } }
    },
    'E': {
        "SPD": { g1: { min: 1, max: 3 }, g2: { min: 2, max: 4 }, g3: { min: 3, max: 6 }, g4: { min: 5, max: 8 }, g5: { min: 7, max: 10 } },
        "ATK%": { g1: { min: 2, max: 4 }, g2: { min: 3, max: 7 }, g3: { min: 5, max: 9 }, g4: { min: 7, max: 11 }, g5: { min: 9, max: 13 } },
        "ATK flat": { g1: { min: 8, max: 12 }, g2: { min: 10, max: 16 }, g3: { min: 15, max: 23 }, g4: { min: 20, max: 30 }, g5: { min: 28, max: 40 } },
        "HP%": { g1: { min: 2, max: 4 }, g2: { min: 3, max: 7 }, g3: { min: 5, max: 9 }, g4: { min: 7, max: 11 }, g5: { min: 9, max: 13 } },
        "HP flat": { g1: { min: 100, max: 150 }, g2: { min: 130, max: 220 }, g3: { min: 200, max: 310 }, g4: { min: 290, max: 420 }, g5: { min: 400, max: 580 } },
        "DEF%": { g1: { min: 2, max: 4 }, g2: { min: 3, max: 7 }, g3: { min: 5, max: 9 }, g4: { min: 7, max: 11 }, g5: { min: 9, max: 13 } },
        "DEF flat": { g1: { min: 8, max: 12 }, g2: { min: 10, max: 16 }, g3: { min: 15, max: 23 }, g4: { min: 20, max: 30 }, g5: { min: 28, max: 40 } },
        "CRate": { g1: { min: 1, max: 3 }, g2: { min: 2, max: 4 }, g3: { min: 3, max: 5 }, g4: { min: 4, max: 7 }, g5: { min: 6, max: 9 } },
        "CDmg": { g1: { min: 2, max: 4 }, g2: { min: 3, max: 5 }, g3: { min: 4, max: 6 }, g4: { min: 5, max: 8 }, g5: { min: 7, max: 10 } },
        "RES": { g1: { min: 2, max: 4 }, g2: { min: 3, max: 6 }, g3: { min: 5, max: 8 }, g4: { min: 6, max: 9 }, g5: { min: 8, max: 11 } },
        "ACC": { g1: { min: 2, max: 4 }, g2: { min: 3, max: 6 }, g3: { min: 5, max: 8 }, g4: { min: 6, max: 9 }, g5: { min: 8, max: 11 } }
    }
}

var runeMaxLevel = 15;

// extend a basic monster with 0 valies
function extend(a, b) {
    for (var key in b)
        if (b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}

var extendableMonsterFields = {
    all: {
        "a_hp": 0, "a_atk": 0, "a_def": 0, "a_spd": 0, "a_crate": 0, "a_cdmg": 0, "a_res": 0, "a_acc": 0, "a_dps": 0, "a_effhp": 0, "a_effhp_d": 0,
        "m_hp": 0, "m_atk": 0, "m_def": 0, "m_spd": 0, "m_crate": 0, "m_cdmg": 0, "m_res": 0, "m_acc": 0, "m_dps": 0, "m_effhp": 0, "m_effhp_d": 0,
        "o_hp_p": 0, "o_hp": 0, "o_atk_p": 0, "o_atk": 0, "o_def_p": 0, "o_def": 0, "o_spd_p": 0, "o_spd": 0, "o_crate": 0, "o_cdmg": 0, "o_res": 0, "o_acc": 0,
        "om_hp_p": 0, "om_hp": 0, "om_atk_p": 0, "om_atk": 0, "om_def_p": 0, "om_def": 0, "om_spd_p": 0, "om_spd": 0, "om_crate": 0, "om_cdmg": 0, "om_res": 0, "om_acc": 0,
        "rune_avg": 0, "rune_ids": "", "sets": "", "slots246": "", "rune_max": 15
    },
    a: {
        "a_hp": 0, "a_atk": 0, "a_def": 0, "a_spd": 0, "a_crate": 0, "a_cdmg": 0, "a_res": 0, "a_acc": 0, "a_dps": 0, "a_effhp": 0, "a_effhp_d": 0,
        "o_hp_p": 0, "o_hp": 0, "o_atk_p": 0, "o_atk": 0, "o_def_p": 0, "o_def": 0, "o_spd_p": 0, "o_spd": 0, "o_crate": 0, "o_cdmg": 0, "o_res": 0, "o_acc": 0,
        "rune_avg": 0, "rune_ids": "", "sets": "", "slots246": "", "rune_max": 15
    },
    m: {
        "m_hp": 0, "m_atk": 0, "m_def": 0, "m_spd": 0, "m_crate": 0, "m_cdmg": 0, "m_res": 0, "m_acc": 0, "m_dps": 0, "m_effhp": 0, "m_effhp_d": 0,
        "om_hp_p": 0, "om_hp": 0, "om_atk_p": 0, "om_atk": 0, "om_def_p": 0, "om_def": 0, "om_spd_p": 0, "om_spd": 0, "om_crate": 0, "om_cdmg": 0, "om_res": 0, "om_acc": 0,
        "rune_avg": 0, "rune_ids": "", "sets": "", "slots246": "", "rune_max": 15
    }
};

// calculates all rune bonuses over a monster and returns monster_extended object
function extendMonster(monster, runes, clearExtraFields, runeMax, dmgCustom, bonusStatData, gOptimization) {
    var monster_x = extend(monster, extendableMonsterFields[optimizerMode]);

    if (!runeMax) {
        runeMax = runeMaxLevel;
    }

    monster_x.rune_avg = 0;
    var all_efficiency = 0;
    var runes_length = runes.length;
    for (var i = 0; i < runes_length; i++) {
        monster_x = equipRune(monster_x, runeMap[runes[i]], runeMax);
        if (runeMap[runes[i]].efficiency)
            all_efficiency += runeMap[runes[i]].efficiency;
    }
    monster_x.rune_avg = (all_efficiency / runes_length).toFixed(2)

    if (gOptimization.state || gOptimization.optFullGrind) {
        var grindstonePool = getBuildGrindstones(runes, gOptimization.mode, gOptimization.optFullGrind);

        if (!objectIsEmpty(grindstonePool)) {
            grindstonePool.forEach(function (craft, idx, array) {
                if (craft.improvement)
                    monster_x = addStat(monster_x, craft.stat, craft.improvement, false, null);
            });
        }
    }

    monster_x = determineCompleteSetsAndEffects(monster_x, runes);
    monster_x = calculateActualAndMax(monster_x, runeMax, bonusStatData);

    monster_x = calculateAtkDps(monster_x, dmgCustom);
    monster_x = calculateEffectiveHp(monster_x);

    if (prefiltered.state && !filterBuild(monster_x)) {
        return false;
    }

    var build = {};

    var relevantBuildFieldsCount = relevantBuildFields[optimizerMode].length;
    for (var i = 0; i < relevantBuildFieldsCount; i++) {
        build[relevantBuildFields[optimizerMode][i]] = monster_x[relevantBuildFields[optimizerMode][i]];
    }

    return build;
}

function getBuildGrindstones(runes, mode, fullyGrinded) {
    var grindstonePool = [];
    var grindstoneMap = {};
    var runeLockedStatMap = {};

    // if fullyGrinded just get a legend grind for every stat in the specific mode
    if (fullyGrinded) {
        var runes_length = runes.length;
        for (var i = 0; i < runes_length; i++) {
            var rune = runeMap[runes[i]];
            for (var s = 1; s < 5; s++) {
                if (!rune[`s${s}_data`] || !craftsValueMap['G'][rune[`s${s}_t`]])
                    continue;

                var gvalue = rune[`s${s}_data`].gvalue || 0;
                var eff_value = (craftsValueMap['G'][rune[`s${s}_t`]]['g5'][mode] - gvalue);
                if (eff_value <= 0)
                    continue;

                grindstonePool.push({
                    improvement: eff_value,
                    stat: rune[`s${s}_t`]
                });
            }
        }
        return grindstonePool;
    }

    // get all available grindstones (unique) for each build
    var runes_length = runes.length;
    for (var i = 0; i < runes_length; i++) {
        if (!crafts_optimizedData[runes[i]] || !crafts_optimizedData[runes[i]].G)
            continue;

        Object.keys(crafts_optimizedData[runes[i]]['possibleCrafts']).forEach(function (key, idx) {
            for (var j = 0; j < crafts_optimizedData[runes[i]]['possibleCrafts'][key].length; j++) {
                if (crafts_optimizedData[runes[i]]['possibleCrafts'][key][j].type !== 'G')
                    continue;

                var gvalue = runeMap[runes[i]][key + '_data'].gvalue || 0;
                if (!grindstoneMap[crafts_optimizedData[runes[i]]['possibleCrafts'][key][j].id]) {
                    var craft = cloneObject(crafts_optimizedData[runes[i]]['possibleCrafts'][key][j]);

                    var eff_value = (craftsValueMap[craft.type][craft.stat]['g' + craft.grade][mode] - gvalue);
                    if (eff_value <= 0)
                        continue;

                    grindstoneMap[craft.id] = [];
                    grindstoneMap[craft.id].push({ rune_id: runes[i], substat: key, eff_value: eff_value });

                    grindstonePool.push(craft);
                } else {
                    var craft = crafts_optimizedData[runes[i]]['possibleCrafts'][key][j];

                    var eff_value = (craftsValueMap[craft.type][craft.stat]['g' + craft.grade][mode] - gvalue);
                    if (eff_value <= 0)
                        continue;

                    grindstoneMap[craft.id].push({ rune_id: runes[i], substat: key, eff_value: eff_value });
                }
            }
        });
    }

    //sort grindstones by grade
    grindstonePool.sort(function (a, b) {
        return parseFloat(b.grade) - parseFloat(a.grade);
    });

    grindstonePool.forEach(function (craft, idx, array) {
        var runes_length = grindstoneMap[craft.id].length;
        for (var i = 0; i < runes_length; i++) {
            var rune_id = grindstoneMap[craft.id][i].rune_id;
            if (!runeLockedStatMap[rune_id])
                runeLockedStatMap[rune_id] = {};

            if (runeLockedStatMap[rune_id][craft.stat])
                continue;

            if (!craft.improvement) {
                craft.improvement = grindstoneMap[craft.id][i].eff_value;
                craft.rune_id = grindstoneMap[craft.id][i].rune_id;
            } else {
                if (grindstoneMap[craft.id][i].eff_value > craft.improvement) {
                    craft.improvement = grindstoneMap[craft.id][i].eff_value;
                    craft.rune_id = grindstoneMap[craft.id][i].rune_id;
                }
            }
        }
        if (craft.rune_id)
            runeLockedStatMap[craft.rune_id][craft.stat] = true;
    });

    return grindstonePool;
}

function filterBuild(build) {
    for (var key in prefiltered.filter) {
        if (build[key] < prefiltered.filter[key].min) {
            return false;
        }
        if (build[key] > prefiltered.filter[key].max) {
            return false;
        }
    }
    return true;
}

// order the runes by slot ascending
function orderBySlots(runes) {
    var new_runes = [];
    for (i = 1; i <= 6; i++) {
        for (j = 0; j < runes.length; j++) {
            if (runes[j].slot == i) {
                new_runes.push(runes[j]);
                break;
            }
        }
    }
    return new_runes;
}

// add the stat to monsters rune bonus stats
function addStat(monster, type, value, add_max, grade, level) {
    if (type != "" || value != "") {
        switch (type) {
            case "SPD":
                monster.o_spd += value;
                if (add_max) {
                    monster.om_spd += (level > add_max) ? value : allRunesStats[type]["g" + grade][add_max];
                } else {
                    monster.om_spd += value;
                }
                break;
            case "SPD%":
                monster.o_spd += Math.ceil(monster.b_spd * value / 100);
                monster.om_spd += Math.ceil(monster.b_spd * value / 100);
                break;
            case "HP%":
                monster.o_hp_p += value;
                if (add_max)
                    monster.om_hp_p += (level > add_max) ? value : allRunesStats[type]["g" + grade][add_max];
                else
                    monster.om_hp_p += value;
                break;
            case "HP flat":
                monster.o_hp += value;
                if (add_max)
                    monster.om_hp += (level > add_max) ? value : allRunesStats[type]["g" + grade][add_max];
                else
                    monster.om_hp += value;
                break;
            case "ATK%":
                monster.o_atk_p += value;
                if (add_max)
                    monster.om_atk_p += (level > add_max) ? value : allRunesStats[type]["g" + grade][add_max];
                else
                    monster.om_atk_p += value;
                break;
            case "ATK flat":
                monster.o_atk += value;
                if (add_max)
                    monster.om_atk += (level > add_max) ? value : allRunesStats[type]["g" + grade][add_max];
                else
                    monster.om_atk += value;
                break;
            case "DEF%":
                monster.o_def_p += value;
                if (add_max)
                    monster.om_def_p += (level > add_max) ? value : allRunesStats[type]["g" + grade][add_max];
                else
                    monster.om_def_p += value;
                break;
            case "DEF flat":
                monster.o_def += value;
                if (add_max)
                    monster.om_def += (level > add_max) ? value : allRunesStats[type]["g" + grade][add_max];
                else
                    monster.om_def += value;
                break;
            case "CRate":
                monster.o_crate += value;
                if (add_max)
                    monster.om_crate += (level > add_max) ? value : allRunesStats[type]["g" + grade][add_max];
                else
                    monster.om_crate += value;
                break;
            case "CDmg":
                monster.o_cdmg += value;
                if (add_max)
                    monster.om_cdmg += (level > add_max) ? value : allRunesStats[type]["g" + grade][add_max];
                else
                    monster.om_cdmg += value;
                break;
            case "RES":
                monster.o_res += value;
                if (add_max)
                    monster.om_res += (level > add_max) ? value : allRunesStats[type]["g" + grade][add_max];
                else
                    monster.om_res += value;
                break;
            case "ACC":
                monster.o_acc += value;
                if (add_max)
                    monster.om_acc += (level > add_max) ? value : allRunesStats[type]["g" + grade][add_max];
                else
                    monster.om_acc += value;
                break;
            default:
                //SWO.func.showAlertBox("Unkown stat type: " + type);
        }
    }
    return monster;
}

function calculateAtkDps(monster, options) {
    var maxCritRate = 100;
    var modes = ['a', 'm'];
    var loopLength = modes.length;

    for (var i = 0; i < loopLength; i++) {
        var crate = (monster[modes[i] + '_crate'] > maxCritRate) ? maxCritRate : monster[modes[i] + '_crate'];
        if (!options || options.mode === 'standard') {
            if (options) {
                crate = ((options.addcrit + crate) < maxCritRate) ? crate += options.addcrit : crate = maxCritRate;
            }

            monster[modes[i] + '_dps'] = Math.floor(((maxCritRate - crate) + crate * (100 + monster[modes[i] + '_cdmg']) / 100) * monster[modes[i] + '_atk'] / 100);
        } else {
            var def_base = (monster[modes[i] + '_def'] + monster['b_def'] * options.multiplier.buildings.def + monster['b_def'] * options.multiplier.lead.def) * options.multiplier.skill.def * options.multiplier.buffs.def;

            var atk_spd_base = (monster[modes[i] + '_atk'] + monster['b_atk'] * options.multiplier.buildings.atk + monster['b_atk'] * options.multiplier.lead.atk) * options.multiplier.skill.atk * options.multiplier.buffs.atk;
            if (options.multiplier.skill.spd.summand > 0 && options.multiplier.skill.spd.divisor > 0) {
                if (options.enemy_spd > 0) {
                    atk_spd_base = atk_spd_base * ((options.enemy_spd + options.multiplier.skill.spd.summand) / options.multiplier.skill.spd.divisor / 100);
                } else {
                    atk_spd_base = atk_spd_base * (((((monster[modes[i] + '_spd'] + (monster['b_spd'] * options.multiplier.buildings.spd) + (monster['b_spd'] * options.multiplier.lead.spd)) * options.multiplier.buffs.spd) + options.multiplier.skill.spd.summand) / options.multiplier.skill.spd.divisor) / 100);
                }
            }

            if (options.enemy_hp > 0) {
                var hp_base = options.enemy_hp * options.multiplier.skill.hp;
            } else {
                var hp_base = (monster[modes[i] + '_hp'] + monster['b_hp'] * options.multiplier.buildings.hp + monster['b_hp'] * options.multiplier.lead.hp) * options.multiplier.skill.hp;
            }

            var base_sum = def_base + atk_spd_base + hp_base;
            var skillupBonus = base_sum * options.skillups;

            //brand
            if (options.multiplier.debuffs)
                base_sum = base_sum * options.multiplier.debuffs.brand;

            if (!options.isBomb) {
                if (options.isCrit) {
                    base_sum = base_sum * (1 + (monster[modes[i] + '_cdmg'] / 100) + options.multiplier.buildings.cdmg + options.multiplier.lead.cdmg);
                } else if (options.isAverage) {
                    if (monster[modes[i] + '_crate'] > 0) {
                        var maxCrit = 1;
                        var crit = (monster[modes[i] + '_crate'] / 100 + options.multiplier.lead.crate);
                        var realCrit = (crit > maxCrit) ? maxCrit : crit;
                        var critDmg = (1 + (monster[modes[i] + '_cdmg'] / 100) + options.multiplier.buildings.cdmg + options.multiplier.lead.cdmg);
                        base_sum = base_sum * ((maxCrit - realCrit) + realCrit * critDmg);
                    }
                }
            }

            if (skillupBonus > 0)
                base_sum += skillupBonus;

            if (!options.isBomb)
                base_sum = base_sum * (1000 / (1140 + 3.5 * options.defense));

            monster[modes[i] + '_dps'] = Math.floor(base_sum);
        }
    }

    return monster;
}

function calculateEffectiveHp(monster) {
    var defBreakMultiplier = 1.05;
    var noDefBreakMultiplier = 3.5;

    // calculate actual eff. hp
    monster.a_effhp = Math.floor(monster.a_hp * (1140 + monster.a_def * noDefBreakMultiplier) / 1000);
    monster.a_effhp_d = Math.floor(monster.a_hp * (1140 + monster.a_def * defBreakMultiplier) / 1000);

    // calculate max eff. hp
    monster.m_effhp = Math.floor(monster.m_hp * (1140 + monster.m_def * noDefBreakMultiplier) / 1000);
    monster.m_effhp_d = Math.floor(monster.m_hp * (1140 + monster.m_def * defBreakMultiplier) / 1000);
    return monster;
}

// add all rune stat to monsters rune bonus stats
function equipRune(monster, rune, runeMax) {
    monster = ((rune.slot == 1 || rune.slot == 3 || rune.slot == 5) && optSubslotsNoMax) ? addStat(monster, rune.m_t, rune.m_v, 12, rune.grade, rune.level) : addStat(monster, rune.m_t, rune.m_v, runeMax, rune.grade, rune.level);
    monster = addStat(monster, rune.i_t, rune.i_v, false, rune.grade);
    monster = addStat(monster, rune.s1_t, rune.s1_v, false, null);
    monster = addStat(monster, rune.s2_t, rune.s2_v, false, null);
    monster = addStat(monster, rune.s3_t, rune.s3_v, false, null);
    monster = addStat(monster, rune.s4_t, rune.s4_v, false, null);

    if (monster.rune_ids != "")
        monster.rune_ids += ",";
    monster.rune_ids += rune.id;
    // fill slot 2,4 and 6 main stats
    if (rune.slot == 2 || rune.slot == 4 || rune.slot == 6) {
        if (rune.slot == 4 || rune.slot == 6)
            monster.slots246 += ", ";
        monster.slots246 += rune.m_t;
    }

    return monster;
}

// calculates actual monster stats and +15 stats based on base stats and rune bonus stats
function calculateActualAndMax(monster, runeMax, bonusStatData) {
    if (bonusStatData) {
        monster.o_atk_p += bonusStatData.atk; monster.om_atk_p += bonusStatData.atk;
        monster.o_hp_p += bonusStatData.hp; monster.om_hp_p += bonusStatData.hp;
        monster.o_def_p += bonusStatData.def; monster.om_def_p += bonusStatData.def;
        monster.o_spd_p += bonusStatData.spd; monster.om_spd_p += bonusStatData.spd;
        monster.o_acc += bonusStatData.acc; monster.om_acc += bonusStatData.acc;
        monster.o_res += bonusStatData.res; monster.om_res += bonusStatData.res;
    }

    // actual
    monster.a_hp = monster.b_hp + Math.ceil((monster.b_hp * monster.o_hp_p) / 100) + monster.o_hp;
    monster.a_atk = monster.b_atk + Math.ceil((monster.b_atk * monster.o_atk_p) / 100) + monster.o_atk;
    monster.a_def = monster.b_def + Math.ceil((monster.b_def * monster.o_def_p) / 100) + monster.o_def;
    monster.a_spd = monster.b_spd + Math.ceil((monster.b_spd * monster.o_spd_p) / 100) + monster.o_spd;
    monster.a_crate = monster.b_crate + monster.o_crate;
    monster.a_cdmg = monster.b_cdmg + monster.o_cdmg;
    monster.a_res = monster.b_res + monster.o_res;
    monster.a_acc = monster.b_acc + monster.o_acc;
    // max
    monster.m_hp = monster.b_hp + Math.ceil((monster.b_hp * monster.om_hp_p) / 100) + monster.om_hp;
    monster.m_atk = monster.b_atk + Math.ceil((monster.b_atk * monster.om_atk_p) / 100) + monster.om_atk;
    monster.m_def = monster.b_def + Math.ceil((monster.b_def * monster.om_def_p) / 100) + monster.om_def;
    monster.m_spd = monster.b_spd + Math.ceil((monster.b_spd * monster.om_spd_p) / 100) + monster.om_spd;
    monster.m_crate = monster.b_crate + monster.om_crate;
    monster.m_cdmg = monster.b_cdmg + monster.om_cdmg;
    monster.m_res = monster.b_res + monster.om_res;
    monster.m_acc = monster.b_acc + monster.om_acc;

    monster.rune_max = runeMax;
    return monster;
}

// determines rune set bonuses and adds them into rune bonus stats
function determineCompleteSetsAndEffects(monster, runes) {
    var setCounter = { "Energy": 0, "Fatal": 0, "Blade": 0, "Rage": 0, "Swift": 0, "Focus": 0, "Guard": 0, "Endure": 0, "Violent": 0, "Will": 0, "Nemesis": 0, "Shield": 0, "Revenge": 0, "Despair": 0, "Vampire": 0, "Destroy": 0, "Fight": 0, "Determination": 0, "Enhance": 0, "Accuracy": 0, "Tolerance": 0 };
    for (i = 0; i < runes.length; i++) {
        setCounter[runeMap[runes[i]].set]++;
    }
    for (var setName in setCounter) {
        while (setCounter[setName] >= allSets[setName][0]) {
            if (monster.sets != "")
                monster.sets += ",";
            monster.sets += setName;
            monster = addStat(monster, allSets[setName][1], allSets[setName][2], false, null);
            setCounter[setName] -= allSets[setName][0];
        }
    }
    return monster;
}

function cloneObject(object) {
    var target = {};
    for (var i in object) {
        if (object.hasOwnProperty(i)) {
            target[i] = object[i];
        }
    }
    return target;
}

function objectIsEmpty(object) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop))
            return false;
    }

    return true;
}