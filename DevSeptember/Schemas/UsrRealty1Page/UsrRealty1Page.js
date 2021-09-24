define("UsrRealty1Page", ["RightUtilities"], function(RightUtilities) {
	return {
		entitySchemaName: "UsrRealty",
		attributes: {
			"CurrentUserName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				value: ""
			},
			"IsFinance": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			"UsrCommissionUSD": {
                dependencies: [
                    {
                        columns: ["UsrPriceUSD", "UsrOfferType"],
                        methodName: "calculateCommission"
                    }
                ]
			},
			"UsrOfferType": {
				lookupListConfig: {
					columns: ["UsrCommissionCoeff"]
				},
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrRealtyFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrRealty"
				}
			},
			"UsrSchema6335a45fDetail09caba6c": {
				"schemaName": "UsrRealtyVisitDetailGrid",
				"entitySchemaName": "UsrRealtyVisit",
				"filter": {
					"detailColumn": "UsrRealty",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrComment": {
				"115c5e03-347e-4907-aef9-766a668c9790": {
					"uId": "115c5e03-347e-4907-aef9-766a668c9790",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 7,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrPriceUSD"
							},
							"rightExpression": {
								"type": 0,
								"value": 5000,
								"dataValueType": 5
							}
						}
					]
				}
			},
			"UsrOfferType": {
				"5b43756b-a8ab-4780-b0cf-7ca39219f31f": {
					"uId": "5b43756b-a8ab-4780-b0cf-7ca39219f31f",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "CurrentUserName"
							},
							"rightExpression": {
								"type": 0,
								"value": "Supervisor",
								"dataValueType": 1
							}
						}
					]
				}
			},
			"UsrStatus": {
				"a921573e-bfbc-449e-b7f2-069330e4a8eb": {
					"uId": "a921573e-bfbc-449e-b7f2-069330e4a8eb",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "IsFinance"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			calculateCommission: function() {
				var result = 0;
				var price = this.get("UsrPriceUSD");
				var offerTypeObject = this.get("UsrOfferType");
				if (offerTypeObject) {
					var coeff = offerTypeObject.UsrCommissionCoeff;
					result = price * coeff;
				}
				
				this.set("UsrCommissionUSD", result);
			},
			
			positiveValueValidator: function(value, column) {
				let msg = "";
				if (value <= 0) {
					msg = this.get("Resources.Strings.ValueMustBePositive");
				}
				return {
                    // Сообщение об ошибке валидации.
                    invalidMessage: msg
                };
			},			
			
            // Переопределение базового метода, инициализирующего пользовательские валидаторы.
            setValidationConfig: function() {
                // Вызывает инициализацию валидаторов родительской модели представления.
                this.callParent(arguments);
                this.addColumnValidator("UsrPriceUSD", this.positiveValueValidator);
                this.addColumnValidator("UsrAreaSqM", this.positiveValueValidator);
            },
			
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.console.log("Terrasoft.SysValue.CURRENT_USER.displayValue = " + Terrasoft.SysValue.CURRENT_USER.displayValue);
				this.set("CurrentUserName", Terrasoft.SysValue.CURRENT_USER.displayValue);
				
				var operData = {
					operation: "IsFinanceMember"
				};
				RightUtilities.checkCanExecuteOperation(operData, this.getOperationResult, this);
				
			},			
			getOperationResult: function(result) {
				this.set("IsFinance", result);
			},
			
			myButtonClick: function() {
				this.console.log("Button pressed.");
				// todo
			},
			getMyButtonEnabled: function() {
				this.console.log("getMyButtonEnabled called.");

				var t = this.get("UsrComment");
				
				var name = this.get("UsrName");
				var result = !!name;
				return result;
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrNamedb620f1a-54c5-470a-bafb-876cd10c8118",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrName",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FLOATbb18d410-2e0b-4ad4-8e24-4b4ff875288c",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrPriceUSD",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FLOATf5b1f8c7-9590-4966-928d-e4de72b5d10e",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrAreaSqM",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LOOKUPcbcedf59-5a5a-4fc4-b936-e4f683fe54cd",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrType",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "MyButton",
				"values": {
					"itemType": 5,
					"caption": {
						"bindTo": "Resources.Strings.MyButtonCaption"
					},
					"click": {
						"bindTo": "myButtonClick"
					},
					"enabled": {
						"bindTo": "getMyButtonEnabled"
					},
					"style": "red",
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "FLOAT940eb7f2-4a45-46f9-9fbc-d64abb25c92b",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrCommissionUSD",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "STRING746d5e7e-dc68-4e01-816c-d6119d0e2e10",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrLocation",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "LOOKUP4106285d-f928-41bd-ae8a-1dd47205784b",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrOfferType",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "LOOKUPe981e22c-29cc-40c4-84c4-85224b11e739",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrStatus",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "CreatedOnc16fb9e0-f24d-4474-ab6c-edc2dcf69c91",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "CreatedOn",
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "STRING9d458c6a-705a-48c7-8696-c7e26f8293e9",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrComment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tabfbe82cfdTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabfbe82cfdTabLabelTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSchema6335a45fDetail09caba6c",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabfbe82cfdTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "UsrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
