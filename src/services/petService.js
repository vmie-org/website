export const PetHeaderComponent = {
    props: ["petService", "accountService", "bub"],
    template: `<div>
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
                Your PetId is: <span style="color: black">{{petService.petId}}</span>
                <div>Save this code and keep it private</div>
            </div>
        </div>
                <br>
        <br>
        <br>
    </div>
    <span v-if="!petService.petId" @click="petService.generatePetId()" class="btn btn-success">Get a free PetId</span>
    <br>
    <br>
</div>
</div>
`
}

let that = null;
export const petService = {
    jwt: null,
    petId: null,
    agreementAccepted: null,
    showPetIdDisclaimer: false,
    generatePetId(){
        this.petId = (new Date()).getTime();
        this.showPetIdDisclaimer = true;
    }
}

export default {
    petService,
    PetHeaderComponent
}
