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
            var skillNamesEndpoint = "/SNameSet";
            var skillNamesEndpoint = "/SNameSet";
            var onSuccessName = function(oData) {
                var results = oData.results;
        
                for (var i = 0; i < results.length; i++) {
                    var skillName = results[i].Name;
                    skillNames.push({ name: skillName });
                }
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
                id: "nameSelect" 
            });
        
            var selectSkillLevel = new sap.m.Select({
                id: "skillLevelSelect"
            }); 
            var skillLevelNames = [];
            var skillLevelNamesEndpoint = "/SkLevelSet";
            var onSuccessLevel = function(oData) {
                var results = oData.results;
                for (var i = 0; i < results.length; i++) {
                    var skillLevelName = results[i].SkillLevel;
                    skillLevelNames.push({ name: skillLevelName });
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

            var savedSkillNames = [];

            var isSkillNameAlreadyCreated = function(name) {
                return savedSkillNames.includes(name);
            };
            
            oModel.read("/SkillSet", {
                success: function(oData) {
                    var results = oData.results;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].ConId== '001'){
                        var skillName = results[i].Name;
                        savedSkillNames.push(skillName);
                    }}
                    console.log(savedSkillNames)
                },
                error: function(oError) {
                    sap.m.MessageToast.show("Error retrieving existing skill names.");
                }
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
                    var newSkillName = sap.ui.getCore().byId("nameSelect").getSelectedItem().getText(); 
                    
                    if(isSkillNameAlreadyCreated(newSkillName)){
                        new sap.m.MessageToast.show("This skill is already being created.");
                    }else{
                    
                    var oNewTable = {
                        Name: sap.ui.getCore().byId("nameSelect").getSelectedItem().getText(),
                        SkillLevel: sap.ui.getCore().byId("skillLevelSelect").getSelectedItem().getText(), 
                        CertiName: sap.ui.getCore().byId("certiname").getValue(),
                        CertiLink: sap.ui.getCore().byId("certilink").getValue(),
                        ConId: '001',
                    };
        
                    oModel.create('/SkillSet', oNewTable, {
                        success: function(oData, oResponce) {
                            sap.m.MessageToast.show("Skill successfully created!");
                            dialog.close();
                            that.getView().getModel().refresh();
                        },
                        error: function(oError) {
                            sap.m.MessageToast.show("Error during skill creation.");
                        }
                    })};
                }
            });
        
            var dialog = new Dialog("dialogCancellationReasons", {
                title: "Create Skill",
                modal: true,
                contentWidth: "1em",
                buttons: [saveButton, cancelButton],
                content: [
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
                    }),
                    new sap.m.Input({
                        maxLength: 100,
                        id: "certiname",
                    }),
                    new sap.m.Label({
                        text: "Certification link"
                    }),
                    new sap.m.Input({
                        maxLength: 100,
                        id: "certilink",
                        placeholder: "0000"
                    }),
                ],
                afterClose: function() {
                    dialog.destroy(); 
                }
            });
            dialog.open();
             oModel.read(skillNamesEndpoint, {
                success: onSuccessName,
                error: onErrorName
            });
            oModel.read(skillLevelNamesEndpoint, {
                success: onSuccessLevel,
                error: onErrorLevel
            }); 
        },
        
        editSkill: function(oEvent) {
             var that = this;
             var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_SS23_T2_SRV");
             var context = oEvent.getSource().getBindingContext(); 
             var N= context.getProperty("Name");     
             var SK= context.getProperty("SkillLevel");
             var skillNames = [];
             var skillNamesEndpoint = "/SNameSet";
             var onSuccessName = function(oData) {
                 var results = oData.results;
                 skillNames.push({ name: N })
                 for (var i = 0; i < results.length; i++) {
                     var skillName = results[i].Name;
                     if (skillName != N){
                     skillNames.push({ name: skillName })};
                 }
                 for (var i = 0; i < skillNames.length; i++) {
                     selectSkill.addItem(new sap.ui.core.Item({
                         text: skillNames[i].name
                     }));
                 }
             };
             var CN= context.getProperty("CertiName");
             var CL= context.getProperty("CertiLink");

             var onErrorName = function(oError) {
                 sap.m.MessageToast.show("Error retrieving skill names from the backend.");
             };
         
             var selectSkill = new sap.m.Select({
                 id: "nameSelect"
             });
         
             var selectSkillLevel = new sap.m.Select({
                 id: "skillLevelSelect"
             }); 
             var skillLevelNames = [];
             var skillLevelNamesEndpoint = "/SkLevelSet";
             var onSuccessLevel = function(oData) {
                 var results = oData.results;
                 skillLevelNames.push({ name: SK })
                 for (var i = 0; i < results.length; i++) {
                     var skillLevelName = results[i].SkillLevel;
                     if (skillLevelName != SK){
                     skillLevelNames.push({ name: skillLevelName })};
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
         
         
             var cancelButton = new sap.m.Button({
                 text: "Cancel",
                 type: sap.m.ButtonType.Reject,
                 press: function() {
                     dialog.close();
                     dialog.destroy();
                 }
             });
             var updateButton = new sap.m.Button({
                text: "Update",
                type: sap.m.ButtonType.Accept,
                press: function() {
                    var oNewTable = {
                        Name: sap.ui.getCore().byId("nameSelect").getSelectedItem().getText(),
                        SkillLevel: sap.ui.getCore().byId("skillLevelSelect").getSelectedItem().getText(), 
                        CertiName: sap.ui.getCore().byId("certiname").getValue(),
                        CertiLink: sap.ui.getCore().byId("certilink").getValue(),
                        ConId: '001',
                    };
                    var Id= context.getProperty("Id");
                    console.log(Id)
                    oModel.update("/SkillSet('"+Id+"')", oNewTable, {
                        success: function(oData, oResponce) {
                            sap.m.MessageToast.show("Skill successfully updated!");
                            dialog.close();
                            that.getView().getModel().refresh();
                        },
                        error :function(oError){
                            sap.m.MessageToast.show("Error during skill update.")
                        }
                    })
                }
            });
        
            var dialog = new Dialog("dialogCancellationReasons", {
                title: "Update Skill",
                modal: true,
                contentWidth: "1em",
                buttons: [updateButton, cancelButton],
                content: [
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
                    }),
                    new sap.m.Input({
                        maxLength: 100,
                        id: "certiname",
                        value: CN 
                    }),
                    new sap.m.Label({
                        text: "Certification link"
                    }),
                    new sap.m.Input({
                        maxLength: 100,
                        id: "certilink",
                        value: CL 
                    }),
                ],
                afterClose: function() {
                    dialog.destroy(); 
                }
            });
            dialog.open();
             oModel.read(skillNamesEndpoint, {
                success: onSuccessName,
                error: onErrorName
            });
            oModel.read(skillLevelNamesEndpoint, {
                success: onSuccessLevel,
                error: onErrorLevel
            }); 
         
             

                
            
         
        },
        
        handleCertificationPress: function(oEvent) {
            var sCertiLink = oEvent.getSource().getBindingContext().getProperty("CertiLink");
            var absoluteURL = "https://" + sCertiLink; 
            window.open(absoluteURL, "_blank");
            }
    };
});