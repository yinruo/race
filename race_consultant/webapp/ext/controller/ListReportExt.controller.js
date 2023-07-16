sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/ComboBox",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/MessageBox",
    "sap/ui/layout/HorizontalLayout",
    "sap/ui/layout/VerticalLayout"
], function(MessageToast, Filter, SmartFilterBar, ComboBox, Dialog, Button, Text, MessageBox, HorizontalLayout, VerticalLayout) {
    'use strict';

    return {
        createSkill: function(oEvent) {
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_SS23_T2_SRV");
            var saveButton = new sap.m.Button({
                text: "Save",
                type: sap.m.ButtonType.Accept,
                press: function() {
                    var oNewTable = {
                        Name : sap.ui.getCore().byId("name").getValue(),
                        SkillLevel : sap.ui.getCore().byId("skilllevel").getValue(),
                        CertiName : sap.ui.getCore().byId("certification").getValue(),
                        CertiLink : sap.ui.getCore().byId("certification_link").getValue(),
                        ConId : "001"                                                                 
                    };
                    
                    oModel.create('/SkillSet', oNewTable, {
                        success: function(oData, oResponce) {
                            sap.m.MessageToast.show("Skill successfully created!");
                            oModel.refresh();
                            dialog.close();
                        },
                        error :function(oError){
                            sap.m.MessageToast.show("Error during skill creation.")
                        }
                    })
                }
            });
             var dialog = new Dialog("dialogCancellationReasons", {
                title: "Create Skill",
                modal : true,
                contentWidth : "1em",
                buttons: [ saveButton],
                content : [
                     new sap.m.Label({
                        text: "Skill Name"
                    }), new sap.m.Input({
                        maxLength:40,
                        id: "name",
                        placeholder : "e.g. CSS"
                    }), 
                    new sap.m.Label({
                        text: "Skill Level"
                    }), new sap.m.Input({
                        maxLength:40,
                        id: "skilllevel",
                        placeholder : "e.g. PROFESSIONAL"
                    }), 
                    new sap.m.Label({
                        text: "Certification Name"
                    }),  new sap.m.Input({
                        maxLength:100,
                        id: "certification",
                        placeholder : "Introduction to CSS"
                    }),new sap.m.Label({
                        text: "Certification Link"
                    }),  new sap.m.Input({
                        maxLength:100,
                        id: "certification_link"
                    })
                ]
            });
            
            dialog.open(); 
        },

        editSKill: function(oEvent) {
        MessageToast.show("Custom handler invoked.");
        }
    };
});