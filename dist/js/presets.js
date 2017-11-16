(function () {
    "use strict";

    var presetFields = {
        opt_set1: null, opt_set2: null, opt_set3: null, opt_no_broken: null,
        opt_slot2: null, opt_slot4: null, opt_slot6: null,
        opt_focus: null,
        filter_min_hp: null, filter_min_atk: null, filter_min_def: null, filter_min_spd: null, filter_min_crate: null, filter_min_cdmg: null, filter_min_res: null, filter_min_acc: null, filter_min_effhp: null, filter_min_effhp_d: null, filter_min_dps: null, filter_min_rune_avg: null,
        filter_max_hp: null, filter_max_atk: null, filter_max_def: null, filter_max_spd: null, filter_max_crate: null, filter_max_cdmg: null, filter_max_res: null, filter_max_acc: null, filter_max_effhp: null, filter_max_effhp_d: null, filter_max_dps: null, filter_max_rune_avg: null
    };

    var presetVersion = 2;

    $(document).on("localDataLoaded", function (e) {
        presetInit();
    });

    function presetInit() {
        $("#presetDialogSelect").select2({ dropdownParent: "#presetDialog", templateResult: presetTemplate });
        presetInitObject();

        presetMigrate();

        SWO.presets.refreshSelect();
        SWO.presets.refreshSelectDialog();
    }

    function presetInitObject() {
        if (!SWO.settings.data.presets)
            SWO.settings.data.presets = { general: [], monster: {}, version: presetVersion };
    }

    function presetMigrate() {
        if (!SWO.settings.data.presets.version || SWO.settings.data.presets.version < 2) {
            SWO.settings.data.presets.general.forEach((presetGeneral) => {
                var focusStats = [];
                for (var i = 1; i < 5; i++) {
                    if (presetGeneral['opt_focus' + i]) {
                        focusStats.push(presetGeneral['opt_focus' + i]);
                        delete presetGeneral['opt_focus' + i];
                    } else if (presetGeneral['opt_focus' + i] === '') {
                        delete presetGeneral['opt_focus' + i];
                    }
                }
                presetGeneral['opt_focus'] = focusStats;
            });

            if (!SWO.func.objectIsEmpty(SWO.settings.data.presets.monster)) {
                var monster_ids = Object.keys(SWO.settings.data.presets.monster);
                monster_ids.forEach((key) => {
                    var focusStats = [];
                    for (var i = 1; i < 5; i++) {
                        if (SWO.settings.data.presets.monster[key]['opt_focus' + i]) {
                            focusStats.push(SWO.settings.data.presets.monster[key]['opt_focus' + i]);
                            delete SWO.settings.data.presets.monster[key]['opt_focus' + i];
                        } else if (SWO.settings.data.presets.monster[key]['opt_focus' + i] === '') {
                            delete SWO.settings.data.presets.monster[key]['opt_focus' + i];
                        }
                    }
                    SWO.settings.data.presets.monster[key]['opt_focus'] = focusStats;
                });
            }
            SWO.settings.data.presets.version = 2;
            SWO.settings.save();
        }
    }

    function presetTemplate(state) {
        if (!state.id || state.id < 10000) { return state.text; }
        if (SWO.settings.data.presets.monster[state.id]) {
            var $state = $(
                '<span>' + state.text + '<span class="preset-available"></span> </span>'
            );
            return $state;
        } else {
            return state.text;
        }
    }

    function presetSelectionTemplate(state) {
        if (!state.id || state.id < 10000) { return state.text; }
        if (SWO.settings.data.presets.monster[state.id]) {
            var $state = $(
                '<span>' + state.text + '<span class="preset-selection-available" /></span> </span>'
            );
            return $state;
        } else {
            return state.text;
        }
    }

    function presetAdd(mode, id) {
        switch (mode) {
            case 'new':
                var preset = JSON.parse(JSON.stringify(presetFields));
                var nextID = presetGetNextID();
                preset.id = nextID;
                preset.name = 'Preset ' + nextID;
                break;
            case 'saveas':
                var preset = presetGet(id);
                var nextID = presetGetNextID();
                preset.id = nextID;
                preset.name = 'Preset ' + nextID;
                break;
            case 'newfromopt':
                var preset = {};
                for (var i in presetFields) {
                    preset[i] = $('#' + i).val();
                }
                if (!SWO.func.isUniqueID(id)) {
                    var nextID = presetGetNextID();
                    preset.id = nextID;
                    preset.name = 'Preset ' + nextID;
                } else {
                    if (!SWO.settings.data.presets.monster[id])
                        SWO.settings.data.presets.monster[id] = {};
                    SWO.settings.data.presets.monster[id] = preset;
                    SWO.presets.refreshSelectDialog(id);
                    SWO.settings.save();
                    return;
                }
                break;
        }
        
        presetSaveToArray(preset, 'general', nextID);
    }

    function presetEdit(id) {
        if (!SWO.func.isUniqueID(id)) {
            $.each(SWO.settings.data.presets.general, function (key, value) {
                if (value.id == id) {
                    for (var i in presetFields) {
                        var preset_type = $('#' + i + '_dialog').attr('type');
                        switch (preset_type) {
                            case 'checkbox':
                                value[i] = $('#' + i + '_dialog').prop('checked');
                                break;
                            default:
                                value[i] = $('#' + i + '_dialog').val();
                        }
                    }
                    return false;
                }
            });
            $("#select_preset").change();
        } else {
            var preset = {};
            for (var i in presetFields) {
                var preset_type = $('#' + i + '_dialog').attr('type');
                switch (preset_type) {
                    case 'checkbox':
                        preset[i] = $('#' + i + '_dialog').prop('checked');
                        break;
                    default:
                        preset[i] = $('#' + i + '_dialog').val();
                }
            }
            preset.name = $('#presetDialogSelect option:selected').text();
            if (!SWO.settings.data.presets.monster[id])
                SWO.settings.data.presets.monster[id] = {};
            SWO.settings.data.presets.monster[id] = preset;
            SWO.presets.refreshSelectDialog(id);
        }
        
        SWO.settings.save();
    }

    function presetDelete(id) {
        if (!SWO.func.isUniqueID(id)) {
            $.each(SWO.settings.data.presets.general, function (key, value) {
                if (value.id == id) {
                    SWO.settings.data.presets.general.splice(key, 1);
                    return false;
                }
            });
        } else {
            delete SWO.settings.data.presets.monster[id];
        }
        
        SWO.presets.refreshSelect();
        if (!SWO.func.isUniqueID(id)) {
            SWO.presets.refreshSelectDialog();
        } else {
            SWO.presets.refreshSelectDialog(id);
        }
        
        SWO.settings.save();
    }

    function presetGet(id) {
        var preset = {};
        if (!SWO.func.isUniqueID(id)) {
            $.each(SWO.settings.data.presets.general, function (key, value) {
                if (value.id == id) {
                    preset = JSON.parse(JSON.stringify((value)));
                    return false;
                }
            });
        } else {
            if (SWO.settings.data.presets.monster[id])
                preset = JSON.parse(JSON.stringify(SWO.settings.data.presets.monster[id]));
        }
        
        return preset;
    }

    function presetSet(id, isDialog) {
        var preset = presetGet(id);

        var dialogString = '';
        if (isDialog) {
            dialogString = '_dialog';
            $('#presetDialog-tHolderInput').val(preset.name);
        }
            

        for (var i in presetFields) {
            var preset_type = $('#' + i + dialogString).attr('type');
            switch (preset_type) {
                case 'checkbox':
                    $('#' + i + dialogString).prop('checked', preset[i]).change();
                    break;
                default:
                    $('#' + i + dialogString).val(preset[i]).change();
            }
        }
    }

    SWO.presets.set = presetSet;

    function presetSaveToArray(preset, type, selectValue) {
        if (!SWO.settings.data.presets)
            SWO.settings.data.presets = [];

        SWO.settings.data.presets[type].push(preset);
        SWO.presets.refreshSelect();
        SWO.presets.refreshSelectDialog(selectValue);
        SWO.settings.save();
    }

    function presetGetNextID() {
        if (!SWO.settings.data.presets) {
            return 0;
        }

        var maxid = 0;
        SWO.settings.data.presets.general.map(function (obj) {
            if (obj.id > maxid) maxid = obj.id;
        });
        return (maxid + 1);
    }

    SWO.presets.refreshSelect = function () {
        var oldVal = $('#select_preset').val()
        var fill = false;
        var options = '<option value="">Select presets</option>';
        $.each(SWO.settings.data.presets.general, function (key, value) {
            if (value.id == oldVal)
                fill = true;

            options += '<option value="' + value.id +'">' + value.name + '</option>';
        });
        $('#select_preset').html(options);

        if (fill)
            $('#select_preset').val(oldVal);
    }

    SWO.presets.refreshSelectDialog = function (selectValue) {
        var sDataRaw = { general: [], monster: [] };

        sDataRaw.general.push({ id: '', text: 'Select preset or monster' })
        //all general presets
        if (SWO.settings.data.presets) {
            $.each(SWO.settings.data.presets.general, function (key, value) {
                sDataRaw.general.push({ id: value.id, text: value.name });
            });
        }

        //all monsters
        if (SWO.allData && SWO.allData.mons) {
            $.each(SWO.allData.mons, function (key, value) {
                //only monsters with unique_id
                if (!value.unit_id)
                    return true;

                sDataRaw.monster.push({ id: value.unit_id, text: value.name });
            });
        }
        
        var sData = [{
            text: 'General',
            children: sDataRaw.general
        }, {
            text: 'Monsters',
            children: sDataRaw.monster
        }
        ];

        $('#presetDialogSelect').select2('destroy').html('').select2({
            data: sData, templateResult: presetTemplate, templateSelection: presetSelectionTemplate
        });

        if (selectValue)
            $('#presetDialogSelect').val(selectValue).change();
        $('#presetDialogSelect').change();
    }

    function presetAlert(style, message) {
        var delay = 6000;
        $("#presetDialog-alerts").append('<div class="myAlert alert alert-' + style + '"><a href="#" class="close">&times;</a>' + message + '</div>');
        $("#presetDialog-alerts .alert:not(.alert-static)").last().delay(delay).fadeOut(1200, function () { $(this).remove(); });
    }

    // wait for dom loaded
    $(function () {

        $.fn.modal.Constructor.prototype.enforceFocus = $.noop;

        $('#presetDialog-action-save').on('click', function (e) {
            presetEdit(Number($('#presetDialogSelect').val()));
            presetAlert('success', 'Preset edited.');
        });

        $('#presetDialog-action-new').on('click', function (e) {
            presetAdd('new');
            presetAlert('success', 'New preset added.');
        });

        $('#presetDialog-action-newopt').on('click', function (e) {
            presetAdd('newfromopt', Number($('#presetDialogSelect').val()));
            presetAlert("success", 'Preset added from Optimizer settings.');
        });

        $('#presetDialog-action-savenew').on('click', function (e) {
            presetAdd('saveas', Number($('#presetDialogSelect').val()));
            presetAlert('success', 'New preset added.');
        });

        $('#presetDialog-action-delete').on('click', function (e) {
            presetDelete(Number($('#presetDialogSelect').val()));
            presetAlert('success', 'Preset deleted.');
        });

        $('#presetDialog-edittitle').on('click', function (e) {
            if ($('#presetDialog-tHolderInput').val() == '')
                return;

            var id = Number($('#presetDialogSelect').val());
            $.each(SWO.settings.data.presets.general, function (key, value) {
                if (value.id == id) {
                    value.name = $('#presetDialog-tHolderInput').val();
                    return false;
                }
            });

            SWO.presets.refreshSelect();
            SWO.presets.refreshSelectDialog(id);
            SWO.settings.save();
            presetAlert('success', 'Preset title edited.');
        });

        $('#preset-manage').on('click', function (e) {
            $('#presetDialog').modal('show');
        });

        $("#select_preset").change(function () {
            if ($(this).val() == "")
                return;

            presetSet($(this).val());
        });

        $('#presetDialogSelect').change(function () {
            var id = Number($(this).val())
            if (!id) {
                $('.presetDialog-action').show();
                $('#presetDialog-action-save, #presetDialog-action-savenew, #presetDialog-action-delete').hide();
                return
            } else {
                $('.presetDialog-action').show();
            }
                

            if (SWO.func.isUniqueID(id)) {
                $('#presetDialog-edittitle').hide();
                $('#presetDialog-tHolderInput').attr('disabled', 'disabled');
                $('.presetDialog-action').show();
                $('#presetDialog-action-new, #presetDialog-action-savenew').hide();
            } else {
                $('#presetDialog-edittitle').show();
                $('#presetDialog-tHolderInput').removeAttr('disabled');
                $('.presetDialog-action').show();
            }
            
            presetSet($(this).val(), true);
        });
    });

})();
