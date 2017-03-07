var helper = require('./helpers/functions.js'); 
var TelegramBot = require('node-telegram-bot-api'); 
var DB = require('./helpers/database.js'); 

var token = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

var bot = new TelegramBot(token, { polling: true });

var bot_name = 'Tifofolipito'; 
var messages_list = []; 

bot.on('message', function(incoming) {
  if(incoming.text == undefined){
    console.log('Mensagem inválida.'); 
    return; 
  }

	var msg = {
		user_name: '@'+ incoming.from.username, 
		text: incoming.text || undefined, 
    id: incoming.message_id
	}; 

	messages_list.unshift(msg);

	if(messages_list.length == 5000)
		messages_list.pop(); 

	if(helper.contains(incoming.text, bot_name))
		bot.sendMessage(incoming.chat.id, "Sou um ser onipresente e onisciente. Cuidado...."); 

  DB.insert(incoming)
}); 

bot.onText(/\/c (.+)/, function (msg, match) {
  var chat_id = msg.chat.id;
  var resp = match[1];
 
  // console.log(match); 
  var to_replace = helper.search_on_massage_list_and_clean(messages_list, resp)
 
  var to_send = '';  
  if(!to_replace){
    bot.sendMessage(chat_id, "Não consegui achar a mensagem desse usuário. "); 
    return; 
  }
  
  // console.log(to_replace); 
  var targets = to_replace.text.split('/'); 

  var message = messages_list[to_replace.id]; 

  to_send = message.text.replace(targets[0].trim(), helper.set_bold(targets[1])) 
   
  var msg = 'O <b>'+message.user_name.replace('@','')+'</b> quiz dizer:\n\n-- "'+to_send+'"';  
  var op ={
    parse_mode: 'html',
    reply_to_message_id: message.id
  }; 

  bot.sendMessage(chat_id, msg, op);
});

bot.onText(/\/version (.+)/, function (msg, match) {
	var chat_id = msg.chat.id; 
	bot.sendMessage(chat_id, "Tifofolipito versão 0.0.4 pré Alpha (ou seja, cheio de bugs). Usem com cautela. By Guepardão\n\nChange log versão 0.0.2:\n* Bug de ordenação de mensagens.\n\nChange log versão 0.0.3:\n* Estilização de mensagens;\n* Menção a mensagem original;\n* Procura recursiva por última mensagem do usuário alvo que apresenta o padrão de busca.\n\nChange log versão 0.0.4:\n* Correção de bug de identificação de alvo de troca;\n* Evitando que mensagens sem texto entrem no índice de procura."); 
}); 