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
            var oTable = oButton.getParent().getParent(); // Assuming the button is in the table header
            var aSelectedItems = oTable.getSelectedItems();
            
            if (aSelectedItems.length === 0) {
                MessageToast.show("Please select an item from the table.");
                return;
            }

            var oSelectedItem = aSelectedItems[0]; // Assuming only one item can be selected
            var oContext = oSelectedItem.getBindingContext();
            var sEmail = oContext.getProperty("CEmail");
            window.location.href = "mailto:" + sEmail;
        }
    };
});
