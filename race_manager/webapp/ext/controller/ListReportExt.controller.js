sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog"
], function(MessageToast, Dialog) {
    'use strict';

    return {
        createSkill: function(oEvent) {
            //MessageToast.show("Custom handler invoked.");
            var that = this;
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_SS23_T2_SRV");
            var cancelButton = new sap.m.Button({
                text: "Cancel",
                type: sap.m.ButtonType.Reject,
                press: function() {
                    dialog.close();
                    dialog.destroy();
                }
            });
            
        
            var saveButton = new sap.m.Button({
                text: "Save",
                type: sap.m.ButtonType.Accept,
                press: function() {
                    var oNewTable = {
                        Name: sap.ui.getCore().byId("name").getValue(),
                    };
        
                    oModel.create('/SNameSet', oNewTable, {
                        success: function(oData, oResponce) {
                            sap.m.MessageToast.show("Skill successfully created!");
                            dialog.close();
                            that.getView().getModel().refresh();
                        },
                        error: function(oError) {
                            sap.m.MessageToast.show("Error during skill creation.");
                        }
                    });
                }
            });
        
            var dialog = new Dialog("dialogCancellationReasons", {
                title: "Create Table",
                modal: true,
                contentWidth: "1em",
                buttons: [saveButton, cancelButton],
                content: [
                    new sap.m.Label({
                        text: "Skill name"
                    }),
                    new sap.m.Input({
                        maxLength: 100,
                        id: "name",
                    })
                    
                ],
                afterClose: function() {
                    dialog.destroy(); 
                }
            });
            dialog.open();

        },
        editSkill: function(oEvent) {
        MessageToast.show("Custom handler invoked.");
        }
    };
});