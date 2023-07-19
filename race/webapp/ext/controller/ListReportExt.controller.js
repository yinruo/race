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

        skillPie: function(oEvent) {
      // Sample data
      var data = [
        { fruit: "Apple", value: 32 },
        { fruit: "Pear", value: 20 },
        { fruit: "Grape", value: 10 },
      ];

      // Create a JSONModel with the data
      var oModel = new sap.ui.model.json.JSONModel();
      oModel.setData({ data: data });

      // Create the VizFrame control
      var oVizFrame = new VizFrame({
        width: "100%",
        height: "300px",
        vizType: "pie",
        dataset: new sap.viz.ui5.data.FlattenedDataset({
          dimensions: [
            new DimensionDefinition({
              name: "Fruit",
              value: "{fruit}",
            }),
          ],
          measures: [
            new MeasureDefinition({
              name: "Value",
              value: "{value}",
            }),
          ],
          data: { path: "/data" },
        }),
      });
      console.log(oVizFrame);

      // Set the JSONModel to the VizFrame
      oVizFrame.setModel(oModel);

      // Create and open the dialog
      if (!this._oChartDialog) {
        this._oChartDialog = new sap.m.Dialog({
          title: "Pie Chart",
          contentWidth: "400px",
          contentHeight: "500px",
          content: oVizFrame,
          beginButton: new sap.m.Button({
            text: "Close",
            press: function () {
              this._oChartDialog.close();
            }.bind(this),
          }),
        });
      }

      this._oChartDialog.open();
    }


  

    };

     


    
    
});
