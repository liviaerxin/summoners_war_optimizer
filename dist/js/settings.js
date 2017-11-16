(function () {
    "use strict";

    var noSave = false;

    var default_settings = {
        import_replaceMonsterNames: true,
        import_filter_useless_monster: false,
        import_filter_norunes_monster: false,
        import_filter_grade_monster: false,
        import_refreshData: false,
        import_refreshData_overrideLocation: false,
        general_alwaysActualStats: true,
        general_showGrindvalues: true,
        general_threadCount: 4,
        livesync_state: false,
        optimizer_loadCurrent: true,
        optimizer_prefiltered: true,
        optimizer_autofillParams: false,
        theme: 'dark'
    };

    $(document).on("localDataLoaded", function (e) {
        prepareMonsterLocked();

        if (SWO.settings.firstLoaded && SWO.optimizer.autoImported)
            lockRunesOnImport();
    })

    $(document).on("settingsDataLoaded", function (e) {
        applyMonsterLocked();
        applyFocusWeights();
        applyTeams();
        applyPrioritylist();
        SWO.settings.firstLoaded = true;
    });

    function getSetting(setting) {
        var setting_val = localStorage.getItem(setting);
        return (setting_val != null) ? parseSettingValue(setting_val) : default_settings[setting];
    }
    SWO.getSetting = getSetting;

    function parseSettingValue(value) {
        try {
            var parsed_value = (typeof value == 'string' && value !== "") ? JSON.parse(value) : value;
            return parsed_value;
        }
        catch (e) {
            return value;
        }
    }

    function applySettings() {
        for (var i in default_settings) {
            var setting_val = localStorage.getItem(i);
            var value = (setting_val != 'null') ? parseSettingValue(setting_val) : default_settings[i];
            localStorage.setItem(i, value);
            switch ($('.settings[data-setting="' + i.toString() + '"]').attr('type')) {
                case 'checkbox':
                    $('.settings[data-setting="' + i.toString() + '"]').prop('checked', value);
                    break;
                case 'radio':
                    $('.settings[data-setting="' + i.toString() + '"]').filter('[value=' + value + ']').prop('checked', true);
                    break;
                default:
                    $('.settings[data-setting="' + i.toString() + '"]').val(value);
            }
        }
    }
    // apply and set settings on winCrontrol elements
    $(document).on("winControlLoaded", function (e) {
        for (var i in default_settings) {
            var setting_val = localStorage.getItem(i);
            var value = (setting_val != 'null') ? parseSettingValue(setting_val) : default_settings[i];
            localStorage.setItem(i, value);
            var UIControl = document.querySelector('.settings[data-setting="' + i.toString() + '"]');
            if (UIControl && UIControl.winControl) {
                //switch
                UIControl.winControl.checked = value;
                UIControl.winControl.addEventListener("change", setWinControlSetting);
            }
        }
    });

    $(document).on("settingsDataLoaded", function (e) {
        applyMonsterLocked();
        SWO.settings.firstLoaded = true;
    });

    function setWinControlSetting(e) {
        localStorage.setItem(e.target.dataset.setting, e.target.winControl.checked);
    };

    SWO.settings.save = function () {
        localStorage.setItem(SWO.settings.key, JSON.stringify(SWO.settings.data));
    }

    function readSettingsData() {
        var settings_raw = localStorage.getItem(SWO.settings.key);
        if (settings_raw != null && settings_raw !== '') {
            SWO.settings.data = JSON.parse(settings_raw);
        }
        $(document).trigger('settingsDataLoaded');
    }

    // Lock runes from monsters on import automatically
    function prepareMonsterLocked() {
        $('#tableMonstersLocked').bootstrapTable('destroy');
        if (SWO.allData && SWO.allData.mons[0] && SWO.allData.mons[0].unit_id) {
            $('#tableMonstersLocked').bootstrapTable({ data: SWO.allData.mons });
            applyMonsterLocked();
        } else {
            $('#tableMonstersLocked').bootstrapTable({
                formatNoMatches: function () {
                    return 'You need to update SWParser and import your data to use this setting.';
                }
            });
        }
        
    }

    function applyMonsterLocked() {
        // migrate
        if (!SWO.settings.data.monsterLocked.version || SWO.settings.data.monsterLocked.version < 2) {
            SWO.settings.data.monsterLocked = {};
            SWO.settings.data.monsterLocked.version = 2;
        }

        if (jQuery.isEmptyObject(SWO.settings.data.monsterLocked) || !SWO.allData || !SWO.settings.data.monsterLocked[SWO.allData.wizard_id]) {
            return;
        }
        noSave = !noSave;
        // uncheck all to make sure, that only monsters from the settings are getting marked (object references)
        $('#tableMonstersLocked').bootstrapTable('togglePagination').bootstrapTable('uncheckAll').bootstrapTable('togglePagination');
        $('#tableMonstersLocked').bootstrapTable('checkBy', { field: 'unit_id', values: SWO.settings.data.monsterLocked[SWO.allData.wizard_id] });
        noSave = !noSave;
    }

    function saveMonsterLocked() {
        var selection = $('#tableMonstersLocked').bootstrapTable('getSelections');
        // we only need the unique id
        var monsterLocked_arr = [];
        $.each(selection, function (index, value) {
            monsterLocked_arr.push(value.unit_id);
        });

        if (!SWO.settings.data.monsterLocked)
            SWO.settings.data.monsterLocked = {};

        SWO.settings.data.monsterLocked[SWO.allData.wizard_id] = JSON.parse(JSON.stringify((monsterLocked_arr)));
        SWO.settings.save();

        SWO.fireAlert("success", "Saved Locked Monsters");
    }

    function lockRunesOnImport() {
        // check for unit_id field
        if (!SWO.allData || !SWO.allData.mons[0] || !SWO.allData.mons[0].unit_id) {
            return;
        }
        $.each(SWO.allData.mons, function (index, value) {
            if (value.runesLocked) {
                var monsterid = value.id;

                if (monsterid != 0) {
                    $.each(SWO.allData.runes, function (index2, value2) {
                        if (value2.monster == monsterid) {
                            value2.locked = 1;
                        }
                    });
                }
            }
        });
    }

    function applyFocusWeights() {
        if (!SWO.settings.data.focusWeights)
            SWO.settings.data.focusWeights = SWO.vars.defaultFocusWeights;
    }

    function applyTeams() {
        if (!SWO.settings.data.teams)
            SWO.settings.data.teams = [];
    }

    function applyPrioritylist() {
        if (!SWO.settings.data.prioritylist)
            SWO.settings.data.prioritylist = {};
    }

    // wait for dom loaded
    $(function () {
        readSettingsData();
        applySettings();

        $('.settings:not(.settings-winControl)').on('click change input', function (e) {
            var setting_name = $(this).data('setting');
            var setting_type = $(this).attr('type');

            switch (setting_type) {
                case 'checkbox':
                    localStorage.setItem(setting_name, $(this).prop('checked'));
                    break;
                case 'radio':
                    localStorage.setItem(setting_name, $('input[data-setting=' + setting_name + ']:checked').val());
                    break;
                default:
                    localStorage.setItem(setting_name, $(this).val());
            }
        });

        $('#tableMonstersLocked').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e) {
            // wait for settings loaded
            if (!SWO.settings.firstLoaded || noSave) {
                return;
            }
            saveMonsterLocked();
        });

        $('#settingsFileUpload').on('change', function (e) {
            var input = e.target;
            var file = input.files[0];

            var reader = new FileReader();
            reader.onload = function () {
                var data = reader.result;
                SWO.func.restoreBackUp(data);
            };
            reader.readAsText(file);
        });

        $('#setting-theme').on('change', function (e) {
            SWO.func.setTheme($(this).val());
        });

        $('#general_showGrindvalues').on('change', function (e) {
            if (SWO.tables.gridRunes)
                SWO.tables.gridRunes.rows().invalidate();
        });

    });
})();