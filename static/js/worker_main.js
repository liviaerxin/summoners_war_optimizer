importScripts("subworkers.js");

self.addEventListener('message', function (e) {
    if (e.data.cmd == 'start') {
        monster = e.data.monster;
        threads = e.data.options_optimization.threads;
        max_permutations = e.data.options_optimization.max_permutations;
        options = e.data.options_optimization;
        crafts_optimizedData = e.data.crafts_optimizedData;
        var runes = e.data.runes;
        runes.forEach((rune) => {
            runeMap[rune.id] = rune;
        });

        getPermutationsLoop(e.data.setsForAllSlots, e.data.allOneSet, e.data.requestedSetNumber, e.data.requestedSetTypes, e.data.options_optimization.optBrokenSet);
    }
    if (e.data.cmd == 'abort') {
        for (var j = 0; j < extend_worker.length; j++) {
            if (extend_worker[j]) {
                extend_worker[j].terminate();
                extend_worker[j] = null;
            }
        }
        self.postMessage({ cmd: 'cancel' });
    }
    if (e.data.cmd == 'jsontocsv') {
        self.postMessage({ cmd: 'jsontocsv_done', csv: convertJSONToCSV(e.data.builds) });
    }
}, false);

var monster, options, threads, max_permutations, crafts_optimizedData = null;
var runeMap = {};
var completeExtendedMonsters = [];
var extend_worker = [];
var finishedWorker = 0;

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

var i0 = 0;
var i1 = 0;
var i2 = 0;
var i3 = 0;
var i4 = 0;
var i5 = 0;
var iterations = 0;
var equippedSetTypes = { "Energy": 0, "Fatal": 0, "Blade": 0, "Rage": 0, "Swift": 0, "Focus": 0, "Guard": 0, "Endure": 0, "Violent": 0, "Will": 0, "Nemesis": 0, "Shield": 0, "Revenge": 0, "Despair": 0, "Vampire": 0, "Destroy": 0, "Fight": 0, "Determination": 0, "Enhance": 0, "Accuracy": 0, "Tolerance": 0 };
var numberOfEquippedRequestedSetSlots = 0;
var addedCounter = [false, false, false, false, false, false];
var lastProcessed = [-1, -1, -1, -1, -1, -1];

var getPermutationsLoop = function (setsForAllSlots, allOneSet, requestedSetNumber, requestedSetTypes, optBrokenSet) {
    var allRunePermutations = [];
    if (requestedSetNumber == 0 || allOneSet) {
        for (; i0 < setsForAllSlots[0].length; i0++) {
            for (; i1 < setsForAllSlots[1].length; i1++) {
                for (; i2 < setsForAllSlots[2].length; i2++) {
                    for (; i3 < setsForAllSlots[3].length; i3++) {
                        for (; i4 < setsForAllSlots[4].length; i4++) {
                            for (; i5 < setsForAllSlots[5].length; i5++) {
                                iterations += 1;
                                if (iterations % 10000 == 0) {
                                    self.postMessage({ cmd: 'report', allRunePermutations: allRunePermutations.length });
                                }

                                if (max_permutations && iterations > max_permutations)
                                    self.postMessage({ cmd: 'cancel', reason: 'Optimization canceled. More than ' + max_permutations + ' permutations.' });

                                if (optBrokenSet) {
                                    var equippedSetTypes1 = { "Energy": 0, "Fatal": 0, "Blade": 0, "Rage": 0, "Swift": 0, "Focus": 0, "Guard": 0, "Endure": 0, "Violent": 0, "Will": 0, "Nemesis": 0, "Shield": 0, "Revenge": 0, "Despair": 0, "Vampire": 0, "Destroy": 0, "Fight": 0, "Determination": 0, "Enhance": 0, "Accuracy": 0, "Tolerance": 0 };
                                    equippedSetTypes1[setsForAllSlots[0][i0]["set"]] += 1;
                                    equippedSetTypes1[setsForAllSlots[1][i1]["set"]] += 1;
                                    equippedSetTypes1[setsForAllSlots[2][i2]["set"]] += 1;
                                    equippedSetTypes1[setsForAllSlots[3][i3]["set"]] += 1;
                                    equippedSetTypes1[setsForAllSlots[4][i4]["set"]] += 1;
                                    if (areBrokenSets(equippedSetTypes1, setsForAllSlots[5][i5]["set"])) {
                                        continue;
                                    }
                                }

                                var perm = [];
                                perm.push(setsForAllSlots[0][i0]['id']);
                                perm.push(setsForAllSlots[1][i1]['id']);
                                perm.push(setsForAllSlots[2][i2]['id']);
                                perm.push(setsForAllSlots[3][i3]['id']);
                                perm.push(setsForAllSlots[4][i4]['id']);
                                perm.push(setsForAllSlots[5][i5]['id']);
                                allRunePermutations.push(perm);

                            }
                            i5 = 0;
                        }
                        i4 = 0;
                    }
                    i3 = 0;
                }
                i2 = 0;
            }
            i1 = 0;
        }
    } else
        // if different sets are selected, advanced logic
    {
        for (; i0 < setsForAllSlots[0].length; i0++) {
            if (i0 != lastProcessed[0]) {
                iterations += 1;
                lastProcessed[0] = i0;
                addedCounter[0] = false;
                if (requestedSetTypes[setsForAllSlots[0][i0]["set"]] > 0 && requestedSetTypes[setsForAllSlots[0][i0]["set"]] > equippedSetTypes[setsForAllSlots[0][i0]["set"]])
                    addedCounter[0] = true;
                if (!canRequestedSetsBeFulfilled(requestedSetTypes, equippedSetTypes, setsForAllSlots[0][i0]["set"], requestedSetNumber, 5, numberOfEquippedRequestedSetSlots, addedCounter[0]))
                    continue;

                if (addedCounter[0])
                    numberOfEquippedRequestedSetSlots++;
                equippedSetTypes[setsForAllSlots[0][i0]["set"]] += 1;
            }

            for (; i1 < setsForAllSlots[1].length; i1++) {
                if (i1 != lastProcessed[1]) {
                    iterations += 1;
                    lastProcessed[1] = i1;
                    addedCounter[1] = false;
                    if (requestedSetTypes[setsForAllSlots[1][i1]["set"]] > 0 && requestedSetTypes[setsForAllSlots[1][i1]["set"]] > equippedSetTypes[setsForAllSlots[1][i1]["set"]])
                        addedCounter[1] = true;
                    if (!canRequestedSetsBeFulfilled(requestedSetTypes, equippedSetTypes, setsForAllSlots[1][i1]["set"], requestedSetNumber, 4, numberOfEquippedRequestedSetSlots, addedCounter[1]))
                        continue;

                    if (addedCounter[1])
                        numberOfEquippedRequestedSetSlots++;
                    equippedSetTypes[setsForAllSlots[1][i1]["set"]] += 1;
                }

                for (; i2 < setsForAllSlots[2].length; i2++) {
                    if (i2 != lastProcessed[2]) {
                        iterations += 1;
                        lastProcessed[2] = i2;
                        addedCounter[2] = false;
                        if (requestedSetTypes[setsForAllSlots[2][i2]["set"]] > 0 && requestedSetTypes[setsForAllSlots[2][i2]["set"]] > equippedSetTypes[setsForAllSlots[2][i2]["set"]])
                            addedCounter[2] = true;
                        if (!canRequestedSetsBeFulfilled(requestedSetTypes, equippedSetTypes, setsForAllSlots[2][i2]["set"], requestedSetNumber, 3, numberOfEquippedRequestedSetSlots, addedCounter[2]))
                            continue;

                        if (addedCounter[2])
                            numberOfEquippedRequestedSetSlots++;
                        equippedSetTypes[setsForAllSlots[2][i2]["set"]] += 1;
                    }

                    for (; i3 < setsForAllSlots[3].length; i3++) {
                        if (i3 != lastProcessed[3]) {
                            iterations += 1;
                            lastProcessed[3] = i3;
                            addedCounter[3] = false;
                            if (requestedSetTypes[setsForAllSlots[3][i3]["set"]] > 0 && requestedSetTypes[setsForAllSlots[3][i3]["set"]] > equippedSetTypes[setsForAllSlots[3][i3]["set"]])
                                addedCounter[3] = true;
                            if (!canRequestedSetsBeFulfilled(requestedSetTypes, equippedSetTypes, setsForAllSlots[3][i3]["set"], requestedSetNumber, 2, numberOfEquippedRequestedSetSlots, addedCounter[3]))
                                continue;

                            if (addedCounter[3])
                                numberOfEquippedRequestedSetSlots++;
                            equippedSetTypes[setsForAllSlots[3][i3]["set"]] += 1;
                        }

                        for (; i4 < setsForAllSlots[4].length; i4++) {
                            if (i4 != lastProcessed[4]) {
                                iterations += 1;
                                lastProcessed[4] = i4;
                                addedCounter[4] = false;
                                if (requestedSetTypes[setsForAllSlots[4][i4]["set"]] > 0 && requestedSetTypes[setsForAllSlots[4][i4]["set"]] > equippedSetTypes[setsForAllSlots[4][i4]["set"]])
                                    addedCounter[4] = true;
                                if (!canRequestedSetsBeFulfilled(requestedSetTypes, equippedSetTypes, setsForAllSlots[4][i4]["set"], requestedSetNumber, 1, numberOfEquippedRequestedSetSlots, addedCounter[4]))
                                    continue;
                                if (addedCounter[4])
                                    numberOfEquippedRequestedSetSlots++;
                                equippedSetTypes[setsForAllSlots[4][i4]["set"]] += 1;
                            }

                            for (; i5 < setsForAllSlots[5].length; i5++) {
                                iterations += 1;
                                addedCounter[5] = false;
                                if (requestedSetTypes[setsForAllSlots[5][i5]["set"]] > 0 && requestedSetTypes[setsForAllSlots[5][i5]["set"]] > equippedSetTypes[setsForAllSlots[5][i5]["set"]])
                                    addedCounter[5] = true;
                                if (!canRequestedSetsBeFulfilled(requestedSetTypes, equippedSetTypes, setsForAllSlots[5][i5]["set"], requestedSetNumber, 0, numberOfEquippedRequestedSetSlots, addedCounter[5]))
                                    continue;
                                if (requestedSetNumber != 6 && optBrokenSet && areBrokenSets(equippedSetTypes, setsForAllSlots[5][i5]["set"])) {
                                    continue;
                                }

                                var perm = [];
                                perm.push(setsForAllSlots[0][i0]['id']);
                                perm.push(setsForAllSlots[1][i1]['id']);
                                perm.push(setsForAllSlots[2][i2]['id']);
                                perm.push(setsForAllSlots[3][i3]['id']);
                                perm.push(setsForAllSlots[4][i4]['id']);
                                perm.push(setsForAllSlots[5][i5]['id']);
                                allRunePermutations.push(perm);

                                if (iterations % 10000 == 0) {
                                    self.postMessage({ cmd: 'report', allRunePermutations: allRunePermutations.length });
                                }

                                if (max_permutations && iterations > max_permutations)
                                    self.postMessage({ cmd: 'cancel', reason: 'Optimization canceled. More than ' + max_permutations + ' permutations.' });

                            }
                            equippedSetTypes[setsForAllSlots[4][i4]["set"]] -= 1;
                            if (addedCounter[4])
                                numberOfEquippedRequestedSetSlots--;
                            i5 = 0;
                        }
                        lastProcessed[4] = -1;
                        equippedSetTypes[setsForAllSlots[3][i3]["set"]] -= 1;
                        if (addedCounter[3])
                            numberOfEquippedRequestedSetSlots--;
                        i4 = 0;
                    }
                    lastProcessed[3] = -1;
                    equippedSetTypes[setsForAllSlots[2][i2]["set"]] -= 1;
                    if (addedCounter[2])
                        numberOfEquippedRequestedSetSlots--;
                    i3 = 0;
                }
                lastProcessed[2] = -1;
                equippedSetTypes[setsForAllSlots[1][i1]["set"]] -= 1;
                if (addedCounter[1])
                    numberOfEquippedRequestedSetSlots--;
                i2 = 0;
            }
            lastProcessed[1] = -1;
            equippedSetTypes[setsForAllSlots[0][i0]["set"]] -= 1;
            if (addedCounter[0])
                numberOfEquippedRequestedSetSlots--;
            i1 = 0;
        }
    }

    // split permutations equally for all threads
    var allPermutationsCount = allRunePermutations.length;
    if (allPermutationsCount === 0) {
        self.postMessage({ cmd: 'cancel', reason: 'No builds found.' });
        return;
    }
    var threads_real = (threads > allPermutationsCount) ? allPermutationsCount : threads;
    var split_count = Math.ceil(allPermutationsCount / threads_real);

    // send indicator to mainthread to just kill the worker_main and to be done with operation canceling
    self.postMessage({ cmd: 'done_permutations' });

    var i = 0;
    var buildsCount = [];

    // feed all threads with data to compute
    while (allRunePermutations.length > 0) {
        var start_id = (i === 0) ? 0 : split_count * i + 1;

        buildsCount[i] = 0;

        extend_worker[i] = new Worker('worker_extend.js');
        extend_worker[i].progress = 0;
        extend_worker[i].onmessage = function (e) {
            if (e.data.cmd == 'report_builds') {
                // get overall progress
                extend_worker[e.data.worker_id].progress = e.data.progress;
                var overallProgress = 0, workerCount = extend_worker.length;
                for (var j = 0; j < workerCount; j++) {
                    var workerProgress = (extend_worker[j]) ? extend_worker[j].progress : 100
                    overallProgress += workerProgress;
                }
                overallProgress = Math.round(overallProgress / threads);

                // get overall builds
                buildsCount[e.data.worker_id] = e.data.buildsCount;
                var overallBuilds = 0;
                buildsCount.forEach(value => {
                    overallBuilds += value;
                });
                self.postMessage({ cmd: 'report_builds', allPermutationsCount: allPermutationsCount, overallProgress: overallProgress, overallBuilds: overallBuilds });
            }
            if (e.data.cmd == 'done') {
                buildsCount[e.data.worker_id] = e.data.builds.length;
                completeExtendedMonsters = completeExtendedMonsters.concat(e.data.builds);
                extend_worker[e.data.worker_id].terminate();
                extend_worker[e.data.worker_id] = null;

                finishedWorker++;
                if (threads_real === finishedWorker) {
                    self.postMessage({ cmd: 'done', builds: completeExtendedMonsters });
                }
            }
        };

        // start threads
        extend_worker[i].postMessage({ cmd: 'start', worker_id: i, start_id: start_id, monster: monster, runeMap: runeMap, options: options, data: allRunePermutations.splice(0, split_count), crafts_optimizedData: crafts_optimizedData });

        if (allRunePermutations.length === 0 && extend_worker.length < threads_real)
            threads_real = extend_worker.length;

        i++;
    }
    allRunePermutations.length = 0;
    allRunePermutations = null;
}

function canRequestedSetsBeFulfilled(requestedSetTypes, equippedSetTypes, currentlyAddedSetType, requestedSetNumber, remainingRunes, numberOfEquippedRequestedSetSlots, isAddedToTotal) {
    if (requestedSetNumber == 6) {
        if (requestedSetTypes[currentlyAddedSetType] - equippedSetTypes[currentlyAddedSetType] <= 0)
            return false;
    }
    else {
        if (requestedSetNumber - numberOfEquippedRequestedSetSlots - (isAddedToTotal ? 1 : 0) > remainingRunes) //
            return false;
    }

    return true;
}

function areBrokenSets(equippedSetTypes, currentlyAddedSetType) {
    for (var setName in equippedSetTypes) {
        var cnt = equippedSetTypes[setName] + (currentlyAddedSetType == setName ? 1 : 0);
        if (cnt > 0 && cnt % allSets[setName][0] != 0) {
            return true;
        }
    }

    return false;
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

function convertJSONToCSV(data) {
    if (!data || data.length === 0)
        return;

    var replacer = (key, value) => value === null ? '' : value;
    var header = Object.keys(data[0])
    var csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'))
    csv.unshift(header.join(';'))
    csv = csv.join('\r\n');

    return csv;
}