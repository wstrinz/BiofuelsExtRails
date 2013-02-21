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

    loadFarmers: function() {
      paren = this;
      Ext.Ajax.request({
        url: '/game_world/reloadfarmers',
        method: 'GET',
        success: function(response, opts){
          //console.log(Ext.getCmp('cornlabel'));
          console.log(Ext.JSON.decode(response.responseText));

          paren.updateRoomInfo;
          // var obj = Ext.JSON.decode(response.responseText)

          // paren.updateFarmerList(obj[0])

          // Ext.getCmp('cornlabel').update("corn: " + obj[1].corn);
          // Ext.getCmp('grasslabel').update("grass: " + obj[1].grass);

        },
        failure: function(response, opts){
          console.log("failed to get json response")
        }
      });
    },

    updateRoomInfo: function(json) {

      var paren = this;

      Ext.Ajax.request({
        url: '/game_world/getupdate',
        method: 'GET',
        success: function(response, opts){
          //console.log(Ext.getCmp('cornlabel'));
          var obj = Ext.JSON.decode(response.responseText)

          paren.updateFarmerList(obj[0])

          Ext.getCmp('cornlabel').update("corn: " + obj[1].corn);
          Ext.getCmp('grasslabel').update("grass: " + obj[1].grass);

          console.log(Ext.JSON.decode(response.responseText));
        },
        failure: function(response, opts){
          console.log("failed to get json response")
        }
      });
    },

	//--------------------------------------------------------------------------
    updateFarmerList: function(json) {
    var newData = new Array();
    for(var i=0; i< json.length; i++){
      newData.push(new Array(json[i][0],json[i][1]))
    }

     this.farmerListStore.loadData(newData);

    //   this.farmerListStore.loadRawData(json, false);

    // // FIXME: not the best place for this...needs to happen after login
    //   var roomName = this.getComponent('panel1').getComponent('roomName');
    //   var password = this.getComponent('panel1').getComponent('password');

    //   roomName.setValue(BiofuelsGlobal.roomInformation.roomName);
    //   password.setValue(BiofuelsGlobal.roomInformation.password);
  },

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
        xtype: 'button',
        x: 630,
        y: 40,
        width: 160,
        scale: 'medium',
        text: 'Load Farmers',
        scope: this,
          handler: function() {
            this.loadFarmers();
          }
        },
				{
					xtype: 'textfield',
					itemId: 'roomName',
					x: 630,
					y: 80,
					width: 160,
					fieldLabel: 'Room',
					labelAlign: 'right',
					labelWidth: 80
				},
				{
					xtype: 'textfield',
					itemId: 'password',
					x: 630,
					y: 110,
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
