export const PetHeaderComponent = {
    props: ["petService", "accountService", "parent", "bus"],
    template: `<div>

    <span @click="petService.generatePetId()" class="btn btn-success float-right">Get a free PetId</span>
    <a v-if="parent.selectedPage.url != 'pets'" href="./../pets/?page=Explorer" class="btn btn-secondary float-left">Explore nearby</a>
    <a v-if="parent.selectedPage.url == 'pets'" href="./../owner/?page=Pets" class="btn btn-secondary float-left">Show my pets</a>
    <br>
    <br>
<transition name="modal">
   <div class="modal-mask" v-if="petService.showPetIdDisclaimer">
      <div class="modal-wrapper">
         <div class="modal-container" :class="accountService.isMobile?'mobile':'w600'" :style="accountService.isMobile?'max-height:'+parent.innerHeight+'px':''">
            <div>
               <div class="card" style="background-color: #F8F8F8;">
                  <div class="card-header">
                     <span class="card-title">
                     <span>PetId Agreement</span>
                     </span>
                     <div class="float-right">
                        <div class="btn btn-light" v-on:click="petService.showPetIdDisclaimer = false" >
                           x
                        </div>
                     </div>
                  </div>
                  <div class="card-body">

<div style="text-align: left;">
    <div v-if="petService.showPetIdDisclaimer" class="alert alert-warning">
        <center style="color: black; font-weight: bold; text-sixe: large">PetId Agreement</center>
        
            <div style="border: 1px solid gray; padding: 10px; border-radius: 10px">
            <b>What ePetId is not</b>
            <ul>
                <li>- <span style="font-weight: bold; color: red">is not a replacement of the official identification</span> that is required by your jurisdiction, like a microchip. Please see the UK regulations: <a href="https://www.gov.uk/get-your-dog-cat-microchipped">Get your dog or cat microchipped</a></li>
                <li>- is not a proof of property/ownership.</li>
                <li>- is not enforced or regulated</li>
            </ul>

            <b>What is ePetId</b>
            <ul>
                <li>- a generated on-demand number to be used in data exchange applications that align with vmie open standards in Veterinary Medicine Information Exchange</li>
                <li>- is not bounded to a jurisdiction and therefore can be used anywhere</li>
                <li>- is free and easy to manage</li>
            </ul>

            <div>
                <div><a href='../data'>How will we use this data?</a></div>
                <div><a href='../site'>What is the purpose of this site?</a></div>
            </div>
            </div>

            <div class="float-right" style="color: black" v-if="true || !petService.agreementAccepted">
                <input data-testId="" id="PrivacyAgreement" type="checkbox" v-model='petService.agreementAccepted' />
                <label for="PrivacyAgreement">I agree with the <a style="color: orange" href="https://stocktech.org/docs/PrivacyPolicy.html">Privacy Agreement</a></label>
                <div v-if="petService.agreementAccepted" style="font-weight: bold; font-size: large; color: #856404">
                    <div class="btn btn-success float-right" @click="petService.createPet()">Continue</div>
                </div>
            </div>
            <br>
        <br>
        <br>
    </div>
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

export const PetEditorComponent = {
    props: ["petService", "accountService", "parent", "bus"],
    template: `
    <div>

<transition name="modal">
<div class="modal-mask" v-if="petService.showPetEditor">
   <div class="modal-wrapper">
      <div class="modal-container" :class="accountService.isMobile?'mobile':'w600'" :style="accountService.isMobile?'max-height:'+parent.innerHeight+'px':''">
         <div>
            <div class="card" style="background-color: #F8F8F8;">
               <div class="card-header">
                  <div class="float-right">
                     <div class="btn btn-light" v-on:click="petService.showPetEditor = false" >
                        x
                     </div>
                  </div>
                  <span class="card-title">
                  <div>Update Pet Info</div>
                  <small style="color: gray">{{petService.petId}}</small>
                  </span>
               </div>
               <div class="card-body">

    <div v-if="petService.showPetEditor">
                
        <div v-if="petService.selectedPet.real.petId" @click="petService.showPetNameEditor = !petService.showPetNameEditor">
            Pseudo Name: 
            <span class="pet-name">{{petService.selectedPet.name}}</span>
            <div v-if="petService.isEditing && petService.selectedPet && petService.showPetNameEditor">
                <span class="btn btn-light" @click.stop="petService.updateCustomOffset(petService.selectedPet, +1)">Prev pseudo-name</span>
                <span class="btn btn-light" @click.stop="petService.updateCustomOffset(petService.selectedPet, -1)">Next pseudo-name</span>
            </div>
            <div v-if="petService.isEditing && petService.selectedPet.name && petService.showPetNameEditor" @click.stop="petService.showPetNameEditor = false" class="link float-right">
                <span class="text-primary">ok</span>
            </div>
        </div>
        <div v-if="petService.isEditing && petService.selectedPet && petService.showPetNameEditor">
            <div>Real name:</div>
            <input class="message-box" style="width: 250px; border: 1px solid gray" v-model="petService.selectedPet.real.name" />
            <div class="text-secondary">This property is private</div>
        </div>
                
        <hr v-if="petService.isEditing">

        <div @click="petService.showPetAgeEditor = !petService.showPetAgeEditor">
            Pet age: 
            <span class="text-secondary">{{petService.humanAge(petService.selectedPet.real.dob)}}</span>
            <div v-if="petService.isEditing && petService.selectedPet.real.dob && petService.showPetAgeEditor" @click.stop="petService.showPetAgeEditor = false" class="link float-right">
                <span class="text-primary">ok</span>
            </div>
        </div>
        <div v-if="petService.isEditing && petService.selectedPet && petService.showPetAgeEditor">
            <input class="message-box" style="width: 200px; border: 1px solid gray" v-model="petService.selectedPet.real.dobText" type="date" v-on:change="petService.setDob(petService.selectedPet, $event.target.value)" />
            <span class="text-danger"></span>
        </div>
          
        <hr v-if="petService.isEditing">

        <div @click="petService.showPetTypeSelector = !petService.showPetTypeSelector">Pet Type: 
        <span class="text-secondary">{{petService.selectedPet.petType.name}}</span>
        <div v-if="petService.isEditing && petService.selectedPet.petType.id && petService.showPetTypeSelector" @click.stop="petService.showPetTypeSelector = false" class="link float-right">
            <span class="text-primary">ok</span>
        </div>
        </div>
        <div v-if="petService.isEditing && petService.selectedPet && petService.showPetTypeSelector">
            <div v-if="!petService.showRangeEditor"  >
                <select @change="petService.petTypeChanged(value)" v-bind:value="petType" v-model="petService.selectedPet.petType" class="message-box" style="width: 200px; border: 1px solid gray">
                    <option v-for="petType in petService.petTypes" :value="petType">{{petType.name}}</option>
                </select>
            </div>
            <div v-if="petService.showRangeEditor">
                <div 
                v-for="(petType, index) in petService.petTypes" 
                @click="petService.petTypeChanged(petType)"
                v-if="petService.showMorePetType || index < 6"
                :style="petService.selectedPet.petType == petType ? 'background-color: #dfd':'background-color: #eee'" 
                style="margin: 5px; padding: 3px 5px; border: 1px solid gray; border-radius: 5px; display: inline-block">
                    <b>
                    <input type="radio" 
                        name="petType" 
                        :selected="petService.selectedPet.petType == petType" 
                        :id="'petType_'+petType.id" 
                        :value="petType" 
                        v-model="petService.selectedPet.petType"/>
                    {{ petType.name }}
                    </b>
                </div>
                <div v-if="petService.petTypes.length > 6 && !petService.showMorePetType" @click="petService.showMorePetType = !petService.showMorePetType" class="link float-right">
                    <span class="text-primary">show more options</span>
                
                    <br>
                </div>
            </div>
        </div>
          
        <hr v-if="petService.isEditing">

        <div @click="petService.showPetReproductivitySelector = !petService.showPetReproductivitySelector">State: 
        <span class="text-secondary">{{petService.selectedPet.reproductivity.name}}</span>
        <div v-if="petService.isEditing && petService.selectedPet.reproductivity.id && petService.showPetReproductivitySelector" @click.stop="petService.showPetReproductivitySelector = false" class="link float-right">
            <span class="text-primary">ok</span>
        </div>
        </div>
        <div v-if="petService.isEditing && petService.selectedPet && petService.showPetReproductivitySelector">
            <div v-if="!petService.showRangeEditor"  >
                <select @change="petService.petReproductivityChanged(petType)" v-bind:value="petType" v-model="petService.selectedPet.reproductivity" class="message-box" style="width: 200px; border: 1px solid gray">
                    <option v-for="petType in petService.petReproductivity" :value="petType">{{petType.name}}</option>
                </select>
            </div>
            <div v-if="petService.showRangeEditor">
                <div 
                v-for="(petType, index) in petService.petReproductivity" 
                @click="petService.petReproductivityChanged(petType)"
                v-if="petService.showMoreReproductivityType || index < 5"
                :style="petService.selectedPet.reproductivity == petType ? 'background-color: #dfd':'background-color: #eee'" 
                style="margin: 5px; padding: 3px 5px; border: 1px solid gray; border-radius: 5px; display: inline-block">
                    <b>
                    <input type="radio" 
                        name="reproductivity" 
                        :selected="petService.selectedPet.reproductivity == petType" 
                        :id="'reproductivityType_'+petType.id" 
                        :value="petType" 
                        v-model="petService.selectedPet.reproductivity"/>
                    {{ petType.name }}
                    </b>
                </div>
                <div v-if="petService.petReproductivity.length > 5 && !petService.showMoreReproductivityType" @click="petService.showMoreReproductivityType = !petService.showMoreReproductivityType" class="link float-right">
                    <br>
                    <span class="text-primary">show more options</span>
                    <br>
                </div>
            </div>
        </div>
  
        <hr v-if="petService.isEditing">

        <div @click="petService.showPetWeightSelector = !petService.showPetWeightSelector">Weight: 
        <span class="text-secondary">{{petService.selectedPet.weightRange.name}}</span>
        <div v-if="petService.isEditing && petService.selectedPet.weightRange.id && petService.showPetWeightSelector" @click.stop="petService.showPetWeightSelector = false" class="link float-right">
            <span class="text-primary">ok</span>
        </div>
        </div>
        <div v-if="petService.isEditing && petService.selectedPet && petService.showPetWeightSelector">
            <div v-if="!petService.showRangeEditor">
                <input @keyup="petService.updateWeight()" class="message-box" style="width: 200px; border: 1px solid gray" v-model="petService.selectedPet.weight"> 
                <span class="message-box-right">Kg</span>
            </div>
            <div v-if="petService.showRangeEditor">
                <div 
                v-for="(petType, index) in petService.petRWeightRange" 
                @click="petService.petWeightRangeChanged(petType)"
                v-if="petService.showMoreWeightType || index < 5"
                :style="petService.selectedPet.weightRange == petType ? 'background-color: #dfd':'background-color: #eee'" 
                style="margin: 5px; padding: 3px 5px; border: 1px solid gray; border-radius: 5px; display: inline-block">
                    <b>
                    <input type="radio" 
                        name="weightRange" 
                        :selected="petService.selectedPet.weightRange == petType" 
                        :id="'weightRange_'+petType.id" 
                        :value="petType" 
                        v-model="petService.selectedPet.weightRange"/>
                    {{ petType.name }}
                    </b>
                </div>
                <div v-if="petService.petRWeightRange.length > 5 && !petService.showMoreWeightType" @click="petService.showMoreWeightType = !petService.showMoreWeightType" class="link float-right">
                    <br>
                    <span class="text-primary">show more options</span>
                    <br>
                </div>
            </div>
    </div>

    <br>
    <br>
    <div class="float-right">
        <span @click="petService.closeEditor()" class="btn btn-secondary" v-if="true || (petService.selectedPet.petType.id && petService.selectedPet.reproductivity.id && petService.selectedPet.weightRange.id)">
            Close
        </span>
        <span v-if="petService.isEditing" class="btn btn-success" @click="petService.savePet(petService.selectedPet)">
            Save
        </span>
        <span v-if="!petService.isEditing" class="btn btn-success" @click="petService.editPet()">
            Edit
        </span>
    </div>
    <div>
        <span v-if="petService.selectedPet.real" class="btn btn-danger" @click="petService.deletePet(petService.selectedPet)">
            Delete this pet
        </span>
    </div>
    <span v-show="false">{{petService.index}}</span>
    <br>
    <br>
    </div>


                  
</div>
</div>
</div>
</div>
</div>
</div>
</transition>

    </div>`
}

let that = null;
export const petService = {
    bus: null,
    jwt: null,
    petId: null,
    agreementAccepted: null,
    showPetIdDisclaimer: false,

    showPetTypeSelector: true,
    showPetReproductivitySelector: true,
    showPetWeightSelector: true,
    showPetNameEditor: true,
    showPetAgeEditor: true,

    showRangeEditor: false,

    showMorePetType: false,
    showMoreReproductivityType: false,
    showMoreWeightType: false,

    showPetEditor: false,
    isEditing: false,
    petsList: [],

    search: {
        postcode: null,
        distance: 5,
        petType: {petType: 'Select One'},
        take: 20
    },


    initialize(apiService, accountService, chat, bus){
        this.apiService = apiService;
        this.accountService = accountService;
        this.bus = bus;
    },


    selectedPet: null,

    distances: [0, 1, 3, 5, 10, 30, 100],

    petRWeightRange: [
        {
            id: 1,
            value: 1,
            name: "0.5kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 2,
            value: 2,
            name: "1.5kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 3,
            value: 3,
            name: "2kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 4,
            value: 5,
            name: "2.5kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 5,
            value: 5,
            name: "3kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 6,
            value: 5,
            name: "4kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 7,
            value: 5,
            name: "5kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 8,
            value: 10,
            name: "10kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 9,
            value: 15,
            name: "15kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 10,
            value: 20,
            name: "20kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 11,
            value: 25,
            name: "25kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 12,
            value: 30,
            name: "30kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 13,
            value: 35,
            name: "35kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 14,
            value: 40,
            name: "40kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 15,
            value: 50,
            name: "50kg",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 16,
            value: 100,
            name: "over 50",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
    ],
    index: 0,

    petReproductivity: [
        {
            id: 0,
            name: "Unknown",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 1,
            name: "Neutred",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 2,
            name: "Not-neutred",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 3,
            name: "Does not apply",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
    ],

    petTypes: [
        {
            id: 1,
            name: "Unknown",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 2,
            name: "Cat",
            selected: "",
            avatarUrl: "../img/icon/cat.png",
        },
        {
            id: 3,
            name: "Dog",
            selected: "",
            avatarUrl: "../img/icon/dog.png",
        },
        {
            id: 4,
            name: "Horse",
            selected: "",
            avatarUrl: "../img/icon/horse.png",
        },
        {
            id: 5,
            name: "Bird",
            selected: "",
            avatarUrl: "",
            avatarUrl: "../img/icon/bird.png",
        },
        {
            id: 6,
            name: "Reptile",
            selected: "",
            avatarUrl: "../img/icon/reptile.png",
        },
        {
            id: 7,
            name: "Rodent",
            selected: "",
            avatarUrl: "../img/icon/rodent.png",
        },
        {
            id: 8,
            name: "Other carnivore",
            selected: "",
            avatarUrl: "../img/icon/carnivore.png",
        },
        {
            id: 9,
            name: "Other domestic",
            selected: "",
            avatarUrl: "../img/icon/domestic.png",
        },
        {
            id: 10,
            name: "Other",
            selected: "",
            avatarUrl: "../img/icon/other.png",
        },
    ],
    setDob(pet, dobText){
        let date = moment(pet.real.dobText).unix();
        pet.real.dob = date;
    },

    updateCustomOffset(pet, offset){
        pet.customOffset += offset;
        pet.name = petService.generatePetName(pet.id + pet.customOffset);
        this.index++;
    },
    createPet(){
        petService.selectedPet = {
            name: "???",
            real: {
                dob: moment().unix(),
                dobText: moment().format("YYYY-MM-DD"),
                name: null,
            },
            petType: 
            {
                name: "Unknown",
            },
            reproductivity: {
                name: "Unknown",
            },
            weightRange: {
                name: "Unknown",
            }
        };
        petService.showPetEditor = true; 
        petService.showPetIdDisclaimer = false;
        petService.editPet();
    },
    editPet(){
        petService.bus("PetsReceived");

        this.showPetTypeSelector = true;
        this.showPetReproductivitySelector = true;
        this.showPetWeightSelector = true;
        this.showPetNameEditor = true;
        this.showPetAgeEditor = true;

        this.isEditing = true;
    },
    closeEditor(){
        this.isEditing = false;
        this.showPetEditor = false;

        this.showPetTypeSelector = false;
        this.showPetReproductivitySelector = false;
        this.showPetWeightSelector = false;
        this.showPetNameEditor = false;
        this.showPetAgeEditor = false;
    },

    generatePetId(){
        this.petId = (new Date()).getTime();
        this.showPetIdDisclaimer = true;
    },

    petTypeChanged(petType){
        //petService.selectedPet.petType = petType;
        petService.index++;
    },
    petReproductivityChanged(reproductivityType){
        //petService.selectedPet.reproductivity = reproductivityType;
        petService.index++;
    },
    petWeightRangeChanged(weightRange){
        petService.selectedPet.weightRange = weightRange;
        petService.index++;
    },

    loadPets(){
        if(this.accountService.simulate){
            this.realPetsListReceived([
                {
                    petId: 1,
                    scopeId: 0,
                    userId: 9,
                    name: "Real Sisi",
                    weight: 5,
                    dob: 1730076645,
                    type: 3,
                    created: 1740086645,
                    updated: 0,
                    deleted: 0,
                    deletedBy: null,
                    customOffset: 0
                },
                {
                    petId: 2,
                    scopeId: 0,
                    userId: 9,
                    name: "Real Coco",
                    weight: 5,
                    dob: 1730076645,
                    type: 3,
                    created: 1740086646,
                    updated: 0,
                    deleted: 0,
                    deletedBy: null,
                    customOffset: 10
                }
            ]);
            return;
        }
        let petsListUrl = "https://vmie.org:5000/api/pet/real/list"
        this.apiService.post(petsListUrl, null, this.realPetsListReceived);
    },
    listPets(){
        if(this.accountService.simulate){
            this.petsListReceived([
                {
                    id: 1740086645,
                    scopeId: 0,
                    userId: 9,
                    name: null,
                    weight: 5,
                    dob: 1740076645,
                    type: 3,
                    created: 1740086645,
                    updated: 0,
                    deleted: 0,
                    deletedBy: null,
                    customOffset: 0
                },
                {
                    id: 1740086646,
                    scopeId: 0,
                    userId: 9,
                    name: null,
                    weight: 5,
                    dob: 1740076645,
                    type: 5,
                    created: 1740086646,
                    updated: 0,
                    deleted: 0,
                    deletedBy: null,
                    customOffset: 10
                }
            ]);
            return;
        }
        let petsListUrl = "https://vmie.org:5000/api/pet/list"
        this.apiService.post(petsListUrl, null, this.petsListReceived);
    },

    savePet(pet){
        pet.real.dob = pet.real.dob ? parseInt(pet.real.dob) : 0;
        let petModel = {
            petId: pet.real.petId,
            name: pet.real.name,
            weight: pet.weight,
            repro: pet.reproductivity.id,
            dob: pet.real.dob,
            type: pet.petType.id,
            customOffset: pet.customOffset
        }

        if(this.accountService.simulate){
            pet.petId = pet.real.petId;
            this.savePetSuccess(pet);
            return;
        }
        let savePetUrl = "https://vmie.org:5000/api/pet/save"
        this.apiService.post(savePetUrl, petModel, this.savePetSuccess);
    },
    deletePet(pet){
        if(!pet){
            return;
        }
        if(this.accountService.simulate){
            pet.petId = pet.real.petId;
            this.deletePetSuccess(pet);
            return;
        }
        let savePetUrl = `https://vmie.org:5000/api/pet/${pet.real.petId}/delete`
        this.apiService.post(savePetUrl, null, this.deletePetSuccess);
    },
    savePetSuccess(savedPet){
        if(savedPet){
            let pet = petService.petsList.find(r=>r.real.petId == savedPet.petId);
            if(!pet){
                pet = savedPet;
            }
            pet.tags = [`${pet.petType.name}, ${petService.humanAge(savedPet.real.dob)} ${(pet.reproductivity.id < 3 ? ', ' + pet.reproductivity.name : '')}`];
        }
        petService.isEditing = false;
        petService.bus("PetsReceived");
    },
    deletePetSuccess(deletedPet){
        if(deletedPet){
            let pet = petService.petsList.find(r=>r.real.petId == deletedPet.petId);
            pet.deleted = true;
            petService.closeEditor();
        }
    },
    realPetsListReceived(realPetsList){
        let petsList = [];
        for(let i = 0; i< realPetsList.length; i++){
            let pet = realPetsList[i];
            pet.dobText = moment(pet.dob).format("YYYY-MM-DD");


            petsList.push({
                real: pet,

                response: null,
                deleted: 0,
                readMore: false,
                tags: [],
                skills: [],
                responses: [null, null, null]
            });
        };
        petService.petsList = petsList;
        petService.listPets();
    },
    petsListReceived(petsList){
        let context = this;
        for(let i = 0; i< petsList.length; i++){
            let p = petsList[i];
            if(!p.repro){
                p.repro = 0;
            }
            let petType = petService.petTypes.find(t=>t.id == p.type);
            let petRWeightRange = petService.petRWeightRange.find(t=>t.value >= p.weight);
            if(!petRWeightRange){
                petRWeightRange = petService.petRWeightRange[petService.petRWeightRange.length-1];
            }
            let petReproductivity = petService.petReproductivity.find(t=>t.id == p.repro);
            let petName = petService.generatePetName(p.id + p.customOffset);


            let pet = petService.petsList.find(r=>r.real.created == p.id);
            if(pet){
                pet.id = p.id;
                // pet.dob = p.dob;
                pet.type = p.type;
                pet.name = petName;
                pet.weight = p.weight;
                pet.customOffset = p.customOffset;
                pet.petType = petType;
                pet.reproductivity = petReproductivity;
                pet.weightRange = petRWeightRange;

                pet.tags = [`${pet.petType.name}, ${petService.humanAge(pet.real.dob)} ${(pet.reproductivity && pet.reproductivity.id < 3 ? ', ' + pet.reproductivity.name : '')}`];
                pet.skills = ['no data'];
            }
        };
        petService.bus("PetsReceived");
    },
    humanAge(timestamp){
        const now = new Date();
        const past = new Date(timestamp * 1000);
        
        let years = now.getFullYear() - past.getFullYear();
        let months = now.getMonth() - past.getMonth();
        let days = now.getDate() - past.getDate();
    
        if (days < 0) {
            months -= 1;
            const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += previousMonth.getDate();
        }
    
        if (months < 0) {
            years -= 1;
            months += 12;
        }
    
        let result = [];
        if (years > 0) result.push(`${years} year${years > 1 ? 's' : ''}`);
        if (months > 0) result.push(`${months} month${months > 1 ? 's' : ''}`);
        if (days > 0 && months < 1) result.push(`${days} day${days > 1 ? 's' : ''}`);
    
        return result.length ? result.join(', ') + ' old' : '0 days';
    },
    generatePetName(seed) {    
        const prefixes = ["Fluffy", "Spark", "Whisker", "Shadow", "Bouncy", "Snuggle", "Furry", "Misty", "Brave", "Luna", "Bella"];
        const suffixes = ["Paws", "Tail", "Whiskers", "Nose", "Ears", "Claws", "Fur", "Eyes", "Wag", "Bark", "Silk"];
    
        // Use the seed to pick words
        const prefix = prefixes[seed % prefixes.length];
        const suffix = suffixes[(seed * 2) % suffixes.length];
    
        return `${prefix}-${suffix}`;
    },
    updateWeight(value){
        if(!petService.selectedPet.weight){
            petService.selectedPet.weight = 0;
        }
        let weight = parseInt(petService.selectedPet.weight);
        let petRWeightRange = petService.petRWeightRange.find(t=>t.value >= weight);
        if(!petRWeightRange){
            petRWeightRange = petService.petRWeightRange[petService.petRWeightRange.length-1];
        }
        petService.selectedPet.weightRange = petRWeightRange;
        petService.index++;
    }
}

export default {
    petService,
    PetHeaderComponent,
    PetEditorComponent
}
