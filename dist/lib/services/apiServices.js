// import services, {time, util} from './index.js';

const serverBus = new Vue();

export const apiService = {

    jwt: null,
    restoreJwt(){
        var userString = localStorage.getItem("user");
        if(userString)
        {
            var user = JSON.parse(userString);
            if(user){
                apiService.jwt = user.jwt;
            }
        }
    },
    post(url, payload, success, error) {
        if(apiService.jwt == null)
        {
            apiService.restoreJwt();
        }

        $.ajax({
            headers: {
                "Authorization": "Bearer " + this.jwt,
            },
            url: url,
            dataType: "json",
            type: "POST",
            data: JSON.stringify(payload),
            contentType: "application/json",
            success(data) {
                if (data) {
                    if(data.data.success) {
                        success(data);
                    }
                    else{
                        error(data);
                    }
                }
                else{
                    
                }
            },
            error() {
                error("Unable to execute.");
            }
        });
    },
    endpoints:{
        saveDoctor: "https://localhost:4133/api/doctor/save",
        saveDrug: "https://localhost:4133/api/drug/save",
        saveEvent: "https://localhost:4133/api/event/save",
        saveOwner: "https://localhost:4133/api/owner/save",
        savePet: "https://localhost:4133/api/pet/save",
        savePractice: "https://localhost:4133/api/practice/save",

        deleteDoctor: "https://localhost:4133/api/doctor/{id}/delete",
        deleteDrug: "https://localhost:4133/api/drug/{id}/delete",
        deleteEvent: "https://localhost:4133/api/event/{id}/delete",
        deleteOwner: "https://localhost:4133/api/owner/{id}/delete",
        deletePet: "https://localhost:4133/api/pet/{id}/delete",
        deletePractice: "https://localhost:4133/api/practice/{id}/delete",

        fetchDoctors: "https://localhost:4133/api/doctor/list",
        fetchDrugs: "https://localhost:4133/api/drug/list",
        fetchEvents: "https://localhost:4133/api/event/list",
        fetchOwners: "https://localhost:4133/api/owner/list",
        fetchPets: "https://localhost:4133/api/pet/list",
        fetchPractices: "https://localhost:4133/api/practice/list",
    }
}

export default {
    apiService,
    serverBus
}
