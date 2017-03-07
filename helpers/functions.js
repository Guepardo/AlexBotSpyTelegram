module.exports = {
	contains: function(string, target){
		if(target === undefined)
			return false; 

		var result = ( string.indexOf(target) ==! -1 ) ? true : false; 
		
		return result; 
	}, 

	search_on_massage_list_and_clean: function(messagens_list, target){
		for(var a = messagens_list.length-1; a != 0 ; a--){
			if(this.contains(target, messagens_list[a].user_name)){

				var text = target.replace(messagens_list[a].user_name, '').trim()
				
				
				//todo: fazer validação caso não existir o target;
				var targets = text.toString().split('/'); 
				console.log(messagens_list[a].text+'|'+targets[0] + '|'+messagens_list[a].text.indexOf(targets[0])); 

				if(messagens_list[a].text.indexOf(targets[0]) == -1){
					continue; 
				}

				var result = {
					id: a, 
					text: text 
				}; 

				return result; 
			}
		}
		return false; 
	}, 

	set_bold: function(text){
		return '<b>'+text+'</b>'; 
	}, 

	set_italic: function(text){
		return '<em>'+text+'</em>'; 
	}
}