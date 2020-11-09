({
    //handleClick function is called in the Component and redirects to the Helper
    handleClick: function (component, event, helper) {
        
        //component.set("v.AccountFound", false);
        component.set("v.AccountNotFound", false);
       // component.set("v.ServiceUnavailable", false);
        //debugger;
        helper.showAccounts(component, event);
    },

    DisplayInfoAccount: function (component, event, helper) {
        component.set("v.DisplayInfoAccount", true);

    },
    ClosedDisplayInfoAccount: function (component, event, helper) {
        component.set("v.DisplayInfoAccount", false);


    },
    SecondPageDetailAccount: function (component, event, helper) {
       
       
        component.set("v.DisplayDetailPersonAccount", true);
        

    },
    ClosedSecondPageDetailAccount: function (component, event, helper) {
        component.set("v.DisplayDetailPersonAccount", false);


    },

    
    SelectPersonAccountPage: function (component, event, helper) {
        component.set("v.DisplayDetailBusinessAccount", false);
        component.set("v.DisplayDetailPersonAccount", true);
       

    },
    
    SelectBusinessAccountPage: function (component, event, helper) {
        component.set("v.DisplayDetailPersonAccount", false);
        component.set("v.DisplayDetailBusinessAccount", true);
       

    },
    ClosedSecondPageBusinessAccount: function (component, event, helper) {
        component.set("v.DisplayDetailBusinessAccount", false);
       

    },
    getId: function (component, event, helper) {
        var idAcc = event.target.id;
        //alert('id '+idAcc); 

    var action = component.get("c.sendToMulesoftGETid");
        action.setParams({
                "idAcc": idAcc
        });
        action.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                var results = response.getReturnValue();
                console.log(results);
                console.log(results.CaseDescr);
                //if( response.getReturnValue()!= null){
                // if(results != undefined && results != null){
                if(results.CaseDescr.length > 0){
                    component.set("v.incompleteAcc",true);
                    component.set("v.accId", idAcc);
                    component.set("v.caseDescr", results.CaseDescr);
                } else {
                    component.set("v.incompleteAcc",false);
                    component.set("v.accId", "");
                    component.set("v.caseDescr", "");
                }
                // alert(results);
                    component.set("v.ReturnAccount", results);
                    component.set("v.visibilitiAcc",true);
            /* }else{
                    console.log("nullo --> "+response.getReturnValue());
                }  */
            }
        });
        $A.enqueueAction(action);
    },


    


    SetVisibilityDetailAccount: function (component, event, helper) {
        component.set("v.VisibilityDetailAccount", true);
       

    },
    ClosedDetailAccount: function (component, event, helper) {
        component.set("v.visibilitiAcc", false);
    },

    SendValuePostPersonalAccount: function (component, event, helper) {
        helper.showSpinner(component,event,helper);
        debugger;
        var isValidate = true;

        var FirstName = component.find("FirstName").get("v.value");
       // console.log("FirstName --> "+FirstName);
        var LastName = component.find("LastName").get("v.value");
        //console.log("LastName --> "+LastName);
        var PersonEmail = component.find("PersonEmail").get("v.value");
       // console.log("PersonEmail --> "+PersonEmail);
        var CodiceFiscale = component.find("CodiceFiscale").get("v.value");
        //console.log("CodiceFiscale --> "+CodiceFiscale);
        var BillingCity = component.find("BillingCity").get("v.value");
       // console.log("BillingCity --> "+BillingCity);
        var BillingStreet = component.find("BillingStreet").get("v.value");
       // console.log("BillingStreet --> "+BillingStreet);
        var BillingState = component.find("BillingState").get("v.value");
        //console.log("BillingState --> "+BillingState);
        var BillingCountry = component.find("BillingCountry").get("v.value");
        //console.log("BillingCountry --> "+BillingCountry);
        var BillingPostalCode = component.find("BillingPostalCode").get("v.value");
        //console.log("BillingPostalCode --> "+BillingPostalCode);
        var Phone = component.find("Phone").get("v.value");
        //console.log("Phone --> "+Phone);
       /* var Agente = component.find("Agente").get("v.value");
        console.log("Agente --> "+Agente);
        var Agenzia = component.find("Agenzia").get("v.value");
        console.log("Agenzia --> "+Agenzia);*/

        if($A.util.isUndefinedOrNull(LastName) || $A.util.isUndefined(LastName) || $A.util.isEmpty(LastName.trim())){
            
            isValidate = false;
        }else{
            
        } 
        var regCF=new RegExp('^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$');
        if(!regCF.test(CodiceFiscale)){
            isValidate = false;
        }else{
            
        } 
        var regPhone=new RegExp('^[3]{1}[0-9]{9}$');
        if(!regPhone.test(Phone)){
            isValidate = false;
        }else{
            
        }  
        debugger;

        var action = component.get("c.sendToMulesoftPOSTPerson");
        action.setParams({
                "firstName": FirstName, 
                "lastName": LastName, 
                "CodiceFiscale": CodiceFiscale, 
                "PersonEmail": PersonEmail,
                "Phone": Phone,
                "BillingCity": BillingCity,
                "BillingStreet": BillingStreet,
                "BillingState": BillingState,
                "BillingCountry": BillingCountry,
                "BillingPostalCode": BillingPostalCode//,
               /* "Agente": Agente,
                "Agenzia": Agenzia*/
        });

        if(isValidate){
            alert('Form submitted successfully');
            action.setCallback(this, function(response){
            debugger;
            
            if(response.getReturnValue() != null){
                console.log("non nullo --> "+response.getReturnValue());
                var resultsToast = $A.get("e.force:showToast");  
                   resultsToast.setParams({
                       "title": "Success",
                       "message":"The account has been created",
                       "type":"success"
                   });
                   resultsToast.fire();
                   debugger;
                   helper.hideSpinner(component, event, helper);
                   component.set("v.DisplayDetailPersonAccount",false);
                   component.set("v.DisplayInfoAccount",false);
                   component.set("v.AccountNotFound",false);

            }else{
                var failureToast = $A.get("e.force:showToast");  
                   failureToast.setParams({
                       "title": "Error",
                       "message":"The account wasn't created",
                       "type":"error"
                   });
                   failureToast.fire();
                   helper.hideSpinner(component, event, helper);
                console.log("nullo --> "+response.getReturnValue());
                //component.set("v.DisplayDetailPersonAccount",false);
                component.set("v.DisplayInfoAccount",false);
            }
            
        });
        $A.enqueueAction(action);
        debugger;
        }else{
            var failureToast = $A.get("e.force:showToast");  
            failureToast.setParams({
                "title": "Error",
                "message":"The account wasn't created, you need to fill the required fields",
                "type":"error"
            });
            failureToast.fire();
            helper.hideSpinner(component, event, helper);
            //console.log("nullo --> "+response.getReturnValue());
            //component.set("v.DisplayDetailPersonAccount",false);
            component.set("v.DisplayInfoAccount",false); 
    }
    },

    SendValuePostBusinessAccount: function (component, event, helper) {
        helper.showSpinner(component,event,helper);
        debugger;
        var isValidate = true;
        

        var NameAcc = component.find("NameAcc").get("v.value");
       // console.log("NameAcc --> "+NameAcc);

         var VAT_Number = component.find("VAT_Number").get("v.value");
       // console.log("Partita_Iva --> "+VAT_Number);
        
       var Titolo = component.find("Titolo").get("v.value");
       // console.log("Titolo --> "+Titolo);
        var BillingCity = component.find("BillingCity").get("v.value");
        //console.log("BillingCity --> "+BillingCity);
        var BillingStreet = component.find("BillingStreet").get("v.value");
        //console.log("BillingStreet --> "+BillingStreet);
        var BillingState = component.find("BillingState").get("v.value");
       // console.log("BillingState --> "+BillingState);
        var BillingCountry = component.find("BillingCountry").get("v.value");
        //console.log("BillingCountry --> "+BillingCountry);
        var BillingPostalCode = component.find("BillingPostalCode").get("v.value");
        //console.log("BillingPostalCode --> "+BillingPostalCode);
        var Email_Agenzia = component.find("Email_Agenzia").get("v.value");
       // console.log("Email_Agenzia --> "+Email_Agenzia);
        var Phone = component.find("Phone").get("v.value");
        //console.log("Phone --> "+Phone);
      /*  var Agente = component.find("Agente").get("v.value");
        console.log("Agente --> "+Agente);
        var Agenzia = component.find("Agenzia").get("v.value");
        console.log("Agenzia --> "+Agenzia);*/
        if($A.util.isUndefinedOrNull(NameAcc) || $A.util.isUndefined(NameAcc) || $A.util.isEmpty(NameAcc.trim())){
            
            isValidate = false;
        }else{
            
        } 
        //if($A.util.isUndefinedOrNull(VAT_Number) || $A.util.isUndefined(VAT_Number) || $A.util.isEmpty(VAT_Number.trim())){
            var regVAT=new RegExp('^[0-9]{11}$');
        if(!regVAT.test(VAT_Number)){
            isValidate = false;
        }else{
            
        } 
        var regPhone=new RegExp('^[3]{1}[0-9]{9}$');
        if(!regPhone.test(Phone)){
            isValidate = false;
        }else{
            
        }  
        debugger;           

       var action = component.get("c.sendToMulesoftPOSTBusiness");
        action.setParams({
                "NameAcc": NameAcc, 
                "VAT_Number": VAT_Number, 
            	"Phone": Phone,
                "Email_Agenzia": Email_Agenzia,
                "BillingCity": BillingCity,
                "BillingStreet": BillingStreet,
                "BillingState": BillingState,
                "BillingCountry": BillingCountry,
                "BillingPostalCode": BillingPostalCode,
                "Titolo": Titolo
                //,
               /* "Agente": Agente,
                "Agenzia": Agenzia*/
        });
        if(isValidate){
        alert('Form submitted successfully');
        debugger;
        action.setCallback(this, function(response){
            if( response.getReturnValue()!= null){
                console.log("non nullo --> "+response.getReturnValue());
            
                var resultsToast = $A.get("e.force:showToast");  
                   resultsToast.setParams({
                       "title": "Success",
                       "message":"The account has been created",
                       "type":"success"
                   });
                   resultsToast.fire();
                   helper.hideSpinner(component,event,helper);
                   component.set("v.DisplayDetailBusinessAccount",false);
                   component.set("v.DisplayInfoAccount",false);
                   component.set("v.AccountNotFound",false);
               
                
            }else{
                var failureToast = $A.get("e.force:showToast");  
                   failureToast.setParams({
                       "title": "Error",
                       "message":"The account wasn't created",
                       "type":"error"
                   });
                   failureToast.fire();
                   helper.hideSpinner(component, event, helper);
                console.log("nullo --> "+response.getReturnValue());
                //component.set("v.DisplayDetailBusinessAccount",false);
                   component.set("v.DisplayInfoAccount",false);
             }
            
             });
        $A.enqueueAction(action);
        //$A.get('e.force:refreshView').fire();
        debugger;
    }
        else{
            var failureToast = $A.get("e.force:showToast");  
            failureToast.setParams({
                "title": "Error",
                "message":"The account wasn't created, you need to fill the required fields",
                "type":"error"
            });
            failureToast.fire();
            helper.hideSpinner(component, event, helper);
            //console.log("nullo --> "+response.getReturnValue());
            //component.set("v.DisplayDetailBusinessAccount",false);
            component.set("v.DisplayInfoAccount",false); 
    }
    },
    
    SendPostCase: function (component, event, helper) {
        var action = component.get("c.createCasePost");
        debugger;
        action.setParams({
                "accId": component.get("v.accId"), 
                "descr": component.get("v.caseDescr")
        });

        action.setCallback(this, function(response){
            if(response.getReturnValue() === "Success"){
                var resultsToast = $A.get("e.force:showToast");  
                   resultsToast.setParams({
                       "title": "Success",
                       "message":"The case has been created",
                       "type":"success"
                   });
                   resultsToast.fire();
            } else {
                alert(response.getReturnValue());
                var resultsToast = $A.get("e.force:showToast");  
                   resultsToast.setParams({
                       "title": "Error",
                       "message":"The case has not been created",
                       "type":"error"
                   });
                   resultsToast.fire();
            }
        });
        $A.enqueueAction(action);
    },
    activeButtonPerson : function(component, event, helper){
        let FirstName = component.find("FirstName").get("v.value");
        let LastName = component.find("LastName").get("v.value");
        let CodiceFiscale = component.find("CodiceFiscale").get("v.value");
        let PersonEmail = component.find("PersonEmail").get("v.value");
        let Phone = component.find("Phone").get("v.value");
        let BillingCity = component.find("BillingCity").get("v.value");
        let BillingStreet = component.find("BillingStreet").get("v.value");
        let BillingState = component.find("BillingState").get("v.value");
        let BillingCountry = component.find("BillingCountry").get("v.value");
        let BillingPostalCode = component.find("BillingPostalCode").get("v.value");
        
        

        if(FirstName != null && LastName != null && CodiceFiscale != null &&
            PersonEmail != null && Phone != null && BillingCity != null && 
            BillingStreet != null && BillingState != null && 
            BillingCountry != null && BillingPostalCode != null){
            component.set('v.isButtonActive',false);
        }
        else{
            component.set('v.isButtonActive',true);
        }       
    },
    activeButtonBusiness : function(component, event, helper){
        let NameAcc = component.find("NameAcc").get("v.value");
        let VAT_Number = component.find("VAT_Number").get("v.value");
        let AccountEmail = component.find("Email_Agenzia").get("v.value");
        let Phone = component.find("Phone").get("v.value");
        let BillingCity = component.find("BillingCity").get("v.value");
        let BillingStreet = component.find("BillingStreet").get("v.value");
        let BillingState = component.find("BillingState").get("v.value");
        let BillingCountry = component.find("BillingCountry").get("v.value");
        let BillingPostalCode = component.find("BillingPostalCode").get("v.value");

        if(NameAcc != null && VAT_Number != null && 
            AccountEmail != null && Phone != null && BillingCity != null && 
            BillingStreet != null && BillingState != null && 
            BillingCountry != null && BillingPostalCode != null){
            component.set('v.isButtonActive',false);
        }
        else{
            component.set('v.isButtonActive',true);
        }       
    },
})