// General Data and empty objects
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

var allStatsMax = {
    "SPD": { "g1": 18, "g2": 19, "g3": 25, "g4": 30, "g5": 39, "g6": 42 },
    "ATK flat": { "g1": 54, "g2": 74, "g3": 93, "g4": 113, "g5": 135, "g6": 160 },
    "ATK%": { "g1": 18, "g2": 20, "g3": 38, "g4": 43, "g5": 51, "g6": 63 },
    "HP%": { "g1": 18, "g2": 20, "g3": 38, "g4": 43, "g5": 51, "g6": 63 },
    "HP flat": { "g1": 804, "g2": 1092, "g3": 1380, "g4": 1704, "g5": 2088, "g6": 2448 },
    "DEF%": { "g1": 18, "g2": 20, "g3": 38, "g4": 43, "g5": 51, "g6": 63 },
    "DEF flat": { "g1": 54, "g2": 74, "g3": 93, "g4": 113, "g5": 136, "g6": 160 },
    "CRate": { "g1": 18, "g2": 20, "g3": 37, "g4": 41, "g5": 47, "g6": 58 },
    "CDmg": { "g1": 20, "g2": 37, "g3": 43, "g4": 58, "g5": 65, "g6": 80 },
    "RES": { "g1": 18, "g2": 20, "g3": 38, "g4": 44, "g5": 51, "g6": 64 },
    "ACC": { "g1": 18, "g2": 20, "g3": 38, "g4": 44, "g5": 51, "g6": 64 }
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

var allSubStatsMax = {
    "SPD": { "g1": 5, "g2": 10, "g3": 15, "g4": 20, "g5": 25, "g6": 30 },
    "ATK%": { "g1": 10, "g2": 15, "g3": 25, "g4": 30, "g5": 35, "g6": 40 },
    "ATK flat": { "g1": 20, "g2": 25, "g3": 40, "g4": 50, "g5": 75, "g6": 100 },
    "HP%": { "g1": 10, "g2": 15, "g3": 25, "g4": 30, "g5": 35, "g6": 40 },
    "HP flat": { "g1": 300, "g2": 525, "g3": 825, "g4": 1125, "g5": 1500, "g6": 1875 },
    "DEF%": { "g1": 10, "g2": 15, "g3": 25, "g4": 30, "g5": 35, "g6": 40 },
    "DEF flat": { "g1": 20, "g2": 25, "g3": 40, "g4": 50, "g5": 75, "g6": 100 },
    "CRate": { "g1": 5, "g2": 10, "g3": 15, "g4": 20, "g5": 25, "g6": 30 },
    "CDmg": { "g1": 10, "g2": 15, "g3": 20, "g4": 25, "g5": 25, "g6": 35 },
    "RES": { "g1": 10, "g2": 15, "g3": 20, "g4": 25, "g5": 35, "g6": 40 },
    "ACC": { "g1": 10, "g2": 15, "g3": 20, "g4": 25, "g5": 35, "g6": 40 }
};

var craftsValueMap = {
    'G': {
        "SPD": { g2: { min: 1, max: 2 }, g3: { min: 2, max: 3 }, g4: { min: 3, max: 4 }, g5: { min: 4, max: 5 } },
        "ATK%": { g2: { min: 2, max: 5 }, g3: { min: 3, max: 6 }, g4: { min: 4, max: 7 }, g5: { min: 5, max: 10 } },
        "ATK flat": { g2: { min: 6, max: 12 }, g3: { min: 10, max: 18 }, g4: { min: 12, max: 22 }, g5: { min: 18, max: 30 } },
        "HP%": { g2: { min: 2, max: 5 }, g3: { min: 3, max: 6 }, g4: { min: 4, max: 7 }, g5: { min: 5, max: 10 } },
        "HP flat": { g2: { min: 100, max: 200 }, g3: { min: 180, max: 250 }, g4: { min: 230, max: 450 }, g5: { min: 430, max: 550 } },
        "DEF%": { g2: { min: 2, max: 5 }, g3: { min: 3, max: 6 }, g4: { min: 4, max: 7 }, g5: { min: 5, max: 10 } },
        "DEF flat": { g2: { min: 6, max: 12 }, g3: { min: 10, max: 18 }, g4: { min: 12, max: 22 }, g5: { min: 18, max: 30 } }
    },
    'E': {
        "SPD": { g2: { min: 2, max: 4 }, g3: { min: 3, max: 6 }, g4: { min: 5, max: 8 }, g5: { min: 7, max: 10 } },
        "ATK%": { g2: { min: 3, max: 7 }, g3: { min: 5, max: 9 }, g4: { min: 7, max: 11 }, g5: { min: 9, max: 13 } },
        "ATK flat": { g2: { min: 10, max: 16 }, g3: { min: 15, max: 23 }, g4: { min: 20, max: 30 }, g5: { min: 28, max: 40 } },
        "HP%": { g2: { min: 3, max: 7 }, g3: { min: 5, max: 9 }, g4: { min: 7, max: 11 }, g5: { min: 9, max: 13 } },
        "HP flat": { g2: { min: 130, max: 220 }, g3: { min: 200, max: 310 }, g4: { min: 290, max: 420 }, g5: { min: 400, max: 580 } },
        "DEF%": { g2: { min: 3, max: 7 }, g3: { min: 5, max: 9 }, g4: { min: 7, max: 11 }, g5: { min: 9, max: 13 } },
        "DEF flat": { g2: { min: 10, max: 16 }, g3: { min: 15, max: 23 }, g4: { min: 20, max: 30 }, g5: { min: 28, max: 40 } },
        "CRate": { g2: { min: 2, max: 4 }, g3: { min: 3, max: 5 }, g4: { min: 4, max: 7 }, g5: { min: 5, max: 8 } },
        "CDmg": { g2: { min: 3, max: 5 }, g3: { min: 4, max: 6 }, g4: { min: 5, max: 8 }, g5: { min: 6, max: 9 } },
        "RES": { g2: { min: 3, max: 6 }, g3: { min: 5, max: 8 }, g4: { min: 6, max: 9 }, g5: { min: 7, max: 10 } },
        "ACC": { g2: { min: 3, max: 6 }, g3: { min: 5, max: 8 }, g4: { min: 6, max: 9 }, g5: { min: 7, max: 10 } }
    }
}

var craftsGradeToString = { 1: 'Common', 2: 'Magic', 3: 'Rare', 4: 'Hero', 5: 'Legend' };

var buildingsData = {
    4: { name: 'Guardstone', affects: 'def', levelToValue: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
    5: { name: 'Mana Fountain' },
    6: { name: 'Sky Tribe Totem', affects: 'spd', levelToValue: [2, 3, 5, 6, 8, 9, 11, 12, 14, 15] },
    7: { name: 'Arcane Booster Tower' },
    8: { name: 'Crystal Altar', affects: 'hp', section: 'all', levelToValue: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
    9: { name: 'Ancient Sword', affects: 'atk', section: 'all', levelToValue: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
    10: { name: 'Sanctum of Energy' },
    11: { name: 'Mysterious Plant' },
    15: { name: 'Fire Sanctuary', affects: 'atk', section: 'all', restrictedTo: 'fire', levelToValue: [3, 5, 7, 9, 11, 13, 15, 17, 19, 21] },
    16: { name: 'Water Sanctuary', affects: 'atk', section: 'all', restrictedTo: 'water', levelToValue: [3, 5, 7, 9, 11, 13, 15, 17, 19, 21] },
    17: { name: 'Wind Sanctuary', affects: 'atk', section: 'all', restrictedTo: 'wind', levelToValue: [3, 5, 7, 9, 11, 13, 15, 17, 19, 21] },
    18: { name: 'Light Sanctuary', affects: 'atk', section: 'all', restrictedTo: 'light', levelToValue: [3, 5, 7, 9, 11, 13, 15, 17, 19, 21] },
    19: { name: 'Dark Sanctuary', affects: 'atk', section: 'all', restrictedTo: 'dark', levelToValue: [3, 5, 7, 9, 11, 13, 15, 17, 19, 21] },
    31: { name: 'Fallen Ancient Guardian', affects: 'cdmg', section: 'all', levelToValue: [2, 5, 7, 10, 12, 15, 17, 20, 22, 25] },
    34: { name: 'Crystal Rock' },
    35: { name: 'Fairy Tree' },
    36: { name: 'Flag of Battle', affects: 'atk', section: 'guildwar', levelToValue: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
    37: { name: 'Flag of Rage', affects: 'cdmg', section: 'guildwar', levelToValue: [2, 5, 7, 10, 12, 15, 17, 20, 22, 25] },
    38: { name: 'Flag of Hope', affects: 'hp', section: 'guildwar', levelToValue: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
    39: { name: 'Flag of Will', affects: 'def', section: 'guildwar', levelToValue: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] }
}

SWO.lookUp.buildingsData = buildingsData;

var runeMaxLevel = 15;
var shareLimit = 6;
var optSubslotsNoMax = false;
var dmgCustom = false;
var bonusStatData = false;
var gOptimization = false;
var currentFilters = {};

var currentMonsterData = null;
var currentMonsterID = 0;

var tempMonsterStats = [];

var runeFilter = {};

window.startTimeOptimizer;

/* grid variables */
var dataView;
var dataViewPinned;
var grid;
var gridPinned;

// do not modify thos in the code! Used only for display
var emptySetCounter = { "Energy": 0, "Fatal": 0, "Blade": 0, "Rage": 0, "Swift": 0, "Focus": 0, "Guard": 0, "Endure": 0, "Violent": 0, "Will": 0, "Nemesis": 0, "Shield": 0, "Revenge": 0, "Despair": 0, "Vampire": 0, "Destroy": 0, "Fight": 0, "Determination": 0, "Enhance": 0, "Accuracy": 0, "Tolerance": 0 };
var emptyRune = { "id": "", "monster": "", "monster_n": "", "set": "", "slot": "", "grade": "", "level": "", "m_t": "", "m_v": "", "i_t": "", "i_v": "", "s1_t": "", "s1_v": "", "s1_data": { enchanted: false, gvalue: 0 }, "s2_t": "", "s2_v": "", "s2_data": { enchanted: false, gvalue: 0 }, "s3_t": "", "s3_v": "", "s3_data": { enchanted: false, gvalue: 0 }, "s4_t": "", "s4_v": "", "s4_data": { enchanted: false, gvalue: 0 } };
var emptyMonster = { "id": "", "name": "", "level": "", "b_hp": "", "b_atk": "", "b_def": "", "b_spd": "", "b_crate": "", "b_cdmg": "", "b_res": "", "b_acc": "" };

var focusRuneSlotCount = 10;
var gridRunes = null;
var gridCrafts = null;
var gridMons = null;

var estimatedCountAnimOptions = {
    useEasing: true,
    useGrouping: true,
    separator: '.',
    decimal: ',',
};
var estimatedCountAnim;
var foundCountAnim;

// init worker

var worker_main = null;
var workerPermutationsDone = false;

function initMainWorker(setsForAllSlots, allOneSet, requestedSetNumber, requestedSetTypes, monster, runes, options_optimization) {
    var workerPermutationsDone = false;
    worker_main = new Worker('/js/worker_main.js');

    worker_main.onmessage = function (e) {
        // Log the workers message.
        if (e.data.cmd == 'report') {
            $('#optimizer-status-numbers').text(shortenNumber(e.data.allRunePermutations) + ' / 0');
        }
        if (e.data.cmd == 'report_builds') {
            $('#optimizer-status-progress').text(e.data.overallProgress + '%');
            $('#optimizer-status-numbers').text(shortenNumber(e.data.allPermutationsCount) + ' / ' + shortenNumber((e.data.overallProgress / 100) * e.data.allPermutationsCount));
            if (!SWO.func.objectIsEmpty(currentFilters))
                foundCountAnim.update(e.data.overallBuilds);
        }
        if (e.data.cmd == 'done') {
            setFinishedState();
            updateGridData(e.data.builds);

            worker_main.terminate();
            worker_main = null;
        }
        if (e.data.cmd == 'done_permutations') {
            workerPermutationsDone = true;
        }
        if (e.data.cmd == 'cancel') {
            setFinishedState();
            $('#optimizer-status-desc').html('Calculation stopped.');
            if (e.data.reason)
                $('#optimizer-status-numbers').text(e.data.reason);

            worker_main.terminate();
            worker_main = null;
        }

    };
    worker_main.postMessage({ cmd: 'start', setsForAllSlots: setsForAllSlots, allOneSet: allOneSet, requestedSetNumber: requestedSetNumber, requestedSetTypes: requestedSetTypes, monster: monster, runes: runes, options_optimization: options_optimization, crafts_optimizedData: crafts_optimizedData });
}

$.fn.dataTable.ext.search.push(
	function (settings, data, dataIndex) {
	    if (settings.sTableId === 'grid_runes') {
	        var passed = true;
	        for (colID in runeFilter) {
	            if (!runeFilter[colID].value || runeFilter[colID].value == '')
	                break;

	            if (runeFilter[colID].type === 'range') {
	                if (runeFilter[colID].value[0] > data[colID] || runeFilter[colID].value[1] < data[colID]) {
	                    passed = false;
	                    break;
	                }
	            }
	            if (runeFilter[colID].type === 'multi') {
	                if (runeFilter[colID].value.indexOf(data[colID]) === -1) {
	                    passed = false;
	                    break;
	                }
	            }
	            if (runeFilter[colID].type === 'special') {
	                if (runeFilter[colID].id === 'runes-filter-amplifiable') {
	                    if (!crafts_optimizedData || !crafts_optimizedData[data[0]]) {
	                        passed = false;
	                        break;
	                    }
	                    if ((runeFilter[colID].value.indexOf('G') !== -1 && !crafts_optimizedData[data[0]].G) ||
                            (runeFilter[colID].value.indexOf('E') !== -1 && !crafts_optimizedData[data[0]].E) ||
                            (runeFilter[colID].value.indexOf('GUngrinded') !== -1 && !crafts_optimizedData[data[0]].ungrinded)) {
	                        passed = false;
	                        break;
	                    }
	                }
	                if (runeFilter[colID].id === 'runes-filter-sstat') {
	                    for (var i = 0; i < runeFilter[colID].value.length; i++) {
	                        if (data[substatsToColumnMap[runeFilter[colID].value[i]]] === '-') {
	                            passed = false;
	                            break;
	                        }
	                    }
	                }
	                if (runeFilter[colID].id === 'runes-filter-location') {
	                    if ((runeFilter[colID].value === 'inventory' && data[colID] !== 'Inventory') ||
                            (runeFilter[colID].value === 'monsters' && data[colID] === 'Inventory') ||
                            (runeFilter[colID].value === 'storage' && (data[colID].indexOf('*') === -1 && data[colID].indexOf('Storage') === -1)) ||
                            (runeFilter[colID].value === 'monsterbox' && (data[colID].indexOf('*') >= 0 || data[colID].indexOf('Storage') >= 0 || data[colID] === 'Inventory'))) {
	                        passed = false;
	                        break;
	                    }
	                }
	                if (runeFilter[colID].id === 'runes-filter-lockstate') {
	                    if (runeFilter[colID].value != data[colID]) {
	                        passed = false;
	                        break;
	                    }
	                }
	            }
	        };
	        if (!passed)
	            return false;
	    }

	    return true;
	}
);


// ----------------------------- HELPER FUNCTIONS
function removeObjectFromArrayByProperty(data, prop, value) {
    for (var i = data.length - 1; i >= 0; i--) {
        if (data[i][prop] === value) {
            data.splice(i, 1);
            break;
        }
    }
    return data;
}
SWO.func.removeObjectFromArrayByProperty = removeObjectFromArrayByProperty;

// removes duplicated runes from array
function arrayOfRunesUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i]["id"] === a[j]["id"])
                a.splice(j--, 1);
        }
    }

    return a;
};

// Short-circuiting, and saving a parse operation
function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

// ----------------------------- DATATABLES FUNCTIONS
function initRunesTable(dataSet) {
    var data1 = [];
    if (dataSet !== null && dataSet.length > 0)
        data1 = dataSet;
    return $('#grid_runes').DataTable({
        "bDestroy": true,
        "lengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "data": data1,
        "order": [[0, "asc"]],
        'bAutoWidth': false,
        "deferRender": true,
        "columns": [
			{ "data": "id" },
			{ "data": "monster_n" },
			{ "data": "set" },
			{ "data": "slot" },
			{ "data": "grade" },
			{ "data": "level" },
            { "data": "quality", "defaultContent": "Unknown" },
            { "data": "efficiency" },
            { "data": "max_efficiency" },
            
			{ "data": "m_t" },
			{ "data": "m_v" },
			{ "data": "i_t" },
			{ "data": "i_v" },
            { "data": null },
            

            //ATK% ATK DEF% DEF HP% HP SPD ACC RES CRate CDmg
			{ "data": null, "defaultContent": "-" },
			{ "data": null, "defaultContent": "-" },
			{ "data": null, "defaultContent": "-" },
			{ "data": null, "defaultContent": "-" },
			{ "data": null, "defaultContent": "-" },
			{ "data": null, "defaultContent": "-" },
			{ "data": null, "defaultContent": "-" },
			{ "data": null, "defaultContent": "-" },
			{ "data": null, "defaultContent": "-" },
			{ "data": null, "defaultContent": "-" },
			{ "data": null, "defaultContent": "-" },

			{ "data": "locked", "visible": false },
            { "data": "unique_id", "visible": false }
        ],
        "columnDefs": [
            { "orderSequence": ["desc", "asc"], "targets": [7, 8, 10, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] },
            {
                "render": function (data, type, row) {
                    row.efficiency = Number(getRuneEfficiency(row, 2).current);
                    return row.efficiency;
                },
                "targets": 7
            },
            {
                "render": function (data, type, row) {
                    row.max_efficiency = Number(getRuneEfficiency(row, 2).max);
                    return row.max_efficiency;
                },
                "targets": 8
            },
			{
			    "render": function (data, type, row) {
			        if (type === 'display') {
			            if (row.locked == 1)
			                return '<a href="#" class="del_row" title"Delete Rune"></a> / <a href="#" data-locked="1" class="lockRune" title="Lock rune"></a>';
			            else
			                return '<a href="#" class="del_row" title"Delete Rune"></a> / <a href="#" data-locked="0" class="lockRune" title="Unlock rune"></a>';
			        } else {
			            return row.locked
			        }

			    },
			    "targets": 13
			},
			{
			    "orderData": [14],
			    "targets": [13]
			},
            {
                "render": function (data, type, row, meta) {
                    return setTableFieldSubstats(data, type, meta);
                },
                "targets": [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
            }
        ],
        "rowCallback": function (row, data, index) {
            var rune_class = getRuneColorClass(data);
            $(row).removeClass('common magic rare hero legendary').addClass(rune_class);
        }
    });
}

var columnsToSubstatMap = { 14: 'ATK%', 15: 'ATK flat', 16: 'DEF%', 17: 'DEF flat', 18: 'HP%', 19: 'HP flat', 20: 'SPD', 21: 'ACC', 22: 'RES', 23: 'CRate', 24: 'CDmg' };
var substatsToColumnMap = { 'ATK%': 14, 'ATK flat': 15, 'DEF%': 16, 'DEF flat': 17, 'HP%': 18, 'HP flat': 19, 'SPD': 20, 'ACC': 21, 'RES': 22, 'CRate': 23, 'CDmg': 24 };
function setTableFieldSubstats(data, type, meta) {
    for (var i = 1; i < 5; i++) {
        if (data['s' + i + '_t'] !== "" && data['s' + i + '_t'] === columnsToSubstatMap[meta.col]) {
            if (type !== 'display') {
                return data['s' + i + '_v'];
            } else {
                if (data['s' + i + '_data'].gvalue && data['s' + i + '_data'].gvalue > 0) {
                    var grindstoned = ' class="grindstone"';
                    var grindstone_value = (SWO.getSetting('general_showGrindvalues')) ? '[' + data['s' + i + '_data'].gvalue + ']' : '';
                } else {
                    var grindstoned = '';
                    var grindstone_value = '';
                }

                var enchanted = (data['s' + i + '_data'].enchanted) ? '<span class="enchant-indicator"></span>' : '';

                var can_grind = (crafts_runeToCraft[data.id] && crafts_runeToCraft[data.id].G[columnsToSubstatMap[meta.col]]) ? '<div class="runeTable-amplifyRune grind" data-type="G">G</div>' : '';
                var can_enchant = (crafts_runeToCraft[data.id] && !SWO.func.objectIsEmpty(crafts_runeToCraft[data.id].E)) ? '<div class="runeTable-amplifyRune enchant" data-type="E">E</div>' : '';

                return '<span' + grindstoned + '>' + data['s' + i + '_v'] + ' ' + grindstone_value + '</span>' + enchanted + can_grind + can_enchant;
            }
        }
    }
}

function getRuneColorClass(rune) {
    var rune_class = 'common';
    if (rune.s4_t && rune.s4_v && rune.s4_v > 0) {
        rune_class = 'legend';
    } else if (rune.s3_t && rune.s3_v && rune.s3_v > 0) {
        rune_class = 'hero';
    } else if (rune.s2_t && rune.s2_v && rune.s2_v > 0) {
        rune_class = 'rare';
    } else if (rune.s1_t && rune.s1_v && rune.s1_v > 0) {
        rune_class = 'magic';
    }
    return rune_class;
}

function initMonstersTable(dataSet) {
    var data1 = [];
    if (dataSet !== null && dataSet.length > 0)
        data1 = dataSet;
    return $('#grid_monsters').DataTable({
        "bDestroy": true,
        "lengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "data": data1,
        "order": [[0, "asc"]],
        'bAutoWidth': false,
        "deferRender": true,
        "columns": [
			{ "data": "id" },
			{ "data": "name" },
			{ "data": "level" },
			{ "data": "b_hp" },
			{ "data": "b_atk" },
			{ "data": "b_def" },
			{ "data": "b_spd" },
			{ "data": "b_crate" },
			{ "data": "b_cdmg" },
			{ "data": "b_res" },
			{ "data": "b_acc" },
            { "data": null, "visible": false },
			{ "data": null, "visible": false },
			{ "data": null, "visible": false },
			{ "data": null, "visible": false },
			{ "data": null, "visible": false },
			{ "data": null, "visible": false },
			{ "data": null, "visible": false },
			{ "data": null, "visible": false },
            { "data": null, "defaultContent": 0 },
			{ "data": null, "defaultContent": 0 },
            { "data": null, "defaultContent": 0 },
			{ "data": null, "defaultContent": '' },
			{ "data": null, "defaultContent": '<a href="#" class="del_row" title="Delete Monster"></a><a href="#" class="monster-dmg" title="Damage calculations for the specific monster"></a><a href="#" class="monster-optimize" title="Go to optimizer section and select this monster."></a>' },
            { "data": "unit_id", "visible": false },
            { "data": "master_id", "visible": false },
            { "data": "stars", "visible": false },
            { "data": "attribute", "visible": false },
            { "data": "location", "visible": false }
        ],
        "columnDefs": [
            { "orderSequence": ["desc", "asc"], "targets": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
			{
			    "render": function (data, type, row, meta) {
			        if (!SWO.allData)
			            return;
			        var data_value = getActualMonsterDataForTable(row, meta);
			        return data_value;
			    },
			    "targets": [11, 12, 13, 14, 15, 16, 17, 18]
			},
            {
                "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        var level_str = '';
                        var awake_str = '';

                        if (data < 40)
                            level_str = '<span class="monster-levelToMax"></span>';
                        if (row.master_id && row.master_id.toString().slice(-2, -1) == 0)
                            awake_str = '<span class="monster-awakeToMax"></span>';

                        return data + level_str + awake_str + '<span class="loading-small"></span>';
                    } else {
                        return data;
                    }
                },
                "targets": 2
            },
            {
                "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        return '<img class="monster-icon" data-loaded="false" data-master_id="' + row.master_id + '" src="/images/monster_missing.png" />' + data + '<div class="monster-rename"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></div>';
                    } else {
                        return data;
                    }

                },
                "targets": 1
            },
            {
                "render": function (data, type, row, meta) {
                    return row.a_dps;

                },
                "targets": 19
            },
            {
                "render": function (data, type, row, meta) {
                    return row.a_effhp;

                },
                "targets": 20
            },
            {
                "render": function (data, type, row, meta) {
                    return row.rune_avg;

                },
                "targets": 21
            },
            {
                "render": function (data, type, row, meta) {
                    if (type !== 'display' || !SWO.tables.gridRunes)
                        return

                    var runes_check_count, runes_check_lock = '';
                    var runes = getRunesWithMons(SWO.tables.gridRunes, row.id);

                    // check if 6 runes are equipped
                    runes_check_count = (runes.length === 6) ? '<span class="monRunes-indicators runeset-full" title="' + runes.length + ' / 6 runes equipped."></span>' : '<span class="monRunes-indicators runeset-notfull" title="' + runes.length + ' / 6 runes equipped."></span>';

                    //check for lock state
                    var runesLocked = true;
                    $.each(runes, function (key, value) {
                        if (value.locked === 0) {
                            runesLocked = false;
                            return false;
                        }     
                    });
                    runes_check_lock = (runesLocked && runes.length > 0) ? '<a href="#" class="monRunes-indicators monRunes-lockState" title="Runes are locked. Click to unlock." data-action="unlock"></a>' : '<a href="#" class="monRunes-indicators monRunes-lockState" title="Runes are unlocked. Click to lock." data-action="lock"></a>';
                    return runes_check_count + runes_check_lock;
                },
                "targets": 22
            }
        ],
        "rowCallback": function (row, data, index) {
            if (data.master_id) {
                setTimeout(function () {
                    SWO.api.swarfarm.getMonsterIcon({ id: data.master_id, parent: '#grid_monsters' });
                }, 1);
            }
        }
    });
}

function initCraftsTable(dataSet) {
    var data1 = [];
    if (dataSet && dataSet !== null && dataSet.length > 0)
        data1 = dataSet;
    return $('#grid_crafts').DataTable({
        "bDestroy": true,
        "lengthMenu": [[10, 20, -1], [10, 20, "All"]],
        "data": data1,
        "order": [[0, "asc"]],
        'bAutoWidth': false,
        "deferRender": true,
        "columns": [
            {
                "class": "details-control",
                "orderable": false,
                "data": null,
                "defaultContent": ""
            },
			{ "data": "id" },
			{ "data": "type" },
			{ "data": "set" },
			{ "data": "stat" },
			{ "data": "grade" },
            { "data": null, "defaultContent": '<a href="#" class="del_row" title="Delete Craft"></a>' },
            { "data": "item_id", "visible": false }
        ],
        "columnDefs": [
			{
			    "render": function (data, type, row) {
			        return (data === 'G') ? 'Grindstone' : 'Enchantment';
			    },
			    "targets": 2
			},
            {
                "render": function (data, type, row) {
                    return craftsGradeToString[data];
                },
                "targets": 5
            }
        ],
        "rowCallback": function (row, data, index) {
        	$(row).removeClass('common magic rare hero legendary').addClass(craftsGradeToString[data.grade].toLowerCase());
        	
            if (!crafts_craftToMonster)
                return;
            $(row).removeClass('no-crafts');
            if (!crafts_craftToMonster[data.id])
                $(row).addClass('no-crafts');

        }
    });
}

var displayStatMap = {11: 'a_hp', 12: 'a_atk', 13: 'a_def', 14: 'a_spd', 15: 'a_crate', 16: 'a_cdmg', 17: 'a_res', 18: 'a_acc'};

function getActualMonsterDataForTable(data, meta) {
    tempMonsterStats[data.id] = extendMonster(data, getRunesWithMonsFromData(data.id), { clearExtraFields: true });
    return tempMonsterStats[data.id][displayStatMap[meta.col]];
}

function refreshGridCraftsFilters(gridR) {
    // add filters in Rune table footers
    gridR.columns().flatten().each(function (colIdx) {
        if (colIdx != 0 && colIdx != 1 && colIdx != 6) {
            // Create the select list and search operation
            var oldVal = $(gridR.column(colIdx).footer()).find("select").val();
            $(gridR.column(colIdx).footer()).html("");
            var select = $('<select />')
					.appendTo(
							gridR.column(colIdx).footer()
					)
					.on('change', function () {
					    gridR
                                .column(colIdx)
                                .search($(this).val())
                                .draw();
					});
            select.append($('<option value=""></option>'));
            // Get the search data for the first column and add to the select list
            gridR
        .column(colIdx)
        .cache('search')
        .sort()
        .unique()
        .each(function (d) {
            select.append($('<option value="' + d + '">' + d + '</option>'));
        });
            select.val(oldVal);
        }
    });
}

// gets array of runes from a table by monster id
function getRunesWithMons(table, monsterId) {
    var monsterId = SWO.func.getRealID('gridMons', monsterId);
    var rowsData = [];
    table.data().each(function (d) {
        if (d.monster == monsterId) {
            rowsData.push(JSON.parse(JSON.stringify(d)));
        }
    });
    
    //sort slots
    rowsData.sort(function (a, b) {
        return parseFloat(a.slot) - parseFloat(b.slot);
    });

    return rowsData;
}
SWO.func.getRunesWithMons = getRunesWithMons;

function getRunesWithMonsBySlot(table, monsterId) {
    var monsterId = SWO.func.getRealID('gridMons', monsterId);
    var rowsData = [];
    table.data().each(function (d) {
        if (d.monster == monsterId) {
            if (!rowsData[d.slot])
                rowsData[d.slot] = {};
            rowsData[d.slot] = JSON.parse(JSON.stringify(d));
        }
    });

    return rowsData;
}

function getRunesWithMonsFromData(monsterId) {
    if (!SWO.allData)
        return;
    var monsterId = SWO.func.getRealID('gridMons', monsterId);
    var runes = SWO.allData.runes;
    var rowsData = [];
    $.each(runes, function (key, value) {
        if (value.monster == monsterId) {
            rowsData.push(JSON.parse(JSON.stringify(value)));
        }
    });

    //sort slots
    rowsData.sort(function (a, b) {
        return parseFloat(a.slot) - parseFloat(b.slot);
    });

    return rowsData;
}

function toggleVisibility(table, columns) {
    for (var i = 0; i < columns.length; i++) {
        var column = table.column(columns[i]);
        column.visible(!column.visible());
    }
}

// ----------------------------- Rune management functions
function populateRuneMainStat() {
    var val = 0;
    if ($("#rune_grade").val() == "1" || $("#rune_grade").val() == "2") {
        $("#rune_mainvalue").val(val);
        return true;
    }
    if ($("#rune_grade").val() != "" && $("#rune_level").val() != "" && $("#rune_maintype").val() != "") {
        val = allRunesStats[$("#rune_maintype").val()]["g" + $("#rune_grade").val()][Number($("#rune_level").val())];
    }
    if (typeof val === "undefined") {
        val = 0;
    }
    $("#rune_mainvalue").val(val);
}

// display rune in "Rune details" panel
function displayRune(rune) {
	var monster = SWO.func.getRowData('gridMons', rune.monster || 0);
    var monster_id = (monster.unit_id) ? monster.unit_id : monster.id;
    var monster_id = (!monster_id && rune.monster === 0) ? 0 : monster_id;
    
    $("#rune_id").val(rune.id);
    $("#rune_monster").val(monster_id);
    $("#rune_set").val(rune.set);
    $("#rune_slot").val(rune.slot);
    $("#rune_grade").val(rune.grade);
    $("#rune_level").val(rune.level);
    $("#rune_maintype").val(rune.m_t);
    $("#rune_mainvalue").val(rune.m_v);
    $("#rune_innatetype").val(rune.i_t);
    $("#rune_innatevalue").val(rune.i_v);
    $("#rune_stat1type").val(rune.s1_t);
    $("#rune_stat1value").val(rune.s1_v);
    $("#rune_stat2type").val(rune.s2_t);
    $("#rune_stat2value").val(rune.s2_v);
    $("#rune_stat3type").val(rune.s3_t);
    $("#rune_stat3value").val(rune.s3_v);
    $("#rune_stat4type").val(rune.s4_t);
    $("#rune_stat4value").val(rune.s4_v);
}
function unequipRuneBySlot(monster_id, slot) {
    var runes = getRunesWithMons(SWO.tables.gridRunes, monster_id);
    $.each(runes, function (index, value) {
        if (value.slot === slot) {
            value.monster = 0;
            value.monster_n = 'Inventory';
            value.locked = 0;
            SWO.func.updateDataRow('gridRunes', value);
            return false;
        }
    });
}

// create a rune in table with data from "Rune details" panel
function createRune() {
    if (Number($("#rune_monster").val()) > 0) {
        unequipRuneBySlot(Number($("#rune_monster").val()), Number($("#rune_slot").val()));
    }
    
    var monster = SWO.func.getRowData('gridMons', Number($("#rune_monster").val()));

    var newRune = { "DT_RowId": "row_" + SWO.vars.nextRuneId, "id": SWO.vars.nextRuneId, "monster": (monster.id || 0), "monster_n": $("#rune_monster option:selected").text(), "set": $("#rune_set").val(), "slot": Number($("#rune_slot").val()), "grade": Number($("#rune_grade").val()), "level": Number($("#rune_level").val()), "m_t": $("#rune_maintype").val(), "m_v": Number($("#rune_mainvalue").val()), "i_t": $("#rune_innatetype").val(), "i_v": Number($("#rune_innatevalue").val()), "s1_t": $("#rune_stat1type").val(), "s1_v": Number($("#rune_stat1value").val()), "s1_data": { gvalue: 0, enchanted: false }, "s2_t": $("#rune_stat2type").val(), "s2_v": Number($("#rune_stat2value").val()), "s2_data": { gvalue: 0, enchanted: false }, "s3_t": $("#rune_stat3type").val(), "s3_v": Number($("#rune_stat3value").val()), "s3_data": { gvalue: 0, enchanted: false }, "s4_t": $("#rune_stat4type").val(), "s4_v": Number($("#rune_stat4value").val()), "s4_data": { gvalue: 0, enchanted: false }, "locked": 0, unique_id: null, quality: 'Unknown' };

    SWO.func.addDataRow('gridRunes', newRune);
}

// update a rune in table with data from "Rune details" panel
function updateRune() {
    var data = SWO.func.getRowData('gridRunes', Number($("#rune_id").val()));

    var locations = { origLocation: data.monster, location: Number($("#rune_monster").val()) };

    if (data.monster !== Number($("#rune_monster").val())) {
        unequipRuneBySlot(Number($("#rune_monster").val()), data.slot);
    }
    
	var monster = SWO.func.getRowData('gridMons', Number($("#rune_monster").val()));

    data.monster = monster.id || Number($("#rune_monster").val());
    data.monster_n = $("#rune_monster option:selected").text();
    data.set = $("#rune_set").val();
    data.slot = Number($("#rune_slot").val());
    data.grade = Number($("#rune_grade").val());
    data.level = Number($("#rune_level").val());
    data.m_t = $("#rune_maintype").val();
    data.m_v = Number($("#rune_mainvalue").val());
    data.i_t = $("#rune_innatetype").val();
    data.i_v = Number($("#rune_innatevalue").val());
    data.s1_t = $("#rune_stat1type").val();
    data.s1_v = Number($("#rune_stat1value").val());
    data.s2_t = $("#rune_stat2type").val();
    data.s2_v = Number($("#rune_stat2value").val());
    data.s3_t = $("#rune_stat3type").val();
    data.s3_v = Number($("#rune_stat3value").val());
    data.s4_t = $("#rune_stat4type").val();
    data.s4_v = Number($("#rune_stat4value").val());
    displayRuneSlot("rune_preview", data, data.slot, false);

    SWO.func.updateDataRow('gridRunes', data);

    return locations;
}

function changeRuneLockState(ids, newstate, save) {
    if (!ids)
        return;

    var lockValue = (newstate === 'lock') ? 1 : 0;

    if (typeof ids === 'number') {
        var data = SWO.func.getRowData('gridRunes', ids);
        data.locked = lockValue;
        SWO.func.updateDataRow('gridRunes', data);
        SWO.func.invalidateRow('gridRunes', data.id);
        SWO.func.invalidateRow('gridMons', data.monster);
    } else {
        for (var i = 0; i < ids.length; i++) {
            var data = SWO.func.getRowData('gridRunes', ids[i]);
            data.locked = lockValue;
            SWO.func.updateDataRow('gridRunes', data);
            SWO.func.invalidateRow('gridRunes', data.id);
        }
        SWO.func.refreshRowData('gridMons', data.monster);
    }

    if (save)
        SWO.func.saveData();

}
SWO.func.changeRuneLockState = changeRuneLockState;

function grindstoneRune(table, id, slot, fields, value, gvalue) {
    var data = SWO.func.getRowData('gridRunes', id);

    $.each(fields, function (index, evalue) {
        data[evalue] = value;
    });

    if (data[slot + '_data']) {
        data[slot + '_data'].gvalue = gvalue;
    } else {
        data[slot + '_data'] = { gvalue: gvalue, enchanted: false };
    }

    SWO.func.updateDataRow('gridRunes', data);
}

function enchantRune(table, data) {
    var d = SWO.func.getRowData('gridRunes', data.rune.id);

    d[craftSubstatMap[d[data.enchantSlot + '_t']]] = "-";
    d[craftSubstatMap[data.stat]] = data.realValue;

    d[data.enchantSlot + '_t'] = data.stat;
    d[data.enchantSlot + '_v'] = data.realValue;
    d[data.enchantSlot + '_data'] = { enchanted: true, gvalue: 0 };

    SWO.func.updateDataRow('gridRunes', d);
}

// ----------------------------- Monster management functions
// display monster in "Monster details" panel
function displayMonster(monster) {
    $("#monster_id").val(monster.id);
    $("#monster_name").val(monster.name);
    $("#monster_level").val(monster.level);
    $("#monster_hp").val(monster.b_hp);
    $("#monster_atk").val(monster.b_atk);
    $("#monster_def").val(monster.b_def);
    $("#monster_spd").val(monster.b_spd);
    $("#monster_crate").val(monster.b_crate);
    $("#monster_cdmg").val(monster.b_cdmg);
    $("#monster_res").val(monster.b_res);
    $("#monster_acc").val(monster.b_acc);
}

// display monster in "Optimizer -> 1.Monster and base stats" panel
function displayMonsterOpt(monster, mode) {
    $('.mstats').each(function () {
        var stat = $(this).data('stat');
        var value = monster[mode + '_' + stat] || 0;
        $('span', this).text(value);
    });
}

// display monster set bonuses in "Total set bonuses" panel
function displayMonsterSetBonuses(elementId, monster) {
    var newHtml = '';

    if (monster) {
        var newHtml = '<div class="row">\
    <div class="row stats-header">\
		<div class="col-md-4">Bonus</div>\
		<div class="col-md-4">Actual</div>\
		<div class="col-md-4">+' + (monster.rune_max || 15) + '</div>\
	</div>\
    <div class="stats-body">\
	    <div class="row">\
		    <div class="col-md-4">HP%</div>\
		    <div class="col-md-4">' + monster.o_hp_p + (monster.compare ? SWO.func.compareStats(monster.compare.o_hp_p, monster.o_hp_p) : '') + '</div>\
		    <div class="col-md-4">' + monster.om_hp_p + (monster.compare ? SWO.func.compareStats(monster.compare.om_hp_p, monster.om_hp_p) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">ATK%</div>\
		    <div class="col-md-4">' + monster.o_atk_p + (monster.compare ? SWO.func.compareStats(monster.compare.o_atk_p, monster.o_atk_p) : '') + '</div>\
		    <div class="col-md-4">' + monster.om_atk_p + (monster.compare ? SWO.func.compareStats(monster.compare.om_atk_p, monster.om_atk_p) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">DEF%</div>\
		    <div class="col-md-4">' + monster.o_def_p + (monster.compare ? SWO.func.compareStats(monster.compare.o_def_p, monster.o_def_p) : '') + '</div>\
		    <div class="col-md-4">' + monster.om_def_p + (monster.compare ? SWO.func.compareStats(monster.compare.om_def_p, monster.om_def_p) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">SPD</div>\
		    <div class="col-md-4">' + monster.o_spd + (monster.compare ? SWO.func.compareStats(monster.compare.o_spd, monster.o_spd) : '') + '</div>\
		    <div class="col-md-4">' + monster.om_spd + (monster.compare ? SWO.func.compareStats(monster.compare.om_spd, monster.om_spd) : '') + '</div>\
	    </div>\
        <div class="row">\
		    <div class="col-md-4">CRate</div>\
		    <div class="col-md-4">' + monster.o_crate + (monster.compare ? SWO.func.compareStats(monster.compare.o_crate, monster.o_crate) : '') + '</div>\
		    <div class="col-md-4">' + monster.om_crate + (monster.compare ? SWO.func.compareStats(monster.compare.om_crate, monster.om_crate) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">CDmg</div>\
		    <div class="col-md-4">' + monster.o_cdmg + (monster.compare ? SWO.func.compareStats(monster.compare.o_cdmg, monster.o_cdmg) : '') + '</div>\
		    <div class="col-md-4">' + monster.om_cdmg + (monster.compare ? SWO.func.compareStats(monster.compare.om_cdmg, monster.om_cdmg) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">RES</div>\
		    <div class="col-md-4">' + monster.o_res + (monster.compare ? SWO.func.compareStats(monster.compare.o_res, monster.o_res) : '') + '</div>\
		    <div class="col-md-4">' + monster.om_res + (monster.compare ? SWO.func.compareStats(monster.compare.om_res, monster.om_res) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">ACC</div>\
		    <div class="col-md-4">' + monster.o_acc + (monster.compare ? SWO.func.compareStats(monster.compare.o_acc, monster.o_acc) : '') + '</div>\
		    <div class="col-md-4">' + monster.om_acc + (monster.compare ? SWO.func.compareStats(monster.compare.om_acc, monster.om_acc) : '') + '</div>\
        </div>\
	    <div class="row">\
		    <div class="col-md-4">HP flat</div>\
		    <div class="col-md-4">' + monster.o_hp + (monster.compare ? SWO.func.compareStats(monster.compare.o_hp, monster.o_hp) : '') + '</div>\
		    <div class="col-md-4">' + monster.om_hp + (monster.compare ? SWO.func.compareStats(monster.compare.om_hp, monster.om_hp) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">ATK flat</div>\
		    <div class="col-md-4">' + monster.o_atk + (monster.compare ? SWO.func.compareStats(monster.compare.o_atk, monster.o_atk) : '') + '</div>\
		    <div class="col-md-4">' + monster.om_atk + (monster.compare ? SWO.func.compareStats(monster.compare.om_atk, monster.om_atk) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">DEF flat</div>\
		    <div class="col-md-4">' + monster.o_def + (monster.compare ? SWO.func.compareStats(monster.compare.o_def, monster.o_def) : '') + '</div>\
		    <div class="col-md-4">' + monster.om_def + (monster.compare ? SWO.func.compareStats(monster.compare.om_def, monster.om_def) : '') + '</div>\
	    </div>\
	</div>';
    }
    $('#' + elementId).html(newHtml);
}

function displayMonsterActualStats(elementId, monster) {
    var dmgString = '';
    if (monster && monster.dmgCustom)
        dmgString = '<div class="dmgTooltip" title="DMG value is either a combined value of Crit, Atk and CritDMG or a custom damage value which considered skill multipliers etc. Depends on your Optimizer settings when this build was created. "><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></div>'
    
    var statsBoniString = '';
    if (monster && monster.bonusStatData) {
        var statsBoni_boni = '';
        $.each(monster.bonusStatData, function (key, value) {
            if (value > 0) {
                statsBoni_boni = (statsBoni_boni === '') ? 'Boni: ' : statsBoni_boni;
                statsBoni_boni += key + ': ' + value + '% ';
            }
        });
        statsBoniString += statsBoni_boni;
    }

    if (monster && monster.gOptimization) {
        var statsBoni_grinds = '';
        if (monster.gOptimization.state === true)
            statsBoni_grinds += 'Grinds ON (' + monster.gOptimization.mode + ')';

        statsBoniString += statsBoni_grinds;
    }

    var newHtml = '';
    if (monster) {
        var newHtml = '<div class="row">\
	<div class="row stats-header">\
		<div class="col-md-4">Stat</div>\
		<div class="col-md-4">Actual</div>\
		<div class="col-md-4">+' + (monster.rune_max || 15) + '</div>\
	</div>\
    <div class="stats-body">\
	    <div class="row">\
		    <div class="col-md-4">HP</div>\
		    <div class="col-md-4">' + monster.a_hp + (monster.compare ? SWO.func.compareStats(monster.compare.a_hp, monster.a_hp) : '') + '</div>\
		    <div class="col-md-4">' + monster.m_hp + (monster.compare ? SWO.func.compareStats(monster.compare.m_hp, monster.m_hp) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">ATK</div>\
		    <div class="col-md-4">' + monster.a_atk + (monster.compare ? SWO.func.compareStats(monster.compare.a_atk, monster.a_atk) : '') + '</div>\
		    <div class="col-md-4">' + monster.m_atk + (monster.compare ? SWO.func.compareStats(monster.compare.m_atk, monster.m_atk) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">DEF</div>\
		    <div class="col-md-4">' + monster.a_def + (monster.compare ? SWO.func.compareStats(monster.compare.a_def, monster.a_def) : '') + '</div>\
		    <div class="col-md-4">' + monster.m_def + (monster.compare ? SWO.func.compareStats(monster.compare.m_def, monster.m_def) : '') + '</div>\
	    </div>\
	    <div class="row speed">\
		    <div class="col-md-4">SPD</div>\
		    <div class="col-md-4 monster-base hidden" data-orig="' + monster.b_spd + '">' + monster.b_spd + '</div>\
		    <div class="col-md-4 monster-actual" data-orig="' + monster.a_spd + '">' + monster.a_spd + (monster.compare ? SWO.func.compareStats(monster.compare.a_spd, monster.a_spd) : '') + '</div>\
		    <div class="col-md-4 monster-max" data-orig="' + monster.m_spd + '">' + monster.m_spd + (monster.compare ? SWO.func.compareStats(monster.compare.m_spd, monster.m_spd) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">CRate</div>\
		    <div class="col-md-4">' + monster.a_crate + (monster.compare ? SWO.func.compareStats(monster.compare.a_crate, monster.a_crate) : '') + '</div>\
		    <div class="col-md-4">' + monster.m_crate + (monster.compare ? SWO.func.compareStats(monster.compare.m_crate, monster.m_crate) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">CDmg</div>\
		    <div class="col-md-4">' + monster.a_cdmg + (monster.compare ? SWO.func.compareStats(monster.compare.a_cdmg, monster.a_cdmg) : '') + '</div>\
		    <div class="col-md-4">' + monster.m_cdmg + (monster.compare ? SWO.func.compareStats(monster.compare.m_cdmg, monster.m_cdmg) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">RES</div>\
		    <div class="col-md-4">' + monster.a_res + (monster.compare ? SWO.func.compareStats(monster.compare.a_res, monster.a_res) : '') + '</div>\
		    <div class="col-md-4">' + monster.m_res + (monster.compare ? SWO.func.compareStats(monster.compare.m_res, monster.m_res) : '') + '</div>\
	    </div>\
	    <div class="row">\
		    <div class="col-md-4">ACC</div>\
		    <div class="col-md-4">' + monster.a_acc + (monster.compare ? SWO.func.compareStats(monster.compare.a_acc, monster.a_acc) : '') + '</div>\
		    <div class="col-md-4">' + monster.m_acc + (monster.compare ? SWO.func.compareStats(monster.compare.m_acc, monster.m_acc) : '') + '</div>\
	    </div>\
        <div class="row">\
			<div class="col-md-4">DMG ' + dmgString + '</div>\
			<div class="col-md-4">' + monster.a_dps + (monster.compare ? SWO.func.compareStats(monster.compare.a_dps, monster.a_dps) : '') + '</div>\
			<div class="col-md-4">' + monster.m_dps + (monster.compare ? SWO.func.compareStats(monster.compare.m_dps, monster.m_dps) : '') + '</div>\
		</div>\
        <div class="row">\
			<div class="col-md-4">Eff.HP</div>\
			<div class="col-md-4">' + monster.a_effhp + (monster.compare ? SWO.func.compareStats(monster.compare.a_effhp, monster.a_effhp) : '') + '</div>\
			<div class="col-md-4">' + monster.m_effhp + (monster.compare ? SWO.func.compareStats(monster.compare.m_effhp, monster.m_effhp) : '') + '</div>\
		</div>\
        <div class="row">\
			<div class="col-md-4">Eff.HP D</div>\
			<div class="col-md-4">' + monster.a_effhp_d + (monster.compare ? SWO.func.compareStats(monster.compare.a_effhp_d, monster.a_effhp_d) : '') + '</div>\
			<div class="col-md-4">' + monster.m_effhp_d + (monster.compare ? SWO.func.compareStats(monster.compare.m_effhp_d, monster.m_effhp_d) : '') + '</div>\
		</div>\
	    <div class="row">\
		    <div class="col-md-4">Effcy%</div>\
		    <div class="col-md-4">' + monster.rune_avg + (monster.compare ? SWO.func.compareStats(monster.compare.rune_avg, monster.rune_avg) : '') + '</div>\
		    <div class="col-md-4">-</div>\
	    </div>\
        <div class="stats-sets">' + (monster.sets || '-') + '</div>\
        <div class="stats-boni">' + (monster && monster.optSubslotsNoMax ? 'Slots 1,3,5 = +12 | ' : '') + (statsBoniString || 'No boni.') + '</div>\
    </div>';
    }
    $('#' + elementId).html(newHtml);
}

function displayRuneSlot(elementId, rune, slot, upgradeCheck, data, args, craftType) {
    var upgradeIndicator = {};
    for (i = 1; i < 5; i++) {
        upgradeIndicator['s' + i] = '';
        if (upgradeCheck) {
            if (rune && crafts_optimizedData[rune.id]) {
                if (!data) {
                    var wantedCraftType = (!craftType) ? SWO.crafts.filterMode : craftType;
                    if ((wantedCraftType === 'G' && !crafts_optimizedData[rune.id].G) || (wantedCraftType === 'E' && !crafts_optimizedData[rune.id].E))
                        continue;

                    if (crafts_optimizedData[rune.id].possibleCrafts['s' + i].length > 0) {
                        $.each(crafts_optimizedData[rune.id].possibleCrafts['s' + i], function (index, value) {
                            if (value.type === wantedCraftType) {
                                upgradeIndicator['s' + i] = 'upgradable';
                                $('#' + elementId).addClass('upgradable');
                            }
                        });
                    }
                    $('#' + elementId).addClass('upgradable');
                } else {
                    if (crafts_optimizedData[rune.id].possibleCrafts['s' + i].length > 0) {
                        $.each(crafts_optimizedData[rune.id].possibleCrafts['s' + i], function (index, value) {
                            if (value.id === data.craft_id) {
                                upgradeIndicator['s' + i] = 'upgradable';
                                $('#' + elementId).addClass('upgradable');
                            }
                        });
                    }
                }
            }
        }
    }

    var newHtml = '';
    if (rune) {
        $('#' + elementId).attr('data-rune_id', rune.id).attr('data-loaded', 'true');
        if (args && args.classes && args.classes !== '')
            $('#' + elementId).addClass(args.classes);

        var efficiency = Math.round(rune.efficiency);
        var locking = (rune.locked === 0) ? '<a href="#" class="runeSlot-lockState" data-action="lock"></a>' : '<a href="#" class="runeSlot-lockState" data-action="unlock"></a>';

        var gradeClass = getRuneColorClass(rune);

        newHtml = '<div class="row">\
		<div class="runeSlot-header"><div class="runeSlot-stars ' + gradeClass + '">' + rune.grade + '&#9733;</div>\
		+'+ rune.level + ' ' + rune.set + ' (' + rune.slot + ')<div class="runeSlot-locking">' + locking + '</div>\
		</div>\
	</div>\
	<div class="row">\
		<div class="col-md-7">&nbsp;&nbsp;'+ rune.m_t + '</div>\
		<div class="col-md-5">+'+ rune.m_v + '</div>\
	</div>';
        var innate_value = (rune.i_v > 0) ? '+' + rune.i_v : '';
            newHtml += '<div class="row" style="font-style: italic;"><div class="col-md-7">&nbsp;&nbsp;' + (rune.i_t || '-') + '</div>\
		<div class="col-md-5">' + innate_value + '</div></div>';
		
        if (rune.s1_t) {
            var grindstone_effect = (rune.s1_data && rune.s1_data.gvalue > 0) ? 'grindstone' : '';
            var enchant_effect = (rune.s1_data && rune.s1_data.enchanted) ? '<span class="enchant-indicator"></span>' : '';
            newHtml += '<div class="row"><div class="col-md-7 ' + upgradeIndicator['s1']+ '">&nbsp;&nbsp;' +rune.s1_t + '</div>\
		<div class="col-md-5 ' + grindstone_effect + '">+' + rune.s1_v + enchant_effect + '</div></div>';
        }
        if (rune.s2_t) {
            var grindstone_effect = (rune.s2_data && rune.s2_data.gvalue > 0) ? 'grindstone' : '';
            var enchant_effect = (rune.s2_data && rune.s2_data.enchanted) ? '<span class="enchant-indicator"></span>' : '';
            newHtml += '<div class="row"><div class="col-md-7 ' + upgradeIndicator['s2'] + '">&nbsp;&nbsp;' + rune.s2_t + '</div>\
		<div class="col-md-5 ' + grindstone_effect + '">+' + rune.s2_v + enchant_effect + '</div></div>';
        }
        if (rune.s3_t) {
            var grindstone_effect = (rune.s3_data && rune.s3_data.gvalue > 0) ? 'grindstone' : '';
            var enchant_effect = (rune.s3_data && rune.s3_data.enchanted) ? '<span class="enchant-indicator"></span>' : '';
            newHtml += '<div class="row"><div class="col-md-7 ' + upgradeIndicator['s3'] + '">&nbsp;&nbsp;' + rune.s3_t + '</div>\
		<div class="col-md-5 ' + grindstone_effect + '">+' + rune.s3_v + enchant_effect + '</div></div>';
        }
        if (rune.s4_t) {
            var grindstone_effect = (rune.s4_data && rune.s4_data.gvalue > 0) ? 'grindstone' : '';
            var enchant_effect = (rune.s4_data && rune.s4_data.enchanted) ? '<span class="enchant-indicator"></span>' : '';
            newHtml += '<div class="row"><div class="col-md-7 ' + upgradeIndicator['s4'] + '">&nbsp;&nbsp;' + rune.s4_t + '</div>\
		<div class="col-md-5 ' + grindstone_effect + '">+' + rune.s4_v + enchant_effect + '</div></div>';
        }
        var popover = (args || rune.monster === 0) ? 'forbidden' : '';
        var monsterID = (args || rune.monster === 0) ? '' : ' (' + rune.monster + ')';
        var locationString = (args && args.locString) ? args.locString : 'Location';
        var locationMonName = (args && args.previousMonName) ? args.previousMonName : '<span data-id="' + (rune.monster || 0) + '" class="monster-data ' + popover + '">' + rune.monster_n + '</span>';
        var locationOrigin = (!args && typeof rune.originID != 'undefined' && rune.originID !== rune.monster) ? '<br />Origin: ' + rune.originName : '';
        var locationOriginString = (locationOrigin !== '' && rune.originID > 0) ? locationOrigin + ' (' + rune.originID + ')' : locationOrigin;

        newHtml += '<div class="row">\
			<div class="col-md-12 runeSlot-footer">ID: ' + rune.id + '<br />' + locationString + ': ' + (locationMonName || '-') + monsterID + locationOriginString + '</div>\
		</div>';
        newHtml += '<div class="rune-efficiency">' + efficiency + '% EFF</div></div>';
        var lock_string = (rune.locked === 0) ? 'Lock' : 'Unlock';
        newHtml += '<div class="rune-menu"><span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span> More</div><div class="rune-actions">\
                <div class="rune-action exclude">Exclude</div>\
                <div class="rune-action include">Include</div>\
                <div class="rune-action locking">' + lock_string + '</div>\
                <div class="rune-action view">View</div>\
            </div></div>';
    } else {
        newHtml = '<div class="row">\
		<strong><center>\
		<br/>Empty slot ('+ slot + ')\
		</center></strong>\
	</div>';
    }
    $('#' + elementId).html(newHtml);
    $('#' + elementId).addClass("runeSlot");
}

SWO.func.displayRuneSlot = displayRuneSlot;

// create a monster in table with data from "Monster details" panel
function createMonster() {
    var newMonster = { "DT_RowId": "row_" + SWO.vars.nextMonsId, "id": SWO.vars.nextMonsId, "name": $("#monster_name").val(), "level": Number($("#monster_level").val()), "b_hp": Number($("#monster_hp").val()), "b_atk": Number($("#monster_atk").val()), "b_def": Number($("#monster_def").val()), "b_spd": Number($("#monster_spd").val()), "b_crate": Number($("#monster_crate").val()), "b_cdmg": Number($("#monster_cdmg").val()), "b_res": Number($("#monster_res").val()), "b_acc": Number($("#monster_acc").val()), attribute: null, stars: null, master_id: null, unit_id: null, location: 'inventory', attribute: '' };

    SWO.func.addDataRow('gridMons', newMonster);
}

// update a monster in table with data from "Monster details" panel
function updateMonster() {
    var d = SWO.func.getRowData('gridMons', Number($("#monster_id").val()));

    d.name = $("#monster_name").val();
    d.level = Number($("#monster_level").val());
    d.b_hp = Number($("#monster_hp").val());
    d.b_atk = Number($("#monster_atk").val());
    d.b_def = Number($("#monster_def").val());
    d.b_spd = Number($("#monster_spd").val());
    d.b_crate = Number($("#monster_crate").val());
    d.b_cdmg = Number($("#monster_cdmg").val());
    d.b_res = Number($("#monster_res").val());
    d.b_acc = Number($("#monster_acc").val());

    SWO.func.updateDataRow('gridMons', d);

    SWO.tables.gridRunes.data().each(function (d) {
        if (d.monster == Number($("#monster_id").val())) {
            d.monster_n = $("#monster_name").val();
        }
    });

    SWO.tables.gridRunes.rows().invalidate().draw();
}

function replaceMonstersInSelect(elementId, table, leaveFirstOption) {
    var $el = $('#' + elementId);
    var oldValue = $el.val();
    if (leaveFirstOption)
        $('#' + elementId + ' option:gt(0)').remove();
    else
        $el.empty(); // remove old options
    table.data().each(function (d) {
        $el.append($("<option></option>")
         .attr("value", d.unit_id || d.id).text(d.name));
    });
    $el.val(oldValue);
}
SWO.optimizer.replaceMonstersInSelect = replaceMonstersInSelect;

function deleteRunesByMonsterId(gridRunes, monsterid) {
    var rowsToDelete = [];
    gridRunes.rows().eq(0).each(function (index) {
        var row = gridRunes.row(index);
        var data = row.data();
        if (data.monster == monsterid) {
            rowsToDelete.push(index);
        }
    });
    for (var i = rowsToDelete.length - 1; i >= 0; i--) {
        gridRunes
		.row(rowsToDelete[i])
		.remove()
		.draw();
    }
    gridRunes.rows().invalidate().draw();
    SWO.func.invalidateRow('gridMons', monsterid);
}

// create a monster in table with data from "Monster details" panel
function displayCraft(craft) {
    $("#craft_id").val(craft.id);
    $("#craft_type").val(craft.type);
    $("#craft_set").val(craft.set);
    $("#craft_stat").val(craft.stat);
    $("#craft_grade").val(craft.grade);
}
function createCraft() {
    var newCraft = { "DT_RowId": "row_" + SWO.vars.nextCraftId, "id": SWO.vars.nextCraftId, "type": $("#craft_type").val(), "set": $("#craft_set").val(), "stat": $("#craft_stat").val(), "grade": Number($("#craft_grade").val()), item_id: null };

    SWO.func.addDataRow('gridCrafts', newCraft);
}
function updateCraft() {
    var d = SWO.func.getRowData('gridCrafts', Number($("#craft_id").val()));

    d.type = $("#craft_type").val();
    d.set = $("#craft_set").val();
    d.stat = $("#craft_stat").val();
    d.grade = Number($("#craft_grade").val());

    SWO.func.updateDataRow('gridCrafts', d);
}

// ----------------------------- CALCULATE MONSTER ACTUAL STATS FUNCTIONS
// extend a basic monster with 0 valies
function emptyExtend(monster) {
    return $.extend(monster, {
        "b_dps": 0, "a_hp": 0, "a_atk": 0, "a_def": 0, "a_spd": 0, "a_crate": 0, "a_cdmg": 0, "a_res": 0, "a_acc": 0, "a_dps": 0, "a_effhp": 0, "a_effhp_d": 0,
        "m_hp": 0, "m_atk": 0, "m_def": 0, "m_spd": 0, "m_crate": 0, "m_cdmg": 0, "m_res": 0, "m_acc": 0, "m_dps": 0, "m_effhp": 0, "m_effhp_d": 0,
        "o_hp_p": 0, "o_hp": 0, "o_atk_p": 0, "o_atk": 0, "o_def_p": 0, "o_def": 0, "o_spd_p": 0, "o_spd": 0, "o_crate": 0, "o_cdmg": 0, "o_res": 0, "o_acc": 0,
        "om_hp_p": 0, "om_hp": 0, "om_atk_p": 0, "om_atk": 0, "om_def_p": 0, "om_def": 0, "om_spd_p": 0, "om_spd": 0, "om_crate": 0, "om_cdmg": 0, "om_res": 0, "om_acc": 0,
        "rune_avg": 0, "rune_ids": "", "sets": "", "slots246": "", "rune_max": 15, "subsUpgrades": 0
    });
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
function addStat(monster, type, value, add_max, grade, level, toFixed) {
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
                monster.o_spd += toFixed ? monster.b_spd * value / 100 : Math.ceil(monster.b_spd * value / 100);
                monster.om_spd += toFixed ? monster.b_spd * value / 100 : Math.ceil(monster.b_spd * value / 100);
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

// add all rune stat to monsters rune bonus stats
function equipRune(monster, rune, runeMax, optSubslotsNoMax) {
    monster = ((rune.slot == 1 || rune.slot == 3 || rune.slot == 5) && optSubslotsNoMax) ? addStat(monster, rune.m_t, rune.m_v, 12, rune.grade, rune.level) : addStat(monster, rune.m_t, rune.m_v, runeMax, rune.grade, rune.level);
    monster = addStat(monster, rune.i_t, rune.i_v, false, rune.grade);
    monster = addStat(monster, rune.s1_t, rune.s1_v, false, null);
    monster = addStat(monster, rune.s2_t, rune.s2_v, false, null);
    monster = addStat(monster, rune.s3_t, rune.s3_v, false, null);
    monster = addStat(monster, rune.s4_t, rune.s4_v, false, null);
    if (rune.level < 12)
        monster.subsUpgrades += parseInt((14 - rune.level) / 3, 10);

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
function calculateActualAndMax(monster, runeMax, bonusStatData, toFixed) {
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
    monster.a_spd = toFixed ? (monster.b_spd + ((monster.b_spd * monster.o_spd_p) / 100) + monster.o_spd).toFixed(toFixed) : monster.b_spd + Math.ceil((monster.b_spd * monster.o_spd_p) / 100) + monster.o_spd;
    monster.a_crate = monster.b_crate + monster.o_crate;
    monster.a_cdmg = monster.b_cdmg + monster.o_cdmg;
    monster.a_res = monster.b_res + monster.o_res;
    monster.a_acc = monster.b_acc + monster.o_acc;
    // max
    monster.m_hp = monster.b_hp + Math.ceil((monster.b_hp * monster.om_hp_p) / 100) + monster.om_hp;
    monster.m_atk = monster.b_atk + Math.ceil((monster.b_atk * monster.om_atk_p) / 100) + monster.om_atk;
    monster.m_def = monster.b_def + Math.ceil((monster.b_def * monster.om_def_p) / 100) + monster.om_def;
    monster.m_spd = toFixed ? (monster.b_spd + ((monster.b_spd * monster.om_spd_p) / 100) + monster.om_spd).toFixed(toFixed) : monster.b_spd + Math.ceil((monster.b_spd * monster.om_spd_p) / 100) + monster.om_spd;
    monster.m_crate = monster.b_crate + monster.om_crate;
    monster.m_cdmg = monster.b_cdmg + monster.om_cdmg;
    monster.m_res = monster.b_res + monster.om_res;
    monster.m_acc = monster.b_acc + monster.om_acc;

    monster.rune_max = runeMax;
    return monster;
}

// determines rune set bonuses and adds them into rune bonus stats
function determineCompleteSetsAndEffects(monster, runes, toFixed) {
    var setCounter = { "Energy": 0, "Fatal": 0, "Blade": 0, "Rage": 0, "Swift": 0, "Focus": 0, "Guard": 0, "Endure": 0, "Violent": 0, "Will": 0, "Nemesis": 0, "Shield": 0, "Revenge": 0, "Despair": 0, "Vampire": 0, "Destroy": 0, "Fight": 0, "Determination": 0, "Enhance": 0, "Accuracy": 0, "Tolerance": 0 };
    for (i = 0; i < runes.length; i++) {
        setCounter[runes[i].set]++;
    }
    for (var setName in setCounter) {
        while (setCounter[setName] >= allSets[setName][0]) {
            if (monster.sets != "")
                monster.sets += ",";
            monster.sets += setName;
            monster = addStat(monster, allSets[setName][1], allSets[setName][2], false, null, null, toFixed);
            setCounter[setName] -= allSets[setName][0];
        }
    }
    return monster;
}

function calculateEffectiveHp(monster) {
    var defBreakMultiplier = 0.9;
    var noDefBreakMultiplier = 3;

    // calculate base eff. hp
    monster.b_effhp = Math.floor(monster.b_hp * (1000 + monster.b_def * noDefBreakMultiplier) / 1000);
    monster.b_effhp_d = Math.floor(monster.b_hp * (1000 + monster.b_def * defBreakMultiplier) / 1000);

    // calculate actual eff. hp
    monster.a_effhp = Math.floor(monster.a_hp * (1000 + monster.a_def * noDefBreakMultiplier) / 1000);
    monster.a_effhp_d = Math.floor(monster.a_hp * (1000 + monster.a_def * defBreakMultiplier) / 1000);

    // calculate max eff. hp
    monster.m_effhp = Math.floor(monster.m_hp * (1000 + monster.m_def * noDefBreakMultiplier) / 1000);
    monster.m_effhp_d = Math.floor(monster.m_hp * (1000 + monster.m_def * defBreakMultiplier) / 1000);
    return monster;
}

// calculates all rune bonuses over a monster and returns monster_extended object
function extendMonster(monster, runes, o) {
    var monster_x = emptyExtend(monster);

    var defaults = {
        runeMax: runeMaxLevel,
        clearExtraFields: false,
        optSubslotsNoMax: false,
        dmgCustom: false,
        bonusStatData: false,
        gOptimization: false,
        toFixed: false
    };
    var options = $.extend({}, defaults, o);

    monster.rune_avg = 0;
    if (runes.length > 0) {
        var all_efficiency = 0;
        for (i = 0; i < runes.length; i++) {
            monster_x = equipRune(monster_x, runes[i], options.runeMax, options.optSubslotsNoMax);

            if (runes[i].efficiency)
                all_efficiency += parseFloat(runes[i].efficiency);
        }
        monster.rune_avg = (all_efficiency / runes.length).toFixed(2) || 0;
    }

    if (options.gOptimization && options.gOptimization.state) {
        var grindstonePool = getBuildGrindstones(runes, options.gOptimization.mode);

        if (!SWO.func.objectIsEmpty(grindstonePool)) {
            grindstonePool.forEach(function (craft, idx, array) {
                if (craft.improvement)
                    monster_x = addStat(monster_x, craft.stat, craft.improvement, false, null);
            });
        }
    }

    monster_x = determineCompleteSetsAndEffects(monster_x, runes, options.toFixed);

    monster_x = calculateActualAndMax(monster_x, options.runeMax, options.bonusStatData, options.toFixed);

    monster_x = SWO.func.calculateDamage(monster_x, options.dmgCustom);
    monster_x = calculateEffectiveHp(monster_x);
    if (options.clearExtraFields) {
        delete monster_x["o_hp_p"];
        delete monster_x["o_hp"];
        delete monster_x["o_atk_p"];
        delete monster_x["o_atk"];
        delete monster_x["o_def_p"];
        delete monster_x["o_def"];
        delete monster_x["o_spd"];
        delete monster_x["o_crate"];
        delete monster_x["o_cdmg"];
        delete monster_x["o_res"];
        delete monster_x["o_acc"];
        delete monster_x["om_hp_p"];
        delete monster_x["om_hp"];
        delete monster_x["om_atk_p"];
        delete monster_x["om_atk"];
        delete monster_x["om_def_p"];
        delete monster_x["om_def"];
        delete monster_x["om_spd"];
        delete monster_x["om_crate"];
        delete monster_x["om_cdmg"];
        delete monster_x["om_res"];
        delete monster_x["om_acc"];
    }
    
    return monster_x;
}

function getBuildGrindstones(runes, mode) {
    var grindstonePool = [];
    var grindstoneMap = {};
    var runeLockedStatMap = {};

    // get all available grindstones for this build
    var runes_length = runes.length;
    for (var i = 0; i < runes_length; i++) {
        if (!crafts_optimizedData[runes[i].id] || !crafts_optimizedData[runes[i].id].G)
            continue;

        Object.keys(crafts_optimizedData[runes[i].id]['possibleCrafts']).forEach(function (key, idx) {
            for (var j = 0; j < crafts_optimizedData[runes[i].id]['possibleCrafts'][key].length; j++) {
                if (crafts_optimizedData[runes[i].id]['possibleCrafts'][key][j].type !== 'G')
                    continue;

                var gvalue = runes[i][key + '_data'].gvalue || 0;
                if (!grindstoneMap[crafts_optimizedData[runes[i].id]['possibleCrafts'][key][j].id]) {
                    var craft = SWO.func.cloneObject(crafts_optimizedData[runes[i].id]['possibleCrafts'][key][j]);

                    grindstoneMap[craft.id] = [];
                    grindstoneMap[craft.id].push({ rune_id: runes[i].id, substat: key, eff_value: (craftsValueMap[craft.type][craft.stat]['g' + craft.grade][mode] - gvalue) });

                    grindstonePool.push(craft);
                } else {
                    var craft = crafts_optimizedData[runes[i].id]['possibleCrafts'][key][j];
                    grindstoneMap[craft.id].push({ rune_id: runes[i].id, substat: key, eff_value: (craftsValueMap[craft.type][craft.stat]['g' + craft.grade][mode] - gvalue) });
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

function getRuneMax() {
    if ($('.optimizertable-menu.active').length > 0) {
        return parseInt($('.optimizertable-menu.active').data('max'));
    } else {
        return runeMaxLevel;
    }
}

function getRuneMode() {
    if ($('.optimizertable-menu.active').length > 0) {
        return $('.optimizertable-menu.active').data('mode');
    }
}

// ----------------------------- Import and Export functions
function fixImportSavedBuilds(builds) {
    for (var i = 0; i < builds.length; i++) {
        if (Object.prototype.toString.call(builds[i].build.rune_ids) === '[object Array]') {
            builds[i].build.rune_ids = builds[i].build.rune_ids.join();
        }
    }
    return builds;
}

// find the last object id
function findMaxId(data) {
    var maxId = 0;
    if (!data)
        return;

    // do it from end to start because most likely the biggest is at the end 
    for (i = data.length - 1; i >= 0; i--) {
        if (data[i].id > maxId)
            maxId = data[i].id;
    }
    return maxId;
}

function getRuneEfficiency(rune, toFixed) {
    var toFixed = toFixed ? toFixed : 2;
    var ratio = 0.0;

    // main stat
    ratio += allStatsMax[rune['m_t']]['g' + rune.grade] / allStatsMax[rune['m_t']]['g6'];

    // sub stats
    for (var i = 1; i < 5; i++) {
        if (rune['s' + i + '_t'] && allSubStatsMax[rune['s' + i + '_t']]) {
            var value = (rune['s' + i + '_t'].indexOf("flat") > -1) ? rune['s' + i + '_v'] / 2 : rune['s' + i + '_v'];
            ratio += value / allSubStatsMax[rune['s' + i + '_t']]['g6'];
        }
    }

    // innate stat
    if (rune['i_t'] && allSubStatsMax[rune['i_t']]) {
        var value = (rune['i_t'].indexOf("flat") > -1) ? rune['i_v'] / 2 : rune['i_v'];
        ratio += value / allSubStatsMax[rune['i_t']]['g6'];
    }

    var efficiency = ratio / 2.8 * 100;

    return { current: (ratio / 2.8 * 100).toFixed(toFixed), max: (efficiency + Math.max(Math.ceil((12 - rune.level) / 3.0), 0) * 0.2 / 2.8 * 100).toFixed(toFixed) };
}

// ----------------------------- Optimizer functions
function totalRunes(data) {
    var count = 0;
    for (var id in data) {
        if (data[id])
            count += data[id];
    }
    return count;
}

// valuate if a rune is focus worthy
function isRuneFocusWorthy(d, focusStats) {
    // judge slots 2,4 and 6 by mainstat, if the mainstat for the slot is not selected
    if ((d.slot == 2 && !$("#opt_slot2").val()) || (d.slot == 4 && !$("#opt_slot4").val()) || (d.slot == 6 && !$("#opt_slot6").val())) {
        if (d.m_t.indexOf(focusStats[0]) > -1 || d.m_t.indexOf(focusStats[1]) > -1 || d.m_t.indexOf(focusStats[2]) > -1 || d.m_t.indexOf(focusStats[3]) > -1 || d.m_t.indexOf(focusStats[4]) > -1)
            return true;
    }

    // judge slots 1,3 and 5 by substats only
    if (d.i_t != "" && (d.i_t.indexOf(focusStats[0]) > -1 || d.i_t.indexOf(focusStats[1]) > -1 || d.i_t.indexOf(focusStats[2]) > -1 || d.i_t.indexOf(focusStats[3]) > -1 || d.i_t.indexOf(focusStats[4]) > -1))
        return true;
    if (d.s1_t != "" && (d.s1_t.indexOf(focusStats[0]) > -1 || d.s1_t.indexOf(focusStats[1]) > -1 || d.s1_t.indexOf(focusStats[2]) > -1 || d.s1_t.indexOf(focusStats[3]) > -1 || d.s1_t.indexOf(focusStats[4]) > -1))
        return true;
    if (d.s2_t != "" && (d.s2_t.indexOf(focusStats[0]) > -1 || d.s2_t.indexOf(focusStats[1]) > -1 || d.s2_t.indexOf(focusStats[2]) > -1 || d.s2_t.indexOf(focusStats[3]) > -1 || d.s2_t.indexOf(focusStats[4]) > -1))
        return true;
    if (d.s3_t != "" && (d.s3_t.indexOf(focusStats[0]) > -1 || d.s3_t.indexOf(focusStats[1]) > -1 || d.s3_t.indexOf(focusStats[2]) > -1 || d.s3_t.indexOf(focusStats[3]) > -1 || d.s3_t.indexOf(focusStats[4]) > -1))
        return true;
    if (d.s4_t != "" && (d.s4_t.indexOf(focusStats[0]) > -1 || d.s4_t.indexOf(focusStats[1]) > -1 || d.s4_t.indexOf(focusStats[2]) > -1 || d.s4_t.indexOf(focusStats[3]) > -1 || d.s4_t.indexOf(focusStats[4]) > -1))
        return true;

    // if everything failed, check if the rune set bonus equals any focus
    if (allSets[d.set][1].indexOf(focusStats[0]) > -1 || allSets[d.set][1].indexOf(focusStats[1]) > -1 || allSets[d.set][1].indexOf(focusStats[2]) > -1 || allSets[d.set][1].indexOf(focusStats[3]) > -1 || allSets[d.set][1].indexOf(focusStats[4]) > -1)
        return true;

    return false;
}

// get percentage and flat bonuses of type
function getRuneBonuses(rune, stat) {
    var result = [0, 0];
    if (stat != null && stat != "") {
        if (rune.m_t != "" && rune.m_t.indexOf(stat) > -1) {
            if (rune.m_t.indexOf("%") > -1 || stat == "ACC" || stat == "RES" || stat == "SPD" || stat == "CRate" || stat == "CDmg")
                result[0] += allStatsMax[rune.m_t]["g" + rune.grade];
            else
                result[1] += allStatsMax[rune.m_t]["g" + rune.grade];
        }
        if (rune.i_t != "" && rune.i_t.indexOf(stat) > -1) {
            if (rune.i_t.indexOf("%") > -1 || stat == "ACC" || stat == "RES" || stat == "SPD" || stat == "CRate" || stat == "CDmg")
                result[0] += rune.i_v;
            else
                result[1] += rune.i_v;
        }
        if (rune.s1_t != "" && rune.s1_t.indexOf(stat) > -1) {
            if (rune.s1_t.indexOf("%") > -1 || stat == "ACC" || stat == "RES" || stat == "SPD" || stat == "CRate" || stat == "CDmg")
                result[0] += rune.s1_v;
            else
                result[1] += rune.s1_v;
        }
        if (rune.s2_t != "" && rune.s2_t.indexOf(stat) > -1) {
            if (rune.s2_t.indexOf("%") > -1 || stat == "ACC" || stat == "RES" || stat == "SPD" || stat == "CRate" || stat == "CDmg")
                result[0] += rune.s2_v;
            else
                result[1] += rune.s2_v;
        }
        if (rune.s3_t != "" && rune.s3_t.indexOf(stat) > -1) {
            if (rune.s3_t.indexOf("%") > -1 || stat == "ACC" || stat == "RES" || stat == "SPD" || stat == "CRate" || stat == "CDmg")
                result[0] += rune.s3_v;
            else
                result[1] += rune.s3_v;
        }
        if (rune.s4_t != "" && rune.s4_t.indexOf(stat) > -1) {
            if (rune.s4_t.indexOf("%") > -1 || stat == "ACC" || stat == "RES" || stat == "SPD" || stat == "CRate" || stat == "CDmg")
                result[0] += rune.s4_v;
            else
                result[1] += rune.s4_v;
        }
    }

    var focusWeights = SWO.settings.data.focusWeights;
    if (stat)
        result[0] = result[0] * SWO.settings.data.focusWeights[stat];

    return result;
}

// valuate which of 2 runes is better regarding focuses
function compare2RunesByFocus(rune1, rune2, focusStats) {
    var bonuses1 = [];
    var bonuses2 = [];
    bonuses1.push(getRuneBonuses(rune1, focusStats[0]));
    bonuses1.push(getRuneBonuses(rune1, focusStats[1]));
    bonuses1.push(getRuneBonuses(rune1, focusStats[2]));
    bonuses1.push(getRuneBonuses(rune1, focusStats[3]));
    bonuses1.push(getRuneBonuses(rune1, focusStats[4]));
    bonuses2.push(getRuneBonuses(rune2, focusStats[0]));
    bonuses2.push(getRuneBonuses(rune2, focusStats[1]));
    bonuses2.push(getRuneBonuses(rune2, focusStats[2]));
    bonuses2.push(getRuneBonuses(rune2, focusStats[3]));
    bonuses2.push(getRuneBonuses(rune2, focusStats[4]));

    var totalBonuses1 = [bonuses1[0][0] + bonuses1[1][0] + bonuses1[2][0] + bonuses1[3][0] + bonuses1[4][0], bonuses1[0][1] + bonuses1[1][1] + bonuses1[2][1] + bonuses1[3][1] + bonuses1[4][1]];
    var totalBonuses2 = [bonuses2[0][0] + bonuses2[1][0] + bonuses2[2][0] + bonuses2[3][0] + bonuses2[4][0], bonuses2[0][1] + bonuses2[1][1] + bonuses2[2][1] + bonuses2[3][1] + bonuses2[4][1]];
    if (totalBonuses1[0] > totalBonuses2[0]) {
        return -1;
    }
    else if (totalBonuses1[0] == totalBonuses2[0]) {
        if (totalBonuses1[1] > totalBonuses2[1])
            return -1;
        else
            return 1
    }
    else {
        return 1;
    }

}

// picks candidate runes based on requested set types and filled preferences
function pickCandidateRunes(gridRunes, requestedSetTypes, monsterId) {
    // create 6 empty sets
    var resultSets = [[], [], [], [], [], []];
    var currentEquippedRunesSets = [[], [], [], [], [], []];

    var requestedSetNumber = totalRunes(requestedSetTypes);
    var notWantedRuneIds = [];
    var wantedRuneIds = [];
    var wantedRuneSlots = [];

    if ($('#opt_use_runes').val() != '')
        wantedRuneIds = $('#opt_use_runes').val().split(",");

    if ($('#optFillRunes').is(':checked')) {
        var equippedRunes = getRunesWithMons(gridRunes, monsterId);
        equippedRunes.forEach(rune => {
            wantedRuneIds.push(rune.id);
        });
    }
    if (wantedRuneIds.length > 0) {
        for (var i = 0; i < wantedRuneIds.length; i++) {
            wantedRuneIds[i] = Number(wantedRuneIds[i]);
            var wantedRune = SWO.func.getRowData('gridRunes', wantedRuneIds[i]);
            wantedRuneSlots.push(wantedRune.slot);
        }
    }

    if ($('#opt_not_use_runes').val() != "") {
        notWantedRuneIds = $('#opt_not_use_runes').val().split(",");
        for (var i = 0; i < notWantedRuneIds.length; i++) {
            notWantedRuneIds[i] = Number(notWantedRuneIds[i]);
        }
    }

    var excludedSets = $('#opt_sets_exclude').val();

    //focuses
    var resultSetsFromRequestSets = [
		[[], [], [], [], [], []],
		[[], [], [], [], [], []],
		[[], [], [], [], [], []]
    ];

    var focusStats = $("#opt_focus").val();
    var focusSelected = (!focusStats) ? false : true;
    if (focusStats && focusStats.length > 0) {
        for (var i = 0; i < 5; i++) {
            if (!focusStats[i]) {
                focusStats[i] = null;
            }
        }
    }

    var focusLimit = (Number($('#opt_focus_count').val()) > 0) ? Number($('#opt_focus_count').val()) : focusRuneSlotCount;

    var setLimit = focusLimit / 2;
    var generalLimit = focusLimit;
    if (requestedSetNumber > 0)
        generalLimit = focusLimit / 2;

    gridRunes.data().each(function (d) {
        // check if rune is requested by id and add it
        if (jQuery.inArray(d.id, wantedRuneIds) >= 0) {
            resultSets[d.slot - 1].push(JSON.parse(JSON.stringify(d)));
            if (d.monster == monsterId) {
                currentEquippedRunesSets[d.slot - 1].push(SWO.func.cloneObject(d));
            }
            return;
        } else {
            // check if rune is not requested by id and there is requested rune for that slot
            if (jQuery.inArray(d.slot, wantedRuneSlots) >= 0) {
                return;
            }
        }

        // check if rune is requested by id to not be used
        if (jQuery.inArray(d.id, notWantedRuneIds) >= 0) {
            return;
        }

        // check for excluded sets
        if (jQuery.inArray(d.set, excludedSets) >= 0) {
            return;
        }

        //check for locked runes which are equiped on the monster and prevent them if selected
        if (d.locked == 1 && d.monster == monsterId && $("#opt_use_locked_prevent_equipped").is(':checked')) {
            return;
        }

        // check if rune is locked
        if (d.locked == 1 && !$("#opt_use_locked").is(':checked')) {
            if (d.monster != monsterId)
                return;
        }

        // check if rune is equipped by monster
        if (d.monster != 0 && $("#opt_only_unequipped").is(':checked')) {
            // pick the ones already equipped on the monster
            if (d.monster != monsterId)
                return;
        }
        // if the requested set types slots sum up to 6 (energy + vampire = 6; energy + focus = 4) reject runes not from those sets
        if (requestedSetNumber == 6 && requestedSetTypes[d.set] == 0) {
            return;
        }

        // if slot is 2, 4 or 6 and there are preferences for it, refuse 
        if ((d.slot == 2 && $("#opt_slot2").val() && $.inArray(d.m_t, $("#opt_slot2").val()) === -1) ||
            (d.slot == 4 && $("#opt_slot4").val() && $.inArray(d.m_t, $("#opt_slot4").val()) === -1) ||
            (d.slot == 6 && $("#opt_slot6").val() && $.inArray(d.m_t, $("#opt_slot6").val()) === -1)) {
            return;
        }

        if ($("#opt_only_6star").is(':checked') && d.grade != 6 && (d.slot == 2 || d.slot == 4 || d.slot == 6)) {
            return;
        }
        if ($("#opt_only_56star").is(':checked') && d.grade != 6 && d.grade != 5) {
            return;
        }

        if (d.monster == monsterId) {
            currentEquippedRunesSets[d.slot - 1].push(SWO.func.cloneObject(d));
        }

        if (!focusSelected) {
            resultSets[d.slot - 1].push(SWO.func.cloneObject(d));
        } else {
            // if tehre are no runes, push the first one
            if (resultSets[d.slot - 1].length == 0)
                resultSets[d.slot - 1].push(SWO.func.cloneObject(d));
            else {
                // if there are more runes than the limit check if rune is worthy to consider based on focus
                if (resultSets[d.slot - 1].length < generalLimit || isRuneFocusWorthy(d, focusStats)) {
                    // evaluate the place for the new rune based on focuses	
                    for (var i = resultSets[d.slot - 1].length - 1; i >= 0 ; i--) {
                        var lastRune = resultSets[d.slot - 1][i];
                        var compareResult = compare2RunesByFocus(lastRune, d, focusStats);
                        // if new rune is better than the compared
                        if (compareResult == 1) {
                            if (i == 0) {
                                resultSets[d.slot - 1].splice(0, 0, d);
                                if (resultSets[d.slot - 1].length > generalLimit)
                                    resultSets[d.slot - 1].splice(resultSets[d.slot - 1].length - 1, 1);
                            }
                            else
                                continue;
                        }
                        else if (compareResult == 0) {
                            resultSets[d.slot - 1].splice(i, 0, d);
                            if (resultSets[d.slot - 1].length > generalLimit)
                                resultSets[d.slot - 1].splice(resultSets[d.slot - 1].length - 1, 1);
                        }
                        else {
                            if (i == resultSets[d.slot - 1].length - 1) {
                            }
                            else {
                                resultSets[d.slot - 1].splice(i + 1, 0, d);
                                if (resultSets[d.slot - 1].length > generalLimit)
                                    resultSets[d.slot - 1].splice(resultSets[d.slot - 1].length - 1, 1);
                            }
                        }
                        break;
                    }
                }
            }

            // do the same for every requested set, and join the results
            var s = 0;
            for (var j in requestedSetTypes) {
                if (requestedSetTypes[j] > 0) {
                    if (d.set == j) {
                        // if tehre are no runes, push the first one
                        if (resultSetsFromRequestSets[s][d.slot - 1].length == 0)
                            resultSetsFromRequestSets[s][d.slot - 1].push(SWO.func.cloneObject(d));
                        else {
                            // if there are more runes than the limit check if rune is worthy to consider based on focus
                            if (resultSetsFromRequestSets[s][d.slot - 1].length >= setLimit && !isRuneFocusWorthy(d, focusStats))
                                continue;
                            // evaluate the place for the new rune based on focuses	
                            for (var i = resultSetsFromRequestSets[s][d.slot - 1].length - 1; i >= 0 ; i--) {
                                var lastRune = resultSetsFromRequestSets[s][d.slot - 1][i];
                                var compareResult = compare2RunesByFocus(lastRune, d, focusStats);
                                // if new rune is better than the compared
                                if (compareResult == 1) {
                                    if (i == 0) {
                                        resultSetsFromRequestSets[s][d.slot - 1].splice(0, 0, d);
                                        if (resultSetsFromRequestSets[s][d.slot - 1].length > setLimit)
                                            resultSetsFromRequestSets[s][d.slot - 1].splice(resultSetsFromRequestSets[s][d.slot - 1].length - 1, 1);
                                    } else
                                        continue;
                                } else if (compareResult == 0) {
                                    resultSetsFromRequestSets[s][d.slot - 1].splice(i, 0, d);
                                    if (resultSetsFromRequestSets[s][d.slot - 1].length > setLimit)
                                        resultSetsFromRequestSets[s][d.slot - 1].splice(resultSetsFromRequestSets[s][d.slot - 1].length - 1, 1);
                                } else {
                                    if (i == resultSetsFromRequestSets[s][d.slot - 1].length - 1) {
                                    } else {
                                        resultSetsFromRequestSets[s][d.slot - 1].splice(i + 1, 0, d);
                                        if (resultSetsFromRequestSets[s][d.slot - 1].length > setLimit)
                                            resultSetsFromRequestSets[s][d.slot - 1].splice(resultSetsFromRequestSets[s][d.slot - 1].length - 1, 1);
                                    }
                                }
                                break;
                            }
                        }
                    }

                    s++;
                }
            }

        }

    });

    if (focusSelected) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 6; j++) {
                //$.merge(resultSets[j], resultSetsFromRequestSets[i][j]);
                resultSets[j] = resultSets[j].concat(currentEquippedRunesSets[j]);
                resultSets[j] = arrayOfRunesUnique(resultSets[j].concat(resultSetsFromRequestSets[i][j]));
            }
        }
    }

    return resultSets;
}

// find all possible permutations and calculate monster stats for them
function optimize(gridRunes, gridMons) {

    // validate monster
    if ($("#opt_monster").val() == "" || $("#opt_monster").val() == "0") {
        SWO.func.showAlertBox("Selected monster is required.");
        return false;
    }

    // validate preferences
    if ($("#opt_set1").val() == "" && $("#opt_set2").val() == "" && $("#opt_set3").val() == "" && !$("#opt_slot2").val() && !$("#opt_slot4").val() && !$("#opt_slot6").val()) {
        SWO.func.showAlertBox("Selected at least one set or main stat for slot 2,4 or 6");
        return false;
    }

    // validate requested sets
    var requestedSetTypes = { "Energy": 0, "Fatal": 0, "Blade": 0, "Rage": 0, "Swift": 0, "Focus": 0, "Guard": 0, "Endure": 0, "Violent": 0, "Will": 0, "Nemesis": 0, "Shield": 0, "Revenge": 0, "Despair": 0, "Vampire": 0, "Destroy": 0, "Fight": 0, "Determination": 0, "Enhance": 0, "Accuracy": 0, "Tolerance": 0 };
    if ($("#opt_set1").val() != "")
        requestedSetTypes[$("#opt_set1").val()] += allSets[$("#opt_set1").val()][0];
    if ($("#opt_set2").val() != "")
        requestedSetTypes[$("#opt_set2").val()] += allSets[$("#opt_set2").val()][0];
    if ($("#opt_set3").val() != "")
        requestedSetTypes[$("#opt_set3").val()] += allSets[$("#opt_set3").val()][0];
    var totalRequestedSlots = totalRunes(requestedSetTypes);
    if (totalRequestedSlots > 6) {
        SWO.func.showAlertBox("Selected sets require more than 6 sots!");
        return;
    }
    window.startTimeOptimizer = new Date().getTime();

    var options_optimization = {};
    options_optimization.runeMax = getRuneMax();
    options_optimization.runeMode = getRuneMode();
    options_optimization.loadCurrent = $("#opt_load_current").is(':checked');

    // invalidate all rows to free RAM
    grid.invalidateAllRows();
    dataView.setItems({});
    grid.render();

    //var extendedMonsters = optimize(gridRunes, gridMons, $('#opt_monster').val(), requestedSetTypes);		
    // get optimized monster
    var monster = SWO.func.getRowData('gridMons', Number($('#opt_monster').val()));
    // set monster in table data to make it easier to access
    currentMonsterID = Number($('#opt_monster').val());

    // get 6 sets of possible runes, 1 for each slot
    var setsForAllSlots = pickCandidateRunes(gridRunes, requestedSetTypes, SWO.func.getRealID('gridMons', Number($('#opt_monster').val())));

    for (var i = 0; i < setsForAllSlots.length; i++) {
        if (setsForAllSlots[i].length == 0) {
            SWO.func.showAlertBox("There are no runes matching your preferences for slot " + (i + 1) + "!");
            return;
        }
    }

    // if no sets are requested, or all runes are requested to be of one set (ex:3x Energy),
    //just create all possible permutations
    var allOneSet = false;
    for (var id in requestedSetTypes) {
        if (requestedSetTypes[id] == 6) {
            allOneSet = true;
            break;
        }
    }
    var requestedSetNumber = totalRunes(requestedSetTypes);

    options_optimization.optBrokenSet = $("#opt_no_broken").is(':checked');
    options_optimization.optSubslotsNoMax = $("#optSubslotsNoMax").is(':checked');
    options_optimization.max_permutations = Number($('#opt_max_permutations').val()) || false;
    options_optimization.threads = Number($('#opt_thread_count').val()) || 4;

    options_optimization.dmgCustom = SWO.func.getDamageOptions(monster);
    options_optimization.bonusStatData = SWO.func.getBonusStatData();
    options_optimization.gOptimization = {
        state: (($('input[name="goptimization"]:checked').val()) === 'off') ? false : true,
        mode: (($('input[name="goptimization"]:checked').val()) === 'min') ? 'min' : 'max'
    };

    options_optimization.prefiltered = {
        state: $("#opt_prefiltered").is(':checked'),
        filter: getFilterByElements()
    }

    // global vars for stat compare etc.
    optSubslotsNoMax = options_optimization.optSubslotsNoMax;
    dmgCustom = options_optimization.dmgCustom;
    bonusStatData = options_optimization.bonusStatData;
    gOptimization = options_optimization.gOptimization;
    currentFilters = options_optimization.prefiltered.filter;

    currentMonsterData = extendMonster(SWO.func.getRowData('gridMons', currentMonsterID), getRunesWithMons(gridRunes, currentMonsterID), { clearExtraFields: true, runeMax: getRuneMax(), optSubslotsNoMax: optSubslotsNoMax, dmgCustom: dmgCustom, bonusStatData: bonusStatData });
    setBonusStatIndicators();

    var monsterBase = getMonsterBaseFields(monster);
    var runes = SWO.tables.gridRunes.rows().data().toArray();

    if (!options_optimization.prefiltered.state)
        currentFilters = {};

    checkFilterRanges();

    $('#optimization-control').removeClass('start').addClass('stop').text('Stop');
    setProcessState();

    initMainWorker(setsForAllSlots, allOneSet, requestedSetNumber, requestedSetTypes, monsterBase, runes, options_optimization);
}

function getMonsterBaseFields(monster) {
    var monsterBase = {};

    SWO.vars.filterFields.base.forEach(field => {
        monsterBase[field] = monster[field];
    });
    return monsterBase;
}

function getEstimatedCount() {
    var requestedSetTypes = { "Energy": 0, "Fatal": 0, "Blade": 0, "Rage": 0, "Swift": 0, "Focus": 0, "Guard": 0, "Endure": 0, "Violent": 0, "Will": 0, "Nemesis": 0, "Shield": 0, "Revenge": 0, "Despair": 0, "Vampire": 0, "Destroy": 0, "Fight": 0, "Determination": 0, "Enhance": 0, "Accuracy": 0, "Tolerance": 0 };
    if ($("#opt_set1").val() != "")
        requestedSetTypes[$("#opt_set1").val()] += allSets[$("#opt_set1").val()][0];
    if ($("#opt_set2").val() != "")
        requestedSetTypes[$("#opt_set2").val()] += allSets[$("#opt_set2").val()][0];
    if ($("#opt_set3").val() != "")
        requestedSetTypes[$("#opt_set3").val()] += allSets[$("#opt_set3").val()][0];

    if (totalRunes(requestedSetTypes) > 6 || Number($('#opt_monster').val()) == 0)
        return 0;

    var availableRunes = pickCandidateRunes(SWO.tables.gridRunes, requestedSetTypes, SWO.func.getRealID('gridMons', Number($('#opt_monster').val())));
    var count = 0;
    availableRunes.forEach((set, i) => {
        if (count === 0 && i === 0) {
            count += set.length;
        } else {
            count = count * set.length;
        }
    });

    return count;
}

function setEstimatedState() {
    if (worker_main)
        return;

    $('#optimizer-status').removeClass('processing finished').addClass('estimate');
    $('#optimizer-status-desc').text('Estimated builds:');

    var estimated = getEstimatedCount();
    var estimatedString = estimated > 10000000 ? '> 10M' : estimated;
    if (estimated > 10000000) {
        $('#optimizer-status-numbers').text('> 10M');
    } else {
        estimatedCountAnim.update(estimated);
    }

    var estimateText = estimated > 2000000 ? SWO.texts.help.estimatedFocus : SWO.texts.help.estimated;
    $('#optimizer-status-right').text(estimateText);
}

function setProcessState() {
    $('#optimizer-status').removeClass('estimate finished').addClass('processing');
    $('#optimizer-status-desc').text('Calculating builds:');
    $('#optimizer-status-right').html('<div class="cp-spinner cp-round"><span id="optimizer-status-progress">0%</span></div>');
    if (!SWO.func.objectIsEmpty(currentFilters))
        $('#optimizer-status-found').fadeIn();
}

function setFinishedState() {
    $('#optimization-control').removeClass('stop').addClass('start').text('Optimize');
    $('#optimizer-status-progress').text('100%');
    $('.cp-spinner').addClass('done');
    $('#optimizer-status-found').hide();
    foundCountAnim.update(0);
    $('#optimizer-status').removeClass('estimate processing').addClass('finished');
}

// ----------------------------- Saved builds functions
//create new tab with id and title
function addTab(id, name, title) {
    var li = $('<li/>');
    // add the link
    li.append('<a href="#' + name + '" data-id="' + id + '" data-toggle="tab">' + title + '</a><p class="nav-deleteBuild" data-id="' + id + '" data-name="' + name + '">x</p>'); //li.append('<span aria-hidden="true">X</span>');
    // add the li to the ul
    $('#buildtabHolder').append(li);

    // add the tab content
    var content = $('<div role="tabpanel" class="tab-pane" data-build-id="' + id + '" id="' + name + '"/>');
    $('#buildtabHolderContents').append(content);
}

// destroy tab
function deleteTab(name) {
    var tab = $('#buildtabHolder li a[href="#' + name + '"]').parents('li');
    $('#' + name).remove();

    var tabSwitch = (tab.hasClass('active')) ? true : false;

    tab.remove();

    if (tabSwitch)
        $("#buildtabHolder a:last").tab('show');
}

function deleteAllSavedBuilds(save) {
    if (!SWO.allData.savedBuilds || SWO.allData.savedBuilds.length === 0)
        return;

    var builds_length = SWO.allData.savedBuilds.length;
    for (var i = 0; i < builds_length; i++) {
        deleteTab("build" + SWO.allData.savedBuilds[i].id);
    }
    // make sure to display import-tab
    var element = $('.win-splitviewcommand[data-target="export"]');
    SWO.func.displaySection(element);
    if (save) {
        SWO.allData.savedBuilds = [];
        SWO.func.saveData();
    }
}

// create tabs and populate with all monster builds data
function displayAllSavedBuilds(gridRunes, gridMons, savedBuilds) {
    for (var i = 0; i < savedBuilds.length; i++) {
        addTab(savedBuilds[i].id, "build" + savedBuilds[i].id, savedBuilds[i].build.name + " (+" + (savedBuilds[i].build.rune_max || 15) + ")");
        displayMonsterBuild(gridRunes, gridMons, "build" + savedBuilds[i].id, savedBuilds[i].build, savedBuilds[i].id);
    }
}

// populate a tab with html and monster build data
function displayMonsterBuild(gridRunes, gridMons, newTabName, monster, buildId, snapShot) {
    var newHtml = '<div class="panel panel-default panel-builds" >\
	<div class="panel-heading">\
	<div class="row">\
	<div class="col-md-12">\
	</div>\
	</div>\
    </div>\
	<div class="panel-body">\
	<div class="row">\
		<div class="col-md-5">\
			<div class="panel panel-default skewd">\
				<div class="panel-heading">New monster stats</div>\
				<div class="panel-body" id="' + newTabName + '_panel2">\
				</div>\
			</div>\
            <div class="panel panel-default skewd">\
				<div class="panel-heading">New rune bonuses</div>\
				<div class="panel-body" id="' + newTabName + '_panel1">\
				</div>\
			</div>\
		</div>\
		\
		<div class="col-md-7">\
			<div class="panel panel-default">\
				<div class="panel-heading">Your new runes\
                 <div class="pull-right">\
		            <button type="submit" class="deleteTab btn btn-danger btn-xs" data-name="' + newTabName + '" data-id="' + buildId + '">Close</button>\
		            <button type="submit" class="buildUnlockRunes btn btn-primary btn-xs" data-monsterid="' + monster.id + '" data-ids="' + monster.rune_ids + '">Unlock runes</button>\
                    <button type="submit" class="buildLockRunes btn btn-primary btn-xs" data-monsterid="' + monster.id + '" data-ids="' + monster.rune_ids + '">Lock runes</button>\
		            <button type="submit" class="buildEquipRunes btn btn-primary btn-xs" data-monsterid="' + monster.id + '" data-monstername="' + monster.name + '" data-ids="' + monster.rune_ids + '">Equip runes</button>\
	            </div>\
                </div>\
				<div class="panel-body" id="' + newTabName + '_panel3">\
				\
					<div class="row">\
						\
						<div class="col-md-4">\
							<br/><br/>\
							<div id="' + newTabName + '_m6_rune"></div>\
							\
						</div>\
						<div class="col-md-4">\
								<div id="' + newTabName + '_m1_rune"></div>\
						</div>\
						\
						<div class="col-md-4">\
							<br/><br/>\
							<div id="' + newTabName + '_m2_rune"></div>\
						</div>\
						\
						\
					</div>\
					\
					<br/>\
					<div class="row">\
						<div class="col-md-4">\
							<div id="' + newTabName + '_m5_rune"></div>\
						</div>\
						\
						<div class="col-md-4">\
							<br/><br/>\
							<div id="' + newTabName + '_m4_rune"></div>\
							\
						</div>\
						<div class="col-md-4">\
							<div id="' + newTabName + '_m3_rune"></div>\
						</div>\
						\
						\
					</div>\
				</div>\
			</div>\
		</div>\
		\
	</div>\
	</div>\
	</div>';

    $('#' + newTabName).html(newHtml);

    if(monster.dmgCustom)
    var dmgCustomLocal = JSON.parse(JSON.stringify(monster.dmgCustom));

    monster = SWO.func.calculateDamage(monster, dmgCustomLocal);
    monster = calculateEffectiveHp(monster);

    if (snapShot && !monster.compare) {
        var monster_actual = extendMonster(SWO.func.getRowData('gridMons', monster.id), getRunesWithMons(gridRunes, monster.id), { runeMax: monster.rune_max, optSubslotsNoMax: (monster.optSubslotsNoMax || false), dmgCustom: dmgCustomLocal });
        monster.compare = JSON.parse(JSON.stringify(monster_actual));
    }

    displayMonsterActualStats(newTabName + '_panel2', monster);
    displayMonsterSetBonuses(newTabName + '_panel1', monster);

    var runeIds = monster.rune_ids.split(",");

    for (var i = 1; i <= 6; i++) {
        slotRune = null;
        for (var j = 0; j < runeIds.length; j++) {

            slotRune = SWO.func.getRowData('gridRunes', Number(runeIds[j]));
            if (slotRune != null && slotRune.slot == i)
                break;
            else
                slotRune = null;
        }
        displayRuneSlot(newTabName + "_m" + i + "_rune", slotRune, i, true, false, false, 'G');
    }

    $('.deleteTab').off('click').on('click', function (e) {
        e.preventDefault();
        deleteTab($(this).data("name"));

        SWO.allData.savedBuilds = removeObjectFromArrayByProperty(SWO.allData.savedBuilds, "id", $(this).data("id"));
        SWO.func.saveData();
    });

    $('.buildLockRunes').off('click').on('click', function (e) {
        e.preventDefault();

        var runes = [];
        if ($(this).data("ids") != "") {
        	var monsterId = Number($(this).data("monsterid"));
            runes = $(this).data("ids").split(",");
            for (var i = 0; i < runes.length; i++) {
                runes[i] = Number(runes[i]);
            }
            changeRuneLockState(runes, 'lock');

            var build_id = $(this).parents('.tab-pane').data('build-id');
            if (build_id)
                refreshBuildTab(build_id);

            SWO.func.saveData();
            SWO.fireAlert("success", "Runes " + $(this).data("ids") + " are locked.");
        }
    });

    $('.buildUnlockRunes').off('click').on('click', function (e) {
        e.preventDefault();

        var runes = [];
        if ($(this).data("ids") != "") {
        	var monsterId = Number($(this).data("monsterid"));
            runes = $(this).data("ids").split(",");
            for (var i = 0; i < runes.length; i++) {
                runes[i] = Number(runes[i]);
            }
            changeRuneLockState(runes, 'unlock');

            var build_id = $(this).parents('.tab-pane').data('build-id');
            if (build_id)
                refreshBuildTab(build_id);

            SWO.func.saveData();
            SWO.fireAlert("success", "Runes " + $(this).data("ids") + " are unlocked.");
        }
    });

    $('.buildEquipRunes').off('click').on('click', function (e) {
        e.preventDefault();

        var runes = [];
        var monsterId = Number($(this).data("monsterid"));
        var monsterName = $(this).data("monstername");
        if ($(this).data("ids") != "" && monsterName != "") {
            runes = $(this).data("ids").split(",");
            for (var i = 0; i < runes.length; i++) {
                runes[i] = Number(runes[i]);
            }
            gridRunes.data().each(function (d) {
                if (d.monster == monsterId) {
                    d.monster = 0;
                    d.monster_n = "Inventory";
                    d.locked = 0;
                }
                if (jQuery.inArray(d.id, runes) >= 0) {
                    d.monster = monsterId;
                    d.monster_n = monsterName;
                }
            });
            gridRunes.rows().invalidate().draw();
            gridMons.rows().invalidate().draw();

            var build_id = $(this).parents('.tab-pane').data('build-id');
            if (build_id)
                refreshBuildTab(build_id);

            SWO.func.saveData();
            SWO.fireAlert("success", "Runes " + $(this).data("ids") + " are equiped to monster " + monsterName + ".");
        }
    });

}

function checkFilterRanges() {
    var filterFields = $('#panel-optimizer-filters input');
    filterFields.tooltip('destroy');

    if (SWO.func.objectIsEmpty(currentFilters))
        return true;

    var failed = false;
    var filter = getFilterByElements();

    Object.keys(currentFilters).forEach((filter_key) => {
        var filterField = currentFilters[filter_key];
        var stat = filter_key.substring(2);
        Object.keys(filterField).forEach((mode) => {
            if (mode === 'min') {
                if (!filter[filter_key] || !filter[filter_key].min || filter[filter_key].min < currentFilters[filter_key].min) {
                    var element = $(`#filter_${mode}_${stat}`);
                    var placement = element.parent().hasClass('no-padding-right') ? 'right' : 'left';
                    setTimeout(function () {
                        if (currentFilters[filter_key])
                            element.tooltip({ placement: placement, trigger: 'manual', title: `Your MIN is ${currentFilters[filter_key].min} ${stat.toUpperCase()}`, template: '<div class="tooltip warning-range" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' }).tooltip('show');
                    }, 500);
                    failed = true;
                }
            } else {
                if (!filter[filter_key] || !filter[filter_key].max || filter[filter_key].max > currentFilters[filter_key].max) {
                    var element = $(`#filter_${mode}_${stat}`);
                    var placement = element.parent().hasClass('no-padding-right') ? 'right' : 'left';
                    setTimeout(function () {
                        if (currentFilters[filter_key])
                            element.tooltip({ placement: placement, trigger: 'manual', title: `Your MAX is ${currentFilters[filter_key].max} ${stat.toUpperCase()}`, template: '<div class="tooltip warning-range" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' }).tooltip('show');
                    }, 500);
                    failed = true;
                }
            }
        });
    });

    return !failed;
}

function getFilterByElements() {
    var stats = ["hp", "atk", "def", "spd", "crate", "cdmg", "res", "acc", "effhp", "effhp_d", "dps", "rune_avg"];
    var filter = {};
    var actual = $('#optimizertable-showActual').hasClass('active') ? true : false;

    var relevant_fields = (actual) ? SWO.vars.filterFields.actual : SWO.vars.filterFields.max;

    for (var i = 0; i < stats.length; i++) {
        if ($('#filter_min_' + stats[i]).val() !== "") {
            filter[relevant_fields[i]] = $.isEmptyObject(filter[relevant_fields[i]]) ? {} : filter[relevant_fields[i]];
            filter[relevant_fields[i]]['min'] = parseInt($('#filter_min_' + stats[i]).val());
        }
        if ($('#filter_max_' + stats[i]).val() !== "") {
            filter[relevant_fields[i]] = $.isEmptyObject(filter[relevant_fields[i]]) ? {} : filter[relevant_fields[i]];
            filter[relevant_fields[i]]['max'] = parseInt($('#filter_max_' + stats[i]).val());
        }
    }
    return filter;
}

function setFilterByElements() {
    var filter = getFilterByElements();

    dataView.setFilterArgs(filter);
    dataView.refresh();
}

function niceNumber(number) {
    // var lang_arr = jQuery.makeArray(Windows.System.UserProfile.GlobalizationPreferences.languages);
    return new Intl.NumberFormat().format(number);
}

function shortenNumber(num, digits) {
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;

    for (var i = units.length - 1; i >= 0; i--) {
        decimal = Math.pow(1000, i + 1);

        if (num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }

    return num;
}

function updateGridData(data) {
	
	var currentMode = $('.optimizertable-menu.active').attr('id');
    var columns;

    switch (currentMode) {
        case 'optimizertable-showActual':
            columns = columns_actual;
            break;
        case 'optimizertable-show12':
        case 'optimizertable-show15':
            columns = columns_max;
            break;
    }
    
    dataView.beginUpdate();
    dataView.setItems(data);
    setFilterByElements();
    dataView.reSort();
    grid.resizeCanvas();
    grid.setColumns(columns);
    dataView.endUpdate();
    var endTime = new Date().getTime();
    var time = endTime - window.startTimeOptimizer;

    $('#optimizer-status-desc').html('<span>' + (new Intl.NumberFormat('de-DE').format(data.length)) + '</span> Builds');
    $('#optimizer-status-numbers').html('found in <span>' + Math.floor(time / 1000) + '</span> secs.');
}

function updateGridPinnedData() {
    var pinnedData = dataViewPinned.getItems();
    if (pinnedData.length === 0)
        return;

    var currentMode = $('.optimizertable-menu.active').attr('id');
    var columns;

    switch (currentMode) {
        case 'optimizertable-showActual':
            columns = columns_actual;
            break;
        case 'optimizertable-show12':
        case 'optimizertable-show15':
            columns = columns_max;
            break;
    }

    dataViewPinned.beginUpdate();
    pinnedData.forEach(build => {
        var rune_ids = build.rune_ids;
        var runes = rune_ids.split(",");
        for (var i = 0; i < 6; i++) {
            runes[i] = SWO.func.getRowData('gridRunes', Number(runes[i]));
        }

        var monster = SWO.func.getRowData('gridMons', currentMonsterID);
        var monster_x = extendMonster(monster, runes, { clearExtraFields: true, runeMax: getRuneMax(), optSubslotsNoMax: optSubslotsNoMax, dmgCustom: dmgCustom, bonusStatData: bonusStatData, gOptimization: gOptimization });
        monster_x.id = monster_x.rune_ids;
        monster_x.unpinnable = true;
        dataViewPinned.updateItem(monster_x.id, monster_x);
    });
    gridPinned.resizeCanvas();
    gridPinned.setColumns(columns);
    dataViewPinned.endUpdate();
    gridPinned.invalidate();
}

// crafts optimize functions and vars
var worker_craftsoptimize = null;

var filteredMonster = [];
var crafts_optimizedData = [];
var crafts_craftToMonster = [];
var crafts_runeToCraft = {};
var crafts_elementSource = null;
var craftSubstatMap = {
    "SPD": "sub_spd",
    "ATK%": "sub_atkp",
    "ATK flat": "sub_atkf",
    "HP%": "sub_hpp",
    "HP flat": "sub_hpf",
    "DEF%": "sub_defp",
    "DEF flat": "sub_deff",
    "CRate": "sub_crate",
    "CDmg": "sub_cdmg",
    "RES": "sub_res",
    "ACC": "sub_acc"
};
var selectedCraftMon = 0;
function initCraftsOptimize() {
    prepareCraftsDataOptimized();
}

function prepareCraftsDataOptimized(rebuildState, donothing) {
    if (!SWO.allData && SWO.allData.crafts && SWO.allData.crafts.length > 0)
        return;

    worker_craftsoptimize = new Worker('/js/worker_craftsoptimize.js');

    worker_craftsoptimize.onmessage = function (e) {
        if (e.data.cmd == 'done') {
            crafts_optimizedData = e.data.crafts_optimizedData;
            crafts_craftToMonster = e.data.crafts_craftToMonster;
            filteredMons = e.data.filteredMons;
            crafts_runeToCraft = e.data.crafts_runeToCraft;

            if(!donothing)
                craftsOptimizationComplete(rebuildState);

            if (worker_craftsoptimize) {
                worker_craftsoptimize.terminate();
                worker_craftsoptimize = null;
            }

            //invalidate all runes to recalculate possible enchats on the substats
            SWO.tables.gridRunes.rows().invalidate();
        }
    };

    var runesData = JSON.parse(JSON.stringify(SWO.allData.runes));
    var runesCrafts = JSON.parse(JSON.stringify(SWO.allData.crafts));

    worker_craftsoptimize.postMessage({ cmd: 'start', runesData: runesData, craftsData: runesCrafts });
}

function craftsOptimizationComplete(rebuildState, forced) {
    if (!forced)
        $(document).trigger('refreshCraftsOptimizeDone');

    var selectMons = [];

    $.each(SWO.allData.mons, function (index, value) {
        selectMons.push({ id: value.id, text: value.name });
    });
    
    var selectMonsFinal = [];
    $.each(selectMons, function (index, value) {
        if (jQuery.inArray(value.id, filteredMons[SWO.crafts.filterMode]) !== -1) {
            selectMonsFinal.push(value);
        }
    });

    $('#crafts-monsters').select2('destroy').html('<option value="0">-</option>').select2({
        data: selectMonsFinal
    });

    if (rebuildState && SWO.crafts.selectedMon > 0 && jQuery.inArray(SWO.crafts.selectedMon, filteredMons[SWO.crafts.filterMode]) !== -1) {
        rebuildCraftState(forced);
    }
}

function rebuildCraftState(forced) {
    SWO.crafts.selectMonster($('#crafts-monsters'));
    $('#crafts-monsters').addClass('display-only').val(SWO.crafts.selectedMon).trigger('change');
    if (forced)
        return;

    if (SWO.crafts.selectedRuneElement)
        SWO.crafts.selectRune(SWO.crafts.selectedRuneElement);
}

function getAllCraftMonsters(craft_id) {
    if (!SWO.allData)
        return null;

    var selectMons = [];
    $.each(SWO.allData.mons, function (index, value) {
        selectMons.push({ id: value.id, text: value.name });
    });

    var selectMonsFinal = [];
    $.each(selectMons, function (index, value) {
        if (jQuery.inArray(value.id, crafts_craftToMonster[craft_id]) !== -1) {
            selectMonsFinal.push(value);
        }
    });
    return selectMonsFinal;
}

function optMonstersSelectionTemplate(state) {
    var monster = SWO.func.getRowData('gridMons', Number(state.id));
    if (monster && monster.master_id) {
        var preset_string = (SWO.settings.data.presets.monster[state.id]) ? ' <span class="preset-selection-available"></span>' : '';
        var $state = $(
            '<span><img class="monster-icon" data-loaded="false" data-master_id="' + monster.master_id + '" src="/images/monster_missing.png" />' + state.text + preset_string + '</span>'
        );
        setTimeout(function () {
            SWO.api.swarfarm.getMonsterIcon({ id: monster.master_id });
        }, 1);

        return $state;
    } else {
        return state.text;
    }
}

function refreshBuildTab(id, hardRefresh) {
    var build = {};
    SWO.allData.savedBuilds.forEach(savedBuild => {
        if (id == savedBuild.id)
            build = savedBuild;
    });

    if (!build.id)
        return;

    if (hardRefresh) {
        var runes = build.build.rune_ids.split(",");
        for (var i = 0; i < 6; i++) {
            var runeData = SWO.func.getRowData('gridRunes', Number(runes[i]));
            if (!SWO.func.objectIsEmpty(runeData)) {
                runes[i] = runeData;
            } else {
                runes.splice(i, 1);
            }
        }
        var monster = extendMonster(build.build, runes,{ runeMax: build.build.rune_max, optSubslotsNoMax: (build.build.optSubslotsNoMax || false), dmgCustom: build.build.dmgCustom, bonusStatData: build.build.bonusStatData, gOptimization: build.build.gOptimization });
        $.extend(build.build, monster);
        SWO.func.saveData();
    }
    displayMonsterBuild(SWO.tables.gridRunes, SWO.tables.gridMons, 'build' + build.id, build.build, build.id);
}

function setBonusStatIndicators() {
    var cols = grid.getColumns();

    $.each(cols, function (key, value) {
        value.cssClass = value.cssClass || '';
        if (bonusStatData && bonusStatData[SWO.vars.bonusStatToColumn[value['field']]] > 0) {
            value.cssClass += ' bonusStats';
        } else {
            value.cssClass = value.cssClass.replace(/(?:^|\s)bonusStats(?!\S)/g, '');
        }
    });
    grid.setColumns(cols);
}

function pinFormatter(row, cell, value, columnDef, dataContext) {
    var content = '';
    var pinned = '';
    var idx = dataViewPinned.getIdxById(dataContext.id);
    if (typeof idx === 'undefined')
        pinned += '<div class="grid-pinrow" data-id="' + dataContext.id + '"></div>';

    if (dataContext.unpinnable)
        pinned += '<div class="grid-pinrow" data-id="' + dataContext.id + '"></div>';

    content += '<span class="grid-runeIDs">' + value + '</span>' + pinned;

    return content;
}

var columns_actual = [
    { id: "rune_ids", name: "Rune-IDs", field: "rune_ids", resizable: false, selectable: false, sortable: true, defaultSortAsc: false, cssClass: 'generate-build', formatter: pinFormatter },
    { id: "sets", name: "Sets", field: "sets", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "a_hp", name: "HP", field: "a_hp", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "a_atk", name: "ATK", field: "a_atk", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "a_def", name: "DEF", field: "a_def", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "a_spd", name: "SPD", field: "a_spd", resizable: false, selectable: false, sortable: true, defaultSortAsc: false, },
    { id: "a_crate", name: "Crit", field: "a_crate", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "a_cdmg", name: "CDMG", field: "a_cdmg", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "a_res", name: "RES", field: "a_res", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "a_acc", name: "ACC", field: "a_acc", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "a_effhp", name: "E.HP", field: "a_effhp", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "a_effhp_d", name: "E.HP D", field: "a_effhp_d", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "slots246", name: "2/4/6", field: "slots246", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "rune_avg", name: "Effcy%", field: "rune_avg", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "a_dps", name: "DMG", field: "a_dps", resizable: false, selectable: false, sortable: true, headerCssClass: 'tableDmgCustom', toolTip: 'A combined value of Crit, Atk and CritDMG. Multipliers, Speed and set bonuses such as violent are not included in the underlying formula.' }
];

var columns_max = [
    { id: "rune_ids", name: "Rune-IDs", field: "rune_ids", resizable: false, selectable: false, sortable: true, defaultSortAsc: false, cssClass: 'generate-build', formatter: pinFormatter },
    { id: "sets", name: "Sets", field: "sets", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "m_hp", name: "HP", field: "m_hp", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "m_atk", name: "ATK", field: "m_atk", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "m_def", name: "DEF", field: "m_def", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "m_spd", name: "SPD", field: "m_spd", resizable: false, selectable: false, sortable: true, defaultSortAsc: false, },
    { id: "m_crate", name: "Crit", field: "m_crate", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "m_cdmg", name: "CDMG", field: "m_cdmg", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "m_res", name: "RES", field: "m_res", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "m_acc", name: "ACC", field: "m_acc", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "m_effhp", name: "E.HP", field: "m_effhp", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "m_effhp_d", name: "E.HP D", field: "m_effhp_d", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "slots246", name: "2/4/6", field: "slots246", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "rune_avg", name: "Effcy%", field: "rune_avg", resizable: false, selectable: false, sortable: true, defaultSortAsc: false },
    { id: "m_dps", name: "DMG", field: "m_dps", resizable: false, selectable: false, sortable: true, headerCssClass: 'tableDmgCustom', toolTip: 'A combined value of Crit, Atk and CritDMG. Multipliers, Speed and set bonuses such as violent are not included in the underlying formula.' }
];

var columns_width = [13, 11, 5, 5, 5, 5, 5, 6, 5, 5, 6, 6, 11, 6, 6];

// ----------------------------- PAGE VARIABLES, EVENTS AND LOGIC
$(document).ready(function () {
	$( document ).on("localDataLoaded", function (e) {
        SWO.tables.gridMons.rows().invalidate().draw();
    });
    
    $( document ).on("refreshCraftsOptimize", function (e) {
        prepareCraftsDataOptimized(SWO.crafts.rebuildNeeded, SWO.crafts.donothing);
        if (!SWO.crafts.donothing) {
            $('.crafts-equipped-runes').fadeOut();

            $('.crafts-optimizedrune').fadeOut();
        }
    });

    $( document ).on("refreshCraftsOptimizeDone", function (e) {
        var currPage = gridCrafts.page();
        gridCrafts.page(currPage).draw(false);
    });

    estimatedCountAnim = new CountUp('optimizer-status-numbers', 0, 0, 0, 1, estimatedCountAnimOptions);
    foundCountAnim = new CountUp('optimizer-status-found-number', 0, 0, 0, 1, estimatedCountAnimOptions);

    var gridRunes = initRunesTable([]);
    var gridCrafts = initCraftsTable([]);
    var gridMons = initMonstersTable([]);

    $("#opt_monster").select2({ templateSelection: optMonstersSelectionTemplate });

    $("#crafts-monsters").select2(); 
    $("#opt_slot2, #opt_slot4, #opt_slot6, #opt_slot2_dialog, #opt_slot4_dialog, #opt_slot6_dialog").select2({
        maximumSelectionLength: 3
    });

    $("#opt_sets_exclude").select2();

    $("#opt_focus, #opt_focus_dialog").select2({
        maximumSelectionLength: 5,
        placeholder: 'Choose up to 5 priority stats',
    });

    $("#opt_focus").on('change', function (e) {
        var focusStats = $(this).val();
        $('#focus-weights .col-md-6').empty();
        if (focusStats) {
            focusStats.forEach((stat, index) => {
                var slider_item = $('<div class="focus-weight-wrapper"><span class="focus-weight-stat">' + stat + '</span><input type="text" class="focus-weight-slider"><span class="focus-weight-value">' + SWO.settings.data.focusWeights[stat] + '</span></div>');
                $('.focus-weight-slider', slider_item).slider({
                    min: 0.2,
                    max: 3,
                    value: SWO.settings.data.focusWeights[stat],
                    step: 0.1,
                    precision: 1,
                    tooltip: 'hide'
                }).on('change', function (e) {
                    $(this).siblings('.focus-weight-value').text(e.value.newValue);
                }).on('slideStop', function (e) {
                    SWO.settings.data.focusWeights[stat] = e.value;
                    SWO.settings.save();
                });
                var column = (index % 2 === 0) ? 'first' : 'second';
                slider_item.appendTo('#focus-weights .col-md-6.' + column);
            });
            $('#focus-weights .col-md-6.second').append('<button id="focus-weights-default" class="btn btn-primary btn-xs" type="button">Default</button>');
            $('#focus-weights').show();
        } else {
            $('#focus-weights').hide();
        }
    });

    //advanced filter
    $("#runes-filter-set, #runes-filter-slot, #runes-filter-quality, #runes-filter-mstat, #runes-filter-sstat, #runes-filter-amplifiable").select2();
    $("#runes-filter-set, #runes-filter-slot, #runes-filter-quality, #runes-filter-mstat, #runes-filter-sstat, #runes-filter-amplifiable, #runes-filter-location, #runes-filter-lockstate").on('change', function (e) {
        var column = Number($(this).data('column'));
        var type = $(this).data('type') || 'multi';
        var id = $(this).attr('id');
        var value = $(this).val();

        if (!runeFilter[column]) {
            runeFilter[column] = { value: [], type: type, id: id };
        } else {
            if (!value || value == '')
                delete runeFilter[column];
        }

        if (column && runeFilter[column])
            runeFilter[column].value = value;

        SWO.tables.gridRunes.draw();
    });

    $('.runes-filter-slider').slider({
        tooltip: 'always'
    });

    $('.runes-filter-slider').on('slideStop', function (e) {
        var column = Number($(this).data('column'));

        if (!runeFilter[column])
            runeFilter[column] = { value: [], type: 'range' };

        runeFilter[column].value = e.value;
        SWO.tables.gridRunes.draw();
    });

    var import_file = null;

    // AUTO load last saved data from localStorage
    var localData = localStorage.getItem(SWO.vars.localDataName);
    if (localData != null && localData != "") {
        importOnStart(localData);
    }

    // make tables available globally if no data was available for auto load
    if (!SWO.tables.gridMons)
        SWO.tables.gridMons = gridMons;
    if (!SWO.tables.gridRunes)
        SWO.tables.gridRunes = gridRunes;
    if (!SWO.tables.gridCrafts)
        SWO.tables.gridCrafts = gridCrafts;

    if (!SWO.allData)
        SWO.allData = {};

    replaceMonstersInSelect("rune_monster", gridMons, true);
    replaceMonstersInSelect("opt_monster", gridMons, true);

    SWO.optimizer.autoImported = true;
    
    function importOnStart(localData) {
    	var allData = JSON.parse(localData);

        if (!allData.processed) {
            SWO.func.showAlertBox("The data format has changed. In order to easier provide future updates that was a necessary step. Just reimport your data. Keep in mind, that you can't use the optimizer.json anymore. You need to import the normal json file (your_id.json) instead. Sorry for the inconvenience.");
            return;
        }
    	
        if (allData.uniqueToId)
            SWO.lookUp.uniqueToId = allData.uniqueToId;

        allData.savedBuilds = (allData.savedBuilds) ? fixImportSavedBuilds(allData.savedBuilds) : [];

        SWO.allData = allData;


        gridRunes = initRunesTable(allData.runes);
        gridCrafts = initCraftsTable(allData.crafts);
        gridMons = initMonstersTable(allData.mons);

        SWO.vars.nextRuneId = findMaxId(allData.runes);
        SWO.vars.nextCraftId = findMaxId(allData.crafts);
        SWO.vars.nextMonsId = findMaxId(allData.mons);

        // make tables available globally
        SWO.tables.gridMons = gridMons;
        SWO.tables.gridRunes = gridRunes;
        SWO.tables.gridCrafts = gridCrafts;

        if (allData.savedBuilds) {
            savedBuilds = allData.savedBuilds;
            displayAllSavedBuilds(gridRunes, gridMons, savedBuilds);
            SWO.vars.nextBuildId = findMaxId(allData.savedBuilds);
        }

        SWO.func.updateMonsterSearchList();

        SWO.optimizer.firstLoaded = true;
        $(document).trigger('localDataLoaded');
        $(document).trigger('refreshCraftsOptimize');

        $('#import_export_message').html('<br/><strong>NOTICE: The following data was automatically imported from storage cache. Total imported runes: ' + allData.runes.length + '; Total imported monsters: ' + allData.mons.length + '.</strong>');

        SWO.fireAlert("success", "Imported Data<br />Runes: " + allData.runes.length + "<br />Monsters: " + allData.mons.length);

    }
    
    function parseData(data) {
        if (!data) {
            SWO.func.showAlertBox('No data to import.');
            return;
        }

        var allData = JSON.parse(data);

        if (allData['processed']) {
            importData(allData);
            return;
        }

        if (allData.friend) {
            allData = allData.friend;
            allData.runes = allData.runes || [];
            allData.rune_craft_item_list = allData.rune_craft_item_list || [];
        }

        if (!allData['runes'] || !allData['unit_list']) {
            SWO.func.showAlertBox("Something changed. In order to easier maintain future updates you can't import the optimizer.json anymore. Just use the normal json file. (your_id.json)");
            return;
        }

        var options = {};
        options.refreshData = $("#import_refreshData").is(':checked');
        options.refreshData_overrideLocation = $("#import_refreshData").is(':checked');
        options.shortenStorage = $("#import_replace_in_storage").is(':checked');
        options.filterUselessMons = $("#import_filter_useless_monster").is(':checked');
        options.filterNorunesMons = $("#import_filter_norunes_monster").is(':checked');
        
        options.filterGradesMons = $("#import_filter_grade_monster").is(':checked');
        options.filterGradesMonsInput = Number($("#import_filter_grade_monster_input").val());

        if (options.refreshData && SWO.allData.wizard_id && allData.wizard_id !== SWO.allData.wizard_id) {
            SWO.func.showAlertBox("You cant refresh data from another account you imported previously. Please uncheck the 'Keep builds. (Refresh data)' option.");
            return;
        }

        worker_parse = new Worker('/js/parse.js');

        worker_parse.onmessage = function (e) {
            if (e.data.cmd == 'done') {
                importData(e.data.structure);
                if (worker_parse) {
                    worker_parse.terminate();
                    worker_parse = null;
                }
            }
        };
        
        if (options.refreshData && SWO.allData.runes && SWO.allData.runes.length > 0) {
            worker_parse.postMessage({ cmd: 'startRefresh', data: allData, prevData: SWO.allData, vars: SWO.vars, options: options });
        } else {
            worker_parse.postMessage({ cmd: 'start', data: allData, options: options });
        }
    }

    function importData(allData) {
        if (!allData) {
            SWO.func.showAlertBox('No data to import.');
            return;
        }
        
        if (allData.uniqueToId)
            SWO.lookUp.uniqueToId = allData.uniqueToId;

        allData.savedBuilds = (allData.savedBuilds) ? fixImportSavedBuilds(allData.savedBuilds) : [];

        gridRunes = initRunesTable(allData.runes);
        gridCrafts = initCraftsTable(allData.crafts);
        gridMons = initMonstersTable(allData.mons);

        SWO.vars.nextRuneId = findMaxId(allData.runes);
        SWO.vars.nextCraftId = findMaxId(allData.crafts);
        SWO.vars.nextMonsId = findMaxId(allData.mons);

        // make tables available globally
        SWO.tables.gridMons = gridMons;
        SWO.tables.gridRunes = gridRunes;
        SWO.tables.gridCrafts = gridCrafts;

        // delete all current build tabs
        deleteAllSavedBuilds();

        // need to initialze here, because it holds the current builds whoch needs to be deleted before
        SWO.allData = allData;

        if (allData.savedBuilds) {
            savedBuilds = allData.savedBuilds;
            displayAllSavedBuilds(gridRunes, gridMons, savedBuilds);
            SWO.vars.nextBuildId = findMaxId(allData.savedBuilds);
        }
        
        SWO.func.updateMonsterSearchList();

        $(document).trigger('localDataLoaded');

        $('#import_export_message').html('<br/><strong>Total imported runes: ' + allData.runes.length + '; Total imported monsters: ' + allData.mons.length + '.</strong>');

        replaceMonstersInSelect("rune_monster", gridMons, true);
        replaceMonstersInSelect("opt_monster", gridMons, true);

        SWO.presets.refreshSelectDialog();

        $("#opt_monster option:first-child").attr("selected", true);
        $("#opt_monster").change();

        refreshGridCraftsFilters(gridCrafts);

        SWO.func.saveData();

        $('.monsterStatToggle').removeClass('active');
        if (SWO.getSetting('general_alwaysActualStats')) {
            $('#monsterShowActualStats').trigger('click');
        } else {
            $('#monsterShowBaseStats').addClass('active');
            $('#monsterStatText').html('Base stats');
        }

        $(document).trigger('refreshCraftsOptimize');

        SWO.optimizer.autoImported = true;
      	SWO.fireAlert("success", "Imported Data<br />Runes: " + allData.runes.length + "<br />Monsters: " + allData.mons.length);

    }

    $('[data-toggle="popover"]').popover({ html: true, trigger: 'hover' });

    $('.btn_backup').on('click', function (e) {
        e.preventDefault();
        var key = $(this).data('key');
        var data = localStorage.getItem(key);
        if (data == null) {
            SWO.func.showAlertBox('No data to export.');
            return;
        }
        var fileName = {
            swrunes_saveddata: 'swop-data.json',
            swop_settings: 'swop-settings.json'
        };

        SWO.func.saveAs(data, fileName[key], 'json');
    });

    $('.btn_backup_restore').on('click', function (e) {
        e.preventDefault();
        $('#settingsFileUpload').click();
    });

    $('body').on('click', '.rune-menu', function (e) {
        if ($('.rune-actions', $(this).parent()).hasClass('opened')) {
            $('.rune-actions', $(this).parent()).removeClass('opened').hide();
            return;
        }
        $('.rune-actions').removeClass('opened').hide();
        $('.rune-actions', $(this).parent()).addClass('opened').show();
    });

    $('body').on('click', '.rune-action', function (e) {
        if ($(this).hasClass('locked'))
            return;

        var id = Number($(this).parents('.runeSlot').attr('data-rune_id'));

        // exclude / include
        if ($(this).hasClass('exclude') || $(this).hasClass('include')) {
            var input_field = $(this).hasClass('exclude') ? $('#opt_not_use_runes') : $('#opt_use_runes');
            var val = input_field.val();
            var delimiter = (val.length > 1) ? ',' : '';
            var new_val = val + delimiter + id;
            input_field.val(new_val);
            $(this).addClass('locked');
        }

        // lock / unlock
        if ($(this).hasClass('locking')) {
            var data = SWO.func.getRowData('gridRunes', id);
            data.locked = (data.locked === 0) ? 1 : 0;
            SWO.func.updateDataRow('gridRunes', data);
            $(this).html((data.locked === 0) ? 'Lock' : 'Unlock');
            SWO.fireAlert("success", (data.locked === 0) ? 'Rune ' + id + ' unlocked.' : 'Rune ' + id + ' locked.');

            SWO.func.saveData();
        }

        // view
        if ($(this).hasClass('view')) {
            SWO.func.viewRow('gridRunes', id)
        }

        $(this).parent().removeClass('opened').hide();
    });
    
    $('body').on('click', '.runeSlot-lockState', function (e) {
        e.preventDefault();
        var parent = $(this).parents('.runeSlot');
        var id = Number(parent.attr('data-rune_id'));

        changeRuneLockState(id, $(this).attr('data-action'), true);

        var locking_html = ($(this).attr('data-action') === 'unlock') ? '<a href="#" class="runeSlot-lockState" data-action="lock"></a>' : '<a href="#" class="runeSlot-lockState" data-action="unlock"></a>';
        $('.runeSlot-locking', parent).html(locking_html);
    });

    // row select for runes table
    $('#grid_runes tbody').on('click', 'tr', function (e) {
        e.preventDefault();
        SWO.func.gridRunesRowClick($(this));
    });

    SWO.func.gridRunesRowClick = function (row) {
        if (row.hasClass('selected')) {
            row.removeClass('selected');
            $("#rune_id").val("");
            $("#rune_update").attr("disabled", true);
            displayRuneSlot("rune_preview", null, null, false);
        }
        else {
            gridRunes.$('tr.selected').removeClass('selected');

            var selectedRune = gridRunes.row(row).data();
            if (selectedRune) {
                row.addClass('selected');
                //not needed here because we do not modify the original
                //selectedRune = JSON.parse(JSON.stringify(selectedRune));
                displayRune(selectedRune);
                displayRuneSlot("rune_preview", selectedRune, selectedRune.slot, false);
                $("#rune_update").attr("disabled", false);
            }
        }
    }

    // rune lock button
    $('#grid_runes tbody').on('click', 'a.lockRune', function (e) {
        e.preventDefault();
        if ($(this).data("locked") == "0") {
            $(this).data("locked", "1");
            var rune = gridRunes.row($(this).parents('tr')).data();
            rune.locked = 1;
        } else if ($(this).data("locked") == "1") {
            $(this).data("locked", "0");
            var rune = gridRunes.row($(this).parents('tr')).data();
            rune.locked = 0;
        }
        gridRunes.rows($(this).parents('tr')).invalidate();
        SWO.func.saveData();
    });

    // row select for monsters table
    $('#grid_monsters tbody').on('click', 'tr', function (e) {
        e.preventDefault();
        SWO.func.gridMonsRowClick($(this), e);
    });

    SWO.func.gridMonsRowClick = function (row, e) {
        // set share class
        var shareCountActual = $('#shareCountActual');
        if (typeof e !== 'undefined' && e.ctrlKey) {
            if (row.hasClass('shareable')) {
                row.removeClass('shareable');
                var count = Number(shareCountActual.html()) - 1;
                shareCountActual.html(count);
            } else {
                row.addClass('shareable');
                var count = Number(shareCountActual.html()) + 1;
                shareCountActual.html(count);
            }
            return;
        }
        if (row.hasClass('selected')) {
            row.removeClass('selected');
            $("#monster_id").val("");
            $("#monster_update").attr("disabled", true);

            //displayMonsterSetBonuses("monster_panel1", null);
            displayMonsterActualStats("monster_panel2", null);
            $('#deleteMonsRunes').data("monsterid", "0").prop("disabled", true);
            $('#unequipMonsRunes').data("monsterid", "0").prop("disabled", true);
            $('#lockMonsRunes').data("monsterid", "0").prop("disabled", true);
            $('#unlockMonsRunes').data("monsterid", "0").prop("disabled", true);
            for (var i = 1; i <= 6; i++) {
                displayRuneSlot("monsters #m" + i + "_rune", null, i, false);
            }
            // speed values
            $('#monster-speedtuning').hide();
        }
        else {
            gridMons.$('tr.selected').removeClass('selected');

            var selectedMonster = gridMons.row(row).data();
            if (selectedMonster) {
                row.addClass('selected');
                $("#monster_update").attr("disabled", false);
                selectedMonster = JSON.parse(JSON.stringify(selectedMonster));
                var monster_x = extendMonster(selectedMonster, getRunesWithMons(gridRunes, selectedMonster.id));
                displayMonster(monster_x);
                //displayMonsterSetBonuses("monster_panel1", monster_x);
                displayMonsterActualStats("monster_panel2", monster_x);

                $('#deleteMonsRunes').data("monsterid", monster_x.id).prop("disabled", false);
                $('#unequipMonsRunes').data("monsterid", monster_x.id).prop("disabled", false);
                $('#lockMonsRunes').data("monsterid", monster_x.id).prop("disabled", false);
                $('#unlockMonsRunes').data("monsterid", monster_x.id).prop("disabled", false);
                var runeIds = monster_x.rune_ids.split(",");

                for (var i = 1; i <= 6; i++) {
                    var slotRune = null;
                    for (var j = 0; j < runeIds.length; j++) {
                        slotRune = SWO.func.getRowData('gridRunes', Number(runeIds[j]));
                        if (slotRune != null && slotRune.slot == i)
                            break;
                        else
                            slotRune = null;
                    }
                    displayRuneSlot("monsters #m" + i + "_rune", slotRune, i, false);
                }
                // speed values
                $('#monster-speedtuning').show();
                $('#opt_speed_lead_monster').trigger('change');
            }

        }
    }

    // row select for crafts table
    $('#grid_crafts tbody').on('click', 'tr', function (e) {
        e.preventDefault();
        SWO.func.gridCraftsRowClick($(this));
    });

    SWO.func.gridCraftsRowClick = function (row) {
        gridCrafts.$('tr.selected').removeClass('selected');

        var selectedCraft = gridCrafts.row(row).data();
        if (selectedCraft) {

            row.addClass('selected');
            $("#craft_update").attr("disabled", false);
            selectedCraft = JSON.parse(JSON.stringify(selectedCraft));
            displayCraft(selectedCraft);
        }
    }

    // delete row from runes table
    $('#grid_runes tbody').on('click', 'a.del_row', function (e) {
        e.preventDefault();
        var that = $(this);
        
        if (confirm('Delete this rune?')) {
            var currPage = gridRunes.page();
            gridRunes
                .row(that.parents('tr'))
                .remove()
                .draw();
            gridRunes.page(currPage).draw(false);
            SWO.func.saveData();
            $(document).trigger('refreshCraftsOptimize');
            SWO.fireAlert("success", "Rune deleted.");
        }
    });
    
    //runeEnchant
    $('#grid_runes tbody').on('click', '.runeTable-amplifyRune', function (e) {
        SWO.dialogs.runeEnchantDialog.rune_id = gridRunes.row($(this).parents('tr')).data().id;
        SWO.dialogs.runeEnchantDialog.type = $(this).attr('data-type');
        SWO.dialogs.runeEnchantDialog.show();
    });

    // delete monster from runes table
    $('#grid_monsters tbody').on('click', 'a.del_row', function (e) {
        e.preventDefault();
        var that = $(this);

        if (confirm('Delete this monster?')) {
            var monsterId = gridMons.row(that.parents('tr')).data().id;
            var currPage = gridMons.page();
            gridMons
                .row(that.parents('tr'))
                .remove()
                .draw();
            gridMons.page(currPage).draw(false);
            gridRunes.data().each(function (d) {
                if (d.monster == monsterId) {
                    d.monster = 0;
                    d.monster_n = "Inventory";
                }
            });
            gridRunes.rows().invalidate().draw();
            replaceMonstersInSelect("rune_monster", gridMons, true);
            replaceMonstersInSelect("opt_monster", gridMons, true);

            SWO.presets.refreshSelectDialog();

            SWO.func.saveData();
            SWO.fireAlert("success", "Monster deleted.");
        }

    });
    
    $('#grid_monsters tbody').on('click', 'a.monRunes-lockState', function (e) {
        e.preventDefault();
        var data = gridMons.row($(this).parents('tr')).data();
        var runes = getRunesWithMons(SWO.tables.gridRunes, data.id);
        changeRuneLockState(runes, $(this).attr('data-action'), true);

        var message = ($(this).attr('data-action') === 'unlock') ? 'Runes are unlocked.' : 'Runes are locked.';
        SWO.fireAlert("success", message);
    });

    $('#grid_monsters tbody').on('click', '.monster-optimize', function (e) {
        e.preventDefault();
        var data = gridMons.row($(this).parents('tr')).data();
        var monster_id = (data.unit_id) ? data.unit_id : data.id;

        var element = $('.win-splitviewcommand[data-target="optimizer"]');
        SWO.func.displaySection(element);
        $('#opt_monster').val(monster_id).change();
    });

    // delete row from craft table
    $('#grid_crafts tbody').on('click', 'a.del_row', function (e) {
        e.preventDefault();

        var that = $(this);
        if (confirm('Delete this craft?')) {
            var currPage = gridCrafts.page();
            gridCrafts
                .row(that.parents('tr'))
                .remove()
                .draw();
            gridCrafts.page(currPage).draw(false);
            refreshGridCraftsFilters(gridCrafts);
            SWO.func.saveData();
            $(document).trigger('refreshCraftsOptimize');
            SWO.fireAlert("success", "Craft deleted.");
        }
    });


    // ----------------------------- "Rune details" panel buttons
    // button Create rune
    $('#rune_create').on('click', function (e) {
        e.preventDefault();
        if ($("#rune_set").val() == "" || $("#rune_slot").val() == "" || $("#rune_grade").val() == "" || $("#rune_level").val() == "" || $("#rune_mainvalue").val() == "") {
            SWO.func.showAlertBox("Set type, slot, level, grade and main stat are required.");
            return false;
        }
        createRune();
        SWO.func.saveData();
        $(document).trigger('refreshCraftsOptimize');
        SWO.fireAlert("success", "Rune " + SWO.vars.nextRuneId + " created.");
    });

    // button Update rune
    $('#rune_update').on('click', function (e) {
        e.preventDefault();
        if ($("#rune_set").val() == "" || $("#rune_slot").val() == "" || $("#rune_grade").val() == "" || $("#rune_level").val() == "" || $("#rune_mainvalue").val() == "") {
            SWO.func.showAlertBox("Set type, slot, level, grade and main stat are required.");
            return false;
        }
        var locations = updateRune();
        SWO.func.saveData();

        if (locations.origLocation === locations.location) {
            SWO.func.refreshRow('gridMons', locations.origLocation);
        } else {
            SWO.func.refreshRow('gridMons', locations.origLocation);
            SWO.func.refreshRow('gridMons', locations.location);
        }

        $(document).trigger('refreshCraftsOptimize');
        SWO.fireAlert("success", "Rune " + $("#rune_id").val() + " updated.");
    });

    // button Clear rune fields
    $('#rune_clear').on('click', function (e) {
        e.preventDefault();
        gridRunes.$('tr.selected').removeClass('selected');
        $("#rune_update").attr("disabled", true);
        displayRune(emptyRune);
        $("#rune_set").val('Energy');
        $("#rune_monster, #rune_level").val(0);
        $('#rune_slot, #rune_grade').val(1);
        $("#rune_maintype").val('SPD');
    });

    // delete ALL runes
    $('#deleteAllRunes').on('click', function (e) {
        e.preventDefault();

        if (confirm('Delete ALL runes?')) {
            SWO.vars.nextRuneId = 0;
            gridRunes = initRunesTable([]);
            gridMons.rows().invalidate();
            SWO.func.saveData();
            $(document).trigger('refreshCraftsOptimize');
            SWO.fireAlert("success", "Runes deleted.");
        }
    });

    // unlock ALL runes
    $('#unlockAllRunes').on('click', function (e) {
        e.preventDefault();

        if (confirm('Unlock ALL runes?')) {
            gridRunes.data().each(function (d) {
                d.locked = 0;
            });
            gridRunes.rows().invalidate().draw();
            gridMons.rows().invalidate();
            SWO.func.saveData();
        }
        SWO.fireAlert("success", "Runes unlocked.");
    });

    // lock ALL Equipped runes
    $('#lockAllEquippedRunes').on('click', function (e) {
        e.preventDefault();

        if (confirm('Lock ALL equipped runes?')) {
            gridRunes.data().each(function (d) {
                if (d.monster != 0)
                    d.locked = 1;
            });
            gridRunes.rows().invalidate().draw();
            gridMons.rows().invalidate();
            SWO.func.saveData();
            SWO.fireAlert("success", "Runes on monsters locked.");
        }
    });


    // unequip All runes
    $('#unequipAllRunes').on('click', function (e) {
        e.preventDefault();

        if (confirm('Unequip ALL runes?')) {
            gridRunes.data().each(function (d) {
                d.monster = 0;
                d.monster_n = "Inventory";
            });
            gridRunes.rows().invalidate().draw();
            gridMons.rows().invalidate();
            SWO.func.saveData();
            $(document).trigger('refreshCraftsOptimize');
            SWO.fireAlert("success", "Runes unlocked.");
        }
    });

    // change main stat base on rune slot
    $("#rune_slot").change(function () {
        if ($("#rune_slot").val() == "1") {
            $("#rune_maintype").val("ATK flat");
        }
        else if ($("#rune_slot").val() == "3") {
            $("#rune_maintype").val("DEF flat");
        }
        else if ($("#rune_slot").val() == "5") {
            $("#rune_maintype").val("HP flat");
        }
        populateRuneMainStat();
    });

    // auto populate main stat
    $("#rune_level").change(function () {
        populateRuneMainStat();
    });
    $("#rune_grade").change(function () {
        populateRuneMainStat();
    });
    $("#rune_maintype").change(function () {
        populateRuneMainStat();
    });

    // clear fields for Value if type is set to "-"
    $('#rune_innatetype').on('change', function (e) {
        if ($("#rune_innatetype").val() == "") {
            $("#rune_innatevalue").val("");
        }
    });
    $('#rune_stat1type').on('change', function (e) {
        if ($("#rune_stat1type").val() == "") {
            $("#rune_stat1value").val("");
        }
    });
    $('#rune_stat2type').on('change', function (e) {
        if ($("#rune_stat2type").val() == "") {
            $("#rune_stat2value").val("");
        }
    });
    $('#rune_stat3type').on('change', function (e) {
        if ($("#rune_stat3type").val() == "") {
            $("#rune_stat3value").val("");
        }
    });
    $('#rune_stat4type').on('change', function (e) {
        if ($("#rune_stat4type").val() == "") {
            $("#rune_stat4value").val("");
        }
    });


    // ----------------------------- "Monster details" panel buttons
    // button Create monster
    $('#createmonsterDialog').on('click', '#monster_create', function (e) {
        e.preventDefault();
        if ($("#monster_name").val() == "" || $("#monster_level").val() == "" || $("#monster_hp").val() == "" || $("#monster_atk").val() == "" || $("#monster_def").val() == "" || $("#monster_spd").val() == "" || $("#monster_crate").val() == "" || $("#monster_cdmg").val() == "" || $("#monster_res").val() == "" || $("#monster_acc").val() == "") {
            SWO.func.showAlertBox("All fields are required.");
            return false;
        }
        createMonster();
        replaceMonstersInSelect("rune_monster", gridMons, true);
        replaceMonstersInSelect("opt_monster", gridMons, true);
        SWO.func.saveData();
        SWO.fireAlert("success", "Monster " + SWO.vars.nextMonsId + " created.");

        displayMonster(emptyMonster);
        SWO.dialogs.createmonsterDialog.hide();
    });

    // create monster from swarfarm data
    $('#createmonsterDialog').on('click', '#monster_create_template', function (e) {
        e.preventDefault();
        $('#createmonsterDialog-monsterSelect').addClass('loading');
        SWO.api.swarfarm.getMonsterByID({ action: 'createMonsterToMax', id: $('#createmonsterDialog-monsterSelect').val() });
    });

    // delete ALL monsters
    $('#deleteAllMons').on('click', function (e) {
        e.preventDefault();

        if (confirm('Delete ALL monsters?')) {
            SWO.vars.nextMonsId = 0;
            gridMons = initMonstersTable([]);
            gridRunes.data().each(function (d) {
                d.monster = 0;
                d.monster_n = "Inventory";
            });
            gridRunes.rows().invalidate().draw();
            SWO.func.saveData();
            SWO.fireAlert("success", "Monsters deleted.");
        }
    });

    $('#lockMonsRunes').on('click', function (e) {
        e.preventDefault();

        var monsterid = Number($(this).data("monsterid"));

        if (monsterid != 0) {
            gridRunes.data().each(function (d) {
                if (d.monster == monsterid) {
                    d.locked = 1;
                }
            });
            gridRunes.rows().invalidate().draw();
            SWO.func.invalidateRow('gridMons', monsterid);
            SWO.func.saveData();
            SWO.fireAlert("success", "Runes are locked.");
        }
    });

    $('#unlockMonsRunes').on('click', function (e) {
        e.preventDefault();

        var monsterid = Number($(this).data("monsterid"));
        if (monsterid != 0) {
            gridRunes.data().each(function (d) {
                if (d.monster == monsterid) {
                    d.locked = 0;
                }
            });
            gridRunes.rows().invalidate().draw();
            SWO.func.invalidateRow('gridMons', monsterid);
            SWO.func.saveData();
            SWO.fireAlert("success", "Runes are unlocked.");
        }
    });

    $('#unequipMonsRunes').on('click', function (e) {
        e.preventDefault();

        var monsterid = Number($(this).data("monsterid"));

        if (monsterid != 0) {
            gridRunes.data().each(function (d) {
                if (d.monster == monsterid) {
                    d.monster = 0;
                    d.monster_n = "Inventory";
                    d.locked = 0;
                }
            });
            gridRunes.rows().invalidate().draw();
            SWO.func.invalidateRow('gridMons', monsterid);

            for (var i = 1; i <= 6; i++) {
                displayRuneSlot("m" + i + "_rune", null, i, false);
            }

            SWO.func.saveData();
            $(document).trigger('refreshCraftsOptimize');
            SWO.fireAlert("success", "Runes are unequiped.");
        }
    });

    $('#deleteMonsRunes').on('click', function (e) {
        e.preventDefault();

        var monsterid = Number($(this).data("monsterid"));

        if (monsterid != 0) {
            deleteRunesByMonsterId(gridRunes, monsterid);
            SWO.func.saveData();
            SWO.fireAlert("success", "Runes are deleted.");
        }
    });

    // ----------------------------- "Craft details" panel buttons
    $('#craft_create').on('click', function (e) {
        e.preventDefault();
        createCraft();
        SWO.func.saveData();
        refreshGridCraftsFilters(gridCrafts);
        $(document).trigger('refreshCraftsOptimize');
        SWO.fireAlert("success", "Craft " + SWO.vars.nextMonsId + " created.");
    });

    $('#craft_update').on('click', function (e) {
        e.preventDefault();

        updateCraft();
        SWO.func.saveData();
        refreshGridCraftsFilters(gridCrafts);
        $(document).trigger('refreshCraftsOptimize');
        SWO.fireAlert("success", "craft " + $("#craft_id").val() + " updated.");
    });

    // delete ALL runes
    $('#deleteAllCrafts').on('click', function (e) {
        e.preventDefault();

        if (confirm('Delete ALL crafts?')) {
            SWO.vars.nextCraftId = 0;
            gridCrafts = initCraftsTable([]);
            refreshGridCraftsFilters(gridCrafts);
            SWO.func.saveData();
            $(document).trigger('refreshCraftsOptimize');
            SWO.fireAlert("success", "Crafts deleted.");
        }
    });

    // ----Speed

    $('#opt_speed_lead_monster, #opt_speed_totem_monster').on('change', function (e) {
        var speedtuning_value = (parseFloat($("#opt_speed_lead_monster").val()) + parseFloat($("#opt_speed_totem_monster").val()));
        if (speedtuning_value == 0) {
            $('.monster-total-stats .speed').removeClass('active');
            $('.monster-total-stats .monster-actual').html($('.monster-total-stats .monster-actual').data('orig'));
            $('.monster-total-stats .monster-max').html($('.monster-total-stats .monster-max').data('orig'));
            return;
        }
        $('.monster-total-stats .speed').addClass('active');
        var spd_base = parseFloat($('.monster-total-stats .monster-base').html());
        var speed_value = (spd_base / 100 * speedtuning_value);
        $('.monster-total-stats .monster-actual').html(Math.floor((parseFloat($('.monster-total-stats .monster-actual').data('orig')) + speed_value)));
        $('.monster-total-stats .monster-max').html(Math.floor((parseFloat($('.monster-total-stats .monster-max').data('orig')) + speed_value)));
    });

    // switch between base and actual stats
    $('.monsterStatToggle').on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('active'))
            return;

        $('.monsterStatToggle').removeClass('active');

        var el_id = $(this).attr('id');

        if (el_id == 'monsterShowBaseStats') {
            toggleVisibility(gridMons, [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
            $('#monsterStatText').html('Base stats');
        } else {
            toggleVisibility(gridMons, [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
            $('#monsterStatText').html('Actual stats');
        }
        $(this).addClass('active');
        
    });

    // ----------------------------- "Export/Import" buttons

    $('#btn_import').on('click', function (e) {
        e.preventDefault();
        //importData($('#exportimport').val());

        if (uploadFile) {
            if (SWO.allData.savedBuilds && SWO.allData.savedBuilds.length !== 0 && !$("#import_refreshData").is(':checked')) {
                if (confirm('Are you sure you want to re-import data? Your current builds will be deleted.')) {
                    reader.readAsText(uploadFile);
                }
            } else {
                reader.readAsText(uploadFile);
            }
        } else {
        	SWO.func.showAlertBox('No file selected');
        }
        	
    });

    // ----------------------------- "Optimizer" panel buttons
    // show the selected monster base stats
    $('#opt_monster').on('change', function (e) {
        // remove pinned builds
        dataViewPinned.setItems([]);
        gridPinned.invalidate();
        grid.invalidate();

        var newId = Number($(this).val());
        if (newId === 0) return;

        var monster = SWO.func.getRowData('gridMons', newId);
        var mode = $('.monsterStatsToggle[data-mode="a"]').hasClass('active') ? 'a' : 'b';
        displayMonsterOpt(monster, mode);

        if (monster.unit_id && SWO.settings.data.presets.monster[monster.unit_id]) {
            SWO.presets.set(monster.unit_id);
            $('#select_preset').val(null)
        } else {
            // autofill current sets and stats if no preset is avilable & option is enabled
            if (SWO.getSetting('optimizer_autofillParams')) {
                $('#opt_set1, #opt_set2, #opt_set3, #opt_slot2, #opt_slot4, #opt_slot6').val(null);
                $('#opt_slot2, #opt_slot4, #opt_slot6').change();
                // sets
                var sets = monster.sets.split(',');
                sets.forEach((set, i) => {
                    if (set != '') {
                        $('#opt_set' + (i + 1)).val(set).change();
                    }
                });

                // stats
                var runes = getRunesWithMons(SWO.tables.gridRunes, monster.id);
                runes.forEach((rune) => {
                    if (rune.slot == 2 || rune.slot == 4 || rune.slot == 6) {
                        $('#opt_slot' + rune.slot).val(rune.m_t).change();
                    }
                });
            }
        }
    });

    $('.monsterStatsToggle').on('click', function (e) {
        var id = Number($('#opt_monster').val());
        var monster = SWO.func.getRowData('gridMons', id);
        $('.monsterStatsToggle').removeClass('active');
        var mode = $(this).data('mode');
        displayMonsterOpt(monster, mode);
        $(this).addClass('active');
    });

    $('#view-monster-opt').on('click', function (e) {
        e.preventDefault();
        var id = Number($('#opt_monster').val());
        if (id) {
            SWO.func.viewRow('gridMons', id);
        } else {
            SWO.func.showAlertBox("Selected monster is required.");
        }
    });

    // perform the optimizations
    $('#optimization-control').on('click', function (e) {
        if ($(this).hasClass('start')) {
            if (worker_main !== null) {
                return;
            }

            runeMaxLevelNow = getRuneMax();
            runeModeNow = getRuneMode();
            loadCurrentNow = $("#opt_load_current").is(':checked');

            optimize(gridRunes, gridMons);
            updateGridPinnedData();
        } else if ($(this).hasClass('stop')) {
            setFinishedState();
            if (!worker_main) {
                return;
            }
            if (!workerPermutationsDone) {
                worker_main.terminate();
                worker_main = null;
            } else {
                worker_main.postMessage({ cmd: 'abort' });
            }

            SWO.fireAlert("success", "Optimization aborted.");
        }
    });

    $( document ).on("optimizeInit", function (e) {
        $('#optimization-control').addClass('start').click();
    });

    // generate a build
    $('body').on('click', '.generate-build', function (e) {
        SWO.vars.nextBuildId++;

        var runes = $('.grid-runeIDs', this).html().split(",");
        for (var i = 0; i < 6; i++) {
            runes[i] = SWO.func.getRowData('gridRunes', Number(runes[i]));
        }
        // get monster from monsters table
        monster = SWO.func.getRowData('gridMons', currentMonsterID);

        //calculate monsters stats
        var runeMax = getRuneMax();
        var monster_x = extendMonster(monster, runes, { runeMax: runeMax, optSubslotsNoMax: optSubslotsNoMax, dmgCustom: dmgCustom, bonusStatData: bonusStatData, gOptimization: gOptimization });
        monster_x.dmgCustom = JSON.parse(JSON.stringify(dmgCustom));
        monster_x.bonusStatData = JSON.parse(JSON.stringify(bonusStatData));
        monster_x.gOptimization = JSON.parse(JSON.stringify(gOptimization));
        monster_x.optSubslotsNoMax = optSubslotsNoMax;

        SWO.allData.savedBuilds.push({ "id": SWO.vars.nextBuildId, "build": monster_x });

        var newTabName = "build" + SWO.vars.nextBuildId;
        addTab(SWO.vars.nextBuildId, newTabName, monster.name + " (+" + monster.rune_max + ")");
        displayMonsterBuild(gridRunes, gridMons, newTabName, monster_x, SWO.vars.nextBuildId, true);
        $("#buildtabHolder a:last").tab('show');
        $('.win-splitviewcommand').removeClass('active');
        SWO.func.saveData();

        $('.popover.builds').popover('hide');
    });

    $('#optimizerGrid').on('click', '.grid-pinrow', function (e) {
        e.stopPropagation();
        var currentMode = $('.optimizertable-menu.active').attr('id');
        var columns;

        switch (currentMode) {
            case 'optimizertable-showActual':
                columns = columns_actual;
                break;
            case 'optimizertable-show12':
            case 'optimizertable-show15':
                columns = columns_max;
                break;
        }

        var id = $(this).data('id');
        var data = JSON.parse(JSON.stringify(dataView.getItemById(id)));
        data.unpinnable = true;
        dataViewPinned.addItem(data);
        dataViewPinned.reSort();

        gridPinned.invalidate();

        grid.invalidate();

        gridPinned.resizeCanvas();
        gridPinned.setColumns(columns);

        $('.popover.builds').popover('hide');
    });

    $('#optimizerGridPinned').on('click', '.grid-pinrow', function (e) {
        e.stopPropagation();
        var id = $(this).data('id');

        dataViewPinned.deleteItem(id);
        gridPinned.invalidate();

        grid.invalidate();

        $('.popover.builds').popover('hide');
    });

    $('#deleteAllBuilds').on('click', function (e) {
        if (SWO.allData.savedBuilds.length === 0)
            return;

        if (confirm('Delete all builds?')) {
            deleteAllSavedBuilds(true);
            SWO.fireAlert("success", "All builds deleted.");
        }
        
    });

    var runeMaxLevelNow = 0;
    var runeModeNow, loadCurrentNow = null;

    // switch between Actual and +15 stats
    $('body').on('click', '#optimizertable-showActual', function (e) {
        e.preventDefault();
        if ($(this).hasClass('active')) { return; }
        $('.optimizertable-menu').removeClass('active');
        $(this).addClass('active');

        grid.setColumns(columns_actual);
        setGridColumnWidth();

        setFilterByElements();

        if (loadCurrentNow) {
            $('#optimization-control.start').click();
        }
    });

    // switch between Actual and +15 stats
    $('body').on('click', '#optimizertable-show15', function (e) {
        e.preventDefault();
        if ($(this).hasClass('active')) { return; }
        $('.optimizertable-menu').removeClass('active');
        $(this).addClass('active');

        grid.setColumns(columns_max);
        setGridColumnWidth();

        setFilterByElements();
        if (runeMaxLevelNow === 12 || loadCurrentNow) {
            $('#optimization-control.start').click();
        }
    });
    // switch between Actual and +12 stats
    $('body').on('click', '#optimizertable-show12', function (e) {
        e.preventDefault();
        if ($(this).hasClass('active')) { return; }

        $('.optimizertable-menu').removeClass('active');
        $(this).addClass('active');

        grid.setColumns(columns_max);
        setGridColumnWidth();

        setFilterByElements();
        if (runeMaxLevelNow === 15 || loadCurrentNow) {
            $('#optimization-control.start').click();
        }

    });

    $('body').on('click', '#optimizertable-export-btn', function (e) {
        e.preventDefault();
        var build_data = dataView.getItems();
        if (build_data.length === 0) {
            SWO.func.showAlertBox('No data to export.');
            return;
        }

        worker_csv = new Worker('/js/worker_main.js');
        worker_csv.onmessage = function (e) {
            // Log the workers message.
            if (e.data.cmd == 'jsontocsv_done') {
                SWO.func.saveAs(e.data.csv, currentMonsterData.name.replace('*', '') + '-builds.csv', 'csv');
                $('#optimizertable-export-btn .loading-small').fadeOut();
                if (worker_csv) {
                    worker_csv.terminate();
                    worker_csv = null;
                }
            }
        };

        worker_csv.postMessage({ cmd: 'jsontocsv', builds: build_data });
        $('#optimizertable-export-btn .loading-small').css('display', 'inline-block').hide().fadeIn();
    });

    $('#optimizer-new-session').on('click', function (e) {
        e.preventDefault();
        SWO.compare.createNewSession(SWO.func.saveData(), 'initWorker');
    });

    // clear optimizer filter
    $('#rune_optimize_filter_clear').on('click', function (e) {
        e.preventDefault();
        var stats = ["hp", "atk", "def", "spd", "crate", "cdmg", "res", "acc", "dps", "effhp", "effhp_d", "rune_avg"];

        for (var i = 0; i < stats.length; i++) {
            $('#filter_min_' + stats[i] + ':enabled').val("");
            $('#filter_max_' + stats[i] + ':enabled').val("");
        }
        setFilterByElements();
        checkFilterRanges();
    });

    // apply optimizer filter
    $('#rune_optimize_filter_apply').on('click', function (e) {
        e.preventDefault();
        if (checkFilterRanges()) {
            setFilterByElements();
        }
    });

    $('#rune_optimize_filter_adapt').on('click', function (e) {
        e.preventDefault();
        if ($("#opt_monster").val() == "" || $("#opt_monster").val() == "0") {
            SWO.func.showAlertBox("Selected monster is required.");
            return false;
        }
        var newId = Number($('#opt_monster').val());
        var monster = SWO.func.getRowData('gridMons', newId);

        var stats = ["hp", "atk", "def", "spd", "crate", "cdmg", "res", "acc"];

        for (var i = 0; i < 8; i++) {
            $('#filter_min_' + stats[i] + ':enabled').val(monster['a_' + stats[i]])
        }
        checkFilterRanges();
    });
    
    $('#optimizer-filters-toggle').on('click', function (e) {
        $(this).toggleClass('active');
        $('.optimizer-filter-hidden').slideToggle();
    });
    
    $('#optimizer-bonusSet-toggle').on('click', function (e) {
        $(this).toggleClass('active');
        $('#optimizer-bonusSets').slideToggle();
    });

    $('.panel-clear').on('click', function (e) {
        e.preventDefault();
        SWO.func.clearPanel($(this).closest('.panel'));
    });

    $('.table-clear').on('click', function (e) {
        e.preventDefault();
        var tMap = {
            grid_runes: 'gridRunes',
            grid_crafts: 'gridCrafts'
        }
        var table = $(this).closest('table');
        $('tfoot select', table).val('');
        SWO.tables[tMap[table.attr('id')]].columns().search('').draw();
    });

    //dismiss alerts by X
    $('body').on('click', '.myAlert .close', function (e) {
        e.preventDefault();
        $(this).parent().hide();
    });

    //dismiss alerts by body click
    $('body').on('click', '.myAlert:not(.alert-static)', function (e) {
        e.preventDefault();
        $(this).hide();
    });

    $('body').on('click', '.myAlert.alert-paypal', function (e) {
        e.preventDefault();
        window.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HCGNZJSHCJWF2";
    });

    // reset splitview panel if you click on builds
    $('body').on('click', '.nav-pills li', function (e) {
        $('.win-splitviewcommand').removeClass('active');

        var id = $('a', this).data('id');

        if (id)
            refreshBuildTab(id, true)
    });

    // checkbox-label
    $('body, .win-contentdialog').on('click', '.checkbox-label', function (e) {
        var checkbox_id = $(this).attr('data-checkbox');
        var checkbox = $('#' + checkbox_id);
        checkbox.prop("checked", !checkbox.prop("checked"));
        checkbox.change();
    });

    // runebuilds preview as popover
    $('body').popover({
        selector: '.generate-build:not(th, .grid-pinrow)',
        title: 'Stat Comparison',
        content: 'Loading...',
        trigger: 'hover',
        container: 'body',
        html: true,
        template: '<div class="popover builds" role="tooltip"><div class="arrow"></div><div class="popover-stats"><h3 class="popover-title">Test</h3><div class="popover-content"></div></div><div class="popover-location"><table><thead><tr><th>Rune ID</th><th>Slot</th><th>Set</th><th>Location</th></tr></thead><tbody></tbody></table></div></div>'
    });

    $('body').on('shown.bs.popover', '.generate-build', function () {
        var rune_ids = $('.grid-runeIDs', this).text();
        var runes = rune_ids.split(",");
        for (var i = 0; i < 6; i++) {
            runes[i] = SWO.func.getRowData('gridRunes', Number(runes[i]));
        }

        // get monster from monsters table
        var monster = SWO.func.getRowData('gridMons', currentMonsterID);

        //calculate monsters stats
        var monster_actual = extendMonster(SWO.func.getRowData('gridMons', currentMonsterID), getRunesWithMons(gridRunes, currentMonsterID), { clearExtraFields: true, runeMax: monster.rune_max, optSubslotsNoMax: optSubslotsNoMax, dmgCustom: dmgCustom, bonusStatData: bonusStatData, gOptimization: gOptimization });

        var monster_x = extendMonster(monster, runes, { clearExtraFields: true, runeMax: getRuneMax(), optSubslotsNoMax: optSubslotsNoMax, dmgCustom: dmgCustom, bonusStatData: bonusStatData, gOptimization: gOptimization });

        // get right field
        var currentMode = $('.optimizertable-menu.active').attr('id');
        var field;

        switch(currentMode) {
            case 'optimizertable-showActual':
                field = 'a';
                break;
            case 'optimizertable-show12':
            case 'optimizertable-show15':
                field = 'm';
                break;
        }

        var popoverContent = '<div>\
            <p>HP: ' + niceNumber(monster_x[field + '_hp']) + ' ' + SWO.func.compareStats(monster_actual.a_hp, monster_x[field + '_hp']) + '</p>\
            <p>ATK: ' + niceNumber(monster_x[field + '_atk']) + ' ' + SWO.func.compareStats(monster_actual.a_atk, monster_x[field + '_atk']) + '</p>\
            <p>DEF: ' + niceNumber(monster_x[field + '_def']) + ' ' + SWO.func.compareStats(monster_actual.a_def, monster_x[field + '_def']) + '</p>\
            <p>SPD: ' + niceNumber(monster_x[field + '_spd']) + ' ' + SWO.func.compareStats(monster_actual.a_spd, monster_x[field + '_spd']) + '</p>\
            <p>E.HP: ' + niceNumber(monster_x[field + '_effhp']) + ' ' + SWO.func.compareStats(monster_actual.a_effhp, monster_x[field + '_effhp']) + '</p>\
            <p>DMG: ' + niceNumber(monster_x[field + '_dps']) + ' ' + SWO.func.compareStats(monster_actual.a_dps, monster_x[field + '_dps']) + '</p>\
            <p>Upgrades: ' + monster_x['subsUpgrades'] + '</p>\
        </div><div>\
            <p>Crit: ' + niceNumber(monster_x[field + '_crate']) + '% ' + SWO.func.compareStats(monster_actual.a_crate, monster_x[field + '_crate'], '%') + '</p>\
            <p>CDmg: ' + niceNumber(monster_x[field + '_cdmg']) + '% ' + SWO.func.compareStats(monster_actual.a_cdmg, monster_x[field + '_cdmg'], '%') + '</p>\
            <p>RES: ' + niceNumber(monster_x[field + '_res']) + '% ' + SWO.func.compareStats(monster_actual.a_res, monster_x[field + '_res'], '%') + '</p>\
            <p>ACC: ' + niceNumber(monster_x[field + '_acc']) + '% ' + SWO.func.compareStats(monster_actual.a_acc, monster_x[field + '_acc'], '%') + '</p>\
            <p>E.HP D: ' + niceNumber(monster_x[field + '_effhp_d']) + ' ' + SWO.func.compareStats(monster_actual.a_effhp_d, monster_x[field + '_effhp_d']) + '</p>\
            <p>Effcy%: ' + niceNumber(monster_x['rune_avg']) + '% ' + SWO.func.compareStats(monster_actual.rune_avg, monster_x['rune_avg'], '%') + '</p>\
        </div>';

        // adjust height after content inserted
        $('.popover.builds .popover-content').html(popoverContent);
        
        // locations
        var loc_table = '';
        for (var i = 0; i < 6; i++) {
            loc_table += '<tr><td>' + runes[i].id + '</td><td>' + runes[i].slot + '</td><td>' + runes[i].set + '</td><td>' + runes[i].monster_n + '</td></tr>';
        }
        $('.popover.builds .popover-location tbody').html(loc_table);
    });

    $('#optimizerGrid, #optimizerGridPinned').on('mouseenter', '.generate-build', function (e) {
        $('.popover.builds').popover('hide');
    });
    
    $('html').popover({
        selector: '.monster-data:not(.forbidden)',
        title: 'Stats',
        content : 'Loading...',
        trigger: 'hover',
        container: 'body',
        html: true,
        placement: 'bottom',
        template: '<div class="popover stats" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });

    $('html').on('shown.bs.popover', '.monster-data', function () {
        var id = Number($(this).attr('data-id'));
        var data = SWO.func.getRowData('gridMons', id);

        if (!SWO.func.objectIsEmpty(data)) {
            var popoverContent = '<div>\
                <p>HP: ' + data['a_hp'] + '</p>\
                <p>ATK: ' + data['a_atk']+ '</p>\
                <p>DEF: ' + data['a_def'] + '</p>\
                <p>SPD: ' + data['a_spd'] + '</p>\
                <p>Crit: ' + data['a_crate'] + '%</p>\
                <p>CDmg: ' + data['a_cdmg'] + '%</p>\
                <p>RES: ' + data['a_res'] + '%</p>\
                <p>ACC: ' + data['a_acc'] + '%</p>\
            </div>';
            $('.popover.stats .popover-content').html(popoverContent);
        }
        
    });

    $('[data-toggle="tooltip"]').tooltip();
    
    $('#grid_monsters, .prioritylist-ranking').tooltip({
        selector: '.monRunes-indicators'
    });
    
    $('.information-tooltips').tooltip({
        trigger: 'hover',
        template: '<div class="tooltip tooltip-info" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        html: true,
        title: function () {
            return SWO.texts.tooltips[$(this).data('name')].text;
        },
        placement: function (tip, element) {
            var placement = (SWO.texts.tooltips[$(element).data('name')].placement) ? SWO.texts.tooltips[$(element).data('name')].placement : 'bottom';
            return placement;
        },
        container: 'body'
    });
    
    $('.optimizer-bonusSet').mousedown(function (e) {
        var count_limit = { min: 0, max: 18 };

        var current_count = Number($(this).data('count'));
        switch (e.which) {
            case 1:
                if (current_count === count_limit.max)
                    return;

                current_count = (current_count + 1);
                break;
            case 3:
                if (current_count === count_limit.min)
                    return;

                current_count = (current_count - 1);
                break;
            default:
                
        }
        $(this).data('count', current_count);
        // set classes and show / hide span
        if (current_count > 0) {
            $(this).addClass('active');
            $('span', this).text('x' + current_count).show();
        } else {
            $(this).removeClass('active');
            $('span', this).text('').hide();
        }

        
    });

    // crafts events and vars

    $("#crafts-monsters").change(function () {
        if ($(this).val() == 0 || $(this).val() == "")
            return;

        $('#crafts-optimize .crafts-monster-runes').html($("option:selected", this).text());

        if ($(this).hasClass('display-only')) {
            $(this).removeClass('display-only');
            return;
        }

        SWO.crafts.selectedMon = Number($(this).val());
        SWO.crafts.selectMonster($(this));
    });
    $('body').on('change', '#crafts-monsters-single', function () {
        if ($(this).val() == 0 || $(this).val() == "")
            return;

        SWO.crafts.selectedMon = Number($(this).val());
        SWO.crafts.selectMonster($(this));
    });

    SWO.crafts.selectMonster = function (element) {
        var parent = element.parents('#crafts-optimize');
        var context = (parent.length === 0) ? 'grid_crafts' : 'crafts-optimize';

        var monster_name = (context === 'grid_crafts') ? $("#crafts-monsters-single option:selected").text() : $("#crafts-monsters option:selected").text();
        $('#' + context + ' .crafts-monster-runes').html(monster_name);

        $('#'+ context +' .runeSlot').removeClass('active upgradable');
        var runes = getRunesWithMonsBySlot(gridRunes, SWO.crafts.selectedMon);

        for (var i = 1; i < 7; i++) {
            if (runes[i]) {
                if (context === 'grid_crafts') {
                    displayRuneSlot(context + " #m" + i + "_rune", runes[i], i, true, {context: context, craft_id: Number($('.row-craft-data').attr('data-craft_id'))});
                } else {
                    displayRuneSlot(context + " #m" + i + "_rune", runes[i], i, true);
                }
            } else {
                displayRuneSlot(context + " #m" + i + "_rune", null, i, false);
            }
        };

        $('#' + context + ' .crafts-equipped-runes').fadeIn();
        $('#' + context + ' .crafts-optimizedrune').fadeOut();
    }

    $('body').on('click', '.runeSlot.upgradable', function (e) {
        e.preventDefault();
        var parent = $(this).parents('#crafts-optimize');
        var context = (parent.length === 0) ? 'grid_crafts' : 'crafts-optimize';
        if (context === 'crafts-optimize')
            SWO.crafts.selectedRuneElement = $(this);

        SWO.crafts.selectRune($(this));
    });

    SWO.crafts.selectRune = function (element) {
        var parent = element.parents('#crafts-optimize');
        var context = (parent.length === 0) ? 'grid_crafts' : 'crafts-optimize';

        $('#' + context + ' .runeSlot').removeClass('active');
        var current_element = (context === 'grid_crafts') ? element : SWO.crafts.selectedRuneElement;

        var rune_id = current_element.attr('data-rune_id');
        if (!crafts_optimizedData[rune_id])
            return;

        current_element.addClass('active');
        
        $('#' + context + ' .crafts-optimizedrune-header').html($('.runeSlot-header', current_element).html());

        var html = '';
        var craft_type_loop;
        for (var i = 1; i < 5; i++) {
            var first = true;
            if (crafts_optimizedData[rune_id].possibleCrafts['s' + i].length > 0) {
                crafts_optimizedData[rune_id].possibleCrafts['s' + i].sort(function (a, b) {
                    return parseFloat(b.grade) - parseFloat(a.grade);
                });
                var j = 0;
                $.each(crafts_optimizedData[rune_id].possibleCrafts['s' + i], function (index, value) {
                    if ((context === 'grid_crafts' && Number($('.row-craft-data').attr('data-craft_id')) !== value.id) || (context !== 'grid_crafts' && SWO.crafts.filterMode !== value.type))
                        return true;

                    craft_type_loop = value.type;
                    var gradeValue = craftsValueMap[value.type][value.stat]['g' + value.grade];
                    var row_class = (value.type === 'G' && crafts_optimizedData[rune_id]['s' + i + '_data'] && crafts_optimizedData[rune_id]['s' + i + '_data'].gvalue > 0 && (first || j === 0)) ? 'first' : '';
                    var row_class_second = (value.type === 'G' && j === 1 && crafts_optimizedData[rune_id]['s' + i + '_data'] && crafts_optimizedData[rune_id]['s' + i + '_data'].gvalue > 0) ? 'second' : '';
                    html += '<div class="row ' + row_class + row_class_second + '">';
                    if (first) {
                        var substatvalue = (value.type === 'G') ? ' +' + crafts_optimizedData[rune_id][craftSubstatMap[value.stat]] : '';
                        var grinded_by = '';
                        if (value.type === 'G' && crafts_optimizedData[rune_id]['s' + i + '_data'] && crafts_optimizedData[rune_id]['s' + i + '_data'].gvalue > 0) {
                            var g_value = (crafts_optimizedData[rune_id]['s' + i + '_data']) ? crafts_optimizedData[rune_id]['s' + i + '_data'].gvalue : 0;
                            grinded_by += '<div class="grinded-by">Already grinded by: +' + g_value + '</div>';
                        }

                        html += '<div class="col-md-3 rune-stat">' + value.stat + substatvalue + grinded_by + '</div>';
                    } else {
                        html += '';
                    }
		            
                    if (first) {
                        if (value.type === 'G')
                            first = false;
                        
                        html += '<div class="col-md-3">' + gradeValue.min + '-' + gradeValue.max + '</div>';
                    } else {
                        html += '<div class="col-md-3 col-md-offset-3">' + gradeValue.min + '-' + gradeValue.max + '</div>';
                    }
                    
                    html += '<div class="col-md-3">' + craftsGradeToString[value.grade] + '</div>\
                        <div class="col-md-3 crafts-equip-wrapper"><div class="crafts-equip" data-craft_id="' + value.id + '" data-rune_id="' + rune_id + '" data-field="' + 's' + i + '">Equip</div></div>\
	                </div>';
                    j++;
                });
                // break, although the enchant gem could be on every substat, we need to check only one substat for every rune
                if (craft_type_loop === 'E')
                    break;
            }
        }
        $('#' + context + ' .crafts-grindstones-body').html(html);
        $('#' + context + ' .crafts-optimizedrune').fadeIn();
    }

    $( document ).on("craftEquipReady", function (e) {
        var data = SWO.crafts.equip;

        if (data.type === 'G') {
            var substatValue = 0;
            if (data.rune[data.field + '_data'] && data.rune[data.field + '_data'].gvalue > 0) {
                substatValue = (data.rune[data.field + '_v'] - data.rune[data.field + '_data'].gvalue) + data.realValue;
            } else {
                substatValue = (data.rune[data.field + '_v'] + data.realValue);
            }
            grindstoneRune(gridRunes, data.rune.id, data.field, [data.field + '_v', craftSubstatMap[data.stat]], substatValue, data.realValue);
        } else {
            enchantRune(gridRunes, data);
        }

        SWO.func.removeDataRow('gridCrafts', data);

        if (SWO.crafts.equipContext !== 'direct') {
            if (SWO.crafts.equipContext === 'grid_crafts') {
	            SWO.crafts.rebuildNeeded = false;
	            var select_id = '#crafts-monsters-single';
	        } else {
	            SWO.crafts.rebuildNeeded = true;
	            var select_id = '#crafts-monsters';
	        }
            SWO.crafts.donothing = false;
        } else {
            SWO.crafts.rebuildNeeded = false;
            SWO.crafts.donothing = true;
        }

        // refresh monster stats
        SWO.func.refreshRowData('gridMons', Number($(select_id).val()));

        if (SWO.crafts.equipContext !== 'direct') {
            gridCrafts.rows().every(function () { this.child(false).show(); });
            gridCrafts.rows('.details').nodes().to$().removeClass('details');
        }
        refreshGridCraftsFilters(gridCrafts);
        
        SWO.func.saveData();

        $(document).trigger('refreshCraftsOptimize');
        SWO.crafts.rebuildNeeded = null;
        SWO.crafts.donothing = false;

        SWO.fireAlert("success", "Craft equiped and deleted.");
    });


    $('body').on('click', '.crafts-equip', function (e) {
        e.preventDefault();
        var parent = $(this).parents('#crafts-optimize');
        var context = (parent.length === 0) ? 'grid_crafts' : 'crafts-optimize';

        var crafts_id = Number($(this).attr('data-craft_id')), rune_id = $(this).attr('data-rune_id'), field = $(this).attr('data-field');
        var craft = SWO.func.getRowData('gridCrafts', crafts_id);
        var gradeValue = craftsValueMap[craft.type][craft.stat]['g' + craft.grade];
        craft.value = gradeValue, craft.gradeString = craftsGradeToString[craft.grade], craft.field = field, craft.rune = JSON.parse(JSON.stringify(crafts_optimizedData[rune_id]));
        SWO.crafts.equip = craft;
        SWO.crafts.equipContext = context;
        SWO.dialogs.coDialog.show();
    });

    $('#refreshGrindstoneOptimize').on('click', function (e) {
        e.preventDefault();
        $(document).trigger('refreshCraftsOptimize');
    });

    $('.crafts-filter').on('click', function (e) {
        e.preventDefault();
        $('.crafts-filter').removeClass('active');
        $(this).addClass('active');
        SWO.crafts.filterMode = $(this).data('mode');
        $('#crafts-optimize .craft-headline span').text((SWO.crafts.filterMode === 'G') ? 'Grindstone' : 'Enchant');
        $('.crafts-equipped-runes').fadeOut();
        $('.crafts-optimizedrune').fadeOut();

        craftsOptimizationComplete(true, true);
    });

    $('.craftsTypeToggle').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('active'))
            return;

        $('.tab-pane').removeClass('active');
        var parent = $(this).parents('.tab-pane');

        if (parent.attr('id') == 'crafts') {
            $('#crafts-optimize').addClass('active');
        } else {
            $('#crafts').addClass('active');
        }
    });

    $('.settingsTypeToggle').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('active'))
            return;

        $('.tab-pane').removeClass('active');
        var parent = $(this).parents('.tab-pane');

        if (parent.attr('id') == 'settings') {
            $('#live-import').addClass('active');
        } else {
            $('#settings').addClass('active');
        }
    });

    $('#grid_crafts tbody').on('click', 'tr:not(.no-crafts) td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = gridCrafts.row(tr);

        if (row.child.isShown()) {
            tr.removeClass('details');
            row.child.remove();

        } else {
            gridCrafts.rows().every(function () {this.child(false).show();});
            gridCrafts.rows('.details').nodes().to$().removeClass('details');
            tr.addClass('details');

            var data = row.data();
            var selectMonster = getAllCraftMonsters(data.id);
            $.get("/html/craftsTableRow.html", function (html) {
                row.child(html).show();
                $('#crafts-monsters-single').select2({
                    data: selectMonster
                });
                $('#grid_crafts .craft-headline span').text((data.type === 'G') ? 'Grindstone' : 'Enchant');
                $('.row-craft-data').attr('data-craft_id', data.id);
            }, 'html');
            
        }
    });

    function populateCraftStats() {
        var type = $("#craft_type").val();
        var oldValue = $("#craft_stat").val();
        var fillOld = false;
        var options = '';
        
        $.each(craftsValueMap[type], function (index, value) {
            if (index === oldValue)
                fillOld = true;

            options += '<option value="' + index + '">' + index + '</option>';
        });

        $("#craft_stat").html(options);

        if (fillOld)
            $("#craft_stat").val(oldValue);
    }

    $("#craft_type").change(function () {
        populateCraftStats();
    });

    refreshGridCraftsFilters(gridCrafts);

    $('#opt_focus_count').val(focusRuneSlotCount);

    $('#runes-filter-toggle').on('click', function (e) {
        if ($(this).hasClass('closed')) {
            $('#runes-filter').slideDown();
            $('.runes-filter-slider').slider('relayout');
            $(this).removeClass('closed').addClass('opened');
        } else {
            $('#runes-filter').slideUp();
            $(this).removeClass('opened').addClass('closed');
        }
    });

    $('#runes-filter-clear').on('click', function (e) {
        e.preventDefault();
        // reset slider
        $('.runes-filter-slider').each(function (index) {
            var origValue = $(this).data('slider-value');
            $(this).slider('setValue', origValue);
        });
        $('#runes-filter select:not(.runes-filter-slider)').val(null).change();
        runeFilter = {};
    });

    $('#focus-weights').on('click', '#focus-weights-default', function (e) {
        SWO.settings.data.focusWeights = SWO.func.cloneObject(SWO.vars.defaultFocusWeights);
        $('.focus-weight-slider').each(function (index) {
            var stat = $(this).siblings('.focus-weight-stat').text();
            $(this).slider('setValue', SWO.settings.data.focusWeights[stat]);
            $(this).siblings('.focus-weight-value').text(SWO.settings.data.focusWeights[stat]);
        });
        SWO.settings.save();
    });

    $('.trigger-estimated').on('change focusout', function (e) {
        setEstimatedState()
    });

    /* Grid functions */

    var options = {
        editable: false,
        enableAddRow: false,
        enableCellNavigation: true,
        enableColumnReorder: false,
        autoEdit: false,
        rowHeight: 40,
        showHeaderRow: true,
        headerRowHeight: 40,
        autoHeight: true
    };

    dataView = new Slick.Data.DataView();
    grid = new Slick.Grid("#optimizerGrid", dataView, columns_actual, options);
    dataView.setPagingOptions({
        pageSize: 10,
    });
    var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
    dataView.setFilter(gridFilter);

    $('#optimizerGrid .grid-canvas').html('<div class="no-matching-data">No matching data found.</div>');

    // wire up model events to drive the grid
    dataView.onRowCountChanged.subscribe(function (e, args) {
        grid.updateRowCount();
        grid.render();
        
        if(args.current === 0) {
            $('#optimizerGrid .grid-canvas').html('<div class="no-matching-data">No matching data found.</div>');
        }
    });

    dataView.onRowsChanged.subscribe(function (e, args) {
        grid.invalidateRows(args.rows);
        grid.render();
    });

    dataView.onPagingInfoChanged.subscribe(function (e, args) {
        // update row count in pager
        $('.pager-rows-count').html(args.totalRows);
    });

    grid.onSort.subscribe(function (e, args) {
        sortdir = args.sortAsc ? 1 : -1;
        sortcol = args.sortCol.field;

        // sort pinned builds too
        if (sortcol === 'rune_avg') {
            dataViewPinned.sort((a, b) => {
                var x = a[sortcol], y = b[sortcol];
                return (x - y) * sortdir;
            });
        } else {
            dataViewPinned.sort((a, b) => {
                var x = a[sortcol], y = b[sortcol];
                return (x === y ? 0 : (x > y ? 1 : -1)) * sortdir;
            });
        }
        gridPinned.invalidate();

        if (dataView.getLength() === 0)
            return;
        
        if (sortcol === 'rune_avg') {
            // need other sorting for columns that include floats
            dataView.sort((a, b) => {
                var x = a[sortcol], y = b[sortcol];
                return (x - y) * sortdir;
            });
        } else {
            dataView.sort((a, b) => {
                var x = a[sortcol], y = b[sortcol];
                return (x === y ? 0 : (x > y ? 1 : -1)) * sortdir;
            });
        }
    });
    
    grid.onHeaderRowCellRendered.subscribe(function (e, args) {
        if ($("#opt_monster").val() == "" || $("#opt_monster").val() == "0" || !currentMonsterData)
            return;

        if (bonusStatData && bonusStatData[SWO.vars.bonusStatToColumn[args.column.field]] > 0) {
            if (!$(args.node).hasClass('bonusStats')) {
                $(args.node).addClass('bonusStats');
            }
        } else {
            $(args.node).removeClass('bonusStats');
        }
        $(args.node).text(currentMonsterData[args.column.field]);
        
    });

    var optionsPinned = {
        editable: false,
        enableAddRow: false,
        enableCellNavigation: true,
        enableColumnReorder: false,
        autoEdit: false,
        rowHeight: 40,
        showHeaderRow: false,
        headerHeight: 0,
        headerRowHeight: 0
    };

    dataViewPinned = new Slick.Data.DataView();
    gridPinned = new Slick.Grid("#optimizerGridPinned", dataViewPinned, columns_actual, optionsPinned);

    setGridColumnWidth();

    dataViewPinned.onRowCountChanged.subscribe(function (e, args) {
        gridPinned.updateRowCount();
        gridPinned.render();

        if (args.current === 0) {
            $('#optimizerGridPinned').hide();
        } else {
            $('#optimizerGridPinned').show().height(args.current * 40 - 1);;
        }
    });

    dataViewPinned.onRowsChanged.subscribe(function (e, args) {
        gridPinned.invalidateRows(args.rows);
        gridPinned.render();
    });

    gridPinned.onSort.subscribe(function (e, args) {
        sortdir = args.sortAsc ? 1 : -1;
        sortcol = args.sortCol.field;

        if (dataViewPinned.getLength() === 0)
            return;

        if (sortcol === 'rune_avg') {
            dataViewPinned.sort((a, b) => {
                var x = a[sortcol], y = b[sortcol];
                return (x - y) * sortdir;
            });
        } else {
            dataViewPinned.sort((a, b) => {
                var x = a[sortcol], y = b[sortcol];
                return (x === y ? 0 : (x > y ? 1 : -1)) * sortdir;
            });
        }
    });

    function setGridColumnWidth() {
        var container_size = ($('body').width() < 1130) ? (1130- 123) : ($('body').width() - 123);

        var cols = grid.getColumns();
        var header = $('#optimizerGrid .slick-header-column');
        var i = 0;
        var col_width = 0;
        //console.log('Sum:', columns_width.reduce((a, b) => a + b));
        $.each(cols, function (key, value) {
            col_width = ((container_size / 100) * columns_width[i]);
            value.width = col_width;
            i++;
        });
        grid.setColumns(cols);
        gridPinned.setColumns(cols);
    }

    function gridFilter(item, args) {
        for (var key in args) {
            if (item[key] < args[key].min) {
                return false;
            }
            if (item[key] > args[key].max) {
                return false;
            }
        }
        return true;
    }

    function on_resize(c, t) { onresize = function () { clearTimeout(t); t = setTimeout(c, 400) }; return c };

    $(window).resize(function () {
        on_resize();
        setGridColumnWidth();
    });

    // set potential settings

    // setting actual or case stats in monsters table
    $('.monsterStatToggle').removeClass('active');
    if (SWO.getSetting('general_alwaysActualStats')) {
        $('#monsterShowActualStats').trigger('click');
    } else {
        $('#monsterShowBaseStats').addClass('active');
        $('#monsterStatText').html('Base stats');
    }

    // delete tabs
    $('body').on('click', '.nav-deleteBuild', function (e) {
        deleteTab($(this).data("name"));

        SWO.allData.savedBuilds = removeObjectFromArrayByProperty(SWO.allData.savedBuilds, "id", $(this).data("id"));
        SWO.func.saveData();
    });

    $('#monsters').on('click', '.monster-levelToMax, .monster-awakeToMax', function () {
        var row = gridMons.row($(this).parents('tr'));
        var data = row.data();
        if (!data.master_id) {
            SWO.func.showAlertBox("You need to update SWProxy and import your data to use this feature.");
            return;
        }
            
        var cell = $(this).parent();
        $('.loading-small', cell).css('display', 'inline-block').hide().fadeIn();

        var awake = $(this).hasClass('monster-awakeToMax');
        if (awake) {
            SWO.api.swarfarm.getMonsterByID({ id: (data.master_id + 10), action: 'levelMonsterToMax', row: row, awake: awake });
        } else {
            SWO.api.swarfarm.getMonsterByID({ id: data.master_id, action: 'levelMonsterToMax', row: row });
        }
    });
    
    var reader = new FileReader();
    reader.onload = function(){
    	var data = reader.result;
    	parseData(data);
    };
    var uploadFile = null;
    
    $('#fileUpload').on('change', function(e) {
    	var input = e.target;
		uploadFile = input.files[0]
    });

    $('body').on('click', '.exportAsCSV', function (e) {
        e.preventDefault();
        var dataName = $(this).data('name');
        var data = SWO.allData[dataName];
        if (!data || data.length === 0) {
            SWO.func.showAlertBox('No data to export.');
            return;
        }

        var csv = SWO.func.convertJSONToCSV(data);
        SWO.func.saveAs(csv, dataName + '-data.csv', 'csv');
    });

    // build tabs drag & drop
    dragula([document.querySelector('#buildtabHolder')])
        .on('drop', function (el, target, source, sibling) {
            if (SWO.allData.savedBuilds.length <= 1) { return; };

            var from_id = $('a', el).data('id');
            var from_index = SWO.allData.savedBuilds.findIndex((build) => build.id === from_id);

            if (sibling) {
                var sibling_id = $('a', sibling).data('id');
                var to_index = SWO.allData.savedBuilds.findIndex((build) => build.id === sibling_id);
                if (from_index === 0) {
                    to_index--;
                }
            } else {
                var to_index = SWO.allData.savedBuilds.length - 1;
            }

            $('#buildtabHolder').removeClass('over');
            SWO.allData.savedBuilds.splice(to_index, 0, SWO.allData.savedBuilds.splice(from_index, 1)[0]);
            SWO.func.saveData();
        })
        .on('over', function (el, container, source) {
            $(container).addClass('over');
        })
        .on('out', function (el, container, source) {
            $(container).removeClass('over');
        });

    SWO.func.setTheme();

});