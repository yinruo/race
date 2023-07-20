// Define an anonymous function with dependencies
sap.ui.define([
    "sap/m/MessageToast",      // Importing the MessageToast module for displaying toast messages
    "sap/m/Dialog"             // Importing the Dialog module for creating dialog boxes
], function(MessageToast, Dialog) {
    'use strict';

    return {
        // Function to create a new skill entry
        createSkill: function(oEvent) {
            // Commented out message toast for custom handler invocation
            // MessageToast.show("Custom handler invoked.");

            var that = this;
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_SS23_T2_SRV");

            // Create a Cancel button for the dialog
            var cancelButton = new sap.m.Button({
                text: "Cancel",
                type: sap.m.ButtonType.Reject,
                press: function() {
                    dialog.close();
                    dialog.destroy();
                }
            });

            // Create a Save button for the dialog
            var saveButton = new sap.m.Button({
                text: "Save",
                type: sap.m.ButtonType.Accept,
                press: function() {
                    // Get the value entered for the skill name from the input field
                    var oNewTable = {
                        Name: sap.ui.getCore().byId("name").getValue(),
                    };

                    // Create a new entry in the "SNameSet" entity with the provided skill name
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

            // Create a dialog box for adding a new skill
            var dialog = new Dialog("dialogCancellationReasons", {
                title: "Create Table",
                modal: true,
                contentWidth: "1em",
                buttons: [saveButton, cancelButton],
                content: [
                    // Input field for entering the skill name
                    new sap.m.Label({
                        text: "Skill name"
                    }),
                    new sap.m.Input({
                        maxLength: 100,
                        id: "name",
                    })
                ],
                afterClose: function() {
                    dialog.destroy(); // Clean up the dialog when it is closed
                }
            });
            dialog.open(); // Open the dialog for user interaction
        }
    };
});
