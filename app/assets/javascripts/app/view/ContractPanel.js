/*
 * File: app/view/ContractPanel.js
 */
	
//------------------------------------------------------------------------------
Ext.define('Biofuels.view.ContractPanel', {
//------------------------------------------------------------------------------

	extend: 'Ext.panel.Panel',
    alias: 'widget.contractPanel',

    //--------------------------------------------------------------------------
    height: 255,
    minimumHeight: 255,
    titleAlign: 'center',
    title: 'Contracts',
    bodyStyle: 'background-color: #89a;',
    autoscroll: true,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    collapsed: false,
    manageHeight: false,

    tools:[{
		type:'help',
		qtip: 'Contract Help',
		handler: function(event, target, owner, tool) {
			
			var help = Ext.create('Biofuels.view.ContractHelpWindow').show();
		}
    }],
    
    //--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;

        var clr = "<font color='#ff8'><b>";
        var cornamt = 150
        var cornContractText ="Must provide " + clr + " " + cornamt + "</b></font> " +
        						"metric tons of " + clr + "corn</b></font> at " +
        						clr + "$300</b></font> a metric ton."; 
        var grassContractText ="Must provide " + clr + "200</b></font> " +
        						"metric tons of " + clr + "perennial grass</b></font> at " +
        						clr + "$200</b></font> a metric ton."; 
        Ext.applyIf(me, {
            items: [{
				xtype: 'contractoffering',
				title: 'Corn Contract',
				imageSource: 'resources/simple_corn_icon.png',
				contractText: cornContractText
			},
			{
				xtype: 'contractoffering',
				title: 'Perennial Grass Contract',
				imageSource: 'resources/simple_grass_icon.png',
				contractText: grassContractText
			},
			{
				xtype: 'button',
				margins: '5 5 5 5',
				padding: '',
				scale: 'large',
				text: 'Finish Contract Acceptance Phase'
			}]
        });

        me.callParent(arguments);
    }

});
