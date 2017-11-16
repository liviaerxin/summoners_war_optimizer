(function () {
    "use strict";

    SWO.func.cloneObject = function (object) {
        var target = {};
        for (var i in object) {
            if (object.hasOwnProperty(i)) {
                target[i] = object[i];
            }
        }
        return target;
    }

    SWO.func.objectIsEmpty = function (object) {
        for (var prop in object) {
            if (object.hasOwnProperty(prop))
                return false;
        }

        return true;
    }

    SWO.func.showAlertBox = function (title) {
        alert(title);
    }

    SWO.func.addDataRow = function (tableName, data) {
        SWO.vars[SWO.vars.tableMetaData[tableName].nextIdString]++;
        data.id = SWO.vars[SWO.vars.tableMetaData[tableName].nextIdString];

        data.DT_RowId = 'row_' + data.id;

        if (data[SWO.vars.tableMetaData[tableName].unique_field])
            SWO.lookUp.uniqueToId[tableName][data[SWO.vars.tableMetaData[tableName].unique_field]] = data.id;
        
        var currPage = SWO.tables[tableName].page();
        SWO.tables[tableName].row.add(data).page(currPage).draw(false);
    }

    SWO.func.removeDataRow = function (tableName, data) {
        var dataOrig = SWO.func.getRowData(tableName, data);
        if (!dataOrig)
            return;

        if (dataOrig[SWO.vars.tableMetaData[tableName].unique_field])
            delete SWO.lookUp.uniqueToId[tableName][data[SWO.vars.tableMetaData[tableName].unique_field]];

        var currPage = SWO.tables[tableName].page();
        SWO.tables[tableName].row('#row_' + SWO.func.getRealID(tableName, data)).remove().page(currPage).draw(false);
    }

    SWO.func.updateDataRow = function (tableName, data) {
        var currPage = SWO.tables[tableName].page();
        SWO.tables[tableName].row('#row_' + SWO.func.getRealID(tableName, data)).data(data).page(currPage).draw(false);
    }

    SWO.func.getRowData = function (tableName, id) {
        if (!SWO.tables[tableName])
            return;

        return SWO.func.cloneObject(SWO.tables[tableName].row('#row_' + SWO.func.getRealID(tableName, id)).data());
    }

    SWO.func.getRow = function (tableName, id) {
    	if (!id || id === 0)
            return;
            
        return SWO.tables[tableName].row('#row_' + SWO.func.getRealID(tableName, id));
    }
    
    SWO.func.invalidateRow = function (tableName, id) {
        if (!id || id === 0)
            return;

        SWO.tables[tableName].row('#row_' + SWO.func.getRealID(tableName, id)).invalidate();
    }

    SWO.func.refreshRow = function (tableName, id) {
        if (!id || id === 0)
            return;

        SWO.tables[tableName].row('#row_' + SWO.func.getRealID(tableName, id)).invalidate().draw(false);
    }

    SWO.func.refreshRowData = function (tableName, data) {
        var currPage = SWO.tables[tableName].page();
        SWO.tables[tableName].row('#row_' + SWO.func.getRealID(tableName, data)).invalidate().page(currPage).draw(false);
    }

    SWO.func.viewRow = function (tableName, data) {
        if (tableName === 'gridRunes')
            $('#runes-filter-clear').click();

        var row = SWO.func.getRow(tableName, data);
        SWO.tables[tableName].search('').columns().search('');
        SWO.tables[tableName].order([0, "asc"]).draw();
        $('tfoot select', $(SWO.tables[tableName].table().node())).val('');
        var page_length = SWO.tables[tableName].page.len();
        var page = Math.floor(row.index() / page_length);
        SWO.tables[tableName].page(page).draw(false);
        // go to section
        SWO.func.displaySection($('.win-splitviewcommand[data-target="' + SWO.vars.tableMetaData[tableName].section + '"]'));
        //select row
        var element = row.nodes().to$();
        if (!element.hasClass('selected'))
            SWO.func[tableName + 'RowClick'](row.nodes().to$());
    }

    SWO.func.displaySection = function (element) {
        $('.win-splitviewcommand').removeClass('active');
        element.addClass('active');

        //Display the right section
        var target = element.data('target');
        $('.tab-pane, .nav-pills li').removeClass('active');
        $('#' + target).addClass('active');
    }

    SWO.func.clearPanel = function (panel) {
        $('input:not(:radio)', panel).val('');
        $('select', panel).val(null).change();
    }

    SWO.func.getRealID = function (tableName, data) {
        if (typeof data === 'number') {
            if (SWO.func.isUniqueID(data)) {
                return (SWO.lookUp.uniqueToId[tableName][data]) ? SWO.lookUp.uniqueToId[tableName][data] : null;
            } else {
                return data;
            }
        } else {
            return (data[SWO.vars.tableMetaData[tableName].unique_field] && SWO.lookUp.uniqueToId[tableName][data[SWO.vars.tableMetaData[tableName].unique_field]]) ? SWO.lookUp.uniqueToId[tableName][data[SWO.vars.tableMetaData[tableName].unique_field]] : data.id;
        }
    }

    SWO.func.isUniqueID = function (id) {
        return id > 10000;
    }

    SWO.func.handleAjaxResponse = function (data, args) {
        switch (args.action) {
            case 'levelMonsterToMax':
                SWO.func.levelMonsterToMax(data, args);
                break;
            case 'createMonsterToMax':
                SWO.func.createMonsterToMax(data, args);
                break;
            case 'getSkillOptions':
                SWO.func.getSkillOptions(data);
                break;
            case 'setSkillupDmgMax':
                SWO.func.setSkillupDmgMax(data, args);
                break;
            default:

        }
    }

    SWO.func.levelMonsterToMax = function (data_detail, args) {
        if (jQuery.isEmptyObject(data_detail)) {
            aargs.title = 'Select Monster';
            args.desc = 'Monster name was not found. Please select the monster manually.';
            args.element = '#swarfarm-monsterSelect';
            SWO.api.swarfarm.openSelectDialog(args);
            return;
        }
        
        var changedStats = ['b_hp', 'b_def', 'b_atk'];

        var data = SWO.tables.gridMons.row(args.row).data();

        $.each(changedStats, function (key, value) {
            data[value] = SWO.func.levelStatToMax(data_detail, data_detail[SWO.api.swarfarm.fieldMap[value]], value);
        });
        //set other values because of potential awake boni
        data.b_spd = data_detail['speed'];
        data.b_crate = data_detail['crit_rate'];
        data.b_cdmg = data_detail['crit_damage'];
        data.b_res = data_detail['resistance'];
        data.b_acc = data_detail['accuracy'];
        
        data.level = 40;
        data.master_id = data_detail.com2us_id;

        if (args.awake) {
            data.name = data_detail.name;
            SWO.optimizer.replaceMonstersInSelect("rune_monster", SWO.tables.gridMons, true);
            SWO.optimizer.replaceMonstersInSelect("opt_monster", SWO.tables.gridMons, true);
            SWO.func.updateMonsterSearchList();
        }

        var currPage = SWO.tables.gridMons.page();
        SWO.tables.gridMons.row(args.row).invalidate().page(currPage).draw(false);

        SWO.func.saveData();

        SWO.fireAlert("success", "Monster " + data.name + " leveled up to 40.");
    }

    SWO.func.createMonsterToMax = function (data_detail, args) {
        if (jQuery.isEmptyObject(data_detail))
            return;

        var monster = { "master_id": data_detail.com2us_id, "name": data_detail.name, "level": 40, "b_hp": SWO.func.levelStatToMax(data_detail, data_detail.base_hp, 'b_hp'), "b_atk": SWO.func.levelStatToMax(data_detail, data_detail.base_attack, 'b_atk'), "b_def": SWO.func.levelStatToMax(data_detail, data_detail.base_defense, 'b_def'), "b_spd": data_detail.speed, "b_crate": data_detail.crit_rate, "b_cdmg": data_detail.crit_damage, "b_res": data_detail.resistance, "b_acc": data_detail.accuracy, stars: 6, attribute: data_detail.element, unit_id: null, location: 'inventory' };
        SWO.func.addDataRow('gridMons', monster);

        SWO.optimizer.replaceMonstersInSelect("rune_monster", SWO.tables.gridMons, true);
        SWO.optimizer.replaceMonstersInSelect("opt_monster", SWO.tables.gridMons, true);
        SWO.func.updateMonsterSearchList();

        SWO.func.saveData();
        SWO.fireAlert("success", "Monster " + monster.name + " created.");
        
        $('#createmonsterDialog-monsterSelect').removeClass('loading');
        SWO.dialogs.createmonsterDialog.hide();
    }

    SWO.func.levelStatToMax = function (monster, stat, type, grade) {
        if (type === 'b_hp')
            stat = stat / 15;

        if (!grade)
            var grade = 6;

        var weight = monster.base_hp / 15 + monster.base_attack + monster.base_defense;
        var base_value = Math.round((stat * (105 + 15 * monster.base_stars)) / weight);

        var magic_multipliers = [
          { '1': 1.0, 'max': 1.9958 },
          { '1': 1.5966, 'max': 3.03050646 },
          { '1': 2.4242774, 'max': 4.364426603 },
          { '1': 3.4914444, 'max': 5.941390935 },
          { '1': 4.7529032, 'max': 8.072330795 },
          { '1': 6.4582449, 'max': 10.97901633 }
        ];

        var stat_max = Math.round(base_value * magic_multipliers[grade - 1]['max']);

        return (type === 'b_hp') ? stat_max * 15 : stat_max;
    }

    SWO.func.getSkillOptions = function (data_detail) {
        if (jQuery.isEmptyObject(data_detail))
            return;

        var i = 0;
        var skill_options = '<option value="">Please select a skill.</option>';
        $.each(data_detail.skills, function (key, value) {
            if (value.multiplier_formula_raw == '')
                return true;
            var multiplier = JSON.parse(value.multiplier_formula_raw);
            if (!multiplier)
                return true;
            skill_options += '<option value="' + i + '">' + value.name + '</option>';
            i++;
        });

        if (data_detail.homunculus_skills) {
            $.each(data_detail.homunculus_skills, function (key, value) {
                if (value.skill.multiplier_formula_raw == '')
                    return true;
                var multiplier = JSON.parse(value.skill.multiplier_formula_raw);
                if (!multiplier)
                    return true;
                skill_options += '<option data-homunculus="true" data-homunculus-index="' + key + '" value="' + i + '">' + value.skill.name + '</option>';
                i++;
            });
        }

        $('#dmgCustom-skills').html(skill_options).removeClass('loading').change();
    }

    SWO.func.setSkillupDmgMax = function (data_detail, args) {
        if (jQuery.isEmptyObject(data_detail) || !data_detail['skills'])
            return;

        var skillupDmg = 0;
        if (args.homunculus_index) {
            var skillups = data_detail['homunculus_skills'][args.homunculus_index]['skill']['level_progress_description'].split('\n');
        } else {
            var skillups = data_detail['skills'][args.skill_index]['level_progress_description'].split('\n');
        }

        skillups.forEach(skillup => {
            if (skillup != '' && skillup.indexOf('Damage') !== -1)
                var addition = skillup.match(/\d+/g);
            if (addition)
                skillupDmg += Number(addition[0]);
        });

        $('#dmgcustom_skillups').val(skillupDmg);
    }

    SWO.func.saveData = function () {
        var runes = [];
        var crafts = [];
        var mons = [];

        SWO.tables.gridRunes.data().each(function (d) {
            runes.push(d);
        });
        SWO.tables.gridCrafts.data().each(function (d) {
            crafts.push(d);
        });
        SWO.tables.gridMons.data().each(function (d) {
            mons.push(d);
        });

        var allData = { "runes": runes, "crafts": crafts, "mons": mons, "savedBuilds": SWO.allData.savedBuilds };

        if (SWO.allData.buildings)
            allData.buildings = SWO.allData.buildings;

        if (SWO.allData.wizard_id)
            allData.wizard_id = SWO.allData.wizard_id;

        if (SWO.allData.tvalue)
            allData.tvalue = SWO.allData.tvalue;
            
       	if (SWO.lookUp.uniqueToId) {
            allData.uniqueToId = SWO.lookUp.uniqueToId;
        }

        allData.processed = true;

        SWO.allData = allData;

        var dataString = JSON.stringify(allData);
        localStorage.setItem(SWO.vars.localDataName, dataString);

        return dataString;
    }

    SWO.func.backUp = function (fileName) {
        SWO.localFolder.getFileAsync(fileName).then(function (fileOrig) {
            SWO.backUpFile = fileOrig;
            return Windows.Storage.FileIO.readTextAsync(fileOrig);
        }).done(function (data) {
            var savePicker = new Windows.Storage.Pickers.FileSavePicker();
            savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.desktop;
            savePicker.fileTypeChoices.insert("JSON Data", [".json"]);
            // Default file name if the user does not type one in or select a file to replace
            savePicker.suggestedFileName = SWO.backUpFile.name;

            savePicker.pickSaveFileAsync().then(function (file) {
                if (file) {
                    // Prevent updates to the remote version of the file until we finish making changes and call CompleteUpdatesAsync.
                    Windows.Storage.CachedFileManager.deferUpdates(file);
                    // write to file
                    Windows.Storage.FileIO.writeTextAsync(file, data).done(function () {
                        Windows.Storage.CachedFileManager.completeUpdatesAsync(file);
                        SWO.fireAlert("success", SWO.backUpFile.name + " saved.");
                    });
                }
            });
        }, function () {
            // not found
            SWO.func.showAlertBox("BackUp file not found!");
        });
    }

    SWO.func.restoreBackUp = function (data) {
        if (data == null || data === '') {
            SWO.func.showAlertBox("File is empty.");
            return;
        } else {
            var settings = JSON.parse(data);
            if (!settings.monsterLocked) {
                SWO.func.showAlertBox("File is not a valid setting file.");
                return;
            }
        }

        localStorage.setItem('swop_settings', data);
        SWO.fireAlert("success", "Settings restored.<br>Refreh page to see the changes.");
    }

    SWO.func.saveAs = function (content, fileName, fileType) {
        var fileType = (!fileType) ? 'json' : fileType;
        var extensions = {
            json: { desc: 'JSON Data', ext: '.json' },
            csv: { desc: 'CSV Data for Excel', ext: '.csv' }
        };

        var blob = new Blob([content], { type: 'text/' + fileType + ';charset=utf-8' });
        saveAs(blob, fileName);
    }
    
    SWO.func.getBonusStatData = function () {
        var bonusStatData = {};
        $('.optimizer-bonusSet').each(function (index) {
            bonusStatData[$(this).data('type')] = Number($(this).data('count') * $(this).data('bonus'))
        });

        // Spd
        bonusStatData.spd = (Number($("#opt_speed_lead").val()) + Number($("#opt_speed_totem").val()));

        return bonusStatData;
    }

    SWO.func.getDamageOptions = function (monster) {
        var dmgcustomData = {};
        dmgcustomData.multiplier = {
            skill: { atk: 0, spd: { summand: 0, divisor: 0 }, hp: 0, def: 0 },
            buildings: { atk: 0, spd: 0, hp: 0, def: 0, crate: 0, cdmg: 0 },
            lead: { atk: 0, spd: 0, hp: 0, def: 0, crate: 0, cdmg: 0 },
            buffs: { atk: 0, def: 0, spd: 0 },
            debuffs: { brand: 0 }
        };

        dmgcustomData.mode = $('input[name=dmgcustom_mode]:checked').val();
        dmgcustomData.addcrit = (parseFloat($('#dmgcustom_addcrit').val()) > 0) ? parseFloat($('#dmgcustom_addcrit').val()) : 0;
        dmgcustomData.skillups = (parseFloat($('#dmgcustom_skillups').val()) > 0) ? (parseFloat($('#dmgcustom_skillups').val()) / 100) : 0;

        dmgcustomData.defense = (parseFloat($('#dmgcustom_defense').val()) > 0) ? parseFloat($('#dmgcustom_defense').val()) : 800;
        dmgcustomData.defense = ($('#dmgcustom_useDefbreak').prop('checked')) ? (dmgcustomData.defense * 0.3) : dmgcustomData.defense;
        dmgcustomData.defense = ($('#dmgcustom_ignoredef').prop('checked')) ? 0 : dmgcustomData.defense;

		dmgcustomData.enemy_hp = (parseFloat($('#dmgcustom_enemy_hp').val()) > 0) ? parseFloat($('#dmgcustom_enemy_hp').val()) : 0;
        dmgcustomData.enemy_spd = (parseFloat($('#dmgcustom_enemy_spd').val()) > 0) ? parseFloat($('#dmgcustom_enemy_spd').val()) : 0;

        dmgcustomData.multiplier.buffs.atk = ($('#dmgcustom_useAtkbuff').prop('checked')) ? 1.5 : 1;
        dmgcustomData.multiplier.buffs.def = ($('#dmgcustom_useDefbuff').prop('checked')) ? 1.7 : 1;
        dmgcustomData.multiplier.buffs.spd = ($('#dmgcustom_useSpdbuff').prop('checked')) ? 1.3 : 1;
        dmgcustomData.multiplier.debuffs.brand = ($('#dmgcustom_useBranddebuff').prop('checked')) ? 1.25 : 1;

        dmgcustomData.useBuildings = $('#dmgcustom_useBuildings').prop('checked');
        dmgcustomData.useGWBuildings = $('#dmgcustom_useGWBuildings').prop('checked');
        dmgcustomData.isCrit = $('#dmgcustom_isCrit').prop('checked');
        dmgcustomData.isBomb = $('#dmgcustom_isBomb').prop('checked');

        $('.skill-multiplier').each(function (index) {
            var bonus = parseFloat($('.skill-multiplier-input', this).val().replace(',', '.'));
            if (bonus > 0) {
                if ($('.skill-multiplier-select', this).val() === 'spd') {
                    var special = parseFloat($('.skill-multiplier-input-special', this).val().replace(',', '.'));
                    if (!special)
                        return true;

                    dmgcustomData.multiplier.skill[$('.skill-multiplier-select', this).val()].summand += bonus;
                    dmgcustomData.multiplier.skill[$('.skill-multiplier-select', this).val()].divisor += special;
                    if (dmgcustomData.multiplier.skill.atk === 0)
                        dmgcustomData.multiplier.skill.atk = 1;
                } else {
                    dmgcustomData.multiplier.skill[$('.skill-multiplier-select', this).val()] += (bonus / 100);
                }

            }
        });

        var lead_bonus = parseFloat($('.skill-lead-input').val());
        if (lead_bonus > 0)
            dmgcustomData.multiplier.lead[$('.skill-lead-select').val()] += (lead_bonus / 100);

        if ((dmgcustomData.useBuildings || dmgcustomData.useGWBuildings) && SWO.allData.buildings) {
            $.each(SWO.allData.buildings, function (index, value) {
                if (!SWO.lookUp.buildingsData[value.master_id] ||
                    !SWO.lookUp.buildingsData[value.master_id].affects ||
                    (SWO.lookUp.buildingsData[value.master_id].restrictedTo && monster.attribute !== '' && SWO.lookUp.buildingsData[value.master_id].restrictedTo !== monster.attribute.toLowerCase()))
                    return true;

                if (!dmgcustomData.useGWBuildings && SWO.lookUp.buildingsData[value.master_id].section === 'guildwar')
                    return true;

                dmgcustomData.multiplier.buildings[SWO.lookUp.buildingsData[value.master_id].affects] += (parseFloat(SWO.lookUp.buildingsData[value.master_id].levelToValue.slice((value.level - 1), value.level)) / 100);
            });
        }

        return dmgcustomData;
    }

    SWO.func.calculateDamage = function (monster, options) {
        var maxCritRate = 100;
        var modes = ['b', 'a', 'm'];
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

                if (options.isCrit && !options.isBomb)
                    base_sum = base_sum * (1 + (monster[modes[i] + '_cdmg'] / 100) + options.multiplier.buildings.cdmg);

                if (skillupBonus > 0)
                    base_sum += skillupBonus;

                if (!options.isBomb)
                    base_sum = base_sum * (1000 / (1140 + 3.5 * options.defense));

                monster[modes[i] + '_dps'] = Math.floor(base_sum);
            }
        }

        return monster;
    }

    SWO.func.writeBlobToFile = function (blob, folder, filename, args, callback) {
        folder.createFileAsync(filename, Windows.Storage.CreationCollisionOption.openIfExists).then(function (file) {
            // Open the returned file in order to copy the data
            file.openAsync(Windows.Storage.FileAccessMode.readWrite).then(function (output) {

                // Get the IInputStream stream from the blob object
                var input = blob.msDetachStream();

                // Copy the stream from the blob to the File stream
                Windows.Storage.Streams.RandomAccessStream.copyAsync(input, output).then(function () {
                    output.flushAsync().done(function () {
                        input.close();
                        output.close();
                        if (callback && args)
                            SWO.func[callback](args);

                    }, SWO.func.writeBlobToFileError);
                }, SWO.func.writeBlobToFileError);
            }, SWO.func.writeBlobToFileError);
        }, SWO.func.writeBlobToFileError);
    }

    SWO.func.writeBlobToFileError = function (error) {
        
    }

    SWO.func.setMonsterIcon = function (args) {
        if (SWO.func.objectIsEmpty(SWO.api.swarfarm.bestiary))
            return;

        var parent = args.parent || '';
        var imageName = SWO.api.swarfarm.bestiary[args.id]['image_filename'];
        $(parent + ' img.monster-icon[data-master_id="' + args.id + '"]').attr('src', 'https://swarfarm.com/static/herders/images/monsters/' + imageName).attr('data-loaded', 'true');
    }

    SWO.func.compareStats = function (current_stat, new_stat, unit, value) {
        var string = '';
        var unit = (!unit) ? '' : unit;

        if (!value)
            var value = (Number(new_stat) - Number(current_stat));
        
        if (value < 0) {
            string = '<span class="less">[' + niceNumber(value) + unit + ']</span>';
        } else if (value == 0) {
            string = '<span>[+' + niceNumber(value) + unit + ']</span>';
        } else {
            string = '<span class="more">[+' + niceNumber(value) + unit + ']</span>';
        }
        return string;
    }

    SWO.func.updateMonsterSearchList = function () {
        SWO.lookUp.monsterSearchList = [];

        SWO.tables.gridMons.data().each(function (value, index) {
            SWO.lookUp.monsterSearchList.push({ 'id': value.id, 'mname': value.name, 'master_id': value.master_id, 'master_id_img': value.master_id, 'unit_id': value.unit_id });
        });

        $(document).trigger('monsterSearchListUpdated');
    }

    SWO.func.convertJSONToCSV = function (data) {
        if (!data || data.length === 0)
            return;

        var replacer = (key, value) => value === null ? '' : value;
        var header = Object.keys(data[0])
        var csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'))
        csv.unshift(header.join(';'))
        csv = csv.join('\r\n');

        return csv;
    }

    SWO.func.setTheme = function (theme) {
        var theme_var = (theme) ? theme : SWO.getSetting('theme');
        $('#theme').attr('href', 'themes/' + theme_var + '/style.css');
        //switch menu icons
        Array.from(document.querySelectorAll('.win-splitviewcommand')).forEach((element) => {
            element.winControl.icon = 'url(/themes/' + theme_var + '/images/' + SWO.vars.menuIcons[$(element).data('target')] + ')';
        });
    }

})();