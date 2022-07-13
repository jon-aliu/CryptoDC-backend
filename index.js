var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
//////////////////////////////////////////////////////////////


const keepAlive = require("./server")
const { Client, Intents,MessageEmbed} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const axios = require("axios");
require("dotenv").config();


client.on("ready", () => {
  console.log("Our bot is ready to go!!!!");
  console.log("Logged in as", client.user.tag);

});



client.on("ready", () => {
  setInterval(()=>{
    let usersRef = db.collection('users');
    const snapshot = usersRef.get();
    var executed = false;

    usersRef.get().then((snapshot)=>{

      snapshot.forEach(doc=>{
      var datas = doc.data()
      if(datas?.status==true ){
      
        var alert = (function() {
          var executed = false;
          return function() {
              if (!executed) {
                  executed = true;
                ///
                    if(datas?.watchList[0] !=null){
                    const url = `https://api.coingecko.com/api/v3/coins/${datas?.watchList[0].id}?localization=false&sparkline=true`;
                    axios
                      .get(url)
                      .then((res) => {
                        handleResult(res);
                      })
                      .catch((err) => console.log(err));
      
                      function handleResult(data) {
                          const {market_cap_rank,market_data,name,image,symbol}=data.data
      
                          const succesEmbed = new MessageEmbed()
                            .setColor('#437512')
                            .setThumbnail(image.small)
                            .setTitle("CryptoDC")
                            .setURL('https://cryptodc.com/account')
                            .setDescription('www.cryptodc.com/account')
                            .addFields(
                              { name: '# Rank', value: `${market_cap_rank}`, inline: true },     
                              { name: 'Name', value: `${name}(${symbol.toUpperCase()})`, inline: true },
                              { name: 'Price', value: `${market_data.current_price.usd}$`, inline: true },
                              )
                            .setTimestamp()
                            .setFooter({ text: 'CryptoDC', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
                        
                          
                          client.users.fetch(datas?.dc_id).then((user)=>{
                            user.send({embeds : [succesEmbed]});
                            console.log("[+] sent a message to :"+`${user.username}`+`#${user. discriminator}`)
                          }).catch((err)=>{
                            console.log("[-] an error while sending a message to :"+`${user.username}`+`#${user. discriminator}`)
                          });
                      }
                  }
                
                  else if(datas?.watchList[0] ==null){
                    client.users.fetch(datas?.dc_id).then((user)=>{
                      user.send("Add your favorite crypto coin in watchlist in your account!");
                      console.log(user)
                      console.log("[+] |favError| sent a message to :"+`${user.username}`+`#${user. discriminator}`)
                    }).catch((err)=>{
                      console.log("[-]|favError| an error while sending a message to :"+`${user.username}`+`#${user. discriminator}`)
                    })
                  }
                  else(
                    console.log("error")
                  )
                ///
              }
          };
      })();
        
         alert();    
  }
  else{
    console.log("[-]|statusFalse| sending a message to :"+`${datas?.dc_id}`)
  }
  })


})

},((3600)*1000))
})

client.on("messageCreate",(msg)=>{
  if(msg.content==='!myid'){
    const channel= client.channels.cache.find(channel=>channel.id === '996097458306293761')
    channel.send(msg.author.username + " Your ID is:" )
    channel.send(msg.author.id)
  }

})


keepAlive()
client.login(process.env.BOT_TOKEN)
