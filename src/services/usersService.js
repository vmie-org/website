

export const UsersComponent = {
    props: ["parent", "bus"],
    template: `
<div>
   <div v-for="(user, index) in parent.users" v-if="user.name || user.avatarUrl">
      <table style="width: 80px">
         <tr>
            <td>
                  <img :src="user.avatarUrl" height="93" width="120" style="border: 1px solid gray; border-radius: 10px"/>
            </td>
         </tr>
         <tr>
            <td>
                  {{( user.name ? user.name :'Visitor')}}
            </td>
         </tr>
      </table>
   </div>
</div>
`
}

let that = null;
export const usersService = {
   simulate: location.hostname === "localhost",
   apiService: null,
   bus: null,
   users: [{sss:3}],
   
   initialize(apiService, bus){
        this.apiService = apiService;
        this.bus = bus;
        
    },
    loadUsers(){
      if(!this.apiService.jwt || this.simulate){
         this.users = [
            {
               name: "SIMUATION User 1",
               avatarUrl: "",
            },
            {
               name: "SIMUATION User 2",
               avatarUrl: "",
            },
            {
               name: "SIMUATION User 3",
               avatarUrl: "",
            },
         ];
         return;
      }
      that = this;
        this.apiService.postData("https://vmie.org:5000/api/user/list", { take: 20 }, this.usesListeceived);
    },
    usesListeceived(users){
        that.users = users;
    },
}

export default {
   UsersComponent,
   usersService
}
