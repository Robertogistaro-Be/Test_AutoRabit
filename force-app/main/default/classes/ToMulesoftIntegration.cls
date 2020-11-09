public class ToMulesoftIntegration {
    public static Setting_Endpoint__mdt endpoints=[SELECT URL_Get__c, URL_Post__c, URL_Case_Post__c FROM Setting_Endpoint__mdt WHERE MasterLabel='Current Endpoints'];
    public static String getURL=endpoints.URL_Get__c;
    public static String postURL=endpoints.URL_Post__c;
    public static String casePostURL=endpoints.URL_Case_Post__c;
    @AuraEnabled
    public static Object sendToMulesoftGET(String name){
        // Setting up the HTTP connection.
        Http http = new Http();
        // Setting up the request.
        HttpRequest request = new HttpRequest();
        request.setEndpoint('http://' + getURL + '/Accounts?name=' + EncodingUtil.urlEncode(name, 'UTF-8'));        
        request.setMethod('GET');
        //Setting up the response.
        HttpResponse response = http.send(request);
        system.debug(request.getEndpoint());
        //Checking if the transaction was successful.
        if (response.getStatusCode() == 200) {
            System.debug('Received the following: ' + String.valueOf(response.getBody()));
            //If it was, check if it returned a Not Found.
            if(String.valueOf(response.getBody()) == 'Not found') {
                return new String[]{'Not found'};
            //Else, output the resulting string as a list.
            } else {
                Object output = JSON.deserializeUntyped((response.getBody()));
                return output;
            }
        }
        //If the transaction was not successful, return an error.
        else {
            System.debug('Encountered the following error: ' + response.getStatusCode() + ' ' + response.getStatus() + ' ' + response.getBody());
            return new String[]{'Error encountered.'};
        }
    }


    @AuraEnabled
    public static Object sendToMulesoftGETid(String idAcc){
        System.debug('stampo id '+idAcc);
        // Setting up the HTTP connection.
        Http http = new Http();
        // Setting up the request.
        HttpRequest request = new HttpRequest();
        request.setEndpoint('http://' + getURL + '/Accounts?id=' + idAcc);        
        request.setMethod('GET');
        //Setting up the response.
        HttpResponse response = http.send(request);
        System.debug(response);
        system.debug(request.getEndpoint());
        //Checking if the transaction was successful.
        if (response.getStatusCode() == 200) {
            System.debug('Received the following: ' + String.valueOf(response.getBody()));
            //If it was, check if it returned a Not Found.
            if(String.valueOf(response.getBody()) == 'Not found') {
                return new String[]{'Not found'};
            //Else, output the resulting string as a list.
            } else {
                Object output = JSON.deserializeUntyped((response.getBody()));
                System.debug(output);
                return output;
            }
        }
        //If the transaction was not successful, return an error.
        else {
            System.debug('Encountered the following error: ' + response.getStatusCode() + ' ' + response.getStatus() + ' ' + response.getBody());
            return new String[]{'Error encountered.'};
        }
    }







	
	 @AuraEnabled
	public static String sendToMulesoftPOSTPerson(String firstName , String lastName , String CodiceFiscale , String PersonEmail , String Phone , String BillingCity,String BillingStreet,String BillingState,String BillingCountry,String BillingPostalCode/*,String Agente,String Agenzia*/){
        
   // system.debug( 'stampa parametri'+firstName+lastName+ CodiceFiscale+PersonEmail+  Phone+ BillingCity+ BillingStreet+ BillingState+ BillingCountry+  Agente+ Agenzia);
    
     String json='';
     
     String Fname = '';
	 String Lname = '';
	 String CF = '';
	 String BCity = '';
	 String BStreet = '';
	 String BState = '';
     String BCountry = '';
     String BPostalCode='';
	 String PEmail = '';
	 String PhoneAcc = '';
	// String AgenteAcc = '';
	 //String AgenziaAcc = '';

	/* String Titolo__c = '';
	 String Partita_Iva__c = '';
     String Email_Agenzia__c = '';
     String Name = '';*/
        
        
        
        // Setting up the HTTP connection.
        Http http = new Http();
		// Setting up the request.
        HttpRequest request = new HttpRequest();
        request.setEndpoint('http://' + postURL + '/CreateAccounts');
        request.setMethod('POST');
		request.setHeader('Content-Type', 'application/json');
		
		
		if(firstName!=null && firstName!=''){
            Fname=firstName;
		}
		if(lastName!=null && lastName!=''){
            Lname=lastName;
		}
		if(CodiceFiscale!=null && CodiceFiscale!=''){
		CF=CodiceFiscale;
        }
        if(PersonEmail!=null && PersonEmail!=''){
        PEmail=PersonEmail;
        }
        if(Phone!=null && Phone!=''){
        PhoneAcc=Phone;
        }
		if(BillingCity!=null && BillingCity!=''){
		BCity=BillingCity;
		}
		if(BillingStreet!=null && BillingStreet!=''){
		BStreet=BillingStreet;
		}
		if(BillingState!=null && BillingState!=''){
		BState=BillingState;
		}
		if(BillingCountry!=null && BillingCountry!=''){
		BCountry=BillingCountry;
        }
        if(BillingPostalCode!=null && BillingPostalCode!=''){
        BPostalCode=BillingPostalCode;
        }
		/*if(Agente!=null && Agente!=''){
		AgenteAcc=Agente;
		}
		if(Agenzia!=null && Agenzia!=''){
		AgenziaAcc=Agenzia;
		}*/
	
            json = '{   "firstName" : "'+ Fname +'",'+
                        '"lastName" : "' + Lname +'",' +
                        '"Codice_Fiscale__c" : "' + CF +'",' +
                        '"PersonEmail" : "' + PEmail+ '",'+
                        '"Phone" : "' + PhoneAcc +'",'+ 
                        '"BillingCity" : "' + BCity +'",' +
                        '"BillingStreet" : "' + BStreet +'",'+ 
                        '"BillingState" : "' + BState +'",'+
                        '"BillingCountry" : "' + BCountry +'",'+
                        '"BillingPostalCode" : "' + BPostalCode +'",'+
                        '"Agenzia__c" : "' + 'Milano Via Dante' +'",'+
                        '"Agente__c" : "' + 'Mario Rossi' 
                        
                        +'"}';
			
        System.debug('json' + json); 
        request.setBody(json);
        HttpResponse response = http.send(request);
        
		if (String.valueof(response.getStatusCode()).left(1)=='2'){
            System.debug('Received the following: ' + String.valueOf(response.getBody()));
            //If it was, check if it returned a Not Found.
        return json;
        }
		 else {
            System.debug('Encountered the following error: ' + response.getStatusCode() + ' ' + response.getStatus() + ' ' + response.getBody());
            return 'Error encountered';
        }
        //return json;
    }



    @AuraEnabled
	public static String sendToMulesoftPOSTBusiness(String NameAcc , String VAT_Number , String Phone , String Email_Agenzia , String BillingCity, String BillingStreet,String BillingState,String BillingCountry,String BillingPostalCode, String Titolo/*,String Agente,String Agenzia*/){
        
    
     String json='';
     
     String NameA = '';
     String VAT_N = '';
     String PhoneAccB = '';

     String Email_AccB='';

	 String BCity = '';
	 String BStreet = '';
	 String BState = '';
     String BCountry = '';
     String BPostalCode='';
     String tit='';

	 //String AgenteAcc = '';
	// String AgenziaAcc = '';

	/* String Titolo__c = '';
	 String Partita_Iva__c = '';
     String Email_Agenzia__c = '';
     String Name = '';*/
        
        
        
        // Setting up the HTTP connection.
        Http http = new Http();
		// Setting up the request.
        HttpRequest request = new HttpRequest();
        request.setEndpoint('http://' + postURL + '/CreateAccounts');
        request.setMethod('POST');
		request.setHeader('Content-Type', 'application/json');
		
	
		if(NameAcc!=null && NameAcc!=''){
            NameA=NameAcc;
		}
		if(VAT_Number!=null && VAT_Number!=''){
            VAT_N=VAT_Number;
        }
        if(Email_Agenzia!=null && Email_Agenzia!=''){
            Email_AccB=Email_Agenzia;
        }
        if(Phone!=null && Phone!=''){
            PhoneAccB=Phone;
        }
		if(BillingCity!=null && BillingCity!=''){
		BCity=BillingCity;
		}
		if(BillingStreet!=null && BillingStreet!=''){
		BStreet=BillingStreet;
		}
		if(BillingState!=null && BillingState!=''){
		BState=BillingState;
		}
		if(BillingCountry!=null && BillingCountry!=''){
		BCountry=BillingCountry;
        }
        if(BillingPostalCode!=null && BillingPostalCode!=''){
        BPostalCode=BillingPostalCode;
        }
        
        if(Titolo!=null && Titolo!=''){
        tit=Titolo;
        }
		/*if(Agente!=null && Agente!=''){
		AgenteAcc=Agente;
		}
		if(Agenzia!=null && Agenzia!=''){
		AgenziaAcc=Agenzia;
		}*/
	
            json = '{"Name" : "'+ NameAcc +'",'+
                        '"Titolo__c" : "' + tit +'",' +

                        '"VAT_Number__c" : "' + VAT_N +'",' +
                        '"Phone" : "' + PhoneAccB +'",'+ 
                        '"AccountEmail__c" : "' + Email_AccB+ '",'+
                        '"BillingCity" : "' + BCity +'",' +
                        '"BillingStreet" : "' + BStreet +'",'+ 
                        '"BillingState" : "' + BState +'",'+
                        '"BillingCountry" : "' + BCountry +'",'+
                        '"BillingPostalCode" : "' + BPostalCode +'",'+
                        '"Agenzia__c" : "' + 'Milano Via Dante' +'",'+
                        '"Agente__c" : "' + 'Mario Rossi' 
                        +'"}';
			
        System.debug('json' + json); 
        request.setBody(json);
        HttpResponse response = http.send(request);
        
		if (String.valueof(response.getStatusCode()).left(1)=='2'){
            System.debug('Received the following: ' + String.valueOf(response.getBody()));
            //If it was, check if it returned a Not Found.
        return json;
        }
		 else {
            System.debug('Encountered the following error: ' + response.getStatusCode() + ' ' + response.getStatus() + ' ' + response.getBody());
            return 'Error encountered';
        }
        //return json;
    }

    @AuraEnabled
    public static string createCasePost(String accId, String descr){
        Http http = new Http();
		// Setting up the request.
        HttpRequest request = new HttpRequest();
        request.setEndpoint('http://' + casePostURL + '/CreateCase');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        
        String json = '{ "accId": "' + accId + '", "Descr": "' + descr + '"}';

        request.setBody(json);

        HttpResponse response = http.send(request);

        if (String.valueof(response.getStatusCode()).left(1)=='2'){
            System.debug('Received the following: ' + String.valueOf(response.getBody()));
            //If it was, check if it returned a Not Found.
        return 'Success';
        }
		 else {
            System.debug('Encountered the following error: ' + response.getStatusCode() + ' ' + response.getStatus() + ' ' + response.getBody());
            return 'Error ' + response.getStatusCode() + response.getStatus();
        }
    }
}