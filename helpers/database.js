mysql = require('mysql');
utf8  = require('utf8'); 

function Database () {
	var user  = 'root'; 
	var host = '127.0.0.1'; 
	var database = 'bot'; 
	var password = 'phprs'; 

	var credentiais = {
		host: host, 
		user: user, 
		password: password, 
		database: database
	}; 

	this.conn = mysql.createConnection(credentiais); 
}; 

Database.prototype.mysql_real_escape_string = function  (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}; 

Database.prototype.insert = function(msg){
	console.log(msg); 
	console.log('---------'); 
	var text = this.mysql_real_escape_string(utf8.encode(msg.text)); 
	var chat_id = msg.from.id; 
	var name = this.mysql_real_escape_string(utf8.encode(msg.from.first_name)); 
	var telegram_id = msg.message_id;
	var replay_to_id = null;

	if (msg.reply_to_message != undefined ){
		if(msg.reply_to_message.photo != undefined) return; 
		replay_to_id = msg.reply_to_message.message_id
	}

	query  = `INSERT INTO messages (telegram_id, name, chat_id, msg, replay_to_id) VALUES (${telegram_id}, \'${name}\', ${chat_id}, \'${text}\', ${replay_to_id})`;
	
	this.conn.query(query, (err, result, fields) => {
		if (err) throw console.log(err); 
		console.log('Persisted ok'); 
	}); 
}; 


module.exports = new Database()