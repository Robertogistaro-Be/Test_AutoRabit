trigger triggerOnAccounts on Account (before insert, before update) {
	Set<String> FiscalCodesInterested=new Set<String>();
    for(Account A:trigger.new){
        FiscalCodesInterested.add(A.codice_fiscale__c);
    }
    List<Account> AccountsInterested=[select codice_fiscale__c,id from account where codice_fiscale__c=:FiscalCodesInterested];
    set<string> FiscalCodesOnsystem=new set<string>();
    for(Account A:AccountsInterested) FiscalCodesOnsystem.add(A.codice_fiscale__c);
    
     for(Account A:trigger.new){
        if(FiscalCodesOnsystem.contains(A.codice_fiscale__c)) A.Codice_fiscale__c.addError('There is an account with same fiscal code');
    }

  
    

}