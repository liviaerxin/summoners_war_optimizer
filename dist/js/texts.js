(function () {
    "use strict";

    SWO.texts = {
        tooltips: {
            sets: {
                text: '<ol>\
                <li>Pick the sets you want to have on you chosen monster. You can pick 1, 2, 3 sets - or even no set at all to make the optimization fully free. Keep in mind: choosing less (or no) sets will need more time to run the optimization.</li>\
                <li>Slot 2/4/6: decide which stats you monster needs in these important slots. You can pick up to 3 stats for each slot.</li>\
                <li>Presets: Tired of selecting all the necessary input for each monster again and again? The preset area allows you to set every optimization value for each monster individually. These values will be remembered for all upcoming optimizations. General presets (e.g. for attack type monster) can also be created.</li>\
                <li>SPD Tune: includes Speed Lead and Totems for easier speed tuning.</li>\
                <li>Grindstones: Uses stored grindstones for the optimization. Min = minimum roll, max = maximum roll of each grindstone. Affected stats are shown in the detailed build overview. Ungrinded stats will be prioritized.</li>\
                <li>Ally sets: add ally sets that are equipped on OTHER monsters of your team. Left click to add sets, right click to reduce the number.</li>\
                </ol>'
            },
            focus: {
                text: '<ol>\
                <li>Define which stats are the most important for your chosen monster. This directly influences how precise the optimization results are.</li>\
                <li>Search depth: affects the number of results. The standard value is 8. A higher number will deliver more results, but the optimization process will take way more time.</li>\
                </ol>'
            },
            focusWeights: {
                text: 'Focus Stats Weights: do you want to give a certain stat more importance for the optimization process? Do it with our Focus Stat Weights! A higher number means a bigger impact. Use with caution!'
            },
            filters: {
                text: '<ol>\
                <li>Allows you define certain stat thresholds. These filters can as well be used after the optimization process. Use the ‘Apply’ button to adapt your thresholds on the fly.</li>\
                <li>The ‘Adapt’ button inserts the monster’s actual stats in each filter column</li>\
                <li>E.HP = Effective HP. To make it short: that’s a combination of HP and DEF.</li>\
                <li>E.HP D = Effective HP while under the effect of Def Break (DEF stat loses value).</li>\
                </ol>'
            },
            optimizer_options: {
                text: '<ol>\
                <li>Max. +12 for slots 1,3,5’: will keep these runes at +12, even if you choose a +15 optimization</li>\
                <li>‘New session’: starts a new session for the compare feature that helps with rerunning a larger number of monsters</li>\
                </ol>'
            },
            optimizer_threads: {
                text: 'Number of used CPU threads. Max number depends on your CPU. Default: 4',
                placement: 'left'
            },
            optimizer_max_permutation: {
                text: 'Prevents optimizations above this limit. Helps with crashing browsers.',
                placement: 'left'
            },
            optimizer_autofillParams: {
                text: 'If enabled the current sets and main stats will be auto filled on monster selection, unless a preset is available for the monster. The preset will be loaded instead.'
            },
            import_refreshData: {
                text: 'This option allows you to refresh all your data without losing your builds.\
                    <ul>\
                    <li>New runes, monsters and crafts will be added.</li>\
                    <li>Existing runes, monsters and crafts will be updated.</li>\
                    <li>Deleted runes, monsters and crafts and self made ones (via SWOP) will be removed to avoid confusion.</li>\
                    <li>Lock state of runes remain identical.</li></ul>'
            },
            import_refreshData_overrideLocation: {
                text: 'Activate this option if you want to override the origin locations of your runes during the data refresh. That would make sense if you plan to redo all builds. As an alternative you could just do a normal import without the Keep builds option enabled.'
            }
        },
        help: {
            estimated: 'Maximum number of builds for your current setup.',
            estimatedFocus: 'Please consider to use Focus Stats or a lower Search Depth.'
        }
    };

})();
