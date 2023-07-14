sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/ComboBox"
], function(MessageToast,Filter, SmartFilterBar, ComboBox) {
    'use strict';

    return {
        onEmailPress: function (oEvent) {
            console.log('email pressed')
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext();
            var sEmail = oContext.getProperty("CEmail");
            window.location.href = "mailto:" + sEmail;
        },
        contact: function(oEvent) {
        MessageToast.show("Custom handler invoked.");
        },
        contact: function(oEvent) {
        MessageToast.show("Custom handler invoked.");
        },
        emailPress: function(oEvent) {
        MessageToast.show("Custom handler invoked.");
        }
    };
});