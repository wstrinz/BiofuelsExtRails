/*
 * File: BiofuelsGlobal/view/MainViewport.js
 */

Ext.onReady(function() {
	var createGame = Ext.create('BiofuelsGlobal.view.JoinGamePopup');
	createGame.show();
});

//------------------------------------------------------------------------------
Ext.define('BiofuelsGlobal.view.MainViewport', {
//------------------------------------------------------------------------------

	extend: 'Ext.container.Viewport',
    requires: [
        'BiofuelsGlobal.view.JoinGamePopup',
    	'BiofuelsGlobal.view.NetworkLayer'
    ],

    title: 'My Window',
    autoScroll: true,
    width: 800,
    height: 600,
//    layout: 'fit',

	//--------------------------------------------------------------------------
    initNetworkEvents: function() {
    	var app = BiofuelsGlobal;

        //app.network.registerListener('farmerList', this.updateFarmerList, this);
    },

	//--------------------------------------------------------------------------
    updateFarmerList: function(json) {

      this.farmerListStore.loadRawData(json, false);

    // FIXME: not the best place for this...needs to happen after login
      var roomName = this.getComponent('panel1').getComponent('roomName');
      var password = this.getComponent('panel1').getComponent('password');

      roomName.setValue(BiofuelsGlobal.roomInformation.roomName);
      password.setValue(BiofuelsGlobal.roomInformation.password);
    },

    updateRoomInfo: function(json) {

      Ext.Ajax.request({
        url: '/game_world/getupdate',
        method: 'GET',
        success: function(response, opts){
          //console.log(Ext.getCmp('cornlabel'));
          var obj = Ext.JSON.decode(response.responseText)
          Ext.getCmp('cornlabel').update("corn: " + obj.corn);
          Ext.getCmp('grasslabel').update("grass: " + obj.corn);
          // console.log("grass: " + Ext.JSON.decode(response.responseText).grass);
          // console.log("corn: " + Ext.JSON.decode(response.responseText).corn);
         /*var obj = Ext.JSON.decode(response.responseText);
         for(var index = 0; index < obj.length; index++){
          var fieldObj = obj[index].field;
          farmObj.createFields(1);
          var newField = farmObj.fields[farmObj.fields.length - 1].fieldVisuals;
          newField.onPlantingClickHandler(fieldObj.crop);

          //copypasta from togglesprite click handler; probably not the way to do things
          if(fieldObj.till){
            newField.till.stateValue++; if (newField.till.stateValue > 1) newField.till.stateValue = 0;
            newField.till.sprite.setAttributes({
              src: newField.till.stateImages[newField.till.stateValue]
            }, true);
          }
          if(fieldObj.fertilizer){
            newField.fertilizer.stateValue++; if (newField.fertilizer.stateValue > 1) newField.fertilizer.stateValue = 0;
            newField.fertilizer.sprite.setAttributes({
              src: newField.fertilizer.stateImages[newField.fertilizer.stateValue]
            }, true);
          }
          if(!fieldObj.pesticide){
            newField.pesticide.stateValue++; if (newField.pesticide.stateValue > 1) newField.pesticide.stateValue = 0;
            newField.pesticide.sprite.setAttributes({
              src: newField.pesticide.stateImages[newField.pesticide.stateValue]
            }, true);
          }*/
        },
        failure: function(response, opts){
          console.log("failed to get json response")
        }
      });
    },


    /*	this.farmerListStore.loadRawData(json, false);

		// FIXME: not the best place for this...needs to happen after login
    	var roomName = this.getComponent('panel1').getComponent('roomName');
    	var password = this.getComponent('panel1').getComponent('password');

    	roomName.setValue(BiofuelsGlobal.roomInformation.roomName);
    	password.setValue(BiofuelsGlobal.roomInformation.password);*/
    //},

	//--------------------------------------------------------------------------
    configFarmerStore: function() {

    	this.farmerListStore = Ext.create('Ext.data.Store', {
    		storeId:'farmerListStore',
			fields:['name','ready'],
			proxy: {
				type: 'memory',
				reader: {
					type: 'json',
					root: 'farmers'
				}
			}
		});
	},

	//--------------------------------------------------------------------------
    initComponent: function() {
        var me = this;

        //BiofuelsGlobal.network = Ext.create('BiofuelsGlobal.view.NetworkLayer');
		// 192.168.1.101
        //BiofuelsGlobal.network.openSocket('10.140.2.208', 9000, '/BiofuelsGame/serverConnect');

        this.initNetworkEvents();

        this.configFarmerStore();

        Ext.applyIf(me, {
            items: [{
				xtype: 'panel',
				itemId: 'panel1',
				width: 800,
				height: 600,
				layout: {
					type: 'absolute'
				},
        // title: 'BioFarmerVille', farmville... :'( :'(
				title: 'RoomTitle',
				titleAlign: 'center',
				items: [{
					xtype: 'gridpanel',
					itemId: 'farmerList',
					store:'farmerListStore',
					x: 10,
					y: 10,
					height: 550,
					width: 170,
					title: 'Farmers',
					titleAlign: 'center',
					columns: [{
						xtype: 'gridcolumn',
						width: 120,
						resizable: false,
						dataIndex: 'name',
						hideable: false,
						text: 'Name'
					},
					{
						xtype: 'booleancolumn',
						width: 48,
						resizable: false,
						dataIndex: 'ready',
						hideable: false,
						text: 'Ready',
						falseText: 'no',
						trueText: 'yes'
					}],
					viewConfig: {
					}
				},
				{
					xtype: 'panel',
					x: 190,
					y: 10,
					height: 200,
					width: 440,
					title: 'Round Progress',
					titleAlign: 'center',
          layout: {
          type: 'vbox',
          padding: 0,
          },
          items: [{
              xtype: 'label',
              id: 'cornlabel',
              text: 'corn: ',
            },
            {
              xtype: 'label',
              id: 'grasslabel',
              text: 'grass: ',
           }]
				},
        {
        xtype: 'button',
        x: 630,
        y: 10,
        width: 160,
        scale: 'medium',
        text: 'update',
        scope: this,
          handler: function() {
            this.updateRoomInfo();
          }
        },
				{
					xtype: 'textfield',
					itemId: 'roomName',
					x: 630,
					y: 50,
					width: 160,
					fieldLabel: 'Room',
					labelAlign: 'right',
					labelWidth: 80
				},
				{
					xtype: 'textfield',
					itemId: 'password',
					x: 630,
					y: 80,
					width: 160,
					fieldLabel: 'Password',
					labelAlign: 'right',
					labelWidth: 80
				}]
			}]
        });

        me.callParent(arguments);
    }

});
