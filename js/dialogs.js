(function () {
    "use strict";

    var skillParseData = {
        'ATK': {
            multi100: true,
            unit: '%',
            value: 'atk'
        },
        'DEF': {
            multi100: true,
            unit: '%',
            value: 'def'
        },
        'ATTACK_DEF': {
            multi100: true,
            unit: '%',
            value: 'def'
        },
        'ATTACK_SPEED': {
            multi100: false,
            unit: '',
            value: 'spd'
        },
        'ATTACK_TOT_HP': {
            multi100: true,
            unit: '%',
            value: 'hp'
        },
        'TARGET_TOT_HP': {
            multi100: true,
            unit: '%',
            value: 'hp',
            data_field: 'dmgcustom_enemy_hp'
        },
        'TARGET_SPEED': {
            multi100: false,
            unit: '',
            value: 'spd',
            data_field: 'dmgcustom_enemy_spd'
        }
    };

    $( document ).on("dialogsLoaded", function (e) {

        //codialog
        SWO.dialogs.coDialog.onbeforehide = function (args) {
            if (args.detail.result === 'primary') {
                var value = $('#coDialog #dialogCraftsValue').val();

                var error = false;
                if (value < SWO.crafts.equip.value.min || value > SWO.crafts.equip.value.max) {
                    $('#coDialog .dialogCraftData-values').addClass('error');
                    error = true;
                } else {
                    $('#coDialog .dialogCraftData-values').removeClass('error');
                    error = false;
                }
                if (SWO.crafts.equip.type === 'E' && $('#enchant-substat').val() == "") {
                    $('#enchant-substat').addClass('error');
                    error = true;
                } else {
                    $('#enchant-substat').removeClass('error');
                    if (!error)
                        error = false;
                }

                if (error) {
                    args.preventDefault();
                } else {
                    SWO.crafts.equip.realValue = Number($('#coDialog #dialogCraftsValue').val());
                    if (SWO.crafts.equip.type === 'E')
                        SWO.crafts.equip.enchantSlot = $('#enchant-substat').val();
					
					SWO.dialogs.runeEnchantDialog.hide();
                    $(document).trigger('craftEquipReady');
                }
            }
        }
        SWO.dialogs.coDialog.onbeforeshow = function (args) {
            SWO.dialogs.coDialog.title = (SWO.crafts.equip.type === 'G') ? 'Grindstone value' : 'Enchanted Gem value';
            if (SWO.crafts.equip.type === 'E') {
                $('#enchant-substat').html(getRuneSubstatsSelect());
                if (SWO.crafts.equip.rune.alreadyEnchanted)
                    $('#enchant-substat').val('s' + SWO.crafts.equip.rune.alreadyEnchanted);

                $('#enchant-substat').show();
                $('#coDialog p.dialog-description').text('Bye bye lame substat. Now please enter the stat you got rid of and also fill in the Enchanted Gem value you received on this rune:');
            } else {
                $('#enchant-substat').hide();
                $('#coDialog p.dialog-description').text('Got a lucky roll? Please enter the exact Grindstone value you received on this rune:');
            }

            $('#coDialog #dialogCraftsValue').val('');
            $('#coDialog .dialogCraftData-id span').text(SWO.crafts.equip.id);
            $('#coDialog .dialogCraftData-type span').text((SWO.crafts.equip.type === 'E') ? 'Enchanted Gem' : 'Grindstone');
            $('#coDialog .dialogCraftData-set span').text(SWO.crafts.equip.set);
            $('#coDialog .dialogCraftData-stat span').text(SWO.crafts.equip.stat);
            $('#coDialog .dialogCraftData-grade span').text(SWO.crafts.equip.gradeString);
            $('#coDialog .dialogCraftData-values span').text(SWO.crafts.equip.value.min + '-' + SWO.crafts.equip.value.max);
        }
        
        //runeEnchantDialog
        SWO.dialogs.runeEnchantDialog.onbeforeshow = function (args) {
            $('#runeEnchantDialog .crafts-optimizedrune').show();

            var html = '';
            var craft_type_loop;

            for (var i = 1; i < 5; i++) {
                var first = true;
                if (crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id].possibleCrafts['s' + i].length > 0) {
                    crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id].possibleCrafts['s' + i].sort(function (a, b) {
                        return parseFloat(b.grade) - parseFloat(a.grade);
                    });
                    var j = 0;
                    $.each(crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id].possibleCrafts['s' + i], function (index, value) {
                        if (SWO.dialogs.runeEnchantDialog.type !== value.type)
                            return true;

                        craft_type_loop = value.type;
                        var gradeValue = craftsValueMap[value.type][value.stat]['g' + value.grade];
                        var row_class = (value.type === 'G' && crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id]['s' + i + '_data'] && crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id]['s' + i + '_data'].gvalue > 0 && (first || j === 0)) ? 'first' : '';
                        var row_class_second = (value.type === 'G' && j === 1 && crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id]['s' + i + '_data'] && crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id]['s' + i + '_data'].gvalue > 0) ? 'second' : '';
                        html += '<div class="row ' + row_class + row_class_second + '">';
                        if (first) {
                            var substatvalue = (value.type === 'G') ? ' +' + crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id][craftSubstatMap[value.stat]] : '';
                            var grinded_by = '';
                            if (value.type === 'G' && crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id]['s' + i + '_data'] && crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id]['s' + i + '_data'].gvalue > 0) {
                                var g_value = (crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id]['s' + i + '_data']) ? crafts_optimizedData[SWO.dialogs.runeEnchantDialog.rune_id]['s' + i + '_data'].gvalue : 0;
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
                        <div class="col-md-3 crafts-equip-wrapper"><div class="crafts-equip" data-craft_id="' + value.id + '" data-rune_id="' + SWO.dialogs.runeEnchantDialog.rune_id + '" data-field="' + 's' + i + '">Equip</div></div>\
	                </div>';
                        j++;
                    });
                    // break, although the enchant gem could be on every substat, we need to check only one substat for every rune
                    if (craft_type_loop === 'E')
                        break;
                }
            }
            $('#runeEnchantDialog .crafts-grindstones-body').html(html);
        }

        //dmgcsutomDialog
        SWO.dialogs.dmgcustomDialog.onbeforeshow = function (args) {
            $('#dmgcustomDialog').removeClass('single general').addClass(SWO.dialogs.dmgcustomDialog.mode);

            //input monster stats if single mode
            if ($('#dmgcustomDialog').hasClass('single') && SWO.dialogs.dmgcustomDialog.rowData) {
                SWO.dialogs.dmgcustomDialog.title = 'Damage Calculation';
                SWO.dialogs.dmgcustomDialog.primaryCommandText = 'Calculate';
                $('input[name="dmgcustom_mode"][value="custom"]').prop("checked", true)
                $('#dmgCustom-monster-col input').each(function (index) {
                    $(this).val(SWO.dialogs.dmgcustomDialog.rowData[$(this).data('field')]);
                });
                $('#dmgCustom-monstername').html(SWO.dialogs.dmgcustomDialog.rowData['name']);
                //populate base stats in popover
                var basestats_tooltip = '';
                $.each(SWO.vars.statFields.base, function (index, value) {
                    basestats_tooltip += SWO.vars.statLabels[index] + ': ' + SWO.dialogs.dmgcustomDialog.rowData[value] + '<br />';
                    $('#dmgCustom-monsterbasestats').attr('data-content', basestats_tooltip);
                });
            } else {
                SWO.dialogs.dmgcustomDialog.title = 'Customize your DMG value';
                SWO.dialogs.dmgcustomDialog.primaryCommandText = 'Apply';
            }

            // check if buildings are available
            if (SWO.allData.buildings) {
                // get buildings data, put it into the tooltip
                var tooltip = '';
                $.each(SWO.allData.buildings, function (index, value) {
                    if (!SWO.lookUp.buildingsData[value.master_id] || !SWO.lookUp.buildingsData[value.master_id].affects)
                        return true;

                    tooltip += SWO.lookUp.buildingsData[value.master_id].name + ' (' + SWO.lookUp.buildingsData[value.master_id].affects.toUpperCase() + '): ' + SWO.lookUp.buildingsData[value.master_id].levelToValue.slice((value.level - 1), value.level) + '%<br />';
                    $('#info-buildings').attr('data-content', tooltip);
                });

                $('#dmgcustom_useBuildings').prop('checked', true).parent().show();
                $('#dmgcustom_useGWBuildings').parent().show();
                $('#info-buildings-wrapper').show();
            } else {
                $('#dmgcustom_useBuildings, #dmgcustom_useGWBuildings').prop('checked', false).parent().hide();
                $('#info-buildings-wrapper').hide();
            }
            
            //check for master_id
            if (SWO.allData.mons[0].master_id) {
                $('#dmgCustom-skill-select').show();
                // fill select field
                SWO.api.swarfarm.fillSelect({ element: '#dmgCustom-monster', firstBlank: true });
                if (Number($('#opt_monster').val()) > 0 && !$('#dmgcustomDialog').hasClass('single')) {
                    var monster = SWO.func.getRowData('gridMons', Number($('#opt_monster').val()));

                    if (Number($('#dmgCustom-monster').val()) !== monster.master_id) {
                        SWO.api.swarfarm.fillSelect({ element: '#dmgCustom-monster', value: monster.master_id });
                    }

                } else if ($('#dmgcustomDialog').hasClass('single') && SWO.dialogs.dmgcustomDialog.rowData) {
                    SWO.api.swarfarm.fillSelect({ element: '#dmgCustom-monster', value: SWO.dialogs.dmgcustomDialog.rowData.master_id });
                } else {
                    SWO.api.swarfarm.fillSelect({ element: '#dmgCustom-monster' });
                }
            } else {
                $('#dmgCustom-skill-select').hide();
            }
            
            
        }
        SWO.dialogs.dmgcustomDialog.onbeforehide = function (args) {
            if (args.detail.result === 'primary' && !$('#dmgcustomDialog').hasClass('single'))
                $(document).trigger('optimizeInit');

            if (args.detail.result === 'primary' && $('#dmgcustomDialog').hasClass('single'))
                args.preventDefault();
        }

        $('.win-contentdialog').on('click', '.checkbox-label', function (e) {
            var checkbox_id = $(this).attr('data-checkbox');
            var checkbox = $('#' + checkbox_id);
            checkbox.prop("checked", !checkbox.prop("checked"));
            checkbox.change();
        });

        //swfDialog
        SWO.dialogs.swfDialog.onbeforeshow = function (args) {
            $('#swarfarm-monsterSelect option:first-child').attr("selected", "selected");
        }
        SWO.dialogs.swfDialog.onbeforehide = function (args) {
            if (args.detail.result === 'primary') {
                SWO.dialogs.swfDialog.args.id = $('#swarfarm-monsterSelect').val();
                SWO.api.swarfarm.getMonsterByID(SWO.dialogs.swfDialog.args);
            }

            $('.loading-small').fadeOut();

            if (SWO.buttons.createNewTemplateMon)
                SWO.buttons.createNewTemplateMon.button('reset');
        }
        
        //renamemonsterDialog
        SWO.dialogs.renamemonsterDialog.onbeforeshow = function (args) {
            $('#monster-name-input').val(SWO.dialogs.renamemonsterDialog.data.name);
        }
        SWO.dialogs.renamemonsterDialog.onbeforehide = function (args) {
            if (args.detail.result === 'primary') {
                if ($('#monster-name-input').val() == '') {
                    $('#monster-name-input').addClass('error');
                    args.preventDefault();
                } else {
                    $('#monster-name-input').removeClass('error');
                    var oldName = SWO.dialogs.renamemonsterDialog.data.name;
                    SWO.dialogs.renamemonsterDialog.data.name = $('#monster-name-input').val();
                    SWO.func.refreshRowData('gridMons', SWO.dialogs.renamemonsterDialog.data);

                    var runeIds = SWO.dialogs.renamemonsterDialog.data.rune_ids.split(",");
                    if (runeIds[0] != '') {
                        runeIds.forEach(rune_id => {
                            var rune = SWO.func.getRowData('gridRunes', Number(rune_id));
                            rune.monster_n = SWO.dialogs.renamemonsterDialog.data.name;
                            SWO.func.updateDataRow('gridRunes', rune);
                        });
                    }

                    SWO.optimizer.replaceMonstersInSelect("rune_monster", SWO.tables.gridMons, true);
                    SWO.optimizer.replaceMonstersInSelect("opt_monster", SWO.tables.gridMons, true);
                    SWO.func.updateMonsterSearchList();
                    SWO.func.saveData();
                    SWO.fireAlert("success", "Monster renamed.<br />" + oldName + " -> " + SWO.dialogs.renamemonsterDialog.data.name);
                }
            }
        }
    });
    
    function getRuneSubstatsSelect() {
        if (!SWO.crafts.equip)
            return;

        var select_options = '<option value="">Select the substat which then will be exchanged.</option>';
        for (var i = 1; i < 5; i++) {
            if (SWO.crafts.equip.rune.alreadyEnchanted && SWO.crafts.equip.rune.alreadyEnchanted !== i)
                continue;

            select_options += '<option value="s' + i + '">' + SWO.crafts.equip.rune['s' + i + '_t'] + ' +' + SWO.crafts.equip.rune['s' + i + '_v'] + '</option>';
        }
        return select_options;
    }

    /**
    ** dmgcustomDialog logic
    **/

    $(function () {
        $('#dmgcustomDialog').on('click', '.skill-multiplier-action-add', function (e) {
            $.get("/html/skillMultiplier.html", function (html) {
                $('.skill-multiplier-wrapper').append(html);
                $('.skill-multiplier-action-add').hide();
                $('.skill-multiplier-action-add').filter(':last').show();
            }, 'html');
        });
        $('#dmgcustomDialog').on('click', '.skill-multiplier-action-remove', function (e) {
            $(this).parent().remove();
            $('.skill-multiplier-action-add').filter(':last').show();
        });
        $('#optimizerGrid-wrapper').on('click', '.tableDmgOptions', function (e) {
            SWO.dialogs.dmgcustomDialog.mode = 'general';
            SWO.dialogs.dmgcustomDialog.show();
        });
        //open dmg calculations for specific monster
        $('#grid_monsters tbody').on('click', 'a.monster-dmg', function (e) {
            e.preventDefault();
            var data = SWO.tables.gridMons.row($(this).parents('tr')).data();
            if (!data.master_id) {
                SWO.func.showAlertBox("You need to update SWProxy and import your data to use this feature.");
                return;
            }
            SWO.dialogs.dmgcustomDialog.mode = 'single';
            SWO.dialogs.dmgcustomDialog.rowData = SWO.tables.gridMons.row($(this).parents('tr')).data();
            SWO.dialogs.dmgcustomDialog.show();
        });
        $('#dmgcustomDialog').on('click', '.win-contentdialog-primarycommand', function (e) {
            if (!$('#dmgcustomDialog').hasClass('single')) {
                return;
            }

            var monster = SWO.func.cloneObject(SWO.dialogs.dmgcustomDialog.rowData);
            $('#dmgCustom-monster-col input').each(function (index) {
                var stat_value = parseFloat($(this).val());
                if (stat_value > 0)
                    monster[$(this).data('field')] = stat_value;
            });

            var dmgData = SWO.func.getDamageOptions(monster);
            var monster = SWO.func.calculateDamage(monster, dmgData);

            $('#dmgCustom-resultValue').text(monster.a_dps);
        });

        $('#dmgcustomDialog').on('change', '.skill-multiplier-select', function (e) {
            var parent = $(this).parent();
            if ($(this).val() === 'spd') {
                parent.addClass('spd');
            } else {
                parent.removeClass('spd');
            }
        });

        $('#dmgcustomDialog').on('change', '#dmgCustom-monster', function (e) {
        	if ($(this).val() == 0)
                return;
                
            $('#dmgCustom-skills').addClass('loading');
            SWO.api.swarfarm.getMonsterByID({ id: Number($(this).val()), action: 'getSkillOptions'});
        });
        $('#dmgcustomDialog').on('change', '#dmgCustom-skills', function (e) {
            if ($(this).val() === '')
                return;

            if ($('option:selected', this).data('homunculus') === true) {
                var skill = SWO.api.swarfarm.monsterData[$('#dmgCustom-monster').val()].homunculus_skills[$('option:selected', this).data('homunculus-index')].skill;
            } else {
                var skill = SWO.api.swarfarm.monsterData[$('#dmgCustom-monster').val()].skills[$(this).val()];
            }

            if (skill && skill.multiplier_formula_raw) {
                var multiplier = JSON.parse(skill.multiplier_formula_raw);
                
                var first = false;
                //create fields
                $.each(multiplier, function (key, value) {
                    if (!skillParseData[value[0]])
                        return true;

                    if (!first) {
                        $('.skill-multiplier-wrapper').html('');
                        $('.dmgcustom_data_fields').hide();
                        first = true;
                    }

                    $.ajax({
                        type: 'GET',
                        url: '/html/skillMultiplier.html',
                        dataType: 'html',
                        async: false
                    }).done(function (html) {
                        $('.skill-multiplier-wrapper').append(html);
                        var element = $('.skill-multiplier-wrapper .skill-multiplier:last-child');
                        $('.skill-multiplier-select', element).val(skillParseData[value[0]].value).change();

                        var value_string = (skillParseData[value[0]].multi100) ? Math.round(value[2] * 100) + skillParseData[value[0]].unit : Math.round(value[2]) + skillParseData[value[0]].unit;
                        $('.skill-multiplier-input', element).val(value_string);
                        
                        if (skillParseData[value[0]].value === 'spd') {
                            if (multiplier[key][0] === 'TARGET_SPEED') {
                                $('.skill-multiplier-input-special', element).val(multiplier[key][4] / 100);
                            } else {
                                $('.skill-multiplier-input-special', element).val(multiplier[key + 2][0] / 100);
                            }
                        }     

                        //display additional fields
                        $('.dmgcustom_data_fields input').val('');
                        if (skillParseData[value[0]].data_field)
                            $('#' + skillParseData[value[0]].data_field).parent().show();
                            
                    });
                });
                $('.skill-multiplier-action-add').hide();
                $('.skill-multiplier-action-add').filter(':last').show();
                $('.skill-multiplier-action-remove').filter(':first').hide();
            }
        });

        $('#dmgcustom_skillups_max').on('click', function (e) {
            var monster_id = $('#dmgCustom-monster').val();
            if (monster_id == 0) {
                SWO.func.showAlertBox("You need to select a monster first.");
                return;
            }

            var skill_index = $('#dmgCustom-skills').val();
            if (skill_index == '') {
                SWO.func.showAlertBox("You need to select a skill.");
                return;
            }
            var homunculus_index = ($('#dmgCustom-skills option:selected').data('homunculus')) ? $('#dmgCustom-skills option:selected').data('homunculus-index') : false;
            SWO.api.swarfarm.getMonsterByID({ id: monster_id, skill_index: skill_index, homunculus_index: homunculus_index, action: 'setSkillupDmgMax' });
        });
        
        $('#monsterCreate, #speedtune-monster-create').on('click', function (e) {
            SWO.api.swarfarm.fillSelect({ element: '#createmonsterDialog-monsterSelect' });
            SWO.dialogs.createmonsterDialog.show();
        });
        
        $('#runeEnchantDialog').on('click', '.crafts-equip', function (e) {
            var crafts_id = Number($(this).attr('data-craft_id')), rune_id = $(this).attr('data-rune_id'), field = $(this).attr('data-field');
            var craft = SWO.func.getRowData('gridCrafts', crafts_id);
            var gradeValue = craftsValueMap[craft.type][craft.stat]['g' + craft.grade];
            craft.value = gradeValue, craft.gradeString = craftsGradeToString[craft.grade], craft.field = field, craft.rune = JSON.parse(JSON.stringify(crafts_optimizedData[rune_id]));
            SWO.crafts.equip = craft;
            SWO.crafts.equipContext = 'direct';
            SWO.dialogs.coDialog.show();
        });
        
        $('#grid_monsters').on('click', '.monster-rename', function (e) {
            var data = SWO.tables.gridMons.row($(this).parents('tr')).data();
            SWO.dialogs.renamemonsterDialog.data = data;
            SWO.dialogs.renamemonsterDialog.show();
        });

    });
    
})();
