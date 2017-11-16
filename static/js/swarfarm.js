(function () {
    "use strict";

    SWO.api.swarfarm.fieldMap = {
        b_hp: 'base_hp',
        b_def: 'base_defense',
        b_atk: 'base_attack',
        b_spd: 'speed',
        b_crate: 'crit_rate',
        b_cdmg: 'crit_damage',
        b_res: 'resistance',
        b_acc: 'accuracy'
    }

    var monsterIcon_base = 'https://swarfarm.com/static/herders/images/monsters/';    

    SWO.api.swarfarm.getMonsterData = function (args, callback) {
        $.ajax({
            type : 'GET',
            url: 'https://swarfarm.com/api/bestiary.json',
        }).done(function (data) {
            $.each(data, function (key, value) {
                SWO.api.swarfarm.monsterDataSelect += '<option value="' + value.com2us_id + '">' + value.name + ' (' + value.element + ')</option>';
            });
            
            if (callback)
                SWO.api.swarfarm[callback](args);
        });
    }

    SWO.api.swarfarm.prepareData = function () {
        //note 
        $.getJSON('https://swarfarm.com/api/bestiary.json', function (monster) {
            $.each(monster, function (index, value) {
                SWO.api.swarfarm.monsterDataSelect += '<option value="' + value.com2us_id + '">' + value.name + ' (' + value.element + ')</option>';
                SWO.api.swarfarm.bestiary[value.com2us_id] = value;
            });
            SWO.api.swarfarm.firstLoaded = true;
            $(document).trigger('swarfarmDataLoaded');
        });
    }

    SWO.api.swarfarm.getMonsterByID = function (args, callback) {
        if (SWO.api.swarfarm.monsterData[args.id]) {
            SWO.func.handleAjaxResponse(SWO.api.swarfarm.monsterData[args.id], args);
        } else {
            if (!args.id) {
                if (args.action)
                    SWO.func.handleAjaxResponse(null, args);
                return;
            }

            $.ajax({
                type: 'GET',
                data: { com2us_id: args.id },
                url: 'https://swarfarm.com/api/bestiary.json',
            }).done(function (data) {
                var monster = data[0];
                if (monster) {
                    SWO.api.swarfarm.monsterData[monster.com2us_id] = monster;
                    SWO.func.handleAjaxResponse(monster, args);

                    if (callback)
                        SWO.api.swarfarm[callback](args);

                } else {
                    SWO.func.handleAjaxResponse(null, args);
                }
                
            });
        }
    }

    SWO.api.swarfarm.getMonsterIcon = function (args) {
        SWO.func.setMonsterIcon(args);
    }

    SWO.api.swarfarm.requestMonsterIcon = function (args) {
        if (!SWO.api.swarfarm.bestiary[args.id])
            return;
        var file_name = 'mons_' + args.id + '.png';
        var icon_string = monsterIcon_base + SWO.api.swarfarm.bestiary[args.id].image_filename;
        WinJS.xhr({ url: icon_string, responseType: 'blob' })
        .done(
            function (request) {
                SWO.func.writeBlobToFile(request.response, SWO.api.swarfarm.folders.icons, file_name, args, 'setMonsterIcon');
            },
            function error(request) {
                //console.log(request);
            });
    }

    SWO.api.swarfarm.fillSelect = function (args) {
        if (SWO.api.swarfarm.monsterDataSelect === '') {
            $(args.element).addClass('loading');
            //SWO.api.swarfarm.getMonsterData(args, 'fillSelect');
        } else {
            if (!$(args.element).attr('data-loaded')) {
                var firstBlank = (args.firstBlank) ? '<option value="0">-</option>' : '';

                $(args.element).html(firstBlank + SWO.api.swarfarm.monsterDataSelect).attr('data-loaded', 'true').change();
            }

            if (args.value)
                $(args.element).val(args.value).change();

            $(args.element).removeClass('loading');
        }
    }

    SWO.api.swarfarm.openSelectDialog = function (args) {
        if (args.element)
            SWO.api.swarfarm.fillSelect(args);

        SWO.dialogs.swfDialog.title = args.title;
        $('#swfDialog .desc').text(args.desc);
        SWO.dialogs.swfDialog.args = args;

        SWO.dialogs.swfDialog.show();
    }

    SWO.api.swarfarm.prepareData();

})();
