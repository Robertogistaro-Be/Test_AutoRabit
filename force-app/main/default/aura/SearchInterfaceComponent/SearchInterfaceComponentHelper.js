({
    showAccounts : function(component, event) {
        var action = component.get("c.sendToMulesoftGET");
        if(component.get("v.AccountName") == null){
            
            
            component.set("v.NullField", true);
            //alert("Please insert a term to search for.")
        } else {
            component.set("v.NullField", false);

            action.setParams({"name": component.get("v.AccountName")});
            action.setCallback(this, function(response) {
                if(response.getState() === "SUCCESS"){
                    component.set("v.SearchCompleted", true);
                    var results = response.getReturnValue();
                   // alert('json --> '+results);

                    //console.log('--->'+JSON.stringify(results));

                    //console.log('json parse --> '+ JSON.parse(response.getReturnValue()));


                    if(results != undefined && results != null && results !='Not found' ){
                        component.set("v.AccountFound", true);
                        component.set("v.AccountNotFound", false);
                        component.set("v.ServiceUnavailable", false);
                        component.set("v.Results", results);
                        component.set("v.json", results);
                        //component.set("json",JSON.parse(response.getReturnValue()) );

                       
                        
                    }   /*if( results=='Error encountered'){
                        component.set("v.ServiceUnavailable", true);

                    }*/
                    
                    else {
                        
                        component.set("v.VisibilityDetailAccount", false);
                        component.set("v.AccountFound", false);
                        component.set("v.AccountNotFound", true);
                        component.set("v.Results", "");
                        component.set("v.json", "");
                        //alert("Result is null");
                        
                    }
                } else {
                   // alert("Error receiving data. Retry.")
                  /* var resultsToast = $A.get("e.force:showToast");  
                   resultsToast.setParams({
                       "title": "Error",
                       "message":"Service Unavailable",
                       "type":"error"
                   });
                   resultsToast.fire();*/
                   component.set("v.ServiceUnavailable", true);
                   
                }
            });
            $A.enqueueAction(action);
        }
    },

    hideSpinner: function (component, event, helper) {
		var theSpinner = component.find("spinnerId");
		$A.util.addClass(theSpinner, 'slds-hide');
	},
	showSpinner: function (component, event, helper) {
		var theSpinner = component.find("spinnerId");
		$A.util.removeClass(theSpinner, 'slds-hide');
    },
    
    
})