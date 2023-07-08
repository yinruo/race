sap.ui.define([
    "sap/ui/model/Filter", 
    "sap/ui/comp/smartfilterbar/SmartFilterBar", 
    "sap/m/ComboBox"
], function (Filter, SmartFilterBar, ComboBox) {
    "use strict";
    return {
        getCustomAppStateDataExtension: function (oCustomData) {
            //the content of the custom field will be stored in the app state, so that it can be restored later, for example after a back navigation.
            //The developer has to ensure that the content of the field is stored in the object that is passed to this method.
            if (oCustomData) {
                var oCustomField1 = this.oView.byId("skillName");
                if (oCustomField1) {
                    oCustomData.skillNameFilter = oCustomField1.getSelectedKey();
                }
            }
        },
        restoreCustomAppStateDataExtension: function (oCustomData) {
            //in order to restore the content of the custom field in the filter bar, for example after a back navigation,
            //an object with the content is handed over to this method. Now the developer has to ensure that the content of the custom filter is set to the control
            if (oCustomData) {
                if (oCustomData.skillNameFilter) {
                    var oComboBox = this.oView.byId("skillName");
                    oComboBox.setSelectedKey(
                        oCustomData.skillNameFilter
                    );
                }
            }
        },
        onBeforeRebindTableExtension: function(oEvent) {
            var oBindingParams = oEvent.getParameter("bindingParams");
            oBindingParams.parameters = oBindingParams.parameters || {};
            var oSmartTable = oEvent.getSource();
            var oSmartFilterBar = this.byId(oSmartTable.getSmartFilterId());
            if (oSmartFilterBar instanceof SmartFilterBar) {
                var oCustomControl = oSmartFilterBar.getControlByKey("skillName");
                if (oCustomControl instanceof ComboBox) {
                    var vCategory = oCustomControl.getSelectedKey();
                    oBindingParams.filters.push(new Filter("SName", "EQ", vCategory));
                }
            }
        },
        onEmailPress: function (oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext();
            var sEmail = oContext.getProperty("CEmail");
            window.location.href = "mailto:" + sEmail;
        }
    };
});