// Define an anonymous function with dependencies
sap.ui.define([
    "sap/m/MessageToast",                    // Importing the MessageToast module for displaying toast messages
    "sap/m/Dialog",                          // Importing the Dialog module for creating dialog boxes
    "sap/m/Button",                          // Importing the Button module for using buttons in the UI
], function(Dialog) { // Only using the Dialog module, others are unused
    'use strict';

    return {
        // Function to create a new skill entry
        createSkill: function(oEvent) {
            var that = this;
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_SS23_T2_SRV");

            // Function to handle successful retrieval of skill names from the backend
            var onSuccessName = function(oData) {

                // Example code to add skill names to a select control (unused)
                for (var i = 0; i < skillNames.length; i++) {
                    selectSkill.addItem(new sap.ui.core.Item({
                        text: skillNames[i].name
                    }));
                }
            };

            // Function to handle errors during the retrieval of skill names from the backend
            var onErrorName = function(oError) {
                sap.m.MessageToast.show("Error retrieving skill names from the backend.");
            };

        },

        // Function to edit an existing skill entry
        editSkill: function(oEvent) {
            var that = this;
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/Z_SS23_T2_SRV");
            var context = oEvent.getSource().getBindingContext();
            var N = context.getProperty("Name");
        },

        // Function to handle the press event on the certification link
        handleCertificationPress: function(oEvent) {
            var sCertiLink = oEvent.getSource().getBindingContext().getProperty("CertiLink");
            var absoluteURL = "https://" + sCertiLink;
            // Open the certification link in a new tab or window
            window.open(absoluteURL, "_blank");
        }
    };
});
