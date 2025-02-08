

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
                     <p>
                        Messenger Privacy
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
                     <div class="alert alert-warning">
                        <div class="btn btn-danger float-right" v-on:click="parent.deleteConversations()" title="Delete all my conversations from vmie">delete all my conversations</div>
                        <div>You can <b>delete all</b> your conversations from vmie.</div>
                        <small style="color: gray">We periodically process conversations to build knoekedge and support decisions. Do not include sensitive information in your messsages.</small>                        
                     </div>
                     Overall Privacy
                     </p>
                     <p>
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
                     </p>
                     <p v-if="!parent.user.nameVisibility || !parent.user.avatarVisibility">
                        For transparecy of decisions, we advice you to keep your information public. If you hide your personal information from other members your influence in making decisions can be affected.
                     </p>
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
    simulate: location.hostname === "localhost",
    user: null,
    showUserProfile: false,
    showUserDeleted: false,
    isMobile: window.screen.width < 500,
    apiService: null,
    bus: null,
    showComplex: false,
    innerHeight: window.innerHeight,
    

    initialize(apiService, bus){
        this.apiService = apiService;
        this.bus = bus;
        
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
    showProfile(){
        this.showUserProfile = true;
    },
    updateAccount(){
        this.apiService.postData("https://vmie.org:5000/api/user/info", this.user, this.userInfoReceived);
    },
    updateAccountPrivacy(){
        this.apiService.postData("https://vmie.org:5000/api/user/privacy/agreement/" + (this.accountService.user.privacyAgreed ? 'true':'false'), null, this.userInfoReceived);
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
      this.apiService.getData("https://vmie.org:5000/api/user/session?session=" + sessionId, this.userSessionReceived);
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
    }, 
    logout(){
         localStorage.removeItem('session');
         this.user = null;
        this.apiService.getData("https://vmie.org:5000/api/logout");
    },
    login(){
        this.apiService.getData("https://vmie.org:5000/api/linkedin/login");
        ///apiService.getData("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77uny28orqmlmv&redirect_uri=https://vmie.org:5000/api/linkedin/callback&scope=profile%20email%20openid&state=fabaecf3-288e-4c22-bc2c-c07208231f97");
        //apiService.getData("https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77uny28orqmlmv&redirect_uri=https://vmie.org:5000/api/linkedin/callback&scope=profile%20email%20openid&state=fabaecf3-288e-4c22-bc2c-c07208231f97");
    },
    userInfoReceived(user){
        // this.simulate = false;
        // this.messages = [];
        if(user && user.name == 'DELETED'){
            that.showUserProfile = false;
            that.showUserDeleted = true;
            return;
        }
        that.user = user;
        that.bus("UserUpdated");
    },
}

export default {
    ModalProfileComponent,
    accountService
}
