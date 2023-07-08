sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/comp/smartfilterbar/SmartFilterBar",
    "sap/m/ComboBox"
], function(MessageToast,Filter, SmartFilterBar, ComboBox) {
    'use strict';

    return {
        createSkill: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        },
        getCustomAppStateDataExtension: function (oCustomData) {
            //the content of the custom field will be stored in the app state, so that it can be restored later, for example after a back navigation.
            //The developer has to ensure that the content of the field is stored in the object that is passed to this method.
            if (oCustomData) {
                var oCustomField1 = this.oView.byId("conidfilter");
                if (oCustomField1) {
                    oCustomData.conidFilter = oCustomField1.getSelectedKey();
                }
            }
        },
        restoreCustomAppStateDataExtension: function (oCustomData) {
            //in order to restore the content of the custom field in the filter bar, for example after a back navigation,
            //an object with the content is handed over to this method. Now the developer has to ensure that the content of the custom filter is set to the control
            if (oCustomData) {
                if (oCustomData.conidFilter) {
                    var oComboBox = this.oView.byId("conidfilter");
                    oComboBox.setSelectedKey(
                        oCustomData.conidFilter
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
                var oCustomControl = oSmartFilterBar.getControlByKey("conidFilter");
                if (oCustomControl instanceof ComboBox) {
                    var vCategory = oCustomControl.getSelectedKey();

                	oBindingParams.filters.push(new Filter("ConId", "EQ", '001'));

                    
                }
            }
        }
    };
});