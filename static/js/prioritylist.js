(function () {
    "use strict";

    var prioritylistInit = false;
    var prioritylistMonsterlist;
    var prioritylistRanking = [];
    var prioritylistSearch = [];
    var dungeonOptions = [];

    var dungeons = {
        10: 'Giants B10',
        20: 'Dragons B10',
        30: 'Necro B10',
        40: 'ToA',
        50: 'Arena Offense',
        60: 'Arena Defense',
        70: 'GWO',
        80: 'GWD',
        90: 'RaidTeam 1',
        100: 'RaidTeam 2',
        110: 'Rift Water',
        120: 'Rift Fire',
        130: 'Rift Wind',
        140: 'Rift Light',
        150: 'Rift Dark',
        160: 'Farmer / Rep',
        170: 'RTA',
        180: 'HoH',
        1000: 'Other'
    };

    var defaultWeights = {
        10: 4,
        20: 4,
        30: 4,
        40: 1,
        50: 10,
        60: 15,
        70: 10,
        80: 15,
        90: 5,
        100: 2,
        110: 2,
        120: 2,
        130: 2,
        140: 2,
        150: 2,
        160: 2,
        170: 10,
        180: 1,
        1000: 0
    };

    $(document).on("localDataLoaded settingsDataLoaded swarfarmDataLoaded", function (e) {
        if (!SWO.settings.firstLoaded || !SWO.optimizer.firstLoaded || !SWO.api.swarfarm.firstLoaded)
            return;

        init();
    });

    $(document).on("monsterSearchListUpdated", function (e) {
        prioritylistSearch = SWO.lookUp.monsterSearchList.filter((monster) => monster.unit_id);
        updateMonsterList();
    });

    function init() {
        if (!SWO.settings.data.prioritylist[SWO.allData.wizard_id])
            SWO.settings.data.prioritylist[SWO.allData.wizard_id] = {};

        if (!SWO.settings.data.prioritylist[SWO.allData.wizard_id].weights)
            SWO.settings.data.prioritylist[SWO.allData.wizard_id].weights = {};

        if (!SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons)
            SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons = {};


        updateMonsterList();
        generateWeightFields();
        updateRanking();

        prioritylistInit = true;
    }
    
    function updateMonsterList() {
        var options = {
            valueNames: ['name', { data: ['id', 'master_id', 'mname', 'unit_id'] }, { attr: 'src', name: 'mimage' }, { attr: 'data-master_id', name: 'master_id_img' }],
            item: '<li><img src="/images/monster_missing.png" class="mimage master_id_img monster-icon" /></li>',
            page: 24,
            pagination: {
                innerWindow: 1
            }
        };
        if (prioritylistInit) {
            $('#prioritylist-dungeon-select').val(0).change();
            prioritylistMonsterlist.clear();
        }

        prioritylistMonsterlist = new List('prioritylist-monsters', options, prioritylistSearch);

        prioritylistMonsterlist.on('updated', function (e) {
            var activeMonsters = {};
            var dungeon_id = Number($('#prioritylist-dungeon-select').val())
            if (SWO.allData.wizard_id && SWO.settings.data.prioritylist && SWO.settings.data.prioritylist[SWO.allData.wizard_id] && SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons && SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[dungeon_id]) {
                SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[dungeon_id].forEach((id) => {
                    activeMonsters[id] = true;
                });
            }
            e.visibleItems.forEach(item => {
                $(item.elm).removeClass('active');
                if (activeMonsters[$(item.elm).data('unit_id')])
                    $(item.elm).addClass('active');

                var master_id = $(item.elm).data('master_id');
                SWO.api.swarfarm.getMonsterIcon({ id: master_id, parent: '#prioritylist-monsters' });
            });
        });

        prioritylistMonsterlist.update();
    }

    function updateDungeonMonsters() {
        $('#prioritylist-dungeon-monsters').empty();

        var dungeon_id = Number($('#prioritylist-dungeon-select').val());
        if (!SWO.settings.data.prioritylist[SWO.allData.wizard_id] || !SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[dungeon_id])
            return;
        
        SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[dungeon_id].forEach((unit_id) => {
            var monster = SWO.func.getRowData('gridMons', unit_id);
            if (!SWO.func.objectIsEmpty(monster)) {
                var monsterHTML = '<div class="prioritylist-dungeon-row" data-unit_id="' + monster.unit_id + '"><img class="monster-icon" data-loaded="false" data-master_id="' + monster.master_id + '" src="/images/monster_missing.png" /><div class="prioritylist-dungeon-monstername">' + monster.name + '</div><span class="prioritylist-dungeon-monster-remove">x</span></div>';
                $('#prioritylist-dungeon-monsters').append(monsterHTML);
                SWO.api.swarfarm.getMonsterIcon({ id: monster.master_id, parent: '#prioritylist-dungeon-monsters' });
            }
        });
    }

    function updateRanking() {
        if (!SWO.allData.wizard_id)
            return;

        prioritylistRanking = [];
        var rankingObj = {};
        for (var dungeon_id in SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons) {
            SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[dungeon_id].forEach((unit_id) => {
                if (!rankingObj[unit_id])
                    rankingObj[unit_id] = { score: 0, dungeons: [] };

                rankingObj[unit_id].score += getWeight(dungeon_id);
                rankingObj[unit_id].dungeons.push(Number(dungeon_id));
            });
        }

        for (var unit_id in rankingObj) {
            var monster = SWO.func.getRowData('gridMons', Number(unit_id));
            if (!SWO.func.objectIsEmpty(monster)) {
                // unique dungeons
                rankingObj[unit_id].dungeons = [...new Set(rankingObj[unit_id].dungeons)];

                var monsterRankInfo = Object.assign(monster, rankingObj[unit_id]);
                prioritylistRanking.push(monsterRankInfo);
            }
        }

        // sort by score
        prioritylistRanking.sort((a, b) => {
            return b.score - a.score;
        });

        // update UI
        var tbody = $('#prioritylist-ranking-table tbody');
        tbody.empty();

        prioritylistRanking.forEach((monster, i) => {
            var dungeonTP = '';
            monster.dungeons.forEach((dungeon_id) => {
                dungeonTP += (dungeonTP === '') ? dungeons[dungeon_id] : ', ' + dungeons[dungeon_id];
            });

            var runes = SWO.func.getRunesWithMons(SWO.tables.gridRunes, monster.id);
            var runesCheckCountHTML = (runes.length === 6) ? '<span class="monRunes-indicators runeset-full" title="' + runes.length + ' / 6 runes equipped."></span>' : '<span class="monRunes-indicators runeset-notfull" title="' + runes.length + ' / 6 runes equipped."></span>';

            var runesLocked = true;
            $.each(runes, function (key, value) {
                if (value.locked === 0) {
                    runesLocked = false;
                    return false;
                }
            });
            var runesCheckLockHTML = (runesLocked && runes.length > 0) ? '<a href="#" class="monRunes-indicators monRunes-lockState" title="Runes are locked. Click to unlock." data-action="unlock"></a>' : '<a href="#" class="monRunes-indicators monRunes-lockState" title="Runes are unlocked. Click to lock." data-action="lock"></a>';

            var monRow = '<tr data-unit_id="' + monster.unit_id + '"><td>' + (i + 1) + '</td><td><img class="monster-icon" data-loaded="false" data-master_id="' + monster.master_id + '" src="/images/monster_missing.png" />' + monster.name + '</td><td data-toggle="tooltip" data-placement="top" title="' + dungeonTP + '">' + monster.score + '</td><td>' + runesCheckCountHTML + runesCheckLockHTML + '</td><td><button class="btn btn-primary btn-xs prioritylist-ranking-monster-view" type="submit" data-unit_id="' + monster.unit_id + '">View</button><button class="btn btn-primary btn-xs prioritylist-ranking-monster-optimize" type="submit" data-unit_id="' + monster.unit_id + '">Optimize</button></td></tr>';
            tbody.append(monRow);
            SWO.api.swarfarm.getMonsterIcon({ id: monster.master_id, parent: '#prioritylist-ranking-table' });
        });
    }
    SWO.prioritylist.updateRanking = updateRanking;

    function generateWeightFields() {
        $('.prioritylist-weights-column').empty();
        var i = 0;
        for (var dungeon_id in dungeons) {
            var colIndex = (i === 0 || i % 2 === 0) ? 0 : 1;
            var weightHTML = '<div class="prioritylist-weights-row"><div class="prioritylist-weights-row-name">' + dungeons[dungeon_id] + '</div><div class="prioritylist-weights-row-value"><input type="text" class="prioritylist-weights-row-input form-control"  value="' + getWeight(dungeon_id) + '" data-dungeon_id="' + dungeon_id + '" /></div></div>';
            $('.prioritylist-weights-column').eq(colIndex).append(weightHTML);

            i++;
        }
    }

    function getWeight(dungeon_id) {
        return (typeof SWO.settings.data.prioritylist[SWO.allData.wizard_id].weights[dungeon_id] !== 'undefined') ? SWO.settings.data.prioritylist[SWO.allData.wizard_id].weights[dungeon_id] : defaultWeights[dungeon_id] || 0;
    }

    function selectTemplate(state) {
        if (!SWO.allData.wizard_id || !SWO.settings.data.prioritylist || !SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons || !SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[state.id])
            return state.text;

        var $state = $(
                '<span>' + state.text + '<span class="priority-available">[' + SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[state.id].length + ']</span></span>'
            );
        return $state;
    }

    // wait for dom loaded
    $(function () {
        dungeonOptions.push({ id: 0, text: 'Select Dungeon' });
        for (var i in dungeons) {
            dungeonOptions.push({ id: i, text: dungeons[i] });
        }

        $('#prioritylist-dungeon-select').select2({
            data: dungeonOptions,
            templateResult: selectTemplate
        });

        $('#prioritylist-monsters').on('click', 'ul.list li', function (e) {
            var dungeon_id = Number($('#prioritylist-dungeon-select').val());
            if (dungeon_id === 0)
                return;

            var unit_id = $(this).data('unit_id'); 

            if (!SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[dungeon_id])
                SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[dungeon_id] = [];

            var dungeonData = SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[dungeon_id];

            if ($(this).hasClass('active')) {
                SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[dungeon_id] = dungeonData.filter((id) => {
                    return id !== unit_id;
                });

                $(this).removeClass('active');
            } else {
                dungeonData.push(unit_id);
                $(this).addClass('active');
            }

            updateDungeonMonsters();
            updateRanking();
            prioritylistMonsterlist.update();
            SWO.settings.save();
        });

        $('#prioritylist-dungeon-monsters').on('click', '.prioritylist-dungeon-monster-remove', function (e) {
            var dungeon_id = Number($('#prioritylist-dungeon-select').val())
            var unit_id = $(this).parents('.prioritylist-dungeon-row').data('unit_id');

            SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[dungeon_id] = SWO.settings.data.prioritylist[SWO.allData.wizard_id].dungeons[dungeon_id].filter((id) => {
                return id !== unit_id;
            });

            updateDungeonMonsters();
            updateRanking();
            prioritylistMonsterlist.update();
            SWO.settings.save();
        });

        $('.prioritylist-weights').on('focusout', '.prioritylist-weights-row-input', function (e) {
            var dungeon_id = $(this).data('dungeon_id');
            var weightValue = Number($(this).val());

            if (weightValue >= 0 && weightValue !== SWO.settings.data.prioritylist[SWO.allData.wizard_id].weights[dungeon_id]) {
                SWO.settings.data.prioritylist[SWO.allData.wizard_id].weights[dungeon_id] = weightValue;
                updateRanking();
                SWO.settings.save();
            }
        });

        $('.prioritylist-ranking').on('click', '.prioritylist-ranking-monster-view', function (e) {
            e.preventDefault();
            var unit_id = $(this).data('unit_id');

            SWO.func.viewRow('gridMons', unit_id);
        });

        $('.prioritylist-ranking').on('click', '.prioritylist-ranking-monster-optimize', function (e) {
            e.preventDefault();

            var unit_id = $(this).data('unit_id');

            var data = SWO.func.getRowData('gridMons', Number(unit_id));
            var monster_id = (data.unit_id) ? data.unit_id : data.id;

            var element = $('.win-splitviewcommand[data-target="optimizer"]');
            SWO.func.displaySection(element);
            $('#opt_monster').val(monster_id).change();
        });

        $('#prioritylist-weights-default').on('click', function (e) {
            e.preventDefault();
            
            $('.prioritylist-weights-column input').each(function () {
                var dungeon_id = $(this).data('dungeon_id');

                $(this).val(defaultWeights[dungeon_id]);
            });

            SWO.settings.data.prioritylist[SWO.allData.wizard_id].weights = {};
            updateRanking();
            SWO.settings.save();
        });

        $('.prioritylist-ranking').tooltip({
            selector: '[data-toggle="tooltip"]',
            container: 'body'
        });

        // Animations
        $('#prioritylist-monsters .search')
            .on('input', function () {
                if ($(this).val().length > 0) {
                    $('#prioritylist-monsters-body').css('display', 'block');
                    setTimeout(function () {
                        $('#prioritylist-monsters-body').css('opacity', '1');
                    }, 50);
                } else {
                    $('#prioritylist-monsters-body').css('opacity', '0');
                }
            })

        $('#prioritylist-dungeon-select').on('change', function () {
            var dungeon_id = Number($(this).val());
            if (dungeon_id > 0) {
                $('#prioritylist-monsters').show();
            } else {
                $('#prioritylist-monsters').hide();
            }
            updateDungeonMonsters();
            prioritylistMonsterlist.update();
        });

        $('#prioritylist-ranking-table').on('click', 'a.monRunes-lockState', function (e) {
            e.preventDefault();
            var unit_id = $(this).parents('tr').data('unit_id');
            var runes = SWO.func.getRunesWithMons(SWO.tables.gridRunes, unit_id);
            changeRuneLockState(runes, $(this).attr('data-action'), true);

            updateRanking();

            var message = ($(this).attr('data-action') === 'unlock') ? 'Runes are unlocked.' : 'Runes are locked.';
            SWO.fireAlert("success", message);
        });

        $('#prioritylist-monsters').tooltip({
            selector: 'ul.list li',
            animation: false,
            title: function () {
                return $(this).data('mname');
            }
        });

        $('#prioritylist-monsters-body').on('transitionend', function (e) {
            if (!$(this).hasClass('shown')) {
                $(this).addClass('shown')
            } else {
                $(this).css('display', 'none').removeClass('shown');
            }
        });
            
    });
})();
