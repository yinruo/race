sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/ComboBox",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/viz/ui5/controls/VizFrame",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/data/DimensionDefinition",
    "sap/viz/ui5/data/MeasureDefinition",
    "sap/ui/model/json/JSONModel",
], function(MessageToast, Filter, SmartFilterBar, ComboBox,Controller, 
    Fragment, VizFrame, FlattenedDataset, DimensionDefinition, MeasureDefinition,JSONModel, ) {
    'use strict';

    return {
        // Function to handle the press event on an email-related button
        onEmailPress: function (oEvent) {
            var oButton = oEvent.getSource();
            var oTable = oButton.getParent().getParent(); // Assuming the button is inside two layers of parent containers (Table > Column > Button)
            var aSelectedItems = oTable.getSelectedItems(); // Get the selected items in the table

            // If no items are selected, show a toast message and return
            if (aSelectedItems.length === 0) {
                MessageToast.show("Please select an item from the table.");
                return;
            }

            var oSelectedItem = aSelectedItems[0]; // Assuming only one item can be selected
            var oContext = oSelectedItem.getBindingContext(); // Get the binding context of the selected item
            var sEmail = oContext.getProperty("CEmail"); // Get the value of "CEmail" property from the context
            var sName = oContext.getProperty("CName"); // Get the value of "CName" property from the context
            // Trigger the email client with the email address, subject, and body
            sap.m.URLHelper.triggerEmail(sEmail, "Request: Application and CV needed for potential job offer", "Dear " + sName + ",");
        },

        // Function to handle the press event on a certificate-related button
        onCertificatePress: function(oEvent) {
            var oButton = oEvent.getSource();
            var oTable = oButton.getParent().getParent(); // Assuming the button is inside two layers of parent containers (Table > Column > Button)
            var aSelectedItems = oTable.getSelectedItems(); // Get the selected items in the table

            // If no items are selected, show a toast message and return
            if (aSelectedItems.length === 0) {
                MessageToast.show("Please select an item from the table.");
                return;
            }

            var oSelectedItem = aSelectedItems[0]; // Assuming only one item can be selected
            var oContext = oSelectedItem.getBindingContext(); // Get the binding context of the selected item
            var certiLink = oContext.getProperty("CertiLink"); // Get the value of "CertiLink" property from the context
            // Open the certificate link in a new window
            window.open(certiLink);
        },

        // Function to handle the press event on a certification-related button (an alternative implementation)
        handleCertificationPress: function(oEvent) {
            var sCertiLink = oEvent.getSource().getBindingContext().getProperty("CertiLink"); // Get the value of "CertiLink" property from the context of the button
            // Open the certificate link in a new window
            window.open(sCertiLink);
        },

        // Function to handle the press event on an email-related button (an alternative implementation)
        handleEmailPress: function(oEvent) {
            var oButton = oEvent.getSource();
            var oListItem = oButton.getParent(); // Assuming the button is inside a list item
            var oContext = oListItem.getBindingContext(); // Get the binding context of the list item
            var sEmail = oContext.getProperty("CEmail"); // Get the value of "CEmail" property from the context
            console.log(sEmail); // Log the email address to the console (for debugging purposes)
            var sName = oEvent.getSource().getBindingContext().getProperty("CName"); // Get the value of "CName" property from the context of the button
            // Trigger the email client with the email address, subject, and body
            sap.m.URLHelper.triggerEmail(sEmail, "Request: Application and CV needed for potential job offer", "Dear " + sName + ",");
        },
        navigate: function(oEvent) {
            var vHash = 'racemanager-display';
            sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
                target: {
                  shellHash: vHash
                }
              })
        }
    };

     


    
    
});
