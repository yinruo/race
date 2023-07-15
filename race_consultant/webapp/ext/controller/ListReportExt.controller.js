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
            var that = this;
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_SS23_T2_SRV");

            var skillNames = [];
            var skillNamesEndpoint = "/SkNameSet";
            var onSuccessName = function(oData) {
                var results = oData.results;
            
                for (var i = 0; i < results.length; i++) {
                    var skillName = results[i].Name;
                    skillNames.push({ name: skillName });
                }
            
                // Populate the select options with the fetched skill names
                for (var i = 0; i < skillNames.length; i++) {
                    selectSkill.addItem(new sap.ui.core.Item({
                        text: skillNames[i].name
                    }));
                }
            };
            
            var onErrorName = function(oError) {
                sap.m.MessageToast.show("Error retrieving skill names from the backend.");
            };      
            var selectSkill = new sap.m.Select({
                id: "name"
            });      
            var skillLevelNames = [];
            var skillLevelNamesEndpoint = "/SkLevelSet";
            var onSuccessLevel = function(oData) {
                var results = oData.results;
                for (var i = 0; i < results.length; i++) {
                    var skillLevelName = results[i].SkillLevel;
                    skillLevelNames.push({ name: skillLevelName  });
                }
                for (var i = 0; i < skillLevelNames.length; i++) {
                    selectSkillLevel.addItem(new sap.ui.core.Item({
                        text: skillLevelNames[i].name
                    }));
                }
            };
            var onErrorLevel = function(oError) {
                sap.m.MessageToast.show("Error retrieving skill names from the backend.");
            };

            var selectSkillLevel = new sap.m.Select({
                id: "skilllevel"
            });
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
                        Name : sap.ui.getCore().byId("name").getSelectedItem().getText(),
                        SkillLevel : sap.ui.getCore().byId("skilllevel").getSelectedItem().getText(),
                        CertiName : sap.ui.getCore().byId("certiname").getValue(),
                        CertiLink : sap.ui.getCore().byId("certilink").getValue(),
                        ConId : '001',                                                                    
                    };
                    
                    oModel.create('/SkillSet', oNewTable, {
                        success: function(oData, oResponce) {
                            sap.m.MessageToast.show("Skill successfully created!");
                            dialog.close();
                            that.getView().getModel().refresh();
                        },
                        error :function(oError){
                            sap.m.MessageToast.show("Error during skill creation.")
                        }
                    })
                }
            });
             var dialog = new Dialog("dialogCancellationReasons", {
                title: "Create Table",
                modal : true,
                contentWidth : "1em",
                buttons: [ saveButton,cancelButton],
                content : [
                    new sap.m.VBox({
                        items: [
                            new sap.m.Label({
                                text: "Name"
                            }),
                            new sap.ui.layout.HorizontalLayout({
                                content: [selectSkill]
                            })
                        ]
                    }),
                    new sap.m.VBox({
                        items: [
                            new sap.m.Label({
                                text: "Skill level"
                            }),
                            new sap.ui.layout.HorizontalLayout({
                                content: [selectSkillLevel]
                            })
                        ]
                    }),
                    new sap.m.Label({
                        text: "Certification name"
                    }),  new sap.m.Input({
                        maxLength:100,
                        id: "certiname",
                    }),
                    new sap.m.Label({
                        text: "Certification link"
                    }),  new sap.m.Input({
                        maxLength:100,
                        id: "certilink",
                        placeholder : "0000"
                    }),
                ]
            });

            oModel.read(skillNamesEndpoint, {
                success: onSuccessName,
                error: onErrorName
            });
            oModel.read(skillLevelNamesEndpoint, {
                success: onSuccessLevel,
                error: onErrorLevel
            });
            dialog.open(); 
        },

        editSkill: function(oEvent) {
        MessageToast.show("Custom handler invoked.");
        },
        
        handleCertificationPress: function(oEvent) {
            var sCertiLink = oEvent.getSource().getBindingContext().getProperty("CertiLink");
            var absoluteURL = "https://" + sCertiLink; 
            window.open(absoluteURL, "_blank");
            }
    };
});