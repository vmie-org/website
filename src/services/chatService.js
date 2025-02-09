export const ChatComponent = {
    props: ["chatService", "accountService", "take", "scopeId", "bus"],
    template: `
<div>
   <div>
        <div v-if="accountService.user" class="messages-area" id="messages">
            <div v-for="msg in chatService.messages" v-if="!msg.deleted && msg.scopeId == scopeId">
                <div class="message-item">
                    <span class="message-name" :class="accountService.user && msg.userId == accountService.user.id ? 'mine':''" :title="msg.name">{{msg.initials}}:</span>
                    <span class="message-text">
                    {{msg.message}}
                    <span class="actions">
                    <span class="float-right bin" @click="chatService.deleteMessage(msg)"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 11V17" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></span>
                    </span>
                    </span>
                </div>
            </div>
        </div>
        <div v-else class="alert alert-warning">
            <center>
                <div>You are not logged in</div>
                <a v-if="!accountService.user" href="https://vmie.org:5000/api/linkedin/login" @mouseenter="accountService.loginText = 'Login with Linkedin'" style="text-decoration: none; color: white; background-color: rgb(86, 145, 255) ;border: 1px solid gray; padding: 4px 10px 4px 5px; margin: 5px 5px 5px 10px; display: inline-block; border-radius: 5px;;" >
                    <strong><span style="color: rgb(255, 255, 255); font-family: Sans; border: 1px solid blue; border-radius: 2px; padding: 0px 5px">in</span>
                    Login with LinkedIn</strong>
                </a>
            </center>
        </div>
        <div class="message-area">
            <textarea 
                :disabled="chatService.msg.sending" 
                :placeholder="accountService.user ? 'Type your toughts' : 'Please login!'" 
                v-on:keyup.enter="chatService.sendMessage(scopeId)" 
                @click="accountService.checkPrivacyAgreement()" @keyup="chatService.countCharacters()" 
                v-model="chatService.msg.message" class="message-box"></textarea>
            <span @click="chatService.sendMessage(scopeId)" style="float: right; display: block; width: 32px; border-radius: 5px;">
                <div>
                    <svg width="48" height="48" viewBox="450 1070 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="black" fill="gray" d="m458.371 1079.75-6.633.375a.243.243 0 0 0-.22.17l-.964 3.255c-.13.418-.024.886.305 1.175a1.08 1.08 0 0 0 1.205.158l8.836-4.413c.428-.214.669-.677.583-1.167-.06-.346-.303-.633-.617-.79l-8.802-4.396a1.073 1.073 0 0 0-1.183.14c-.345.288-.458.77-.325 1.198l.963 3.25c.03.097.118.165.22.17l6.632.375s.254 0 .254.25-.254.25-.254.25" stroke-width="0.5"/>
                    </svg>
                </div>
            </span>
        </div>
        <small v-if="chatService.msg && accountService.user && chatService.msg.message && chatService.msg.message.length && chatService.msg.charactesLeft >= 0" class="text-secondary">{{chatService.msg.charactesLeft}} charactes left.</small>
        <small v-if="chatService.msg.charactesLeft < 0" class="text-danger">Your message was too long</small>
        <span v-if="chatService.dummyCont <= 0" @click="chatService.dummyCont = 20" class="messages-resume float-right">Continue</span></div>

        <div class="float-right">
            <a href="../site?page=Privacy">Privacy policy</a> 
            <span v-if="accountService.user && accountService.user.privacyAgreed" @click="accountService.showProfile()"> agreed by you</span>
        </div>
   </div>
</div>
`
}

let that = null;
export const chatService = {
    simulate: false,
    dummySentences: [
        "Lorem ipsum dolor sit amet.",
        "Consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore.",
        "Ut enim ad minim veniam.",
        "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident.",
        "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Phasellus fermentum odio eu feugiat pretium.",
        "Curabitur gravida arcu ac tortor dignissim.",
        "Vivamus magna justo, lacinia eget consectetur sed.",
        "Pellentesque in ipsum id orci porta dapibus.",
        "Proin eget tortor risus.",
        "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
        "Mauris blandit aliquet elit.",
        "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
        "Nulla quis lorem ut libero malesuada feugiat.",
        "Donec sollicitudin molestie malesuada.",
        "Cras ultricies ligula sed magna dictum porta.",
        "Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
        "Vivamus suscipit tortor eget felis porttitor volutpat.",
        "Sed porttitor lectus nibh.",
        "Curabitur aliquet quam id dui posuere blandit.",
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
        "Etiam porta sem malesuada magna mollis euismod.",
        "Donec id elit non mi porta gravida at eget metus.",
        "Cras mattis consectetur purus sit amet fermentum.",
        "Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
        "Maecenas sed diam eget risus varius blandit sit amet non magna.",
        "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh."
    ],
    dummyCont: 30,
    msg: {
        charactesLeft: 255,
        text: null,
        sending: false,
    },
    messages: [],
    search: null,

   
    initialize(apiService, accountService, bus, scopeId){
        this.apiService = apiService;
        this.accountService = accountService;
        this.bus = bus;
        this.scopeId = scopeId;
        that = this;
        if(this.simulate){

            setInterval(() => {
                this.dummyCont--;
                if(this.dummyCont < 0){
                    return;
                }
                let index = Math.floor(Math.random() * (this.dummySentences.length - 1));
                let name = "Anonymous User";
                let message = this.dummySentences[index];
                this.messages.push({
                    deleted: 0,
                    message: message,
                    name: name,
                    initials: that.buildAcronym(message).substring(0,2),
                    icon: name,
                });
                Vue.nextTick(() =>{
                    const container = document.querySelector("#messages");
                    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
                });
            }, 500);
        }
    },
    buildAcronym(str){
        var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
        return matches.join('').toUpperCase();
    },

    countCharacters(){
        this.msg.charactesLeft = 255 - (this.msg.message ? this.msg.message.length : 0);
        if(this.msg.charactesLeft < 0){
            this.msg.message = this.msg.message.substring(0, 255);
        }
    },
    sendMessage(scopeId){
        if(!this.accountService.user){
            this.accountService.user = {
                name: "Visitor " + Math.floor(Math.random() * 1000),
                isDummy: true,
            }
        }
        var message = this.msg.message.trim();
        var initials = this.accountService.user.name ? this.buildAcronym(this.accountService.user.name) : "AU";
        var data = { message: message, initials: initials, deleted: 0, scopeId: scopeId };
        if(this.simulate){
            this.messageSent();
        }
        else{
            this.apiService.postData("https://vmie.org:5000/api/chat/send", data, this.messageSent, this.messageNotSent);
        }
        this.msg.sending = true;
    },
    messageNotSent(){ 
        that.msg.sending = false;      
        that.messages.push({
            deleted: 0,
            message: "Unable to send your message",
            name: that.accountService.user.name ? that.accountService.user.name : "Anonymous User",
            initials: that.accountService.user.name ? that.buildAcronym(that.accountService.user.name) : "AU",
            icon: that.accountService.user ? that.accountService.user.avatarUrl : null,
        });
        Vue.nextTick(() =>{
            const container = document.querySelector("#messages");
            container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        });
    },
    messageSent(){   
        that.msg.sending = false;  
        var message = that.msg.message.trim();          
        that.messages.push({
            message: message,
            scopeId: that.msg.scopeId,
            name: that.accountService.user.name ? that.accountService.user.name : "Anonymous User",
            initials: that.accountService.user.name ? that.buildAcronym(that.accountService.user.name) : "AU",
            icon: that.accountService.user ? that.accountService.user.avatarUrl : null,
            deleted: false,
        });
        Vue.nextTick(() =>{
            const container = document.querySelector("#messages");
            container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        });
        that.msg.message = null;
    },
    receivedMessages(msg){
        var message = msg.message.trim();          
        this.messages.push({
            message: message,
            scopeId: msg.scopeId,
            name: msg.initials,
            initials: msg.initials,
            // icon: that.accountService.user ? that.accountService.user.avatarUrl : null,
            deleted: false,
        });
        Vue.nextTick(() =>{
            const container = document.querySelector("#messages");
            container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        });
    },
    loadMessages(){
        that = this;
        this.apiService.postData("https://vmie.org:5000/api/chat/list", { take: 50, scopeId: this.scopeId }, this.messagesListReceived);
    },
    searchMessages(){
        var found = [];
        for(var i =0; i<50;i++){
        var index = Math.floor(Math.random() * (this.dummySentences.length - 1));
            var name = "Anonymous User";
            found.push({
                deleted: 0,
                message: this.dummySentences[index],
                name: name,
                initials: this.buildAcronym(name),
                icon: name,
            });
        }
        this.messages = found;
        const container = document.querySelector("#messages");
        container.scrollTo({ top: 0, behavior: "smooth" });
        chatService.dummyCont = 0;
    },
    deleteMessage(msg){
        if(!this.accountService.user || this.accountService.user.isDummy){
            // Debug UI without a user
            msg.deleted = true;
        }
        that = this;
        this.apiService.postData("https://vmie.org:5000/api/chat/remove", {id: msg.id}, this.messageDeleted);
    },
    messageDeleted(msg){
        msg = that.messages.find(p=>p.id == msg.id);
        if(msg){
            msg.deleted = true;
        }
    },
    messagesListReceived(messages){
        messages.forEach(p => { 
            p.deleted = 0;
        });
        that.messages = messages;
        Vue.nextTick(() =>{
            const container = document.querySelector("#messages");
            container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        });
    },
}

export default {
    chatService
}
