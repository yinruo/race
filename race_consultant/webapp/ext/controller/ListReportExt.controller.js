sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/ComboBox"
], function(MessageToast,Filter, SmartFilterBar, ComboBox) {
    'use strict';

    return {
        onEmailPress: function (oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext();
            var sEmail = oContext.getProperty("CEmail");
            window.location.href = "mailto:" + sEmail;
        }
    };
});