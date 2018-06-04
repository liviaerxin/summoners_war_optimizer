self.addEventListener('message', function (e) {
    if (e.data.cmd == 'start') {
        runesData = e.data.runesData;
        craftsData = e.data.craftsData;
        prepareRuneData();
        prepareData();
    }
}, false);

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

var enchantSlotRestrictions = {
    1: ['DEF%', 'DEF flat'],
    3: ['ATK%', 'ATK flat']
}

var preFilteredMons = null;
var runesData = null;
var craftsData = null;

var crafts_optimizedData = [];
var crafts_craftToMonster = [];
var crafts_runeToCraft = {};
var crafts_craftToRune = {};

var filteredMons = {
    'G': [],
    'E': []
};

function prepareData() {
    var c_length = craftsData.length;
    var r_length = runesData.length;
    var c, r, i, j, m;

    for (i = 0; i < c_length; i++) {
        c = craftsData[i];

        if (!c)
            continue;
        for (j = 0; j < r_length; j++) {
            r = runesData[j];
            if (craftRuneConsideration(c, r))
                continue;
            var gradeValue = craftsValueMap[c.type][c.stat]['g' + c.grade] || {min: 0, max: 0};
            
            for (m = 1; m < 5; m++) {
                if (craftSlotConsideration(c, r, m, gradeValue))
                    continue;

                var rune = cloneObject(r);

                if (crafts_optimizedData[rune.id]) {
                    crafts_optimizedData[rune.id].possibleCrafts['s' + m].push(c);
                } else {
                    crafts_optimizedData[rune.id] = rune;

                    if (!crafts_optimizedData[rune.id].possibleCrafts)
                        crafts_optimizedData[rune.id].possibleCrafts = { 's1': [], 's2': [], 's3': [], 's4': [] };
                    crafts_optimizedData[rune.id].possibleCrafts['s' + m].push(c);
                }
                crafts_optimizedData[rune.id][c.type] = true;

                if (crafts_optimizedData[rune.id]['s' + m + '_data'] && crafts_optimizedData[rune.id]['s' + m + '_data'].gvalue == 0 && c.type === 'G')
                    crafts_optimizedData[rune.id].ungrinded = true;

                if (!crafts_craftToMonster[c.id])
                    crafts_craftToMonster[c.id] = [];
                crafts_craftToMonster[c.id].push(rune.monster);

                filteredMons[c.type].push(rune.monster);
                
                if (crafts_runeToCraft[rune.id]) {
                    crafts_runeToCraft[rune.id][c.type][c.stat] = true;
                } else {
                    crafts_runeToCraft[rune.id] = {
                        E: {},
                        G: {}
                    };
                    crafts_runeToCraft[rune.id][c.type][c.stat] = true;
                }

                if (!crafts_craftToRune[c.id])
                    crafts_craftToRune[c.id] = [];
                crafts_craftToRune[c.id][rune.id] = true;
            }
        }
    }
    var uniqueFilteredMons = {};
    uniqueFilteredMons['G'] = Array.from(new Set(filteredMons['G']));
    uniqueFilteredMons['E'] = Array.from(new Set(filteredMons['E']));

    self.postMessage({ cmd: 'done', crafts_optimizedData: crafts_optimizedData, crafts_craftToMonster: crafts_craftToMonster, filteredMons: uniqueFilteredMons, crafts_runeToCraft: crafts_runeToCraft, crafts_craftToRune: crafts_craftToRune });
}

function prepareRuneData() {
    var r_length = runesData.length;
    for (i = 0; i < r_length; i++) {
        if (!runesData[i])
            continue;

        for (j = 1; j < 5; j++) {
            if (runesData[i]['s' + j + '_data'] && runesData[i]['s' + j + '_data'].enchanted) {
                runesData[i].alreadyEnchanted = j;
                break;
            }
        }

    }
}

function craftRuneConsideration(craft, rune) {
    switch (craft.type) {
        case 'G':
            return (rune[craftSubstatMap[craft.stat]] === "-" || craft.set !== rune.set);
            break;
        case 'E':
            return (rune.level < 12 || craft.set !== rune.set || rune[craftSubstatMap[craft.stat]] !== "-" || rune['m_t'] === craft.stat || rune['i_t'] === craft.stat || (enchantSlotRestrictions[rune.slot] && enchantSlotRestrictions[rune.slot].indexOf(craft.stat) !== -1));
            break;
    }
}

function craftSlotConsideration(craft, rune, slot, gradeValue) {
    switch(craft.type) {
        case 'G':
            return (rune['s' + slot + '_t'] !== craft.stat || rune['s' + slot + '_data'].gvalue >= gradeValue.max);
            break;
        case 'E':
            return (rune.alreadyEnchanted && rune.alreadyEnchanted !== slot);
            break;
    }
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