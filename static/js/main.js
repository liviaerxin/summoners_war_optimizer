(function () {
	"use strict";


	var server_url = 'http://swop.one/';
	
	// wait for dom loaded
    $(function () {
        WinJS.UI.processAll().done(function () {
            initAllUI();
            $(document).trigger('winControlLoaded');
		});

    });

	var mySplitView = window.mainSplitView = {
	    splitView: null,
	    trailClicked: WinJS.UI.eventHandler(function (ev) {
	        var element = $(ev.currentTarget);
	        if (element.hasClass('active'))
	            return;

	        $('.win-splitviewcommand').removeClass('active');
	        element.addClass('active');
	        //Display the right section
	        var target = $(this).data('target');
	        $('.tab-pane, .nav-pills li').removeClass('active');
	        $('#' + target).addClass('active');

	        //one time actions
	        if (element.data('target') === 'compare' && SWO.compare.firstLoaded === false) {
	            SWO.compare.initWorker();
	            SWO.compare.firstLoaded = true;
	        }

	        if (element.data('target') === 'runes') {
	            $('.runes-filter-slider').slider('relayout');
	        }

	        if (element.data('target') === 'prioritylist') {
	            SWO.prioritylist.updateRanking();
	        }

	        $('#speedtune-teams').popover('hide');

	    }),
	};

	function initAllUI() {
	    mainSplitView.splitView = document.querySelector(".splitView").winControl;
	    new WinJS.UI._WinKeyboard(mainSplitView.splitView.paneElement); // Temporary workaround: Draw keyboard focus visuals on NavBarCommands
	    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	        $('.win-splitviewcommand').removeClass('active');
	    });

	    SWO.dialogs.aiDialog = document.querySelector("#aiDialog").winControl;
	    SWO.dialogs.coDialog = document.querySelector("#coDialog").winControl;
	    SWO.dialogs.dmgcustomDialog = document.querySelector("#dmgcustomDialog").winControl;
	    SWO.dialogs.swfDialog = document.querySelector("#swfDialog").winControl;
	    SWO.dialogs.presetDialog = document.querySelector("#presetDialog").winControl;
	    SWO.dialogs.createmonsterDialog = document.querySelector("#createmonsterDialog").winControl;
	    SWO.dialogs.runeEnchantDialog = document.querySelector("#runeEnchantDialog").winControl;
	    SWO.dialogs.renamemonsterDialog = document.querySelector("#renamemonsterDialog").winControl;

	    $(document).trigger('dialogsLoaded');

	    var shareDialog = document.querySelector("#shareDialog").winControl;
	    shareDialog.onbeforehide = function (args) {
            // cancel closing on primary button, cause we need to do ajax first
	        if (args.detail.result === 'primary') {
	            args.preventDefault();
	        } else if (args.detail.result === 'secondary') {
	            $('#shareDialogNote').val('').show();
	            $('#shareDialogLink-wrapper').hide();
	            $('#shareDialogLink').val('');

	            var gridMons = $('#grid_monsters').DataTable();
	            gridMons.rows('.shareable').nodes().to$().removeClass('shareable');

	            $('#shareCountActual').html(0);
	            shareDialog.primaryCommandDisabled = false;
	            shareDialog.secondaryCommandText = 'Cancel';
	        }
	    }

	    document.querySelector("#showShareDialog").addEventListener("click", function () {
	        if ($('#shareCountActual').html() <= 0) {
	            SWO.func.showAlertBox('Choose at least 1 monster to share from the table. (CTRL + LClick)');
	            return;
	        } else if ($('#shareCountActual').html() > shareLimit) {
	            SWO.func.showAlertBox('You can only select up to ' + shareLimit + ' monster to share');
	            return;
	        }
	        shareDialog.show().then(function (args) {
	            
	        });
	    });
	    document.querySelector("#shareDialog .win-contentdialog-primarycommand").addEventListener("click", function (e) {
	        $("#shareDialogNote").fadeOut();
	        var mons_data = getShareData();
	        var note = $('#shareDialogNote').val();

	        $.ajax({
	            type: 'POST',
	            url: 'http://swop.one/main.php',
                dataType: 'text',
	            data: {action : 'create', note : note, data : JSON.stringify(mons_data)}
	        }).done(function (data) {
	            var data = JSON.parse(data);
	            shareDialog.primaryCommandDisabled = true;
	            shareDialog.secondaryCommandText = 'Close';
	            $('#grid_monsters tr.selected').removeClass('selected');
	            var link_string = server_url + '' + data.slug;
	            $('#shareDialogLink').val(link_string);
                $('#shareDialogLink-wrapper').fadeIn();
	        });
	    });
	}

	function getShareData() {
	    var gridMons = $('#grid_monsters').DataTable();
	    var gridRunes = $('#grid_runes').DataTable();

	    var share_mons = [];
	    
	    var shareable = gridMons.rows('.shareable').data();

	    $.each(shareable, function (key, monster) {
	        var monster_x = extendMonster(monster, getRunesWithMons(gridRunes, monster.id), { clearExtraFields: true });
	        var runeIds = monster_x.rune_ids.split(",");
	        var runes = [];
	        for (var i = 1; i <= 6; i++) {
	            var slotRune = null;
	            for (var j = 0; j < runeIds.length; j++) {
	                slotRune = SWO.func.getRowData('gridRunes', Number(runeIds[j]));

	                if (slotRune != null && slotRune.slot == i)
	                    break;
	                else
	                    slotRune = null;
	            }
	            runes.push(slotRune);
	        }
	        JSON.parse(JSON.stringify(monster_x));
	        monster_x['runes'] = runes;

	        share_mons.push(monster_x);
	    });
	    return share_mons;
    }

    //Global Functions


	SWO.fireAlert = function(style, message) {
	    var max_alerts = 3;
	    var delay = 6000;
	    $("#main-header").append('<div class="myAlert alert alert-' + style + '"><a href="#" class="close">&times;</a>' + message + '</div>');
	    $(".alert:not(.alert-static)").last().delay(delay).fadeOut(1200, function () { $(this).remove(); });
	    if ($(".alert:not(.alert-static)").length > max_alerts) {
	        $(".alert:not(.alert-static)").slice(max_alerts).remove();
	    }
	}

})();
