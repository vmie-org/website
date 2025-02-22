export const PetHeaderComponent = {
    props: ["petService", "accountService", "parent", "bus"],
    template: `<div>

    <span @click="petService.generatePetId()" class="btn btn-success">Get a free PetId</span>
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
                    <div class="btn btn-success float-right" @click="petService.showPetEditor = true; petService.showPetIdDisclaimer = false">Continue</div>
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
                
        <div @click="petService.showPetNameEditor = !petService.showPetNameEditor">
            Pet Name: 
            <span class="text-secondary">{{petService.selectedPet.name}}</span>
            <div v-if="petService.selectedPet.name && petService.showPetNameEditor" @click.stop="petService.showPetNameEditor = false" class="link float-right">
                <span class="text-primary">ok</span>
            </div>
        </div>
        <div v-if="petService.selectedPet && petService.showPetNameEditor">
            <input v-model="petService.selectedPet.name" />
            <span class="text-danger">(This property is private)</span>
        </div>
                  
        <hr>

        <div @click="petService.showPetAgeEditor = !petService.showPetAgeEditor">
            Pet DOB: 
            <span class="text-secondary">{{petService.selectedPet.dob}}</span>
            <div v-if="petService.selectedPet.dob && petService.showPetAgeEditor" @click.stop="petService.showPetAgeEditor = false" class="link float-right">
                <span class="text-primary">ok</span>
            </div>
        </div>
        <div v-if="petService.selectedPet && petService.showPetAgeEditor">
            <input v-model="petService.selectedPet.dob" />
            <span class="text-danger">(This property is private)</span>
        </div>
          
        <hr>

        <div @click="petService.showPetTypeSelector = !petService.showPetTypeSelector">Pet Type: 
        <span class="text-secondary">{{petService.selectedPet.petType.name}}</span>
        <div v-if="petService.selectedPet.petType.id && petService.showPetTypeSelector" @click.stop="petService.showPetTypeSelector = false" class="link float-right">
            <span class="text-primary">ok</span>
        </div>
        </div>
        <div v-if="petService.selectedPet && petService.showPetTypeSelector">
            <div>
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
          
        <hr>

        <div @click="petService.showPetReproductivitySelector = !petService.showPetReproductivitySelector">Pet Type: 
        <span class="text-secondary">{{petService.selectedPet.reproductivity.name}}</span>
        <div v-if="petService.selectedPet.reproductivity.id && petService.showPetReproductivitySelector" @click.stop="petService.showPetReproductivitySelector = false" class="link float-right">
            <span class="text-primary">ok</span>
        </div>
        </div>
        <div v-if="petService.selectedPet && petService.showPetReproductivitySelector">
            <div>
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
  
        <hr>

        <div @click="petService.showPetWeightSelector = !petService.showPetWeightSelector">Pet weight about: 
        <span class="text-secondary">{{petService.selectedPet.weightRange.name}}</span>
        <div v-if="petService.selectedPet.weightRange.id && petService.showPetWeightSelector" @click.stop="petService.showPetWeightSelector = false" class="link float-right">
            <span class="text-primary">ok</span>
        </div>
        </div>
        <div v-if="petService.selectedPet && petService.showPetWeightSelector">
            <div>
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
    <span @click="petService.showPetEditor = false" class="btn btn-secondary" v-if="petService.selectedPet.petType.id && petService.selectedPet.reproductivity.id && petService.selectedPet.weightRange.id">
    Close
    </span>
    <span class="btn btn-success" @click="petService.savePet(petService.selectedPet)">
    Save
    </span>
    </div>
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

    showMorePetType: false,
    showMoreReproductivityType: false,
    showMoreWeightType: false,

    showPetEditor: false,
    petsList: [],


    initialize(apiService, accountService, chat, bus){
        this.apiService = apiService;
        this.accountService = accountService;
        this.bus = bus;
    },


    selectedPet: {
        name: null,
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
    },

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

    generatePetId(){
        this.petId = (new Date()).getTime();
        this.showPetIdDisclaimer = true;
    },

    petTypeChanged(petType){
        this.selectedPet.petType = petType;
    },
    petReproductivityChanged(reproductivityType){
        this.selectedPet.reproductivity = reproductivityType;
    },
    petWeightRangeChanged(weightRange){
        this.selectedPet.weightRange = weightRange;
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
                    dob: 1740076645,
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
                    dob: 1740076645,
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
                    petId: 1740086645,
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
                    petId: 1740086646,
                    scopeId: 0,
                    userId: 9,
                    name: null,
                    weight: 5,
                    dob: 1740076645,
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
        let petsListUrl = "https://vmie.org:5000/api/pet/list"
        this.apiService.post(petsListUrl, null, this.petsListReceived);
    },

    savePet(pet){
        let petModel =  {
            petId: null,
            name: this.selectedPet.name,
            weight: this.selectedPet.weightRange.id,
            dob: this.selectedPet.dob,
            type: this.selectedPet.petType.id,
            customOffset: 1
        }
        let savePetUrl = "https://vmie.org:5000/api/pet/save"
        this.apiService.post(savePetUrl, petModel, this.savePetSuccess);
    },
    savePetSuccess(savedPet){

    },
    realPetsListReceived(realPetsList){
        let petsList = [];
        for(let i = 0; i< realPetsList.length; i++){
            let pet = realPetsList[i];
            petsList.push({
                real: pet
            });
        };
        petService.petsList = petsList;
        petService.listPets();
    },
    petsListReceived(petsList){
        let context = this;
        for(let i = 0; i< petsList.length; i++){
            let p = petsList[i];
            let petType = context.petTypes.find(t=>t.id == p.type);
            let petRWeightRange = context.petRWeightRange.find(t=>t.id == p.type);
            let petReproductivity = context.petReproductivity.find(t=>t.id == p.type);
            let petName = context.generatePetName(p.petId + p.customOffset);
            let pet = context.petsList.find(r=>r.real.created == p.petId);
            if(pet){
                pet.id = p.id;
                pet.type = p.type;
                pet.name = petName;
                pet.weight = p.weight;
                pet.customOffset = p.customOffset;
                pet.petType = petType;
                pet.reproductivity = petReproductivity;
                pet.weightRange = petRWeightRange;
            }
        };
        petService.bus("PetsReceived");
    },
    generatePetName(seed) {    
        const prefixes = ["Fluffy", "Spark", "Whisker", "Shadow", "Bouncy", "Snuggle", "Furry", "Misty", "Brave", "Luna", "Bella"];
        const suffixes = ["Paws", "Tail", "Whiskers", "Nose", "Ears", "Claws", "Fur", "Eyes", "Wag", "Bark", "Silk"];
    
        // Use the seed to pick words
        const prefix = prefixes[seed % prefixes.length];
        const suffix = suffixes[(seed * 2) % suffixes.length];
    
        return `${prefix}-${suffix}`;
    }
}

export default {
    petService,
    PetHeaderComponent,
    PetEditorComponent
}
