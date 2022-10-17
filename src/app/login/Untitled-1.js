eaea.alumnos.map(a => {
	let result;
	
	if(a.username == "ju.valdivia" && a.password == "123456"){
		result=true
        return result;
    
	} 
    return null;
})


eaea.alumnos.map(a => {
	let result;
	
	if(a.username == "ju.valdivia" && a.password == "123456"){
		
        return a;
    
	} 
    
}).filter(b => b != null) 