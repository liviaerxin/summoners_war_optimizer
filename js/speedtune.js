(function () {
    "use strict";

    var speedtuneInit = false;
    var speedtuneList;
    var speedtuneSearch = [];
    var speedtuneActive = [];
    var speedtuneActiveIDs = {};
    var speedtuneActiveMeta = {};
    var speedtuneTotem = 0;
    var speedtuneMode = 'a';

    $(document).on("localDataLoaded swarfarmDataLoaded", function (e) {
        if (!SWO.api.swarfarm.firstLoaded)
            return;

        speedtuneActive = [];
        speedtuneActiveIDs = {};

        updateMonsterList();

        speedtuneActiveMeta.lead = {};
        updateMonsterOverview();

        // get speed totem
        if (speedtuneTotem === 0) {
            $.each(SWO.allData.buildings, function (index, value) {
                if (value.master_id === 6) {
                    speedtuneTotem = SWO.lookUp.buildingsData[value.master_id].levelToValue.slice((value.level - 1), value.level)[0];
                    $('#speedtune-tower-value').val(speedtuneTotem + '%');
                    return false;
                }
            });
        }

        speedtuneInit = true;
    });

    $(document).on("monsterSearchListUpdated", function (e) {
        speedtuneSearch = SWO.lookUp.monsterSearchList.filter((monster) => monster.master_id);
        updateMonsterList();
    });

    function updateMonsterList() {
        var options = {
            valueNames: ['name', { data: ['id', 'master_id', 'mname'] }, { attr: 'src', name: 'mimage' }, { attr: 'data-master_id', name: 'master_id_img' }],
            item: '<li><img src="/images/monster_missing.png" class="mimage master_id_img monster-icon" /></li>',
            page: 20,
            pagination: {
                innerWindow: 1
            }
        };

        if (speedtuneInit)
            speedtuneList.clear();

        speedtuneList = new List('speedtune-monsters', options, speedtuneSearch);

        speedtuneList.on('updated', function (e) {
            e.visibleItems.forEach(item => {
                $(item.elm).removeClass('active');
                if (speedtuneActiveIDs[$(item.elm).data('id')])
                    $(item.elm).addClass('active');

                var master_id = $(item.elm).data('master_id');
                SWO.api.swarfarm.getMonsterIcon({ id: master_id, parent: '#speedtune-monsters' });
            });
        });

        speedtuneList.update();
    }

    function updateMonsterData(noSort) {
        speedtuneActiveMeta.atbBoost = { total: 0 };
        speedtuneActiveMeta.speedBuff = 1;
        
        // get relevant stats
        speedtuneActive.forEach((monster, index) => {
            var lead = 0;
            if (!SWO.func.objectIsEmpty(speedtuneActiveMeta.lead)) {
                if (speedtuneActiveMeta.lead.data.Area === 'Element') {
                    if (monster.attribute === speedtuneActiveMeta.lead.element) {
                        lead = speedtuneActiveMeta.lead.data.amount;
                    }
                } else {
                    lead = speedtuneActiveMeta.lead.data.amount;
                }
            }
                
            monster.bonusSpeed = (monster.b_spd / 100 * speedtuneTotem) + (monster.b_spd / 100 * lead);
            monster.combatSpeed = Math.ceil(monster[speedtuneMode + '_spd'] + monster.bonusSpeed);
        });

        
        if (!noSort) {
            // sort by combatSpeed
            speedtuneActive.sort(function (a, b) {
                return b['combatSpeed'] - a['combatSpeed']
            });
        }

        speedtuneActive.forEach((monster, index) => {
            if (SWO.api.swarfarm.bestiary[monster.master_id].atbBoost && index < 2) {
                speedtuneActiveMeta.atbBoost[index] = SWO.api.swarfarm.bestiary[monster.master_id].atbBoost;
                speedtuneActiveMeta.atbBoost['total'] += SWO.api.swarfarm.bestiary[monster.master_id].atbBoost;
            }

            if (SWO.api.swarfarm.bestiary[monster.master_id].speedBuff)
                speedtuneActiveMeta.speedBuff = 1.3;
        });

        updateSpeedOptimum();
    }

    function updateSpeedOptimum() {
        if (speedtuneActive.length === 0)
            return

        if (speedtuneActiveMeta.atbBoost.total > 0) {
            // advanced logic if attackbar booster involved
            var minimumCombatSpeed = [];
            var atbBoost = SWO.api.swarfarm.bestiary[speedtuneActive[0].master_id].atbBoost;
            var tickBar = speedtuneActive[0].combatSpeed * 0.07;

            // 20 ticks should be enough to fill the atb from the first mon, we start at the second tick
            for (var i = 2; i < 20; i++) {
                if (tickBar > 100) {
                    minimumCombatSpeed.push((speedtuneActive[0].combatSpeed * 0.07 * (i + (speedtuneActive.length - 2)) - speedtuneActiveMeta.atbBoost['total']) / ((i - 1 + speedtuneActiveMeta.speedBuff * (speedtuneActive.length - 1)) * 0.07));
                    if (speedtuneActiveMeta.atbBoost[1])
                        minimumCombatSpeed.push((speedtuneActive[0].combatSpeed * 0.07 * i - (speedtuneActiveMeta.atbBoost[0] || 0)) / ((i - 1 + speedtuneActiveMeta.speedBuff) * 0.07));
                    break;
                }
                tickBar += speedtuneActive[0].combatSpeed * 0.07;
            }
            
            var addition = 0;
            for (var i = speedtuneActive.length; i-- > 0;) {
                if (i === 0) {
                    speedtuneActive[i].optimumSpeed = speedtuneActive[i][speedtuneMode + '_spd'];
                    continue;
                }

                if (minimumCombatSpeed[i]) {
                    speedtuneActive[i].optimumSpeed = Math.floor(minimumCombatSpeed[1] - speedtuneActive[i].bonusSpeed);
                    continue;
                }
                
                speedtuneActive[i].optimumSpeed = Math.floor((minimumCombatSpeed[0] + addition) - speedtuneActive[i].bonusSpeed);
                addition++;
            }
        } else {
            speedtuneActive.forEach((monster, index) => {
                if (index > 0) {
                    monster.optimumSpeed = Math.floor(speedtuneActive[index - 1].combatSpeed - monster.bonusSpeed) - 1;
                } else {
                    monster.optimumSpeed = monster[speedtuneMode + '_spd'];
                }
            });
        }
    }

    function updateMonsterOverview(noSort) {
        updateMonsterData(noSort);

        // display in specific panels
        $('.speedtune-monsterview .speedtune-monsterwrapper').removeClass('filled toofast samespeed');
        for (var i = 0; i < 6; i++) {
            $.ajax({
                type: 'GET',
                url: '/html/speedtuneMonsterpanel.html',
                dataType: 'html',
                async: false
            }).done(function (html) {
                var panel = $('.speedtune-monsterview .speedtune-monsterwrapper').eq(i);
                panel.html(html).attr('data-index', i);
                $('.speedtune-mode-desc', panel).html((speedtuneActiveMeta.atbBoost.total > 0) ? 'Speed Minimum' : 'Speed Optimum');
                if (speedtuneActive[i]) {
                    $('.speedtune-monsterview-icon img', panel).attr('data-master_id', speedtuneActive[i].master_id);
                    $('.panel-heading', panel).html(speedtuneActive[i].name);
                    $('.speedtune-monsterpanel-value:not(.current)', panel).each(function (index) {
                        $(this).html(speedtuneActive[i][$(this).attr('data-field')] || 0);
                    });
                    // inject input field into speed (ingame) field
                    $('.speedtune-monsterpanel-value.current', panel).html('<input type="text" class="speedtune-monsterpanel-value-input form-control"  value="" /><span class="speedtune-monsterpanel-value-edit glyphicon glyphicon-pencil" aria-hidden="true"></span>');
                    $('.speedtune-monsterpanel-value-input', panel).val(speedtuneActive[i][speedtuneMode + '_spd']);
                    // lead skill
                    if (SWO.api.swarfarm.bestiary[speedtuneActive[i].master_id].leader_skill) {
                        var lead = SWO.api.swarfarm.bestiary[speedtuneActive[i].master_id].leader_skill;
                        var area = (lead.Area === 'Element') ? ' ' + speedtuneActive[i].attribute : lead.Area;
                        area = area ? ' ' + area : '';
                        $('.speedtune-monsterpanel-lead span', panel).text('Use Lead [' + lead.amount + '% SPD' + area + ']');
                        $('.speedtune-monsterpanel-lead', panel).show();
                        if (speedtuneActive[i].id === speedtuneActiveMeta.lead.id)
                            $('.speedtune-monsterpanel-lead', panel).addClass('active');
                    }
                    // atb boost indicator
                    if (speedtuneActiveMeta.atbBoost[i] && i < 2)
                        $('.speedtune-monsterview-atb', panel).html(speedtuneActiveMeta.atbBoost[i] + '% ATB').css('display', 'flex');
                    // check order
                    var warning = getWarning(i);
                    if (warning) {
                        panel.addClass(warning.cssClass).tooltip('destroy');
                        setTimeout(function () {
                            panel.tooltip({ placement: 'bottom', trigger: 'manual', title: warning.text, template: '<div class="tooltip ' + warning.cssClass + '" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' }).tooltip('show');
                        }, 500);

                    } else {
                        panel.tooltip('destroy');
                    }

                    panel.addClass('filled');
                    SWO.api.swarfarm.getMonsterIcon({ id: speedtuneActive[i].master_id, parent: '.speedtune-monsterview' });
                } else {
                    panel.tooltip('destroy');
                    $('.panel-heading', panel).html('Monster ' + (i + 1));
                }
            });
        }
        var lastCol = $('.speedtune-monsterview .speedtune-monsterwrapper.filled').filter(':last');
        $('.speedtune-monsterpanel-move-right', lastCol).hide();
    }

    function getWarning(index) {
        if (speedtuneActive[(index - 1)] && speedtuneActive[index].combatSpeed > speedtuneActive[(index - 1)].combatSpeed) {
            return { cssClass: 'toofast', text: 'Oops, too fast for this slot.' };
        } else if (speedtuneActive[(index - 1)] && speedtuneActive[index].combatSpeed === speedtuneActive[(index - 1)].combatSpeed) {
            return { cssClass: 'samespeed', text: 'Same SPD, slot order decides.' };
        }

        return false;
    }

    function removeMonster(id) {
        speedtuneActive = SWO.func.removeObjectFromArrayByProperty(speedtuneActive, 'id', id);
        delete speedtuneActiveIDs[id];
        if (speedtuneActiveMeta.lead.id && speedtuneActiveMeta.lead.id === id)
            speedtuneActiveMeta.lead = {};
    }

    function updateTeamContent() {
        var images = {};
        var popoverContent = '';
        // header
        popoverContent += '<div class="teams-header"><div class="teams-save">Save current team</div></div>';
        popoverContent += '<div class="teams-body">';
        SWO.settings.data.teams.forEach((team, i) => {
            popoverContent += '<div class="teams-row" data-index="' + i + '">';
            for (var monster in team) {
                popoverContent += '<img src="/images/monster_missing.png" class="monster-icon" data-master_id="' + team[monster].master_id + '" />';
                images[team[monster].master_id] = true;
            }
            popoverContent += '<span class="teams-delete" data-index="' + i + '">x</span></div>';
        });
        popoverContent += '</div>';

        // adjust height after content inserted
        $('.popover.teams .popover-content').html(popoverContent);

        // load images
        for (var id in images) {
            SWO.api.swarfarm.getMonsterIcon({ id: id, parent: '.popover.teams' });
        }
    }

    // wait for dom loaded
    $(function () {

        $('#speedtune-monsters').on('click', 'ul.list li', function (e) {
            var id = $(this).data('id');

            if ($(this).hasClass('active')) {
                if (id) {
                    removeMonster(id);
                }
                
                $(this).removeClass('active');
            } else {
                if (speedtuneActive.length === 6)
                    return;

                if (id) {
                    var monster = SWO.func.getRowData('gridMons', id);
                    speedtuneActive.push(extendMonster(monster, getRunesWithMons(SWO.tables.gridRunes, monster.id), { clearExtraFields: true }));
                    speedtuneActiveIDs[id] = true;
                }

                $(this).addClass('active'); 
            }
            updateMonsterOverview();
        });

        $('.speedtune-monsterview').on('click', '.speedtune-monsterview-delete', function (e) {
            var index = $(this).parents('.speedtune-monsterwrapper').data('index');
            var monsterID = speedtuneActive[index].id;
            removeMonster(monsterID);
            speedtuneList.update();
            
            updateMonsterOverview();
        });

        $('.speedtune-monsterview').on('click', '.speedtune-monsterpanel-lead', function (e) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                speedtuneActiveMeta.lead = {};
            } else {
                $('.speedtune-monsterpanel-lead').removeClass('active');
                $(this).addClass('active');
                var index = $(this).parents('.speedtune-monsterwrapper').data('index');
                speedtuneActiveMeta.lead = { id: speedtuneActive[index].id, data: SWO.api.swarfarm.bestiary[speedtuneActive[index].master_id].leader_skill, element: speedtuneActive[index].attribute };
            }
            updateMonsterOverview(true);
        });

        $('.speedtune-monsterview').on('focusout', '.speedtune-monsterpanel-value-input', function (e) {
            var index = $(this).parents('.speedtune-monsterwrapper').data('index');
            speedtuneActive[index][speedtuneMode + '_spd'] = Number($(this).val());

            updateMonsterOverview(true);
        });

        $('#speedtune-tower-value').on('focusout', function (e) {
            speedtuneTotem = parseInt($(this).val()) || speedtuneTotem;

            updateMonsterOverview(true);
        });

        $('.speedtune-monsterview').on('click', '.speedtune-monsterpanel-move-left, .speedtune-monsterpanel-move-right', function (e) {
            var index = $(this).parents('.speedtune-monsterwrapper').data('index');

            if ($(this).hasClass('speedtune-monsterpanel-move-left')) {
                var temp = speedtuneActive[index - 1];
                speedtuneActive[index - 1] = speedtuneActive[index];
                speedtuneActive[index] = temp;
            } else {
                var temp = speedtuneActive[index + 1];
                speedtuneActive[index + 1] = speedtuneActive[index];
                speedtuneActive[index] = temp;
            }
            updateMonsterOverview(true);
        });

        $('.speedtune-monsterview').on('click', '.speedtune-monsterpanel-value-edit', function (e) {
            $(this).siblings('.form-control').focus();
        });

        $('.speedtune-mode-switch').on('click', function (e) {
            if ($(this).hasClass('active'))
                return;

            var mode = $(this).data('mode');
            speedtuneMode = mode;

            $('.speedtune-mode-switch').removeClass('active');
            $(this).addClass('active');

            updateMonsterOverview(true);
        });

        $('#speedtune-monsters').tooltip({
            selector: 'ul.list li',
            title: function () {
                return $(this).data('mname');
            }
        });

        $('#speedtune-teams').popover({
            content: 'Loading...',
            trigger: 'click',
            container: 'body',
            placement: 'bottom',
            html: true,
            template: '<div class="popover teams" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
        });

        $('#speedtune-teams').on('shown.bs.popover', function () {
            updateTeamContent();
        });

        $('body').on('click', '.teams-row', function (e) {
            var index = $(this).data('index');
            var team = SWO.settings.data.teams[index];
            if (!team)
                return;

            speedtuneActiveMeta.lead = {};
            speedtuneActiveIDs = {};
            speedtuneActive = [];

            for (var monster_id in team) {
                var monster = SWO.func.getRowData('gridMons', Number(monster_id));
                if (SWO.func.objectIsEmpty(monster))
                    continue;

                speedtuneActive.push(extendMonster(monster, getRunesWithMons(SWO.tables.gridRunes, monster.id), { clearExtraFields: true }));
                speedtuneActiveIDs[monster.id] = true;
            }

            updateMonsterList();
            updateMonsterOverview();
            $('#speedtune-teams').popover('hide');
        });

        $('body').on('click', '.teams-save', function (e) {
            if (speedtuneActive.length === 0) {
                SWO.func.showAlertBox('No monster selected');
                return;
            }

            var team = {};
            speedtuneActive.forEach(monster => {
                team[monster.unit_id] = { master_id: monster.master_id };
            });

            SWO.settings.data.teams.push(team);
            SWO.settings.save();
            updateTeamContent();

            SWO.fireAlert("success", "Team saved.");
        });

        $('body').on('click', '.teams-delete', function (e) {
            var index = $(this).data('index');
            var team = SWO.settings.data.teams[index];
            if (!team)
                return;

            SWO.settings.data.teams.splice(index, 1);
            SWO.settings.save();
            updateTeamContent();

            SWO.fireAlert("success", "Team removed.");
        });

    });
})();
