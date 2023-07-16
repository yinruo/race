sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/ComboBox"
], function(MessageToast, Filter, SmartFilterBar, ComboBox) {
    'use strict';

    return {
        onEmailPress: function (oEvent) {
            var oButton = oEvent.getSource();
            var oTable = oButton.getParent().getParent(); 
            var aSelectedItems = oTable.getSelectedItems();
            
            if (aSelectedItems.length === 0) {
                MessageToast.show("Please select an item from the table.");
                return;
            }

            var oSelectedItem = aSelectedItems[0]; // Assuming only one item can be selected
            var oContext = oSelectedItem.getBindingContext();
            var sEmail = oContext.getProperty("CEmail");
            var sName = oContext.getProperty("CName");
            sap.m.URLHelper.triggerEmail(sEmail, "Request: Application and CV needed for potential job offer", "Dear " + sName + ",");
        },
        onCertificatePress: function(oEvent) {
            var oButton = oEvent.getSource();
            var oTable = oButton.getParent().getParent(); 
            var aSelectedItems = oTable.getSelectedItems();
            
            if (aSelectedItems.length === 0) {
                MessageToast.show("Please select an item from the table.");
                return;
            }

            var oSelectedItem = aSelectedItems[0]; // Assuming only one item can be selected
            var oContext = oSelectedItem.getBindingContext();
            var certiLink = oContext.getProperty("CertiLink");
            window.open(certiLink);
        },

        handleCertificationPress: function(oEvent) {
            var sCertiLink = oEvent.getSource().getBindingContext().getProperty("CertiLink");
            window.open(sCertiLink);
        },
        handleEmailPress: function(oEvent) {
            var oButton = oEvent.getSource();
            var oListItem = oButton.getParent(); 
            var oContext = oListItem.getBindingContext();
            var sEmail = oContext.getProperty("CEmail");
            console.log(sEmail)
            var sName = oEvent.getSource().getBindingContext().getProperty("CName");
            sap.m.URLHelper.triggerEmail(sEmail, "Request: Application and CV needed for potential job offer", "Dear " + sName + ",");
        },        

    };
    
});
