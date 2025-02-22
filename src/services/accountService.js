export const SideMenuCompoonent = {
   props: ["accountService", "parent", "bus"],
   template: `
<div>
   <nav v-if="accountService.showComplex">
      <ul>
         <li v-for="page in parent.websitePages" 
         v-if="page.title && !page.alwaysHide" 
         :class="page.isSelected ? 'tag-h1 active' : 'tag-h2'"
         @click="parent.renderPage(page)">
            <span v-if="false && !page.id">
                <hr class="slim" style="width: 100px"/>
                <span class="float-left text-primary"><small>{{page.title}}</small></span>
            </span>
            <a v-if="page.id" :href="'../'+ page.url +'?page=' + page.id">{{page.title}}</a>
         </li>
      </ul>
   </nav>
</div>
   `
}

export const ModalProfileComponent = {
    props: ["parent", "bus"],
    template: `
<div>
<transition name="modal">
   <div class="modal-mask" v-if="parent.user && parent.showUserDeleted">
      <div class="modal-wrapper">
         <div class="modal-container" :class="parent.isMobile?'mobile':'w600'" :style="parent.isMobile?'max-height:'+parent.innerHeight+'px':''">
            <div>
               <div class="card" style="background-color: #F8F8F8;">
                  <div class="card-header">
                     <span class="card-title">
                     <span>Account Deleted</span>
                     </span>
                     <div class="float-right">
                        <div class="btn btn-light" v-on:click="parent.showUserDeleted = false" >
                           x
                        </div>
                     </div>
                  </div>
                  <div class="card-body">

                     <p>
                        Your user has been deleted. <br>
                        You can login with LinkedIn to create a new account. 
                     </p>
                  </div>
                  <div class="card-footer">
                     <div class="float-right" >
                        <div class="btn btn-secondary" v-on:click="parent.showUserDeleted = false">Close</div>
                     </div>
                  </div>
                  
               </div>
            </div>
         </div>
      </div>
   </div>
</transition>

<transition name="modal">
   <div class="modal-mask" v-if="parent.user && parent.showUserProfile">
      <div class="modal-wrapper">
         <div class="modal-container" :class="parent.isMobile?'mobile':'w600'" :style="parent.isMobile?'max-height:'+parent.innerHeight+'px':''">
            <div>
               <div class="card" style="background-color: #F8F8F8;">
                  <div class="card-header">
                     <span class="card-title">
                     <span class="btn btn-primary" @click="parent.logout()">Logout</span>
                     </span>
                     <div class="float-right">
                        <div class="btn btn-light" v-on:click="parent.showUserProfile = false" >
                           x
                        </div>
                     </div>
                  </div>
                  <div class="card-body">

                  <div @click="parent.showCustomPrivacy = !parent.showCustomPrivacy; parent.showOnlyPrivacyAgreement = false">Subscription lists: <span class="text-secondary" v-if="!parent.showCustomPrivacy || parent.showOnlyPrivacyAgreement">expand</span></div>
                  <div v-if="parent.showCustomPrivacy && !parent.showOnlyPrivacyAgreement">
                   <div>
                     <div v-for="(user, index) in parent.profileTypes" @click="user.selected = !user.selected"
                     :style="user.selected ? 'background-color: #dfd':'background-color: #eee'" 
                     style="margin: 5px; padding: 3px 5px; border: 1px solid gray; border-radius: 5px; display: inline-block">
                           <span>
                                 <img :src="user.avatarUrl" height="32" width="32" style="border: 1px solid gray; border-radius: 5px"/>
                           </span>
                             
                              <b><input type="checkbox" v-model="user.selected"> {{( user.name ? user.name :'Visitor')}}</b>
                     </div>
                     <a class="btn btn-success float-right" href="./../developer?page=Developer">Contribute as Developer</a>
                     </div>
                     </div>

                     <hr>
                     <div @click="parent.showMessengerPrivacy = !parent.showMessengerPrivacy; parent.showOnlyPrivacyAgreement = false">Messenger Privacy <span class="text-secondary" v-if="!parent.showMessengerPrivacy || parent.showOnlyPrivacyAgreement">expand</span></div>
                     <div v-if="parent.showMessengerPrivacy">
                        <div v-if="false" class="alert alert-warning">
                           <div class="btn btn-light" v-on:click="parent.deleteConversations()" title="Delete all my conversations from vmie">
                              Autohide my messages after 
                              <div class="btn btn-light">1 day</div>
                              <div class="btn btn-light">7 days</div>
                              <div class="btn btn-primary">30 days</div>
                           </div>
                           <div>We can <b>auto-hide</b> your your messages on an expiration policy.</div>
                           <small style="color: gray">Messages that are pinned or voted by other members will not auto-hide. We will continue to periodically process messages even while they are hiddden.</small>                        
                        </div>
                        <div v-if="parent.user" class="alert alert-warning">
                           <div class="btn float-right" :class="parent.user.privacyAgreed ? 'btn-light':'btn-secondary'"  
                              title="I agree privacy policy"><input type="checkbox" v-on:change="parent.updateAccountPrivacy()" v-model="parent.user.privacyAgreed" id="privacyPolicy"> <label style="margin-bottom: 0" for="privacyPolicy">I agree</label></div>
                           <div>Interacting with vmie requires you to agree our <a href="../site?page=Privacy">Privacy policy</a> and <a href="../site?page=Privacy">Terms and conditions</a></div>
                           <small v-if="!parent.user.privacyAgreed" style="color: gray">You haven't agreed our privacy policy yet.</small>                        
                           <small v-if="parent.user.privacyAgreed" style="color: gray">You agreed our privacy policy.</small>                        
                        </div>
                        <div class="alert alert-warning" v-if="!parent.showOnlyPrivacyAgreement">
                           <div class="btn btn-danger float-right" v-on:click="parent.deleteConversations()" title="Delete all my conversations from vmie">Delete all my conversations</div>
                           <div>You can <b>delete all</b> your conversations from vmie.</div>
                           <small style="color: gray">We periodically process conversations to build knoekedge and support decisions. Do not include sensitive information in your messsages.</small>                        
                        </div>
                     </div>
                     
                     <hr>
                     
                     <div @click="parent.showOverallPrivacy = !parent.showOverallPrivacy; parent.showOnlyPrivacyAgreement = false">Overall Privacy <span class="text-secondary" v-if="!parent.showOverallPrivacy || parent.showOnlyPrivacyAgreement">expand</span></div>
                        <div v-if="parent.showOverallPrivacy && !parent.showOnlyPrivacyAgreement">
                        <div class="alert alert-warning">
                           <div class="btn btn-secondary float-right" v-on:click="parent.user.nameVisibility = 1; parent.updateAccount()" v-if="!parent.user.nameVisibility" title="Make your name public">show my Name</div>
                           <div class="btn btn-secondary float-right" v-on:click="parent.user.nameVisibility = 0; parent.updateAccount()" v-if="parent.user.nameVisibility" title="Make your name private">hide my Name</div>
                           <div>Your name is now <b v-if="parent.user.nameVisibility">visible</b><b v-if="!parent.user.nameVisibility" style="color: red; font-weight: bold;">not visible</b> to all users.</div>
                           <small style="color: gray">Collected at signin from Linkedin.</small>                        
                        </div>
                        <div class="alert alert-warning">
                           <div class="btn btn-secondary float-right" v-on:click="parent.user.avatarVisibility = 1; parent.updateAccount()" v-if="!parent.user.avatarVisibility" title="Make your image public">show my Image</div>
                           <div class="btn btn-secondary float-right" v-on:click="parent.user.avatarVisibility = 0; parent.updateAccount()" v-if="parent.user.avatarVisibility" title="Make your image private">hide my Image</div>
                           <div>Your avatar is now <b v-if="parent.user.avatarVisibility">visible</b><b v-if="!parent.user.avatarVisibility" style="color: red; font-weight: bold;">not visible</b> to all users.</div>
                           <small style="color: gray">Collected at signin from Linkedin.</small>  
                        </div>

                        <p v-if="!parent.user.nameVisibility || !parent.user.avatarVisibility">
                           For transparecy of decisions, we advice you to keep your information public. If you hide your personal information from other members your influence in making decisions can be affected.
                        </p>
                     </div>
                     <div class="float-right"><a href="../site?page=Privacy">Privacy policy</a></div>
                  </div>
                  <div class="card-footer">
                     <div class="float-left">
                        <div class="btn btn-danger" v-on:click="parent.deleteAccount()">Delete my account</div>
                     </div>
                     <div class="float-right" >
                        <div class="btn btn-secondary" v-on:click="parent.showUserProfile = false">Close</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</transition>
</div>
`
}

let that = null;
export const accountService = {
    disclaimer: "pending registration as non-profit",
    simulate: location.hostname === "localhost",
    user: null,
    showUserProfile: false,
    showUserDeleted: false,
    showMessengerPrivacy: true,
    showOverallPrivacy: true,
    showCustomPrivacy: true,
    showCustomPrivacy: true,
    showOnlyPrivacyAgreement: false,
    isMobile: window.screen.width < 500,
    apiService: null,
    bus: null,
    chat: null,
    showComplex: false,
    innerHeight: window.innerHeight,
    profileTypes: [
      {
         name: "Veterinary",
         selected: "",
         avatarUrl: "../img/icon/doctor.png",
      },
      {
         name: "Software",
         selected: "",
         avatarUrl: "../img/icon/code.png",
      },
      {
         name: "Owner",
         selected: "",
         avatarUrl: "",
         avatarUrl: "../img/icon/owner.png",
      },
      {
         name: "Company",
         selected: "",
         avatarUrl: "../img/icon/company.png",
      },
      {
         name: "Visitor",
         selected: "",
         avatarUrl: "../img/icon/visitor.png",
      },
    ],
    loginText: "Login",
    

    initialize(apiService, chat, bus){
        this.apiService = apiService;
        this.bus = bus;
        this.chat = chat;
        
        if(this.simulate){
            that = this;
            this.userSessionReceived({jwt: "SIMUATION"});
        }
        
        let session = localStorage.getItem('session');
        if(session){
            session = JSON.parse(session);
            if(session){
               that = this;
                apiService.jwt = session.jwt;
                accountService.getUserInfo();
            }
        }
        else if(!apiService.jwt){
            let sessionId = this.apiService.findGetParameter('session');
            if(sessionId){
                accountService.getUserSession(sessionId);
            }
            else{
               that = this;
               this.noUserInfoReceived();
            }
        }
    },    
    checkPrivacyAgreement(){
        if(this.user && !this.user.privacyAgreed) {
            this.showProfile();
        }
    },
    showProfile(){
        this.showUserProfile = true;
    },
    updateAccount(){
        this.apiService.postData("https://vmie.org:5000/api/user/info", this.user, this.userInfoReceived);
    },
    updateAccountPrivacy(){
        this.apiService.postData("https://vmie.org:5000/api/user/privacy/agreement/" + (this.user.privacyAgreed ? 'true':'false'), null, this.userInfoReceived);
    },
    deleteAccount(){
        this.apiService.postData("https://vmie.org:5000/api/user/delete", this.user, this.userInfoReceived);
    },
    setMessageLife(lifetime)
    {
        this.apiService.postData("https://vmie.org:5000/api/chat/life", {seconds: lifetime}, this.deleteConversationsCompleted);
    },
    deleteConversations()
    {
        this.apiService.postData("https://vmie.org:5000/api/chat/erase", null, this.deleteConversationsCompleted);
    },
    deleteConversationsCompleted(){
        this.warning = "Your conversations have been deleted. You can continue using chat."
    },
    getUserSession(sessionId){
      that = this;
      this.apiService.getData("https://vmie.org:5000/api/user/session?session=" + sessionId, this.userSessionReceived, this.noUserInfoReceived);
    },
    userSessionReceived(session){
        localStorage.setItem("session", JSON.stringify(session));
        that.apiService.jwt = session.jwt;
        that.getUserInfo();
    },
    getUserInfo(){
        if(this.simulate){
            this.userInfoReceived({
                name: "SIMUATION",
                jvt: "simulation-JWT",
                avatarUrl: "https://vmie.org/img/vmie.ico"
            });
            return;
        }
        that = this;
        this.apiService.getData("https://vmie.org:5000/api/user/info", this.userInfoReceived, this.noUserInfoReceived);
    },
    noUserInfoReceived(data){
        that.user = null;
        that.bus("MissingUser");
        if(data.status = 401){
            localStorage.removeItem("session");
            that.apiService.jwt = session.jwt;
        }
    }, 
    logout(){
         localStorage.removeItem("session");
         this.user = null;
        this.apiService.getData("https://vmie.org:5000/api/logout");
    },
    login(){
        this.apiService.getData("https://vmie.org:5000/api/linkedin/login");
        ///apiService.getData("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77uny28orqmlmv&redirect_uri=https://vmie.org:5000/api/linkedin/callback&scope=profile%20email%20openid&state=fabaecf3-288e-4c22-bc2c-c07208231f97");
        //apiService.getData("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77uny28orqmlmv&redirect_uri=https://vmie.org:5000/api/linkedin/callback&scope=profile%20email%20openid&state=fabaecf3-288e-4c22-bc2c-c07208231f97");
    },
    userInfoReceived(user){
        if(user && user.name == 'DELETED'){
            that.showUserProfile = false;
            that.showUserDeleted = true;
            return;
        }
        that.showOnlyPrivacyAgreement = user && !user.privacyAgreed,
        that.user = user;
        that.bus("UserUpdated");
        that.openStream();
    },

    // Event stream
    openStream(){
        this.pageUpdatedAt = moment().utc().unix();
        /*
        var endpoint = "https://vmie.org:5000/api/stream";
        const eventSource = new EventSource(endpoint, {
            headers: {
                "Authorization": "Bearer " + this.apiService.jwt
            }
        });

        eventSource.onopen = this.onEventSourceOpen;
        eventSource.onmessage = this.onEventSourceMessage;
        eventSource.onerror = this.onEventSourceError
        eventSource.addEventListener("message",  this.EventListener);
        */
        that = this;
        fetch("https://vmie.org:5000/api/stream", {
               headers: { "Authorization": "Bearer " + this.apiService.jwt }
         })
         .then(response => {
               const reader = response.body.getReader();
               reader.read().then(function processText({ done, value }) {
                  if (done) return;
                  let message = new TextDecoder().decode(value);
                  if(message && message[0] == 'm'){
                     that.chat(JSON.parse(message.substring(4)));
                  }
                  reader.read().then(processText);
               });
         });
    },

    onEventSourceOpen(event, a, b, c) {
        console.log("WSS connection is open");
    },

    onEventSourceMessage(event, a, b, c) {
        console.log("WSS connection is open");
    },

    onEventSourceError(event, a, b, c) {
        console.log("WSS connection is open");
    },

    EventListener(event, a, b, c) {
        console.log("WSS connection is open");
    },
}

export default {
   accountService,
   ModalProfileComponent,
   SideMenuCompoonent
}
